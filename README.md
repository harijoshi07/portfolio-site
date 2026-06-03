# Hari Joshi Portfolio

A static personal portfolio for Hari Krishna Joshi, focused on mobile engineering, Kotlin Multiplatform, Jetpack Compose, and Android project work.

## Structure

- `index.html` - Page structure and static sections.
- `style.css` - Responsive layout, dark/light themes, and visual styling.
- `script.js` - Theme handling, dynamic rendering, scroll interactions, mobile menu, and image preview behavior.
- `data/` - Editable content for about, experience, and projects.
- `assets/` - Resume, favicon, and local font files.
- `assets/images/project-banners/` - Project preview images used on the portfolio.

## Local Preview

Open `index.html` directly in a browser, or run a small static server from the project root:

```sh
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Editing Content

Most page content is data-driven:

- Update profile, contact links, resume path, and social links in `data/about.js`.
- Update roles and work history in `data/experience.js`.
- Update project cards, links, tags, and banner paths in `data/projects.js` .

## Deployment

This site does not need a build step. Deploy the repository root as a static site to GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any static host.

Make sure these files are included in the deployed output:

- `index.html`
- `style.css`
- `script.js`
- `data/`
- `assets/`
- `assets/images/project-banners/`
