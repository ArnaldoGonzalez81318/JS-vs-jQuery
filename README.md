# JS-vs-JQuery

![JavaScript vs jQuery illustration](./public/images/jquery-vs-javascript.jpeg)

A documentation-style reference site that compares common jQuery helpers with their modern JavaScript equivalents.

## Stack

- Astro for the site shell and static generation
- TypeScript for client-side behavior
- Sass for styling and theme organization
- Shiki for stronger build-time code highlighting

## Quick start

```bash
npm install
npm run dev
```

Open the local Astro dev server shown in the terminal.

## Available scripts

- `npm run dev` starts the Astro development server
- `npm run build` creates the production build in `dist/`
- `npm run preview` serves the production build locally
- `npm run check` runs Astro and TypeScript validation

## Project structure

- `src/pages/index.astro` renders the main documentation page
- `src/layouts/BaseLayout.astro` defines shared metadata, asset links, and client script loading
- `src/content/legacy-page.html` stores the preserved page markup used as the source document
- `src/lib/highlightLegacyHtml.ts` transforms legacy code blocks with Shiki at build time
- `src/scripts/docs.ts` handles navigation, collapsible sections, stats, and clipboard behavior
- `src/scripts/theme-switcher.ts` handles theme persistence and system-theme syncing
- `src/styles/global.scss` contains the main site styles
- `src/styles/_reset.scss` contains the reset layer
- `public/images/` contains favicons, illustrations, and SVG assets

## Notes

The original single-file static page was migrated into Astro without rewriting the documentation content by hand. The page body is preserved in `src/content/legacy-page.html`, and code samples are re-highlighted during the build so the rendered output uses Shiki instead of the old Prism-based markup.

## Contributing

Improvements are welcome. Keep changes consistent with the current documentation tone, preserve accessibility behavior, and run `npm run check` plus `npm run build` before opening a PR.

## License

See [LICENSE](LICENSE).