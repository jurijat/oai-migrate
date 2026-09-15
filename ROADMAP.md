# Roadmap

Tracking document for the openapis.org WordPress → Markdown migration. See [PLAN.md](PLAN.md) for
rationale. Check off each task as it lands.

---

## Phase 0 — Repo scaffold

- [x] Clone `jurijat/oai-migrate`, set `.node-version` to 22
- [x] `package.json` with scripts and pinned deps
- [x] `tsconfig.json` (strict, `@/*` path alias)
- [x] `next.config.ts` — `output: 'export'`, `trailingSlash`, `images.unoptimized`
- [x] Tailwind 3 + PostCSS config
- [x] ESLint flat config + Prettier (+ `prettier-plugin-tailwindcss`)
- [x] `.gitignore`, `.prettierignore`
- [x] `AGENTS.md` / `CLAUDE.md` with repo conventions
- [x] `npm install` clean
- [x] Minimal `src/app/layout.tsx` + `page.tsx` build to `out/`
- [x] Initial commit pushed

## Phase 1 — Migration toolchain (`tools/migrate/`)

- [x] `config.mjs` — origin, sitemaps, page classification (dropped / generated / moved / cfp / composed / prose)
- [x] `lib.mjs` — path, slug, permalink, protocol-relative and WP size-suffix helpers
- [x] `fetch.mjs` — sitemap-driven crawl into `.cache/html/`, resumable, throttled, retry with backoff
- [x] `extract.mjs` — cheerio extraction of metadata + body for posts and pages
- [x] `extract.mjs` — monospace-span code recovery (`<pre>` does not exist in the source) + texturize repair
- [x] `extract.mjs` — records every dropped form/iframe so interactive content cannot vanish silently
- [x] `convert.mjs` — turndown + GFM, link and image rewriting, stray-tag escaping for MDX safety
- [x] `convert.mjs` — generates `data/authors.yaml`, merge-preserving so manual edits survive re-runs
- [x] `redirects.mjs` — generates `data/redirects.yaml` from dropped/moved/legacy rules
- [x] `assets.mjs` — downloads originals to `assets/uploads/` (committed, keeps builds hermetic)
- [x] `tools/publish-assets.mjs` — `assets/uploads/` → `public/img/uploads/` as WebP, wired to `prebuild`
- [x] `report.mjs` — per-URL status, residual HTML, dropped embeds, thin output, unresolved links
- [x] `run.mjs` — orchestrator (`npm run migrate`)
- [x] Full crawl executed, 235/235 URLs cached
- [x] 184 posts converted to `content/blog/`
- [x] 24 pages + 10 CFP pages converted
- [x] 17 cruft/moved pages excluded and recorded in `data/redirects.yaml`
- [x] 126 assets downloaded and published (15 MB originals → 4.7 MB WebP)
- [x] Report clean: 0 extraction warnings, 0 unresolved internal links

### Phase 1 follow-ups

- [x] Decide treatment for `get-involved` and `get-involved/mailing-lists` (groups.io form only)
- [x] Components built for the 9 dropped embeds
- [x] `MemberLandscape` and `Newsletter` wired into the composed pages
- [x] Wire `YouTube`/`SlideShare`/`GoogleForm` into the 7 blog posts that lost them

## Phase 2 — Design system

- [x] Port tokens from `oai-events` `globals.css` (`#65D100`, `#ececed` / `#15191c`)
- [x] Port `tailwind.config.js` theme extension (brand colors, `tracking-oai`, radii)
- [x] Onest via `next/font/google`
- [x] `next-themes` provider, `data-theme` attribute, light default
- [x] Tailwind `darkMode` bound to `[data-theme="dark"]` so the toggle drives `dark:`, not the OS
- [x] Port + adapt `Navbar` (openapis.org IA, submenus)
- [x] Port + adapt `OaiFooter` (LF legal links)
- [x] Linux Foundation Projects bar
- [x] LFX Segment analytics + cookie consent
- [x] HubSpot newsletter embed component

