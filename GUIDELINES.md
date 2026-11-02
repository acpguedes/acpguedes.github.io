# Blog guidelines

How to publish on this blog and how to change it without losing its standard. Read section 1 before publishing and section 6 before changing the design.

The blog is about technology, mainly AI: how to apply it and how to lead projects that deliver results. It publishes tutorials and tips, commentary on articles, and market analysis and trends.

## 1. Publish an article

1. **Write the draft.** Create `_drafts/my-article.md`. Preview it with `bundle exec jekyll serve --drafts`.
2. **Draw the plate.** Every article needs one, in the style described in section 2.
3. **Move it to `_posts/`.** Rename it `_posts/YYYY-MM-DD-my-article.md` and fill in the front matter below.
4. **Check it locally.** Run `JEKYLL_ENV=production bundle exec jekyll build` and go through the checklist below.
5. **Publish.** Open a pull request to `main` and merge it. Home, menu, archive and feed update on their own, so never edit a list of articles by hand.
6. **Check the live site.** See section 7.

### Front matter

```yaml
---
title: "Storing PDF embeddings in PostgreSQL for RAG"
display_title: "Storing <em>PDF embeddings</em> in PostgreSQL for RAG"  # optional, italic accent on the article page
description: "Extract text from PDFs, generate embeddings with Python, and store them in PostgreSQL."
categories: ml-engineer rag
kind: "Tutorial"
section: "ML engineering / RAG"
art: /assets/art/my-article.svg
art_crop: /assets/art/my-article-crop.svg
art_alt: "Engraving: what the full plate shows, in one sentence."
art_crop_alt: "Detail of the engraving: what the crop shows."
art_caption: "Plate II — One sentence about the plate."
art_crop_caption: "Plate II, detail — One sentence about the crop."
toc:                     # optional; use it in long articles
  - { id: introduction, label: "Introduction" }
---
```

| Field | Rule |
|---|---|
| `title` | Says what the reader gets. Write technical names correctly: RAG, PostgreSQL. |
| `description` | One sentence. It appears on the home page, in the archive and in the feed. |
| `kind` | One of `Tutorial`, `Tips`, `Commentary`, `Market analysis`. Add a new one only when none of these fits. |
| `art_caption` | Number plates in publication order, in Roman numerals. Plate I is the RAG tutorial. |
| `toc` | Each `id` must match a heading's id. kramdown generates it from the heading text. |

The URL comes from the categories and the file name: `/ml-engineer/rag/my-article/`.

### Before merging

- [ ] The body is a finished article. A sentence announcing a topic is a draft, so it stays in `_drafts/`.
- [ ] The article has a full plate, a crop, and alternative text for both. The build fails otherwise.
- [ ] The body starts at `##`. The layout already prints the title as the page's only H1.
- [ ] Every link works. There are no placeholders such as `href="#"`.
- [ ] Code examples run, or the article says what was checked and what was not.
- [ ] The slug is not `about` or `articles`, which are taken.
- [ ] The date in the file name is the publication date.

**Published URLs do not change.** Fix a title freely, but keep the URL and the original date.

**Future dates:** a post with a future date stays hidden until a build runs on or after that date. Builds only run on a push or a manual run of the workflow, so nothing publishes itself on the day.

## 2. The plate

Every article has a plate: an engraving made for that article. It is the article's impact image and appears on the article page, in the archive and on the home page. Reuse the drawing vocabulary of the existing plates, but draw a new subject for each article.

The reference is `assets/art/rag-postgres-tutorial.svg`.

