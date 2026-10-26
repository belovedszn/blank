import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 ${className}`}>{children}</div>;
}

export function Section({ id, children, className = "", tone = "light", full = false, label }: {
  id?: string; children: ReactNode; className?: string; tone?: "light" | "dark" | "soft"; full?: boolean; label?: string;
}) {
  const bg = tone === "dark" ? "bg-ink text-bone" : tone === "soft" ? "bg-bone-200 text-ink" : "bg-bone text-ink";
  return (
    <section id={id} aria-label={label} data-tone={tone === "dark" ? "dark" : "light"}
      className={`relative scroll-mt-24 py-20 md:py-28 ${full ? "md:min-h-[100svh]" : ""} ${bg} ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <p className={`mb-4 text-sm font-medium ${dark ? "text-jade-400" : "text-jade-700"}`}>{children}</p>;
}

export function Emph({ children }: { children: ReactNode }) {
  return <em className="not-italic text-jade">{children}</em>;
}

export function SectionHeading({ eyebrow, title, lead, dark = false, className = "" }: {
  eyebrow?: string; title: ReactNode; lead?: ReactNode; dark?: boolean; className?: string;
}) {
  return (
    <header className={`max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2 className="text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl">{title}</h2>
      {lead && <p className={`mt-6 max-w-xl text-lg leading-relaxed ${dark ? "text-bone/70" : "text-mid"}`}>{lead}</p>}
    </header>
  );
}

const arrow = (
  <span aria-hidden className="inline-block animate-nudge">→</span>
);

export function PrimaryButton({ href, children, onClick, arrow: showArrow = true }: {
  href?: string; children: ReactNode; onClick?: () => void; arrow?: boolean;
}) {
  const cls = "inline-flex items-center gap-2 rounded-full bg-jade px-6 py-3 text-[15px] font-bold text-white transition-colors hover:bg-jade-600 active:bg-jade-700";
  const inner = (<>{children}{showArrow && arrow}</>);
  return href ? <Link href={href} className={cls}>{inner}</Link> : <button type="button" onClick={onClick} className={cls}>{inner}</button>;
}

export function SecondaryButton({ href, children, onClick, dark = false, className = "" }: {
  href?: string; children: ReactNode; onClick?: () => void; dark?: boolean; className?: string;
}) {
  const cls = `inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[15px] font-medium transition-colors ${
    dark ? "border-bone/30 text-bone hover:bg-bone/10" : "border-ink/20 text-ink hover:bg-ink/5"} ${className}`;
  return href ? <Link href={href} className={cls}>{children}</Link> : <button type="button" onClick={onClick} className={cls}>{children}</button>;
}

export function Placeholder({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-2xl border border-dashed border-ink/20 bg-bone-200 p-8 text-center text-sm text-mid ${className}`}>
      {children}
    </div>
  );
}
