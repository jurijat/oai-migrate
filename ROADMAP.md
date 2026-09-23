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

### Icons and leftover WordPress markup

- [x] Navbar icons replaced with stroke SVGs using `currentColor`; they were Unicode glyphs
      (`⌕`, `☾`, `☀`, `☰`, `✕`) that rendered thin and inconsistently sized
- [x] Leftover WordPress shortcodes stripped — 16 across 14 files, leaking as literal text on the
      live site too because texturize had mangled their quotes
- [x] `[iframe src=…]` preserved as a link rather than dropped (a Google Slides deck)
- [x] `check:render` and an e2e test now fail on shortcode leakage

### Favicon, OpenGraph and the mobile menu

- [x] Favicon set generated from the official mark (32/180/192/512) and declared in metadata —
      previously only an unreferenced `favicon.ico`, which browsers probe at the domain root and
      so 404'd under a base path
- [x] OpenGraph and Twitter card metadata site-wide and per page; the live WordPress site has
      none, so shared links produce bare cards today
- [x] 1200x630 OG image generated from the logo on the brand dark ground
- [x] Canonical URL on the home page (content pages already had one)
- [x] `check:basepath` also fails when a reference repeats the base path — `og:image` shipped as
      `/oai-migrate/oai-migrate/...` because `metadataBase` already carries it
- [x] Mobile menu scrolls itself with the page locked behind it — it was `static` inside the
      sticky header, so its ~40 links ran past the viewport with no way to reach them

### Chrome and shortcode follow-ups

- [x] Paired shortcodes handled — `[embedyt] url [/embedyt]` survived because turndown escapes the
      closing bracket, which broke the lookahead; the URL is now kept as a video link
- [x] Linux Foundation bar uses the official `lfprojects_banner_other.svg` rather than plain text
- [x] Mobile menu fills from the header to the bottom of the viewport and scrolls

### Membership benefits layout

- [x] Split into tonal sections rather than one flat prose column — the content was complete
      (all 34 headings matched the source) but rendered as an undifferentiated wall
- [x] `prose` inside `band-dark` / `band-brand` inherits the band's palette; it was rendering
      near-black body text on the dark band
- [x] Duplicated intro paragraph from the source dropped

### Membership benefits: card layouts

- [x] Benefit categories, personas, FAQ, testimonials and the join CTAs are card grids, matching
      the live page's 2/3/4-column layouts rather than one stacked column
- [x] Member landscape moved up under the hero, where the live page shows it
- [x] `CardGrid` takes `columns` as a string — MDX silently drops JSX expression attributes, the
      same fault that hit `items={[…]}` and `actions={[…]}`; documented in CONVENTIONS.md

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

## Fidelity pass against the live site

- [x] Hero uses the real artwork (`OpenAPI-3.1.0-designs-04-scaled.jpg`, navy with dotted nodes)
      instead of an approximated radial wash
- [x] Buttons match live: `#94c73d`, white text, 200px radius, 18px/600
- [x] LinkedIn and GitHub icon links in the navbar, from `data/social.yaml`
- [x] Dark mode removed — the original never had one; `next-themes` uninstalled
- [x] Navbar is opaque; it was `bg-brand-bg/90` + `backdrop-blur`, so scrolled content showed through
- [x] Footer replaced with the LF copyright bar (`#1c1c1c`, the trademark paragraph, legal links,
      social icons, cookie settings) — our 4-column nav footer was invented
- [x] Members embed matches live: iframe-resizer for height, `embed-item.js` for the detail modal,
      and the modal iframe carries the `embed-item` id the script looks for
- [x] Transcend consent manager wired up, gated to production
- [x] Forms verified reachable; none submitted

### Open decisions from this pass

- [ ] **Button contrast.** White on `#94c73d` measures 2.0:1. Matching live exactly drops
      accessibility from 100 to 96. Darkening the button to `#5f8f1f` or using dark text would
      restore it.
- [ ] **Footer contrast.** `#777` on `#1c1c1c` is 3.8:1, under the 4.5:1 needed at 12px. Same on
      the live site.
- [x] ~~Verify the Transcend consent dialog~~ — superseded by our own banner, below

## Navigation, matched to the original

- [x] Off-site links carry the original external marker (a box with an arrow, as FontAwesome
      `f08e` on the live site), plus screen-reader text "(opens in a new tab)"
- [x] Same rule as the live site: any link to another host, including `*.openapis.org`
      subdomains; 15 links in both the desktop and mobile menus, no internal ones
