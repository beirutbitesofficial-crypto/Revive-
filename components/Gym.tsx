"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useSection } from "@/lib/reveal";
import { Arrow } from "./Hero";
import SectionHead from "./SectionHead";

export default function Gym() {
  const root = useRef<HTMLElement>(null);

  useSection(root, ({ q }) => {
    // The sled-track strip from the gym floor slides under the photos as you scroll.
    gsap.fromTo(q(".turf"), { xPercent: 0 }, { xPercent: -25, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    gsap.fromTo(q(".gym-big"), { scale: 0.86, borderRadius: "48px" }, { scale: 1, borderRadius: "28px", ease: "none", scrollTrigger: { trigger: q(".gym-big")[0], start: "top bottom", end: "center center", scrub: true } });
    gsap.fromTo(q(".gym-outline"), { xPercent: 12 }, { xPercent: -6, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
  });

  return (
    <section ref={root} id="gym" className="relative overflow-hidden bg-ink px-4 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <SectionHead n="03" eyebrow="The Gym" title="Built for the work." titleClass="text-[14vw] md:text-[8vw]" />
          <div className="rv md:pb-3">
            <p className="text-lg leading-relaxed text-cream/80 md:text-xl">
              A fully equipped gym floor for strength, conditioning and everyday training. Train on your own, work with a coach, or build the session around what you came in to do.
            </p>
            <p className="mt-4 font-semibold text-cream">Public gym access and memberships are now open.</p>
          </div>
        </div>

        <p className="gym-outline pointer-events-none mt-10 select-none whitespace-nowrap font-wide text-[16vw] uppercase leading-none text-outline" aria-hidden="true">
          Strength · Conditioning
        </p>

        <div className="relative mt-6 grid gap-4 md:grid-cols-[2fr_1fr] md:gap-6">
          <div className="gym-big relative aspect-[3/2] overflow-hidden rounded-[28px] will-change-transform">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/gym2.webp" alt="The gym floor — racks, plates and a red sled track under zig-zag lights" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="clip-img para relative aspect-[3/4] overflow-hidden rounded-[28px] md:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/gym1.webp" alt="A member pressing dumbbells on a bench" loading="lazy" className="absolute inset-0 h-[116%] w-full object-cover" />
          </div>
        </div>

        {/* sled-track strip */}
        <div className="relative -mx-4 mt-10 overflow-hidden bg-ember py-3 md:-mx-10" aria-hidden="true">
          <div className="turf flex w-[200%] items-center">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="flex flex-1 items-center gap-3">
                <span className="font-mono text-[11px] font-bold text-cream/90">{(i % 10) * 5 + 5}</span>
                <span className="h-5 w-[3px] bg-cream/90" />
                <span className="h-2.5 w-[2px] bg-cream/60" />
                <span className="h-2.5 w-[2px] bg-cream/60" />
                <span className="h-2.5 w-[2px] bg-cream/60" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="rv inline-flex max-w-xl items-start gap-3 rounded-2xl border border-cream/15 p-4 text-sm text-cream/70">
            <span className="mt-0.5 rounded-full bg-cream px-2 py-0.5 font-mono text-[10px] font-bold text-maroon">18+</span>
            Gym-floor access is 18+. Members aged 16–17 may train with a coach.
          </p>
          <div className="rv flex flex-wrap gap-3">
            <a href="#visit" className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-cream px-6 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-maroon transition-colors hover:bg-volt hover:text-cream">
              Visit the club <Arrow />
            </a>
            <a href="#register" className="inline-flex min-h-12 items-center rounded-full border border-cream/30 px-6 font-mono text-[11px] font-bold uppercase tracking-[0.25em] transition-colors hover:border-cream">
              Register
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
