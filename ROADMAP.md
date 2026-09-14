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
- [ ] Components for the 9 dropped embeds (3 SlideShare, 3 YouTube, Google Form, groups.io, landscape)

## Phase 2 — Design system

- [ ] Port tokens from `oai-events` `globals.css` (`#65D100`, `#ececed` / `#15191c`)
- [ ] Port `tailwind.config.js` theme extension (brand colors, `tracking-oai`, radii)
- [ ] Onest via `next/font/google`
- [ ] `next-themes` provider, `data-theme` attribute, light default
- [ ] Port `MaskIcon`
- [ ] Port + adapt `Navbar` (openapis.org IA, submenus)
- [ ] Port + adapt `OaiFooter` (LF legal links)
- [ ] Linux Foundation Projects bar
- [ ] LFX Segment analytics + cookie consent
- [ ] HubSpot newsletter embed component

## Phase 3 — Content model and routing

- [ ] `src/lib/content.ts` — fs + gray-matter loaders
- [ ] zod schemas for post and page frontmatter
- [ ] `schemas/*.json` + `.vscode/settings.json` glob mapping
- [ ] MDX rendering via `next-mdx-remote/rsc`
- [ ] `/[...slug]` page route from `permalink`
- [ ] `/blog/[year]/[month]/[day]/[slug]` post route from `permalink`
- [ ] `/blog` paginated index
- [ ] `/category/[category]`, `/tag/[tag]`, `/author/[author]`
- [ ] Build-time search index + client search modal
- [ ] `sitemap.xml` + `robots.txt` generation

## Phase 4 — Page templates and sections

- [ ] Prose page template
- [ ] Blog post template (byline, date, category, tags)
- [ ] `Hero`, `AnnouncementBar`, `CTA`
- [ ] `BenefitGrid`, `LogoWall`, `TestimonialGrid`, `PersonGrid`
- [ ] Home page composed in MDX
- [ ] `membership-benefits` composed
- [ ] `testimonials` composed + `data/testimonials.yaml`
- [ ] `technical-developer-community` composed + `data/people.yaml`
- [ ] `membershipjoin` composed
- [ ] CFP template + `content/cfp/*.md`
- [ ] `membershipmembers` index + `data/members.yaml`
- [ ] `/events` pointing at events.openapis.org

## Phase 5 — CI/CD and PR preview

- [ ] `ci.yml` — lint → typecheck → schema validation → build → Playwright
- [ ] `ajv-cli` frontmatter + data validation wired into CI
- [ ] `deploy.yml` — GitHub Pages on `push: main`
- [ ] `preview-build.yml` — `pull_request`, builds and uploads artifact, no secrets
- [ ] `preview-deploy.yml` — `workflow_run`, deploys to Cloudflare Pages, sticky comment
- [ ] Cloudflare project created, `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` set
- [ ] `PULL_REQUEST_TEMPLATE.md`, `CODEOWNERS`
- [ ] Issue forms: propose a blog post, fix a page
- [ ] `CONVENTIONS.md` (Markdown house style, after `OAI-Tracks`)

## Phase 6 — URLs, redirects, SEO

- [ ] `data/redirects.yaml` populated
- [ ] Static redirect stub generation (meta-refresh + canonical)
- [ ] Cloudflare `_redirects` generation
- [ ] URL parity check fails the build on a missing permalink
- [ ] Open Graph + canonical tags per page
- [ ] `CNAME` for the production domain

## Phase 7 — QA and cutover

- [ ] Content parity diff across all 214 migrated URLs
- [ ] Full internal link check against the crawl
- [ ] Lighthouse pass (perf, a11y, SEO)
- [ ] Playwright suite green on CI matrix
- [ ] Preview verified on a throwaway PR
- [ ] Transfer repo to the `OAI` org
- [ ] DNS cutover
