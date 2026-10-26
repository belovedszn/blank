import { Container, Section, SectionHeading } from "./ui";
import FaqRow from "./FaqRow";

const FAQS = [
  ["What is Plinth?", "Recurring billing infrastructure for Nigeria: subscriptions, invoices, virtual accounts, reconciliation, dunning, entitlements and webhooks."],
  ["Do my customers have to pay by card?", "No. Customers can pay by bank transfer into their own virtual account, and Plinth matches the payment to the invoice."],
  ["What happens when a charge fails?", "Plinth retries on your billing policy, notifies the customer and your product, and records every attempt in the ledger."],
  ["Can I use Accounts without Subscriptions?", "Yes. Virtual accounts, reconciliation and statements work on their own."],
  ["How does my product know who has access?", "Call the entitlements API, or listen for webhooks that fire when a customer’s payment state changes."],
  ["Which payment rails does it use?", "Plinth runs on Nomba’s payment infrastructure."],
];

export default function FAQ() {
  return (
    <Section id="faq" label="Frequently asked questions">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="FAQ" title="Questions, answered." />
          <div className="border-t border-ink/10">{FAQS.map(([q, a]) => <FaqRow key={q} q={q} a={a} />)}</div>
        </div>
      </Container>
    </Section>
  );
}
