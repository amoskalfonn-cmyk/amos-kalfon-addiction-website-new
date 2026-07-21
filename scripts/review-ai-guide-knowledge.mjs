import fs from 'node:fs';
import path from 'node:path';

const repo = process.cwd();
const knowledge = JSON.parse(fs.readFileSync(path.join(repo, 'data', 'ai-guide-approved-knowledge.json'), 'utf8'));
const issues = [];
const seenPaths = new Set();
const seenUrls = new Set();

function issue(path, field, problem) {
  issues.push({ path, field, problem });
}

for (const page of knowledge.pages) {
  if (!page.title || page.title.length < 3) issue(page.path, 'title', 'missing_or_short');
  if (!page.sourceUrl || !page.sourceUrl.startsWith('https://amos-kalfon-addiction-counselor.com/')) issue(page.path, 'sourceUrl', 'invalid_public_url');
  if (!page.audience) issue(page.path, 'audience', 'missing');
  if (!Array.isArray(page.topics) || !page.topics.length) issue(page.path, 'topics', 'missing');
  if (!Array.isArray(page.aliases) || !page.aliases.length) issue(page.path, 'aliases', 'missing');
  if (!page.summary || page.summary.length < 80) issue(page.path, 'summary', 'thin_or_missing');
  if (/<header|<footer|<nav|<script|<form/i.test(page.summary)) issue(page.path, 'summary', 'html_clutter');
  if (/OPENAI_API_KEY|sk-proj|\.env\.local|submitted|form submission/i.test(page.summary)) issue(page.path, 'summary', 'private_or_secret_risk');
  if (!page.safetyClassification) issue(page.path, 'safetyClassification', 'missing');
  if (!page.responsePermission) issue(page.path, 'responsePermission', 'missing');
  if (page.approvalStatus !== 'pending_amos_approval') issue(page.path, 'approvalStatus', 'must_remain_pending');
  if (seenPaths.has(page.path)) issue(page.path, 'path', 'duplicate');
  if (seenUrls.has(page.sourceUrl)) issue(page.path, 'sourceUrl', 'duplicate');
  seenPaths.add(page.path);
  seenUrls.add(page.sourceUrl);
}

const result = {
  reviewedAt: new Date().toISOString(),
  recordCount: knowledge.pages.length,
  approvalStatus: 'pending_amos_approval',
  checks: {
    correctPageTitle: issues.filter((i) => i.field === 'title').length === 0,
    correctPublicUrl: issues.filter((i) => i.field === 'sourceUrl').length === 0,
    audiencePresent: issues.filter((i) => i.field === 'audience').length === 0,
    topicsAndAliasesPresent: issues.filter((i) => i.field === 'topics' || i.field === 'aliases').length === 0,
    cleanApprovedContent: issues.filter((i) => i.field === 'summary').length === 0,
    safetyClassificationPresent: issues.filter((i) => i.field === 'safetyClassification').length === 0,
    responsePermissionPresent: issues.filter((i) => i.field === 'responsePermission').length === 0,
    noDuplicatePathsOrUrls: issues.filter((i) => i.problem === 'duplicate').length === 0,
    noSecretsOrSubmittedData: issues.filter((i) => i.problem === 'private_or_secret_risk').length === 0
  },
  issues
};

fs.writeFileSync(path.join(repo, 'docs', 'AI_WEBSITE_GUIDE_2B3A_KNOWLEDGE_APPROVAL_CHECKLIST.json'), JSON.stringify(result, null, 2), 'utf8');
console.log(JSON.stringify({ recordCount: result.recordCount, issueCount: issues.length, approvalStatus: result.approvalStatus }));
