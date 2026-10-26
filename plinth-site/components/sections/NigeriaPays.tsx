import { Container, Section, SectionHeading } from "./ui";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

const STATS = [
  { n: 1, suffix: "", l: "dedicated virtual account for every customer" },
  { n: 0, suffix: "", l: "spreadsheets needed to match a transfer" },
  { n: 2, suffix: "", l: "ledger entries behind every movement of money" },
];

export default function NigeriaPays() {
  return (
    <Section id="nigeria" tone="dark" label="How Nigeria pays">
      <Container>
        <SectionHeading dark eyebrow="Built for Nigeria" title="Cards fail. Transfers don’t."
          lead="Billing tools designed elsewhere assume the card always works. Here, customers pay by transfer, cards get declined, and the money still has to be found. Plinth treats that as the normal case." />
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.l} index={i}>
              <p className="font-display text-[clamp(5rem,12vw,9rem)] font-bold leading-none tracking-tight text-jade-400"><CountUp to={s.n} suffix={s.suffix} /></p>
              <p className="mt-3 max-w-[16rem] text-bone/70">{s.l}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-14 max-w-2xl text-bone/60">Failed card charges go through dunning and payment recovery. Transfers are reconciled on arrival. Both end in the same ledger.</p>
      </Container>
    </Section>
  );
}
