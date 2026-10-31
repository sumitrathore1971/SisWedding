"use client";

import React from "react";
import Image from "next/image";
import { weddingData } from "@/data/wedding";

export function OpeningSection() {
  const bg = weddingData.opening.backgroundImage || "/images/homebg.png";
  const celebrationTitle =
    weddingData.opening.celebrationTitleEnglish || "WEDDING CELEBRATION OF";
  const brideName =
    weddingData.opening.brideNameEnglish || "Poonam Rathore";
  const groomName =
    weddingData.opening.groomNameEnglish || "Avtarit Sahu";

  return (
    <section
      id="opening-section"
      aria-label="Opening Wedding Invitation Scene"
      className="relative w-full min-h-[100svh] flex flex-col justify-between items-center overflow-hidden bg-neutral-100"
    >
      {/* Background artwork */}
      {bg && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bg}
            alt="Opening Background"
            fill
            priority
            sizes="(max-width: 500px) 100vw, 500px"
            className="object-cover object-bottom select-none pointer-events-none"
          />
        </div>
      )}

      {/* English Wedding Title & Names big and centered */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-16 pb-6 max-w-[420px] mx-auto w-full flex-1">
        {/* Auspicious symbol */}
        <span className="font-serif text-xs sm:text-sm tracking-widest text-[#881337] font-semibold mb-2 drop-shadow-2xs">
          {weddingData.opening.auspiciousSymbol}
        </span>

        {/* Top Header: WEDDING CELEBRATION OF */}
        <p className="font-serif text-xs sm:text-sm tracking-[0.25em] text-[#9a3412] uppercase font-semibold mb-4 drop-shadow-2xs">
          {celebrationTitle}
        </p>

        {/* Bride Name in Jim Nightshade */}
        <h1 className="jim-nightshade-regular text-4xl sm:text-5xl text-[#701a28] tracking-wide leading-tight drop-shadow-2xs select-none">
          {brideName}
        </h1>

        {/* Golden Ornamental Ampersand */}
        <div className="flex items-center justify-center gap-2.5 my-1 w-28">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#b45309]" />
          <span className="jim-nightshade-regular text-2xl sm:text-3xl text-[#b45309] font-normal select-none">
            &
          </span>
          <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#b45309]" />
        </div>

        {/* Groom Name in Jim Nightshade */}
        <h2 className="jim-nightshade-regular text-4xl sm:text-5xl text-[#701a28] tracking-wide leading-tight drop-shadow-2xs select-none">
          {groomName}
        </h2>
      </div>

      {/* Spacer to keep bottom bride and groom artwork in full view */}
      <div className="relative z-10 h-32 pointer-events-none" aria-hidden="true" />
    </section>
  );
}
