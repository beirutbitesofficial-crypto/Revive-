import { useId } from "react";

/**
 * REVIVE wordmark, after the letters on the building: heavy wide caps,
 * the first V split by violet speed-lines. Each letter is a `.char` so
 * GSAP can drop them in one by one.
 */
export function VMark({ className = "", lines = true }: { className?: string; lines?: boolean }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 100 82" className={className} aria-hidden="true">
      <defs>
        <clipPath id={`v-${id}`}>
          <path d="M0 0 H29 L50 56 L71 0 H100 L66 82 H34 Z" />
        </clipPath>
      </defs>
      <path d="M0 0 H29 L50 56 L71 0 H100 L66 82 H34 Z" fill="currentColor" />
      {lines && (
        <g clipPath={`url(#v-${id})`} className="v-lines">
          <path d="M0 0 H29 L50 56 L50 82 H34 Z" fill="var(--color-volt)" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={50 + i * 5.2} y={-4} width={2.2} height={92} fill="var(--color-volt)" transform={`skewX(-18) translate(${18 + i * 1.2} 0)`} />
          ))}
        </g>
      )}
    </svg>
  );
}

export default function Wordmark({ className = "", accent = true }: { className?: string; accent?: boolean }) {
  const letters = ["R", "E", "V", "I", "V", "E"];
  return (
    <span className={`inline-flex items-baseline font-wide leading-none ${className}`} aria-label="Revive">
      {letters.map((l, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.04em] -mb-[0.04em]" aria-hidden="true">
          {i === 2 ? (
            <span className="char inline-block">
              <VMark lines={accent} className="inline-block h-[0.703em] w-[0.86em] -translate-y-[0.097em]" />
            </span>
          ) : (
            <span className="char inline-block">{l}</span>
          )}
        </span>
      ))}
    </span>
  );
}
