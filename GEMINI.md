# Gemini Project Instructions

This document provides instructions for interacting with the geekbites project.

## Project Overview
Geek Bites is a static blog site built with Eleventy (11ty) for Move4Mobile developers. The site generates static HTML from Markdown blog posts and Nunjucks templates, with SASS for styling.

## Project Setup

- **Node.js Version:** 22 (from `.nvmrc`)
- **Installation:** `npm ci` or `npm install`

## Common Commands

### Development
- `npm start` - Start development server with live reload (cleans dist first)
- `npm run build` - Build production site to dist/ directory

### Link Checking
- `npm run check-broken-links` - Check both internal and external links
- `npm run check-broken-links:internal` - Check internal links only
- `npm run check-broken-links:external` - Check external links only

### Maintenance
- `npm audit fix` - Fix security vulnerabilities

## Architecture

### Key Directories
- `src/` - Source files (input directory)
- `dist/` - Generated site output
- `src/posts/` - Blog post markdown files
- `src/_includes/layouts/` - Nunjucks templates (default.njk, post.njk, page.njk, home.njk)
- `src/_sass/` - SASS stylesheets
- `src/assets/` - Static assets (images, icons)
- `src/_data/` - Global data files (site.js, people.json)

### Build System
- **Eleventy (eleventy.config.js)**: Static site generator configuration (ESM)
- **SASS compilation**: Custom template extension using `sass` package
- **Syntax highlighting**: Prism.js via @11ty/eleventy-plugin-syntaxhighlight
- **RSS feed**: Generated via @11ty/eleventy-plugin-rss

### Blog Post Structure
- Posts are in `src/posts/` as Markdown files
- Front matter includes: title, author, date, min_read, permalink
- Posts automatically get "posts" tag and use post layout
- Permalink structure: `{{ date | ymd }}/{{ title | slugify }}/`

### Deployment
- Firebase hosting configured (firebase.json)
- Semantic release configured for automated versioning
- Husky hooks for commit message linting (conventional commits)

### Data Sources
- `src/_data/site.js` - Site-wide configuration
- `src/_data/people.json` - Author information
- Individual post front matter

### Styling
- Main SASS entry point: `src/styles.scss`
- Modular SASS files in `src/_sass/`
- Compiled to `dist/styles.css`