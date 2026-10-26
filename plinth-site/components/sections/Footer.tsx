import Image from "next/image";
import { Container } from "./ui";

const COLS = [
  { h: "Product", l: [["Subscriptions", "#subscriptions"], ["Accounts", "#accounts"], ["How it works", "#how"], ["Pricing", "#pricing"]] },
  { h: "Developers", l: [["Docs", "#developers"], ["Entitlements API", "#developers"], ["Webhooks", "#developers"], ["FAQ", "#faq"]] },
  { h: "Company", l: [["About", "#top"], ["Customers", "#customers"], ["Contact", "mailto:hello@plinth.example"]] },
  { h: "Legal", l: [["Terms", "#top"], ["Privacy", "#top"], ["Security", "#trust"]] },
];

export default function Footer() {
  return (
    <footer data-tone="dark" className="bg-ink-900 pb-10 pt-20 text-bone">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2.5"><Image src="/plinth-logo.png" alt="" width={32} height={32} /><span className="font-display text-xl font-bold">Plinth</span></div>
            <p className="mt-4 max-w-xs text-sm text-bone/60">Recurring billing and reconciliation for Nigeria.</p>
          </div>
          {COLS.map((c) => (
            <nav key={c.h} aria-label={c.h}>
              <h2 className="font-sans text-sm font-bold text-bone">{c.h}</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-bone/65">
                {c.l.map(([t, h]) => <li key={t}><a href={h} className="rule-link">{t}</a></li>)}
              </ul>
            </nav>
          ))}
        </div>
        <p className="mt-16 max-w-3xl text-xs leading-relaxed text-bone/45">
          Payments are processed on Nomba’s infrastructure. Plinth is billing software and does not hold customer funds. Confirm regulatory and licensing wording with legal before launch.
        </p>
        <p className="mt-10 font-display text-[clamp(3rem,13vw,11rem)] font-bold leading-none tracking-tight text-bone/10" aria-hidden>Plinth</p>
      </Container>
    </footer>
  );
}
