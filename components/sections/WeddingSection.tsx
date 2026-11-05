"use client";

import React from "react";
import Image from "next/image";
import { weddingData } from "@/data/wedding";

export function WeddingSection() {
  const bg =
    weddingData.events.wedding.backgroundImage ||
    weddingData.events.reception.backgroundImage ||
    "/images/reception.jpg";

  return (
    <section
      id="wedding-section"
      aria-label="Wedding and Reception Ceremony Section"
      className="relative w-full min-h-[100svh] flex flex-col justify-between items-center overflow-hidden bg-neutral-100/50 border-b border-neutral-200/40"
    >
      {/* Background artwork */}
      {bg && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bg}
            alt="Wedding and Reception Background"
            fill
            sizes="(max-width: 500px) 100vw, 500px"
            className="object-cover object-center select-none pointer-events-none"
          />
        </div>
      )}

      {/* Styled Event Layout matching reference */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-12 pb-4 max-w-[420px] mx-auto w-full">
        {/* Date Lockup */}
        <div className="flex flex-col items-center mb-2 mt-10">
          <div className="font-serif text-3xl sm:text-4xl font-bold text-[#701a28] leading-none drop-shadow-2xs">
            25<span className="text-xs sm:text-sm font-normal align-super ml-0.5 text-[#881337]">th</span>
          </div>
          <p className="font-serif text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#701a28] font-bold mt-1">
            N O V E M B E R
          </p>
          <p className="font-serif text-[10px] sm:text-[11px] tracking-widest text-[#881337] font-semibold">
            - 2 0 2 6 -
          </p>
          <p className="font-serif text-[11px] text-[#9a3412] font-medium mt-0.5">
            बुधवार
          </p>
        </div>

        {/* Sub-tagline uppercase */}
        <p className="font-serif text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[#9a3412] font-semibold mb-0.5">
          ॥ शुभ विवाह एवं आशीर्वाद समारोह ॥
        </p>

        {/* Main Event Title in Jim Nightshade Script */}
        <h2 className="jim-nightshade-regular  mt-3 text-4xl sm:text-4.5xl text-[#701a28] tracking-wide leading-none select-none my-1 drop-shadow-2xs">
          Wedding & Reception
        </h2>

        {/* Tilak Ceremony & Time - Pure Typography (Not in a card) */}
        <div className="flex flex-col items-center mb-2 mt-5">
          <p className="font-serif text-xs sm:text-[15px] font-bold text-[#701a28] tracking-wider mb-0.5">
            ॥ तिलक समारोह ॥
          </p>
          <p className="font-sans text-sm sm:text-sm font-bold tracking-wider text-[#9a3412] uppercase drop-shadow-2xs">
            दोपहर ०२:०० बजे से
          </p>
        </div>

        <div className="flex flex-col items-center mb-10 mt-5">
          <p className="font-serif text-sm sm:text-[15px] font-bold text-[#701a28] tracking-wider mb-0.5">
            ॥ बारात आगमन एवं स्वागत ॥
          </p>
          <p className="font-serif text-sm sm:text-[15px] font-bold text-[#701a28] tracking-wider mb-0.5">
           ॥ आशीर्वाद एवं स्वरुचिभोज ॥
          </p>
          <p className="font-sans text-xs sm:text-sm font-bold tracking-wider text-[#9a3412] uppercase drop-shadow-2xs">
            सायं ०७:०० बजे से
          </p>
        </div>

        {/* Venue at bottom */}
        <p className="font-serif text-xs sm:text-[13px] text-[#571c0c] font-semibold mt-1">
          {weddingData.venue.venueName}, {weddingData.venue.address}
        </p>
      </div>

      {/* Spacer to keep bottom bride and groom artwork in full view */}
      <div className="relative z-10 h-32 pointer-events-none" aria-hidden="true" />
    </section>
  );
}

export { WeddingSection as WeddingReceptionSection };
