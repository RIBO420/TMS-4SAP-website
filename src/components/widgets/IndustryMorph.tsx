"use client";
// IndustryMorph — 4-chip tablist that cross-fades a stats/tagline panel.
// Content seeded from src/data/industries.ts (Plastics, Automotive, Metal, Electronics).
// Keyboard: arrow keys navigate between chips. Reduced motion → instant swap.

import { useCallback, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE } from "../../lib/motion";
import { industries, type IndustryData } from "../../data/industries";

type Lang = "en" | "nl" | "de";

interface Props {
  lang?: Lang;
}

// i18n chip labels and CTA copy
const CHIP_LABELS: Record<Lang, Record<string, string>> = {
  en: {
    kunststof:        "Plastics",
    automotive:       "Automotive",
    metaalbewerking:  "Metal",
    elektronica:      "Electronics",
  },
  nl: {
    kunststof:        "Kunststof",
    automotive:       "Automotive",
    metaalbewerking:  "Metaal",
    elektronica:      "Elektronica",
  },
  de: {
    kunststof:        "Kunststoff",
    automotive:       "Automotive",
    metaalbewerking:  "Metall",
    elektronica:      "Elektronik",
  },
};

const HEADING: Record<Lang, string> = {
  en: "Four verticals. One codebase.",
  nl: "Vier sectoren. Één codebase.",
  de: "Vier Branchen. Eine Codebasis.",
};

const LEARN_MORE: Record<Lang, string> = {
  en: "Learn more",
  nl: "Meer weten",
  de: "Mehr erfahren",
};

function basePath(lang: Lang): string {
  // Matches the GitHub Pages base path used elsewhere in the site.
  const base = "/TMS-4SAP-website";
  return lang === "en" ? base : `${base}/${lang}`;
}

export default function IndustryMorph({ lang = "en" }: Props) {
  const reduce = useReducedMotion() ?? false;
  const chips = useMemo<IndustryData[]>(() => industries, []);
  const [active, setActive] = useState(0);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const chipLabels = CHIP_LABELS[lang];

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = (active + 1) % chips.length;
        setActive(next);
        chipRefs.current[next]?.focus();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = (active - 1 + chips.length) % chips.length;
        setActive(prev);
        chipRefs.current[prev]?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        setActive(0);
        chipRefs.current[0]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        const last = chips.length - 1;
        setActive(last);
        chipRefs.current[last]?.focus();
      }
    },
    [active, chips.length],
  );

  const current = chips[active];
  const panelId = `industry-panel-${current.slug}`;
  const tabId = `industry-tab-${current.slug}`;
  const href = `${basePath(lang)}/industries/${current.slug}/`;

  // Pick 3 stats (data file has 4)
  const stats = current.stats.slice(0, 3);

  const enter = reduce
    ? { opacity: 1, x: 0 }
    : { opacity: 1, x: 0 };
  const initial = reduce
    ? { opacity: 1, x: 0 }
    : { opacity: 0, x: 8 };
  const exit = reduce
    ? { opacity: 1, x: 0 }
    : { opacity: 0, x: -8 };
  const transition = reduce
    ? { duration: 0 }
    : { duration: 0.25, ease: EASE.outQuart };

  return (
    <div className="industry-morph">
      <p className="industry-morph__eyebrow">
        05 · {lang === "nl" ? "SECTOREN" : lang === "de" ? "BRANCHEN" : "VERTICALS"}
      </p>
      <h3 className="industry-morph__heading">{HEADING[lang]}</h3>

      <div
        role="tablist"
        aria-label="Industry verticals"
        className="industry-morph__tablist"
      >
        {chips.map((ind, i) => {
          const isActive = i === active;
          const label = chipLabels[ind.slug] ?? ind.title;
          return (
            <button
              key={ind.slug}
              ref={(el) => { chipRefs.current[i] = el; }}
              type="button"
              role="tab"
              id={`industry-tab-${ind.slug}`}
              aria-selected={isActive}
              aria-controls={`industry-panel-${ind.slug}`}
              tabIndex={isActive ? 0 : -1}
              className={`industry-morph__chip${isActive ? " is-active" : ""}`}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="industry-morph__panel-wrap">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.slug}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            className="industry-morph__panel"
            initial={initial}
            animate={enter}
            exit={exit}
            transition={transition}
          >
            <p className="industry-morph__tagline">{current.tagline}</p>
            <dl className="industry-morph__stats">
              {stats.map((s) => (
                <div key={s.label} className="industry-morph__stat">
                  <dt className="industry-morph__stat-label">{s.label}</dt>
                  <dd className="industry-morph__stat-value">{s.value}</dd>
                </div>
              ))}
            </dl>
            <a className="industry-morph__link" href={href}>
              {LEARN_MORE[lang]} <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        .industry-morph {
          max-width: 720px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }
        .industry-morph__eyebrow {
          font-family: ui-monospace, "JetBrains Mono", monospace;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--amber, #f59e0b);
          margin: 0 0 0.75rem;
        }
        .industry-morph__heading {
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          font-weight: 700;
          color: var(--text, #fafafa);
          margin: 0 0 1.5rem;
          line-height: 1.15;
        }
        .industry-morph__tablist {
          display: flex;
          flex-wrap: wrap;
          gap: 0;
          border-bottom: 1px solid var(--border, #27272a);
          margin-bottom: 1.5rem;
        }
        .industry-morph__chip {
          font-family: ui-monospace, "JetBrains Mono", monospace;
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          background: transparent;
          border: 0;
          border-bottom: 2px solid transparent;
          color: var(--text-muted, #a1a1aa);
          padding: 0.75rem 1rem;
          cursor: pointer;
          transition: color 150ms ease, border-color 150ms ease;
          margin-bottom: -1px;
        }
        .industry-morph__chip:hover {
          color: var(--text, #fafafa);
        }
        .industry-morph__chip:focus-visible {
          outline: 2px solid var(--amber, #f59e0b);
          outline-offset: 2px;
        }
        .industry-morph__chip.is-active {
          color: var(--amber, #f59e0b);
          border-bottom-color: var(--amber, #f59e0b);
        }
        .industry-morph__panel-wrap {
          position: relative;
          min-height: 180px;
        }
        .industry-morph__panel {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .industry-morph__tagline {
          font-size: 1.125rem;
          line-height: 1.5;
          color: var(--text, #fafafa);
          margin: 0;
        }
        .industry-morph__stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
          margin: 0;
          padding: 0;
        }
        .industry-morph__stat {
          border-left: 2px solid var(--amber, #f59e0b);
          padding: 0.25rem 0 0.25rem 0.75rem;
        }
        .industry-morph__stat-value {
          font-family: ui-monospace, "JetBrains Mono", monospace;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text, #fafafa);
          margin: 0.125rem 0 0 0;
          font-variant-numeric: tabular-nums;
        }
        .industry-morph__stat-label {
          font-family: ui-monospace, "JetBrains Mono", monospace;
          font-size: 0.625rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted, #a1a1aa);
          margin: 0;
        }
        .industry-morph__link {
          font-family: ui-monospace, "JetBrains Mono", monospace;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--amber, #f59e0b);
          text-decoration: none;
          letter-spacing: 0.03em;
          align-self: flex-start;
          border-bottom: 1px solid transparent;
          transition: border-color 150ms ease;
        }
        .industry-morph__link:hover,
        .industry-morph__link:focus-visible {
          border-bottom-color: var(--amber, #f59e0b);
          outline: none;
        }
        @media (max-width: 560px) {
          .industry-morph__stats {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
