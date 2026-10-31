"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Volume2 } from "lucide-react";
import { clsx } from "clsx";

interface MusicToggleButtonProps {
  src?: string;
  className?: string;
}

export const MusicToggleButton: React.FC<MusicToggleButtonProps> = ({
  src = "/music/invitationsong.mp3",
  className,
}) => {
  const bars = 5;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userPausedRef = useRef<boolean>(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  const getRandomHeights = () => {
    return Array.from({ length: bars }, () => Math.random() * 0.75 + 0.25);
  };

  const [heights, setHeights] = useState<number[]>(Array(bars).fill(0.25));
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.75;
    audio.loop = true;

    const handlePlay = () => {
      if (!audio.muted) {
        setIsPlaying(true);
        setShowTooltip(false);
      }
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("playing", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    // Reliable playback trigger
    const tryPlay = async () => {
      if (userPausedRef.current) return;
      try {
        audio.muted = false;
        const p = audio.play();
        if (p !== undefined) {
          playPromiseRef.current = p;
          await p;
          playPromiseRef.current = null;
          setIsPlaying(true);
          setShowTooltip(false);
          removeUnlockListeners();
        }
      } catch {
        playPromiseRef.current = null;
        // Autoplay policy prevented playback.
        // Try muted autoplay so audio pipeline is primed and ready:
        try {
          audio.muted = true;
          await audio.play();
        } catch {
          // Both unmuted and muted blocked - keep unlock listeners active
        }
        setShowTooltip(true);
      }
    };

    const handleGesture = (e: Event) => {
      // If user tapped directly on the music toggle button, let handleClick handle it exclusively!
      const target = e.target as HTMLElement | null;
      if (target?.closest?.("[data-music-toggle]")) {
        return;
      }
      if (userPausedRef.current) return;

      audio.muted = false;
      tryPlay();
    };

    const removeUnlockListeners = () => {
      document.removeEventListener("pointerdown", handleGesture, true);
      document.removeEventListener("touchstart", handleGesture, true);
      document.removeEventListener("click", handleGesture, true);
      document.removeEventListener("keydown", handleGesture, true);
      window.removeEventListener("scroll", handleGesture);
      window.removeEventListener("start-wedding-music", tryPlay);
    };

    // 1. Attempt unmuted playback immediately on mount
    tryPlay();

    // 2. Add global unlock listeners in capture phase to reliably trigger on the very first touch/click
    document.addEventListener("pointerdown", handleGesture, { capture: true, passive: true });
    document.addEventListener("touchstart", handleGesture, { capture: true, passive: true });
    document.addEventListener("click", handleGesture, { capture: true, passive: true });
    document.addEventListener("keydown", handleGesture, { capture: true, passive: true });
    window.addEventListener("scroll", handleGesture, { passive: true, once: true });
    window.addEventListener("start-wedding-music", tryPlay);

    return () => {
      removeUnlockListeners();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("playing", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, [src]);

  // Waveform equalizer bar animation when playing
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setHeights(getRandomHeights());
      }, 100);
      return () => clearInterval(interval);
    }
    setHeights(Array(bars).fill(0.25));
  }, [isPlaying]);

  // Click handler on the button itself
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const audio = audioRef.current;
    if (!audio) return;

    setShowTooltip(false);

    if (!audio.paused && !audio.muted) {
      // USER REQUESTED PAUSE
      userPausedRef.current = true;
      if (playPromiseRef.current) {
        try {
          await playPromiseRef.current;
        } catch {}
      }
      audio.pause();
      setIsPlaying(false);
    } else {
      // USER REQUESTED PLAY
      userPausedRef.current = false;
      audio.muted = false;
      try {
        const p = audio.play();
        playPromiseRef.current = p;
        await p;
        playPromiseRef.current = null;
        setIsPlaying(true);
      } catch (err: unknown) {
        playPromiseRef.current = null;
        const error = err as { name?: string };
        if (error.name !== "AbortError") {
          console.warn("Audio play error:", err);
        }
      }
    }
  };

  return (
    <div className="relative inline-flex items-center">
      {/* Hidden native audio element */}
      <audio
        ref={audioRef}
        src={src}
        preload="auto"
        loop
        playsInline
      />

      {/* Gentle floating tooltip prompt if browser blocked autoplay */}
      <AnimatePresence>
        {showTooltip && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={handleClick}
            className="absolute right-13 whitespace-nowrap bg-[#701a28]/95 backdrop-blur-sm border border-amber-300/40 text-amber-200 text-[11px] font-serif py-1 px-3 rounded-full shadow-lg pointer-events-auto cursor-pointer flex items-center gap-1.5 select-none"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>संगीत चालू करें</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        data-music-toggle="true"
        onClick={handleClick}
        type="button"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={clsx(
          "inline-flex items-center justify-center w-11 h-11 rounded-full border transition-all cursor-pointer focus:outline-none select-none shadow-xl backdrop-blur-md pointer-events-auto",
          isPlaying
            ? "bg-[#701a28] border-amber-300/80 text-amber-200 shadow-[#701a28]/50 ring-2 ring-amber-400/40"
            : "bg-white/95 border-[#b45309]/60 text-[#701a28] hover:border-[#b45309] shadow-neutral-900/30 ring-1 ring-amber-500/20",
          className
        )}
        aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
        title={isPlaying ? "Pause wedding music" : "Play wedding music"}
      >
        {isPlaying ? (
          /* Animated Equalizer Waveform */
          <div className="flex h-[18px] w-[18px] items-center justify-center gap-[2.5px]">
            {heights.map((height, index) => (
              <motion.span
                key={index}
                className="w-[2.5px] rounded-full bg-amber-300"
                initial={{ height: 4 }}
                animate={{
                  height: Math.max(4, height * 18),
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 12,
                }}
              />
            ))}
          </div>
        ) : (
          /* Clear, prominent Play icon when paused */
          <Play className="w-4 h-4 text-[#701a28] fill-[#701a28] ml-0.5" />
        )}
      </motion.button>
    </div>
  );
};
