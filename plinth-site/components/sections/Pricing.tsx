import { Container, Section, SectionHeading, PrimaryButton, SecondaryButton } from "./ui";
import Reveal from "./Reveal";
import { IconCheck } from "./icons";

// Prices are intentionally not invented. Replace `price` once commercial terms are set.
const PLANS = [
  { name: "Start", price: "Talk to us", note: "For a first recurring product.", features: ["Subscriptions and invoices", "Card and transfer collection", "Email notifications"], featured: false },
  { name: "Grow", price: "Talk to us", note: "For teams with real volume.", features: ["Everything in Start", "Virtual account per customer", "Automatic reconciliation", "Dunning and payment recovery", "Outbound webhooks"], featured: true },
  { name: "Scale", price: "Custom", note: "For platforms billing on behalf of others.", features: ["Everything in Grow", "Entitlements API", "Billing policies per tenant", "Support with a named engineer"], featured: false },
];

export default function Pricing() {
  return (
    <Section id="pricing" label="Pricing">
      <Container>
        <SectionHeading eyebrow="Pricing" title="Pick the plan that fits your volume." />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} index={i}>
              <article className={`flex h-full flex-col rounded-3xl border p-7 ${p.featured ? "border-jade bg-white shadow-[0_24px_60px_-34px_rgba(15,163,127,.5)]" : "border-ink/10 bg-white"}`}>
                <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-mid">{p.note}</p>
                <p className="mt-6 font-display text-4xl font-semibold tracking-tight">{p.price}</p>
                <ul className="mt-6 flex-1 space-y-3 text-[15px]">
                  {p.features.map((f) => <li key={f} className="flex gap-2.5"><span className="mt-0.5 text-jade"><IconCheck /></span>{f}</li>)}
                </ul>
                <div className="mt-8">{p.featured ? <PrimaryButton href="#cta">Schedule a demo</PrimaryButton> : <SecondaryButton href="#cta">Schedule a demo</SecondaryButton>}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
