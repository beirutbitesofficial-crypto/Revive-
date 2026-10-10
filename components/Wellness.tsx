"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useSection } from "@/lib/reveal";
import { site } from "@/lib/site";
import { Arrow } from "./Hero";
import SectionHead from "./SectionHead";

const TREATMENTS = [
  { n: "i.", t: "Sauna", d: "Heat that loosens everything you brought in.", tone: "from-[#E0312A] to-[#7A1A10]" },
  { n: "ii.", t: "Ice Bath", d: "Cold that resets it.", tone: "from-[#A8E1F0] to-[#2C6A7C]" },
  { n: "iii.", t: "Presso\u00ADtherapy", d: "Compression recovery for heavy legs.", tone: "from-[#8B3DFF] to-[#3A1670]" },
  { n: "iv.", t: "Cupping & Recovery", d: "Cupping and recovery tools to finish the session.", tone: "from-[#ECE3CE] to-[#B9A985]" },
];

export default function Wellness() {
  const root = useRef<HTMLElement>(null);

  useSection(root, ({ q }) => {
    // Hot → cold: the section cools and the thermometer drops as you scroll through it.
    const temp = q(".temp-num")[0];
    const o = { v: 90 };
    gsap
      .timeline({ scrollTrigger: { trigger: root.current, start: "top 60%", end: "bottom 70%", scrub: true } })
      .to(o, { v: 3, ease: "none", onUpdate: () => (temp.textContent = String(Math.round(o.v))) }, 0)
      .fromTo(q(".temp-fill"), { scaleY: 1 }, { scaleY: 0.06, ease: "none" }, 0)
      .fromTo(q(".temp-fill"), { backgroundColor: "#E0312A" }, { backgroundColor: "#A8E1F0", ease: "none" }, 0)
      .fromTo(q(".hot-glow"), { autoAlpha: 1 }, { autoAlpha: 0, ease: "none" }, 0)
      .fromTo(q(".cold-glow"), { autoAlpha: 0 }, { autoAlpha: 1, ease: "none" }, 0);

    gsap.fromTo(q(".tr-card"), { y: 80, rotate: (i) => (i % 2 ? 4 : -4), autoAlpha: 0 }, { y: 0, rotate: 0, autoAlpha: 1, stagger: 0.12, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: q(".tr-grid")[0], start: "top 85%" } });
  });

  return (
    <section ref={root} id="wellness" className="relative overflow-hidden bg-ink px-4 py-24 md:px-10 md:py-36">
      <div className="hot-glow pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 15% 20%, rgba(224,49,42,0.35), transparent 70%)" }} aria-hidden="true" />
      <div className="cold-glow pointer-events-none absolute inset-0 opacity-0" style={{ background: "radial-gradient(ellipse 70% 60% at 85% 85%, rgba(168,225,240,0.28), transparent 70%)" }} aria-hidden="true" />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <SectionHead n="05" eyebrow="Wellness by URBN V" title="Recovery, without leaving the club." titleClass="text-[11vw] md:text-[6vw] max-w-[13ch]" />
            <p className="rv mt-8 max-w-[56ch] text-lg leading-relaxed text-cream/80">
              URBN V brings recovery into The Revive Club, giving you a place to reset after the gym, court or class. Sauna, ice bath and recovery treatments sit inside the same club, so recovery becomes part of the session — not another stop.
            </p>
          </div>

          {/* thermometer */}
          <div className="rv flex items-end gap-5 md:flex-col md:items-center">
            <div className="relative h-48 w-10 overflow-hidden rounded-full border-2 border-cream/30 md:h-72 md:w-12">
              <div className="temp-fill absolute inset-x-1 bottom-1 top-1 origin-bottom rounded-full bg-ember" />
            </div>
            <p className="font-mono leading-none">
              <span className="temp-num font-wide text-[18vw] tabular-nums md:text-[7vw]">90</span>
              <span className="align-top text-2xl md:text-3xl">°C</span>
            </p>
          </div>
        </div>

        <p className="rv mt-12 font-mono text-xs uppercase tracking-[0.3em] text-cream/60">
          Sauna &nbsp;•&nbsp; Ice bath &nbsp;•&nbsp; Pressotherapy &nbsp;•&nbsp; Cupping &nbsp;•&nbsp; Recovery tools
        </p>

        <div className="tr-grid mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TREATMENTS.map((t) => (
            <a
              key={t.t}
              href={site.app}
              target="_blank"
              rel="noopener noreferrer"
              className={`tr-card group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[28px] bg-gradient-to-br p-6 text-ink ${t.tone}`}
            >
              <span className="font-mono text-sm font-bold">{t.n}</span>
              <span className="pointer-events-none absolute -right-6 top-6 font-wide text-[9rem] leading-none text-ink/10 transition-transform duration-700 group-hover:-translate-x-4" aria-hidden="true">
                {t.n.replace(".", "")}
              </span>
              <span>
                <span className="block font-wide text-3xl uppercase leading-none [hyphens:auto] md:text-[2.1rem]" lang="en">
                  {t.t}
                </span>
                <span className="mt-3 block text-sm text-ink/75">{t.d}</span>
              </span>
            </a>
          ))}
        </div>

        <a href={site.app} target="_blank" rel="noopener noreferrer" className="rv group mt-10 inline-flex min-h-12 items-center gap-3 rounded-full bg-ice px-6 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-ink transition-colors hover:bg-cream">
          Book a recovery session <Arrow />
        </a>
      </div>
    </section>
  );
}
