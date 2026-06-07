# Hari Joshi Portfolio

A premium, interactive, scroll-driven personal developer portfolio for **Hari Joshi**, built with modern web technologies: Next.js (App Router), Tailwind CSS, GSAP (ScrollTrigger), TypeScript, and Lenis (Smooth Scroll).

👉 **Are you an Android engineer?** Check out the [Android Developer Guide to this codebase](file:///Users/mac/code/front%20end/website/DEVELOPER_GUIDE.md) to quickly understand how the React, Tailwind, and GSAP code maps to Jetpack Compose and Android SDK!

---

## 🛠️ Technology Stack

- **Core**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Motion & Interactions**: GSAP, GSAP ScrollTrigger, Lenis Smooth Scroll
- **Deployment**: GitHub Actions + GitHub Pages static export (`output: 'export'`)

---

## 📂 Project Structure

- `app/` - Next.js layouts, globals CSS, and main page route.
- `components/` - Interactive scroll-driven scene components (ColdOpen, Engineer, Project showcases, Timeline, Invitation, etc.) and global UI elements (Navbar, Custom Cursor, etc.)
- `lib/` - GSAP setup and responsive utility hooks.
- `public/` - Static assets including profile photos, store icons, and application mockups screenshots.
- `content.ts` - Centralized data file containing Hari's profile, projects lists, reviews, experiences, and social handles.

---

## 💻 Local Development

First, ensure you have Node.js (v20+) installed. Then, install the dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to preview the site.

---

## 📝 Customizing Content

All text contents, project links, screenshots arrays, and timeline items are fully data-driven. Modify [content.ts](file:///Users/mac/code/front%20end/website/content.ts) to update:
- Personal details (name, title, bio photo, socials).
- Work experiences (role, company, description list, timeline).
- App showcase details (title, store links, screenshots arrays, reviews, etc.).

---

## 🚀 Deployment

The repository is configured with a custom GitHub Actions workflow (`pages.yml`). 

Simply commit and push your changes to the `main` branch:

```bash
git add .
git commit -m "Update portfolio content"
git push origin main
```

The workflow will automatically:
1. checkout the repository.
2. install dependencies via `npm ci`.
3. Compile the Next.js static build via `npm run build` (exporting page assets to `./out`).
4. Upload and deploy the static build directly to your **github.io** site.
