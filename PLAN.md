# openapis.org — WordPress → Markdown migration

## Context

`www.openapis.org` runs on WordPress (Salient theme + WPBakery page builder) inside the Linux
Foundation multisite install (`/wp-content/uploads/sites/31/`), hosted on Pantheon. There is **no
admin access**: no wp-admin, no database, no WXR export.

Recovery options were probed and ruled out:

| Source                       | Result                                                      |
| ---------------------------- | ----------------------------------------------------------- |
| `/wp-json/wp/v2/*`           | **404** — core REST API disabled                            |
| `/?rest_route=/wp/v2/*`      | **404** — query fallback also disabled                      |
| `/feed/`, `/blog/feed/`      | **200 but zero-byte body**                                  |
| `/wp-json/tribe/events/v1/*` | 200 — events plugin only, superseded by events.openapis.org |
| `wp-sitemap.xml`             | **200 — complete URL inventory**                            |

So the content is recovered by scraping rendered HTML, driven by the sitemap.

The goal is to put this site on the same footing as `events.openapis.org`: content authored as
Markdown in Git, changes proposed as pull requests with a **live preview URL**, production deployed
by GitHub Actions.

## Decisions

| Question      | Decision                                                                                            |
| ------------- | --------------------------------------------------------------------------------------------------- |
| Design system | Keep current page layouts, restyle with `events.openapis.org` tokens (`#65D100`, Onest, light/dark) |
| Stack         | Next.js 16 + MDX, mirroring `oai-events`                                                            |
| PR previews   | Cloudflare Pages; production on GitHub Pages via Actions                                            |
| Scope         | Everything, original URLs preserved, redirects for the rest                                         |

## Inventory

Measured from `wp-sitemap.xml` plus a full crawl of all 51 pages and a 14-post sample.

| Bucket             |                 Count | Notes                                                                                                                                                                                         |
| ------------------ | --------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Blog posts         |                   184 | 2015–2026. Prefixes `/blog/`, `/news/`, `/announcement/`, `/events/`, `/uncategorized/` + `/YYYY/MM/DD/slug`                                                                                  |
| Real content pages |                   ~30 | ~124k chars of prose                                                                                                                                                                          |
| WordPress cruft    |                   ~14 | `/login`, `/logout`, `/register`, `/user`, `/account`, `/members`, `/password-reset`, `/under-construction`, `/home-2`, `/home-2-2`, duplicate mailing-list / join / calendar pages — dropped |
| Categories         |                     6 | `blog`, `news`, `announcement`, `events`, `presentation`, `uncategorized`                                                                                                                     |
| Tags               |                    89 |                                                                                                                                                                                               |
| Authors            |                     7 | `openapi`, `sensiblewood`, `marshg`, `abringaze`, `darrmi`, `kinlane`, `swaldron`                                                                                                             |
| Media              | ~114 unique in sample | Mostly member logos (PNG); 51 are WP `-WxH` thumbnails of the same originals                                                                                                                  |

### Conversion surface

Post bodies contain only `p, a, strong, em, b, ul, ol, li, h3, h4, img, figure, figcaption, br,
hr, sup, s, mark`. No tables, no code blocks, no iframes, no leftover shortcodes.

Metadata is present in the markup:

- `h1.entry-title` — title
- `.meta-author .fn a[rel=author]` — author name + `/author/<slug>` URL
- `.meta-date` — date
- `.meta-category a` — category
- `article[id^=post-]` class list — `category-*` and `tag-*`
- `div.content-inner` — body
- Pages: `div.container.main-content` up to `#footer-outer`

### Page shapes

1. **Prose** (~16) — convert directly to Markdown. `governance` (15k chars), `what-is-openapi`
   (11.6k), `arazzo-specification` (10k), `style-guide` (7k), `faq` (5.8k),
   `openapi-blog-guidelines`, `travel-expense-reimbursement-policy`,
   `code-of-conduct-transparency-report`, `about`, `participatehow-to-contribute`,
   `specificationrepo`, `blog/presentations`.
2. **Composed** (~5) — component compositions, hand-authored as MDX. Home (8 sections, 25
   `vc_row`), `membership-benefits` (96 `vc_row`, 3 tables), `testimonials` (87 `vc_row`, 21
   images), `about/technical-developer-community` (16 people), `membershipjoin`.
3. **Templated repeats** (9) — APIDAYS CFP pages, identical structure. One template + data.
4. **Generated indexes** — `/blog`, `/events`, `/membershipmembers`. Produced by the app.

### Site chrome

- **Nav**: About, Specifications, Participate, Governance, Membership, Blog, FAQ, What is OpenAPI?,
  Events, + LinkedIn/GitHub. Several submenu entries are off-site (`spec.openapis.org`,
  `learn.openapis.org`, GitHub, Slack, `joinnow.platform.linuxfoundation.org`).
- **Footer**: Trademark Usage / Privacy Policy / Terms of Use → linuxfoundation.org, + social.
- **Linux Foundation Projects** bar above the header.
- **Newsletter**: HubSpot, portal `8112310`, form `292f670f-56d8-4713-9e8d-6e3777caa8c9`.
  Re-embed `js.hsforms.net/forms/embed/v2.js`; no backend required.
- **Analytics**: `lfx-segment-analytics.min.js` + LF cookie-consent banner. Both are an LF
  requirement.
