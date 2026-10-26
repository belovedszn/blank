import { Container, Section, SectionHeading, Placeholder } from "./ui";

// No verified testimonials yet, so these stay as placeholders. Do not invent names, companies or metrics.
export default function Testimonials() {
  return (
    <Section id="customers" tone="soft" label="Customers">
      <Container>
        <SectionHeading eyebrow="Customers" title="What teams say." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <Placeholder key={n} className="min-h-[200px] flex-col gap-2">
              <span className="font-medium text-ink">Customer quote {n}</span>
              <span>Add a verified quote, name and company here.</span>
            </Placeholder>
          ))}
        </div>
      </Container>
    </Section>
  );
}
