"use client";

import { useRef } from "react";
import { useSection } from "@/lib/reveal";
import { site, whatsappLink } from "@/lib/site";
import { Arrow } from "./Hero";
import SectionHead from "./SectionHead";

export default function Visit() {
  const root = useRef<HTMLElement>(null);
  useSection(root);

  const rows = [
    { k: "WhatsApp", v: site.phoneLabel, href: whatsappLink(`Hello ${site.name}!`) },
    { k: "Email", v: site.email, href: `mailto:${site.email}` },
    { k: "Instagram", v: site.instagramHandle, href: site.instagram },
    { k: "App", v: "Book via the app", href: site.app },
  ];

  return (
    <section ref={root} id="visit" className="relative overflow-hidden bg-maroon px-4 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <SectionHead n="09" eyebrow="Visit" title="Come find us." titleClass="text-[15vw] md:text-[9vw]" />

        <div className="mt-14 grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <div className="flex flex-col gap-10">
            <div className="rv">
              <p className="label text-cream/60">Address</p>
              <p className="mt-3 font-wide text-3xl uppercase leading-tight md:text-4xl">
                {site.area}
                <br />
                <span className="text-cream/60">
                  {site.city}, {site.country}
                </span>
              </p>
            </div>
            <div className="rv">
              <p className="label text-cream/60">Hours</p>
              <dl className="mt-3 divide-y divide-cream/15 border-y border-cream/15">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex items-center justify-between py-4 font-mono text-lg">
                    <dt>{h.days}</dt>
                    <dd className="tabular-nums">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ul className="rv divide-y divide-cream/15 border-y border-cream/15">
              {rows.map((r) => (
                <li key={r.k}>
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="group flex min-h-14 items-center justify-between gap-4 py-3">
                    <span className="label text-cream/60">{r.k}</span>
                    <span className="flex items-center gap-3 text-right text-lg transition-colors group-hover:text-volt">
                      {r.v} <Arrow />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rv relative flex flex-col gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-maroon-deep md:aspect-auto md:flex-1">
              <iframe
                title="Map — The Revive Club, Beirut Waterfront"
                src={site.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_sepia(0.5)_hue-rotate(-20deg)_contrast(1.1)]"
              />
            </div>
            <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-14 items-center justify-between rounded-full bg-cream pl-7 pr-3 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-maroon transition-colors hover:bg-volt hover:text-cream">
              Open in Google Maps
              <span className="grid h-10 w-10 place-items-center rounded-full bg-maroon text-cream">
                <Arrow />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
