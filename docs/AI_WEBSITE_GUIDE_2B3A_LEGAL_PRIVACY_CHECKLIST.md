# Sprint 2B.3a - Legal and Privacy Review Checklist

Status: pending professional legal review.

## Pages Reviewed

- `privacy.html`
- `terms.html`
- `disclaimer.html`
- `cookies.html`
- `editorial-policy.html`

## What Was Added

- Disclosure that the site may include an AI website-orientation guide.
- Warning not to enter identifying details or sensitive medical information into chat.
- Clarification that AI answers may be processed by an external AI provider.
- Clarification that the AI guide is not diagnosis, treatment, medical advice, emergency support, or a replacement for qualified professionals.
- Cookies note stating the current guide does not require browser cookies to store a conversation.
- Editorial note that the AI guide uses approved website pages as source material.

## Statements Requiring Legal Review

- The exact description of third-party AI processing in `privacy.html`.
- The limitation-of-liability wording in `terms.html` and `disclaimer.html`.
- The statement that the current guide does not require cookies or browser storage.
- The editorial governance wording around approved source material.

## Statements Dependent on Production Data Handling

- Whether prompts are logged by hosting infrastructure or AI provider settings.
- Retention period, if any, for server logs.
- Whether analytics, forms or future monitoring tools are connected to AI guide events.
- Whether Netlify function logs include user prompts in production.

## Recheck After Final Live OpenAI Smoke Test

- Confirm the exact OpenAI model and project used in production.
- Confirm data retention settings available for the production project.
- Confirm whether any response metadata or prompts are logged.
- Confirm the public privacy text still matches actual production behavior.

No new legal guarantees were added in Sprint 2B.3a.
