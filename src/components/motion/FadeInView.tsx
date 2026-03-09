"use client";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  /** Distance in pixels */
  distance?: number;
}

const directionMap = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

export default function FadeInView({
  children,
  delay = 0,
  direction = "up",
  className = "",
  distance = 24,
}: Props) {
  const d = directionMap[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: d.x * distance, y: d.y * distance }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
