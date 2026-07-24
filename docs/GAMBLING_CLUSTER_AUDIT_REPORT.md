# Gambling Cluster Audit Report - Sprint 3.6

Date: 2026-07-24

## Scope

This audit reviewed the current gambling authority cluster after Sprint 3.5, without creating new content pages, PDFs, AI changes, deployment packages, commits, pushes or indexing requests.

Reviewed assets:

- `knowledge/gambling-addiction-guide.html`
- `knowledge/gambling-addiction-warning-signs.html`
- `knowledge/talking-to-family-about-gambling-addiction.html`
- `knowledge/gambling-debt-recovery-guide.html`
- `knowledge/sports-gambling-addiction-guide.html`
- `knowledge/rebuilding-trust-after-gambling-harm.html`
- `knowledge/gambling.html`
- `articles/gambling-addiction-signs.html`
- `knowledge-center.html`
- `sitemap.xml`
- `downloads/family-first-steps-gambling-harm-guide-he.pdf`

## Executive Summary

The gambling cluster is now structurally strong: it has one clear authority pillar, multiple supporting articles for different search intents, educational interactive tools, family-focused content and a printable guide. The cluster stays within YMYL boundaries by avoiding diagnosis, treatment promises, emergency-service claims and unsupported recovery guarantees.

The main weakness found was routing, not content quality. The older gambling topic page and older short article did not sufficiently guide visitors and search engines into the newer authority cluster. Sprint 3.6 corrected this with focused internal-link improvements only.

## Issues Fixed In Sprint 3.6

| Priority | File | Issue | Fix |
|---|---|---|---|
| High | `knowledge/gambling.html` | The topic hub routed mainly to the older short gambling article instead of the current authority cluster. | Replaced the reading-path section with links to all current gambling cluster pages. |
| Medium | `articles/gambling-addiction-signs.html` | The older short article overlapped with the newer warning-signs page and had weak routing to the current cluster. | Added a calm contextual bridge to the gambling pillar and the newer warning-signs article. |
| Low | `sitemap.xml` | Touched pages needed refreshed `lastmod` values after the internal-link updates. | Updated `lastmod` for `knowledge/gambling.html` and `articles/gambling-addiction-signs`. |

## SEO Observations

### Strengths

- The cluster has a clear pillar/supporting-article structure.
- Main gambling pages have unique page titles, meta descriptions and canonicals.
- The cluster covers multiple intent types: informational, family support, financial harm, sports betting, self-reflection and trust repair.
- Article, BreadcrumbList and FAQPage schema are present where appropriate.
- Visible FAQ content and schema questions are not duplicated across the reviewed cluster.
- `robots.txt` allows crawling and references the sitemap.
- `sitemap.xml` includes the current gambling cluster URLs.

### Remaining SEO Risks

| Priority | Issue | Recommendation |
|---|---|---|
| High | `articles/gambling-addiction-signs.html` remains a potential cannibalization risk against `knowledge/gambling-addiction-warning-signs.html`. | Keep the bridge link for now. After Search Console data is available, decide whether to expand the old article, keep it as a short legacy support page, canonicalize it, or noindex it. |
| Medium | `knowledge/gambling.html` and `knowledge/gambling-addiction-guide.html` both cover broad gambling intent. | Keep `knowledge/gambling.html` as the category/topic hub and `knowledge/gambling-addiction-guide.html` as the full authority pillar. Avoid making the hub a long competing article. |
| Low | Some CTA and author/service-boundary language repeats across pages. | This is acceptable boilerplate, but future edits can vary CTA copy slightly by intent. |

## Duplicate Content And Cannibalization Review

No duplicate titles, meta descriptions, canonicals or FAQ questions were found across the reviewed pages. Repeated text is mainly expected boilerplate: author credentials, service-boundary language, footer/legal wording and some CTA phrasing.

