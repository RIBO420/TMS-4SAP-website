"use client";
import { motion, useMotionValue, useTransform, animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

interface Props {
  value: string;
  label: string;
}

export default function AnimatedCounter({ value, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const isNumber = /^\d+$/.test(value);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView && isNumber) {
      animate(count, parseInt(value), {
        duration: 1.5,
        ease: [0.25, 0.1, 0.25, 1],
      });
    }
  }, [isInView, isNumber, value, count]);

  return (
    <div ref={ref} className="stat-item">
      <motion.span
        className="stat-value"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {isNumber ? <motion.span>{rounded}</motion.span> : value}
      </motion.span>
      <motion.span
        className="stat-label"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {label}
      </motion.span>
    </div>
  );
}
