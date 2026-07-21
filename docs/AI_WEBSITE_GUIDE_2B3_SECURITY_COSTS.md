# Sprint 2B.3 - Security, Privacy and Cost Controls

## Key Handling

- The OpenAI API key is stored only in `.env.local` locally.
- `.env`, `.env.*` are ignored by Git.
- `.env.example` contains variable names only.
- The browser never receives the key.

## Privacy

Visitors are warned not to enter identifying or sensitive medical details. Legal/trust pages now include AI-guide disclosure language for privacy, terms, disclaimer, cookies and editorial policy.

## Cost Controls

- AI is gated by `AI_GUIDE_ENABLED=true`.
- Questions are length-limited.
- Endpoint has an in-memory rate limit.
- Retrieval limits prompt context to five pages.
- `max_output_tokens` is capped.
- Model can be changed through `AI_GUIDE_MODEL` without code edits.

## Safety Controls

High-risk emergency and medical requests are handled before OpenAI is called. When API quota, network, or parsing fails, the function returns a safe fallback with source links.

## Current Live API Status

A local live smoke test reached OpenAI successfully but returned an account quota/billing error. No secret was printed. Enable billing/quota for the selected project before relying on live AI responses in production.

## Sprint 2B.3a Production-Safe Defaults

Current defaults:

- `AI_GUIDE_ENABLED=false`
- `AI_GUIDE_USE_MOCK=false`

Deployment preparation only:

- Add `OPENAI_API_KEY` through Netlify environment variables only.
- Do not place `OPENAI_API_KEY` in Git or `netlify.toml`.
- Keep `AI_GUIDE_ENABLED=false` until paid live QA passes.
- Keep `AI_GUIDE_USE_MOCK=false` in production.
- To disable immediately, set `AI_GUIDE_ENABLED=false` or remove the production key.

No paid API usage occurred in Sprint 2B.3a.
