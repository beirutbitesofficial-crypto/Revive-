"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { site } from "@/lib/site";
import Wordmark from "./Logo";

const COLS = [
  { h: "Visit", links: [{ l: `${site.area}, ${site.city}`, href: site.directionsUrl }, { l: "Get directions", href: site.directionsUrl }] },
  { h: "Reach", links: [{ l: site.phoneLabel, href: `https://wa.me/${site.whatsapp}` }, { l: site.email, href: `mailto:${site.email}` }, { l: "Book via app", href: site.app }] },
  {
    h: "Inside",
    links: [
      { l: "The Gym", href: "#gym" },
      { l: "The Court", href: "#court" },
      { l: "Wellness", href: "#wellness" },
      { l: "Studio Rooms", href: "#studio" },
      { l: "Movement", href: "#movement" },
    ],
  },
  { h: "Follow", links: [{ l: "Instagram", href: site.instagram }, { l: "WhatsApp", href: `https://wa.me/${site.whatsapp}` }] },
];

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);
      mm.add(MQ, (ctx) => {
        if ((ctx.conditions as Record<string, boolean>).reduced) return;
        gsap.fromTo(q(".ft-word .char"), { yPercent: 110 }, { yPercent: 0, stagger: 0.06, ease: "power3.out", scrollTrigger: { trigger: q(".ft-word")[0], start: "top 95%", end: "bottom bottom", scrub: 0.8 } });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <footer ref={root} className="relative overflow-hidden bg-ink px-4 pt-20 md:px-10 md:pt-28">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {COLS.map((c) => (
            <div key={c.h}>
              <h4 className="label text-cream/50">{c.h}</h4>
              <ul className="mt-4 space-y-1">
                {c.links.map((l) => (
                  <li key={l.l}>
                    <a href={l.href} {...(l.href.startsWith("#") ? {} : { target: "_blank", rel: "noopener noreferrer" })} className="inline-flex min-h-9 items-center text-cream/85 [overflow-wrap:anywhere] transition-colors hover:text-volt">
                      {l.l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-cream/15 pt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-cream/50">
          <span>
            © {site.name} · {site.city} · {site.since}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-volt" /> Now open
          </span>
        </div>

        <div className="ft-word mt-6 overflow-hidden" aria-hidden="true">
          <Wordmark className="w-full justify-between text-[21.5vw] text-cream" />
        </div>
      </div>
    </footer>
  );
}
