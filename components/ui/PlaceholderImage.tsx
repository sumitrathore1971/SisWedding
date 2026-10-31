import React from "react";
import { Image as ImageIcon, Sparkles, User, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PlaceholderImageProps {
  label: string;
  subLabel?: string;
  variant?: "image" | "illustration" | "avatar" | "background" | "venue";
  aspectRatio?: "square" | "portrait" | "video" | "banner" | "hero" | string;
  className?: string;
  badge?: string;
  priority?: boolean;
}

export function PlaceholderImage({
  label,
  subLabel,
  variant = "image",
  aspectRatio = "portrait",
  className,
  badge,
}: PlaceholderImageProps) {
  // Map predefined aspect ratio tokens to Tailwind classes
  const aspectClassMap: Record<string, string> = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    video: "aspect-[16/9]",
    banner: "aspect-[21/9]",
    hero: "aspect-[4/5]",
  };

  const resolvedAspectClass =
    aspectRatio in aspectClassMap ? aspectClassMap[aspectRatio] : aspectRatio;

  // Icon selector based on placeholder type
  const renderIcon = () => {
    switch (variant) {
      case "illustration":
        return <Sparkles className="w-8 h-8 text-neutral-400 stroke-[1.5]" aria-hidden="true" />;
      case "avatar":
        return <User className="w-8 h-8 text-neutral-400 stroke-[1.5]" aria-hidden="true" />;
      case "venue":
        return <MapPin className="w-8 h-8 text-neutral-400 stroke-[1.5]" aria-hidden="true" />;
      case "background":
      case "image":
      default:
        return <ImageIcon className="w-8 h-8 text-neutral-400 stroke-[1.5]" aria-hidden="true" />;
    }
  };

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative w-full rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50/80 p-4 transition-all hover:border-neutral-400 flex flex-col items-center justify-center text-center overflow-hidden",
        resolvedAspectClass,
        className
      )}
    >
      {/* Background subtle wireframe grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(to right, #000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Optional top badge */}
      {badge && (
        <span className="absolute top-3 right-3 rounded-full bg-neutral-200/90 px-2 py-0.5 text-[10px] font-medium tracking-wide text-neutral-600 uppercase">
          {badge}
        </span>
      )}

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-2 max-w-[85%]">
        <div className="rounded-xl bg-white/90 p-2.5 shadow-xs border border-neutral-200">
          {renderIcon()}
        </div>
        <p className="text-xs sm:text-sm font-medium text-neutral-700 leading-snug">
          {label}
        </p>
        {subLabel && (
          <p className="text-[11px] text-neutral-400 leading-tight">
            {subLabel}
          </p>
        )}
      </div>

      {/* Decorative corner markers */}
      <div className="pointer-events-none absolute top-1.5 left-1.5 w-2 h-2 border-t-2 border-l-2 border-neutral-300" />
      <div className="pointer-events-none absolute top-1.5 right-1.5 w-2 h-2 border-t-2 border-r-2 border-neutral-300" />
      <div className="pointer-events-none absolute bottom-1.5 left-1.5 w-2 h-2 border-b-2 border-l-2 border-neutral-300" />
      <div className="pointer-events-none absolute bottom-1.5 right-1.5 w-2 h-2 border-b-2 border-r-2 border-neutral-300" />
    </div>
  );
}
