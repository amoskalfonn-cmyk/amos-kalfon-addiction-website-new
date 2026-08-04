# Changelog
## Sprint 5.0 - Pornography addiction SEO pillar page (2026-08-04)
- Created `/pornography-addiction/` as a Hebrew SEO pillar page with 3,078 visible Hebrew words.
- Added SEO metadata, canonical URL, Open Graph, Twitter tags, Article schema, BreadcrumbList schema and FAQPage schema.
- Added the page to `sitemap.xml` and connected contextual inbound links from the pornography category, the short pornography article and the specialties page.
- Reused existing layout, CSS, JavaScript, assets, footer, WhatsApp controls and accessibility patterns without redesigning existing pages.
- Completed responsive and technical QA locally; deployment is not marked as complete until production deployment actually occurs.

## Sprint 4.6 - Conversion and navigation optimization (2026-07-27)
- Audited the highest-value conversion entry points: Home, Start Here, Treatment Guidance, Contact, About, Trust Center, Knowledge Center, For Professionals, the alcohol and gambling pillars, alcohol warning signs, alcohol family journey and the professional choice guide.
- Strengthened the homepage first-step line so unsure visitors can choose either `start-here.html` or `services/treatment-guidance.html`.
- Re-routed one early Knowledge Center generic contact path to Treatment Guidance so visitors can understand options before direct contact.
- Refined the Start Here final CTA from a generic details request to a calmer first-call action.
- Added a concise "לפני שפונים" section to `contact.html` with three self-qualification routes: Start Here, Treatment Guidance and For Professionals.
- Clarified Contact page WhatsApp and form submit wording to support qualified initial enquiries without requesting sensitive detail.
- Added a restrained professional contact path to `for-professionals.html` with Trust Center as the secondary route.
- Created `docs/CTA_AND_CONVERSION_STANDARD.md` and `docs/CONVERSION_AUDIT_REPORT.md`.
- Preserved existing branding, navigation structure, WhatsApp links, AI-disabled state, forms, JavaScript, schema and canonical URLs.
- Commit, push, deploy, ZIP creation and Google indexing remain pending Amos approval.

## Sprint 4.5 - Where Do I Start guided entry page (2026-07-26)
- Created `start-here.html` as a site-wide guided entry page for visitors who are unsure where to begin.
- Added four visible route cards near the top: self-concern, family concern, professional referral and learning before deciding.
- Routed each audience to only existing live pages, including the gambling pillar, alcohol pillar, warning-sign pages, family pages, Treatment Guidance, Knowledge Center, Trust Center and Contact.
- Added one restrained safety note and one restrained contact section near the end, without diagnosis, medical advice, emergency-service claims or pressure.
- Added a small homepage entry point and a Knowledge Center orientation block; the main navigation was intentionally left unchanged to avoid overload.
- Added a Treatment Guidance bridge card for visitors who need route selection before a guidance call.
- Added WebPage and BreadcrumbList schema, a self-referencing canonical URL, Open Graph and Twitter metadata, and the preferred URL in `sitemap.xml`.
- Documented the future content-cluster structure around personal, family and treatment-decision journeys.
- Commit, push, deploy, ZIP creation and Google indexing remain pending Amos approval.
## Sprint 4.4 - Alcohol family conversation journey (2026-07-26)
- Created `knowledge/talking-to-family-about-alcohol.html`, a Hebrew family-journey article for spouses, parents, adult children, siblings and close family members worried about a person who drinks too much.
- Added calm, practical guidance for preparing a first conversation, choosing time and place, opening without accusation, handling denial or anger, setting boundaries and knowing when to stop the conversation.
- Added a two-column "מה אפשר להגיד?" comparison block using existing card components, with less-helpful phrases and calmer alternatives.
- Preserved YMYL safety boundaries: no diagnosis, no detox instructions, no medication guidance, no legal or financial advice and clear emergency wording for violence, self-harm risk, children at risk and medical emergencies.
- Added one restrained four-path next-step section to the alcohol pillar, alcohol warning signs, Treatment Guidance and Contact.
- Linked the new page from Knowledge Center, the alcohol pillar, alcohol warning signs and Treatment Guidance, and added the canonical URL to `sitemap.xml`.
- Added Article, BreadcrumbList and FAQPage schema with visible FAQ content matching the schema.
- Reused existing CSS, JavaScript, article layout, cards, FAQ, footer and WhatsApp functionality; no new assets or libraries were added.
- Commit, push, deploy, ZIP creation and Google indexing remain pending Amos approval.

