"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useSection } from "@/lib/reveal";
import { site } from "@/lib/site";
import { Arrow } from "./Hero";
import SectionHead from "./SectionHead";

const ROOMS = [
  { t: "Rise", room: "Rise Room", d: "Yoga, mat Pilates, mobility and strength.", img: "yoga1", bg: "bg-cream-2", fg: "text-maroon", alt: "The Rise room — aerial silks, warm wood floor and daylight" },
  { t: "Align", room: "Align Room", d: "Reformer classes, from beginner to dynamic, contemporary and classic.", img: "pilates1", bg: "bg-plum", fg: "text-cream", alt: "The Align room — rows of reformers with burgundy cushions" },
  { t: "Burn", room: "Burn Room", d: "Infrared classes including Pilates, barre, strength and higher-intensity formats.", img: "redroom2", bg: "bg-ember", fg: "text-cream", alt: "The Burn room — glowing red infrared studio with mats" },
];

export default function Movement() {
  const root = useRef<HTMLElement>(null);

  useSection(root, ({ q }) => {
    // Stacked cards: each one pins under the next and shrinks back into the stack.
    const cards = q(".mv-card");
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      gsap.to(card.querySelector(".mv-inner"), {
        scale: 0.9 + i * 0.02,
        filter: "brightness(0.8)",
        ease: "none",
        scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top 12%", scrub: true },
      });
    });
    cards.forEach((card) => {
      gsap.fromTo(card.querySelector("img"), { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "top 12%", scrub: true } });
    });
  });

  return (
    <section ref={root} id="movement" className="relative bg-cream px-4 py-24 text-maroon md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <SectionHead n="07" eyebrow="Movement by Sarvam" title="Rise. Align. Burn." accent="text-plum" titleClass="text-[14vw] md:text-[7.6vw]" />
          <p className="rv text-lg leading-relaxed text-maroon/80 md:pb-3">
            Movement at The Revive Club is run by Sarvam across three dedicated rooms, with a full class lineup spanning yoga, mat Pilates, reformer, mobility, strength, infrared classes and more. Every class is booked through the app.
          </p>
        </div>

        <div className="mt-14">
          {ROOMS.map((r, i) => (
            <article key={r.t} className="mv-card sticky top-[10svh] pb-6 md:top-[12vh]" style={{ zIndex: i + 1 }}>
              <div className={`mv-inner origin-top overflow-hidden rounded-[32px] ${r.bg} ${r.fg} shadow-[0_-20px_60px_rgba(15,7,6,0.18)]`}>
                <div className="grid md:h-[72vh] md:grid-cols-[1fr_1.15fr]">
                  <div className="flex flex-col justify-between gap-8 p-6 md:p-10">
                    <div className="flex items-center justify-between">
                      <p className="label opacity-70">{r.room}</p>
                      <p className="font-mono text-sm opacity-70">0{i + 1} / 03</p>
                    </div>
                    <div>
                      <h3 className="font-wide text-[17vw] uppercase leading-[0.85] md:text-[9vw]">{r.t}</h3>
                      <p className="mt-5 max-w-[34ch] text-lg opacity-85">{r.d}</p>
                    </div>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/media/${r.img}.webp`} alt={r.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="rv mt-10 flex flex-wrap gap-3">
          <a href={site.app} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-maroon px-6 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-cream transition-colors hover:bg-volt">
            Book through the app <Arrow />
          </a>
          <a href={site.app} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full border-2 border-maroon/40 px-6 font-mono text-[11px] font-bold uppercase tracking-[0.25em] transition-colors hover:border-maroon">
            View live schedule
          </a>
        </div>
      </div>
    </section>
  );
}
