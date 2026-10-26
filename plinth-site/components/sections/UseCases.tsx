import { Container, Section, SectionHeading } from "./ui";
import Reveal from "./Reveal";
import { IconCoop, IconHome, IconSaaS, IconSchool, IconStream } from "./icons";

const CASES = [
  { Icon: IconSaaS, t: "SaaS", d: "Seats, tiers and usage with access that follows the payment.", span: "md:col-span-2" },
  { Icon: IconCoop, t: "Cooperatives", d: "Regular member contributions, matched to the right member.", span: "" },
  { Icon: IconSchool, t: "Schools", d: "Term fees paid in parts, with a clear balance per parent.", span: "" },
  { Icon: IconStream, t: "Streaming", d: "Monthly plans that renew, pause or lapse cleanly.", span: "" },
  { Icon: IconHome, t: "Home and services", d: "Rent, cleaning and maintenance plans billed on schedule.", span: "md:col-span-2" },
];

export default function UseCases() {
  return (
    <Section id="use-cases" label="Use cases">
      <Container>
        <SectionHeading eyebrow="Use cases" title="Anyone who bills on a schedule." />
        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {CASES.map(({ Icon, t, d, span }, i) => (
            <Reveal key={t} index={i} className={span}>
              <article className="h-full rounded-2xl border border-ink/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-jade/40 hover:shadow-[0_18px_40px_-28px_rgba(0,0,0,.3)]">
                <span className="text-jade"><Icon /></span>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight">{t}</h3>
                <p className="mt-2 text-mid">{d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
