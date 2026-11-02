# Applied Science Magazine: how to build with it

A printed-magazine look for a blog on technology and AI: warm paper, one dark ink, one vermilion accent, a serif for reading and a mono for labels.

## Setup

No provider or theme wrapper. Components come from `window.AppliedScience` and are styled by `styles.css`, which also styles `body` (paper background, flex column) and loads Newsreader and IBM Plex Mono from Google Fonts.

Components do not render `<main>`. Wrap each page's content yourself:

- `<main className="home"><div className="home-grid">` for the home page: `HomeIntro`, `LatestArticle`, then `TopicGrid`. The grid places them in two columns from 960 px. Keep the article secondary: the home page is about the blog.
- `<main className="page">` for archive, About and error pages.
- `<main>` with `PostHeader` and `PostContent` for an article.

Render `SiteHeader` first and `SiteFooter` last, directly inside `body`. Use one `h1` per page: `HomeIntro`, `PostHeader` and `PageTitle` each render it.

`Note`, `StepHeading` and `PostAuthor` only get their spacing inside `PostContent`. `Plate` and `PostHeader` switch at 960 px: wide screens show the full plate, narrow screens the crop. Render both `TableOfContents` variants in an article: `sidebar` shows from 960 px and `inline` below it.

## Styling

Style with these CSS variables. Do not add other colours, shadows, gradients or rounded boxes.

| Token | Use |
|---|---|
| `var(--paper)` | page |
| `var(--paper-raised)` | plates, menu |
| `var(--paper-deep)` | inline code, code header |
| `var(--ink)` | text and rules |
| `var(--ink-soft)` | summaries |
| `var(--muted)` | dates, captions |
| `var(--accent)` | kicker, link underline, focus |
| `var(--rule)` | hairlines inside lists |
| `var(--serif)`, `var(--mono)` | reading text, labels and code |
| `var(--gutter)`, `var(--measure)`, `var(--wide)` | page margin, 38rem reading width, 82rem header width |
| `var(--fs-display)`, `var(--fs-post-title)`, `var(--fs-page-title)`, `var(--fs-dek)`, `var(--fs-body)`, `var(--fs-h2)`, `var(--fs-h3)` | fluid type scale |

Separate sections with 1 px `var(--ink)` or `var(--rule)` lines and white space, not cards. Mono labels are 11 to 13 px, uppercase, with 0.12 to 0.14em letter spacing; the `meta` class gives you this. Keep touch targets at least 44 × 44 px. In titles, wrap the key words in `<em>` for the italic accent.

## Where the truth lives

Read `styles.css` and `_ds_bundle.css` before adding layout. Each component has `components/<group>/<Name>/<Name>.d.ts` for its props and `<Name>.prompt.md` for usage.

Images: `profilePhoto`, `ragPostgresPlate`, `ragPostgresPlateCrop` and the four `topic*` illustrations are exported as URLs. A new article's plate is an SVG with a `0 0 520 600` viewBox, using only `#1E2230` and `#B23F28` on `#FAF6EC`, with 45° hatching instead of fills, plus a 380 × 270 crop of the same drawing.

## Example

```jsx
const { SiteHeader, HomeIntro, LatestArticle, TopicGrid, SiteFooter, profilePhoto, ragPostgresPlateCrop, topicTechnologyAi, topicTutorialsTips } = window.AppliedScience;

<>
  <SiteHeader
    name="Aureliano Guedes"
    photoSrc={profilePhoto}
    posts={[{ title: "Storing PDF embeddings in PostgreSQL for RAG", href: "/rag/", date: "July 29, 2024", isoDate: "2024-07-29" }]}
  />
  <main className="home">
    <div className="home-grid">
      <HomeIntro
        title={<>Technology is only a means to building <em>real solutions</em>.</>}
        intro="I write about technology, mainly AI: how to apply it and how to lead projects that deliver results."
        authorNote="I'm Aureliano Guedes, a lead data scientist in refining and renewable fuels."
        photoSrc={profilePhoto}
        name="Aureliano Guedes"
      />
      <LatestArticle
        post={{ title: "Storing PDF embeddings in PostgreSQL for RAG", href: "/rag/", date: "July 29, 2024", isoDate: "2024-07-29", kind: "Tutorial", thumbnailSrc: ragPostgresPlateCrop }}
      />
      <TopicGrid
        topics={[
          { label: "Technology & AI", src: topicTechnologyAi, alt: "Engraving: a neural network." },
          { label: "Tutorials & tips", src: topicTutorialsTips, alt: "Engraving: a terminal and numbered steps." },
        ]}
      />
    </div>
  </main>
  <SiteFooter author="Aureliano Guedes" year={2026} links={[{ label: "GitHub", href: "https://github.com/acpguedes" }]} />
</>
```
