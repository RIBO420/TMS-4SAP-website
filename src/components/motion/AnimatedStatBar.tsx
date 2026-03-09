"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";

interface Stat {
  value: string;
  label: string;
}

interface Props {
  stats: Stat[];
}

function AnimatedValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView || !ref.current) return;

    // Try to extract a number from the value
    const num = parseInt(value.replace(/[^0-9]/g, ""), 10);
    if (isNaN(num) || num === 0) {
      // Non-numeric values (like "SAP", "Global", "24/7") — just show them
      setDisplay(value);
      return;
    }

    // Animate numeric values
    const prefix = value.replace(/[0-9]+.*/, "");
    const suffix = value.replace(/.*?[0-9]+/, "");

    const controls = animate(0, num, {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate(latest) {
        setDisplay(`${prefix}${Math.round(latest)}${suffix}`);
      },
    });

    return () => controls.stop();
  }, [isInView, value]);

  return <span ref={ref} className="stat-value">{display}</span>;
}

export default function AnimatedStatBar({ stats }: Props) {
  return (
    <div className="stats-bar">
      <div className="container">
        <div className="stats-inner">
          {stats.map((stat, i) => (
            <span key={i} style={{ display: "contents" }}>
              {i > 0 && (
                <div className="stat-divider" role="separator" aria-hidden="true" />
              )}
              <div className="stat">
                <AnimatedValue value={stat.value} />
                <span className="stat-label">{stat.label}</span>
              </div>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