## Sprint 4.3 - Professional choice guide and trust conversion path (2026-07-26)
- Created `knowledge/how-to-choose-addiction-professional.html`, a focused Hebrew trust page for visitors comparing professionals, private support, public services and treatment options.
- Differentiated the new page from the existing `articles/how-to-choose-addiction-help` article: the new page focuses on professional selection, role clarity, boundaries, first-call expectations, private/public comparison and provider red flags.
- Added balanced private/public-care guidance without presenting private care as automatically better or public care as inferior.
- Preserved Amos's approved role boundaries: guidance, consulting, accompaniment and referral orientation only; no diagnosis, medical treatment, psychotherapy, psychiatric care, medical detox, legal advice, financial advice or emergency service.
- Added one restrained conversion section near the end with three calm routes: Treatment Guidance, About and Contact.
- Added internal links from Knowledge Center, Treatment Guidance, the alcohol pillar and the gambling pillar, and added the preferred canonical URL to `sitemap.xml`.
- Validated claims against NIAAA, SAMHSA/NCBI, FindTreatment.gov and NHS sources; softened wording where it could imply treatment selection, diagnosis or guaranteed outcomes.
- Preserved existing design, CSS, JavaScript, AI state, WhatsApp links, contact links and global navigation.
- Added the strategic planning rule: after every two major content sprints, schedule one UX, trust, navigation or conversion-focused sprint before continuing high-volume content expansion.
- Commit, push, deploy, ZIP creation and Google indexing remain pending Amos approval.

## Sprint 4.2 - Alcohol warning signs journey and conversion path (2026-07-26)
- Created `knowledge/alcohol-warning-signs.html`, a focused Hebrew supporting article for visitors asking whether they may be drinking too much.
- Built the article around a single user journey: initial concern, practical warning signs, safety boundaries and four calm next-step paths.
- Added Article, BreadcrumbList and FAQPage schema with visible FAQ content matching the schema.
- Connected the article from the alcohol pillar page, Knowledge Center and `sitemap.xml` using the preferred `.html` canonical URL.
- Improved the Knowledge Center alcohol cluster entry so it now starts with the alcohol pillar and the warning-signs article instead of a single isolated card.
- Documented the permanent questionnaire design rule in `docs/QUESTIONNAIRE_DESIGN_STANDARD.md`: future questionnaires must use the existing Treatment Guidance questionnaire pattern.
- Preserved global design, CSS, JavaScript, AI state, WhatsApp links, contact links and service boundaries.
- Commit, push, deploy, ZIP creation and Google indexing remain pending Amos approval.

## Sprint 4.1 - Alcohol cluster foundation pillar page (2026-07-26)
- Created `knowledge/problematic-alcohol-use-guide.html` as the flagship Hebrew pillar page for the alcohol authority cluster.
- Covered problematic drinking, alcohol addiction/dependence, early and advanced warning signs, family impact, work and sleep, treatment options, community support and careful help selection.
- Added a prominent audience route map and internal table of contents using existing article and related-card components.
- Added clear medical-safety boundaries around alcohol withdrawal: no abrupt-stop instruction, no tapering schedule, no medication guidance and proportionate urgent warning signs.
- Added Article, BreadcrumbList and FAQPage schema, with visible FAQ matching the schema.
- Added the new pillar page to `knowledge-center.html` and `sitemap.xml` using the preferred `.html` canonical URL only.
- Validated claims against WHO, NIAAA, NHS, CDC and Israeli Ministry of Health/public-health sources.
- Commit, push, deploy, ZIP creation and Google indexing remain pending Amos approval.
## Sprint 3.6 - Gambling cluster audit and optimization (2026-07-24)
- Audited the full gambling authority cluster for metadata uniqueness, canonicals, schema, FAQ consistency, broken links, duplicate content, internal linking, navigation, accessibility and technical risks.
- Improved `knowledge/gambling.html` so the gambling topic hub routes visitors into the current authority cluster instead of relying on the older short article.
- Added bridge links from `articles/gambling-addiction-signs.html` to the current gambling pillar and warning-signs article to reduce cannibalization risk.
- Updated sitemap lastmod values for the two touched pages.
- Created `docs/GAMBLING_CLUSTER_AUDIT_REPORT.md`.
- No new content pages, PDFs, AI changes, deployment, ZIP, commit, push or indexing request was performed.

