# Project Roadmap
## Sprint 3.2.3 - Netlify AI Function Runtime Repair (2026-07-22)
- Repaired the production Netlify AI function startup path error by guarding `import.meta.url` usage and resolving the approved knowledge file through Netlify-compatible bundled file candidates.
- Added `netlify.toml` function file inclusion for `data/ai-guide-approved-knowledge.json`.
- Kept production-safe AI defaults: disabled mode returns a controlled unavailable response and does not call OpenAI or require an API key.
- Completed local runtime, mock, safety, prompt-injection, missing-knowledge, bundle-path, storage and secret-scan QA.
- Pending: Amos approval, then commit, push, deploy and production verification of the repaired function.

## Sprint 3.2.2 - Home Page SEO Metadata (2026-07-22)
- Completed a focused homepage `<head>` audit covering title, description, robots, canonical, Open Graph, Twitter, favicon references, structured data, sitemap and robots.txt.
- Repaired the homepage metadata issue by replacing the short meta description with a fuller Hebrew description and aligning the Open Graph and Twitter descriptions.
- Confirmed local/source SEO validation: one title, one meta description, self-referencing canonical, indexable robots directive, valid JSON-LD syntax, one H1 and no staging or localhost metadata.
- Production verification remains pending after the next approved release; no deploy, push, commit, ZIP or indexing request was performed.

## Sprint 3.2.1 - Trust Center Footer Readability (2026-07-22)
- Fixed the Trust Center footer readability regression where two body-text blocks used a light colour on the internal-page footer's light background.
- Kept the existing premium footer design, link behavior, button styling, layout and responsive behavior unchanged.
- Completed desktop, tablet, mobile and small-mobile QA for contrast, overflow, console errors and link/action readability.

## Sprint 3.2 - Gambling Cluster Part 1 (2026-07-22)
- Added the first two supporting articles for the gambling authority cluster: warning signs and family conversation guidance.
- Kept `knowledge/gambling-addiction-guide.html` as the central authority pillar and added contextual links in both directions.
- Updated Knowledge Center and sitemap with only preferred canonical `.html` URLs.
- Completed source, safety, accessibility and mobile QA; artifacts are stored in `docs/qa-screenshots/sprint-3-2-gambling-cluster-part-1/`.
- Pending indexing list: `knowledge/gambling-addiction-guide.html`, `knowledge/gambling-addiction-warning-signs.html`, `knowledge/talking-to-family-about-gambling-addiction.html`.
- Next cluster topics remain future work and require separate approval.


## Completed

### Sprint 3.1a - Final URL, Sources and Release Validation
- Validated the gambling pillar page public URL against current knowledge-page conventions, sitemap usage, canonical usage and Netlify clean URL behavior.
- Kept the preferred canonical URL as `https://amos-kalfon-addiction-counselor.com/knowledge/gambling-addiction-guide.html` to match existing knowledge-page canonical and sitemap patterns.
- Validated professional sources and replaced redirected or outdated source URLs with cleaner current destinations.
- Aligned FAQPage schema with the visible FAQ content and completed safety, SEO, responsive and regression QA.
- No redesign, deployment, ZIP, commit or push was performed.

### Sprint 3.1 - Authority SEO Foundation Pillar Page: Gambling Addiction
- Created the first long-form authority SEO pillar page: `knowledge/gambling-addiction-guide.html`.
- Covered gambling addiction definition, development, risk factors, warning signs, financial and family impact, safety language, help options in Israel, choosing help, FAQ, sources and complementary reading.
- Added Article, BreadcrumbList and FAQPage schema, a canonical URL, Open Graph/Twitter metadata, internal anchors and a sitemap entry.
- Linked the new pillar from `knowledge-center.html` without changing global navigation, CSS or JavaScript.
- Preserved YMYL boundaries: no diagnosis, no treatment promise, no recovery guarantee and no emergency-service claim.

### Sprint 2B.1 - Grounded AI Website Guide Specification
- Created a complete planning specification for a future safe, grounded AI website guide.
- Defined approved website sources, allowed and forbidden behavior, emergency policy, privacy requirements, technical architecture, UI/accessibility requirements and a 60-prompt test matrix.
- No website UI, chatbot, API integration, packages, Netlify Functions, deployment or production behavior changes were made.


