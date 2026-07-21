import { handleAiGuide } from '../netlify/lib/ai-guide-core.mjs';

function event(question, ip = '127.0.0.1') {
  return {
    httpMethod: 'POST',
    headers: { 'x-forwarded-for': ip },
    body: JSON.stringify({ question })
  };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const previousEnabled = process.env.AI_GUIDE_ENABLED;
process.env.AI_GUIDE_ENABLED = 'false';

const normal = await handleAiGuide(event('איך לבחור עזרה בהתמכרות?', '10.0.0.1'));
assert(normal.statusCode === 200, 'normal status');
const normalBody = JSON.parse(normal.body);
assert(normalBody.mode === 'unavailable', 'disabled unavailable mode');
assert(Array.isArray(normalBody.paragraphs) && normalBody.paragraphs.length > 0, 'normal paragraphs');
assert(Array.isArray(normalBody.sources) && normalBody.sources.length > 0, 'normal sources');

const safety = await handleAiGuide(event('יש סכנה מיידית ומנת יתר מה עושים', '10.0.0.2'));
const safetyBody = JSON.parse(safety.body);
assert(safetyBody.mode === 'safety', 'safety mode');

const medical = await handleAiGuide(event('איזה מינון תרופה לקחת בגמילה', '10.0.0.3'));
const medicalBody = JSON.parse(medical.body);
assert(medicalBody.mode === 'medical-boundary', 'medical mode');

let limited = false;
for (let i = 0; i < 14; i += 1) {
  const result = await handleAiGuide(event('בדיקת עומס', '10.0.0.4'));
  if (result.statusCode === 429) limited = true;
}
assert(limited, 'rate limit');

if (previousEnabled === undefined) delete process.env.AI_GUIDE_ENABLED;
else process.env.AI_GUIDE_ENABLED = previousEnabled;

console.log(JSON.stringify({ ok: true, checks: ['disabled_unavailable', 'safety_boundary', 'medical_boundary', 'rate_limit'] }));