## Sprint 3.5 - Rebuilding trust after gambling harm and family PDF guide (2026-07-24)
- Created `knowledge/rebuilding-trust-after-gambling-harm.html`, a Hebrew supporting article for families and partners about rebuilding trust after gambling-related secrecy, debt or broken promises.
- Added the printable family guide PDF at `downloads/family-first-steps-gambling-harm-guide-he.pdf` with 12 pages, checkboxes, note areas, safety wording, service-boundary wording and no JavaScript.
- Added one calm direct download section in the article; the PDF opens as a normal file link without a form, email gate, WhatsApp trigger, third-party service or tracking link.
- Added Article, BreadcrumbList and FAQPage schema; the visible FAQ and FAQ schema both contain 4 matching questions.
- Updated internal links from the gambling pillar, Knowledge Center, family conversation article, debt guide and sports gambling guide.
- Updated `sitemap.xml` with the preferred canonical article URL only; the PDF was intentionally not added to the sitemap because it supports the indexable HTML article.
- Validated source URLs from WHO, NHS and SAMHSA/NCBI, and kept claims educational, non-diagnostic and non-promissory.
- Completed local desktop, tablet, mobile, 320px, PDF, link, metadata, schema, privacy and secret-scan QA. Artifacts are stored in `docs/qa-screenshots/sprint-3-5-trust-family-guide/`.
- Commit, push, deploy, ZIP creation and Google indexing remain pending Amos approval.

## Sprint 3.4 - Sports gambling guide and self-reflection questionnaire (2026-07-22)
- Created `knowledge/sports-gambling-addiction-guide.html`, a Hebrew gambling-cluster article about sports betting, live betting, betting apps, perceived control, chasing losses, peer-group influence, warning signs and when to pause.
- Added a 14-question client-side self-reflection questionnaire titled `׳”׳׳ ׳“׳₪׳•׳¡ ׳”׳”׳™׳׳•׳¨׳™׳ ׳©׳׳™ ׳׳¦׳“׳™׳§ ׳₪׳ ׳™׳™׳” ׳׳™׳™׳¢׳•׳¥?`.
- Kept questionnaire output educational and non-diagnostic: no addiction label, no medical claim, no treatment promise and no replacement for professional assessment.
- Preserved privacy by keeping all questionnaire state in browser memory only, with no cookies, storage, analytics event, WhatsApp trigger or network request.
- Added Article, BreadcrumbList and FAQPage schema with a self-referencing canonical URL, Open Graph and Twitter metadata.
- Connected the page from the gambling pillar, warning-signs article, debt guide, Knowledge Center and `sitemap.xml`.
- Updated the roadmap for Amos review. Commit, push, deploy, ZIP creation and Google indexing remain pending approval.

## Sprint 3.2.3 - Netlify AI function runtime path repair (2026-07-22)
- Fixed the Netlify AI function startup failure caused by `fileURLToPath(import.meta.url)` receiving an undefined bundled runtime URL.
- Replaced the brittle module-load-time knowledge path with guarded module path resolution plus current-working-directory fallback candidates.
- Added `netlify.toml` function `included_files` configuration so `data/ai-guide-approved-knowledge.json` is bundled with the function deployment.
- Preserved safe disabled behavior: when `AI_GUIDE_ENABLED` is not explicitly `true`, the function returns the existing controlled unavailable JSON response and does not call OpenAI.
- Added controlled handling for missing or unreadable knowledge files without exposing stack traces, local paths or environment values to visitors.
- Completed local function, mock, prompt-injection, disabled-state, missing-knowledge, static bundle-path, storage and secret scans without any paid OpenAI API request.
- Production deployment and production verification remain pending Amos approval.

