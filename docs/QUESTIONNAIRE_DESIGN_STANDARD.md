# Questionnaire Design Standard

## Permanent Rule

Every future website questionnaire must use the existing Treatment Guidance questionnaire design as the single design standard.

This applies to:

- addiction self-reflection questionnaires
- family guidance questionnaires
- topic-cluster questionnaires
- educational check-in tools
- conversion-support questionnaires

## Required UX Pattern

Future questionnaires should reuse the Treatment Guidance pattern:

- one question or one small decision group at a time
- clear progress indicator
- large readable answer options
- calm RTL spacing
- plain Hebrew wording
- visible validation only for the current step
- non-diagnostic results
- explicit safety boundaries when relevant
- privacy wording before any submission

## Do Not Create

Do not introduce a separate questionnaire visual language unless Amos explicitly approves it.

Avoid:

- new questionnaire layouts
- new stepper designs
- unrelated colours
- complex scoring visuals
- diagnosis-style labels
- medical or treatment recommendations
- automatic WhatsApp triggers
- automatic lead capture
- storage, cookies or analytics events unless separately approved

## Safety and Privacy

Questionnaires are educational and organizational tools only.

They must not:

- diagnose addiction
- determine treatment suitability
- replace medical, psychological, psychiatric or clinical assessment
- provide detox, tapering, dosage or medication instructions
- promise outcomes

If a questionnaire includes a lead form, answers may be sent only after explicit visitor action and consent.

## Reference Implementation

The reference implementation is:

`services/treatment-guidance.html`

Relevant elements:

- `#guidance-questionnaire`
- `.guidance-questionnaire`
- `.guidance-step-flow`
- `.guidance-progress`
- `.guidance-step-controls`
- `.guidance-result-panel`
- `#guidance-lead-section`

Any future questionnaire should start from this pattern and adapt only the content, not the design language.
