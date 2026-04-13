"use client";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { MOTION } from "../../lib/motion";

interface GroupProps {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  className?: string;
}

export function StaggerGroup({
  children,
  stagger = MOTION.stagger,
  delayChildren = 0.05,
  className,
}: GroupProps) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delayChildren,
      },
    },
  };
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

interface ItemProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
}

export function StaggerItem({
  children,
  className,
  direction = "up",
}: ItemProps) {
  const reduce = useReducedMotion();
  const offset =
    direction === "left"
      ? { x: -16 }
      : direction === "right"
      ? { x: 16 }
      : { y: 16 };

  const variants: Variants = reduce
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, ...offset },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: MOTION.enter,
        },
      };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
