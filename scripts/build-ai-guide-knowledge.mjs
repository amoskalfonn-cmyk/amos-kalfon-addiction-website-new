import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const repo = path.resolve(__dirname, '..');
const rootUrl = 'https://amos-kalfon-addiction-counselor.com';
const existingKnowledgePath = path.join(repo, 'data', 'ai-guide-approved-knowledge.json');
const excludedDirs = new Set(['.git', '04_NETLIFY_RELEASES', 'node_modules', 'docs', 'data', 'netlify', 'scripts']);
const restrictedKeywords = [/מינון/g, /תרופ/g, /גמילה רפואית/g, /אבחון/g, /חירום/g, /סכנה/g, /אובד/g, /אלימות/g];
let existingKnowledge = null;
const cleanedPromotionalRecords = new Set([
  'articles-how-to-choose-addiction-help',
  'articles-questions-before-starting-help',
  'contact',
  'cookies',
  'privacy',
  'services-treatment-guidance',
  'terms',
  'thank-you',
  'trust-center'
]);

function loadExistingRecords() {
  if (!fs.existsSync(existingKnowledgePath)) return new Map();
  try {
    const parsed = JSON.parse(fs.readFileSync(existingKnowledgePath, 'utf8'));
    existingKnowledge = parsed;
    return new Map((parsed.pages || []).map((record) => [record.id, record]));
  } catch {
    return new Map();
  }
}

const existingRecords = loadExistingRecords();

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!excludedDirs.has(entry.name)) files.push(...walk(full));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(parseInt(num, 10)));
}

function normalizeText(value) {
  return decodeEntities(value)
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,:;!?])/g, '$1')
    .trim();
}

function removeNonContentHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<form[\s\S]*?<\/form>/gi, ' ')
    .replace(/<aside[\s\S]*?<\/aside>/gi, ' ')
    .replace(/<section[^>]+class=["'][^"']*(?:cta|conversion|soft-conversion-note|contact-strip|contact-band|lead-form|actions|hero-actions)[^"']*["'][\s\S]*?<\/section>/gi, ' ')
    .replace(/<div[^>]+class=["'][^"']*(?:cta|conversion|soft-conversion-note|contact-strip|contact-band|lead-form|actions|soft-actions|hero-actions|footer-contact)[^"']*["'][\s\S]*?<\/div>/gi, ' ');
}

function stripHtml(html) {
  return normalizeText(removeNonContentHtml(html).replace(/<[^>]+>/g, ' '));
}

function firstMatch(html, regex) {
  const match = html.match(regex);
  return match ? stripHtml(match[1]) : '';
}

function canonicalFromPath(file) {
  const rel = path.relative(repo, file).replace(/\\/g, '/');
  if (rel === 'index.html') return `${rootUrl}/`;
  return `${rootUrl}/${rel}`;
}

function routeFromPath(file) {
  const rel = path.relative(repo, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  return `/${rel}`;
}

function idFromRel(rel) {
  return rel.replace(/\.html$/, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '') || 'home';
}

function audienceForPath(rel) {
  if (rel.startsWith('articles/') && /family|partner|boundaries|refuses|talk-to/.test(rel)) return 'family_support';
  if (rel.startsWith('knowledge/families')) return 'family_support';
  if (rel.includes('for-professionals')) return 'professional_referral';
  if (rel.includes('privacy') || rel.includes('terms') || rel.includes('disclaimer') || rel.includes('cookies') || rel.includes('copyright')) return 'trust_legal';
  if (rel.includes('contact') || rel.includes('treatment-guidance') || rel.includes('why-choose-me') || rel.includes('about')) return 'prospective_client';
  return 'general_visitor';
}

function topicsFor(rel, title, headings) {
  const text = `${rel} ${title} ${headings.join(' ')}`.toLowerCase();
  const topics = [];
  if (/family|families|partner|boundaries|refuses|talk-to/.test(text)) topics.push('family', 'boundaries', 'communication');
  if (/gambling/.test(text)) topics.push('gambling');
  if (/alcohol/.test(text)) topics.push('alcohol');
  if (/drug|prescription/.test(text)) topics.push('drugs_or_prescription');
  if (/treatment-guidance|choose|help|guidance/.test(text)) topics.push('choosing_help', 'initial_guidance');
  if (/professional/.test(text)) topics.push('professionals', 'service_boundaries');
  if (/privacy|terms|disclaimer|cookies|sources|editorial|trust/.test(text)) topics.push('trust', 'privacy', 'legal_boundaries');
  if (rel === '404.html') topics.push('page_not_found');
  if (!topics.length) topics.push('site_navigation', 'general_information');
  return Array.from(new Set(topics));
}

function safetyClassification(rel, text) {
  const combined = `${rel} ${text}`.toLowerCase();
  if (/when-guidance-is-not-enough|disclaimer|privacy|terms|prescription|emergency|medical|diagnos|detox|withdrawal/.test(combined)) return 'high_safety_sensitive';
  if (/family|families|addiction|recovery|gambling|alcohol|drugs/.test(combined)) return 'ymyl_sensitive';
  return 'low_safety_sensitive';
}

function responsePermission(rel, classification) {
  if (rel === '404.html' || rel === 'contact.html' || rel === 'thank-you.html') return 'navigation_only';
  if (classification === 'high_safety_sensitive') return 'summarize_with_boundary_and_sources_only';
  if (classification === 'ymyl_sensitive') return 'summarize_with_sources_only';
  return 'navigation_and_summary_allowed';
}

function categoryFromPath(rel) {
  if (rel.startsWith('articles/')) return 'article';
  if (rel.startsWith('knowledge/')) return 'knowledge';
  if (/privacy|terms|disclaimer|cookies|copyright|editorial|sources|trust/.test(rel)) return 'trust-legal';
  if (rel.startsWith('services/')) return 'service';
  if (/contact|about|why-choose-me|specialties|for-professionals/.test(rel)) return 'service-trust';
  return 'navigation';
}

function cleanSentences(text, id) {
  const normalized = normalizeText(text);
  const pieces = normalized
    .split(/(?<=[.!?؟])\s+|(?<=\.)\s+|(?<=׃)\s+/)
    .map((piece) => piece.trim())
    .filter(Boolean);
  const removeTerms = [
    /WhatsApp/i,
    /וואטסאפ/g,
    /שלחו/g,
    /שליחת/g,
    /צרו קשר/g,
    /צור קשר/g,
    /השאירו פרטים/g,
    /התקשרו/g,
    /054-633-0009/g,
    /0546330009/g
  ];
  const filtered = pieces.filter((piece) => !removeTerms.some((pattern) => pattern.test(piece)));
  const result = filtered.join(' ');
  if (result.length >= 80) return result;
  if (id === '404') return 'העמוד אינו נמצא. התוכן המאושר לרשומה זו מוגבל לניווט ניטרלי חזרה לדפי האתר המרכזיים ואינו מיועד כתשובה מקצועית או טיפולית.';
  if (id === 'contact') return 'דף יצירת קשר מיועד להסביר היכן נמצאות אפשרויות הפנייה באתר. הרשומה מיועדת לניווט בלבד ואינה המלצה לפנות או תחליף למענה מקצועי.';
  if (id === 'thank-you') return 'דף תודה מאשר שפנייה נשלחה דרך האתר ומסביר את המשך הניווט באתר. הרשומה מיועדת לניווט בלבד.';
  return result || normalized;
}

function truncateAtSentence(text, maxLength) {
  if (text.length <= maxLength) return text;
  const slice = text.slice(0, maxLength);
  const end = Math.max(slice.lastIndexOf('.'), slice.lastIndexOf('!'), slice.lastIndexOf('?'));
  return (end > 220 ? slice.slice(0, end + 1) : slice).trim();
}

function approvedContentFor(html, rel, id) {
  if (rel === '404.html') {
    return 'העמוד אינו נמצא. ניתן לחזור לדף הבית או להשתמש בניווט האתר כדי למצוא מידע קיים. רשומה זו מיועדת לניווט בלבד ואינה מקור לתשובה מקצועית, רפואית, טיפולית או משפטית.';
  }
  const mainMatch = html.match(/<main[\s\S]*?>([\s\S]*?)<\/main>/i);
  const text = stripHtml(mainMatch ? mainMatch[1] : html);
  const cleaned = cleanSentences(text, id);
  return truncateAtSentence(cleaned, 1800);
}

function summaryFor(approvedContent, description) {
  const cleanedDescription = description ? cleanSentences(description, '') : '';
  const hasContactWording = /WhatsApp|וואטסאפ|שלחו|צרו קשר|השאירו פרטים|התקשרו|054-633-0009|0546330009/i.test(cleanedDescription);
  const basis = cleanedDescription && cleanedDescription.length >= 80 && !hasContactWording ? cleanedDescription : approvedContent;
  return truncateAtSentence(cleanSentences(basis, ''), 420);
}

function hashContent(value) {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
}

const pages = walk(repo)
  .map((file) => {
    const html = fs.readFileSync(file, 'utf8');
    const rel = path.relative(repo, file).replace(/\\/g, '/');
    const id = idFromRel(rel);
    const title = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i) || firstMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i) || rel;
    const h1 = firstMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const descriptionMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) || html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
    const description = descriptionMatch ? normalizeText(descriptionMatch[1]) : '';
    const headings = Array.from(html.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi)).map((m) => stripHtml(m[1])).filter(Boolean).slice(0, 8);
    const previous = existingRecords.get(id);
    const approvedContent = previous?.approvedContent || approvedContentFor(html, rel, id);
    const summary = previous?.summary || summaryFor(approvedContent, description);
    const classification = previous?.safetyClassification || safetyClassification(rel, approvedContent);
    const restrictions = [];
    if (restrictedKeywords.some((pattern) => pattern.test(approvedContent))) restrictions.push('להציג בזהירות: לא לתת אבחון, טיפול, המלצה רפואית, מינונים, הבטחת תוצאה או מענה חירום.');
    if (rel.includes('privacy')) restrictions.push('לשאלות פרטיות להפנות למדיניות ולא לבקש פרטים מזהים בצ׳אט.');

    return {
      id,
      path: routeFromPath(file),
      relativeSourcePath: rel,
      publicUrl: canonicalFromPath(file),
      sourceUrl: canonicalFromPath(file),
      title,
      h1,
      description,
      category: categoryFromPath(rel),
      audience: audienceForPath(rel),
      topics: topicsFor(rel, title, headings),
      aliases: topicsFor(rel, title, headings).map((topic) => topic.toLowerCase()),
      headings,
      summary,
      approvedContent,
      contentHash: hashContent(approvedContent),
      safetyClassification: classification,
      responsePermission: previous?.responsePermission || responsePermission(rel, classification),
      restrictions,
      approvalStatus: previous?.approvalStatus || 'pending_amos_approval',
      reviewed: true,
      contentQa: {
        ...(previous?.contentQa || {}),
        promotionalCleanupApplied: cleanedPromotionalRecords.has(id),
        requiresAmosApproval: true
      }
    };
  })
  .sort((a, b) => a.path.localeCompare(b.path));

