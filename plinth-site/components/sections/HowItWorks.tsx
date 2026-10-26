import { Container, Section, SectionHeading } from "./ui";
import Reveal from "./Reveal";

const STEPS = [
  { t: "Create a plan", d: "Set the price, the cycle and what the plan unlocks. One call or one form." },
  { t: "Subscribe a customer", d: "Plinth opens a virtual account for them and schedules the first invoice." },
  { t: "Plinth does the rest", d: "It bills, collects, retries failures, reconciles transfers and notifies your product." },
];

export default function HowItWorks() {
  return (
    <Section id="how" tone="soft" label="How it works">
      <Container>
        <SectionHeading eyebrow="How it works" title="Three steps. Then it runs." />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-ink/10 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.t} index={i} className="bg-bone p-8 md:p-10">
              <span className="font-mono text-sm text-jade-700">Step {i + 1}</span>
              <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-tight">{s.t}</h3>
              <p className="mt-3 text-mid">{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
