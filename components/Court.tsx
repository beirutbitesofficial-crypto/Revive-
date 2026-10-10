"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useSection } from "@/lib/reveal";
import { site } from "@/lib/site";
import { Arrow } from "./Hero";
import SectionHead from "./SectionHead";

const SPECS = [
  { k: "Academy", v: "Ages 4–18" },
  { k: "Courts", v: "Indoor + Outdoor" },
  { k: "Rentals", v: "Book via app" },
  { k: "Events", v: "Clinics & tournaments" },
];

const ON_COURT = [
  { t: "Academy", d: "A structured basketball program for ages 4–18, built around skill development, game IQ and confidence on court." },
  { t: "Rentals", d: "Court rentals for your group, team or private run." },
  { t: "Events", d: "Clinics, tournaments and community basketball events programmed throughout the season." },
];

function Ball({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="47" fill="#E2642A" stroke="#1a0a08" strokeWidth="3" />
      <g fill="none" stroke="#1a0a08" strokeWidth="3">
        <path d="M3 50 H97" />
        <path d="M50 3 V97" />
        <path d="M17 17 C 35 35, 35 65, 17 83" />
        <path d="M83 17 C 65 35, 65 65, 83 83" />
      </g>
    </svg>
  );
}

export default function Court() {
  const root = useRef<HTMLElement>(null);

  useSection(root, ({ q, desktop }) => {
    // Court lines draw themselves in.
    q(".court-line").forEach((el) => {
      const p = el as unknown as SVGGeometryElement;
      const L = p.getTotalLength();
      gsap.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top 70%", end: "center center", scrub: true } });
    });

    // A shot: the ball arcs across the section and drops, spinning backwards.
    const ball = q(".court-ball")[0];
    const arc = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 60%", end: "bottom 40%", scrub: 0.8 } });
    arc
      .fromTo(ball, { x: "-10vw" }, { x: desktop ? "78vw" : "70vw", ease: "none", duration: 1 }, 0)
      .fromTo(ball, { y: "40vh" }, { y: "-8vh", ease: "power2.out", duration: 0.5 }, 0)
      .to(ball, { y: "52vh", ease: "power2.in", duration: 0.5 }, 0.5)
      .fromTo(ball, { rotate: 0 }, { rotate: -900, ease: "none", duration: 1 }, 0);

    gsap.fromTo(q(".court-photo"), { yPercent: 10 }, { yPercent: -10, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
  });

  return (
    <section ref={root} id="court" className="relative overflow-hidden bg-maroon px-4 py-24 md:px-10 md:py-36">
      {/* Half-court diagram */}
      <svg viewBox="0 0 1000 600" className="pointer-events-none absolute inset-0 h-full w-full opacity-30" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g fill="none" stroke="#ECE3CE" strokeWidth="2" vectorEffect="non-scaling-stroke">
          <rect className="court-line" x="40" y="40" width="920" height="520" />
          <path className="court-line" d="M500 40 V560" />
          <circle className="court-line" cx="500" cy="300" r="70" />
          <path className="court-line" d="M40 210 H230 V390 H40" />
          <circle className="court-line" cx="230" cy="300" r="60" />
          <path className="court-line" d="M40 80 H110 A 240 240 0 0 1 110 520 H40" />
          <path className="court-line" d="M960 210 H770 V390 H960" />
          <path className="court-line" d="M960 80 H890 A 240 240 0 0 0 890 520 H960" />
        </g>
      </svg>

      <div className="court-ball pointer-events-none absolute left-0 top-0 z-20 w-[13vw] max-w-[110px] md:w-[7vw]">
        <Ball className="h-auto w-full drop-shadow-[0_18px_24px_rgba(0,0,0,0.5)]" />
      </div>

      <div className="relative mx-auto grid max-w-[1600px] gap-14 md:grid-cols-[1fr_0.85fr] md:gap-20">
        <div>
          <SectionHead n="04" eyebrow="The Court" title="Play. Train. Take the court." titleClass="text-[12.5vw] md:text-[6.4vw]" />
          <p className="rv mt-8 max-w-[56ch] text-lg leading-relaxed text-cream/85">
            Basketball sits at the center of The Revive Club, with indoor and outdoor court access for training, academy sessions, rentals and events. Come for a coached session, book the court with your group, or play where <strong className="text-cream">Wael Arakji</strong> trains.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-cream/20">
            {SPECS.map((s) => (
              <div key={s.k} className="rv bg-maroon p-5 md:p-6">
                <dt className="label text-cream/60">{s.k}</dt>
                <dd className="mt-2 font-wide text-base uppercase leading-tight [overflow-wrap:anywhere] sm:text-xl md:text-2xl">{s.v}</dd>
              </div>
            ))}
          </dl>

          <div className="rv mt-8 flex flex-wrap gap-3">
            <a href="#register" className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-cream px-6 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-maroon transition-colors hover:bg-volt hover:text-cream">
              Academy: Register <Arrow />
            </a>
            <a href={site.app} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full border border-cream/35 px-6 font-mono text-[11px] font-bold uppercase tracking-[0.25em] transition-colors hover:border-cream">
              Book via app
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="clip-img relative aspect-[3/4] overflow-hidden rounded-[28px] bg-ink">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/court1.webp" alt="Wael Arakji dribbling a basketball on court" loading="lazy" className="court-photo absolute inset-0 h-[120%] w-full -translate-y-[8%] object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-6 pt-24">
              <p className="label text-cream/70">Trains here</p>
              <p className="font-wide text-3xl uppercase">Wael Arakji</p>
            </div>
          </div>
          <div className="clip-img absolute -bottom-8 -right-2 hidden w-[58%] md:block overflow-hidden rounded-[22px] border-[6px] border-maroon md:-right-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/court3.webp" alt="The indoor court — maple floor, red benches and oval windows" loading="lazy" className="aspect-[16/10] w-full object-cover" />
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-24 max-w-[1600px]">
        <p className="label text-cream/60">What's on the court</p>
        <div className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-cream/15 md:grid-cols-3">
          {ON_COURT.map((o, i) => (
            <div key={o.t} className="rv border-cream/15 p-6 md:border-r md:p-8 md:last:border-r-0 [&:not(:last-child)]:border-b md:[&:not(:last-child)]:border-b-0">
              <p className="font-mono text-sm text-volt">0{i + 1}</p>
              <h3 className="mt-3 font-wide text-3xl uppercase">{o.t}</h3>
              <p className="mt-3 text-cream/75">{o.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
