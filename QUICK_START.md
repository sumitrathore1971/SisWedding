# ⚡ Quick Start & Cheatsheet (`QUICK_START.md`)

Use this cheatsheet for common development tasks, standard CLI commands, and code recipes.

---

## 🚀 1. Essential Commands

| Task | Command | Description |
|---|---|---|
| **Start Dev Server** | `npm run dev` | Runs Next.js dev server on [http://localhost:3000](http://localhost:3000) with Turbopack. |
| **Type Check & Build** | `npm run build` | Builds production bundle and checks for TypeScript/ESLint errors. |
| **Run Production Server** | `npm run start` | Serves optimized production build. |
| **Lint Codebase** | `npm run lint` | Runs Next.js ESLint checker. |

---

## 📱 2. How to Test Mobile Viewports

The design is optimized for mobile storytelling. When testing in your browser:
1. Open Chrome DevTools (`F12` or `Ctrl + Shift + I`).
2. Toggle device toolbar (`Ctrl + Shift + M`).
3. Select or create these viewport presets:
   - **iPhone 12 / 13 / 14 / 15**: `390 × 844 px` (Primary target)
   - **iPhone SE / Small**: `375 × 667 px` (Minimum test width)
   - **Google Pixel 7**: `412 × 915 px`
   - **Desktop**: Notice the central card container with dark backdrop.

---

## 🛠️ 3. Common Development Recipes

### Recipe A: Update Bride, Groom, or Family Information
Open [`data/wedding.ts`](file:///d:/wedding/data/wedding.ts):
```typescript
couple: {
  bride: {
    name: "आयु. प्रिया शर्मा",
    relationTitle: "सुपुत्री",
    parents: "श्रीमती सुनीता एवं श्री राजेश शर्मा",
    bio: "सॉफ्टवेयर इंजीनियर...",
    imagePlaceholderLabel: "वधू का चित्र",
  },
  groom: {
    name: "चि. राहुल वर्मा",
    relationTitle: "सुपुत्र",
    parents: "श्रीमती अनीता एवं श्री सुरेश वर्मा",
    bio: "वास्तुकार...",
    imagePlaceholderLabel: "वर का चित्र",
  },
}
```

---

### Recipe B: Update an Event (Date, Muhurat, or Dress Code)
Open [`data/wedding.ts`](file:///d:/wedding/data/wedding.ts) under `events`:
```typescript
haldi: {
  id: "haldi-section",
  sectionNumber: 4,
  titleHindi: "हल्दी उत्सव",
  titleEnglish: "Haldi Ceremony",
  tagline: "पीले रंगों से सजेगा प्रेम का उत्सव",
  dateHindi: "शुक्रवार, 20 नवंबर 2026",
  timeHindi: "प्रातः 10:00 बजे से",
  venueHindi: "विवाह स्थल प्रांगण (पूलसाइड)",
  dressCode: "पीला परिधान (Yellow Attire)",
  descriptionHindi: "पारंपरिक उबटन और हल्दी रस्म...",
  bannerPlaceholderLabel: "हल्दी बैनर चित्र",
  backgroundImage: "/images/haldi.jpg",
}
```

---

### Recipe C: Update Venue & Google Maps Pin Link
Open [`data/wedding.ts`](file:///d:/wedding/data/wedding.ts) under `venue`:
```typescript
venue: {
  venueName: "रॉयल पैलेस रिसॉर्ट",
  address: "प्लॉट नं. 45, हेरिटेज लेन, जयपुर, राजस्थान 302001",
  landmark: "एयरपोर्ट रोड के पास",
  mapUrl: "https://maps.google.com/?q=Your+Exact+Wedding+Location",
  parkingNotice: "पर्याप्त पार्किंग एवं वैलेट सुविधा उपलब्ध है।",
}
```

---

### Recipe D: Replace an Image Placeholder with a Real Image
1. Save your image into `public/images/` (e.g., `public/images/bride.jpg`).
2. Open the section file (e.g., `components/sections/CoupleSection.tsx`).
3. Replace the placeholder component with `next/image`:

```tsx
import Image from "next/image";

// Replace PlaceholderImage with:
<div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
  <Image
    src="/images/bride.jpg"
    alt="आयु. प्रिया शर्मा"
    fill
    className="object-cover"
    sizes="(max-width: 480px) 100vw, 480px"
  />
</div>
```

---

### Recipe E: Adjust Section Animation Timings
In [`components/animation/AnimatedEventSection.tsx`](file:///d:/wedding/components/animation/AnimatedEventSection.tsx) or when using the component:

```tsx
<AnimatedEventSection
  id="haldi-section"
  xOffset={85}            // Horizontal offset distance (pixels)
  duration={0.85}         // Animation duration in seconds
  viewportAmount={0.2}    // Triggers when 20% enters viewport
  staggerChildren={0.12}  // Delay between child item reveals
>
  {/* Content */}
</AnimatedEventSection>
```

---

## ⚠️ 4. Key Rules & Pitfalls to Avoid

| Pitfall | Why It Fails | Correct Solution |
|---|---|---|
| Importing from `"framer-motion"` | Package installed is `"motion"`, not `"framer-motion"`. | Always import from `"motion/react"`. |
| Creating a `tailwind.config.js` file | Tailwind CSS v4 is used with `@import "tailwindcss";` in `globals.css`. | Put theme modifications directly in `globals.css`. |
| Missing `overflow-x-hidden` on parents | Right-sliding animations (`x: 85`) cause horizontal scroll wobble on mobile Safari/Chrome. | Keep `overflow-x-hidden` on `main`, container, and sections. |
| Hardcoding text in component JSX | Creates multiple conflicting copies of names/dates. | Add all text to `data/wedding.ts` and reference it via `weddingData`. |
| Removing Next.js Agent block in `AGENTS.md` | `next dev` script will automatically regenerate it and mark uncommitted git diffs. | Keep the `<!-- BEGIN:nextjs-agent-rules -->` block untouched. |

