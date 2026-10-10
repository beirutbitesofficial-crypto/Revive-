"use client";

import { useEffect, useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { site } from "@/lib/site";
import Wordmark from "./Logo";
import { SplitWords } from "./SplitText";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  // Portrait phones get a 9:16 cut of the film (1.4 MB instead of 2.7 MB).
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.src = window.matchMedia("(max-aspect-ratio: 4/5)").matches ? "/media/hero-mobile.mp4" : "/media/hero.mp4";
    v.play().catch(() => {});
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add(MQ, (context) => {
        const { desktop, reduced } = context.conditions as Record<keyof typeof MQ, boolean>;
        if (reduced) {
          gsap.set(q(".hero-reveal"), { autoAlpha: 1 });
          return;
        }

        // ---- Intro: film fades up, REVIVE drops in letter by letter, the V's lines strike last ----
        gsap
          .timeline({ defaults: { ease: "expo.out" }, delay: 0.1 })
          .set(q(".hero-reveal"), { autoAlpha: 1 })
          .fromTo(q(".hero-film"), { scale: 1.3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 2.6 }, 0)
          .fromTo(q(".hero-word .char"), { yPercent: 110 }, { yPercent: 0, duration: 1.4, stagger: 0.07 }, 0.35)
          .fromTo(q(".hero-word .v-lines"), { x: -40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.9, ease: "power4.out" }, 1.05)
          .fromTo(q(".hero-title .word"), { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.06 }, 0.95)
          .fromTo(q(".hero-fade"), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.08 }, 1.3);

        // ---- Scroll out: the film shrinks into a framed card, the wordmark lifts off ----
        gsap
          .timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } })
          .to(q(".hero-frame"), { clipPath: desktop ? "inset(7% 4% 7% 4% round 36px)" : "inset(5% 3% 5% 3% round 24px)" }, 0)
          .to(q(".hero-film"), { scale: 1.12 }, 0)
          .to(q(".hero-word"), { yPercent: -60, letterSpacing: "0.02em" }, 0)
          .to(q(".hero-copy"), { yPercent: -40, autoAlpha: 0 }, 0)
          .to(q(".hero-chrome"), { autoAlpha: 0, duration: 0.25 }, 0);

        if (desktop) {
          const film = q(".hero-film")[0];
          const word = q(".hero-word")[0];
          const fx = gsap.quickTo(film, "x", { duration: 1.4, ease: "power3.out" });
          const fy = gsap.quickTo(film, "y", { duration: 1.4, ease: "power3.out" });
          const wx = gsap.quickTo(word, "x", { duration: 1.2, ease: "power3.out" });
          const onMove = (e: PointerEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            fx(nx * 22);
            fy(ny * 14);
            wx(nx * -16);
          };
          window.addEventListener("pointermove", onMove, { passive: true });
          return () => window.removeEventListener("pointermove", onMove);
        }
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="top" className="relative h-screen-s min-h-[600px] w-full overflow-hidden bg-ink" aria-label="The Revive Club — Beirut Waterfront">
      <div className="hero-frame absolute inset-0 overflow-hidden [clip-path:inset(0_0_0_0_round_0px)]">
        <div className="hero-film hero-reveal invisible-pre absolute -inset-[3%] will-change-transform">
          <video
            ref={video}
            className="h-full w-full object-cover"
            poster="/media/hero-poster.jpg"
            muted
            loop
            playsInline
            autoPlay
            preload="none"
            aria-hidden="true"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/10 to-ink/90" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-maroon/25 mix-blend-multiply" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 vignette" aria-hidden="true" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-6 md:px-10 md:pb-8">
        <div className="hero-copy mb-auto mt-[22svh] max-w-[1600px] md:mt-[20vh]">
          <p className="hero-fade hero-reveal invisible-pre label flex items-center gap-3 text-cream/80">
            <span className="h-px w-8 bg-volt md:w-12" />
            The Revive Club · {site.area}
          </p>
          <h1 className="hero-title hero-reveal invisible-pre mt-5 max-w-[14ch] font-wide text-[11.5vw] uppercase leading-[0.9] md:text-[7vw]">
            <span className="sr-only">{site.tagline}</span>
            <span aria-hidden="true">
              <SplitWords text="You'll feel different here." />
            </span>
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#register" className="hero-fade hero-reveal invisible-pre group inline-flex min-h-12 items-center gap-3 rounded-full bg-cream px-6 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-maroon transition-colors hover:bg-volt hover:text-cream">
              Register
              <Arrow />
            </a>
            <a href="#visit" className="hero-fade hero-reveal invisible-pre inline-flex min-h-12 items-center gap-3 rounded-full border border-cream/35 px-6 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-cream backdrop-blur-sm transition-colors hover:border-cream">
              Visit the club
            </a>
          </div>
        </div>

        <div className="hero-word hero-reveal invisible-pre will-change-transform">
          <Wordmark className="w-full justify-between text-[21.5vw] text-cream" />
        </div>
      </div>

      <div className="hero-chrome pointer-events-none absolute inset-0 z-10">
        <div className="hero-fade hero-reveal invisible-pre absolute right-4 top-[22svh] hidden flex-col items-end gap-2 text-right md:right-10 md:top-[20vh] md:flex">
          <span className="label text-cream/60">Est. {site.since}</span>
          <span className="label inline-flex items-center gap-2 text-cream">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-volt" /> Now open
          </span>
        </div>
        <div className="hero-fade hero-reveal invisible-pre absolute right-4 top-1/2 hidden -translate-y-1/2 label text-cream/40 [writing-mode:vertical-rl] md:right-10 lg:block">
          Gym · Court · Movement · Recovery
        </div>
      </div>
    </section>
  );
}

export function Arrow({ className = "h-3 w-5" }: { className?: string }) {
  return (
    <svg className={`${className} transition-transform duration-300 group-hover:translate-x-1`} viewBox="0 0 24 12" fill="none" aria-hidden="true">
      <path d="M0 6 H22 M17 1 L22 6 L17 11" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
