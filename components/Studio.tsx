"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useSection } from "@/lib/reveal";
import { site } from "@/lib/site";
import { Arrow } from "./Hero";
import SectionHead from "./SectionHead";

const ROOMS = [
  { t: "HIIT", d: "Fast, coach-led conditioning sessions built around work intervals, strength and intensity.", img: "hiit", neon: "text-ember", alt: "A HIIT class under red neon frames" },
  { t: "Cycling", d: "Ride-based sessions built around pace, resistance and conditioning.", img: "cycling", neon: "text-volt", alt: "Riders on bikes inside a tunnel of coloured neon" },
];

export default function Studio() {
  const root = useRef<HTMLElement>(null);

  useSection(root, ({ q }) => {
    // Neon tubes flicker on as each room comes into view.
    q(".st-card").forEach((card) => {
      const neon = card.querySelector(".neon");
      gsap
        .timeline({ scrollTrigger: { trigger: card, start: "top 75%" } })
        .fromTo(neon, { opacity: 0 }, { opacity: 1, duration: 0.05 })
        .to(neon, { opacity: 0.2, duration: 0.05 })
        .to(neon, { opacity: 1, duration: 0.05, delay: 0.08 })
        .to(neon, { opacity: 0.4, duration: 0.04, delay: 0.1 })
        .to(neon, { opacity: 1, duration: 0.2 })
        .fromTo(card.querySelector("img"), { filter: "brightness(0.2)" }, { filter: "brightness(1)", duration: 0.8 }, 0.1);
    });
    gsap.fromTo(q(".st-big"), { xPercent: 0 }, { xPercent: -30, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
  });

  return (
    <section ref={root} id="studio" className="relative overflow-hidden bg-[#09040A] px-4 py-24 md:px-10 md:py-36">
      <p className="st-big pointer-events-none absolute left-0 top-[38%] select-none whitespace-nowrap font-wide text-[26vw] uppercase leading-none text-outline [--outline:rgba(139,61,255,0.35)]" aria-hidden="true">
        No guesswork · No guesswork
      </p>

      <div className="relative mx-auto max-w-[1600px]">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
          <SectionHead n="06" eyebrow="Studio Rooms" title="Cycling. HIIT. No guesswork." titleClass="text-[10.5vw] md:text-[6.2vw]" />
          <p className="rv text-lg leading-relaxed text-cream/80 md:pb-3">
            Dedicated studio rooms for coach-led Cycling and HIIT classes. Check the live schedule, choose your session, and book through the app.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          {ROOMS.map((r, i) => (
            <article key={r.t} className={`st-card group relative ${i === 1 ? "md:mt-24" : ""}`}>
              <div className={`neon pointer-events-none absolute -inset-2 z-10 rounded-[34px] ${r.neon}`} aria-hidden="true" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/media/${r.img}.webp`} alt={r.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09040A] via-[#09040A]/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <h3 className="font-wide text-[15vw] uppercase leading-none md:text-[5.5vw]">{r.t}</h3>
                  <p className="mt-3 max-w-[40ch] text-cream/80">{r.d}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="rv mt-14 flex flex-wrap gap-3">
          <a href={site.app} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-volt px-6 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-cream transition-colors hover:bg-cream hover:text-maroon">
            Book through the app <Arrow />
          </a>
          <a href={site.app} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-cream/30 px-6 font-mono text-[11px] font-bold uppercase tracking-[0.25em] transition-colors hover:border-cream">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-ember" /> View live schedule
          </a>
        </div>
      </div>
    </section>
  );
}