## Sprint 3.2.2 - Home page SEO metadata validation and repair (2026-07-22)
- Audited the homepage `<head>` metadata, indexability signals, structured data, favicons, Open Graph and Twitter metadata.
- Confirmed the homepage meta description was present but too short for a valid production SEO check and inconsistent with the shorter social descriptions.
- Replaced the homepage meta description with a fuller 145-character Hebrew description and aligned the Open Graph and Twitter descriptions to the same copy.
- Verified the homepage title, canonical URL, robots directive, sitemap homepage URL, structured data JSON-LD syntax, favicon references and H1 count locally.
- Production validation remains pending the next approved release because no deploy was performed.

## Sprint 3.2.1 - Trust Center footer text visibility fix (2026-07-22)
- Fixed low-contrast body text in two Trust Center footer cards: `׳¢׳׳•׳¡ ׳›׳׳₪׳•׳` and `׳”׳©׳׳™׳¨׳• ׳₪׳ ׳™׳™׳”`.
- Preserved the existing footer structure, links, button styling, hover behavior, layout, branding and colours outside the affected body text.
- Improved desktop, tablet and mobile readability without changing unrelated pages or global footer styling.
- Commit, push, deploy and ZIP creation remain pending Amos approval.

## Sprint 3.2 - Gambling content cluster, part 1 (2026-07-22)
- Created two Hebrew supporting articles in the knowledge section: `knowledge/gambling-addiction-warning-signs.html` and `knowledge/talking-to-family-about-gambling-addiction.html`.
- Linked both articles back to the gambling pillar page and updated the pillar related-reading section so the new articles are live cluster assets, not future topics.
- Added both articles to `knowledge-center.html` using the existing resource-card structure without changing global layout or CSS.
- Added the two preferred `.html` canonical URLs to `sitemap.xml`.
- Added Article, BreadcrumbList and FAQPage schema for both articles, with visible FAQ questions matching the schema.
- Reviewed source support, YMYL safety wording, service-boundary language, accessibility and mobile readability.
- Created QA artifacts under `docs/qa-screenshots/sprint-3-2-gambling-cluster-part-1/`.
- Commit, push, deploy, ZIP creation and Google indexing remain pending Amos approval.


## Sprint 3.1a - Final URL, Sources and Release Validation

### Fixed
- Aligned the gambling pillar FAQPage schema with the visible FAQ questions and answers.
- Replaced the NCPG source with the publicly accessible NHS gambling addiction source for pre-release source validation.
- Replaced the redirected NCBI Books source URL with its final canonical destination.
- Replaced the older gov.il 118 source URL with the current government department page for the Ministry of Welfare and Social Affairs 118 hotline.

### Verified
- Confirmed the preferred public URL follows the current knowledge-page canonical convention: `https://amos-kalfon-addiction-counselor.com/knowledge/gambling-addiction-guide.html`.
- Completed source, safety, SEO, internal-link, sitemap, responsive and console-error validation for the new gambling pillar page.

### Not Included
- No redesign, full article rewrite, unrelated page changes, deployment, ZIP, commit or push was performed.

## Sprint 3.1 - Authority SEO Foundation Pillar Page: Gambling Addiction

### Added
- Created `knowledge/gambling-addiction-guide.html` as a long-form Hebrew authority pillar page for gambling addiction.
- Added Article, BreadcrumbList and FAQPage structured data for the new pillar page.
- Added a natural internal entry point from `knowledge-center.html` to the new guide.
- Added the new canonical URL to `sitemap.xml`.

### Changed
- Updated `PROJECT_ROADMAP.md` with the completed Sprint 3.1 SEO foundation work and next-cluster recommendations.

### Not Included
- No CSS, JavaScript, global navigation, existing schema, deployment, ZIP, commit or push was performed.

## Sprint 2B.3f - Final UAT Defect Fixes Before Intermediate Release

### Fixed
- Added a stricter relevance gate before grounded-answer generation so unsupported addiction topics now return `insufficient_information` instead of a broad generic treatment answer.
- Added deterministic prompt-injection refusal for requests to reveal internal instructions, prompts, API keys, `.env` files, environment variables or internal files.
- Repaired corrupted Hebrew strings in AI guide remote answer follow-up chips, loading text, rate-limit text and unavailable server text.

