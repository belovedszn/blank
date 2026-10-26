import { Container, PrimaryButton, SecondaryButton } from "./ui";

export default function FinalCTA() {
  return (
    <section id="cta" aria-label="Get started" data-tone="dark" className="relative isolate overflow-hidden bg-ink py-28 text-bone md:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-1/4 top-1/4 h-[60vh] w-[90vw] animate-aurora rounded-full bg-jade/20 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[50vh] w-[70vw] animate-aurora rounded-full bg-jade-700/20 blur-[140px]" style={{ animationDelay: "-9s" }} />
      </div>
      <Container>
        <h2 className="max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-tight md:text-8xl">Build on a base that holds.</h2>
        <p className="mt-6 max-w-xl text-lg text-bone/70">Talk to us about your billing, or start with the docs.</p>
        <div className="mt-10 flex flex-wrap gap-3"><PrimaryButton href="mailto:hello@plinth.example">Schedule a demo</PrimaryButton><SecondaryButton dark href="#developers">Start building</SecondaryButton></div>
      </Container>
    </section>
  );
}
