"use client";

import React, { useEffect, useRef, useState, type RefObject } from "react";
import {
  cubicBezier,
  motion,
  useMotionValue,
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

const SECTION_HEIGHT = "1100vh";

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
] as const;

const TOTAL_CEREMONIES = CEREMONIES.length; // 5 ceremonies total
const TOTAL_LABEL = String(TOTAL_CEREMONIES).padStart(2, "0");

const WIPE_SEQUENCE = CEREMONIES.slice(1).map((ceremony, index) => {
  const segment = 1 / (TOTAL_CEREMONIES - 1);
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

function findScrollContext(element: HTMLElement): {
  scroller: HTMLElement | null;
  clipper: HTMLElement | null;
} {
  let ancestor = element.parentElement;
  let clipper: HTMLElement | null = null;

  while (ancestor) {
    const { overflowY } = window.getComputedStyle(ancestor);

    if (overflowY !== "visible") {
      if (!clipper) clipper = ancestor;

      if (
        (overflowY === "auto" || overflowY === "scroll") &&
        ancestor.scrollHeight > ancestor.clientHeight
      ) {
        return { scroller: ancestor, clipper: clipper ?? ancestor };
      }
    }

    ancestor = ancestor.parentElement;
  }

  return { scroller: null, clipper };
}

function useElementScrollProgress(targetRef: RefObject<HTMLElement | null>): {
  progress: MotionValue<number>;
  viewportHeight: number | null;
} {
  const progress = useMotionValue(0);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const { scroller: scrollContainer, clipper } = findScrollContext(target);
    let animationFrame: number | null = null;

    const updateProgress = () => {
      animationFrame = null;

      const rect = target.getBoundingClientRect();
      const containerTop = scrollContainer
        ? scrollContainer.getBoundingClientRect().top
        : 0;
      const availableHeight = scrollContainer
        ? scrollContainer.clientHeight
        : window.innerHeight;
      const nextViewportHeight =
        clipper && clipper !== scrollContainer
          ? Math.min(availableHeight, clipper.clientHeight)
          : availableHeight;
      const cropped =
        !!clipper &&
        clipper !== scrollContainer &&
        clipper.clientHeight < rect.height;
      const scrollDistance = Math.max(rect.height - nextViewportHeight, 1);
      const nextProgress = cropped
        ? 0
        : Math.min(Math.max((containerTop - rect.top) / scrollDistance, 0), 1);

      setViewportHeight(nextViewportHeight);
      progress.set(nextProgress);
    };

    const requestUpdate = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    scrollContainer?.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    const observer = new ResizeObserver(requestUpdate);
    observer.observe(scrollContainer ?? clipper ?? document.documentElement);
    if (clipper && clipper !== scrollContainer) observer.observe(clipper);

    return () => {
      scrollContainer?.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      observer.disconnect();

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [progress, targetRef]);

  return { progress, viewportHeight };
}

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
 * Uses exact midpoint threshold mapping ((from + to) / 2) from reference snippet.
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
  const { progress: scrollYProgress, viewportHeight } =
    useElementScrollProgress(wrapperRef);

  // 100vh until measured, so the server and first client render match.
  const panelHeight = viewportHeight ? `${viewportHeight}px` : "100vh";

  const cueOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);

  return (
    <section
      ref={wrapperRef}
      id="ceremonies-gallery"
      aria-label="Wedding Ceremonies Wipe Flow"
      className="relative w-full"
      style={{ height: SECTION_HEIGHT }}
    >
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: panelHeight }}
      >
        {/* Base Layer: Invitation Section (Index 0) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 isolate">
          <InvitationSection />
        </div>

        {/* Subsequent Wipe Layers: Haldi, Mehendi, Sangeet, Wedding */}
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
