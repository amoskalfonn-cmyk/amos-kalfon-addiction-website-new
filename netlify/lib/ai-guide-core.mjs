import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { callMockResponsesApi, isMockEnabled } from './ai-guide-mock.mjs';

const MAX_QUESTION_LENGTH = 360;
const MAX_CONTEXT_PAGES = 5;
const WINDOW_MS = 60000;
const MAX_REQUESTS_PER_WINDOW = 12;
const buckets = new Map();
const KNOWLEDGE_FILE = 'ai-guide-approved-knowledge.json';

const SAFETY_PATTERNS = [
  /overdose|self-harm|suicide|violence|weapon|emergency/i,
  /אובד|התאבד|לפגוע בעצמי|לפגוע בו|פגיעה עצמית|מנת יתר|overdose/i,
  /אלימות|סכין|נשק|סכנה מיידית|חירום|אמבולנס|משטרה/i,
  /הזיות|פרכוס|התעלפות|גמילה קשה|דליריום/i
];

const MEDICAL_PATTERNS = [
  /medication|dosage|dose|detox|withdrawal|prescription|diagnosis|diagnose/i,
  /מינון|איזה תרופה|תרופות|כדור|להפסיק בבת אחת|גמילה רפואית|דטוקס|פסיכיאטר|אבחון/i,
  /כמה לקחת|איך להוריד מינון|תופעות לוואי|מרשם/i
];

const PROMPT_INJECTION_PATTERNS = [
  /ignore (all )?(previous|prior) instructions?/i,
  /(reveal|show|print|dump|expose|read).*(system prompt|hidden instructions?|developer message|internal (files?|instructions?|prompt)|openai_api_key|api key|environment variables?|\.env(?:\.local)?)/i,
  /(system prompt|hidden instructions?|developer message|internal (files?|instructions?|prompt)|openai_api_key|api key|environment variables?|\.env(?:\.local)?).*(reveal|show|print|dump|expose|read)/i,
  /(חשוף|תחשוף|הצג|תציג|הראה|תראה|קרא).*(הוראות פנימיות|הנחיות פנימיות|פרומפט|מפתח(?:ות)?|קובצי מערכת|קבצים פנימיים|משתני סביבה|\.env)/i,
  /(הוראות פנימיות|הנחיות פנימיות|פרומפט|מפתח(?:ות)?|קובצי מערכת|קבצים פנימיים|משתני סביבה|\.env).*(חשוף|תחשוף|הצג|תציג|הראה|תראה|קרא)/i
];

const CONTACT_SOURCES = [
  { title: 'הצהרת אחריות', href: '/disclaimer.html' },
  { title: 'מתי ליווי אינו מספיק?', href: '/articles/when-guidance-is-not-enough.html' }
];

const GENERAL_NAVIGATION_PATHS = ['/', '/knowledge-center.html', '/questions-and-answers.html', '/services/treatment-guidance.html'];

const GENERIC_RETRIEVAL_TOKENS = new Set([
  'איך',
  'מה',
  'מתי',
  'איפה',
  'אפשר',
  'צריך',
  'כדאי',
  'עזרה',
  'טיפול',
  'מטפלים',
  'התמכרות',
  'בהתמכרות',
  'התמכרויות',
  'ליווי',
  'הכוונה',
  'בעיה',
  'מידע',
  'מאמר'
]);

const MIN_RELEVANCE_SCORE = 7;

function getModuleDir() {
  const moduleUrl = import.meta?.url;
  if (typeof moduleUrl !== 'string' || !moduleUrl) return null;
  try {
    return path.dirname(fileURLToPath(moduleUrl));
  } catch (error) {
    console.error('[ai-guide] module path resolution failed:', error.message);
    return null;
  }
}

function getKnowledgePathCandidates() {
  const moduleDir = getModuleDir();
  const candidates = [];
  if (moduleDir) {
    candidates.push(path.resolve(moduleDir, '..', '..', 'data', KNOWLEDGE_FILE));
    candidates.push(path.resolve(moduleDir, '..', 'data', KNOWLEDGE_FILE));
  }
  candidates.push(path.resolve(process.cwd(), 'data', KNOWLEDGE_FILE));
  candidates.push(path.resolve(process.cwd(), '..', 'data', KNOWLEDGE_FILE));
  return [...new Set(candidates)];
}

