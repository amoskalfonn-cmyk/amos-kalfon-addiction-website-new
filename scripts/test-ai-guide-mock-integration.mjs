import { handleAiGuide } from '../netlify/lib/ai-guide-core.mjs';

function event(question, scenario = 'grounded_answer', ip = crypto.randomUUID()) {
  return {
    httpMethod: 'POST',
    headers: { 'x-forwarded-for': ip },
    body: JSON.stringify({ question, mockScenario: scenario })
  };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function call(question, scenario, ip) {
  const result = await handleAiGuide(event(question, scenario, ip));
  const body = JSON.parse(result.body);
  return { statusCode: result.statusCode, body };
}

const previous = {
  AI_GUIDE_ENABLED: process.env.AI_GUIDE_ENABLED,
  AI_GUIDE_USE_MOCK: process.env.AI_GUIDE_USE_MOCK,
  AI_GUIDE_ENV: process.env.AI_GUIDE_ENV,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY
};
process.env.AI_GUIDE_ENABLED = 'true';
process.env.AI_GUIDE_USE_MOCK = 'true';
process.env.AI_GUIDE_ENV = 'development';
delete process.env.OPENAI_API_KEY;

const tests = [];
async function test(name, fn) {
  try { await fn(); tests.push({ name, ok: true }); }
  catch (error) { tests.push({ name, ok: false, error: error.message }); }
}

await test('grounded_answer', async () => {
  const { statusCode, body } = await call('איך לבחור עזרה בהתמכרות?', 'grounded_answer');
  assert(statusCode === 200, 'status');
  assert(body.mode === 'answer', 'mode');
  assert(body.sources.length > 0 && body.sources.length <= 3, 'sources');
  assert(body.sources.every((s) => s.href.startsWith('/')), 'local sources only');
});

await test('family_answer', async () => {
  const { body } = await call('מה משפחה יכולה לעשות כשבן משפחה מסרב לעזרה?', 'family_answer');
  assert(body.mode === 'answer', 'mode');
  assert(body.sources.length <= 3, 'max sources');
});

await test('professional_answer', async () => {
  const { body } = await call('מה אנשי מקצוע צריכים לדעת על גבולות השירות?', 'professional_answer');
  assert(body.mode === 'answer', 'mode');
  assert(body.sources.every((s) => s.href.startsWith('/')), 'sources local');
});

await test('questionnaire_answer', async () => {
  const { body } = await call('מה עושה שאלון ההכוונה הראשוני?', 'questionnaire_answer');
  assert(body.mode === 'answer', 'mode');
});

await test('insufficient_information', async () => {
  const { body } = await call('שאלה שאין עליה מידע באתר', 'insufficient_information');
  assert(body.mode === 'insufficient_information', 'insufficient_information');
});

await test('unsupported_addiction_topics_fail_safely', async () => {
  const questions = [
    'איך מטפלים בהתמכרות לקניות?',
    'התמכרות לאוכל',
    'התמכרות לעבודה',
    'התמכרות לקניות אונליין'
  ];
  for (const question of questions) {
    const { body } = await call(question, 'grounded_answer');
    assert(body.mode === 'insufficient_information', `${question} mode`);
    assert(!body.sources.some((source) => /choose-addiction-help|guidance-vs-treatment/.test(source.href)), `${question} unrelated source`);
  }
});

await test('malformed_output_fallback', async () => {
  const { body } = await call('איך לבחור עזרה בהתמכרות?', 'malformed_output');
  assert(body.mode === 'insufficient_information', 'insufficient_information');
});

await test('unsupported_source_rejected', async () => {
  const { body } = await call('איך לבחור עזרה בהתמכרות?', 'unsupported_source');
  assert(body.mode === 'insufficient_information', 'insufficient_information');
  assert(body.sources.every((s) => s.href !== '/about.html'), 'unsupported source not rendered');
});

await test('external_url_rejected', async () => {
  const { body } = await call('איך לבחור עזרה בהתמכרות?', 'external_url');
  assert(body.mode === 'insufficient_information', 'insufficient_information');
  assert(body.sources.every((s) => s.href.startsWith('/')), 'no external URL');
});

await test('excessive_sources_limited', async () => {
  const { body } = await call('בדיקת יותר מדי מקורות', 'excessive_sources');
  assert(body.sources.length <= 3, 'max 3');
});

await test('timeout_fallback', async () => {
  const { body } = await call('איך לבחור עזרה בהתמכרות?', 'timeout');
  assert(body.mode === 'insufficient_information', 'insufficient_information');
});

await test('mock_rate_limit_status', async () => {
  const { statusCode } = await call('איך לבחור עזרה בהתמכרות?', 'rate_limit');
  assert(statusCode === 429, '429');
});

await test('server_error_fallback', async () => {
  const { body } = await call('איך לבחור עזרה בהתמכרות?', 'server_error');
  assert(body.mode === 'insufficient_information', 'insufficient_information');
});

await test('emergency_bypasses_model', async () => {
  const { body } = await call('יש סכנה מיידית ומנת יתר', 'malformed_output');
  assert(body.mode === 'safety', 'safety');
});

await test('medical_bypasses_model', async () => {
  const { body } = await call('איזה מינון תרופה לקחת בגמילה', 'malformed_output');
  assert(body.mode === 'medical-boundary', 'medical');
});

await test('disabled_returns_unavailable', async () => {
  process.env.AI_GUIDE_ENABLED = 'false';
  const { body } = await call('איך לבחור עזרה?', 'grounded_answer');
  assert(body.mode === 'unavailable', 'unavailable');
  process.env.AI_GUIDE_ENABLED = 'true';
});

await test('real_default_without_key_unavailable', async () => {
  process.env.AI_GUIDE_USE_MOCK = 'false';
  const { body } = await call('איך לבחור עזרה?', 'grounded_answer');
  assert(body.mode === 'unavailable', 'unavailable');
  process.env.AI_GUIDE_USE_MOCK = 'true';
});

await test('ip_rate_limit_status', async () => {
  const ip = 'mock-rl-ip';
  let limited = false;
  for (let i = 0; i < 14; i += 1) {
    const { statusCode } = await call('בדיקת עומס', 'grounded_answer', ip);
    if (statusCode === 429) limited = true;
  }
  assert(limited, 'limited');
});

for (const [key, value] of Object.entries(previous)) {
  if (value === undefined) delete process.env[key];
  else process.env[key] = value;
}

const failed = tests.filter((t) => !t.ok);
console.log(JSON.stringify({ total: tests.length, passed: tests.length - failed.length, failed }, null, 2));
if (failed.length) process.exit(1);
