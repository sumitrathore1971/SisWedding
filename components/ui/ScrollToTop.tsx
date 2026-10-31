"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { scrollToTop } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface ScrollToTopProps {
  label?: string;
  className?: string;
  showIcon?: boolean;
}

export function ScrollToTop({
  label = "शीर्ष पर वापस जाएं",
  className,
  showIcon = true,
}: ScrollToTopProps) {
  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-800 shadow-sm transition-all hover:bg-neutral-50 hover:border-neutral-400 active:scale-95 focus:outline-none focus:ring-2 focus:ring-neutral-400/50 cursor-pointer",
        className
      )}
    >
      {showIcon && (
        <ArrowUp className="w-4 h-4 text-neutral-500 transition-transform group-hover:-translate-y-0.5" />
      )}
      <span>{label}</span>
    </button>
  );
}
