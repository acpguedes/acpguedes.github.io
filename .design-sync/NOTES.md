# design-sync notes

- `design-system/` is a React library written for the sync; the site itself is Jekyll. `design-system/scripts/build.mjs` copies `assets/css/style.css` to `dist/style.css`, so the site stylesheet is the single source of CSS. Rebuild the library after any CSS or asset change.
- Build: `cd design-system && npm ci && npm run build`. Converter: `--node-modules ./design-system/node_modules --entry ./design-system/dist/index.js`.
- `design-system/`, `ds-bundle/` and dot directories must stay excluded from Jekyll: the legacy Pages builder publishes any Markdown it finds.
- Cards render on a white body, so every preview wraps itself in a local `Paper` div. This is card presentation only.
- Styles switch at 960 px and 1200 px, so wide components declare a 1280 px `viewport` override. `TableOfContents` `inline` is hidden at that width and has no card.
- Fonts come from Google Fonts at runtime (`runtimeFontPrefixes`).
- `assets/css/style.css` has no font import because the site loads fonts with a `<link>`. `scripts/build.mjs` prepends the `@import` to `dist/style.css`, since designs only receive the stylesheet.
- The visual source of truth is `Blog Prototype.dc.html` in the Claude Design project, not `handoff/`, which differs from it in several places. Compare the site against the rendered prototype after any CSS change.

## Re-sync risks

- The components mirror the Liquid templates by hand. A markup change in `_includes/` or `_layouts/` needs the same change in `design-system/src/components/`.
- Asset exports embed `assets/art/*` and `assets/images/profile.jpeg` as data URLs. Replacing them needs a library rebuild.
- Verified in Chromium through Playwright only, not inside claude.ai/design itself.
