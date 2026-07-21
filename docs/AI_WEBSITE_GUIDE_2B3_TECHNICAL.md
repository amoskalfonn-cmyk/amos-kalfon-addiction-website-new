# Sprint 2B.3 - Grounded AI Website Guide Technical Notes

## Scope

The site now includes a server-side grounded AI path for the existing `עוזר AI להתמצאות באתר` widget.

## Architecture

- Browser UI: `js/ai-website-guide.js`
- Server endpoint: `/.netlify/functions/ai-guide`
- Netlify Function: `netlify/functions/ai-guide.mjs`
- Shared server logic: `netlify/lib/ai-guide-core.mjs`
- Approved website knowledge: `data/ai-guide-approved-knowledge.json`
- Knowledge builder: `scripts/build-ai-guide-knowledge.mjs`

The browser does not call OpenAI directly and never receives the API key.

## OpenAI API

The function uses the OpenAI Responses API with a JSON schema response format. The default model is configurable through `AI_GUIDE_MODEL` and currently defaults to `gpt-5-mini`.

Official references used:

- https://platform.openai.com/docs/api-reference/responses/create
- https://platform.openai.com/docs/guides/structured-outputs
- https://platform.openai.com/docs/models

## Environment Variables

Required in Netlify production:

- `OPENAI_API_KEY`
- `AI_GUIDE_ENABLED=true`

Optional:

- `AI_GUIDE_MODEL=gpt-5-mini`

Local files:

- `.env.local` stores the local key and is ignored by Git.
- `.env.example` documents the required variables without secrets.

## Safety Controls

- POST-only endpoint.
- No response caching.
- In-memory IP rate limit.
- Input length limit.
- Emergency and medical-boundary pattern handling before model calls.
- Curated retrieval from approved website pages.
- Structured JSON output enforced.
- Fallback answer when AI is disabled, unavailable, over quota, or returns invalid content.

## Known Deployment Requirement

A live smoke test reached OpenAI but returned quota/billing error from the Platform account. Production AI answers require the selected OpenAI project to have available quota/billing. Until then, the guide remains safe and functional through fallback/source navigation.

## Sprint 2B.3a Mock QA Addendum

No additional live OpenAI API requests were made in Sprint 2B.3a. Because the selected OpenAI project currently has no available billing quota, QA was completed with a deterministic development-only mock adapter.

Mock adapter:

- `netlify/lib/ai-guide-mock.mjs`
- enabled only by `AI_GUIDE_USE_MOCK=true`
- intended for local/development QA only
- not exposed to visitors
- not used automatically in production

The mock adapter returns controlled structured outputs that pass through the same parsing, validation and source allowlisting pipeline as real Responses API output.

Production defaults remain disabled:

- `AI_GUIDE_ENABLED=false`
- `AI_GUIDE_USE_MOCK=false`

The remaining paid live smoke test is documented in `docs/AI_WEBSITE_GUIDE_2B3A_MOCK_QA_SUMMARY.md`.