## Phase 3 — Content model and routing

- [x] `src/lib/content.ts` — fs + gray-matter loaders
- [x] zod schemas for post and page frontmatter
- [x] MDX rendering via `next-mdx-remote/rsc`
- [x] `/[...slug]` page route from `permalink`
- [x] Posts routed through the same catch-all, driven by `permalink`
- [x] `/blog` index, grouped by year
- [x] `/category/[category]`, `/tag/[tag]`, `/author/[author]`
- [x] Build-time search index + client search modal
- [x] `schemas/*.json` + `.vscode/settings.json` glob mapping (zod covers build; editor help still missing)
- [x] `sitemap.xml` + `robots.txt` generation

## Phase 4 — Page templates and sections

- [x] Prose page template
- [x] Blog post template (byline, date, category, tags)
- [x] Embed components: `YouTube`, `SlideShare`, `GoogleForm`, `MemberLandscape`, `MailingListSignup`
- [x] `membershipmembers` hand-authored, protected from the converter by the `generated` flag
- [x] `Hero`, `AnnouncementBar`, `CTA`
- [x] `BenefitGrid`/`Benefit`, `TestimonialGrid`, `PeopleGrid`, `Action`, `Section` tones
- [x] Home page composed in MDX
- [x] `membership-benefits` composed
- [x] `testimonials` composed + `data/testimonials.yaml`
- [x] `technical-developer-community` composed + `data/people.yaml`
- [x] `membershipjoin` composed
- [x] `content/cfp/*.md` converted (10 files)
- [x] Dedicated CFP template, currently rendered as prose
- [x] `membershipmembers` page via `MemberLandscape`
- [x] `/events` and `/eventscalendar` redirect to events.openapis.org

### Phase 4 follow-ups

- [x] Section band rhythm matching the live site (amber notice, dark hero with arcs, brand-green
      benefits, dark events, dark footer)
- [x] Tables converted to GFM markdown rather than raw HTML
- [x] CFP pages still render as prose; a dedicated template would suit them better
- [x] `get-involved` and `get-involved/mailing-lists` still thin (groups.io form only)

## Phase 5 — CI/CD and PR preview

- [x] `ci.yml` — lint → typecheck → format:check → build → Playwright
- [x] Frontmatter validated in CI by zod at build time (`ajv` kept for editor schemas)
- [x] `deploy.yml` — GitHub Pages on `push: main`
- [x] `preview-build.yml` — `pull_request`, builds and uploads artifact, no secrets
- [x] `preview-deploy.yml` — `workflow_run`, deploys to Cloudflare Pages, sticky comment
- [x] `PULL_REQUEST_TEMPLATE.md`, `CODEOWNERS`
- [x] Issue forms: propose a blog post, fix a page
- [x] `CONVENTIONS.md` (Markdown house style, after `OAI-Tracks`)

## Phase 6 — URLs, redirects, SEO

- [x] `data/redirects.yaml` populated
- [x] Static redirect stub generation (meta-refresh + canonical)
- [x] Cloudflare `_redirects` generation
- [x] URL parity check fails the build on a missing permalink
- [x] Open Graph + canonical tags per page

- [x] `basePath` supported via `NEXT_PUBLIC_BASE_PATH`, supplied by `configure-pages`
- [x] `check:basepath` CI job fails the build on root-absolute references

### Phase 5 follow-ups

### Accessibility fixes found by Lighthouse

- [x] `--brand-muted` contrast raised (0.48 → 0.68 light, 0.62 dark)
- [x] New `--brand-link` token: `#356d00` on light, `#76dd2a` on dark. Brand green `#65D100` is
      1.66:1 on `#ececed` and unusable for body links, though fine for buttons
- [x] Post headings promoted so bodies start at `h2` (the source jumped `h1` → `h3`)
- [x] `<main>` landmark added
- [x] HubSpot form styled to the design system, and loaded only when scrolled into view so its
      third-party cookies are not set for every visitor

