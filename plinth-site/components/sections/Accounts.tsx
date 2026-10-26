import { Container, Section, SectionHeading } from "./ui";
import Reveal from "./Reveal";
import ReconcileVisual from "./ReconcileVisual";

const POINTS = [
  ["A virtual account per customer", "Each customer pays into their own account number, so every transfer already says who it is from."],
  ["Automatic reconciliation", "Incoming money is matched to the right invoice without anyone opening a spreadsheet."],
  ["Statements and a running ledger", "Every movement is recorded, so balances can be explained line by line."],
  ["Works on its own", "Use Accounts without Subscriptions if you only need to collect and reconcile."],
];

export default function Accounts() {
  return (
    <Section id="accounts" label="Accounts">
      <Container>
        <div className="grid items-center gap-14 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Accounts" title="Transfers that match themselves." lead="Most Nigerians pay by bank transfer. Plinth gives each customer a dedicated account and settles the paperwork for you." />
            <dl className="mt-10 space-y-6">
              {POINTS.map(([t, d], i) => (
                <Reveal key={t} index={i}><dt className="font-display text-xl font-semibold">{t}</dt><dd className="mt-1 text-mid">{d}</dd></Reveal>
              ))}
            </dl>
          </div>
          <Reveal><ReconcileVisual /></Reveal>
        </div>
      </Container>
    </Section>
  );
}
