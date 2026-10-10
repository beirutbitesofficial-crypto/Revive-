"use client";

import { gsap, MQ, useGSAP } from "./gsap";

/**
 * Shared scroll reveals so every section enters the same way:
 * headline words rise out of their masks, `.rv` blocks fade up, `.clip-img` frames wipe open.
 * Call inside a gsap.matchMedia() "no-preference" block.
 */
export function revealSection(root: HTMLElement) {
  const q = gsap.utils.selector(root);

  q(".sh-title").forEach((t) => {
    gsap.fromTo(t.querySelectorAll(".word"), { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.07, ease: "expo.out", scrollTrigger: { trigger: t, start: "top 88%" } });
  });

  q(".rv").forEach((el) => {
    gsap.fromTo(el, { y: 36, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } });
  });

  q(".clip-img").forEach((el) => {
    const img = el.querySelector("img");
    gsap
      .timeline({ scrollTrigger: { trigger: el, start: "top 85%" } })
      .fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" })
      .fromTo(img, { scale: 1.35 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0.2);
  });

  q(".para").forEach((el) => {
    const img = el.querySelector("img");
    gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
  });

  q("[data-count]").forEach((el) => {
    const to = Number(el.dataset.count);
    const o = { v: 0 };
    gsap.to(o, { v: to, duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" }, onUpdate: () => (el.textContent = String(Math.round(o.v))) });
  });
}

/**
 * Standard section hook: shared reveals + optional extra animation for this section.
 * `extra` runs only when motion is welcome and receives { desktop } plus a scoped selector.
 */
export function useSection(
  root: React.RefObject<HTMLElement | null>,
  extra?: (ctx: { desktop: boolean; q: (s: string) => HTMLElement[] }) => void | (() => void)
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ, (context) => {
        const { desktop, reduced } = context.conditions as Record<keyof typeof MQ, boolean>;
        if (reduced || !root.current) return;
        revealSection(root.current);
        return extra?.({ desktop, q: gsap.utils.selector(root) as (s: string) => HTMLElement[] });
      });
      return () => mm.revert();
    },
    { scope: root }
  );
}
