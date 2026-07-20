# Changelog

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

- Added a local-only UI prototype for `עוזר ההתמצאות באתר` on the approved QA pages.
- Added predefined audience routes, source-linked answers, unknown fallback, safety escalation, medical refusal, loading, unavailable, error, reset, and close states.
- Added privacy-safe client behavior with no API, no network chat calls, no storage, no analytics, no Netlify Function, and no external dependencies.
- Added dedicated UI QA documentation at `docs/AI_WEBSITE_GUIDE_UI_QA.md`.
- No commit, push, deploy, ZIP, API key, or package installation was performed.


## 2026-07-20 - Sprint 2B.2.1: Polish local website guide UX

- Redesigned the opening experience for `עוזר AI להתמצאות באתר`.
- Added four primary audience cards for self, family, professionals, and free questions.
- Rewrote predefined local responses into more natural, human-readable answer cards.
- Added source-card presentation, full-page links, and related follow-up suggestions.
- Added a local `כותב...` loading state and subtle reduced-motion-safe transitions.
- Added limited in-memory context for current-session route/topic follow-ups.
- Improved emergency and medical-boundary presentation with dedicated cards.
- Reduced the launcher size while preserving accessibility and mobile usability.
- No AI API, API key, server function, storage, analytics, deployment, commit, push, or ZIP was added.


## 2026-07-20 - Sprint 2B.2.1a: AI guide readability and mobile layout fix

- Improved opening and privacy text contrast so the copy reads clearly and no longer appears disabled.
- Fixed mobile footer/content separation with independent dialog scrolling and compact-height spacing.
- Renamed the assistant to `עוזר AI להתמצאות באתר`.
- Updated related RTL and accessibility labels.
- No AI API, API key, Netlify Function, package, analytics, storage, deployment, commit, push, or ZIP was added.
