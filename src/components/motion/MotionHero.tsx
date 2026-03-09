"use client";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface Props {
  badge?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  children?: ReactNode;
}

export default function MotionHero({
  badge,
  title,
  titleAccent,
  description,
  children,
}: Props) {
  return (
    <div className="hero-inner-content">
      {badge && (
        <motion.span
          className="section-tag"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {badge}
        </motion.span>
      )}
      <motion.h1
        className="hero-inner-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {title}
        {titleAccent && (
          <>
            {" "}
            <span className="text-amber">{titleAccent}</span>
          </>
        )}
      </motion.h1>
      {description && (
        <motion.p
          className="hero-inner-desc"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {description}
        </motion.p>
      )}
      {children}
    </div>
  );
}