### Sprint 2A.3.2 - Treatment Guidance Content, Step-by-Step Questionnaire and Email Lead Delivery
- Replaced the examples table with readable content cards.
- Converted the questionnaire into a guided one-question-at-a-time flow.
- Added a consent-based Netlify lead form carrying the questionnaire summary and structured answers without sending anything automatically.
- Preserved approved summary logic, emergency behavior, SEO, schema and existing URLs.


### Sprint 2A.3.1 - Treatment Guidance Page UI and Questionnaire Repair
- Repaired only the approved treatment-guidance examples table, questionnaire UI and inline result behavior.
- Preserved locked SEO, schema, navigation, URLs, CTA destinations, storage-free behavior and unrelated pages.


### Sprint 2A.3 - Initial Guidance Questionnaire
- Completed an isolated non-diagnostic questionnaire for the treatment guidance page.
- Preserved the locked page structure, SEO, schema, CTAs, navigation, styling and existing functionality.

### Sprint 2A.2 - Treatment Guidance Page Conversion Improvements
- Completed five isolated trust and conversion sections on the treatment guidance page.
- Preserved the locked page structure, SEO, schema, CTAs, navigation, styling and functionality.

### Sprint 2A.1 - Guidance Process Timeline
- Completed an isolated premium RTL timeline section on the treatment guidance page.
- Preserved the locked Sprint 2A page content, CTAs, SEO, schema, navigation and functionality.

### Sprint 2A - Services & Conversion: Treatment Guidance & Referral
- Created a dedicated premium service page for treatment guidance and referral.
- Clarified service boundaries: guidance only, no diagnosis, no treatment guarantees and no replacement for licensed medical or therapeutic assessment.
- Added FAQ, structured data, internal links and sitemap coverage.

## Recommended Next Sprints

1. Sprint 3.2 - Build the gambling support cluster: debt from gambling, spouse/family conversation, sports betting, rebuilding trust, and what not to do when discovering hidden debt.
2. Add contextual links from related family and gambling articles into the new gambling pillar after content QA approval.
3. Expand service-level internal linking from relevant knowledge pages such as families, recovery, alcohol, drugs and gambling.
4. Add a short decision checklist section to `articles/how-to-choose-addiction-help` that links naturally to the treatment-guidance service page.
5. Build a trust-focused referral explainer for families: what to ask a treatment provider before enrolling.
6. Add conversion measurement QA for contact-form submissions and WhatsApp click events if analytics is configured.
7. Consider adding a future short checklist PDF or printable guide for families comparing treatment options, only after content approval.
8. Consider future analytics review of the treatment-guidance page after real traffic data is available; do not add tracking changes without approval.
9. Consider future usage review before adding answer transfer, analytics events, or prefilled WhatsApp summaries; do not implement without approval.
10. Sprint 2B.4 - Safety, accessibility, privacy, and production QA.

## Sprint 2B.2 - Local AI Website Guide UI Prototype

Status: implemented locally for limited QA pages only.

- Added the restrained floating entry point `עזרה בהתמצאות באתר`.
- Implemented predefined local flows for visitors, family members, professionals, and keyword-based questions.
- Implemented visible safety, medical refusal, unknown fallback, loading, local error, unavailable demo, reset, and close states.
- Added source links to existing website pages for every substantive answer.
- Kept the prototype disconnected from AI/API services, server functions, storage, analytics, and external dependencies.
- Limited integration to the approved QA pages before any future grounded AI/server work.

Next: Sprint 2B.3 may connect a server-side grounded AI flow only after explicit approval, privacy/legal review, and protected environment configuration.


## Sprint 2B.2.1 - Local AI Website Guide UX Polish

Status: implemented locally and awaiting visual approval.

- Polished the existing local-only prototype for `עוזר AI להתמצאות באתר`.
- Added a warmer opening experience, four audience cards, structured answer cards, source areas, full-page links, and follow-up suggestions.
- Added local typing/loading feedback, reduced-motion-safe transitions, improved fallback, safety, and medical-boundary cards.
- Added limited in-memory context for predefined navigation topics only.
- Kept responses predefined and disconnected from AI/API services.
- No AI connection, API key, Netlify Function, storage, analytics, deployment, commit, push, or ZIP was added.

Next: Sprint 2B.3 remains future work and must not begin without explicit approval.


## Sprint 2B.2.1a - Targeted AI Guide Visual and Naming Correction

Status: implemented locally and awaiting final visual approval.

- Improved opening and privacy text readability.
- Fixed mobile content/footer separation and internal scrolling behavior.
- Renamed the assistant to `עוזר AI להתמצאות באתר`.
- Kept the prototype local-only with predefined responses.
- No AI integration, API, storage, analytics, deployment, commit, push, or ZIP was added.

