import React from "react";
import { cn } from "@/lib/utils";

export interface SectionContainerProps {
  id?: string;
  ariaLabel?: string;
  className?: string;
  innerClassName?: string;
  minHeightClass?: string;
  children: React.ReactNode;
}

export function SectionContainer({
  id,
  ariaLabel,
  className,
  innerClassName,
  minHeightClass = "min-h-[100svh]",
  children,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "relative w-full flex flex-col justify-center items-center overflow-hidden border-b border-neutral-200/60 bg-white",
        minHeightClass,
        className
      )}
    >
      {/* 
        Centralized mobile-first container:
        Optimized for 320px - 430px mobile screens, nicely centered on tablets & desktops.
      */}
      <div
        className={cn(
          "w-full max-w-[430px] mx-auto px-5 py-12 flex flex-col items-center justify-center relative z-10",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