| Item | Rule |
|---|---|
| Full plate | SVG, `viewBox="0 0 520 600"`. Shown beside the title from 960 px. |
| Crop | The same drawing with its own viewBox, 380 × 270. Shown below 960 px, in the archive and on the home page. Pick the most legible detail, since it must read at about 150 px wide. |
| Inks | Two only. Ink `#1E2230` for structure and hatching, vermilion `#B23F28` for the subject: what moves or changes. Ground `#FAF6EC`. |
| Line | Strokes of 1 to 1.5 px. Shade with 45° hatching: 5 px, or 3 px for dark tone. Draw the floor with 6 × 4 horizontal lines. |
| Not allowed | Gradients, blur, other colours, embedded photos, scripts and external references. |
| Labels | IBM Plex Mono, uppercase, 9 to 11 px, letter spacing 1 to 2. Use real values from the article, such as `chunk_size=1000`. |
| Files | `assets/art/<slug>.svg` and `assets/art/<slug>-crop.svg`, named after the post's slug. |
| Alternative text | Start the full plate with "Engraving:" and the crop with "Detail of the engraving:", then say what the image shows. |

The frame and caption come from the layout, so do not draw them.

**The build enforces this.** `_plugins/plate_check.rb` stops `jekyll build` when a published article lacks `art`, `art_crop`, `art_alt`, `art_crop_alt` or `art_caption`, when a plate is not an SVG, or when its file does not exist. Drafts and posts with `published: false` are exempt until they are ready.

The four topic illustrations on the home page follow the same rules at 380 × 270. They are listed under `topics` in `_config.yml`, with files in `assets/art/topic-*.svg`.

## 3. Writing

- **Language:** public text is in English.
- **Voice:** first person, active voice, concrete verbs. Explain the mechanism and the reason, and say what you would choose and why.
- **Length:** cut any sentence that adds no information. Start with the substance, not with context about the world.
- **Avoid:** marketing words such as "leverage", "transformative", "robust" and "seamless"; vague attributions such as "experts say"; em dashes in prose. Plate captions are the one exception to the dash rule.
- **Facts:** never publish a number, result or source you cannot back up.

| Kind | Must include |
|---|---|
| Tutorial | The concrete result, prerequisites, library versions, and what was tested. Number the steps. |
| Tips | One problem and one recommendation per tip, with the trade-off. |
| Commentary | A link to the article, its author and date. Keep what it says separate from your view of it. |
| Market analysis | The source and date of every figure. Keep data separate from your reading of it. |

### Markup

```markdown
**Note** A note, rendered with the vermilion label.
{: .note}

### <span class="step-label">Step 1</span>Environment Setup {#step-1-environment-setup}
```

Always give code fences a language, such as `python` or `bash`. Long lines scroll inside the block. Code has no syntax colours, on purpose.

## 4. Visual system

`assets/css/style.css` is the source of truth. Use its variables instead of new values.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F5F0E4` | Page |
| `--paper-raised` | `#FAF6EC` | Plates, menu |
| `--paper-deep` | `#EEE7D6` | Inline code, code header |
| `--ink` | `#1E2230` | Text and rules |
| `--ink-soft` | `#4A4842` | Summaries |
| `--muted` | `#55524B` | Dates, captions |
| `--accent` | `#B23F28` | Kicker, link underline, focus |
| `--rule` | `#CFC5AE` | Hairlines inside lists and code |

- **Type:** Newsreader for everything you read, IBM Plex Mono for labels, navigation, captions and code. Mono labels are uppercase with wide letter spacing.
- **Structure:** separate sections with 1 px rules and white space. There are no cards or rounded boxes. The only shadow is on the Articles menu.
- **Colour:** vermilion is the only accent. It marks, it does not fill.
- **Photos:** always in black and white, through the CSS filter already in place.
- **Layout:** reading width is 38rem. Layouts change at 380, 960 and 1200 px.

### Minimum quality

- Contrast of at least 4.5:1 for text and 3:1 for large text.
- Touch targets of at least 44 × 44 px in navigation and controls.
- One H1 per page, visible keyboard focus, and alternative text on images that carry meaning.
- No horizontal page scroll from 320 px up.

## 5. What each page must keep

