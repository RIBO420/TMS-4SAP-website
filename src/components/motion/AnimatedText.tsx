"use client";
import { motion, useReducedMotion } from "motion/react";

interface Props {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Per-word stagger duration */
  stagger?: number;
  /** Accent part — rendered in amber color */
  accent?: string;
}

export default function AnimatedText({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0,
  stagger = 0.05,
  accent,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");
  const accentWords = accent ? accent.split(" ") : [];

  if (prefersReducedMotion) {
    return (
      <Tag className={className}>
        {text}
        {accent && (
          <>
            <br />
            <span style={{ color: "var(--amber)" }}>{accent}</span>
          </>
        )}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.5,
            delay: delay + i * stagger,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{ display: "inline-block" }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
      {accent && (
        <>
          <br />
          {accentWords.map((word, i) => (
            <motion.span
              key={`accent-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: delay + (words.length + i) * stagger,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{
                display: "inline-block",
                color: "var(--amber)",
              }}
            >
              {word}
              {i < accentWords.length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
        </>
      )}
    </Tag>
  );
}
