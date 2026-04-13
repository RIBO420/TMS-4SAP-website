"use client";
// OEEDials — 4 radial gauges used inside §5 Beat 3 + mobile fallback.
// Scroll-linked fills via pathLength; reduced-motion → instant final state.
//
// Availability 87% · Performance 94% · Quality 99.2% · OEE 81.1%
// Benchmark tick on OEE dial at 85% (Nakajima world-class).

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { MOTION } from "../../lib/motion";

type Lang = "en" | "nl" | "de";

interface Props {
  lang?: Lang;
  variant?: "static" | "scroll-linked";
}

interface DialSpec {
  key: "availability" | "performance" | "quality" | "oee";
  value: number;
  display: string;
  benchmark?: number;
}

const DIALS: DialSpec[] = [
  { key: "availability", value: 0.87,  display: "87"   },
  { key: "performance",  value: 0.94,  display: "94"   },
  { key: "quality",      value: 0.992, display: "99.2" },
  { key: "oee",          value: 0.811, display: "81.1", benchmark: 0.85 },
];

const LABELS: Record<Lang, Record<DialSpec["key"], string>> = {
  en: {
    availability: "Availability",
    performance:  "Performance",
    quality:      "Quality",
    oee:          "OEE",
  },
  nl: {
    availability: "Beschikbaarheid",
    performance:  "Prestatie",
    quality:      "Kwaliteit",
    oee:          "OEE",
  },
  de: {
    availability: "Verfügbarkeit",
    performance:  "Leistung",
    quality:      "Qualität",
    oee:          "OEE",
  },
};

const WORLD_CLASS_LABEL: Record<Lang, string> = {
  en: "World class 85%",
  nl: "Wereldklasse 85%",
  de: "Weltklasse 85%",
};

const SIZE = 140;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;

/** Single radial dial. Accepts either scroll-linked progress or inView flag. */
function Dial({
  spec,
  label,
  worldClassLabel,
  progress,
  inView,
  reduce,
  scrollLinked,
}: {
  spec: DialSpec;
  label: string;
  worldClassLabel: string;
  progress: ReturnType<typeof useTransform<number, number>> | null;
  inView: boolean;
  reduce: boolean;
  scrollLinked: boolean;
}) {
  const isOee = spec.key === "oee";

  // Scroll-linked mode uses pathLength bound to a MotionValue.
  // Static / inView mode animates pathLength from 0 → spec.value once visible.
  const commonCircleProps = {
    cx: SIZE / 2,
    cy: SIZE / 2,
    r: RADIUS,
    fill: "none",
    strokeLinecap: "round" as const,
    pathLength: 1,
  };

  const initialPath = reduce ? spec.value : 0;
  const targetPath = reduce ? spec.value : inView ? spec.value : 0;

  return (
    <div className="oee-dial" role="group" aria-label={`${label} ${spec.display}%`}>
      <div className="oee-dial__svg-wrap">
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          aria-hidden="true"
        >
          {/* Unfilled track */}
          <circle
            {...commonCircleProps}
            stroke="var(--border, #27272a)"
            strokeWidth={STROKE}
          />
          {/* Filled portion — rotated so fill starts at 12 o'clock */}
          <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
            {scrollLinked && progress ? (
              <motion.circle
                {...commonCircleProps}
                stroke="var(--amber, #f59e0b)"
                strokeWidth={STROKE}
                style={{ pathLength: progress }}
              />
            ) : (
              <motion.circle
                {...commonCircleProps}
                stroke="var(--amber, #f59e0b)"
                strokeWidth={STROKE}
                initial={{ pathLength: initialPath }}
                animate={{ pathLength: targetPath }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
                }
              />
            )}
            {/* Benchmark tick mark for OEE dial at 85% */}
            {isOee && spec.benchmark !== undefined && (
              <BenchmarkTick fraction={spec.benchmark} />
            )}
          </g>
        </svg>
        <div className="oee-dial__value">
          <span className="oee-dial__num">{spec.display}</span>
          <span className="oee-dial__pct">%</span>
        </div>
      </div>
      <div className="oee-dial__label">{label}</div>
      {isOee && <div className="oee-dial__benchmark">· {worldClassLabel}</div>}
    </div>
  );
}

