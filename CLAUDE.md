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

## Architecture

Astro 6 static site. No frameworks — pages are `.astro` files with vanilla JS where needed.

```
src/
  content.config.ts        content collection schema
  content/blog/            markdown posts (YYYY-MM-DD-slug.md)
  layouts/Base.astro       shared HTML shell (title prop)
  pages/
    index.astro            landing/nav
    foggy/index.astro      interactive fog-hole page
    blog/index.astro       post listing (drafts excluded, newest first)
    blog/[...slug].astro   individual post

public/
  foggy/img/forest.jpg     background for fog page
  foggy/script.js          vanilla JS for the fog-hole interaction
```

## Blog posts

Add a file to `src/content/blog/` named `YYYY-MM-DD-slug.md` with this frontmatter:

```markdown
---
title: Your title
date: 2026-04-04
draft: true
---
```

Set `draft: false` (or omit) to publish. Posts with `draft: true` are excluded from the listing and build.

## Fog-hole effect

`public/foggy/script.js`: the interactive feature tracks `innerRadiusPercentage` / `outerRadiusPercentage` in JS state and applies a `radial-gradient` to `div.whiteSheet` on `mousemove`, `touchmove`, and `wheel` events. No canvas involved.

## Deployment

Hosted on GitHub Pages at `geiriversen.no` (configured via `CNAME`). Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `astro build` and deploys `dist/` via the GitHub Pages Actions source.
