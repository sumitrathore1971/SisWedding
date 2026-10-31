"use client";

import React from "react";
import Image from "next/image";
import { weddingData } from "@/data/wedding";

export function HaldiSection() {
  const bg = weddingData.events.haldi.backgroundImage;

  return (
    <section
      id="haldi-section"
      aria-label="Haldi Ceremony Section"
      className="relative w-full min-h-[100svh] flex flex-col justify-between items-center overflow-hidden bg-neutral-100/50 border-b border-neutral-200/40"
    >
      {/* Background artwork */}
      {bg && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bg}
            alt="Haldi Section Background"
            fill
            sizes="(max-width: 500px) 100vw, 500px"
            className="object-cover object-center select-none pointer-events-none"
          />
        </div>
      )}

      {/* Styled Event Layout matching reference */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-4 max-w-[420px] mx-auto w-full">
        {/* Date Lockup */}
        <div className="flex flex-col items-center mb-2.5">
          <div className="font-serif text-3xl sm:text-4xl font-bold text-[#78350f] leading-none drop-shadow-2xs">
            23<span className="text-xs sm:text-sm font-normal align-super ml-0.5 text-[#92400e]">rd</span>
          </div>
          <p className="font-serif text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#78350f] font-bold mt-1">
            N O V E M B E R
          </p>
          <p className="font-serif text-[10px] sm:text-[11px] tracking-widest text-[#92400e] font-semibold">
            - 2 0 2 6 -
          </p>
          <p className="font-serif text-[11px] text-[#b45309] font-medium mt-0.5">
            सोमवार
          </p>
        </div>

        {/* Sub-tagline uppercase */}
        <p className="font-serif text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[#92400e] font-semibold mb-0.5">
          THE YELLOW CELEBRATION
        </p>

        {/* Main Event Title in Jim Nightshade Script */}
        <h2 className="jim-nightshade-regular text-4xl sm:text-5xl text-[#78350f] tracking-wide leading-none select-none my-1 drop-shadow-2xs">
          Haldi Ceremony
        </h2>
        <p className="font-serif text-xs text-[#92400e] font-semibold mb-2.5">
          ॥ {weddingData.events.haldi.titleHindi} ॥
        </p>

        {/* Poetic Quote in Italics */}
        <p className="font-serif text-xs sm:text-[13px] text-[#451a03] italic leading-relaxed max-w-[300px] mb-2.5 font-medium">
          “हल्दी की पवित्र सुगंध और अपनों का लाड़-प्यार, खुशियों के रंग में रंगने को तैयार”
        </p>

        {/* Time Onwards */}
        <p className="font-sans text-xs sm:text-sm font-bold tracking-wider text-[#b45309] uppercase mb-1 drop-shadow-2xs">
          4:00 PM ONWARDS
        </p>

        {/* Venue */}
        <p className="font-serif text-xs sm:text-[13px] text-[#571c0c] font-semibold">
          {weddingData.venue.venueName}, {weddingData.venue.address}
        </p>
      </div>

      {/* Spacer to keep bottom bride artwork visible */}
      <div className="relative z-10 h-20 pointer-events-none" aria-hidden="true" />
    </section>
  );
}
