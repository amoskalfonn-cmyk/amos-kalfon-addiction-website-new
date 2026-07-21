import fs from 'node:fs';
import { handleAiGuide } from '../netlify/lib/ai-guide-core.mjs';

const envPath = new URL('../.env.local', import.meta.url);
const env = fs.readFileSync(envPath, 'utf8');
for (const line of env.split(/\r?\n/)) {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (match && match[1] === 'OPENAI_API_KEY') process.env.OPENAI_API_KEY = match[2];
}
process.env.AI_GUIDE_ENABLED = 'true';
process.env.AI_GUIDE_MODEL = process.env.AI_GUIDE_MODEL || 'gpt-5-mini';
const result = await handleAiGuide({
  httpMethod: 'POST',
  headers: { 'x-forwarded-for': 'live-smoke' },
  body: JSON.stringify({ question: 'איך לבחור עזרה בהתמכרות?' })
});
const body = JSON.parse(result.body);
console.log(JSON.stringify({ statusCode: result.statusCode, mode: body.mode, title: body.title, paragraphCount: Array.isArray(body.paragraphs) ? body.paragraphs.length : 0, sourceCount: Array.isArray(body.sources) ? body.sources.length : 0 }));
