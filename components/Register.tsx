"use client";

import { useRef, useState } from "react";
import { useSection } from "@/lib/reveal";
import { interests, site, whatsappLink } from "@/lib/site";
import { Arrow } from "./Hero";
import SectionHead from "./SectionHead";

/**
 * Register form. The site is fully static, so the details are sent to the club
 * as a pre-filled WhatsApp message (same as the Sushi Bento order flow).
 */
export default function Register() {
  const root = useRef<HTMLElement>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useSection(root);

  const toggle = (i: string) => setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    const phone = String(f.get("phone") || "").trim();
    const message = String(f.get("message") || "").trim();
    if (!name) return setError("Tell us your name.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("That email doesn't look right.");
    if (!picked.length) return setError("Pick at least one thing you're here for.");
    setError("");
    const text = [
      `Hi ${site.name}! I'd like to register.`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Interested in: ${picked.join(", ")}`,
      message ? `Message: ${message}` : null,
    ]
      .filter((l) => l !== null)
      .join("\n");
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const field =
    "peer w-full border-0 border-b-2 border-maroon/30 bg-transparent px-0 pb-3 pt-6 text-lg text-maroon placeholder-transparent outline-none transition-colors focus:border-maroon";
  const label =
    "pointer-events-none absolute left-0 top-6 font-mono text-[11px] uppercase tracking-[0.25em] text-maroon/60 transition-all peer-focus:top-0 peer-[:not(:placeholder-shown)]:top-0";

  return (
    <section ref={root} id="register" className="relative overflow-hidden bg-cream px-4 py-24 text-maroon md:px-10 md:py-36">
      <div className="mx-auto grid max-w-[1600px] gap-14 md:grid-cols-[1fr_1.1fr] md:gap-20">
        <div>
          <SectionHead n="08" eyebrow="Register" title="Tell us what you're here for." accent="text-plum" titleClass="text-[12vw] md:text-[5.8vw] max-w-[12ch]" />
          <p className="rv mt-8 max-w-[52ch] text-lg leading-relaxed text-maroon/80">
            Looking to join the gym, book a court, register for the Academy, or learn more about the club? Leave your details and our team will point you in the right direction.
          </p>
          <p className="rv mt-4 max-w-[52ch] leading-relaxed text-maroon/70">
            For gym memberships, we recommend visiting the club — our team will give you a tour, walk you through the available packages, and help you sign up.
          </p>
          <div className="rv mt-10 rounded-3xl bg-maroon p-6 text-cream md:p-8">
            <p className="text-cream/80">Already know what you want to book? Classes, courts and recovery sessions are booked through the app.</p>
            <a href={site.app} target="_blank" rel="noopener noreferrer" className="group mt-5 inline-flex min-h-12 items-center gap-3 rounded-full bg-cream px-6 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-maroon transition-colors hover:bg-volt hover:text-cream">
              Open the app <Arrow />
            </a>
          </div>
        </div>

        <div className="rv relative">
          {sent ? (
            <div className="flex h-full min-h-[420px] flex-col justify-center rounded-[32px] bg-maroon p-8 text-cream md:p-12" role="status">
              <p className="label text-cream/60">Sent to WhatsApp</p>
              <p className="mt-4 font-wide text-[15vw] uppercase leading-[0.9] md:text-[6vw]">You&apos;re in.</p>
              <p className="mt-4 text-lg text-cream/80">Hit send in WhatsApp and we&apos;ll be in touch.</p>
              <button type="button" onClick={() => setSent(false)} className="mt-8 self-start font-mono text-[11px] uppercase tracking-[0.25em] text-cream/70 underline underline-offset-4 hover:text-cream">
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="relative block">
                  <input name="name" autoComplete="name" placeholder="Name" className={field} />
                  <span className={label}>Name</span>
                </label>
                <label className="relative block">
                  <input name="email" type="email" autoComplete="email" placeholder="Email" className={field} />
                  <span className={label}>Email</span>
                </label>
              </div>
              <label className="relative block">
                <input name="phone" type="tel" autoComplete="tel" placeholder="Phone" className={field} />
                <span className={label}>Phone (optional)</span>
              </label>

              <fieldset className="pt-2">
                <legend className="font-mono text-[11px] uppercase tracking-[0.25em] text-maroon/60">I&apos;m interested in</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {interests.map((i) => {
                    const on = picked.includes(i);
                    return (
                      <button
                        key={i}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(i)}
                        className={`min-h-11 rounded-full border-2 px-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-all ${
                          on ? "scale-[1.03] border-maroon bg-maroon text-cream" : "border-maroon/30 hover:border-maroon"
                        }`}
                      >
                        {on ? "✓ " : "+ "}
                        {i}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <label className="relative block">
                <textarea name="message" rows={3} placeholder="Message" className={`${field} resize-none`} />
                <span className={label}>Message (optional)</span>
              </label>

              {error && (
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="group mt-2 inline-flex min-h-16 items-center justify-between rounded-full bg-maroon pl-8 pr-3 font-wide text-2xl uppercase text-cream transition-colors hover:bg-volt md:text-3xl">
                Send
                <span className="grid h-11 w-11 place-items-center rounded-full bg-cream text-maroon transition-transform duration-500 group-hover:rotate-[-45deg]">
                  <Arrow className="h-3 w-5" />
                </span>
              </button>
              <p className="text-sm text-maroon/60">
                Opens WhatsApp with your details filled in. Prefer email?{" "}
                <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-maroon">
                  {site.email}
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