- [x] The icon is bound to the last word, so it never wraps onto a line of its own
- [x] Top level uppercase `#888`, `#6da643` on hover or while its menu is open, with chevrons
- [x] Dropdown items `#a8a8a8`; hovered item `#6da643` on a `#313233` bar; white square panel
- [x] Header and mobile menu on white, as on the live site

### Open

- [ ] **Menu contrast.** The original colours fail WCAG AA: top level 3.54:1, dropdown items
      2.38:1, hover 4.40:1 and 2.92:1, against the 4.5:1 needed. Reproduced as asked; the same
      decision as the button and footer colours.

## Cookie consent

Replaced the Linux Foundation's Transcend consent manager with our own banner. Transcend's
`airgap.js` was domain-locked to openapis.org, so it never ran on staging — and on a production
build it was the only thing that would have stopped LFX Segment loading before consent.

- [x] Banner mirrors the live layout: Accept all / Reject all / Customize, equal weight, privacy link
- [x] Categories follow the live Transcend purposes — Functional, Analytics, Marketing — all off
      until chosen; Essential always on
- [x] LFX Segment loads only with Analytics consent (and only in production)
- [x] HubSpot newsletter loads only with Marketing consent, with an in-place opt-in
- [x] Every third-party iframe goes through `ConsentIframe`, including those `rehypeEmbeds`
      generates, via the MDX `iframe` override; zero third-party iframes in the static HTML
- [x] Placeholders offer load-once, always-allow, and open-on-provider
- [x] Revoking a category reloads the page so already-loaded scripts unload
- [x] "Cookie settings" in the footer reopens the preferences; Escape closes, focus returns
- [x] Measured: a fresh visitor gets zero cookies and no requests to Segment, HubSpot, YouTube or
      SlideShare
- [x] Newsletter loads with `afterInteractive` once visible; `lazyOnload` waited on
      `requestIdleCallback`, which was starved in 5 of 8 headless runs
- [x] `brand-fg` registered as a Tailwind colour — `text-brand-fg` was silently a no-op
- [x] 11 consent tests; the rest of the suite runs with consent seeded by a fixture

### Open

- [ ] Confirm with the Linux Foundation that a site-specific banner is acceptable in place of
      their Transcend setup — it may be an LF-wide compliance requirement
- [ ] 58 content images are hotlinked to other hosts (18 to a dead `oapi.wpengine.com`, 404);
      they still reach third parties before consent and several are already broken

## Blog, matched to the original

Measured against www.openapis.org at 1440px and 390px; every value below is taken from the live
computed styles, not estimated.

- [x] Blog index is one flat list of cards, as on live, not grouped by year
- [x] Card: `date in Category` meta line, bold title, first 30 words of the post with `…`, green
      `READ MORE →`; the whole card is clickable and the category link stays separately clickable
- [x] Card geometry matches live exactly: 1245px wide, 234px tall, 259px apart, text at x=110
- [x] Index lists the same 180 posts as live: `events` and `uncategorized` posts are left off, as on
      live, but keep their permalinks and category archives
- [x] Same-day posts keep the live order through `wordpressId` (original WordPress post ID),
      backfilled into all 184 posts and emitted by the converter on re-runs
- [x] Post header: 36/48 bold title, `By Author | Date | Category` with hairline separators, rule
      beneath, 40px below the navbar
- [x] Post body: 1000px column, live text colours, 28px paragraph rhythm, 24/36 section headings,
      live list spacing
- [x] Category display names (`presentation` → Presentations) on cards, headers and archives
- [x] Archives no longer nest a second `<main>` inside the layout's
- [x] BLOG is marked current (`aria-current`, green) on `/blog/` only, and a parent is highlighted
      when one of its children is the current page
- [x] Content container: 1245px wide and aligned with the logo at x=90 on wide screens, like live
- [x] Header: live logo size (166px wide) and 70px height
- [x] Linux Foundation banner vertically centred in a 33px bar, as on live
- [x] Desktop menu no longer overflows between 1024px and 1400px: hamburger below 1280px, tighter
      item spacing, and `What is OpenAPI?` wraps onto two lines as on live

### Open

- [ ] Page background: live content area is `#f8f8f8`, ours is `#ececed` everywhere (a token
      carried over from the new design tokens). One-line change if wanted.
- [ ] Body links: live uses `#94c73d` without underline, about 1.9:1 on the page background. Ours
      keep the accessible `#356d00`.
- [ ] Code blocks keep our boxed style; live renders them as plain bold monospace.

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
| `npm run test:e2e`                            | 68 Playwright tests                                                    |
