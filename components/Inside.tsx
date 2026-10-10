"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { Arrow } from "./Hero";
import SectionHead from "./SectionHead";

const ROOMS = [
  { n: "i.", title: "The Gym", body: "A fully equipped gym floor for strength, conditioning and everyday training.", img: "gym2", href: "#gym", cta: "Explore" },
  { n: "ii.", title: "The Court", body: "Academy, indoor and outdoor court rentals, and basketball events.", img: "court3", href: "#court", cta: "Explore" },
  { n: "iii.", title: "Wellness", body: "Recovery by URBN V, inside the club. Sauna, ice bath and more.", img: "redroom2", href: "#wellness", cta: "Explore" },
  { n: "iv.", title: "Studio Rooms", body: "Cycling and HIIT classes, coach-led and booked through the app.", img: "cycling", href: "#studio", cta: "Explore" },
  { n: "v.", title: "Movement", body: "Sarvam across Rise, Align and Burn — yoga, Pilates, reformer and more.", img: "pilates1", href: "#movement", cta: "Explore" },
  { n: "★", title: "Club Life", body: "HUMN · Muscle Madness · Player 1. Hang out, gear up, game — without leaving the club.", img: "reception", href: "#visit", cta: "Find us" },
];

export default function Inside() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add(MQ.desktop, () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const horizontal = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true },
        });
        gsap.fromTo(q(".in-progress"), { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true } });
        q(".in-card").forEach((card) => {
          gsap.fromTo(card.querySelector("img"), { xPercent: -10 }, { xPercent: 10, ease: "none", scrollTrigger: { trigger: card, containerAnimation: horizontal, start: "left right", end: "right left", scrub: true } });
          gsap.fromTo(card, { rotate: 3, y: 40 }, { rotate: 0, y: 0, ease: "none", scrollTrigger: { trigger: card, containerAnimation: horizontal, start: "left right", end: "left 55%", scrub: true } });
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(q(".sh-title .word"), { yPercent: 110 }, { yPercent: 0, stagger: 0.07, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 75%" } });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="inside" className="relative overflow-hidden bg-ink-2 py-24 hz:h-screen-s hz:py-0">
      <div className="flex h-full flex-col hz:justify-center">
        <div className="flex items-end justify-between gap-6 px-4 md:px-10">
          <SectionHead n="02" eyebrow="What's inside" title="One club. Everything in it." titleClass="text-[11vw] md:text-[5.2vw]" />
          <span className="relative mb-4 hidden h-[2px] w-56 shrink-0 overflow-hidden bg-cream/15 hz:block">
            <span className="in-progress absolute inset-0 origin-left bg-volt" />
          </span>
        </div>

        <div ref={track} className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:px-10 hz:mt-12 hz:w-max hz:snap-none hz:gap-7 hz:overflow-visible hz:pr-[16vw]">
          {ROOMS.map((r) => (
            <a
              key={r.title}
              href={r.href}
              className="in-card group relative flex w-[80vw] shrink-0 snap-center flex-col overflow-hidden rounded-[28px] bg-maroon sm:w-[48vw] hz:h-[60vh] hz:w-[30vw] hz:max-w-[480px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden hz:aspect-auto hz:flex-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/media/${r.img}.webp`} alt="" loading="lazy" className="absolute inset-0 h-full w-[120%] max-w-none -translate-x-[8%] object-cover transition-[filter] duration-700 group-hover:saturate-150" />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon via-maroon/10 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-ink/60 px-3 py-1.5 font-mono text-[11px] font-bold tracking-[0.2em] text-cream backdrop-blur">{r.n}</span>
              </div>
              <div className="relative -mt-16 flex flex-col gap-3 p-6">
                <h3 className="font-wide text-3xl uppercase leading-none md:text-4xl">{r.title}</h3>
                <p className="text-sm leading-relaxed text-cream/75">{r.body}</p>
                <span className="mt-2 inline-flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-cream transition-colors group-hover:text-volt">
                  {r.cta} <Arrow />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