| Page | Rule |
|---|---|
| Home | About the blog as a whole: its thesis, intention and author, the illustrated topics, then the latest article in a small block. Never a large article feature. The latest article stays on the first screen at 390 × 844 and 1366 × 768. The presentation stays within 40 words and all fixed text within 80, excluding navigation, footer and the article itself. |
| Articles menu | The three newest articles plus `more`, which leads to `/articles/`. With no articles, Articles is a plain link. It opens with click, touch, Enter or Space. Tab moves through it, and Escape closes it and returns focus. Without JavaScript, Articles opens the archive. |
| Archive | Every published article, newest first, in the same order as the menu. |
| About | Written in first person, as prose. |
| 404 | Real paths back to Home and Articles. |
| Feed | Published articles only, with public HTTPS URLs. |

The home page text lives in `_config.yml` (`tagline`, `intro`, `author_note`, `topics`) and its layout in `index.html`. `intro` also appears in the author block at the end of each article.

## 6. Changing the design

The design comes from `Blog Prototype.dc.html` in the [Claude Design project](https://claude.ai/design/p/10d505c5-37da-4fce-8d42-0c87b4a2d490). Use the rendered prototype as the reference, not the project's `handoff/` folder, which differs from it in several places.

1. **Change the design first when the change is large.** Small adjustments can go straight to the CSS.
2. **Change tokens, not single cases.** Add a value only if it will be reused.
3. **Compare rendered pages.** Open them at 390, 768, 960, 1366 and 1920 px, side by side with the reference. Passing functional tests does not show that a page looks right.
4. **Record intentional differences** in the list below.
5. **Keep the library in step.** See section 7.

Intentional differences from the prototype:

- The home page has its own layout, as described in section 5.
- The portrait and the About text are newer than the prototype.
- Code blocks use IBM Plex Mono, which the prototype declares but loses to the browser's default for `code`.
- The header gap is smaller below 380 px, because the prototype overflows at 320 px.
- The Articles menu sits right after its control in the HTML, so Tab can reach it.
- The article uses typographic apostrophes.

## 7. Repository and publishing

| Path | What it is |
|---|---|
| `_posts/` | Published articles, the only source of published content |
| `_drafts/` | Ideas and unfinished articles, never published |
| `_config.yml` | Site settings and home page text |
| `index.html`, `articles.html`, `about.md`, `404.html` | Pages |
| `_layouts/`, `_includes/` | Shared markup |
| `_plugins/plate_check.rb` | Build check that every article has its plate |
| `assets/css/style.css`, `assets/js/nav.js` | Styles and menu behaviour |
| `assets/art/`, `assets/images/` | Plates, topic illustrations and the portrait |
| `design-system/`, `.design-sync/` | React components for Claude Design, not part of the site |

**Do not** commit `_site/`, which is generated, or add a second copy of the articles.

**New files outside the site** must be added to `exclude` in `_config.yml`. The Pages builder publishes any Markdown file it finds, including files without front matter.

**Pull requests:** `.github/workflows/check.yml` builds the site on every pull request, including articles scheduled for a later date. Do not merge while it is failing.

**Publishing:** a merge to `main` deploys the site. The repository's Pages source is currently set to `legacy`, so both the Pages build (Jekyll 3.10) and `.github/workflows/pages.yml` (Jekyll 4.3.3) deploy on every push, and the last one to finish stays live. Until the source is changed to GitHub Actions under **Settings → Pages**:

- A change must work on both builds.
- The Pages build ignores `_plugins`, so an article merged without a plate still goes live even though the workflow fails. The check on the pull request is the protection that counts.

After publishing, check on the live site:

- The article opens at its URL, and appears on the home page, in the menu, in the archive and in `/feed.xml`.
- The plate appears on a wide screen, and the crop on a narrow one.
- Any URL you meant to remove returns 404.

**The React library:** `design-system/` builds its stylesheet from `assets/css/style.css`. When markup changes in `_includes/`, `_layouts/` or `index.html`, make the same change in `design-system/src/components/`. Then run `npm run build` in `design-system/`, and `/design-sync` in Claude Code to update the Claude Design project.
