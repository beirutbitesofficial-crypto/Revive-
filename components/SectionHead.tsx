import { SplitWords } from "./SplitText";

/** "03 — The Gym" eyebrow + a big wide headline whose words rise out of masks (.sh-title .word). */
export default function SectionHead({
  n,
  eyebrow,
  title,
  className = "",
  titleClass = "text-[11vw] md:text-[6.2vw]",
  accent = "text-volt",
}: {
  n: string;
  eyebrow: string;
  title: string;
  className?: string;
  titleClass?: string;
  accent?: string;
}) {
  return (
    <div className={className}>
      <p className="sh-eyebrow label flex items-center gap-3">
        <span className={accent}>{n}</span>
        <span className="h-px w-8 bg-current opacity-40" />
        <span className="opacity-70">{eyebrow}</span>
      </p>
      <h2 className={`sh-title mt-5 font-wide uppercase leading-[0.9] ${titleClass}`}>
        <span className="sr-only">{title}</span>
        <span aria-hidden="true">
          <SplitWords text={title} />
        </span>
      </h2>
    </div>
  );
}
