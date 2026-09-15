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

- [ ] Verify inferred author display names in `data/authors.yaml` (6 had none in WordPress)
- [ ] Audit the 12 inferred legacy redirects in `config.mjs` (`LEGACY`)
- [ ] Decide treatment for `get-involved` and `get-involved/mailing-lists` (groups.io form only)
- [x] Components built for the 9 dropped embeds
- [x] `MemberLandscape` and `Newsletter` wired into the composed pages
- [ ] Wire `YouTube`/`SlideShare`/`GoogleForm` into the 7 blog posts that lost them

## Phase 2 — Design system

- [x] Port tokens from `oai-events` `globals.css` (`#65D100`, `#ececed` / `#15191c`)
- [x] Port `tailwind.config.js` theme extension (brand colors, `tracking-oai`, radii)
- [x] Onest via `next/font/google`
- [x] `next-themes` provider, `data-theme` attribute, light default
- [x] Tailwind `darkMode` bound to `[data-theme="dark"]` so the toggle drives `dark:`, not the OS
- [x] Port + adapt `Navbar` (openapis.org IA, submenus)
- [x] Port + adapt `OaiFooter` (LF legal links)
- [x] Linux Foundation Projects bar
- [ ] LFX Segment analytics + cookie consent
- [x] HubSpot newsletter embed component

## Phase 3 — Content model and routing

- [x] `src/lib/content.ts` — fs + gray-matter loaders
- [x] zod schemas for post and page frontmatter
- [x] MDX rendering via `next-mdx-remote/rsc`
- [x] `/[...slug]` page route from `permalink`
- [x] Posts routed through the same catch-all, driven by `permalink`
- [x] `/blog` index, grouped by year
- [x] `/category/[category]`, `/tag/[tag]`, `/author/[author]`
- [ ] Build-time search index + client search modal
- [ ] `schemas/*.json` + `.vscode/settings.json` glob mapping (zod covers build; editor help still missing)
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
- [ ] Dedicated CFP template, currently rendered as prose
- [x] `membershipmembers` page via `MemberLandscape`
- [ ] `data/members.yaml` if the landscape embed is ever replaced by a local list
- [x] `/events` and `/eventscalendar` redirect to events.openapis.org

### Phase 4 follow-ups

- [x] Section band rhythm matching the live site (amber notice, dark hero with arcs, brand-green
      benefits, dark events, dark footer)
- [x] Tables converted to GFM markdown rather than raw HTML
- [ ] CFP pages still render as prose; a dedicated template would suit them better
- [ ] `get-involved` and `get-involved/mailing-lists` still thin (groups.io form only)

## Phase 5 — CI/CD and PR preview

- [x] `ci.yml` — lint → typecheck → format:check → build → Playwright
- [x] Frontmatter validated in CI by zod at build time (`ajv` kept for editor schemas)
- [x] `deploy.yml` — GitHub Pages on `push: main`
- [x] `preview-build.yml` — `pull_request`, builds and uploads artifact, no secrets
- [x] `preview-deploy.yml` — `workflow_run`, deploys to Cloudflare Pages, sticky comment
- [ ] Cloudflare project created, `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` set
- [x] `PULL_REQUEST_TEMPLATE.md`, `CODEOWNERS`
- [ ] Issue forms: propose a blog post, fix a page
- [ ] `CONVENTIONS.md` (Markdown house style, after `OAI-Tracks`)

## Phase 6 — URLs, redirects, SEO

- [x] `data/redirects.yaml` populated
- [x] Static redirect stub generation (meta-refresh + canonical)
- [x] Cloudflare `_redirects` generation
- [x] URL parity check fails the build on a missing permalink
- [x] Open Graph + canonical tags per page
- [ ] `CNAME` for the production domain

- [x] `basePath` supported via `NEXT_PUBLIC_BASE_PATH`, supplied by `configure-pages`
- [x] `check:basepath` CI job fails the build on root-absolute references

### Phase 5 follow-ups

- [ ] Create the Cloudflare Pages project `openapis-org`
- [ ] Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets
- [ ] Verify the preview comment on a throwaway PR (workflows cannot be tested before they are on `main`)

## Phase 7 — QA and cutover

- [ ] Content parity diff across all 214 migrated URLs
- [ ] Full internal link check against the crawl
- [ ] Lighthouse pass (perf, a11y, SEO)
- [x] Playwright smoke suite green locally (7 tests)
- [ ] Playwright suite green on CI
- [ ] Preview verified on a throwaway PR
- [ ] Transfer repo to the `OAI` org
- [ ] DNS cutover
