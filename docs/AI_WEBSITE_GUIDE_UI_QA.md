# AI Website Guide UI QA



Sprint 2B.2 — Local UI prototype without AI API  

Date: 2026-07-20  

Status: implemented for limited QA pages only.



## Scope implemented



The local prototype for **עוזר ההתמצאות באתר** was added to these QA pages:



- `/`

- `/services/treatment-guidance.html`

- `/knowledge-center.html`

- `/for-professionals.html`

- `/articles/when-to-seek-help.html`



The prototype is fully local and uses predefined JavaScript responses only.



## Files added



- `css/ai-website-guide.css`

- `js/ai-website-guide.js`



## Page integration files



- `index.html`

- `services/treatment-guidance.html`

- `knowledge-center.html`

- `for-professionals.html`

- `articles/when-to-seek-help.html`



## Implemented states



- Closed floating launcher.

- Initial greeting.

- Audience route selection.

- Answer state with source links.

- Safety escalation state.

- Medical refusal state.

- Unknown fallback state.

- Loading simulation.

- Local error state.

- Unavailable demo state.

- Reset.

- Close and minimize.



## Implemented predefined routes



### Self



- סימנים שייתכן שכדאי לפנות לעזרה

- הבנת אפשרויות הליווי

- שאלון הכוונה

- מידע על סוגי התמכרויות

- חזרה להתחלה



### Family



- איך לפתוח שיחה

- הצבת גבולות

- סימני אזהרה

- מתי ליווי אינו מספיק

- חזרה להתחלה



### Professional



- עבודה עם משפחות

- גבולות השירות

- הפניה לשאלון ההכוונה

- מרכז הידע

- מידע לאנשי מקצוע

- חזרה להתחלה



### Question input



The local input recognizes the required keyword families:



- משפחה

- הימורים

- אלכוהול

- סמים

- שאלון

- איש מקצוע

- גבולות

- חירום

- תרופות

- גמילה

- אובדנות



## Safety behavior



Safety keywords stop normal navigation and show a distinct safety message. The prototype does not show a contact form in this state and does not hardcode phone numbers.



## Medical refusal behavior



Medication, dosage, detox, and unsupervised withdrawal requests are refused with a short medical boundary and relevant source links.



## Privacy behavior



The prototype does not use:



- API calls.

- Fetch/XHR.

- Local storage.

- Session storage.

- Cookies.

- IndexedDB.

- Analytics or tracking calls.

- Server-side logging.



Conversation state exists only in current page memory and clears on refresh.



## Accessibility QA checklist



- Launcher is a real button.

- Dialog has `role="dialog"`.

- Dialog references visible title and description.

- Keyboard opening and closing work.

- `Escape` closes the dialog.

- Focus is returned to the launcher after close.

- Tab focus is trapped while the dialog is open.

- Visible focus outlines are present.

- Message region uses `aria-live`.

- RTL text direction is enforced.

- Reduced motion skips loading delay.

- Layout remains usable at 200% zoom and mobile widths.



## Local QA results

Verified locally on 2026-07-20.

- Desktop Chrome and mobile viewport checks passed for all five integrated QA pages.
- 10 guide launcher/dialog checks passed: 5 pages × 2 viewports.
- Initial greeting, privacy notice, audience routes, answer state, source links, safety escalation, medical refusal, unknown fallback, reset, and close behavior passed.
- `Escape` closes the dialog and returns focus to the launcher.
- No JavaScript console errors were reported by the prototype QA run.
- No overlap was detected between the guide launcher and existing floating call/WhatsApp controls.
- All source links referenced by the prototype resolve to existing local pages.
- Static privacy check confirmed no `fetch`, `XMLHttpRequest`, `sendBeacon`, `localStorage`, `sessionStorage`, `indexedDB`, or `document.cookie` usage in the prototype script.
- JavaScript syntax check passed with `node --check`.
- CSS brace validation passed: 42 opening braces and 42 closing braces.
- CSS selector review found no broad shared selectors such as `.btn`, `.button`, `.contact-button`, `.call-float`, `body.internal-page`, `.container`, or `.card`.
- Full-site regression sweep found 49 HTML files and checked 98 viewport loads with no failures.