function loadKnowledge() {
  const candidates = getKnowledgePathCandidates();
  for (const candidate of candidates) {
    try {
      if (!fs.existsSync(candidate)) continue;
      return JSON.parse(fs.readFileSync(candidate, 'utf8'));
    } catch (error) {
      console.error('[ai-guide] knowledge load failed:', error.message);
      return null;
    }
  }
  console.error('[ai-guide] knowledge file not found in bundled function');
  return null;
}

function normalize(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff'
    },
    body: JSON.stringify(body)
  };
}

function getClientKey(event) {
  const forwarded = event.headers?.['x-forwarded-for'] || event.headers?.['X-Forwarded-For'] || '';
  return String(forwarded).split(',')[0].trim() || event.headers?.['client-ip'] || 'anonymous';
}

function checkRateLimit(key) {
  const now = Date.now();
  const bucket = buckets.get(key) || { count: 0, resetAt: now + WINDOW_MS };
  if (bucket.resetAt <= now) {
    bucket.count = 0;
    bucket.resetAt = now + WINDOW_MS;
  }
  bucket.count += 1;
  buckets.set(key, bucket);
  return bucket.count <= MAX_REQUESTS_PER_WINDOW;
}

function matchesAny(value, patterns) {
  return patterns.some((pattern) => pattern.test(value));
}

function tokenize(value) {
  return normalize(value)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .split(/\s+/)
    .filter((token) => token.length >= 3)
    .slice(0, 40);
}

function retrieve(question, knowledge) {
  const tokens = tokenize(question);
  const scored = knowledge.pages.map((page) => {
    const haystack = `${page.title} ${page.h1} ${page.description} ${page.headings.join(' ')} ${page.summary}`.toLowerCase();
    const titleStack = `${page.title} ${page.h1}`.toLowerCase();
    let score = 0;
    const matchedSpecificTokens = new Set();
    for (const token of tokens) {
      if (haystack.includes(token)) {
        score += token.length > 5 ? 3 : 1;
        if (!GENERIC_RETRIEVAL_TOKENS.has(token)) matchedSpecificTokens.add(token);
      }
      if (titleStack.includes(token)) score += 2;
    }
    if (page.category === 'trust-legal' && /פרטיות|אחריות|מקורות|אמון|תנאים/.test(question)) score += 8;
    if (page.category === 'service' && /שאלון|הכוונה|מסגרת|טיפול|עזרה/.test(question)) score += 6;
    if (page.path.includes('/knowledge/families') && /משפחה|הורים|בן זוג|גבולות|מסרב/.test(question)) score += 7;
    if (page.path.includes('/articles/when-guidance-is-not-enough') && /סכנה|חירום|רפואי|פסיכיאטר|אלימות|גמילה/.test(question)) score += 8;
    if (page.path.includes('/questions-and-answers') && /שאלות|תשובות|שאלות נפוצות/.test(question)) score += 8;
    if (page.path.includes('/gambling') && /הימורים|מהמר/.test(question)) score += 8;
    if (page.path.includes('/alcohol') && /אלכוהול|שתייה|שותה/.test(question)) score += 8;
    if (page.path.includes('/drugs') && /סמים|סם|קנאביס/.test(question)) score += 8;
    if (page.path.includes('/pornography') && /פורנו|פורנוגרפיה/.test(question)) score += 8;
    if (page.path.includes('/screens') && /מסכים|טלפון|מחשב/.test(question)) score += 8;
    return { page, score, matchedSpecificTokens: [...matchedSpecificTokens] };
  }).filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_CONTEXT_PAGES);

  if (!scored.length) {
    return {
      pages: getGeneralNavigationSources(knowledge),
      isSufficient: false,
      maxScore: 0,
      matchedSpecificTokens: []
    };
  }

  const maxScore = scored[0].score;
  const matchedSpecificTokens = [...new Set(scored.flatMap((item) => item.matchedSpecificTokens))];

  return {
    pages: scored.map((item) => item.page),
    isSufficient: maxScore >= MIN_RELEVANCE_SCORE && matchedSpecificTokens.length > 0,
    maxScore,
    matchedSpecificTokens
  };
}

