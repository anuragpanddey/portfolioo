# Graphic Designer Portfolio

A modern, data-driven React portfolio for graphic designers. Dark theme with orange accents. All content is editable via a single configuration file.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Project Structure

```
src/
├── data.js          # ← Edit ALL content here (no hardcoding elsewhere)
├── App.jsx          # Main layout - reorder sections as needed
├── components/      # Reusable UI components
│   ├── Navbar.jsx   # Logo center, nav links left/right
│   ├── Hero.jsx     # Home with background video
│   ├── About.jsx    # Centered profile image
│   ├── Services.jsx # Photography, VFX, 3D, etc.
│   ├── Skills.jsx   # Skill tags
│   ├── Software.jsx # Browser-style icon grid
│   ├── Certifications.jsx
│   ├── Education.jsx
│   ├── Experience.jsx
│   ├── Gallery.jsx  # Masonry grid, filterable
│   ├── Blog.jsx
│   └── Contact.jsx
public/
├── videos/          # Place hero video here: hero-bg.mp4
└── images/          # Local images (optional)
```

## How to Edit Content

### 1. Logo (Navbar Center)

In `src/data.js`:

```js
logo: {
  text: "PORTFOLIO",           // Change brand name
  icon: "◆",                   // Emoji, or image path: "/logo.svg"
},
```

- **Text only:** Use any character/emoji for `icon`
- **Image logo:** Set `icon: "/logo.svg"` and place `logo.svg` in `public/`

### 2. Hero / Home Section

- **Background video:** Add `hero-bg.mp4` to `public/videos/`. Update path in `heroData.backgroundVideo` if different.
- **Fallback image:** If video fails, `fallbackImage` is used. Use URL or `/images/hero-fallback.jpg`
- **Text:** Edit `greeting`, `name`, `title`, `bio` in `heroData`

### 3. About Me

- **Image:** Set `aboutData.image` to URL or `/images/about-me.jpg`
- **Text & stats:** Edit `heading`, `text`, `stats` array

### 4. Services (Content Categories)

Edit `servicesData` array. Each item:

```js
{
  id: "photography",
  title: "Photography",
  description: "...",
  image: "https://..." or "/images/services/photography.jpg"
}
```

Add/remove items. Categories: Photography, Videography, Movie, Rendering, UI Templates, Advertisement Templates, BTS, 3D Modelling, Graphics, Game Designing, Environment Designing, VFX.

### 5. Skills

Edit `skillsData` array (simple string list).

### 6. Software & Tools

Edit `softwareData`. Icons use `react-icons` (bi, fa, si libraries). Add new icons to `Software.jsx` iconMap:

```js
import { SiNewicon } from "react-icons/si";
const iconMap = { ...existing, SiNewicon };
```

Available: BiLogoAdobe, FaFigma, SiBlender, SiUnrealengine, SiAutodesk, SiMax, etc.

### 7. Gallery (Masonry Portfolio)

- **Images:** Edit `galleryData`. Each item: `{ id, image, title, category }`
- **Categories:** Must match `galleryFilters` (all, photography, videography, 3d, vfx, ui, graphics, game, advertisement, environment)
- **Replace placeholders:** Use `/images/gallery/1.jpg` etc. or external URLs

### 8. Blog

Edit `blogData` array. Fields: `id`, `title`, `category`, `date`, `author`, `image`, `excerpt`

### 9. Certifications, Education, Experience

Edit `certificationsData`, `educationData`, `experienceData` in `data.js`.

### 10. Contact & Footer

- **Contact form:** `contactData.heading`, `placeholder`, `buttonText`
- **Details:** `email`, `phone`, `address`
- **Social links:** `contactData.social` array with `name`, `url`, `icon`
- **Footer links:** `footerLinks.resources` and `footerLinks.support`

## Background Video

1. Place your video as `public/videos/hero-bg.mp4`
2. Or set `heroData.backgroundVideo` to your path
3. Video must be MP4, autoplay/muted/loop for best UX
4. If video fails to load, `fallbackImage` is shown

## Replacing Placeholder Images

Current setup uses `placehold.co` URLs. To use real images:

1. **Local:** Place files in `public/images/` and reference as `/images/filename.jpg`
2. **External:** Use full URLs in `data.js`

## Section Order

Reorder sections in `src/App.jsx` by moving component imports and JSX.

## Build for Production

```bash
npm run build
```

Output in `dist/`. Deploy to Vercel, Netlify, or any static host.

## Tech Stack

- React 19 + Vite
- react-masonry-css (gallery)
- react-icons (software & social icons)
