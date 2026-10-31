"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Volume2 } from "lucide-react";

export const SplashScreen: React.FC = () => {
  const [isSplitting, setIsSplitting] = useState(false);
  const [isExited, setIsExited] = useState(false);
  const splitTimerRef = useRef<NodeJS.Timeout | null>(null);
  const exitTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startSplit = () => {
    if (isSplitting || isExited) return;
    setIsSplitting(true);

    // Dispatch event to unlock & start music
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("start-wedding-music"));
    }

    if (splitTimerRef.current) clearTimeout(splitTimerRef.current);
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);

    exitTimerRef.current = setTimeout(() => {
      setIsExited(true);
      document.body.style.overflow = "";
    }, 950);
  };

  useEffect(() => {
    // Lock scroll during splash screen
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Show splash for 1.8s, then start center split automatically
    splitTimerRef.current = setTimeout(() => {
      setIsSplitting(true);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("start-wedding-music"));
      }
    }, 1800);

    // After split completes (~950ms), unmount splash and restore scroll
    exitTimerRef.current = setTimeout(() => {
      setIsExited(true);
      document.body.style.overflow = originalOverflow || "";
    }, 2800);

    return () => {
      if (splitTimerRef.current) clearTimeout(splitTimerRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      document.body.style.overflow = originalOverflow || "";
    };
  }, []);

  if (isExited) return null;

  const renderArtwork = () => (
    <div className="relative flex flex-col items-center justify-center select-none pointer-events-none px-4">
      {/*
        Constrained strictly to mobile view canvas (max-w-[480px])
      */}
      <div
        className="relative w-[210px] sm:w-[250px] max-w-[75vw] aspect-[10/9] flex items-center justify-center"
        style={{
          maskImage: "radial-gradient(ellipse 90% 85% at 50% 50%, black 65%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 85% at 50% 50%, black 65%, transparent 100%)",
        }}
      >
        <img
          src="/images/splash.png"
          alt="॥ श्री गणेशाय नमः ॥"
          className="w-full h-full object-contain pointer-events-none select-none drop-shadow-xl"
          draggable={false}
        />
      </div>

      {/* Sacred auspicious invocation */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
        className="mt-4 font-serif text-base sm:text-lg tracking-[0.25em] text-[#fcd34d] font-bold text-center select-none drop-shadow-md"
      >
        ॥ श्री गणेशाय नमः ॥
      </motion.p>
    </div>
  );

  return (
    <div
      className={`fixed inset-0 sm:left-1/2 sm:-translate-x-1/2 sm:w-[480px] sm:max-w-[480px] z-[999999] select-none overflow-hidden ${
        isSplitting ? "bg-transparent pointer-events-none" : "bg-[#2b060d] pointer-events-auto"
      }`}
      role="banner"
    >
      {/* On starting: ONE unified screen with 0 partition line and seamless royal background */}
      {!isSplitting ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full bg-[#2b060d] flex items-center justify-center"
        >
          {renderArtwork()}
        </motion.div>
      ) : (
        /* When splitting triggers: Two halves part cleanly from the center */
        <>
          {/* LEFT DOOR */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1], // Cinematic smooth ease
            }}
            className="absolute top-0 left-0 w-1/2 h-full overflow-hidden bg-[#2b060d] will-change-transform"
          >
            <div className="absolute top-0 left-0 w-[200%] h-full flex items-center justify-center">
              {renderArtwork()}
            </div>
          </motion.div>

          {/* RIGHT DOOR */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1], // Cinematic smooth ease
            }}
            className="absolute top-0 right-0 w-1/2 h-full overflow-hidden bg-[#2b060d] will-change-transform"
          >
            <div className="absolute top-0 right-0 w-[200%] h-full flex items-center justify-center">
              {renderArtwork()}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};
