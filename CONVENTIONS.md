# Conventions

How content in this repository is written. Check any file you touch against this document, and
treat the document as living — if a rule no longer matches what we do, change the rule.

## Where content lives

| Kind            | Path                                      | Format                              |
| --------------- | ----------------------------------------- | ----------------------------------- |
| Blog posts      | `content/blog/<YYYY>/<MM>/<DD>/<slug>.md` | CommonMark                          |
| Pages           | `content/pages/<slug>.mdx`                | MDX                                 |
| Conference CFPs | `content/cfp/<event>.md`                  | CommonMark                          |
| Structured data | `data/*.yaml`                             | YAML, validated by `schemas/*.json` |

Posts are **CommonMark, not MDX**. Converted prose contains braces and angle brackets that MDX
would read as JSX, and a blog post has no reason to execute component code. Only `content/pages`
uses MDX, because those pages compose section components.

## Frontmatter

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

**`permalink` is the source of truth for routing and must never change.** It is carried verbatim
from WordPress, and a decade of inbound links depends on it. Renaming the file is safe; editing
`permalink` breaks URLs. `npm run build` fails if any URL in `data/source-urls.json` stops
resolving.

`author` must exist in `data/authors.yaml`. `date` must match the date in the permalink.

Migrated posts also carry `wordpressId`, the original WordPress post ID. It only breaks ties
between posts published on the same day, so the blog index keeps the live site's order. Leave it
off new posts; they sort ahead of migrated posts from the same day.

The blog index lists the categories the live site listed: `blog`, `announcement`, `news` and
`presentation`. Posts in `events` and `uncategorized` stay reachable by permalink and through
their category archive.

## Writing style

- Dates in prose: `May 19, 2026`. Ranges use an en dash, `July 8 – 9, 2026`.
- Use an em dash — like this — not a double hyphen.
- One sentence per line is not required; wrap at 100 columns.
- Headings start at `##`. The page title comes from frontmatter, so never write an `#` heading.
- Links are relative for this site (`/about`), absolute for anything else.

## Images and documents

Put originals in `assets/uploads/<year>/<month>/` and reference them as
`/img/uploads/<year>/<month>/<name>.webp`. `npm run assets` converts rasters to WebP into
`public/img/`, which is generated and gitignored — never commit anything under `public/img/`.

## Embeds

Write a plain link on its own line. A paragraph containing only a YouTube or SlideShare link is
upgraded to an embed at render time, so the Markdown stays readable:

```markdown
[Watch the video](https://www.youtube.com/watch?v=xGytDsqkQY8)
```

For pages (MDX), components are available directly: `<Newsletter />`, `<MemberLandscape />`,
`<MailingListSignup />`, `<GoogleForm id="..." />`.

## Cookie consent

Anything that loads from a third party must wait for consent. Categories live in
`src/lib/consent.ts`: `functional` (embedded media), `analytics` (LFX Segment) and `marketing`
(HubSpot).

- **Embeds are covered automatically.** Every `<iframe>` rendered from content goes through
  `ConsentIframe`, which shows a placeholder until `functional` is granted. Hosts under
  `openapis.org` are treated as first party and load directly.
- **New third-party scripts** must read `useConsent()` and render nothing until their category is
  granted — see `src/components/Analytics` and `src/components/Newsletter`.
- Tests run with consent seeded by `tests/fixtures.ts`. Use `test.use({ consent: 'unset' })` to see
  the banner, or `'none'` for a visitor who rejected.

## Page composition

Composed pages use sections rather than raw markup:

```mdx
<Hero title="...">
  <Action href="/membershipjoin" primary>
    Become a member
  </Action>
</Hero>

<Section tone="brand" center title="..." lead="...">
  <BenefitGrid>
    <Benefit title="Tooling" icon="/img/uploads/2023/12/icon_3.svg">
      …
    </Benefit>
  </BenefitGrid>
</Section>
```

`tone` is `default`, `dark` or `brand`. Pass `prose` to a `Section` whose children are Markdown.

**Use string and boolean attributes, never JSX expressions.** `columns="4"` works; `columns={4}`
is silently dropped, as are `items={[…]}` and `actions={[…]}`. This has bitten three separate
components. Where a component needs structured input, pass it as children — `<Action>` elements
inside `<Hero>`, `<Card>` elements inside `<CardGrid>` — which is also easier to write.

Available layout components: `Hero`, `Section` (with `tone`, `center`, `prose`, `split`),
`CardGrid` + `Card`, `Quote`, `BenefitGrid` + `Benefit`, `CTA`, `Action`, `AnnouncementBar`.

## Code style

**No comments in code.** Names and structure carry the meaning. This applies to `.ts`, `.tsx`,
`.mjs`, `.css` and config files. Explanation belongs in the commit message or in `PLAN.md`.

## Before opening a pull request

```
npm run lint && npm run typecheck && npm run format:check
npm run build          # includes the URL parity gate
npm run check:render   # empty pages, raw markdown, broken links
npm run validate       # data/*.yaml against schemas/
npm run test:e2e
```

`npm run check:parity` compares every page against the cached WordPress source. It needs
`.cache/html`, which is not committed, so run `npm run migrate:fetch` first. It is a
pre-cutover check rather than a CI gate.

A preview URL is posted on your pull request by a bot once the build finishes.
