# Prerna Blog

A minimal, Medium-inspired static blog built with React + Vite + Tailwind CSS. Markdown files placed in `content/blogs/` are automatically discovered and rendered at build time.

## Adding a New Post

1. Create a `.md` file in `content/blogs/` (e.g., `content/blogs/my-new-post.md`)
2. Add required frontmatter at the top of the file (see format below)
3. Run `npm run build` and deploy — the post appears automatically

## Frontmatter Format

Every markdown file **must** begin with frontmatter between `---` delimiters:

```yaml
---
title: Your Post Title
date: 2026-07-23
description: A short summary that appears on the blog card and in search results.
tags: [react, tutorial, writing]
readingTime: 5 min
---
```

| Field | Required | Description |
|---|---|---|
| `title` | Yes | The blog post title |
| `date` | Yes | Publication date in `YYYY-MM-DD` format |
| `description` | Yes | Short summary for cards and search |
| `tags` | No | Array of tags for filtering (e.g., `[react, tutorial]`) |
| `readingTime` | No | Custom reading time string. Auto-computed from word count (~200 wpm) if absent |

After the frontmatter, write your content in standard Markdown.

## Features

- **Auto-discovery**: Drop `.md` files in `content/blogs/`, rebuild, and they appear
- **Search**: Filter posts by title, description, and tags
- **Sort**: Newest, Oldest, Reading Time, Alphabetical
- **Tags**: Click a tag to filter the post list
- **Reading Progress**: Fixed progress bar on each article
- **Table of Contents**: Sticky sidebar on desktop, collapsible drawer on mobile
- **Copy Code**: Hover over code blocks to copy
- **Syntax Highlighting**: Powered by highlight.js (GitHub theme)
- **Prev / Next Navigation**: At the bottom of each article
- **Responsive**: Mobile, tablet, desktop
- **Smooth Animations**: Framer Motion page transitions and scroll reveals
- **Animated SVG Hero**: CSS-animated botanical illustration with parallax

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to GitHub Pages

1. Build the project: `npm run build`
2. Push the `dist/` folder contents to the `gh-pages` branch, or
3. Use a GitHub Action to auto-build on every push

The site uses Hash-based routing (`/#/`), so GitHub Pages will not return 404 errors.

## Project Structure

```
├── content/blogs/          # Markdown blog posts (add your .md files here)
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Route page components
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utility functions
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```