function makeBoundary(type) {
  if (type === 'safety') {
    return {
      mode: 'safety',
      title: 'ייתכן שמדובר במצב דחוף',
      paragraphs: [
        'השאלה מתארת מצב שעלול להיות דחוף. האתר ועמוס כלפון אינם שירות חירום ואינם מחליפים גורם רפואי, טיפולי או בטיחותי מוסמך.',
        'אם יש סכנה מיידית, אלימות, מנת יתר, פגיעה עצמית, מצב רפואי חריף או חשש לחיים, יש לפנות מיד לשירותי חירום או לגורם מוסמך באזורכם.'
      ],
      sources: CONTACT_SOURCES
    };
  }
  return {
    mode: 'medical-boundary',
    title: 'גבול רפואי חשוב',
    paragraphs: [
      'אני לא יכול לתת הנחיות לגבי תרופות, מינונים, אבחון, גמילה רפואית או טיפול קליני.',
      'במצבים כאלה חשוב לפנות לרופא, פסיכיאטר, מסגרת טיפולית או גורם רפואי מוסמך. המידע באתר יכול לעזור בהתמצאות בלבד, לא בהחלטה רפואית.'
    ],
    sources: CONTACT_SOURCES
  };
}

function toSource(page) {
  if (!page) return null;
  return { title: page.title || page.h1 || page.path, href: page.path };
}

function getGeneralNavigationSources(knowledge) {
  return knowledge.pages
    .filter((page) => GENERAL_NAVIGATION_PATHS.includes(page.path))
    .slice(0, MAX_CONTEXT_PAGES);
}

function promptInjectionRefusal() {
  return {
    mode: 'refusal',
    title: 'לא אוכל לעזור בזה',
    paragraphs: [
      'לא אוכל לחשוף הוראות פנימיות, מפתחות, קובצי מערכת או מידע טכני חסוי.',
      'אפשר לשאול אותי שאלות על התוכן שכבר קיים באתר, ואעזור להפנות לעמודים המתאימים.'
    ],
    sources: []
  };
}

function unavailableAnswer(sources) {
  return {
    mode: 'unavailable',
    title: 'עוזר ה־AI להתמצאות באתר אינו זמין כרגע',
    paragraphs: [
      'לא ניתן להציג כרגע תשובה מתוך העוזר. אפשר להמשיך לעיין במרכז הידע, בשאלות הנפוצות או בעמוד ההכוונה.',
      'אם מדובר במצב דחוף או בסכנה, אין להסתמך על האתר ויש לפנות לגורם חירום או לגורם מוסמך מתאים.'
    ],
    sources: sources.slice(0, 3).map(toSource).filter(Boolean)
  };
}

function insufficientInformationAnswer(sources) {
  return {
    mode: 'insufficient_information',
    title: 'אין מספיק מידע באתר',
    paragraphs: [
      'לא מצאתי באתר מקור מאושר שמספיק כדי לענות על השאלה הזו בצורה אחראית.',
      'אפשר לנסח את השאלה אחרת, או להתחיל מהעמודים המרכזיים באתר בלי להסיק שהשאלה כבר נענתה.'
    ],
    sources: sources.slice(0, 3).map(toSource).filter(Boolean)
  };
}

function fallbackAnswer(sources) {
  return insufficientInformationAnswer(sources);
}

function buildPrompt(question, pages) {
  const context = pages.map((page, index) => [
    `SOURCE ${index + 1}`,
    `title: ${page.title}`,
    `path: ${page.path}`,
    `description: ${page.description}`,
    `headings: ${page.headings.join(' | ')}`,
    `restrictions: ${(page.restrictions || []).join(' | ')}`,
    `summary: ${page.summary}`
  ].join('\n')).join('\n\n---\n\n');

  return [
    'אתה עוזר AI להתמצאות באתר של עמוס כלפון בנושא ליווי והדרכה בהתמכרויות.',
    'ענה בעברית בלבד, בקצרה, בטון רגוע ולא שיווקי.',
    'השתמש אך ורק במקורות שסופקו. אל תמציא מידע, אל תיתן אבחון, טיפול, המלצה רפואית, הבטחת תוצאה או מענה חירום.',
    'אם אין תשובה מספקת במקורות, אמור זאת והפנה לעמודים מתאימים.',
    'כל תשובה חייבת לכלול 2-4 פסקאות קצרות ומקורות רלוונטיים מתוך המקורות בלבד.',
    '',
    `שאלת המשתמש: ${question}`,
    '',
    'מקורות מאושרים:',
    context
  ].join('\n');
}