## QA screenshots and result artifacts

- `docs/qa-screenshots/ai-guide-2b2/home-desktop.png`
- `docs/qa-screenshots/ai-guide-2b2/home-mobile.png`
- `docs/qa-screenshots/ai-guide-2b2/treatment-guidance-desktop.png`
- `docs/qa-screenshots/ai-guide-2b2/treatment-guidance-mobile.png`
- `docs/qa-screenshots/ai-guide-2b2/knowledge-center-desktop.png`
- `docs/qa-screenshots/ai-guide-2b2/knowledge-center-mobile.png`
- `docs/qa-screenshots/ai-guide-2b2/for-professionals-desktop.png`
- `docs/qa-screenshots/ai-guide-2b2/for-professionals-mobile.png`
- `docs/qa-screenshots/ai-guide-2b2/article-when-to-seek-help-desktop.png`
- `docs/qa-screenshots/ai-guide-2b2/article-when-to-seek-help-mobile.png`
- `docs/qa-screenshots/ai-guide-2b2/qa-results.json`
- `docs/qa-screenshots/ai-guide-2b2/all-html-regression-results.json`
## Known limitations



- This is not an AI assistant.

- It has no server function and no API connection.

- It only answers from predefined local flows.

- It is intentionally installed on limited QA pages, not the whole website.

- It is not production-approved for launch.


## Sprint 2B.2.1 - UX Polish QA

Status: local UX polish implemented for the same five QA pages only.

### UX changes

- Replaced the dialog title with `איך אפשר לעזור לך?`.
- Added subtitle `עוזר AI להתמצאות באתר`.
- Added visible disclosure: `עוזר אוטומטי המבוסס על תוכן האתר`.
- Shortened the opening copy and kept the privacy notice compact.
- Replaced the initial action list with four large accessible audience cards.
- Reworked local predefined responses into structured answer cards.
- Added source cards with a document-style CSS icon, source label, page titles, and full-page links.
- Added up to three relevant follow-up suggestions after suitable answers.
- Added a local `כותב...` state with a 380ms delay when motion is allowed.
- Added subtle reveal transitions and reduced-motion-safe behavior.
- Added dedicated safety and medical-boundary cards.
- Added limited in-memory context for the current page session only.
- Reduced the floating launcher by about 10% while preserving a 44px minimum target.

### Copy changes

- Primary name: `עוזר AI`.
- Role: `עוזר ההתמצאות באתר`.
- Disclosure: `עוזר אוטומטי המבוסס על תוכן האתר`.
- Avoided wording that implies Amos is personally replying, monitoring, or reviewing live answers.

### Audience cards

- `מידע עבורי` - מאמרים, סימני אזהרה ושאלון הכוונה.
- `מידע לבני משפחה` - שיחה, גבולות והתמודדות עם אדם קרוב.
- `מידע לאנשי מקצוע` - כלים, מקורות, גבולות והפניות.
- `שאלה חופשית` - חיפוש תשובה מתוך התוכן הקיים באתר.

### In-memory context rules

Context is stored only in JavaScript variables and clears on reset or refresh. Closing and reopening the dialog during the same page view keeps the short route/topic context. No personal or medical details are stored.

Supported local examples:

- Family conversation -> refusal-related follow-up.
- Self route/signs -> when to seek help.
- Professional route -> service boundaries.
- Questionnaire -> what happens next.
- Gambling topic -> family-related follow-up.

### Safety and medical boundaries

- Emergency-like language displays a dedicated warning card and does not suggest contact/WhatsApp as emergency support.
- Medication, dosage, stopping medication, detox, alcohol withdrawal, benzodiazepines, or opioids display a dedicated medical-boundary card.
- No practical detox steps or medical instructions are provided.

### QA results

