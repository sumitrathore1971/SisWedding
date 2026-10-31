"use client";

import React, { useRef, useState } from "react";
import {
  cubicBezier,
  motion,
  useScroll,
  useReducedMotion,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { InvitationSection } from "./InvitationSection";
import { HaldiSection } from "./HaldiSection";
import { MehendiSection } from "./MehendiSection";
import { SangeetSection } from "./SangeetSection";
import { WeddingSection } from "./WeddingSection";

// Keep % on every value: mixing 0 with 0% breaks CSS interpolation
const HIDDEN_CLIP = {
  down: "inset(0% 0% 100% 0%)",
  right: "inset(0% 100% 0% 0%)",
  up: "inset(100% 0% 0% 0%)",
  left: "inset(0% 0% 0% 100%)",
} as const;

const REVEALED_CLIP = "inset(0% 0% 0% 0%)";

const ENTER_EASE = cubicBezier(0.16, 1, 0.3, 1);

const TOTAL_LABEL = "05";

const CEREMONIES = [
  "निमंत्रण पत्र",
  "हल्दी समारोह",
  "मेहंदी उत्सव",
  "संगीत संध्या",
  "शुभ विवाह",
];

// Clean 4-step sequence: evenly paced, zero dead space after Wedding
const WIPE_STEPS = [
  {
    id: "haldi",
    direction: "down" as const,
    from: 0.02,
    to: 0.25,
    Component: HaldiSection,
  },
  {
    id: "mehendi",
    direction: "right" as const,
    from: 0.27,
    to: 0.50,
    Component: MehendiSection,
  },
  {
    id: "sangeet",
    direction: "up" as const,
    from: 0.52,
    to: 0.75,
    Component: SangeetSection,
  },
  {
    id: "wedding",
    direction: "left" as const,
    from: 0.77,
    to: 1.00,
    Component: WeddingSection,
  },
];

function useWipeClip(
  progress: MotionValue<number>,
  from: number,
  to: number,
  hidden: string,
  reduceMotion: boolean
): MotionValue<string> {
  const wipe = useTransform(progress, [from, to], [hidden, REVEALED_CLIP], {
    ease: ENTER_EASE,
  });
  const snap = useTransform(progress, (value) =>
    value < (from + to) / 2 ? hidden : REVEALED_CLIP
  );

  return reduceMotion ? snap : wipe;
}

type WipeStep = (typeof WIPE_STEPS)[number];

function WipeLayer({
  step,
  progress,
  reduceMotion,
  zIndex,
}: {
  step: WipeStep;
  progress: MotionValue<number>;
  reduceMotion: boolean;
  zIndex: number;
}) {
  const clipPath = useWipeClip(
    progress,
    step.from,
    step.to,
    HIDDEN_CLIP[step.direction],
    reduceMotion
  );

  const { Component } = step;

  return (
    <motion.div
      data-layer={step.id}
      className="absolute inset-0 w-full h-full overflow-hidden isolate"
      style={{ clipPath, willChange: "clip-path", zIndex }}
    >
      <Component />
    </motion.div>
  );
}

/**
 * Top-Centered Ceremony Tracker Badge
 * Centered horizontally so it never collides with the corner decorative wedges.
 * Uses reactive threshold mapping for instantaneous 01/05 updates.
 */
function CeremonyTracker({ progress }: { progress: MotionValue<number> }) {
  const [index, setIndex] = useState(0);

  useMotionValueEvent(progress, "change", (latest) => {
    let next = 0;
    if (latest >= 0.885) {
      next = 4; // 05: शुभ विवाह (50% midpoint of 0.77 - 1.00)
    } else if (latest >= 0.635) {
      next = 3; // 04: संगीत संध्या (50% midpoint of 0.52 - 0.75)
    } else if (latest >= 0.385) {
      next = 2; // 03: मेहंदी उत्सव (50% midpoint of 0.27 - 0.50)
    } else if (latest >= 0.135) {
      next = 1; // 02: हल्दी समारोह (50% midpoint of 0.02 - 0.25)
    } else {
      next = 0; // 01: निमंत्रण पत्र
    }

    setIndex((prev) => (prev !== next ? next : prev));
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center select-none"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#500724]/90 backdrop-blur-md border border-amber-300/60 text-amber-100 shadow-md">
        <span className="font-serif text-xs font-bold text-amber-300 tracking-wide">
          {CEREMONIES[index]}
        </span>
        <span className="text-amber-400/40 text-[10px]">•</span>
        <span className="font-mono text-[11px] font-bold text-amber-100 tracking-wider">
          {String(index + 1).padStart(2, "0")} / {TOTAL_LABEL}
        </span>
      </div>
    </div>
  );
}

export function CeremoniesWipeGallery() {
  const wrapperRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Track window scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const cueOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);

  return (
    <section
      ref={wrapperRef}
      id="ceremonies-gallery"
      aria-label="Wedding Ceremonies Wipe Flow"
      className="relative w-full"
      style={{ height: "320vh" }}
    >
      {/* 
        Sticky Viewport: Locks to the top of screen while wrapperRef scrolls through 320vh.
        Uses top-0 h-[100svh] so mobile address bar changes never cause layout jumps.
      */}
      <div className="sticky top-0 w-full h-[100svh] overflow-hidden">
        {/* Base Layer: Invitation Section (Index 0) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 isolate">
          <InvitationSection />
        </div>

        {/* Subsequent Wipe Layers: Haldi, Mehendi, Sangeet, Wedding */}
        {WIPE_STEPS.map((step, idx) => (
          <WipeLayer
            key={step.id}
            step={step}
            progress={scrollYProgress}
            reduceMotion={shouldReduceMotion}
            zIndex={idx + 10}
          />
        ))}

        {/* Top-Centered Real-Time Ceremony Tracker Badge */}
        {/* <CeremonyTracker progress={scrollYProgress} /> */}

        {/* Initial Scroll Prompt Cue */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-4 z-30 flex flex-col items-center gap-1"
          style={{ opacity: cueOpacity }}
        >

        </motion.div>
      </div>
    </section>
  );
}

export { CeremoniesWipeGallery as CeremonyWipeGallery };
