"use client";
/**
 * ProductionScheduler — §4 hero-grade interactive Gantt.
 * 4 machines × 5 days (10 half-day slots). Drag a block, downstream jobs reflow.
 * SVG approach with motion v12 controlled x/y animations (no layout FLIP on <g>).
 */
import {
  motion,
  useMotionValue,
  useReducedMotion,
  animate as motionAnimate,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
// (useRef retained for JobBlock drag flag)

// ——— Constants ————————————————————————————————————————————————
const MACHINES = [
  { id: "M1", label: "Injection 01" },
  { id: "M2", label: "Injection 02" },
  { id: "M3", label: "Assembly" },
  { id: "M4", label: "Pack + QA" },
] as const;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
const SLOTS = DAYS.length * 2; // 10 half-day slots
const VB_W = 960;
const VB_H = 320;
const LEFT_COL = 120;
const HEADER = 40;
const ROW_H = (VB_H - HEADER) / MACHINES.length; // 70
const SLOT_W = (VB_W - LEFT_COL) / SLOTS; // 84

type MachineId = (typeof MACHINES)[number]["id"];

interface Job {
  id: string;
  machine: MachineId;
  start: number; // half-day slot index
  span: number; // slots
  deadline: number; // slot index (end-exclusive)
}

const INITIAL_JOBS: Job[] = [
  { id: "J1", machine: "M1", start: 0, span: 4, deadline: 6 },
  { id: "J2", machine: "M2", start: 1, span: 3, deadline: 5 },
  { id: "J3", machine: "M3", start: 2, span: 3, deadline: 6 },
  { id: "J4", machine: "M4", start: 3, span: 2, deadline: 7 },
  { id: "J5", machine: "M1", start: 5, span: 3, deadline: 9 },
  { id: "J6", machine: "M3", start: 6, span: 3, deadline: 9 },
];

// ——— Reschedule core ——————————————————————————————————————————
function reschedule(jobs: Job[], movedId: string, newStart: number): Job[] {
  const next = jobs.map((j) => ({ ...j }));
  const moved = next.find((j) => j.id === movedId);
  if (!moved) return next;
  const clampedStart = Math.max(0, Math.min(newStart, SLOTS - moved.span));
  moved.start = clampedStart;

  // Cascade: iterate on the moved job's machine, sorted by start, shift overlaps right.
  const machineJobs = next
    .filter((j) => j.machine === moved.machine)
    .sort((a, b) => a.start - b.start || (a.id === movedId ? -1 : 1));

  for (let i = 0; i < machineJobs.length; i++) {
    const cur = machineJobs[i];
    for (let k = i + 1; k < machineJobs.length; k++) {
      const other = machineJobs[k];
      if (other.id === cur.id) continue;
      const curEnd = cur.start + cur.span;
      if (other.start < curEnd) {
        const shift = Math.max(1, curEnd - other.start);
        other.start = Math.min(SLOTS - other.span, other.start + shift);
      }
    }
  }
  // Re-sort to ensure cascades propagate in a second pass
  machineJobs.sort((a, b) => a.start - b.start);
  for (let i = 0; i < machineJobs.length - 1; i++) {
    const cur = machineJobs[i];
    const nxt = machineJobs[i + 1];
    const curEnd = cur.start + cur.span;
    if (nxt.start < curEnd) {
      nxt.start = Math.min(SLOTS - nxt.span, curEnd);
    }
  }
  return next;
}

// ——— Reducer ——————————————————————————————————————————————————
type Action =
  | { type: "RESCHEDULE"; movedId: string; newStart: number }
  | { type: "RESET" };

function jobsReducer(state: Job[], action: Action): Job[] {
  switch (action.type) {
    case "RESCHEDULE":
      return reschedule(state, action.movedId, action.newStart);
    case "RESET":
      return INITIAL_JOBS.map((j) => ({ ...j }));
    default:
      return state;
  }
}

// ——— Metrics ——————————————————————————————————————————————————
function computeUtil(jobs: Job[]): number {
  const totalSpan = jobs.reduce((s, j) => s + j.span, 0);
  const ratio = totalSpan / (SLOTS * MACHINES.length);
  // Visual scale: base 72, scale to ~88-95 based on packing density + rightward drift
  const rightDrift = jobs.reduce((s, j) => s + j.start, 0) / jobs.length;
  const scaled = 72 + Math.round(ratio * 40 + rightDrift * 0.8);
  return Math.max(72, Math.min(95, scaled));
}

function anyLate(jobs: Job[]): boolean {
  return jobs.some((j) => j.start + j.span > j.deadline);
}

function slotToDayLabel(slot: number): string {
  const day = DAYS[Math.floor(slot / 2)] ?? DAYS[DAYS.length - 1];
  const half = slot % 2 === 0 ? "AM" : "PM";
  return `${day} ${half}`;
}

// ——— Props ————————————————————————————————————————————————————
interface Props {
  lang?: "en" | "nl" | "de";
  hint: string;
  disclaimer: string;
}

const UI_COPY = {
  en: { util: "Utilisation", onTime: "ON-TIME", atRisk: "AT RISK", reset: "Reset" },
  nl: { util: "Bezetting", onTime: "OP TIJD", atRisk: "RISICO", reset: "Herstel" },
  de: { util: "Auslastung", onTime: "PÜNKTLICH", atRisk: "RISIKO", reset: "Zurück" },
} as const;

// ——— Component ————————————————————————————————————————————————
export default function ProductionScheduler({ lang = "en", hint, disclaimer }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const copy = UI_COPY[lang];
  const [jobs, dispatch] = useReducer(jobsReducer, INITIAL_JOBS);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const util = useMemo(() => computeUtil(jobs), [jobs]);
  const late = useMemo(() => anyLate(jobs), [jobs]);

  const announce = useCallback(
    (id: string, oldStart: number, newStart: number, u: number) => {
      const from = slotToDayLabel(oldStart);
      const to = slotToDayLabel(newStart);
      setAnnouncement(`Job ${id} moved from ${from} to ${to}. Utilisation now ${u} percent.`);
    },
    [],
  );

  const onRelease = useCallback(
    (id: string, newStart: number) => {
      const before = jobs.find((j) => j.id === id);
      if (!before) return;
      const oldStart = before.start;
      dispatch({ type: "RESCHEDULE", movedId: id, newStart });
      // announce after state settles next tick
      requestAnimationFrame(() => {
        const nextJobs = reschedule(jobs, id, newStart);
        announce(id, oldStart, nextJobs.find((j) => j.id === id)?.start ?? newStart, computeUtil(nextJobs));
      });
    },
    [jobs, announce],
  );

  const onKeyNudge = useCallback(
    (e: KeyboardEvent<SVGGElement>, id: string) => {
      const job = jobs.find((j) => j.id === id);
      if (!job) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onRelease(id, Math.min(SLOTS - job.span, job.start + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onRelease(id, Math.max(0, job.start - 1));
      } else if (e.key === "Home") {
        e.preventDefault();
        onRelease(id, 0);
      } else if (e.key === "End") {
        e.preventDefault();
        onRelease(id, SLOTS - job.span);
      }
    },
    [jobs, onRelease],
  );

  // Late badge pill colour
  const badgeBg = late ? "#dc2626" : "#15803d";
  const badgeLabel = late ? copy.atRisk : copy.onTime;

  return (
    <div className="scheduler-widget" role="region" aria-label="Interactive production scheduler">
      {/* KPI strip */}
      <div className="scheduler-kpi">
        <div className="scheduler-kpi__tile">
          <span className="scheduler-kpi__label">{copy.util}</span>
          <motion.span
            key={util}
            className="scheduler-kpi__value"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0, color: util >= 85 ? "#f59e0b" : "#fafafa" }}
            transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
          >
            {util}%
          </motion.span>
        </div>
        <motion.div
          className="scheduler-kpi__tile scheduler-kpi__badge"
          animate={{ backgroundColor: badgeBg }}
          transition={{ duration: 0.3 }}
        >
          <span className="scheduler-kpi__badge-dot" aria-hidden="true" />
          <span className="scheduler-kpi__badge-label">{badgeLabel}</span>
        </motion.div>
        <p className="scheduler-hint">{hint}</p>
      </div>

      {/* SVG Gantt */}
      <div className="scheduler-svg-wrap">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="scheduler-svg"
          role="img"
          aria-label="Weekly production Gantt chart"
        >
          <defs>
            <linearGradient id="job-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="job-fill-late" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
          </defs>

          {/* Day header */}
          {DAYS.map((d, i) => (
            <g key={d}>
              <text
                x={LEFT_COL + i * SLOT_W * 2 + SLOT_W}
                y={24}
                textAnchor="middle"
                className="scheduler-svg__day"
              >
                {d}
              </text>
              <line
                x1={LEFT_COL + i * SLOT_W * 2}
                y1={HEADER}
                x2={LEFT_COL + i * SLOT_W * 2}
                y2={VB_H}
                stroke="rgba(245, 158, 11, 0.18)"
                strokeDasharray="2 4"
              />
            </g>
          ))}
          {/* Half-slot minor gridlines */}
          {Array.from({ length: SLOTS }, (_, i) => i).map((i) => (
            <line
              key={`mg-${i}`}
              x1={LEFT_COL + i * SLOT_W}
              y1={HEADER}
              x2={LEFT_COL + i * SLOT_W}
              y2={VB_H}
              stroke="rgba(255,255,255,0.04)"
            />
          ))}

          {/* Machine rows */}
          {MACHINES.map((m, ri) => (
            <g key={m.id}>
              <text
                x={12}
                y={HEADER + ri * ROW_H + ROW_H / 2 + 4}
                className="scheduler-svg__machine"
              >
                {m.label}
              </text>
              <line
                x1={LEFT_COL}
                y1={HEADER + (ri + 1) * ROW_H}
                x2={VB_W}
                y2={HEADER + (ri + 1) * ROW_H}
                stroke="rgba(255,255,255,0.08)"
              />
            </g>
          ))}

          {/* Deadline markers */}
          {jobs.map((j) => {
            const ri = MACHINES.findIndex((m) => m.id === j.machine);
            return (
              <line
                key={`dl-${j.id}`}
                x1={LEFT_COL + j.deadline * SLOT_W}
                y1={HEADER + ri * ROW_H + 6}
                x2={LEFT_COL + j.deadline * SLOT_W}
                y2={HEADER + (ri + 1) * ROW_H - 6}
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="3 3"
                opacity={0.7}
              />
            );
          })}

          {/* Job blocks */}
          {jobs.map((j) => (
            <JobBlock
              key={j.id}
              job={j}
              focused={focusId === j.id}
              prefersReducedMotion={!!prefersReducedMotion}
              onRelease={onRelease}
              onFocus={() => setFocusId(j.id)}
              onBlur={() => setFocusId(null)}
              onKeyDown={(e) => onKeyNudge(e, j.id)}
            />
          ))}
        </svg>
      </div>

      <p className="scheduler-disclaimer">{disclaimer}</p>

      {/* SR-only live region */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="scheduler-sr-only"
      >
        {announcement}
      </div>

      {/* SR-only table fallback */}
      <table className="scheduler-sr-only">
        <caption>Production schedule</caption>
        <thead>
          <tr>
            <th>Job</th>
            <th>Machine</th>
            <th>Start</th>
            <th>End</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((j) => (
            <tr key={j.id}>
              <td>{j.id}</td>
              <td>{MACHINES.find((m) => m.id === j.machine)?.label}</td>
              <td>{slotToDayLabel(j.start)}</td>
              <td>{slotToDayLabel(j.start + j.span - 1)}</td>
              <td>{slotToDayLabel(j.deadline)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .scheduler-widget {
          background: var(--bg-card, #0a0a0a);
          border: 1px solid var(--border, rgba(255,255,255,0.08));
          border-radius: 16px;
          padding: 32px;
          color: var(--text, #fafafa);
        }
        .scheduler-kpi {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .scheduler-kpi__tile {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border, rgba(255,255,255,0.08));
          border-radius: 10px;
          padding: 12px 18px;
          display: flex;
          flex-direction: column;
          min-width: 140px;
        }
        .scheduler-kpi__label {
          font-family: var(--font-mono, ui-monospace, "JetBrains Mono", monospace);
          font-size: 0.6875rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted, #a1a1aa);
        }
        .scheduler-kpi__value {
          display: inline-block;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 1.75rem;
          font-weight: 600;
          line-height: 1.1;
          margin-top: 4px;
        }
        .scheduler-kpi__badge {
          flex-direction: row;
          align-items: center;
          gap: 10px;
          min-width: 0;
          border-color: transparent;
          color: #fff;
        }
        .scheduler-kpi__badge-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 8px rgba(255,255,255,0.6);
        }
        .scheduler-kpi__badge-label {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.08em;
        }
        .scheduler-hint {
          flex: 1;
          min-width: 220px;
          color: var(--text-muted, #a1a1aa);
          font-size: 0.875rem;
          margin: 0;
        }
        .scheduler-svg-wrap {
          width: 100%;
          overflow-x: auto;
        }
        .scheduler-svg {
          width: 100%;
          min-width: 680px;
          height: auto;
          display: block;
          touch-action: pan-y;
        }
        .scheduler-svg__day {
          fill: var(--text-muted, #a1a1aa);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .scheduler-svg__machine {
          fill: var(--text-muted, #a1a1aa);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          letter-spacing: 0.05em;
        }
        .scheduler-svg__job-label {
          fill: #0a0a0a;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 12px;
          font-weight: 700;
          pointer-events: none;
        }
        .scheduler-svg__job rect {
          cursor: grab;
        }
        .scheduler-svg__job:active rect {
          cursor: grabbing;
        }
        .scheduler-svg__job:focus {
          outline: none;
        }
        .scheduler-svg__job:focus rect {
          stroke: #fafafa;
          stroke-width: 2;
        }
        .scheduler-disclaimer {
          margin: 16px 0 0;
          font-size: 0.75rem;
          color: var(--text-muted, #a1a1aa);
          font-style: italic;
        }
        .scheduler-sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
          border: 0;
        }
        @media (max-width: 768px) {
          .scheduler-widget { padding: 20px; }
          .scheduler-kpi__value { font-size: 1.5rem; }
        }
      `}</style>
    </div>
  );
}

// ——— JobBlock subcomponent ————————————————————————————————————
interface JobBlockProps {
  job: Job;
  focused: boolean;
  prefersReducedMotion: boolean;
  onRelease: (id: string, newStart: number) => void;
  onFocus: () => void;
  onBlur: () => void;
  onKeyDown: (e: KeyboardEvent<SVGGElement>) => void;
}

function JobBlock({
  job,
  prefersReducedMotion,
  onRelease,
  onFocus,
  onBlur,
  onKeyDown,
}: JobBlockProps) {
  const targetX = LEFT_COL + job.start * SLOT_W;
  const y = HEADER + MACHINES.findIndex((m) => m.id === job.machine) * ROW_H + 10;
  const w = job.span * SLOT_W - 4;
  const h = ROW_H - 20;

  const x = useMotionValue(targetX);
  const dragging = useRef(false);

  // Sync to target when not dragging (state updates from reschedule)
  useEffect(() => {
    if (dragging.current) return;
    if (prefersReducedMotion) {
      x.set(targetX);
    } else {
      const controls = motionAnimate(x, targetX, {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      });
      return () => controls.stop();
    }
  }, [targetX, prefersReducedMotion, x]);

  const isLate = job.start + job.span > job.deadline;

  const handleDragEnd = () => {
    dragging.current = false;
    const raw = x.get();
    const slot = Math.round((raw - LEFT_COL) / SLOT_W);
    const clamped = Math.max(0, Math.min(slot, SLOTS - job.span));
    onRelease(job.id, clamped);
  };

  return (
    <motion.g
      className="scheduler-svg__job"
      style={{ x, y }}
      drag="x"
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => {
        dragging.current = true;
      }}
      onDragEnd={handleDragEnd}
      dragConstraints={{
        left: -(LEFT_COL + job.start * SLOT_W) + LEFT_COL,
        right: VB_W - LEFT_COL - job.span * SLOT_W - job.start * SLOT_W + LEFT_COL,
      }}
      tabIndex={0}
      role="button"
      aria-label={`Job ${job.id} on machine ${job.machine}, starts ${slotToDayLabel(job.start)}, duration ${job.span} half-days. Drag or use arrow keys.`}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      whileHover={{ scale: 1.01 }}
      whileDrag={{ scale: 1.03, filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.6))" }}
      transition={{ duration: 0.18, ease: [0.25, 1, 0.5, 1] }}
    >
      <rect
        x={2}
        y={0}
        width={w}
        height={h}
        rx={6}
        ry={6}
        fill={isLate ? "url(#job-fill-late)" : "url(#job-fill)"}
        stroke={isLate ? "#fca5a5" : "#fcd34d"}
        strokeOpacity={0.5}
        strokeWidth={1}
      />
      <text x={14} y={h / 2 + 5} className="scheduler-svg__job-label">
        {job.id}
      </text>
    </motion.g>
  );
}
