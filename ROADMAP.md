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
- [ ] Initial commit pushed

## Phase 1 — Migration toolchain (`tools/migrate/`)

- [ ] `lib/paths.mjs` — shared path/slug/permalink helpers
- [ ] `fetch.mjs` — sitemap-driven crawl into `.cache/html/`, resumable, throttled
- [ ] `extract.mjs` — cheerio extraction of metadata + body for posts and pages
- [ ] `convert.mjs` — turndown + GFM, WPBakery/Gutenberg unwrapping, link and image rewriting
- [ ] `assets.mjs` — download uploads, strip `-WxH` suffixes, sharp → WebP
- [ ] `report.mjs` — per-URL status, unrecognised constructs, broken internal links
- [ ] `run.mjs` — orchestrator (`npm run migrate`)
- [ ] Full crawl executed, 235/235 URLs cached
- [ ] 184 posts converted to `content/blog/`
- [ ] ~30 pages converted to `content/pages/`
- [ ] Cruft pages excluded and recorded in `data/redirects.yaml`
- [ ] Media downloaded and converted into `public/img/`
- [ ] Report clean: zero unrecognised constructs, zero broken internal links

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