### QA
- Mock integration tests passed in development mock mode.
- Prompt-injection tests passed without exposing secrets or internal implementation details.
- Unsupported questions about shopping, food, work and online shopping addiction now fail safely.
- Existing gambling, family, professional, emergency and medical-boundary flows were retested in mock mode.

### Not Included
- Live OpenAI smoke testing is still pending explicit approval.
- No paid OpenAI API request, commit, push, deploy or ZIP was performed.

## Sprint 2B.3d - Knowledge Optimization Before Final Approval

### Changed
- Reduced unnecessary `approvedContent` length across the AI guide knowledge candidate.
- Removed reading-time and update metadata from approved answer content.
- Removed previous/next article labels, page-navigation labels, repeated link labels and decorative UI fragments.
- Preserved factual meaning, safety boundaries, source URLs and `approvalStatus: "pending_amos_approval"` for all records.
- Updated the knowledge builder to preserve manually reviewed `approvedContent`, permissions, classifications and approval status on future builds.

### Not Included
- No HTML, CSS, browser JavaScript, Netlify Function, prompt, retrieval, safety logic, medical-boundary logic, API request, commit, push, deploy, or ZIP was performed.

## Sprint 2B.3c - Repair AI Knowledge Candidate for Approval

### Added
- Added explicit `approvedContent` to all 49 AI guide knowledge records.
- Added `publicUrl`, `relativeSourcePath`, and `contentHash` review fields to the generated knowledge candidate.
- Added updated content approval and knowledge review documentation for Amos review.

### Changed
- Removed promotional/contact CTA wording from general knowledge content.
- Restricted `/404.html` to `navigation_only` with neutral recovery-navigation content.
- Preserved `approvalStatus: "pending_amos_approval"` for every record.
- Updated the knowledge builder so future generated candidates preserve the corrected schema.

### Not Included
- No HTML, CSS, browser JavaScript, Netlify Function, prompt, retrieval, safety, medical-boundary, rate-limit, production activation, OpenAI request, commit, push, deploy, or ZIP was performed.

## v5.29.0 - 2026-07-20

### Added
- Created `docs/AI_WEBSITE_GUIDE_SPEC.md` as a planning-only specification for a future grounded AI website guide.
- Documented approved source inventory, allowed and forbidden assistant behavior, emergency escalation policy, privacy requirements, technical architecture, UI/accessibility requirements, future implementation phases and a 60-prompt test matrix.

### Changed
- Updated `PROJECT_ROADMAP.md` with Sprint 2B.1 through Sprint 2B.4 planning milestones.

### Not Included
- No chatbot, AI API connection, API key, Netlify Function, package installation, production UI change, deployment or ZIP was created in this sprint.


## v5.28.5 - 2026-07-17

### Changed
- Replaced the treatment-guidance examples table with normal readable content cards that preserve the approved meaning without recommendations or diagnosis.
- Converted the initial guidance questionnaire into a one-question-at-a-time guided flow with Next, Back and progress indicator.
- Preserved the approved contextual summary and immediate-danger behavior while adapting them to the guided flow.
- Added a post-summary Netlify contact inquiry form that includes structured questionnaire summary and answers only after explicit consent and submission.

### Fixed
- Prevented all-question validation lists by validating only the current visible step.
- Kept WhatsApp free of questionnaire answers and prefilled questionnaire content.
- Preserved SEO metadata, schema, navigation, global design, existing WhatsApp URLs and unrelated workflows.


## v5.28.4 - 2026-07-17

### Changed
- Repaired the treatment-guidance examples table with a scoped comparison layout for desktop and stacked cards on mobile.
- Repaired the initial guidance questionnaire visual layout with compact question cards, aligned clickable answer rows and selected-state styling.
- Rebuilt the questionnaire result behavior so the summary button validates required answers and shows one inline contextual result panel below the button.

### Fixed
- Fixed the questionnaire submit button appearing inactive by preventing reloads, validating missing answers inline and rendering an accessible same-page result.
- Added immediate-danger result behavior with prominent safety wording and no normal guidance summary.
- Preserved SEO metadata, schema, navigation, existing URLs, WhatsApp links, contact links and storage-free behavior.


## v5.28.3 - 2026-07-17

