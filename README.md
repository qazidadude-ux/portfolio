# Portfolio

A Next.js (App Router) rebuild of the LaunchFolio Framer template, with the
same visual design and animations but a clean, editable React codebase.

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS 4
- Framer Motion for scroll reveals, the FAQ accordion, and drag carousels
- MDX (via `next-mdx-remote`) for the blog, sourced from `content/blog/`

## Editing content

Almost everything on the homepage — name, hero copy, services, pricing,
FAQs, social links, the booking URL — lives in one file:

```
src/data/site.ts
```

Projects live in `src/data/projects.ts`, and testimonials in
`src/data/testimonials.ts`. Add a project by adding an entry to the
`PROJECTS` array; its `/projects/[slug]` page is generated automatically.

## Editing the blog

Drop a new `.mdx` file into `content/blog/` with frontmatter:

```mdx
---
title: Your post title
date: 2026-01-01
author: Your Name
excerpt: One or two sentences shown on the blog index and homepage preview.
---

Your post content in Markdown/MDX.
```

It will automatically appear on `/blog` and get its own `/blog/[slug]` page.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to https://vercel.com/new, import the repo, and click Deploy —
   Vercel auto-detects Next.js and needs no extra configuration.
3. Every push to `main` redeploys automatically; every pull request gets
   its own preview URL.

## Before you launch

- Replace all placeholder copy and the booking URL (`SITE.bookingUrl`) in
  `src/data/site.ts`.
- Replace project artwork: each project currently uses a flat placeholder
  color (`color` field in `src/data/projects.ts`) instead of real images —
  swap in real photos/screenshots via `next/image` when ready.
- Fill in `src/app/legal/terms` and `src/app/legal/privacy` with real
  policies.
