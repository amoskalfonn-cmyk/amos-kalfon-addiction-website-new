# Sprint 4.6 Conversion Audit Report

## Scope

Audited pages:

- Home
- Start Here
- Treatment Guidance
- Contact
- About
- Trust Center
- Knowledge Center
- For Professionals
- Alcohol pillar
- Gambling pillar
- Alcohol warning signs
- Alcohol family journey
- Professional choice guide

## Conversion Map

| Journey | Visitor Intent | Best First Step | Second Step | Enquiry Step |
| --- | --- | --- | --- | --- |
| Self journey | "I may have a problem." | Start Here or warning-sign page | Relevant pillar or Treatment Guidance | Contact only after orientation |
| Family journey | "I am worried about someone." | Family guidance page | Treatment Guidance | Contact after boundaries and safety context |
| Professional journey | "I may refer someone." | For Professionals | Trust Center / service boundaries | Professional contact |
| Research journey | "I want to understand first." | Knowledge Center / Q&A | Trust Center / pillar pages | Optional contact |

## Page Audit

| Page | Visitor Intent | Finding | Action |
| --- | --- | --- | --- |
| Home | Understand who Amos helps and what first step is available. | Start Here existed but was a small text link; Treatment Guidance was not visible as a secondary route. | Strengthened the first-step line with Start Here and Treatment Guidance links. |
| Start Here | Choose the right journey. | Strong routing hub; final contact wording was still generic. | Changed final CTA from generic details to a calmer first-call wording. |
| Treatment Guidance | Understand guidance before contact. | Questionnaire and boundaries are strong; Start Here connection existed and should remain. | No redesign; preserved the questionnaire and bridge card. |
| Contact | Submit a qualified enquiry. | Page allowed contact but did not first summarize suitable enquiry paths. | Added "לפני שפונים" summary with Start Here, Treatment Guidance and professional route cards. Clarified WhatsApp/form wording. |
| About | Build trust and understand background. | Existing trust and contact paths are adequate. | No change. |
| Trust Center | Verify boundaries, privacy and credibility. | Existing trust pathways are clear. | No change. |
| Knowledge Center | Find the right reading path. | "Need personal guidance?" linked directly to Contact too early. | Re-routed that link to Treatment Guidance. |
| For Professionals | Professional learning and possible referral. | Lacked a clear professional enquiry path. | Added one restrained professional contact section with Trust Center as secondary path. |
| Alcohol pillar | Learn and route to article/service paths. | Existing route cards are relevant and non-aggressive. | No change. |
| Gambling pillar | Learn and route to article/service paths. | Existing route cards are relevant and non-aggressive. | No change. |
| Alcohol warning signs | Check concern and choose next step. | Existing next-step journey is clear. | No change. |
| Alcohol family journey | Family concern, conversation and boundaries. | Existing next-step journey is clear. | No change. |
| Professional choice guide | Trust and provider selection. | Existing conversion section is aligned with intent. | No change. |

## Implemented Changes

- Home: improved the small first-step line so unsure visitors can choose Start Here or Treatment Guidance.
- Knowledge Center: changed an early generic contact link to Treatment Guidance.
- Start Here: adjusted the final contact CTA wording to "לקיים שיחה ראשונית".
- Contact: added a concise "לפני שפונים" summary and three route cards.
- Contact: changed form submit wording to "שליחת פנייה ראשונית".
- Contact: softened WhatsApp supporting text to "שאלה קצרה לפני שיחה".
- For Professionals: added a restrained professional enquiry block with Trust Center as the secondary path.

## CTA Consolidation

No useful CTA was removed. One early Knowledge Center contact path was consolidated into Treatment Guidance because the visitor is still likely comparing options rather than ready for direct contact.

## Trust Improvements

- Contact now tells visitors what kind of information is enough and discourages detailed sensitive information.
- For Professionals now clarifies that professional contact does not replace medical, therapeutic or clinical assessment.
- Start Here final CTA is framed as a first conversation rather than a vague form submission.

## Performance Impact

- No new JavaScript.
- No new dependency.
- No new images, PDFs, fonts or media.
- No new analytics or tracking.
- No new network request.
- HTML-only changes plus documentation and QA artifacts.

## Accessibility Notes

- Link labels are descriptive.
- No "click here" links were added.
- Existing focus states and button classes were reused.
- No popup, sticky overlay or auto-open behavior was added.

## Future Recommendations

- After the next content sprint, review whether homepage hero hierarchy should further separate "learn first" from "contact now".
- Consider a future lightweight Contact page microcopy review after real enquiry data is available.
- Do not add qualification forms until there is evidence that current enquiry quality is still too broad.

## Release Status

Commit, push, deployment, ZIP creation and Google indexing remain pending Amos approval.
