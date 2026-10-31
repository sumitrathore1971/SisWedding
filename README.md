# Hindi Wedding Invitation — Mobile-First Storytelling Website

A mobile-first, single-page Hindi wedding invitation website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Motion for React** (`motion/react`).

This project delivers a vertically scrolling storytelling experience designed primarily for mobile devices (320px–430px, with 390px as the primary WhatsApp viewport reference), while remaining centered and elegant on tablets and desktops.

---

## 1. Quick Start

### Prerequisites
- Node.js (v18.17+ or v20+)
- npm / pnpm / yarn

### Installation & Running Locally

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Use your browser's Developer Tools (Device Toolbar `Ctrl+Shift+M` or `Cmd+Shift+M`) set to **390 × 844** (iPhone 12/13/14) to experience the mobile storytelling flow.

### Production Build

```bash
npm run build
npm run start
```

---

## 2. Page Flow & Section Structure

The single-page invitation contains all 10 required sections in this exact order:

| Section # | Section Name | Component | Key Highlights |
|---|---|---|---|
| 1 | **Opening / Landing Screen** | `components/sections/OpeningSection.tsx` | Initial entrance animation, decorative background & illustration placeholders, `आमंत्रण खोलें` button that smoothly scrolls to the Couple section. |
| 2 | **Bride and Groom** | `components/sections/CoupleSection.tsx` | Staggered fade-up reveal for bride and groom portraits, names, family details, and bio. |
| 3 | **Family Invitation** | `components/sections/InvitationSection.tsx` | Traditional Ganesh shloka, formal Hindi invitation letter, inviting family hosts (दर्शनाभिलाषी). |
| 4 | **Haldi Ceremony** | `components/sections/HaldiSection.tsx` | **Reveals from the right** on scroll; date, time, venue, dress code, event banner, and illustration placeholders. |
| 5 | **Mehendi Celebration** | `components/sections/MehendiSection.tsx` | **Reveals from the right** on scroll; Mehendi night details and theme. |
| 6 | **Sangeet Night** | `components/sections/SangeetSection.tsx` | **Reveals from the right** on scroll; dance & musical night details. |
| 7 | **Wedding (पाणिग्रहण)** | `components/sections/WeddingSection.tsx` | **Reveals from the right** on scroll; sacred pheras, muhurat, mandap banner placeholder. |
| 8 | **Reception (प्रीतिभोज)** | `components/sections/ReceptionSection.tsx` | **Reveals from the right** on scroll; reception dinner, timing, and blessing ceremony. |
| 9 | **Venue & Directions** | `components/sections/VenueSection.tsx` | Scale reveal animation, complete venue address, parking information, and interactive `मानचित्र पर देखें` button with Google Maps link. |
| 10 | **Closing Screen** | `components/sections/ClosingSection.tsx` | Gratitude message, family contacts, and smooth `शीर्ष पर वापस जाएं` scroll-to-top button. |

---

## 3. Editing Wedding Information

All wedding data is centralized in a single configuration file:

📁 **`data/wedding.ts`**

You do not need to hunt through component files to update names or dates. Simply update `data/wedding.ts`:

- **Couple Details**: Change bride/groom names, parent names, bios, and portraits.
- **Invitation Copy**: Update the Hindi shloka, formal invitation body, and host families.
- **5 Events (Haldi, Mehendi, Sangeet, Wedding, Reception)**:
  - `titleHindi` & `titleEnglish`
  - `dateHindi` & `timeHindi`
  - `venueHindi` & `dressCode`
  - `descriptionHindi`
- **Venue**:
  - `venueName`, `address`, `landmark`, `parkingNotice`
  - `mapUrl`: Set your exact Google Maps pin URL for the `मानचित्र पर देखें` button.
- **Closing**: Contact phone numbers and closing message.

---

## 4. Replacing Images and Artwork

Image and illustration placeholders are built with `components/ui/PlaceholderImage.tsx` so you can visually verify layouts before providing final graphics.

### Folder Locations
- **`public/images/`**: Place actual photos and banners here (e.g., `bride.jpg`, `groom.jpg`, `wedding-mandap.jpg`, `venue.jpg`).
- **`public/illustrations/`**: Place custom SVG or PNG illustrations here (e.g., `ganesh-art.svg`, `haldi-pot.svg`, `mehendi-hands.svg`, `namaste.svg`).

### How to Replace a Placeholder with a Real Image
When you are ready to replace a placeholder, import `next/image` in the corresponding section component:

```tsx
// Before (Placeholder):
<PlaceholderImage
  label="वधू का चित्र (Bride Photo Placeholder)"
  aspectRatio="portrait"
/>

// After (Next.js Image):
import Image from "next/image";

<div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
  <Image
    src="/images/bride.jpg"
    alt="आयु. प्रिया शर्मा"
    fill
    className="object-cover"
    sizes="(max-width: 430px) 100vw, 430px"
  />
</div>
```

---

## 5. Customizing Animations

All reusable Motion animation variants and easing curves are located in:

📁 **`lib/animations.ts`**

### Available Variants:
- `fadeUp`: Opacity 0 → 1, Y 30px → 0.
- `slideFromRight`: Opacity 0 → 1, X 90px → 0.
- `slideFromLeft`: Opacity 0 → 1, X -90px → 0.
- `scaleReveal`: Opacity 0 → 1, Scale 0.96 → 1.
- `staggerContainer`: Coordinates sequential child reveals.
- `smoothEase`: `[0.22, 1, 0.36, 1]` cubic bezier for natural, premium motion.

### Customizing Event Section Reveals (`AnimatedEventSection.tsx`)
Each of the 5 event sections (Haldi, Mehendi, Sangeet, Wedding, Reception) uses `AnimatedEventSection.tsx`. You can adjust animation parameters either via component props or in `components/animation/AnimatedEventSection.tsx`:

```tsx
<AnimatedEventSection
  id="haldi-section"
  xOffset={85}          // Initial horizontal offset in pixels (70-100px)
  duration={0.85}       // Duration in seconds (0.7-1.0s)
  viewportAmount={0.2}  // Viewport trigger threshold (0.2 = triggers when 20% is in view)
  staggerChildren={0.12}// Stagger delay between title, artwork, image, and details
>
  ...
</AnimatedEventSection>
```

### Accessibility
The animation system automatically checks `useReducedMotion()`. If a guest has `prefers-reduced-motion` enabled in their device settings, horizontal translations are bypassed in favor of a subtle, non-jarring fade.

---

## 6. Typography & Styling

- **Devanagari Serif**: Configured with Google Font `Noto_Serif_Devanagari` via Next.js Font Optimization in `app/layout.tsx`.
- **Modern Sans**: Configured with `Poppins` for legible dates, addresses, and button labels.
- **Mobile Width Containment**: The invitation canvas is constrained to a mobile-friendly width (`max-w-[430px] mx-auto`) with `overflow-x-hidden` on parent containers to eliminate horizontal jitter during side-entry animations.