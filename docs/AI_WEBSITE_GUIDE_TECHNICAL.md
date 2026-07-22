# AI Website Guide Technical Notes

This file summarizes the current production-safe AI guide implementation. The historical Sprint 2B.3 details remain in `docs/AI_WEBSITE_GUIDE_2B3_TECHNICAL.md`.

## Sprint 3.2.3 Runtime Path Repair

Confirmed root cause:

- The production Netlify function failed at module startup because `fileURLToPath(import.meta.url)` received `undefined` after bundling.
- The failure happened before disabled-mode checks and before any OpenAI request could occur.

Repair:

- `netlify/lib/ai-guide-core.mjs` now guards `import.meta.url` before converting it to a file path.
- The approved knowledge file is resolved through bundled Netlify-compatible candidate paths instead of one brittle module-load-time path.
- `netlify.toml` includes `data/ai-guide-approved-knowledge.json` in the function bundle.

Safe behavior:

- `AI_GUIDE_ENABLED=false` or an unset value returns controlled `mode: "unavailable"` JSON with status `200`.
- Disabled mode does not require `OPENAI_API_KEY`.
- Disabled mode does not initialize or call OpenAI.
- Missing knowledge files return controlled unavailable JSON and do not expose stack traces or paths to visitors.

Validation completed locally:

- Function import.
- Disabled state without API key.
- Existing function regression tests.
- Existing mock integration tests.
- Existing prompt-injection tests.
- Missing knowledge file simulation.
- Static bundle path scan.
- Secret scan.
- Browser storage scan.

Production deployment and verification are still pending Amos approval.
