"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { nav, site } from "@/lib/site";
import Wordmark from "./Logo";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Solid bar once past the hero; tucks away while scrolling down, back on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setSolid(y > window.innerHeight * 0.85);
      setHidden(y > last && y > window.innerHeight);
      last = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useGSAP(
    () => {
      const q = gsap.utils.selector(overlay);
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.out" } })
        .set(overlay.current, { visibility: "visible" })
        .fromTo(overlay.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "expo.inOut" })
        .fromTo(q(".menu-link"), { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.05 }, 0.45)
        .fromTo(q(".menu-meta"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.06 }, 0.7);
    },
    { scope: overlay }
  );

  useEffect(() => {
    if (!tl.current) return;
    if (open) {
      tl.current.timeScale(1).play();
      document.documentElement.style.overflow = "hidden";
    } else {
      tl.current.timeScale(1.8).reverse();
      document.documentElement.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,backdrop-filter] duration-500 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${solid && !open ? "bg-ink/70 backdrop-blur-md" : "bg-transparent"}`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 md:px-10 md:py-5">
          <a href="#top" aria-label="The Revive Club — home" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <Wordmark className="text-[22px] text-cream md:text-[26px]" />
          </a>
          <div className="flex items-center gap-2">
            <span className="mr-3 hidden items-center gap-2 label text-cream/70 lg:inline-flex">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-volt" /> Now open · {site.area}
            </span>
            <a
              href="#register"
              onClick={() => setOpen(false)}
              className="hidden min-h-10 items-center rounded-full bg-cream px-5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-maroon transition-colors hover:bg-volt hover:text-cream sm:inline-flex"
            >
              Register
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group inline-flex min-h-10 items-center gap-3 rounded-full border border-cream/30 px-4 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-cream transition-colors hover:border-cream"
            >
              <span className="relative block h-2.5 w-5" aria-hidden="true">
                <span className={`absolute left-0 h-[2px] w-full bg-current transition-transform duration-500 ${open ? "top-1 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[2px] w-full bg-current transition-transform duration-500 ${open ? "top-1 -rotate-45" : "top-2"}`} />
              </span>
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <div
        ref={overlay}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        className="invisible fixed inset-0 z-40 overflow-y-auto bg-maroon text-cream"
      >
        <div className="pointer-events-none absolute -bottom-[0.2em] -right-[0.05em] select-none font-wide text-[42vw] leading-none text-maroon-deep/60" aria-hidden="true">
          V
        </div>
        <div className="relative mx-auto flex min-h-full max-w-[1600px] flex-col justify-between gap-12 px-4 pb-10 pt-28 md:px-10 md:pt-32">
          <nav aria-label="Main">
            <ol>
              {nav.map((n, i) => (
                <li key={n.href} className="overflow-hidden border-b border-cream/15">
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? 0 : -1}
                    className="menu-link group flex items-baseline gap-4 py-2 md:gap-8 md:py-3"
                  >
                    <span className="label text-cream/50">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-wide text-[10.5vw] uppercase leading-[0.95] transition-[color,transform] duration-500 group-hover:translate-x-3 group-hover:text-volt md:text-[5.6vw]">
                      {n.label}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="grid gap-8 text-sm md:grid-cols-3">
            <div className="menu-meta">
              <p className="label text-cream/50">Visit</p>
              <p className="mt-2">{site.area}, {site.city}</p>
            </div>
            <div className="menu-meta">
              <p className="label text-cream/50">Hours</p>
              {site.hours.map((h) => (
                <p key={h.days} className="mt-2 font-mono">
                  {h.days} · {h.time}
                </p>
              ))}
            </div>
            <div className="menu-meta flex flex-wrap gap-2 md:justify-end">
              <a href={site.app} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="inline-flex min-h-11 items-center rounded-full bg-cream px-5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-maroon">
                Book via app
              </a>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="inline-flex min-h-11 items-center rounded-full border border-cream/30 px-5 font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
