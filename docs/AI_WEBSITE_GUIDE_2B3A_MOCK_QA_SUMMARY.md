# Sprint 2B.3a - Mock QA Summary

Mocked model responses — not a live OpenAI API test.

## Summary

- Knowledge records reviewed: 49
- Knowledge approval status: `pending_amos_approval`
- Function mock integration tests: 17 passed / 0 failed
- Prompt-injection tests: 8 passed / 0 failed
- Frontend screenshots captured: 14
- No paid OpenAI API request was made in this sprint.
- Live OpenAI smoke test remains pending until the OpenAI project has billing/quota.

## Mock Mode

Mock mode is opt-in only:

```text
AI_GUIDE_ENABLED=true
AI_GUIDE_USE_MOCK=true
AI_GUIDE_ENV=development
```

Defaults remain production-safe:

```text
AI_GUIDE_ENABLED=false
AI_GUIDE_USE_MOCK=false
```

Production must not use mock mode. The mock adapter rejects production mock use unless explicitly overridden for a controlled non-public environment.

## Screenshot Folder

`docs/qa-screenshots/ai-guide-2b3-mock-qa/`

## Remaining Live Test

After billing/quota is available, run one paid live smoke test through the Netlify Function with:

- `AI_GUIDE_ENABLED=true`
- `AI_GUIDE_USE_MOCK=false`
- valid `OPENAI_API_KEY`
- `OPENAI_MODEL=gpt-5-mini` or the approved production model

The live smoke test should verify one grounded answer, source citations, safety fallback, and no browser-side key exposure.
