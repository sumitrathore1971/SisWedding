"use client";

import React from "react";
import Image from "next/image";
import { weddingData } from "@/data/wedding";

export function MehendiSection() {
  const bg = weddingData.events.mehendi.backgroundImage;

  return (
    <section
      id="mehendi-section"
      aria-label="Mehendi Ceremony Section"
      className="relative w-full min-h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-neutral-100/50 border-b border-neutral-200/40"
    >
      {/* Background artwork */}
      {bg && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bg}
            alt="Mehendi Section Background"
            fill
            sizes="(max-width: 500px) 100vw, 500px"
            className="object-cover object-center select-none pointer-events-none"
          />
        </div>
      )}

      {/* Styled Event Layout matching reference */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-8 max-w-[420px] mx-auto w-full">
        {/* Date Lockup */}
        <div className="flex flex-col items-center mb-2.5">
          <div className="font-serif text-3xl sm:text-4xl font-bold text-[#831843] leading-none drop-shadow-2xs">
            23<span className="text-xs sm:text-sm font-normal align-super ml-0.5 text-[#065f46]">rd</span>
          </div>
          <p className="font-serif text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#831843] font-bold mt-1">
            N O V E M B E R
          </p>
          <p className="font-serif text-[10px] sm:text-[11px] tracking-widest text-[#065f46] font-semibold">
            - 2 0 2 6 -
          </p>
          <p className="font-serif text-[11px] text-[#065f46] font-medium mt-0.5">
            सोमवार
          </p>
        </div>

        {/* Sub-tagline uppercase */}
        <p className="font-serif text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[#065f46] font-semibold mb-0.5">
          HUES OF HENNA & CELEBRATION
        </p>

        {/* Main Event Title in Jim Nightshade Script */}
        <h2 className="jim-nightshade-regular text-4xl sm:text-5xl text-[#831843] tracking-wide leading-none select-none my-1 drop-shadow-2xs">
          Mehendi Night
        </h2>
        <p className="font-serif text-xs text-[#065f46] font-semibold mb-2.5">
          ॥ {weddingData.events.mehendi.titleHindi} ॥
        </p>

        {/* Poetic Quote in Italics */}
        <p className="font-serif text-xs sm:text-[13px] text-[#500724] italic leading-relaxed max-w-[300px] mb-2.5 font-medium">
          “हाथों में सजेगी सखियों के संग सुहाग की मेहंदी, गीतों की मधुर झंकार और सतरंगी शाम”
        </p>

        {/* Time Onwards */}
        <p className="font-sans text-xs sm:text-sm font-bold tracking-wider text-[#065f46] uppercase mb-1 drop-shadow-2xs">
          4:00 PM ONWARDS
        </p>

        {/* Venue */}
        <p className="font-serif text-xs sm:text-[13px] text-[#831843] font-semibold">
          {weddingData.venue.venueName}, {weddingData.venue.address}
        </p>
      </div>
    </section>
  );
}
