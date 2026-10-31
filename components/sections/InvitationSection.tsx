"use client";

import React from "react";
import Image from "next/image";
import { weddingData } from "@/data/wedding";

export function InvitationSection() {
  const bg = weddingData.invitation.backgroundImage;

  return (
    <section
      id="invitation-section"
      aria-label="Family Wedding Invitation Section"
      className="relative w-full min-h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-neutral-100/60 border-b border-neutral-200/40"
    >
      {/* Background illustration */}
      {bg && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bg}
            alt="Invitation Section Background"
            fill
            sizes="(max-width: 500px) 100vw, 500px"
            className="object-cover object-center select-none pointer-events-none"
          />
        </div>
      )}

      {/* Real Wedding Details Overlay in central parchment */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 py-8 sm:py-10 max-w-[440px] mx-auto w-full">
        {/* Lord Ganesha Shloka Calligraphy Style */}
        <p className="font-serif text-sm sm:text-base font-bold text-[#881337] tracking-wider mb-1">
          {weddingData.opening.auspiciousSymbol}
        </p>
        <p className="font-serif text-xs sm:text-[15px] text-[#78350f] leading-relaxed italic mb-4 whitespace-pre-line font-medium">
          {weddingData.invitation.shlokaHindi}
        </p>

        {/* Section Heading with Decorative Borders */}
        <div className="flex items-center justify-center gap-2 mb-3.5 w-44">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#9a3412]" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#701a28] tracking-wide">
            {weddingData.invitation.sectionHeading}
          </h2>
          <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#9a3412]" />
        </div>

        {/* Formal Invitation Message & Couple Lineage */}
        <div className="space-y-3 font-serif text-xs sm:text-sm text-[#451a03] leading-relaxed px-1">
          <p className="text-xs sm:text-[13px] text-[#78350f]">
            परमपिता परमेश्वर की असीम अनुकम्पा एवं पूज्य पूर्वजों के आशीर्वाद से
          </p>

          <div className="py-0.5">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#881337]">
              {weddingData.couple.bride.name}
            </p>
            <p className="text-xs sm:text-[13px] text-[#571c0c] font-medium">
              सुपुत्री {weddingData.couple.bride.parents}
            </p>
            <p className="text-[11px] sm:text-xs text-[#78350f]">
              (पौत्री {weddingData.couple.bride.grandparents})
            </p>
          </div>

          <div className="flex items-center justify-center gap-2.5 my-0.5">
            <span className="h-[1px] w-10 bg-[#b45309]/50" />
            <span className="text-sm sm:text-base text-[#9a3412] font-bold">संग</span>
            <span className="h-[1px] w-10 bg-[#b45309]/50" />
          </div>

          <div className="py-0.5">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#881337]">
              {weddingData.couple.groom.name}
            </p>
            <p className="text-xs sm:text-[13px] text-[#571c0c] font-medium">
              सुपुत्र {weddingData.couple.groom.parents}
            </p>
            <p className="text-[11px] sm:text-xs text-[#78350f]">
              (पौत्र {weddingData.couple.groom.grandparents}, टीकमगढ़ वाले)
            </p>
          </div>

          <p className="text-xs sm:text-[13px] text-[#78350f] pt-0.5">
            का शुभ विवाह समारोह संपन्न होना निश्चित हुआ है।
          </p>
        </div>

        {/* Welcoming note */}
        <div className="mt-4 pt-3 border-t border-[#b45309]/30 w-full max-w-[340px]">
          <p className="text-xs sm:text-sm text-[#701a28] font-semibold leading-relaxed">
            इस मांगलिक अवसर पर आप सपरिवार सादर आमंत्रित हैं।
          </p>
          <p className="text-xs sm:text-[13px] text-[#78350f] mt-1 font-semibold">
            ॥ दर्शनाभिलाषी: समस्त राठौर एवं साहू परिवार ॥
          </p>
        </div>
      </div>
    </section>
  );
}
