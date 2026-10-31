"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  fadeUp,
  slideFromRight,
  slideFromLeft,
  scaleReveal,
  reducedMotionVariants,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

export type AnimationType =
  | "fadeUp"
  | "slideFromRight"
  | "slideFromLeft"
  | "scaleReveal"
  | "none";

export interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  viewportAmount?: number;
  once?: boolean;
  className?: string;
}

export function ScrollReveal({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 0.8,
  viewportAmount = 0.2,
  once = true,
  className,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const variantMap: Record<AnimationType, Variants> = {
    fadeUp,
    slideFromRight,
    slideFromLeft,
    scaleReveal,
    none: {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    },
  };

  const selectedVariant = shouldReduceMotion
    ? reducedMotionVariants
    : variantMap[animation];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: viewportAmount }}
      variants={selectedVariant}
      custom={{ delay, duration }}
      className={cn("w-full overflow-hidden", className)}
    >
      {children}
    </motion.div>
  );
}
