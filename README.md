# Geek Bites

[![Deploy Production](https://github.com/move-frontend/geekbites/actions/workflows/deploy-production.yml/badge.svg)](https://github.com/move-frontend/geekbites/actions/workflows/deploy-production.yml)
[![Nightly Build](https://github.com/move-frontend/geekbites/actions/workflows/nightly.yml/badge.svg)](https://github.com/move-frontend/geekbites/actions/workflows/nightly.yml)
[![Latest Release](https://img.shields.io/github/v/release/move-frontend/geekbites)](https://github.com/move-frontend/geekbites/releases)
[![License](https://img.shields.io/github/license/move-frontend/geekbites)](LICENSE)

The Framna developer blog — tech articles by and for developers, built with [Eleventy](https://www.11ty.dev/).

**Read it live: <https://geekbites.move4mobile.io>**

## Quick start

Requires [Node.js](https://nodejs.org/) — the version is pinned in [`.nvmrc`](.nvmrc); run `nvm use` ([nvm](https://github.com/nvm-sh/nvm)) to switch to it.

```bash
git clone git@github.com:move-frontend/geekbites.git
cd geekbites
nvm use
npm ci
npm run start
```

The dev server runs at `http://localhost:8080` with live reload.

## Writing a blog post

1. Create a Markdown file in [`src/posts/`](src/posts/), named `YYYY-MM-DD-your-title.md`.
2. Add front matter:

   ```yaml
   ---
   title: 'Your post title'
   category: ai-tools
   tags: comma, separated, tags
   author: michael
   min_read: 5
   date: 2026-07-05
   permalink: /2026/07/05/your-title/
   ---
   ```

3. The `author` key must match an entry in [`src/_data/people.json`](src/_data/people.json) — add yourself there if this is your first post.
4. Open a pull request. Every PR automatically gets a **Firebase preview channel** so reviewers can read your post on a live URL.

## Available scripts

| Script | Description |
|--------|-------------|
| `npm run start` | Dev server with live reload (cleans `dist/` first) |
| `npm run build` | Production build to `dist/` |
| `npm run check-broken-links` | Check internal + external links in the built site |
| `npm run check-broken-links:internal` | Internal links only (fast — also runs in CI) |
| `npm run check-broken-links:external` | External links only (slow) |

## Project structure

```
src/
├── posts/              # Blog posts (Markdown)
├── _includes/layouts/  # Nunjucks templates
├── _sass/              # Sass stylesheets
├── _data/              # Site config + author data
└── assets/             # Images and icons
eleventy.config.js      # Eleventy configuration (ESM)
firebase.json           # Firebase Hosting config
```

## Contributing & deployment

This repo uses **trunk-based development**:

- Branch off `main`, open a PR against `main` (one approving review required).
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/) — semantic-release derives versions and release notes from them (commitlint is configured; local hook enforcement is not currently wired up on fresh clones).
- Every merge to `main` **deploys automatically to production**.
- Releases are fully automated by [semantic-release](https://semantic-release.gitbook.io/): a `feat:` or `fix:` merge produces a GitHub Release with generated notes. Never tag or bump versions manually. Release notes live on the [Releases page](https://github.com/move-frontend/geekbites/releases) (`CHANGELOG.md` is frozen).
- Dependencies are managed by Dependabot (weekly, grouped).

## License

[Apache 2.0](LICENSE)
