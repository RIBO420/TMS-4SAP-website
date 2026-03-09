"use client";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  href?: string;
  index?: number;
  stagger?: number;
}

export default function AnimatedCard({
  children,
  className = "",
  href,
  index = 0,
  stagger = 0.08,
}: Props) {
  const Component = href ? motion.a : motion.div;

  return (
    <Component
      {...(href ? { href } : {})}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * stagger,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
    >
      {children}
    </Component>
  );
}
