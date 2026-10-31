"use client";

import React, { useRef, useState } from "react";
import {
  cubicBezier,
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ChevronDown } from "lucide-react";
import { InvitationSection } from "./InvitationSection";
import { HaldiSection } from "./HaldiSection";
import { MehendiSection } from "./MehendiSection";
import { SangeetSection } from "./SangeetSection";
import { WeddingSection } from "./WeddingSection";
import { ClosingSection } from "./ClosingSection";

// Balanced mobile scroll runway for 6 full ceremony stages (~110vh per stage)
const SECTION_HEIGHT = "650vh";

// Keep % on every value: mixing 0 with 0% breaks the tween and the clip silently drops.
const HIDDEN_CLIP = {
  down: "inset(0% 0% 100% 0%)",
  right: "inset(0% 100% 0% 0%)",
  up: "inset(100% 0% 0% 0%)",
  left: "inset(0% 0% 0% 100%)",
} as const;

const REVEALED_CLIP = "inset(0% 0% 0% 0%)";

const DIRECTIONS = ["down", "right", "up", "left"] as const;

type Direction = (typeof DIRECTIONS)[number];

const CEREMONIES = [
  { id: "invitation", title: "निमंत्रण पत्र", Component: InvitationSection },
  { id: "haldi", title: "हल्दी समारोह", Component: HaldiSection },
  { id: "mehendi", title: "मेहंदी उत्सव", Component: MehendiSection },
  { id: "sangeet", title: "संगीत संध्या", Component: SangeetSection },
  { id: "wedding", title: "शुभ विवाह", Component: WeddingSection },
  { id: "closing", title: "विवाह स्थल एवं सधन्यवाद", Component: ClosingSection },
] as const;

const TOTAL_CEREMONIES = CEREMONIES.length; // 6 stages total
const TOTAL_LABEL = String(TOTAL_CEREMONIES).padStart(2, "0");

// Evenly paced mobile wipe sequence with reading pause across all 6 stages
const WIPE_SEQUENCE = CEREMONIES.slice(1).map((ceremony, index) => {
  const segment = 1 / (TOTAL_CEREMONIES - 1); // 0.20
  const segmentStart = index * segment;
  const from = segmentStart + segment * 0.18;
  const to = segmentStart + segment * 0.72;

  return {
    ...ceremony,
    direction: DIRECTIONS[index % DIRECTIONS.length] as Direction,
    from,
    to,
    settled: to + (to - from) * 0.45,
  };
});

function useWipeClip(
  progress: MotionValue<number>,
  from: number,
  to: number,
  hidden: string,
  reduceMotion: boolean
): MotionValue<string> {
  const wipe = useTransform(progress, [from, to], [hidden, REVEALED_CLIP]);
  const snap = useTransform(progress, (value) =>
    value < (from + to) / 2 ? hidden : REVEALED_CLIP
  );

  return reduceMotion ? snap : wipe;
}

type WipeStep = (typeof WIPE_SEQUENCE)[number];

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
      className="absolute inset-0 w-full h-full overflow-hidden isolate max-w-[480px] mx-auto"
      style={{ clipPath, willChange: "clip-path", zIndex }}
    >
      <Component />
    </motion.div>
  );
}

/**
 * Top-Centered Ceremony Tracker Badge
 * Uses exact midpoint threshold mapping ((from + to) / 2) to update seamlessly at each 50% transition.
 */
function CeremonyTracker({ progress }: { progress: MotionValue<number> }) {
  const [passedIndex, setPassedIndex] = useState(0);

  useMotionValueEvent(progress, "change", (value) => {
    const passed = WIPE_SEQUENCE.filter(
      (step) => value >= (step.from + step.to) / 2
    ).length;
    setPassedIndex(passed);
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center select-none"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#500724]/90 backdrop-blur-md border border-amber-300/60 text-amber-100 shadow-md">
        <span className="font-serif text-xs font-bold text-amber-300 tracking-wide">
          {CEREMONIES[passedIndex].title}
        </span>
        <span className="text-amber-400/40 text-[10px]">•</span>
        <span className="font-mono text-[11px] font-bold text-amber-100 tracking-wider">
          {String(passedIndex + 1).padStart(2, "0")} / {TOTAL_LABEL}
        </span>
      </div>
    </div>
  );
}

export function CeremoniesWipeGallery() {
  const wrapperRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Native hardware-accelerated scroll tracking for mobile touch & window scroll
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
      className="relative w-full max-w-[480px] mx-auto"
      style={{ height: SECTION_HEIGHT }}
    >
      {/* Mobile-sized sticky viewport container */}
      <div className="sticky top-0 w-full max-w-[480px] mx-auto h-[100svh] overflow-hidden">
        {/* Base Layer: Invitation Section (Index 0) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 isolate max-w-[480px] mx-auto">
          <InvitationSection />
        </div>

        {/* Subsequent Wipe Layers: Haldi, Mehendi, Sangeet, Wedding, Closing */}
        {WIPE_SEQUENCE.map((step, idx) => (
          <WipeLayer
            key={step.id}
            step={step}
            progress={scrollYProgress}
            reduceMotion={shouldReduceMotion}
            zIndex={idx + 10}
          />
        ))}

        {/* Top-Centered Real-Time Ceremony Tracker Badge */}
        <CeremonyTracker progress={scrollYProgress} />

        {/* Initial Scroll Prompt Cue */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-4 z-30 flex flex-col items-center gap-1"
          style={{ opacity: cueOpacity }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#701a28]/70">
            Scroll
          </span>
          <motion.span
            className="flex text-[#701a28]/70"
            animate={shouldReduceMotion ? undefined : { y: [0, 5, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <ChevronDown size={16} />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}

export { CeremoniesWipeGallery as CeremonyWipeGallery };
