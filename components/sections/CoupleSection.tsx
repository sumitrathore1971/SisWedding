"use client";

import React from "react";
import Image from "next/image";
import { weddingData } from "@/data/wedding";

export function CoupleSection() {
  const bg = weddingData.couple.backgroundImage;

  return (
    <section
      id="couple-section"
      aria-label="Bride and Groom Section"
      className="relative w-full min-h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-neutral-100/70 border-b border-neutral-200/40"
    >
      {bg && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bg}
            alt="Couple Section Background"
            fill
            sizes="(max-width: 500px) 100vw, 500px"
            className="object-cover object-center select-none pointer-events-none"
          />
        </div>
      )}
    </section>
  );
}