### Landing page and brand fixes

- [x] Replaced the approximated logo SVG with the official `OpenAPI_Logo_Pantone-1.png`
- [x] Generated a dark-mode logo variant: greys knocked out to light, brand greens preserved
- [x] Hero retuned — action row uses the full content width, all five buttons fit on one line
- [x] Hero decoration replaced with a soft radial wash; the old arcs read as stray scratches
- [x] `Section` gained a `split` layout so "What is OpenAPI?" no longer leaves half the row empty
- [x] HubSpot form fields styled to the design system

### Mobile

- [x] Swept every page type at 390px for horizontal scrolling
- [x] Wide tables wrapped in a scroll container (`rehypeTableScroll`) instead of pushing the page
- [x] Long URLs used as link text now break rather than overflowing
- [x] Body copy is `prose` on mobile and `prose-lg` from `md` up; table cells set smaller
- [x] Adjacent fenced code blocks merged — the source split single YAML examples across
      consecutive monospace paragraphs, rendering as three boxes
- [x] 15 mobile regression tests, including table scroll and the mobile nav

### Phase 6 follow-ups

- [x] Percent-encoded permalinks resolve on a static host (directories written decoded)
- [x] Prefix redirect rules expanded into stubs for GitHub Pages
- [x] Linked documents (PDF) migrated alongside images
- [x] `robots.txt` blocks indexing on non-production deployments

## Phase 7 — QA and cutover

- [x] Content parity diff across all migrated URLs (`npm run check:parity`, mean 99.93%)
- [x] Render + internal link check (`npm run check:render`, 387 pages, 0 broken)
- [x] Lighthouse: 100 accessibility / best practices / SEO on desktop post and mobile home
- [x] Playwright smoke suite green locally (7 tests)
- [x] Playwright suite green on CI

---

## Blocked: needs your account or judgement

Everything else is done. These cannot be completed from inside the repo.

### Needs a Cloudflare account

- [ ] Create the Cloudflare Pages project `openapis-org`
- [ ] Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets
- [ ] Confirm the preview bot comment appears on a pull request

Verified on PR #1: `ci.yml` and `preview-build.yml` both run on `pull_request` and the build
artifact is produced. `preview-deploy.yml` now skips with a notice while the secrets are absent
rather than failing, and turns itself on as soon as they are set. Confirm the bot comment on the
first PR after that.

### Needs human verification

- [ ] Author display names in `data/authors.yaml`. WordPress had none for six accounts, so
      `abringaze`, `glaforge`, `kinlane`, `pjmolina`, `swaldron` and `jesse` were inferred from
      their slugs. These are real people — confirm before launch.
- [ ] The twelve inferred legacy redirects in `tools/migrate/config.mjs` (`LEGACY`). Each was
      matched by slug similarity against a real post; all twelve already 404 on WordPress, so they
      are an improvement either way, but the targets are a judgement call.

### Needs a decision from OAI

- [ ] `CNAME` for the production domain
- [ ] Transfer the repository to the `OAI` organisation
- [ ] DNS cutover
- [ ] `data/members.yaml`, only if the landscape.openapis.org embed is ever replaced by a local list

## Running the checks

| Command                                       | What it guards                                                         |
| --------------------------------------------- | ---------------------------------------------------------------------- |
| `npm run lint` / `typecheck` / `format:check` | Code health                                                            |
| `npm run validate`                            | `data/*.yaml` against `schemas/*.json`                                 |
| `npm run build`                               | Static export, plus the URL parity gate                                |
| `npm run check:render`                        | Empty pages, 404 stubs, raw markdown, broken links                     |
| `npm run check:basepath`                      | Root-absolute references under a base path                             |
| `npm run check:parity`                        | Every page against the cached WordPress source (needs `migrate:fetch`) |
| `npm run migrate:report`                      | Conversion coverage and unresolved links                               |
| `npm run test:e2e`                            | 14 Playwright tests                                                    |
