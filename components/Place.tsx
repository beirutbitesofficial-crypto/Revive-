"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useSection } from "@/lib/reveal";
import SectionHead from "./SectionHead";
import { SplitWords } from "./SplitText";

const COPY =
  "The Revive Club brings the gym, recovery, basketball, gaming and community into one waterfront space in Beirut. Train in the gym, move with Sarvam, reset with URBN V, grab a coffee at HUMN, gear up at Muscle Madness, game at Player 1, and shoot on a court where Wael Arakji trains.";

const STATS = [
  { n: 1, l: "Club" },
  { n: 3, l: "Movement rooms" },
  { n: 2, l: "Basketball courts" },
];

const CREW = ["Sarvam", "URBN V", "HUMN", "Muscle Madness", "Player 1"];

export default function Place() {
  const root = useRef<HTMLElement>(null);

  useSection(root, ({ q }) => {
    gsap.fromTo(
      q(".place-copy .word"),
      { opacity: 0.12 },
      { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: q(".place-copy")[0], start: "top 80%", end: "bottom 50%", scrub: true } }
    );
    gsap.fromTo(q(".place-float"), { yPercent: 30 }, { yPercent: -30, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
  });

  return (
    <section ref={root} id="place" className="relative overflow-hidden bg-cream px-4 py-24 text-maroon md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionHead n="01" eyebrow="The Place" title="The sea on one side. The club on the other." accent="text-plum" titleClass="text-[10.5vw] md:text-[5.6vw] max-w-[16ch]" />

        <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-[1.15fr_1fr] md:gap-20">
          <div>
            <p className="place-copy text-[6.2vw] font-medium leading-[1.2] tracking-tight md:text-[2.15vw]">
              <span className="sr-only">{COPY}</span>
              <span aria-hidden="true">
                <SplitWords text={COPY} mask={false} />
              </span>
            </p>
            <p className="rv mt-8 max-w-[52ch] text-base leading-relaxed text-maroon/70">
              Come for the class, the session, or the court — and stay for the feeling of being part of something.
            </p>

            <div className="mt-12 grid grid-cols-3 border-t-2 border-maroon">
              {STATS.map((s) => (
                <div key={s.l} className="rv border-r-2 border-maroon pr-3 pt-5 last:border-r-0 [&:not(:first-child)]:pl-4 md:[&:not(:first-child)]:pl-6">
                  <p className="font-wide text-[16vw] leading-none md:text-[7vw]" data-count={s.n}>
                    {s.n}
                  </p>
                  <p className="mt-3 label text-maroon/70">{s.l}</p>
                </div>
              ))}
            </div>

            <ul className="mt-10 flex flex-wrap gap-2">
              {CREW.map((c) => (
                <li key={c} className="rv rounded-full border-2 border-maroon/80 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="clip-img para relative aspect-[4/5] overflow-hidden rounded-[28px] bg-maroon-deep">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/reception.webp" alt="The Revive Club reception — cream walls, red desk and soft curved light" loading="lazy" className="absolute inset-0 h-[116%] w-full object-cover" />
            </div>
            <div className="place-float absolute -bottom-10 -left-6 w-[52%] overflow-hidden rounded-[22px] border-[6px] border-cream shadow-2xl md:-left-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/outdoor1.webp" alt="The outdoor basketball court under a blue Beirut sky" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </div>
            <p className="absolute -right-2 -top-6 rotate-6 rounded-full bg-volt px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-cream md:-right-6">
              Beirut Waterfront
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
