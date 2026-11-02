# Applied Science Magazine: how to build with it

A printed-magazine look for a technical blog: warm paper, one dark ink, one vermilion accent, a serif for reading and a mono for labels.

## Setup

No provider or theme wrapper. Components come from `window.AppliedScience` and are styled by `styles.css`, which also styles `body` (paper background, flex column) and loads Newsreader and IBM Plex Mono from Google Fonts.

Components do not render `<main>`. Wrap each page's content yourself:

- `<main className="home">` for a cover page: `Cover` followed by `AuthorBand`.
- `<main className="page">` for archive, About and error pages.
- `<main>` with `PostHeader` and `PostContent` for an article.

Render `SiteHeader` first and `SiteFooter` last, directly inside `body`. Use one `h1` per page: `Cover`, `PostHeader` and `PageTitle` each render it.

`Note`, `StepHeading` and `PostAuthor` only get their spacing inside `PostContent`. `Plate`, `Cover` and `PostHeader` switch at 960 px: wide screens show the full plate, narrow screens the crop. Render both `TableOfContents` variants in an article: `sidebar` shows from 960 px and `inline` below it.

## Styling

Style with these CSS variables. Do not add other colours, shadows, gradients or rounded boxes.

| Token | Use |
|---|---|
| `var(--paper)` | page |
| `var(--paper-raised)` | plates, menu |
| `var(--paper-deep)` | author band, inline code |
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

Images: `profilePhoto`, `ragPostgresPlate` and `ragPostgresPlateCrop` are exported as URLs. A new article's plate is an SVG with a `0 0 520 600` viewBox, using only `#1E2230` and `#B23F28` on `#FAF6EC`, with 45° hatching instead of fills, plus a 380 × 270 crop of the same drawing.

## Example

```jsx
const { SiteHeader, Cover, AuthorBand, SiteFooter, profilePhoto, ragPostgresPlate, ragPostgresPlateCrop } = window.AppliedScience;

<>
  <SiteHeader
    name="Aureliano Guedes"
    photoSrc={profilePhoto}
    posts={[{ title: "Storing PDF embeddings in PostgreSQL for RAG", href: "/rag/", date: "July 29, 2024", isoDate: "2024-07-29" }]}
  />
  <main className="home">
    <Cover
      title={<>Storing <em>PDF embeddings</em> in PostgreSQL for RAG</>}
      href="/rag/"
      kind="Tutorial"
      section="ML engineering / RAG"
      date="July 29, 2024"
      isoDate="2024-07-29"
      description="Extract text from PDFs, generate embeddings with Python, and store them in PostgreSQL."
      plate={{ src: ragPostgresPlate, alt: "Engraving of a PDF page flowing into PostgreSQL.", cropSrc: ragPostgresPlateCrop }}
    />
    <AuthorBand
      name="Aureliano Guedes"
      photoSrc={profilePhoto}
      intro="I build predictive models for refinery engineers and write about the data and code behind them."
      links={[{ label: "About", href: "/about/", accent: true }, { label: "All articles", href: "/articles/" }]}
    />
  </main>
  <SiteFooter author="Aureliano Guedes" year={2026} links={[{ label: "GitHub", href: "https://github.com/acpguedes" }]} />
</>
```
