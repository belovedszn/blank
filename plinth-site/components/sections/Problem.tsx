import CardMedia, { type Media } from "./CardMedia";

export const PROBLEMS: { n: string; title: string; body: string; media: Media }[] = [
  { n: "01", title: "Charges fail", body: "Cards expire, get declined or hit limits. The revenue slips before anyone notices.",
    media: { kind: "lottie", src: "/animations/card-fail.lottie", label: "A card payment being declined" } },
  { n: "02", title: "Reconciled by hand", body: "Transfers arrive with no reference. Someone matches them to invoices in a spreadsheet.",
    media: { kind: "rive", src: "/animations/reconciled-coding.riv", animation: "Animation 1", label: "Someone matching payments by hand on a laptop" } },
  { n: "03", title: "Slips away", body: "Customers lapse without a word, and nobody knew to follow up in time.",
    media: { kind: "rive", src: "/animations/losing.riv", label: "A customer quietly walking away" } },
];

export function ProblemCard({ p, compact = false }: { p: (typeof PROBLEMS)[number]; compact?: boolean }) {
  return (
    <article className={`rounded-2xl border border-bone/10 bg-ink-800 text-bone ${compact ? "p-3" : "p-5"}`}>
      <div className={compact ? "flex items-center gap-4" : ""}>
        <div className={compact ? "w-28 shrink-0" : ""}><CardMedia media={p.media} /></div>
        <div className={compact ? "" : "mt-4"}>
          <p className="font-mono text-xs text-jade-400">{p.n}</p>
          <h3 className={`font-semibold tracking-tight ${compact ? "text-xl" : "text-2xl"}`}>{p.title}</h3>
          <p className="mt-1 text-sm leading-snug text-bone/65">{p.body}</p>
        </div>
      </div>
    </article>
  );
}

/** Stacked, natural-flow version for phones, tablets and reduced motion. */
export default function Problem() {
  return (
    <div className="bg-ink py-20 text-bone md:py-28" data-tone="dark">
      <div className="mx-auto w-full max-w-6xl px-5">
        <h2 className="max-w-2xl text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl">Recurring revenue breaks in three places.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {PROBLEMS.map((p) => <ProblemCard key={p.n} p={p} />)}
        </div>
      </div>
    </div>
  );
}
