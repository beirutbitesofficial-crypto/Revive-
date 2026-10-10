"use client";

/**
 * THE PULSE — pinned, scroll-scrubbed scene (the "craft scene" of this site).
 * A heart-rate line is drawn across the screen as you scroll through one visit:
 *
 *   walk in (62) → gym (128) → court (164) → studio (182) → ice bath (58) → revived (60)
 *
 * The line is one SVG path, 1000 units wide per stage. Scroll progress draws it
 * (stroke-dashoffset) and the pen tip's real x decides the stage, the BPM readout,
 * and the room colour — so line, numbers and colour can never drift apart.
 */

import { useMemo, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const STAGES = [
  { word: "Walk in", line: "Open from six on weekdays. The sea is right there.", bpm: 62, bg: "#0F0706", fg: "#ECE3CE", stroke: "#ECE3CE" },
  { word: "Lift", line: "The gym floor. Strength, conditioning, the everyday work.", bpm: 128, bg: "#5C1F1B", fg: "#ECE3CE", stroke: "#ECE3CE" },
  { word: "Play", line: "Two courts, indoor and out. Where Wael Arakji trains.", bpm: 164, bg: "#8E1A14", fg: "#ECE3CE", stroke: "#FFD9C9" },
  { word: "Burn", line: "Cycling and HIIT under neon. Coach-led, no guesswork.", bpm: 182, bg: "#25103F", fg: "#ECE3CE", stroke: "#8B3DFF" },
  { word: "Ice", line: "Sauna, then ice bath. Recovery by URBN V, inside the club.", bpm: 58, bg: "#0B2830", fg: "#E6F7FC", stroke: "#A8E1F0" },
  { word: "Revived", line: "You'll feel different here.", bpm: 60, bg: "#ECE3CE", fg: "#5C1F1B", stroke: "#5C1F1B" },
];

const SEG = 1000;
const H = 200;
const MID = 110;

/** One stage of ECG: beats get closer and taller as the BPM climbs. */
function buildPath() {
  let d = `M0 ${MID}`;
  STAGES.forEach((s, i) => {
    const x0 = i * SEG;
    const beats = Math.max(2, Math.round(s.bpm / 30));
    const gap = SEG / beats;
    const amp = Math.min(88, 34 + (s.bpm - 58) * 0.42);
    for (let b = 0; b < beats; b++) {
      const c = x0 + gap * (b + 0.5);
      d +=
        ` L${c - 70} ${MID} Q${c - 55} ${MID - 9} ${c - 40} ${MID}` + // P wave
        ` L${c - 12} ${MID} L${c - 6} ${MID + 10}` + // Q
        ` L${c} ${MID - amp}` + // R
        ` L${c + 8} ${MID + amp * 0.38}` + // S
        ` L${c + 16} ${MID}` +
        ` L${c + 40} ${MID} Q${c + 62} ${MID - 16} ${c + 84} ${MID}`; // T wave
    }
    d += ` L${x0 + SEG} ${MID}`;
  });
  return d;
}

export default function Pulse() {
  const root = useRef<HTMLElement>(null);
  const d = useMemo(buildPath, []);
  const total = STAGES.length * SEG;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const stage = q(".pulse-stage")[0];
        const track = q(".pulse-track")[0];
        const path = q(".pulse-path")[0] as unknown as SVGPathElement;
        const glow = q(".pulse-glow")[0] as unknown as SVGPathElement;
        const pen = q(".pulse-pen")[0];
        const bpmEl = q(".pulse-bpm")[0];
        const idxEl = q(".pulse-idx")[0];
        const bar = q(".pulse-bar")[0];
        const words = q(".pulse-word");
        const lines = q(".pulse-line");
        const L = path.getTotalLength();
        let current = -1;

        gsap.set([path, glow], { strokeDasharray: L, strokeDashoffset: L });
        gsap.set(words, { yPercent: 110, autoAlpha: 0 });
        gsap.set(lines, { y: 20, autoAlpha: 0 });

        const show = (i: number) => {
          if (i === current) return;
          const prev = current;
          current = i;
          if (prev >= 0) {
            gsap.to(words[prev], { yPercent: i > prev ? -110 : 110, autoAlpha: 0, duration: 0.6, ease: "power3.in", overwrite: true });
            gsap.to(lines[prev], { y: -16, autoAlpha: 0, duration: 0.35, overwrite: true });
          }
          gsap.fromTo(words[i], { yPercent: i > prev ? 110 : -110, autoAlpha: 1 }, { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: "expo.out", overwrite: true, delay: 0.1 });
          gsap.fromTo(lines[i], { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: "expo.out", overwrite: true, delay: 0.25 });
          idxEl.textContent = `${String(i + 1).padStart(2, "0")} / ${String(STAGES.length).padStart(2, "0")}`;
        };

        const lerp = (a: string, b: string, t: number) => gsap.utils.interpolate(a, b, t) as string;

        const render = (p: number) => {
          const len = L * p;
          gsap.set([path, glow], { strokeDashoffset: L - len });
          const pt = path.getPointAtLength(Math.max(0.001, len));

          // Keep the pen at ~62% of the screen once the line gets there.
          const vw = window.innerWidth;
          const pxPerUnit = (vw * STAGES.length) / total;
          const tipPx = pt.x * pxPerUnit;
          gsap.set(track, { x: Math.min(0, vw * 0.62 - tipPx) });
          gsap.set(pen, { x: pt.x * pxPerUnit, y: (pt.y / H) * track.clientHeight });

          // Stage, colours and BPM all come from where the pen actually is.
          const f = Math.min(STAGES.length - 1e-4, pt.x / SEG);
          const i = Math.floor(f);
          const t = f - i;
          const blend = gsap.utils.clamp(0, 1, (t - 0.72) / 0.28);
          const next = STAGES[Math.min(i + 1, STAGES.length - 1)];
          const s = STAGES[i];
          stage.style.backgroundColor = lerp(s.bg, next.bg, blend);
          stage.style.color = lerp(s.fg, next.fg, blend);
          const stroke = lerp(s.stroke, next.stroke, blend);
          path.style.stroke = stroke;
          glow.style.stroke = stroke;
          pen.style.backgroundColor = stroke;
          pen.style.color = stroke;
          bpmEl.textContent = String(Math.round(s.bpm + (next.bpm - s.bpm) * blend));
          bar.style.transform = `scaleX(${p})`;
          show(blend > 0.5 ? Math.min(i + 1, STAGES.length - 1) : i);
        };

        render(0);
        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 5.5}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => render(self.progress),
          onRefresh: (self) => render(self.progress),
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="pulse" aria-label="One visit, one heart rate" className="relative">
      {/* Animated scene */}
      <div className="pulse-stage relative h-screen-s min-h-[560px] overflow-hidden bg-ink text-cream motion-reduce:hidden">
        <div className="absolute inset-x-0 top-0 flex items-start justify-between px-4 pt-24 md:px-10 md:pt-28">
          <div>
            <p className="label opacity-60">How a visit feels</p>
            <p className="pulse-idx mt-2 font-mono text-sm opacity-80">01 / 06</p>
          </div>
          <div className="text-right">
            <p className="flex items-baseline justify-end gap-2 font-mono">
              <span className="pulse-bpm text-[14vw] font-bold leading-none tabular-nums md:text-[6vw]">62</span>
              <span className="text-sm opacity-70">BPM</span>
            </p>
            <p className="label mt-2 flex items-center justify-end gap-2 opacity-60">
              <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-current" /> Live
            </p>
          </div>
        </div>

        {/* ECG line: 100vw per stage, translated so the pen stays in view */}
        <div className="absolute inset-x-0 top-[44%] h-[26vh] -translate-y-1/2 md:top-1/2 md:h-[30vh]">
          <div className="pulse-track absolute inset-y-0 left-0 will-change-transform" style={{ width: `${STAGES.length * 100}vw` }}>
            <svg viewBox={`0 0 ${total} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
              <line x1="0" x2={total} y1={MID} y2={MID} stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="4 8" />
              <path className="pulse-glow" d={d} fill="none" strokeWidth="9" strokeOpacity="0.25" strokeLinejoin="round" style={{ filter: "blur(6px)" }} />
              <path className="pulse-path" d={d} fill="none" stroke="#ECE3CE" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
            <span className="pulse-pen absolute left-0 top-0 -ml-2 -mt-2 h-4 w-4 rounded-full bg-cream shadow-[0_0_24px_6px_currentColor]" />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 px-4 pb-8 md:px-10 md:pb-10">
          <div className="relative h-[14.5vw] overflow-hidden md:h-[11vw]">
            {STAGES.map((s) => (
              <p key={s.word} className="pulse-word absolute inset-x-0 bottom-0 whitespace-nowrap font-wide text-[13.5vw] uppercase leading-[0.9] md:text-[10.5vw]">
                {s.word}
              </p>
            ))}
          </div>
          <div className="relative mt-4 h-12 md:h-8">
            {STAGES.map((s) => (
              <p key={s.word} className="pulse-line absolute inset-x-0 top-0 max-w-[46ch] text-base opacity-80 md:text-lg">
                {s.line}
              </p>
            ))}
          </div>
          <div className="mt-5 h-[2px] w-full bg-current/15">
            <div className="pulse-bar h-full origin-left scale-x-0 bg-current" />
          </div>
        </div>
      </div>

      {/* Reduced motion: the same story, still */}
      <div className="hidden bg-ink px-4 py-24 motion-reduce:block md:px-10">
        <p className="label text-cream/60">How a visit feels</p>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {STAGES.map((s) => (
            <li key={s.word} className="rounded-3xl p-6" style={{ backgroundColor: s.bg, color: s.fg }}>
              <p className="font-mono text-sm">{s.bpm} BPM</p>
              <p className="mt-2 font-wide text-4xl uppercase">{s.word}</p>
              <p className="mt-2 opacity-80">{s.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
