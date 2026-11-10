"use client";

import React from "react";
import Image from "next/image";
import { weddingData } from "@/data/wedding";

export function ClosingSection() {
  const bg =
    weddingData.closing.backgroundImage ||
    weddingData.venue.backgroundImage ||
    "/images/gfhrz16okjy6if3nyjlr.avif";

  return (
    <section
      id="closing-section"
      aria-label="Venue and Closing Section"
      className="relative w-full min-h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-neutral-100/50"
    >
      {/* Background artwork */}
      {bg && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bg}
            alt="Venue and Closing Section Background"
            fill
            sizes="(max-width: 500px) 100vw, 500px"
            className="object-cover object-center select-none pointer-events-none"
          />
        </div>
      )}

      {/* Styled Event Layout matching reference */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-10 max-w-[420px] mx-auto w-full">
        {/* Date Lockup */}
        <div className="flex flex-col items-center mb-2">
          <div className="font-serif text-3xl sm:text-4xl font-bold text-[#701a28] leading-none drop-shadow-2xs">
            26
            <span className="text-xs sm:text-sm font-normal align-super ml-0.5 text-[#881337]">
              th
            </span>
          </div>
          <p className="font-serif text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#701a28] font-bold mt-1">
            N O V E M B E R
          </p>
          <p className="font-serif text-[10px] sm:text-[11px] tracking-widest text-[#881337] font-semibold">
            - 2 0 2 6 -
          </p>
          <p className="font-serif text-[11px] text-[#9a3412] font-medium mt-0.5">
            गुरुवार
          </p>
        </div>

        {/* Sub-tagline uppercase */}
        <p className="font-serif text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[#9a3412] font-semibold mb-0.5">
          CORDIAL INVITATION & GRATITUDE
        </p>

        {/* Main Title in Jim Nightshade Script */}
        <h2 className="jim-nightshade-regular text-4xl sm:text-5xl text-[#701a28] tracking-wide leading-none select-none my-1 drop-shadow-2xs">
          Venue & Farewell
        </h2>

        <div className="flex flex-col items-center mb-5 ">
          <p className="font-serif text-xs sm:text-[15px] font-bold text-[#701a28] tracking-wider mb-0.5">
            ॥ विदाई समारोह ॥
          </p>
          <p className="font-sans text-sm sm:text-sm font-bold tracking-wider text-[#9a3412] uppercase drop-shadow-2xs">
            सुबह ०७:०० बजे
          </p>
        </div>
        {/* Gratitude & Contacts */}
        <div className="w-full max-w-[320px] px-1">
          <p className="font-serif text-[11px] text-[#451a03] italic leading-tight mb-2 font-medium">
            “{weddingData.closing.messageHindi}”
          </p>

          <div className="border-t border-[#b45309]/30 pt-1.5 mb-2">
            <p className="mt-5 text-[10px] font-bold text-[#78350f] mb-0.5">
              ॥ स्वागताकांक्षी एवं दर्शनाभिलाषी ॥
            </p>
            <div className="flex flex-col items-center justify-center gap-y-0.5 text-[10px] text-[#701a28] font-medium">
              {weddingData.closing.contacts.map((c, i) => (
                <span key={i}>{c.name}</span>
              ))}
            </div>
            <p className="text-[10px] text-[#78350f] mt-0.5 font-semibold">
              समस्त राठौर एवं साहू परिवार
            </p>
          </div>

          {/* Venue Details (Card-free elegant typography) */}
          <div className="flex mt-5 flex-col items-center text-center pt-1.5 mb-2 border-t border-[#b45309]/30">
            <p className="font-serif mt-5 text-xs sm:text-[13px] font-bold text-[#701a28] tracking-wider mb-0.5">
              ॥ विवाह स्थल ॥
            </p>
            <p className="font-serif text-xs sm:text-sm font-semibold text-[#571c0c]">
              {weddingData.venue.venueName}
            </p>
            <p className="font-sans text-[10px] sm:text-[11px] text-[#78350f] leading-tight mt-0.5">
              {weddingData.venue.address}
            </p>
            <a
              href={weddingData.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 mt-2 rounded-full bg-gradient-to-r from-[#701a28] via-[#851631] to-[#701a28] text-amber-100 border border-amber-300/40 shadow-sm shadow-[#701a28]/25 text-xs font-serif font-semibold tracking-wide hover:brightness-110 active:scale-95 transition-all"
            >
              <svg
                className="w-3.5 h-3.5 text-amber-300 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{weddingData.venue.mapButtonText}</span>
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-10 inline-flex items-center gap-1 text-[10px] text-[#78350f] hover:text-[#701a28] underline underline-offset-4 font-semibold transition-colors cursor-pointer"
          >
            <span>{weddingData.closing.scrollToTopButtonText}</span>
            <span className="text-[10px]">↑</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export { ClosingSection as VenueClosingSection };