- Desktop and mobile local checks passed on the five integrated QA pages.
- Tested viewports: 320px, 375px, 390px, 768px, 1024px, 1366px.
- 200% zoom smoke checks passed at 390px and 1366px.
- Keyboard checks passed: launcher, cards, free-question form, Enter submit, Escape close, focus return, focus trap, reset.
- Free-question validation passed for empty input.
- Context examples passed.
- Safety and medical-boundary states passed.
- No horizontal overflow detected.
- No overlap detected with existing floating WhatsApp/call controls.
- Source links resolve to existing local pages.
- No console errors were reported in the local QA run.
- Static technical check confirmed no AI/API calls, no external chat service, no package dependency, no browser storage, and no analytics/tracking calls were added.

### Screenshot and QA artifacts

- `docs/qa-screenshots/ai-guide-2b2-1/home-desktop.png`
- `docs/qa-screenshots/ai-guide-2b2-1/home-mobile.png`
- `docs/qa-screenshots/ai-guide-2b2-1/treatment-guidance-desktop.png`
- `docs/qa-screenshots/ai-guide-2b2-1/treatment-guidance-mobile.png`
- `docs/qa-screenshots/ai-guide-2b2-1/knowledge-center-desktop.png`
- `docs/qa-screenshots/ai-guide-2b2-1/knowledge-center-mobile.png`
- `docs/qa-screenshots/ai-guide-2b2-1/for-professionals-desktop.png`
- `docs/qa-screenshots/ai-guide-2b2-1/for-professionals-mobile.png`
- `docs/qa-screenshots/ai-guide-2b2-1/article-when-to-seek-help-desktop.png`
- `docs/qa-screenshots/ai-guide-2b2-1/article-when-to-seek-help-mobile.png`
- `docs/qa-screenshots/ai-guide-2b2-1/qa-results.json`

### Known limitations

- The guide is still not AI.
- Responses are predefined and limited.
- The widget remains integrated only on the five QA pages.
- It is awaiting visual approval before any future grounded AI/server work.
- No AI API, API key, server function, storage, deployment, commit, push, or ZIP was added.


## Sprint 2B.2.1a - Targeted Readability, Mobile Layout, and Naming Fix

Status: targeted local correction completed.

### Corrections

- Updated assistant naming to `עוזר AI להתמצאות באתר` and removed the previous assistant-name wording.
- Kept heading exactly: `איך אפשר לעזור לך?`.
- Kept disclosure exactly: `עוזר אוטומטי המבוסס על תוכן האתר`.
- Improved opening-copy and privacy-copy contrast so text no longer appears disabled.
- Removed low-contrast visual treatment from important opening text.
- Improved mobile dialog structure with independent body scrolling, bottom padding, and reduced compact-height spacing.
- Confirmed the bottom utility row does not cover audience cards or question input.
- Confirmed RTL rendering of `AI` is readable in the subtitle.

### QA rechecks

- Tested viewports: 320x568, 375x667, 390x844, 768px width, and 200% zoom.
- Keyboard recheck passed: Tab order, focus trap, Escape close, focus return, reset.
- Mobile opening screen recheck passed: all four cards are reachable, including `שאלה חופשית`.
- No overlap was detected with WhatsApp/contact controls.
- No horizontal overflow was detected.
- No console errors were reported.
- Static technical check confirmed no fetch, XMLHttpRequest, sendBeacon, WebSocket, localStorage, sessionStorage, IndexedDB, cookies, external resources, analytics, API, or storage were added.

### Screenshot artifacts

- `docs/qa-screenshots/ai-guide-2b2-1a-final/desktop-opening.png`
- `docs/qa-screenshots/ai-guide-2b2-1a-final/mobile-390-opening.png`
- `docs/qa-screenshots/ai-guide-2b2-1a-final/mobile-390-bottom.png`
- `docs/qa-screenshots/ai-guide-2b2-1a-final/mobile-390-separation.png`
- `docs/qa-screenshots/ai-guide-2b2-1a-final/zoom-200.png`
- `docs/qa-screenshots/ai-guide-2b2-1a-final/qa-results.json`

### Limitations

- The feature remains a local prototype only.
- Responses remain predefined.
- No AI/API/server/storage/deployment was added.
