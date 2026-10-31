"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
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

  const getRandomHeights = () => {
    return Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2);
  };

  const [heights, setHeights] = useState<number[]>(Array(bars).fill(0.25));
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const audio = new Audio();
    audio.src = src;
    audio.loop = true;
    audio.volume = 0.75;
    audio.preload = "auto";
    audioRef.current = audio;

    try {
      audio.load();
    } catch {}

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    // Reliable playback trigger
    const tryPlay = () => {
      if (userPausedRef.current) return;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            removeUnlockListeners();
          })
          .catch(() => {
            // Autoplay policy prevented playback. Keep listeners active until user interacts!
          });
      }
    };

    const handleGesture = () => {
      tryPlay();
    };

    const removeUnlockListeners = () => {
      document.removeEventListener("pointerdown", handleGesture);
      document.removeEventListener("touchstart", handleGesture);
      document.removeEventListener("click", handleGesture);
      document.removeEventListener("keydown", handleGesture);
      window.removeEventListener("start-wedding-music", tryPlay);
    };

    // 1. Try immediate playback on mount
    tryPlay();

    // 2. Global gesture listeners to unlock audio on the very first touch/click anywhere on the screen
    document.addEventListener("pointerdown", handleGesture, { passive: true });
    document.addEventListener("touchstart", handleGesture, { passive: true });
    document.addEventListener("click", handleGesture, { passive: true });
    document.addEventListener("keydown", handleGesture, { passive: true });
    window.addEventListener("start-wedding-music", tryPlay);

    return () => {
      removeUnlockListeners();
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      audioRef.current = null;
    };
  }, [src]);

  useEffect(() => {
    if (isPlaying) {
      const waveformIntervalId = setInterval(() => {
        setHeights(getRandomHeights());
      }, 100);

      return () => {
        clearInterval(waveformIntervalId);
      };
    }
    setHeights(Array(bars).fill(0.25));
  }, [isPlaying]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      userPausedRef.current = true;
      audio.pause();
      setIsPlaying(false);
    } else {
      userPausedRef.current = false;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio play blocked or file not available:", err);
        });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      type="button"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={clsx(
        "inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all cursor-pointer focus:outline-none select-none shadow-lg backdrop-blur-md pointer-events-auto",
        isPlaying
          ? "bg-[#701a28] border-amber-300 text-amber-200 shadow-[#701a28]/40 ring-2 ring-amber-400/30"
          : "bg-white/90 border-[#b45309]/50 text-[#701a28] hover:border-[#b45309] shadow-neutral-900/20",
        className
      )}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      title={isPlaying ? "Pause wedding music" : "Play wedding music"}
    >
      <div className="flex h-[16px] w-[16px] items-center justify-center gap-[2px]">
        {heights.map((height, index) => (
          <motion.span
            key={index}
            className={clsx(
              "w-[2px] rounded-full transition-colors",
              isPlaying ? "bg-amber-300" : "bg-[#701a28]"
            )}
            initial={{ height: 3 }}
            animate={{
              height: isPlaying ? Math.max(3, height * 16) : 3,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 12,
            }}
          />
        ))}
      </div>
    </motion.button>
  );
};
