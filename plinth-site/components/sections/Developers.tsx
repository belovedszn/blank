import { Container, Section, SectionHeading, PrimaryButton, SecondaryButton } from "./ui";
import Reveal from "./Reveal";
import CodePanel from "./CodePanel";

export default function Developers() {
  return (
    <Section id="developers" label="Developers">
      <Container>
        <div className="grid items-center gap-14 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Developers" title="Ask Plinth who has access." lead="Your product asks one question: is this customer entitled to this feature? Plinth answers from the real payment state, and sends webhooks when it changes." />
            <div className="mt-8 flex flex-wrap gap-3"><PrimaryButton href="#pricing">Start building</PrimaryButton><SecondaryButton href="#faq">Read the FAQ</SecondaryButton></div>
          </div>
          <Reveal><CodePanel /></Reveal>
        </div>
      </Container>
    </Section>
  );
}