### Added
- Added an isolated interactive initial guidance questionnaire to `services/treatment-guidance.html`.
- Added a safety notice that appears when immediate danger is selected.
- Added a supportive non-diagnostic result message and privacy notice for the questionnaire.
- Added post-questionnaire WhatsApp and contact-form buttons without prefilling or transmitting answers.

### Changed
- No SEO metadata, schema, navigation, existing CTA sections, typography, spacing, colors, existing page sections, or existing functionality were changed.

### Fixed
- No defect fixes were included; this sprint only adds the approved questionnaire section.

## v5.28.2 - 2026-07-17

### Added
- Added five isolated conversion-support sections to `services/treatment-guidance.html`:
  - Why choosing a treatment framework can feel difficult.
  - A modest first-person explanation of why Amos guides this process.
  - A general comparison table for different situations and possible directions to check.
  - A section clarifying who the service may fit.
  - A section clarifying who the service is not suitable for and when emergency/professional care is required.

### Changed
- No SEO metadata, schema, navigation, CTA buttons, colors, typography, spacing, JavaScript, or existing page sections were changed.

### Fixed
- No defect fixes were included; this sprint only adds the approved conversion-support content.

## v5.28.1 - 2026-07-17

### Added
- Added an isolated RTL process timeline section to `services/treatment-guidance.html` explaining how the guidance process works.

### Changed
- No SEO metadata, schema, navigation, CTA sections, existing content blocks, JavaScript, links, or global styling were changed.

### Fixed
- No defect fixes were included; this sprint only adds the approved isolated trust-building section.

## v5.28.0 - 2026-07-17

### Added
- Added a premium service page for treatment guidance and referral: `services/treatment-guidance.html`.
- Added SEO metadata, Open Graph metadata, canonical URL, breadcrumb schema, Service schema and FAQ schema for the new page.
- Added an internal discovery link from `specialties.html` to the new service page.
- Added the new service page to `sitemap.xml`.

### Changed
- No global design, navigation, JavaScript, form behavior or existing WhatsApp/contact URLs were changed.

### Fixed
- Prevented the new service page from becoming orphaned by linking it from the existing specialties page.

## 2026-07-20 - Sprint 2B.2: Local website guide UI prototype

- Added a local-only UI prototype for `׳¢׳•׳–׳¨ ׳”׳”׳×׳׳¦׳׳•׳× ׳‘׳׳×׳¨` on the approved QA pages.
- Added predefined audience routes, source-linked answers, unknown fallback, safety escalation, medical refusal, loading, unavailable, error, reset, and close states.
- Added privacy-safe client behavior with no API, no network chat calls, no storage, no analytics, no Netlify Function, and no external dependencies.
- Added dedicated UI QA documentation at `docs/AI_WEBSITE_GUIDE_UI_QA.md`.
- No commit, push, deploy, ZIP, API key, or package installation was performed.


## 2026-07-20 - Sprint 2B.2.1: Polish local website guide UX

- Redesigned the opening experience for `׳¢׳•׳–׳¨ AI ׳׳”׳×׳׳¦׳׳•׳× ׳‘׳׳×׳¨`.
- Added four primary audience cards for self, family, professionals, and free questions.
- Rewrote predefined local responses into more natural, human-readable answer cards.
- Added source-card presentation, full-page links, and related follow-up suggestions.
- Added a local `׳›׳•׳×׳‘...` loading state and subtle reduced-motion-safe transitions.
- Added limited in-memory context for current-session route/topic follow-ups.
- Improved emergency and medical-boundary presentation with dedicated cards.
- Reduced the launcher size while preserving accessibility and mobile usability.
- No AI API, API key, server function, storage, analytics, deployment, commit, push, or ZIP was added.


## 2026-07-20 - Sprint 2B.2.1a: AI guide readability and mobile layout fix

- Improved opening and privacy text contrast so the copy reads clearly and no longer appears disabled.
- Fixed mobile footer/content separation with independent dialog scrolling and compact-height spacing.
- Renamed the assistant to `׳¢׳•׳–׳¨ AI ׳׳”׳×׳׳¦׳׳•׳× ׳‘׳׳×׳¨`.
- Updated related RTL and accessibility labels.
- No AI API, API key, Netlify Function, package, analytics, storage, deployment, commit, push, or ZIP was added.

