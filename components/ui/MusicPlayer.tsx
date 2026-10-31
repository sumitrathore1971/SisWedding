"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Download, Music } from "lucide-react";
import { clsx } from "clsx";

interface MusicPlayerProps {
  src?: string;
  songTitle?: string;
  artist?: string;
  className?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  src = "/music/invitationsong.mp3",
  songTitle = "Wedding Shehnai & Ambient Melodies",
  artist = "Poonam & Avtarit Wedding",
  className,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log("Audio playback note:", err);
          setIsPlaying(false);
        });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const targetTime = Number(e.target.value);
    audio.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const newVol = Number(e.target.value);
    setVolume(newVol);
    if (audio) {
      audio.volume = newVol;
      audio.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className={clsx(
        "p-4 sm:p-5 bg-white border border-[#b45309]/30 rounded-xl transition-colors shadow-md",
        className
      )}
      aria-label="Wedding Music Player"
    >
      {/* Hidden native audio element */}
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Top Track Info & Download Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#b45309]/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-50 border border-amber-200/80 rounded-lg text-[#701a28]">
            <Music size={16} className={isPlaying ? "animate-pulse text-[#b45309]" : ""} />
          </div>
          <div>
            <div className="font-serif text-xs font-bold text-[#701a28] tracking-tight">
              {songTitle}
            </div>
            <div className="font-sans text-[11px] text-[#78350f]">
              {artist} · Wedding Invitation Track
            </div>
          </div>
        </div>

        {/* Download Song Button */}
        <a
          href={src}
          download="invitationsong.mp3"
          className="inline-flex items-center gap-1.5 px-3 py-1 font-serif text-xs text-[#701a28] bg-rose-50/80 border border-rose-200/80 rounded-full hover:bg-rose-100 hover:text-[#881337] transition-colors cursor-pointer self-start sm:self-auto"
          aria-label="Download song audio file"
        >
          <Download size={12} />
          <span>DOWNLOAD TRACK ↓</span>
        </a>
      </div>

      {/* Playback Controls & Progress Bar */}
      <div className="pt-3 flex flex-col sm:flex-row items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="p-2.5 rounded-full bg-[#701a28] text-white hover:bg-[#881337] transition-colors focus:outline-none cursor-pointer border border-amber-300/40 shadow-sm"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
        </button>

        {/* Progress Scrubber */}
        <div className="flex-1 w-full flex items-center gap-2">
          <span className="font-sans text-[10px] text-[#78350f] tabular-nums w-8 text-right font-medium">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 bg-amber-100 accent-[#701a28] appearance-none cursor-pointer rounded-none focus:outline-none"
            aria-label="Audio progress bar"
          />
          <span className="font-sans text-[10px] text-[#78350f] tabular-nums w-8 font-medium">
            {formatTime(duration)}
          </span>
        </div>

        {/* Volume Control */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="text-[#78350f] hover:text-[#701a28] p-1 focus:outline-none cursor-pointer"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-amber-100 accent-[#701a28] appearance-none cursor-pointer rounded-none focus:outline-none"
            aria-label="Volume slider"
          />
        </div>
      </div>
    </div>
  );
};