## Sprint 2B.2.1b - AI Launcher Redesign and Site-Wide Local Prototype Integration

Status: implemented locally and awaiting final visual approval.

- Redesigned the launcher as a restrained AI navigation-assistant entry point with `עוזר AI` and `התמצאות באתר` labels.
- Integrated the local guide across all 49 public HTML pages using shared root-relative CSS and JS assets.
- Kept one source of truth in `css/ai-website-guide.css` and `js/ai-website-guide.js`.
- Preserved predefined local responses only; no AI connection was added.
- No API, API key, Netlify Function, package, analytics, storage, deployment, commit, push, or ZIP was added.

Next: final visual approval before any future grounded AI/server integration.


## Sprint 2B.3a - Mock QA Completion

Completed non-paid QA for the grounded AI guide while OpenAI billing quota is unavailable.

- Kept OpenAI Responses API architecture.
- Added development-only mock adapter.
- Completed deterministic integration, source allowlisting, safety, medical-boundary and prompt-injection tests.
- Captured mock frontend QA screenshots.
- Production remains disabled until live paid smoke test passes.
- Knowledge approval remains pending Amos approval.

## Sprint 2B.3c - Knowledge Candidate Repair

Status: completed locally and pending Amos human approval.

- Repaired the AI guide knowledge candidate with explicit `approvedContent` for all 49 records.
- Kept all records at `approvalStatus: "pending_amos_approval"`.
- Removed promotional/contact CTA wording from general answer content and documented the 9 cleaned records.
- Restricted `/404.html` to `navigation_only` with neutral page-not-found content.
- Added `publicUrl`, `relativeSourcePath`, and `contentHash` review fields for approval QA.
- Production activation remains blocked until Amos approves the knowledge base and the remaining live OpenAI smoke tests are explicitly approved.
- No production activation, OpenAI request, commit, push, deploy, or ZIP was performed.

## Sprint 2B.3d - Knowledge Optimization Before Final Approval

Status: completed locally and pending Amos final approval.

- Optimized the 49-record AI guide knowledge candidate to reduce unnecessary `approvedContent` length.
- Removed reading-time/update metadata, previous/next article navigation, page-navigation labels, repeated link labels and decorative UI fragments from retrieval content.
- Preserved factual meaning, source URLs, safety boundaries, medical boundaries and all `approvalStatus: "pending_amos_approval"` values.
- Updated the builder to preserve manually reviewed knowledge fields on future deterministic builds.
- No runtime code, production activation, OpenAI request, commit, push, deploy, or ZIP was performed.

## Sprint 2B.3f - Final UAT Defect Fixes Before Intermediate Release

Status: implemented locally and awaiting Amos review.

- Added a stricter grounded-answer relevance threshold before both mock and production model paths.
- Unsupported topics without approved website knowledge, including shopping, food, work and online-shopping addiction, now return an explicit insufficient-information state.
- Added deterministic prompt-injection refusal before any model call for requests involving hidden instructions, prompts, API keys, `.env` files, environment variables or internal files.
- Fixed corrupted Hebrew follow-up/loading/rate-limit labels in the AI guide frontend.
- Mock regression testing passed for gambling, family, professional, emergency and medical-boundary flows.
- Live OpenAI smoke testing remains pending explicit approval and must not run until Amos approves it.
- No paid OpenAI request, commit, push, deploy or ZIP was performed.
# Sprint 3.3 - Gambling Debt Guidance and Cost Awareness Calculator

Status: implemented locally and awaiting Amos review.

- Added the new article `knowledge/gambling-debt-recovery-guide.html` for the gambling authority cluster.
- Added a privacy-safe educational calculator that estimates gambling spend by frequency and period, plus optional borrowing and fee estimates shown separately.
- Kept the calculator deterministic and browser-only: no storage, no cookies, no network requests, no lead form and no automatic WhatsApp/contact trigger.
- Connected the page from the gambling pillar and Knowledge Center and added the canonical URL to the sitemap.
- Preserved YMYL boundaries: no diagnosis, no treatment promise, no legal/financial advice and clear emergency/safety wording.
- No AI activation, paid OpenAI request, commit, push, deploy or ZIP was performed.

Next: Sprint 3.4 should expand the gambling cluster with a family-focused page on what to do when a parent or partner discovers hidden gambling debt.
