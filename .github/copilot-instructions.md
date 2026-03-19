# GitHub Copilot Instructions for Geek Bites

**ALWAYS follow these instructions first and only fallback to additional search and context gathering if the information here is incomplete or found to be in error.**

## Project Overview

Geek Bites is a static blog site built with Eleventy (11ty) for Move4Mobile developers. The site generates static HTML from Markdown blog posts and Nunjucks templates, with SASS for styling and Firebase hosting for deployment.

## Working Effectively

### Bootstrap and Build the Repository

- **Prerequisites**: Node.js (version 24 recommended, but 22+ works)
- **Install dependencies**: `npm ci` (preferred) or `npm install` - takes ~30 seconds
- **Build the site**: `npm run build` - takes ~1 second. NEVER CANCEL. Set timeout to 60+ seconds for safety.
- **Start development server**: `npm run start` - starts immediately on http://localhost:8080
- **Check for broken links**: `npm run check-broken-links:internal` - takes ~1-2 seconds
- **Format code**: `npx prettier --write .` (optional, many files need formatting)

### Build Times and Timeouts

- **Build**: ~1 second (set timeout: 60+ seconds)
- **Development server startup**: ~2-3 seconds (set timeout: 30+ seconds)
- **Link checking (internal)**: ~1-2 seconds (set timeout: 60+ seconds)
- **Link checking (external)**: Can take 30+ seconds due to external site checks (set timeout: 120+ seconds)
- **Dependency installation**: ~30 seconds (set timeout: 300+ seconds)

**CRITICAL: NEVER CANCEL ANY BUILD OR TEST COMMAND. Wait for completion even if it seems slow.**

## Validation Requirements

### Always Run These Commands After Making Changes

1. **Build validation**: `npm run build` - Must complete successfully
2. **Internal link checking**: `npm run check-broken-links:internal` - Must show "0 broken" links
3. **Development server test**: `npm run start` - Must start and serve on localhost:8080

### Manual Validation Scenarios

**ALWAYS test actual functionality by running through these scenarios after making changes:**

1. **Homepage validation**:
   - Start dev server: `npm run start`
   - Navigate to http://localhost:8080
   - Verify blog posts are displayed
   - Check navigation links work (Archive)
   - Verify styles are applied correctly

2. **Blog post validation**:
   - Click on a blog post from homepage
   - Verify post content renders properly
   - Check code syntax highlighting works
   - Verify author information displays
   - Test back navigation

3. **Archive page validation**:
   - Navigate to /archive/
   - Verify all posts are listed
   - Check pagination if applicable
   - Test post links from archive

**DO NOT skip manual validation. Simply starting and stopping the application is NOT sufficient.**

## Code Structure and Navigation

### Key Directories (Most Important First)

- `src/posts/` - Blog post Markdown files (content creation happens here)
- `src/_includes/layouts/` - Nunjucks templates (default.njk, post.njk, page.njk, home.njk)
- `src/_sass/` - SASS stylesheets (styling modifications)
- `src/_data/` - Global data files (site.js, people.json)
- `src/assets/` - Static assets (images, icons)
- `dist/` - Generated site output (never edit directly)
- `eleventy.config.js` - Eleventy configuration (build customization)

### Critical Files to Know

- `package.json` - Scripts and dependencies
- `eleventy.config.js` - Site generator configuration
- `src/_data/site.js` - Site-wide configuration
- `src/_data/people.json` - Author information
- `src/styles.scss` - Main SASS entry point
- `firebase.json` - Deployment configuration

### Blog Post Structure

- Posts use Markdown with front matter: title, author, date, min_read, permalink
- Automatic "posts" tag and post layout
- Permalink structure: `{{ date | ymd }}/{{ title | slugify }}/`
- Images stored in `src/assets/` with post-specific subdirectories

## Development Workflow

### Common Tasks

- **Add new blog post**: Create `.md` file in `src/posts/` with proper front matter
- **Update styling**: Modify files in `src/_sass/`, main entry in `src/styles.scss`
- **Modify layouts**: Edit Nunjucks templates in `src/_includes/layouts/`
- **Add author**: Update `src/_data/people.json`
- **Site configuration**: Modify `src/_data/site.js`

### Before Committing Changes

1. **Build check**: `npm run build` - must succeed
2. **Link validation**: `npm run check-broken-links:internal` - 0 broken links
3. **Manual testing**: Follow validation scenarios above
4. **Code formatting** (optional): `npx prettier --write .`

## Available npm Scripts

```bash
npm run build              # Build production site
npm run start             # Development server with live reload
npm run check-broken-links # Check both internal and external links
npm run check-broken-links:internal  # Internal links only (faster)
npm run check-broken-links:external  # External links only (slower)
```

## CI/CD Pipeline Notes

- **Build job**: Runs on Node.js 24, uses `npm ci` and `npm run build`
- **Link checking**: Only internal links are checked in CI
- **Deployment**: Automatic to Firebase hosting on develop/main branches
- **Artifact**: dist/ directory is archived and deployed

## Technology Stack Details

- **Static Site Generator**: Eleventy (11ty) v3
- **Templating**: Nunjucks for layouts, Liquid for posts
- **Styling**: SASS compiled via custom template extension using `sass` package
- **Syntax Highlighting**: Prism.js via @11ty/eleventy-plugin-syntaxhighlight
- **RSS**: Generated via @11ty/eleventy-plugin-rss
- **Hosting**: Firebase hosting
- **Build Tool**: Eleventy with custom configuration

## Troubleshooting

### Common Issues

- **Build fails**: Check syntax in Markdown front matter or Nunjucks templates
- **Styles not updating**: Clear dist/ directory: `rimraf dist` then rebuild
- **Broken links**: Run link checker to identify issues
- **Dev server not starting**: Check if port 8080 is available
- **Images not loading**: Verify paths relative to `src/assets/`

### File Extensions and Formats

- **Blog posts**: `.md` (Markdown with front matter)
- **Templates**: `.njk` (Nunjucks)
- **Styles**: `.scss` (SASS)
- **Data**: `.js` or `.json`
- **Static assets**: Any format in `src/assets/`

## Quick Reference Commands

```bash
# Setup
npm ci                                    # Install dependencies (~30s)

# Development
npm run start                            # Dev server (~2s startup)
npm run build                            # Production build (~1s)

# Validation
npm run check-broken-links:internal      # Link check (~1-2s)
npx prettier --check .                   # Format check
npx prettier --write .                   # Auto-format

# Manual testing
# 1. Start server: npm run start
# 2. Open: http://localhost:8080
# 3. Test: homepage, blog posts, archive, navigation
```

**Remember: This is a fast-building static site. Most operations complete in seconds. Always validate manually by testing the actual website functionality, not just build success.**
