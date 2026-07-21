# Sprint 2B.3 Knowledge Review

## Sprint 2B.3d ApprovedContent Optimization

The knowledge candidate was optimized before Amos final approval. All 49 records remain pending human approval.

### Optimization Rules

- Preserve factual meaning, source URLs, safety boundaries, medical boundaries and `approvalStatus`.
- Remove page-interface text that should not appear in AI answers.
- Keep `summary` short for retrieval/navigation; use `approvedContent` as the candidate answer basis only after Amos approval.
- Do not add outside knowledge or new factual claims.

### Target Length Guidance

- Navigation-only records: 40-180 words when possible.
- Simple navigation/category records: 100-300 words.
- Substantive records: focused, source-grounded content; no record currently exceeds 800 words.

### Content Intentionally Excluded

- `זמן קריאה`
- `עודכן לאחרונה`
- `מאמר מידע והדרכה`
- `מאמר שקיפות והכוונה`
- `מאמר בטיחות והכוונה`
- `עמוד עוגן במרכז הידע`
- `קטגוריית ידע`
- `המאמר הקודם`
- `המאמר הבא`
- `קראו את המאמר`
- `מעבר לעמוד`
- `כניסה לקטגוריה`
- `קישורים פנימיים מומלצים`
- `1. 2.`
- `←`
- `→`
- `decorative symbols`
- Decorative symbols and UI-only link labels.

### Safety Content Preserved

- Emergency and immediate-danger boundaries.
- Medical, diagnosis, medication, dosage and detox boundaries.
- Privacy warnings against sharing identifying or sensitive medical details.
- Service-boundary language clarifying that the website is not medical, psychiatric, psychological, legal or emergency care.

### Builder Preservation Behavior

`scripts/build-ai-guide-knowledge.mjs` now loads the existing knowledge file when present and preserves manually reviewed `approvedContent`, `summary`, `responsePermission`, `safetyClassification`, `approvalStatus`, and `contentQa` values. Future builds remain deterministic and must not automatically approve records.

### Word Count Result

- Before: 12179 words
- After: 8829 words
- Reduction: 27.51%
- Minimum / median / maximum after optimization: 24 / 167 / 319 words

### Approval Status

All records still require Amos final approval. No record was marked approved.
