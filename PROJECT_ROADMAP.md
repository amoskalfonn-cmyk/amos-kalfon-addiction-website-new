# Project Roadmap

## Completed

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

1. Expand service-level internal linking from relevant knowledge pages such as families, recovery, alcohol, drugs and gambling.
2. Add a short decision checklist section to `articles/how-to-choose-addiction-help` that links naturally to the new service page.
3. Build a trust-focused referral explainer for families: what to ask a treatment provider before enrolling.
4. Add conversion measurement QA for contact-form submissions and WhatsApp click events if analytics is configured.
5. Consider adding a future short checklist PDF or printable guide for families comparing treatment options, only after content approval.
6. Consider future analytics review of the treatment-guidance page after real traffic data is available; do not add tracking changes without approval.
7. Consider future usage review before adding answer transfer, analytics events, or prefilled WhatsApp summaries; do not implement without approval.
8. Sprint 2B.2 - Local UI prototype without AI API.
9. Sprint 2B.3 - Grounded AI and Netlify Function integration.
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

