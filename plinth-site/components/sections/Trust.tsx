import { Container, Section, SectionHeading } from "./ui";
import Reveal from "./Reveal";

const ITEMS = [
  ["Double-entry ledger", "Every naira in and out is recorded on two sides, so books balance by construction."],
  ["Idempotency", "Retry a request as often as you like. A charge or a webhook never happens twice."],
  ["Reconciliation", "Transfers are matched on arrival, and anything unmatched is surfaced, not hidden."],
  ["Nomba rails", "Payments move on Nomba’s infrastructure, behind Plinth’s billing logic."],
  ["Operational reliability", "Queued retries, outbound webhooks with backoff and an audit trail for every state change."],
];

export default function Trust() {
  return (
    <Section id="trust" tone="soft" label="Trust">
      <Container>
        <SectionHeading eyebrow="Trust" title="Infrastructure you can audit." lead="Plain engineering properties, stated plainly." />
        <dl className="mt-14 divide-y divide-ink/10 border-y border-ink/10">
          {ITEMS.map(([t, d], i) => (
            <Reveal key={t} index={i} className="grid gap-2 py-6 md:grid-cols-[16rem_1fr] md:gap-10">
              <dt className="font-display text-2xl font-semibold tracking-tight">{t}</dt>
              <dd className="text-mid">{d}</dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
