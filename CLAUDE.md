# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server (localhost:4321)
npm run build    # production build → dist/
npm run preview  # serve the built dist/
```

Run npm via `~/.volta/bin/npm` if `npm` is not on the PATH.

## Formatting

```bash
npx prettier --write .
```

Config: 2-space indentation, no tabs (`.prettierrc`).

Prettier silently skips `.astro` files — `prettier-plugin-astro` is not installed. Match surrounding style by hand in those.

## Architecture

Astro 6 static site. No frameworks — pages are `.astro` files with vanilla JS where needed.

```
src/
  content.config.ts        content collection schema
  content/blog/            posts, .md or .mdx (YYYY-MM-DD-slug)
  content/img/             images imported by posts
  components/HeroFog.astro decorative hero banner for .mdx posts
  layouts/Base.astro       shared HTML shell (title prop)
  styles/global.css        Tailwind import + design tokens, loaded by Base
  pages/
    index.astro            landing/nav
    foggy/index.astro      interactive fog-hole page
    blog/index.astro       post listing (drafts excluded, newest first)
    blog/[...slug].astro   individual post

public/
  foggy/img/forest.jpg     background for fog page
  foggy/script.js          vanilla JS for the fog-hole interaction
  tools/<name>/index.html  standalone tools, served as-is (see below)
```

`src/components/HeroFog.astro` is unrelated to the fog-hole page despite the name: a static decorative banner (a figure in mist) built purely from Tailwind utility classes, no JS. It is the only place Tailwind utilities are actually used — everything else styles with plain CSS and the tokens below.

`Base.astro` sets `lang="en"`, pulls in Google Fonts, and loads `global.css` (Tailwind preflight + the design tokens pages reference as `var(--primary)` etc.).

## Blog posts

Add a file to `src/content/blog/` named `YYYY-MM-DD-slug.md` (or `.mdx`) with this frontmatter:

```markdown
---
title: Your title
date: 2026-04-04
draft: true
---
```

Set `draft: false` (or omit) to publish. Posts with `draft: true` are excluded from the listing and from `getStaticPaths`, so they produce no page at all.

Use `.mdx` when the post needs to import a component, e.g. `import HeroFog from '../../components/HeroFog.astro'`.

## Standalone tools (`public/tools/`)

Self-contained apps that are deliberately **not** part of the Astro application. Each gets a directory
under `public/tools/`, with `index.html` plus any assets it needs, and is copied to `dist/` untouched.
They are linked from the "Tools" group on the landing page.

They stay out of `src/pages/` on purpose:

- **No build-time processing.** The HTML is served byte-for-byte. Astro never parses it, so `{` in
  markup can't be mistaken for an expression, and re-importing an updated copy of the file is a
  plain overwrite with no conversion step.
- **No injected dev client.** Astro would inject the vite client and dev toolbar, which overlays the
  bottom edge of a full-viewport touch UI during development.
- **No shared design system.** These are accessibility-driven UIs (large tap targets, high contrast,
  fixed scale). Coupling them to the site's tokens or `Base.astro` would let a site restyle quietly
  degrade them. Don't decompose them into components or refactor them toward site conventions.

The one real cost: **neither local server resolves the bare directory URL.** Both `npm run dev` and
`npm run preview` 404 on `/tools/<name>/` and require the explicit `/tools/<name>/index.html`.
GitHub Pages *does* serve the directory URL. To avoid a link that only works in production, the
landing page links to the explicit `index.html` path, which resolves identically in all three.

Current: `tools/samtalehjelp/` → `/tools/samtalehjelp/`. A Norwegian-language aid for talking with
someone who has difficulty speaking or pronouncing — record and replay speech with gain/EQ/compression
and slowed playback, type a guess in large text, spell letter by letter, or tap common words. The
recording mode uses `getUserMedia`, so it needs HTTPS (or localhost).

## Fog-hole effect

`public/foggy/script.js`: the interactive feature tracks `innerRadiusPercentage` / `outerRadiusPercentage` in JS state and applies a `radial-gradient` to `div.whiteSheet` on `mousemove`, `touchmove`, and `wheel` events. No canvas involved.

## Deployment

Hosted on GitHub Pages at `geiriversen.no` (configured via `CNAME`). Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `astro build` and deploys `dist/` via the GitHub Pages Actions source.
