# 🤖 Portfolio Developer Guide: React/Next.js for Android Engineers

Welcome to your portfolio codebase! As an Android engineer, you already understand components, layouts, lifecycles, and animations. This guide translates modern web development concepts (Next.js, Tailwind, GSAP) into their **Jetpack Compose** and **Android SDK** equivalents.

---

## 🗺️ Architectural Mapping: Android vs. Web

| Android Concept | Web (This Project) equivalent | Description |
| :--- | :--- | :--- |
| **`AndroidManifest.xml`** | [app/layout.tsx](file:///Users/mac/code/front%20end/website/app/layout.tsx) | Configures global structure, HTML headers, meta tags, and root wrappers. |
| **`res/values/strings.xml`** | [content.ts](file:///Users/mac/code/front%20end/website/content.ts) | The single source of truth for text copy, stats, projects, and social links. |
| **`MainActivity` / `NavHost`** | [app/page.tsx](file:///Users/mac/code/front%20end/website/app/page.tsx) | The entry-point layout hosting the sequence of screens/scenes. |
| **Composables (`@Composable`)** | React Components (e.g., `ColdOpen.tsx`) | Reusable functional units that return UI nodes (HTML tags). |
| **Modifiers (`Modifier.fillMaxSize()`)** | Tailwind CSS Classes (`w-full h-screen`) | Inline styling strings that define layout width, colors, padding, etc. |
| **`res/drawable/`** | `public/` directory | Directory for static files (images, PDFs, screenshots) served directly at `/filename`. |
| **Compose Animations / MotionLayout** | GSAP (GreenSock) + Framer Motion | Library used for physics-based and scroll-driven page animations. |

---

## 🏗️ 1. Understanding the UI Component System (TSX/JSX)

In Jetpack Compose, you declare UI hierarchically using Kotlin:
```kotlin
// Compose
@Composable
fun HeroSection(name: String) {
    Column(modifier = Modifier.fillMaxWidth().padding(16.dp)) {
        Text(text = name, style = MaterialTheme.typography.h1)
    }
}
```

In React, we use **TSX** (TypeScript XML). It looks like HTML mixed with JavaScript:
```tsx
// React / TypeScript
export default function HeroSection({ name }: { name: string }) {
  return (
    <div className="w-full p-4 flex flex-col">
      <h1 className="text-3xl font-bold">{name}</h1>
    </div>
  )
}
```

### State & Lifecycle Hooks
If you need state or side-effects, React uses **Hooks** which map directly to Compose concepts:

* **`useState`** ↔ **`remember { mutableStateOf() }`**
  ```tsx
  const [counting, setCounting] = useState(false); // React
  // vs
  var counting by remember { mutableStateOf(false) } // Compose
  ```
* **`useEffect`** ↔ **`LaunchedEffect` / Lifecycle Listeners**
  `useEffect` runs side effects after a component renders. A dependency array `[]` means it runs exactly **once** on component mount (similar to `LaunchedEffect(Unit)`).
  ```tsx
  useEffect(() => {
    // Initial setups (e.g. register animation triggers)
    return () => {
      // Cleanup on unmount (similar to DisposableEffect)
    }
  }, [])
  ```

---

## 🎨 2. Styling: Tailwind CSS vs. Compose Modifiers

Instead of writing styles in separate XML/CSS files, Tailwind uses **utility classes** directly on elements.

```tsx
<div className="flex flex-col md:flex-row items-center justify-between p-6 bg-black text-white">
```

### Quick Translation Guide:
* **Layouts**:
  * `flex flex-col` = `Column`
  * `flex flex-row` = `Row`
  * `grid grid-cols-2` = `LazyVerticalGrid(columns = GridCells.Fixed(2))`
  * `items-center` = `Alignment.CenterVertically`
  * `justify-between` = `Arrangement.SpaceBetween`
* **Spacing**:
  * `p-6` = `Modifier.padding(24.dp)` (Tailwind multiples of 4px; `6 * 4px = 24px`)
  * `gap-4` = `Arrangement.spacedBy(16px)`
* **Responsive Breakpoints**:
  * Tailwind uses prefixes like `md:` to apply styles *only* on wider screens:
  * `flex-col md:flex-row` means "Render as a Column on mobile, but switch to a Row on medium screens (768px+)".

---

## 🎬 3. Animations: GSAP & ScrollTrigger

Most animations in this portfolio are **scroll-driven** rather than time-driven. They are managed using **GSAP** (GreenSock Animation Platform) and its **ScrollTrigger** plugin.

### Key Concepts in the Animations:
1. **`gsap.timeline({ scrollTrigger: { ... } })`**: Creates a sequence of animations tied directly to the page scroll position.
2. **Pinning (`pin: true`)**: Temporarily locks the section in place vertically on screen while the user continues to scroll. Instead of moving the page down, scroll progress animates child elements (like swapping screens or sliding panels).
3. **Scrubbing (`scrub: 1`)**: Binds the animation progress directly to the scrollbar scroll position. Scrolling forward plays the animation forward, and scrolling back plays it in reverse.
4. **Match Media (`gsap.matchMedia()`)**: Enables/disables animations based on screen size (e.g., standard horizontal scrolls on desktop, but simplified vertical lists on mobile to ensure great mobile UX).

---

## 📝 4. How to Navigate and Update Your Site

### A. Updating Text & Personal Info
All main text copy is stored in [content.ts](file:///Users/mac/code/front%20end/website/content.ts). To change your job description, bio, tags, or stats, you **only** need to edit this file:
1. Open [content.ts](file:///Users/mac/code/front%20end/website/content.ts).
2. Modify the properties inside `export const content = { ... }`.
3. Save, and the local dev server will hot-reload automatically.

### B. Adding/Updating Projects
The projects are mapped list items in `content.ts`. Each project is rendered by its own dedicated screen/component inside [components/scenes/](file:///Users/mac/code/front%20end/website/components/scenes/):
- **Project 01** ➡️ [ProjectIPO.tsx](file:///Users/mac/code/front%20end/website/components/scenes/ProjectIPO.tsx)
- **Project 02** ➡️ [ProjectLicense.tsx](file:///Users/mac/code/front%20end/website/components/scenes/ProjectLicense.tsx)
- **Project 03** ➡️ [ProjectQuizzle.tsx](file:///Users/mac/code/front%20end/website/components/scenes/ProjectQuizzle.tsx)

If you replace screenshots:
1. Save the image files in [public/screenshots/your-project/](file:///Users/mac/code/front%20end/website/public/screenshots/).
2. Update the `SCREENS` file path array at the top of the corresponding scene component file.

### C. Linking Your Resume
Since we saved your resume to `public/Hari_Joshi_Resume.pdf`, you can reference it directly as a link from any button on the website using `/Hari_Joshi_Resume.pdf`.

For example, to link the "Let's talk" button or add a resume button in [components/scenes/Invitation.tsx](file:///Users/mac/code/front%20end/website/components/scenes/Invitation.tsx):
```tsx
<a href={prefixPath('/Hari_Joshi_Resume.pdf')} target="_blank" rel="noopener noreferrer">
  Download Resume
</a>
```

---

## ⚡ 5. Cheat Sheet of Shell Commands

Run these in your terminal within the `/Users/mac/code/front end/website` folder:

* **Start Dev Server**: `npm run dev` (Starts hot-reloading server at http://localhost:3000)
* **Verify Static Export**: `npm run build` (Compiles TypeScript and bundles production assets locally)
* **Check Git Status**: `git status` (Checks what files you modified)
* **Deploy to Production**: Just commit and push to `main` branch. GitHub Actions compiles and hosts it dynamically.