## 2026-07-20 - Sprint 2B.2.1b: AI launcher redesign and site-wide local guide integration

- Redesigned the floating launcher as an AI navigation-assistant button with a local inline SVG symbol, two-line label, hover/focus/open states, and accessible naming.
- Added the local AI website guide assets to all 49 public HTML pages using root-relative CSS and JavaScript references.
- Preserved the shared JS-injected widget model so the guide markup, behavior, and styling remain single-source.
- Verified root and nested page asset paths, duplicate-widget prevention, keyboard behavior, mobile positioning, and no overlap with WhatsApp/contact controls.
- Preserved predefined local responses, safety wording, privacy behavior, medical boundaries, emergency behavior, and in-memory-only state.
- No AI API, API key, Netlify Function, package, external icon library, analytics, storage, deployment, commit, push, or ZIP was added.


## Sprint 2B.3 - Grounded AI Website Guide Integration

- Added a server-side Netlify Function at `netlify/functions/ai-guide.mjs` so the browser never calls OpenAI directly.
- Added shared AI guide server logic with input limits, rate limiting, emergency/medical boundaries, approved-source retrieval, structured JSON output and safe fallback handling.
- Generated `data/ai-guide-approved-knowledge.json` from 49 approved HTML pages using `scripts/build-ai-guide-knowledge.mjs`.
- Updated the existing AI website guide frontend to call `/.netlify/functions/ai-guide` for free-text questions while preserving local safety and medical boundary behavior.
- Added `.env.example` and protected local env files through `.gitignore`; the local API key is stored only in ignored `.env.local`.
- Added AI disclosure language to privacy, terms, disclaimer, cookies and editorial policy pages.
- Added technical, knowledge-review, security and cost-control documentation in `docs/`.
- QA: local function tests passed for normal fallback, safety boundary, medical boundary and rate limit. Live OpenAI smoke test reached the API but returned quota/billing error, so production AI answers require project quota/billing before activation.
- No commit, push, deploy or ZIP was created.

## Sprint 2B.3a - Complete Grounded AI QA Without Paid API Usage

- Added development-only mock Responses API adapter at `netlify/lib/ai-guide-mock.mjs`.
- Kept the OpenAI Responses API integration and server-side Netlify Function architecture intact.
- Hardened output validation so external or unretrieved source paths fall back safely and never render to visitors.
- Added `AI_GUIDE_USE_MOCK=false` to `.env.example` and documented production-safe defaults.
- Expanded safety and medical-boundary pattern coverage for English prompt-injection attempts.
- Updated approved knowledge generation with audience, topics, aliases, safety classification, response permission and `pending_amos_approval` status.
- Added automated knowledge review, mock integration tests, prompt-injection tests and static QA scripts.
- Captured 14 mock frontend QA screenshots in `docs/qa-screenshots/ai-guide-2b3-mock-qa/`.
- Added legal/privacy review checklist and mock QA summary documentation.
- No paid OpenAI request, commit, push, deploy or ZIP was performed.
# 2026-07-22 - Sprint 3.3: Gambling debt guidance and cost-awareness calculator

## Added
- Added `knowledge/gambling-debt-recovery-guide.html`, a new Hebrew YMYL-safe article about exiting gambling-related debt cycles.
- Added a client-side-only educational `׳׳—׳©׳‘׳•׳ ׳¢׳׳•׳× ׳”׳”׳™׳׳•׳¨׳™׳` inside the article with no storage, no cookies, no network calls and no lead capture.
- Added Article, BreadcrumbList and visible-FAQ-aligned FAQPage structured data for the new page.
- Added the new canonical URL to `sitemap.xml`.

## Changed
- Added the new debt/cost article to the gambling pillar related-reading cluster.
- Added the new article to the Knowledge Center pillar/resources area.

## QA
- Validated calculator input handling for empty values, decimals, zero, negative values, invalid text and oversized values.
- Planned desktop, tablet, mobile and 320px visual QA artifacts under `docs/qa-screenshots/sprint-3-3-gambling-debt-calculator/`.
- No AI activation, paid OpenAI request, commit, push, deploy or ZIP was performed.