/**
 * Static tick mark drawn at a given fraction around the circle.
 * Used only on the OEE dial to mark the 85% Nakajima world-class benchmark.
 */
function BenchmarkTick({ fraction }: { fraction: number }) {
  // Tick coords on the circle
  const angle = fraction * 2 * Math.PI;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const inner = RADIUS - STROKE / 2 - 3;
  const outer = RADIUS + STROKE / 2 + 3;
  const x1 = cx + inner * Math.cos(angle);
  const y1 = cy + inner * Math.sin(angle);
  const x2 = cx + outer * Math.cos(angle);
  const y2 = cy + outer * Math.sin(angle);
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="var(--text, #fafafa)"
      strokeWidth={2}
      strokeLinecap="round"
      opacity={0.75}
    />
  );
}

export default function OEEDials({ lang = "en", variant = "static" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const labels = LABELS[lang];
  const worldClass = WORLD_CLASS_LABEL[lang];

  const inView = useInView(containerRef, { once: true, margin: "-60px" });

  // Scroll-linked fill (used inside §5 sticky-pin Beat 3).
  // Maps scrollYProgress of the container from 0.25 → 0.75 to 0 → 1 for each dial.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  // Pre-build a transform per dial (hook order must be stable).
  const p0 = useTransform(scrollYProgress, [0.0, 0.8], [0, DIALS[0].value]);
  const p1 = useTransform(scrollYProgress, [0.05, 0.85], [0, DIALS[1].value]);
  const p2 = useTransform(scrollYProgress, [0.1, 0.9], [0, DIALS[2].value]);
  const p3 = useTransform(scrollYProgress, [0.15, 0.95], [0, DIALS[3].value]);
  const progressValues = [p0, p1, p2, p3] as const;

  const scrollLinked = variant === "scroll-linked" && !reduce;

  return (
    <div
      ref={containerRef}
      className={`oee-dials oee-dials--${variant}`}
      role="figure"
      aria-label="Overall Equipment Effectiveness dials"
    >
      {DIALS.map((spec, i) => (
        <Dial
          key={spec.key}
          spec={spec}
          label={labels[spec.key]}
          worldClassLabel={worldClass}
          progress={scrollLinked ? progressValues[i] : null}
          inView={inView}
          reduce={reduce}
          scrollLinked={scrollLinked}
        />
      ))}

      <style>{`
        .oee-dials {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.5rem 1.25rem;
          padding: 1.25rem;
          max-width: 420px;
          margin: 0 auto;
        }
        .oee-dial {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .oee-dial__svg-wrap {
          position: relative;
          width: ${SIZE}px;
          height: ${SIZE}px;
        }
        .oee-dial__value {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 2px;
          pointer-events: none;
        }
        .oee-dial__num {
          font-family: ui-monospace, "JetBrains Mono", "IBM Plex Mono", monospace;
          font-size: 2rem;
          font-weight: 700;
          color: var(--text, #fafafa);
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .oee-dial__pct {
          font-family: ui-monospace, "JetBrains Mono", monospace;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-muted, #a1a1aa);
        }
        .oee-dial__label {
          font-family: ui-monospace, "JetBrains Mono", monospace;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted, #a1a1aa);
          text-align: center;
        }
        .oee-dial__benchmark {
          font-family: ui-monospace, "JetBrains Mono", monospace;
          font-size: 0.625rem;
          letter-spacing: 0.05em;
          color: var(--text-muted, #a1a1aa);
          opacity: 0.7;
          margin-top: -2px;
          text-align: center;
        }
        @media (max-width: 420px) {
          .oee-dials {
            gap: 1rem 0.75rem;
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