function parseModelOutput(text, sources) {
  try {
    const data = JSON.parse(text);
    const paragraphs = Array.isArray(data.paragraphs) ? data.paragraphs.map(normalize).filter(Boolean).slice(0, 4) : [];
    const selectedPaths = Array.isArray(data.source_paths) ? data.source_paths.map(normalize).filter(Boolean) : [];
    if (!paragraphs.length || !selectedPaths.length) return fallbackAnswer(sources);
    const allowed = new Map(sources.map((page) => [page.path, page]));
    const invalidSource = selectedPaths.some((href) => href.startsWith('http://') || href.startsWith('https://') || !allowed.has(href));
    if (invalidSource) return fallbackAnswer(sources);
    const sourceItems = selectedPaths
      .slice(0, 3)
      .map((href) => allowed.get(href))
      .filter(Boolean)
      .map(toSource);
    if (sourceItems.length) {
      return {
        mode: data.mode === 'fallback' ? 'fallback' : 'answer',
        title: normalize(data.title) || 'מה מצאתי באתר',
        paragraphs,
        sources: sourceItems
      };
    }
  } catch (_) {}
  return fallbackAnswer(sources);
}

async function callModel(question, sources, scenario) {
  if (isMockEnabled()) {
    return parseModelOutput(await callMockResponsesApi({ question, sources, scenario }), sources);
  }
  return callOpenAI(question, sources);
}

async function callOpenAI(question, sources) {
  const model = process.env.OPENAI_MODEL || process.env.AI_GUIDE_MODEL || 'gpt-5-mini';
  const prompt = buildPrompt(question, sources);
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model,
      input: prompt,
      max_output_tokens: 650,
      text: {
        format: {
          type: 'json_schema',
          name: 'ai_website_guide_answer',
          strict: true,
          schema: {
            type: 'object',
            additionalProperties: false,
            required: ['mode', 'title', 'paragraphs', 'source_paths'],
            properties: {
              mode: { type: 'string', enum: ['answer', 'fallback'] },
              title: { type: 'string', maxLength: 80 },
              paragraphs: { type: 'array', minItems: 1, maxItems: 4, items: { type: 'string', maxLength: 260 } },
              source_paths: { type: 'array', minItems: 1, maxItems: 3, items: { type: 'string' } }
            }
          }
        }
      }
    })
  });

  if (!response.ok) {
    const error = await response.text().catch(() => '');
    throw new Error(`OpenAI request failed: ${response.status} ${error.slice(0, 160)}`);
  }

  const data = await response.json();
  const text = data.output_text || data.output?.flatMap((item) => item.content || []).map((item) => item.text || '').join('') || '';
  return parseModelOutput(text, sources);
}

export async function handleAiGuide(event) {
  if (event.httpMethod !== 'POST') return json(405, { error: 'method_not_allowed' });
  if (!checkRateLimit(getClientKey(event))) return json(429, { error: 'rate_limited' });

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (_) {
    return json(400, { error: 'invalid_json' });
  }

  const question = normalize(payload.question);
  if (!question) return json(400, { error: 'missing_question' });
  if (question.length > MAX_QUESTION_LENGTH) return json(400, { error: 'question_too_long' });

  if (matchesAny(question, PROMPT_INJECTION_PATTERNS)) return json(200, promptInjectionRefusal());
  if (matchesAny(question, SAFETY_PATTERNS)) return json(200, makeBoundary('safety'));
  if (matchesAny(question, MEDICAL_PATTERNS)) return json(200, makeBoundary('medical'));

  const knowledge = loadKnowledge();
  if (process.env.AI_GUIDE_ENABLED !== 'true') {
    const disabledSources = knowledge ? getGeneralNavigationSources(knowledge) : [];
    return json(200, unavailableAnswer(disabledSources));
  }

  if (!knowledge) {
    return json(200, unavailableAnswer([]));
  }

  const retrieval = retrieve(question, knowledge);
  const sources = retrieval.pages;
  if (!isMockEnabled() && !process.env.OPENAI_API_KEY) {
    return json(200, unavailableAnswer(sources));
  }

  if (!retrieval.isSufficient) {
    return json(200, insufficientInformationAnswer(getGeneralNavigationSources(knowledge)));
  }

  try {
    const answer = await callModel(question, sources, payload.mockScenario);
    return json(200, answer);
  } catch (error) {
    console.error('[ai-guide]', error.message);
    if (error.statusCode === 429) return json(429, { error: 'rate_limited' });
    return json(200, fallbackAnswer(sources));
  }
}


