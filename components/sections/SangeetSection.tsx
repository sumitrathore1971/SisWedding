"use client";

import React from "react";
import Image from "next/image";
import { weddingData } from "@/data/wedding";

export function SangeetSection() {
  const bg = weddingData.events.sangeet.backgroundImage;

  return (
    <section
      id="sangeet-section"
      aria-label="Sangeet Ceremony Section"
      className="relative w-full min-h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-neutral-100/50 border-b border-neutral-200/40"
    >
      {/* Background artwork */}
      {bg && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bg}
            alt="Sangeet Section Background"
            fill
            sizes="(max-width: 500px) 100vw, 500px"
            className="object-cover object-center select-none pointer-events-none"
          />
        </div>
      )}

      {/* Styled Event Layout matching reference */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-12 max-w-[360px] mx-auto w-full">
        {/* Date Lockup */}
        <div className="flex flex-col items-center mb-2">
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#581c87] leading-none drop-shadow-2xs">
            24<span className="text-[10px] sm:text-[11px] font-normal align-super ml-0.5 text-[#78350f]">th</span>
          </div>
          <p className="font-serif text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#581c87] font-bold mt-1">
            N O V E M B E R
          </p>
          <p className="font-serif text-[9px] sm:text-[10px] tracking-widest text-[#78350f] font-semibold">
            - 2 0 2 6 -
          </p>
          <p className="font-serif text-[10px] sm:text-[11px] text-[#78350f] font-medium mt-0.5">
            मंगलवार
          </p>
        </div>

        {/* Sub-tagline uppercase */}
        <p className="font-serif text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#78350f] font-semibold mb-0.5">
          DANCE THE NIGHT AWAY
        </p>

        {/* Main Event Title in Jim Nightshade Script */}
        <h2 className="jim-nightshade-regular text-3xl sm:text-4xl text-[#581c87] tracking-wide leading-none select-none my-1 drop-shadow-2xs">
          Sangeet Night
        </h2>
        <p className="font-serif text-[11px] text-[#78350f] font-semibold mb-2">
          ॥ {weddingData.events.sangeet.titleHindi} ॥
        </p>

        {/* Poetic Quote in Italics */}
        <p className="font-serif text-[11px] sm:text-xs text-[#3b0764] italic leading-relaxed max-w-[270px] mb-2 font-medium">
          “सुरों में झूमते परिवार, ढोल की थाप और यादगार पारिवारिक प्रस्तुतियां”
        </p>

        {/* Time Onwards */}
        <p className="font-sans text-[11px] sm:text-xs font-bold tracking-wider text-[#b45309] uppercase mb-1 drop-shadow-2xs">
          7:00 PM ONWARDS
        </p>

        {/* Venue */}
        <p className="font-serif text-[11px] sm:text-xs text-[#581c87] font-semibold">
          {weddingData.events.sangeet.venueHindi}
        </p>
      </div>
    </section>
  );
}
