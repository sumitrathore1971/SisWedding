"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { smoothEase, reducedMotionVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface AnimatedEventSectionProps {
  id?: string;
  ariaLabel?: string;
  className?: string;
  innerClassName?: string;
  minHeightClass?: string;
  xOffset?: number;
  duration?: number;
  viewportAmount?: number;
  staggerChildren?: number;
  children: React.ReactNode;
}

/**
 * AnimatedEventSection
 * 
 * Implements the required event animation system:
 * - Remains part of normal vertical document flow
 * - When entering viewport, reveals from the right (x: 80 to 0)
 * - Animate opacity 0 to 1 and subtle scale 0.97 to 1
 * - Staggers title, image placeholder, date/time details, description
 * - Motion viewport detection: whileInView, viewport={{ once: true, amount: 0.2 }}
 * - Prevents horizontal overflow via overflow-hidden
 */
export function AnimatedEventSection({
  id,
  ariaLabel,
  className,
  innerClassName,
  minHeightClass = "min-h-[100svh]",
  xOffset = 85,
  duration = 0.85,
  viewportAmount = 0.2,
  staggerChildren = 0.12,
  children,
}: AnimatedEventSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  // Container variant with horizontal entry and stagger trigger
  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : xOffset,
      scale: shouldReduceMotion ? 1 : 0.97,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration,
        ease: smoothEase,
        staggerChildren: shouldReduceMotion ? 0 : staggerChildren,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "relative w-full flex flex-col justify-center items-center overflow-hidden border-b border-neutral-200/60 bg-white",
        minHeightClass,
        className
      )}
    >
      {/* 
        Mobile-first centered container with overflow containment 
        to guarantee no horizontal document scrolling
      */}
      <div className="w-full max-w-[430px] mx-auto px-5 py-12 overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: viewportAmount }}
          variants={shouldReduceMotion ? reducedMotionVariants : containerVariants}
          className={cn("w-full flex flex-col items-center", innerClassName)}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * AnimatedEventItem
 * Child item inside AnimatedEventSection that inherits stagger sequence
 */
export function AnimatedEventItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : 30,
      y: shouldReduceMotion ? 0 : 10,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.65,
        ease: smoothEase,
      },
    },
  };

  return (
    <motion.div
      variants={shouldReduceMotion ? reducedMotionVariants : itemVariants}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
}