- **Search**: currently a WordPress `?s=` GET. Replaced by a build-time index + client modal.

## Architecture

### Simplification over `oai-events`

`oai-events` needs `require.context` plus a raw-string YAML loader because its Cloudflare **Worker**
target has no filesystem at runtime. This project does not: both targets consume the same static
`out/` artifact (GitHub Pages for production, Cloudflare **Pages** for previews), so content is read
with `fs` at build time. No OpenNext, no Worker, no YAML loader.

`basePath` is empty everywhere — custom domain in production, root on Pages previews — so the
`NEXT_PUBLIC_BASE_PATH` handling in `oai-events/next.config.ts` also drops out.

### Layout

```
content/
  pages/<slug>.mdx                    prose + composed pages
  blog/<YYYY>/<MM>/<DD>/<slug>.md     184 posts, path mirrors the live URL
  cfp/<event>.md                      the 9 APIDAYS CFP pages
data/
  authors.yaml  members.yaml  testimonials.yaml  people.yaml
  nav.yaml      redirects.yaml
public/img/                           generated, gitignored
schemas/*.json                        JSON Schema for frontmatter + data files
src/
  app/          routes, output: 'export'
  components/   ported design system + MDX section components
  lib/          content.ts, mdx.ts, search.ts
tools/migrate/                        scraper + converter, re-runnable
```

### Frontmatter

```yaml
---
title: Announcing Arazzo Specification 1.1
date: 2026-05-19
author: sensiblewood
category: blog
tags: [arazzo, openapi]
permalink: /blog/2026/05/19/announcing-arazzo-specification-1-1
---
```

`permalink` is carried verbatim from the scrape and is what `generateStaticParams` emits routes
from. It is never reconstructed from the file path, so a rename cannot silently break a URL.

### Reuse

| Need                                       | Source                                                           |
| ------------------------------------------ | ---------------------------------------------------------------- |
| Design tokens, light/dark, buttons, arcs   | `oai-events-githubcom/src/app/globals.css`, `tailwind.config.js` |
| Navbar, footer, search modal, `MaskIcon`   | `oai-events-githubcom/src/components/`                           |
| Image download (URL → WebP, sharp presets) | `oai-events-githubcom/scripts/convert-image.mjs`                 |
| CI shape                                   | `oai-events-githubcom/.github/workflows/ci.yml`                  |
| Pages deploy                               | `oai-events-githubcom/.github/workflows/deploy.yml`              |
| Schema-in-editor wiring                    | `oai-events-githubcom/schemas/` + `.vscode/settings.json`        |
| Markdown house style                       | `OAI-Tracks/CONVENTIONS.md`                                      |

Gaps in `oai-events` deliberately **not** inherited: schema validation absent from CI, no PR
preview, no sitemap/robots, no PR/issue templates.

### PR preview security

Two-stage and fork-safe. A `pull_request` job builds untrusted PR code and uploads `out/` as an
artifact **with no secrets in scope**. A separate `workflow_run` job holding
`CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` downloads the artifact and deploys it, then posts a
sticky comment. `pull_request_target` alone would expose the secrets to fork PRs.

### Redirects

Posts and most pages keep their exact paths. Redirects are needed for WP category archives
(`/category/blog` → `/blog`), dropped cruft pages → `/`, duplicate aliases (`/home-2`,
`/membershipjoin-2`), and `/events` + `/eventscalendar` → `events.openapis.org`.

GitHub Pages cannot issue real 301s, so `data/redirects.yaml` generates both static redirect stubs
(meta-refresh + `rel=canonical`) and a Cloudflare `_redirects` file. Moving production to Cloudflare
Pages later would upgrade those to real 301s at no cost, since the preview infrastructure exists.

## Verification

1. `npm run migrate:report` — 235/235 URLs handled, zero unrecognised constructs, zero broken
   internal links.
2. **Content parity** — normalised plain text of each scraped page diffed against the rendered
   output of the new build, flagging anything over threshold. Catches silent content loss that
   manual review of 184 posts would not.
3. **URL parity** — every sitemap permalink resolves in `out/` or has a redirect stub. Build fails
   otherwise.
4. `npm run lint && npm run typecheck && npm run build` emits `out/`.
5. `npm run test:e2e` — homepage, prose page, composed page, blog post, blog index, search,
   redirect stub. Chromium locally; WebKit/iPhone/iPad in CI.
6. Throwaway PR editing one Markdown file produces a bot comment with a working preview URL.

## Risks

- **Scrape fidelity.** Pantheon/Varnish caching and the cookie banner can vary responses. The report
  and text-diff are the guard. Re-run the fetch immediately before cutover.
- **Composed pages are hand-work.** ~5 pages will not convert cleanly; they are the bulk of the
  human effort.
- **Cloudflare access.** Needs an account and two org secrets. Fallback: publish previews to a
  `gh-pages` `/pr-N/` sub-path.
- **Ownership.** Target repo is `jurijat/oai-migrate` (personal). Production must move to the `OAI`
  org, as `events.openapis.org` did.
- **Needs an owner.** Member list and TSC roster are currently maintained in WordPress; they become
  `data/*.yaml` and need someone to keep them current.

## Follow-up

If editors should work without touching Git, **Keystatic** integrates with Next.js and gives a
GitHub-authenticated web UI that reads and writes the same Markdown files and opens real PRs, so the
preview workflow still applies. Worth doing only once the content model has settled in production.
