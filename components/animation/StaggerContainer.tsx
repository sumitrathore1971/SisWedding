"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { staggerContainer, reducedMotionVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface StaggerContainerProps {
  children: React.ReactNode;
  staggerChildren?: number;
  delayChildren?: number;
  viewportAmount?: number;
  once?: boolean;
  className?: string;
}

export function StaggerContainer({
  children,
  staggerChildren = 0.15,
  delayChildren = 0.1,
  viewportAmount = 0.2,
  once = true,
  className,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: viewportAmount }}
      variants={shouldReduceMotion ? reducedMotionVariants : staggerContainer}
      custom={{ staggerChildren, delayChildren }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
}
