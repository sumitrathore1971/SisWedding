import { OpeningSection } from "@/components/sections/OpeningSection";
import { CeremonyWipeGallery } from "@/components/sections/CeremoniesWipeGallery";
import { ClosingSection } from "@/components/sections/ClosingSection";
import { Decoration } from "@/components/ui/Decoration";
import { MusicToggleButton } from "@/components/ui/MusicToggleButton";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { Analytics } from "@vercel/analytics/next"
/**
 * Single-Page Hindi Wedding Invitation Flow
 * 
 * Styled with a continuous white frame overlay featuring
 * inverted solid white filled corners for an architectural viewport finish.
 */
export default function WeddingInvitationPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center bg-neutral-900 overflow-x-clip">
      {/* Opening Split Splash Screen */}
      <Analytics/>
      <SplashScreen />

      {/* 
        Responsive Canvas Container:
        Full-width on mobile, centered on desktop with full viewport height.
      */}
      
      <div className="w-full max-w-[480px] min-h-screen bg-white flex flex-col relative overflow-x-clip shadow-2xl">
        {/* Section 1: Opening / Landing Screen */}
        <Decoration />
        <OpeningSection />

        {/* Sections 2-6: Sticky Wipe Gallery (Invitation -> Haldi -> Mehendi -> Sangeet -> Wedding) */}
        <CeremonyWipeGallery />

        {/* Section 7: Venue & Closing (विवाह स्थल एवं सधन्यवाद) */}
        <ClosingSection />
      </div>

      {/* Floating Music Toggle Button in bottom-right corner of mobile view */}
      <div className="fixed bottom-5 right-5 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[480px] z-50 pointer-events-none flex justify-end sm:px-5">
        <MusicToggleButton src="/music/invitationsong.mp3" />
      </div>

      {/* 
        Fixed Architectural White Frame Overlay with Filled White Corners
        - Takes full height (top-0 bottom-0)
        - Flush outer straight edges
        - Solid white borders on all 4 sides
        - Corner wedges are 100% filled with solid white curving smoothly into the inner viewport
        - Non-interactive (pointer-events-none) so all touch/click interactions pass freely
      */}
      <div
        className="pointer-events-none fixed inset-0 sm:left-1/2 sm:-translate-x-1/2 sm:w-[480px] z-50 overflow-hidden"
        aria-hidden="true"
      >
        {/* Top white border */}
        <div className="absolute top-0 left-0 right-0 h-[6px] sm:h-[8px] bg-white" />

        {/* Bottom white border */}
        <div className="absolute bottom-0 left-0 right-0 h-[6px] sm:h-[8px] bg-white" />

        {/* Left white border */}
        <div className="absolute top-0 bottom-0 left-0 w-[6px] sm:w-[8px] bg-white" />

        {/* Right white border */}
        <div className="absolute top-0 bottom-0 right-0 w-[6px] sm:w-[8px] bg-white" />

        {/* Top-Left Filled White Corner */}
        <div className="absolute top-0 left-0 w-7 h-7 sm:w-9 sm:h-9 corner-tl" />

        {/* Top-Right Filled White Corner */}
        <div className="absolute top-0 right-0 w-7 h-7 sm:w-9 sm:h-9 corner-tr" />

        {/* Bottom-Left Filled White Corner */}
        <div className="absolute bottom-0 left-0 w-7 h-7 sm:w-9 sm:h-9 corner-bl" />

        {/* Bottom-Right Filled White Corner */}
        <div className="absolute bottom-0 right-0 w-7 h-7 sm:w-9 sm:h-9 corner-br" />
      </div>
    </main>
  );
}