const output = {
  version: '2B.3d',
  generatedAt: new Date().toISOString(),
  optimizedAt: new Date().toISOString(),
  language: 'he-IL',
  purpose: 'Approved website-only knowledge candidate for the grounded AI website guide, pending Amos approval.',
  globalRules: [
    'Answer only from this approved website knowledge candidate after Amos approves it.',
    'Use approvedContent as the answer basis and summary only for retrieval/navigation.',
    'Do not diagnose, treat, prescribe, choose a medical framework, or promise outcomes.',
    'For urgent danger, violence, overdose, severe withdrawal, self-harm or immediate medical risk, tell the visitor the website and Amos are not emergency services and advise contacting local emergency or qualified professionals.',
    'Do not ask for identifying details or sensitive medical details in chat.',
    'Always include relevant source links when giving substantive guidance.'
  ],
  optimizationSummary: existingKnowledge?.optimizationSummary,
  cleanedPromotionalRecords: Array.from(cleanedPromotionalRecords),
  pages
};

fs.mkdirSync(path.join(repo, 'data'), { recursive: true });
fs.writeFileSync(path.join(repo, 'data', 'ai-guide-approved-knowledge.json'), JSON.stringify(output, null, 2), 'utf8');
console.log(JSON.stringify({ pages: pages.length, output: 'data/ai-guide-approved-knowledge.json' }));
