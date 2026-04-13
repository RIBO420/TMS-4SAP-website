"use client";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode, type ElementType } from "react";
import { MOTION } from "../../lib/motion";

type Direction = "up" | "left" | "right" | "scale";

interface Props {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  as?: ElementType;
  className?: string;
}

const OFFSETS: Record<Direction, Record<string, number>> = {
  up:    { y: 24 },
  left:  { x: -24 },
  right: { x: 24 },
  scale: { scale: 0.96 },
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  as = "div",
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const initial = reduce ? { opacity: 0 } : { opacity: 0, ...OFFSETS[direction] };
  const animate = inView
    ? reduce
      ? { opacity: 1 }
      : { opacity: 1, x: 0, y: 0, scale: 1 }
    : initial;

  const transition = reduce
    ? { duration: 0.2, delay }
    : { ...MOTION.enter, delay };

  const tag = typeof as === "string" ? as : "div";
  const Comp: any = (motion as any)[tag] ?? motion.div;

  return (
    <Comp
      ref={ref}
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
    >
      {children}
    </Comp>
  );
}
