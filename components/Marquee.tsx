"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type Row = { items: string[]; reverse?: boolean; tone: "cream" | "volt" | "maroon"; dur?: number };

const TONES = {
  cream: "bg-cream text-maroon",
  volt: "bg-volt text-cream",
  maroon: "bg-maroon text-cream",
};

/** Crossed ticker tapes. They lean harder the faster you scroll. */
export default function Marquee({ rows, className = "" }: { rows: Row[]; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tapes = gsap.utils.toArray<HTMLElement>(".tape-inner", root.current);
        const setters = tapes.map((t) => gsap.quickTo(t, "skewX", { duration: 0.5, ease: "power3.out" }));
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = gsap.utils.clamp(-14, 14, self.getVelocity() / -180);
            setters.forEach((s, i) => s(i % 2 ? -v : v));
          },
          onLeave: () => setters.forEach((s) => s(0)),
          onLeaveBack: () => setters.forEach((s) => s(0)),
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className={`relative z-10 overflow-hidden py-10 md:py-14 ${className}`} aria-hidden="true">
      {rows.map((r, i) => (
        <div key={i} className={`${TONES[r.tone]} ${i % 2 ? "-rotate-2 -mt-2" : "rotate-[1.5deg]"} relative w-[110%] -translate-x-[5%] py-3 md:py-4`}>
          <div className="tape-inner">
            <div className={`marquee-track flex w-max ${r.reverse ? "reverse" : ""}`} style={{ ["--marquee-dur" as string]: `${r.dur ?? 30}s` }}>
              {[0, 1].map((k) => (
                <div key={k} className="flex shrink-0 items-center">
                  {[...r.items, ...r.items].map((t, j) => (
                    <span key={j} className="flex items-center whitespace-nowrap font-wide text-[7vw] uppercase leading-none md:text-[3.4vw]">
                      <span className="px-5 md:px-8">{t}</span>
                      <span className={`inline-block h-[0.32em] w-[0.32em] rounded-full ${r.tone === "volt" ? "bg-cream" : "bg-volt"}`} />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