The only meaningful overlap is the older short article `articles/gambling-addiction-signs.html` versus the newer `knowledge/gambling-addiction-warning-signs.html`. The older article should currently function as a lightweight support/bridge page, not as the primary warning-signs asset.

## Internal Linking Review

### Before Optimization

- The main pillar linked naturally to supporting pages.
- Supporting pages linked back into the cluster.
- Knowledge Center exposed the main gambling resources.
- `knowledge/gambling.html` was underpowered as a hub and did not route visitors into all current gambling assets.
- The older `articles/gambling-addiction-signs.html` had no strong bridge to the current authority cluster.

### After Optimization

- `knowledge/gambling.html` now links to:
  - `knowledge/gambling-addiction-guide.html`
  - `knowledge/gambling-addiction-warning-signs.html`
  - `knowledge/talking-to-family-about-gambling-addiction.html`
  - `knowledge/gambling-debt-recovery-guide.html`
  - `knowledge/sports-gambling-addiction-guide.html`
  - `knowledge/rebuilding-trust-after-gambling-harm.html`
- `articles/gambling-addiction-signs.html` now links to:
  - `knowledge/gambling-addiction-guide.html`
  - `knowledge/gambling-addiction-warning-signs.html`

## Navigation And UX Observations

The Knowledge Center is not overloaded yet and still provides clean entry points into the gambling cluster. The category page can now act as a practical topic hub. No global navigation change is recommended at this stage.

If the gambling cluster grows beyond the current set of assets, consider adding a compact "start here" module in Knowledge Center or on `knowledge/gambling.html`, but this is not required now.

## Accessibility And Mobile Observations

Source review did not find obvious accessibility regressions in the cluster. The interactive tools remain client-side and educational. Current page structures use standard links, headings, visible labels and RTL content.

Recommended ongoing QA for every release:

- Desktop 1366px.
- Tablet 768px.
- Mobile 390px.
- Small mobile 320px.
- Keyboard flow through calculators/questionnaires.
- No horizontal overflow.
- No console errors.

## Technical Observations

- No broken local links were found in the reviewed cluster.
- No sitemap conflict was found for the preferred gambling-cluster URLs.
- No AI code, API configuration, environment variables or paid OpenAI behavior was touched.
- No new storage, cookies, analytics events or network requests were introduced in this sprint.
- The PDF remains a supporting download and does not need a sitemap entry while its parent article is indexable.

## Priority Recommendations

### High

1. Keep `knowledge/gambling-addiction-guide.html` as the canonical authority pillar for gambling addiction.
2. Monitor `articles/gambling-addiction-signs.html` against `knowledge/gambling-addiction-warning-signs.html` in Search Console before deciding on merge, noindex or canonical changes.
3. Continue linking all future gambling pages back to the pillar and to the most relevant supporting article.

### Medium

1. Review Search Console queries after recrawl to identify whether the pillar, warning-signs page and old article are competing.
2. Refresh external source links periodically because YMYL references can move or redirect.
3. Add a compact cluster overview only if the number of gambling pages grows enough to require extra routing.

### Low

1. Vary repeated CTA copy by page intent during future content updates.
2. Consider adding a short "recommended path" note to future gambling pages to help visitors choose the next reading step.

## Sprint 4 Recommendation

Do not add another gambling page immediately unless Search Console shows a clear gap. The current gambling cluster is strong enough to move into monitoring and refinement.

Recommended next strategic Sprint 4 direction: start the next addiction authority cluster, with Amos choosing the business priority. The strongest options are:

- Alcohol addiction authority foundation.
- Drug addiction authority foundation.
- Family support pillar for substance-use concerns.

If Amos prefers to stay within gambling, the next page should be narrowly intent-led, such as guidance for a partner who discovered hidden gambling debt.

## Final Status

The gambling cluster can move to Amos review. The cluster is stronger after the internal-link optimization, but the older short gambling article should remain under observation before making any canonical/noindex decision.

