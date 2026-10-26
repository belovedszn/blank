"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROBLEMS, ProblemCard } from "./Problem";
import Problem from "./Problem";
import { Eyebrow, PrimaryButton, SecondaryButton } from "./ui";
import { IconCheck } from "./icons";
import { T, easeOut, seg } from "@/lib/bronzes";
import { canWebGL, useDesktop, useReducedMotion } from "@/lib/hooks";

gsap.registerPlugin(ScrollTrigger);
const BronzeCanvas = dynamic(() => import("./BronzeCanvas"), { ssr: false });

const INK = [10, 10, 10], BONE = [250, 250, 250];
const mix = (a: number[], b: number[], t: number) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;

const PLANS = [
  { id: "starter", name: "Starter", cycle: "Monthly", info: "One plan, one customer type. Good for a first product.", fill: 38 },
  { id: "growth", name: "Growth", cycle: "Quarterly", info: "Trials, upgrades and proration between plans.", fill: 64 },
  { id: "scale", name: "Scale", cycle: "Annual", info: "Custom billing policies and entitlements per tenant.", fill: 86 },
];

function PlanCard() {
  const [active, setActive] = useState("growth");
  const [edit, setEdit] = useState(false);
  const [tip, setTip] = useState(false);
  const [seats, setSeats] = useState(5);
  const plan = PLANS.find((p) => p.id === active)!;

  return (
    <div className="w-full max-w-md rounded-3xl border border-ink/10 bg-white p-5 text-ink shadow-[0_24px_60px_-30px_rgba(0,0,0,.25)]">
      <div role="tablist" aria-label="Plan" className="flex gap-1 rounded-full bg-bone-200 p-1">
        {PLANS.map((p) => (
          <button key={p.id} role="tab" aria-selected={active === p.id} onClick={() => setActive(p.id)}
            className={`flex-1 rounded-full px-3 py-2 text-sm font-medium transition-colors ${active === p.id ? "bg-ink text-bone" : "text-mid hover:text-ink"}`}>{p.name}</button>
        ))}
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-sm text-mid">Billing cycle</p>
          <p className="font-display text-2xl font-semibold">{plan.cycle}</p>
        </div>
        <button type="button" onClick={() => setEdit((v) => !v)} aria-expanded={edit} className="rounded-full border border-ink/15 px-4 py-1.5 text-sm font-medium hover:bg-ink/5">{edit ? "Done" : "Edit plan"}</button>
      </div>

      {edit && (
        <div className="mt-4 flex items-center justify-between rounded-xl bg-bone-200 px-4 py-3">
          <span className="text-sm">Seats</span>
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Fewer seats" onClick={() => setSeats((s) => Math.max(1, s - 1))} className="h-8 w-8 rounded-full border border-ink/15">−</button>
            <span className="w-6 text-center font-mono">{seats}</span>
            <button type="button" aria-label="More seats" onClick={() => setSeats((s) => s + 1)} className="h-8 w-8 rounded-full border border-ink/15">+</button>
          </div>
        </div>
      )}

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-sm"><span className="text-mid">Days to next invoice</span><span className="font-mono">{Math.round(30 * (1 - plan.fill / 100))}</span></div>
        <div className="h-2 overflow-hidden rounded-full bg-bone-200" role="progressbar" aria-valuenow={plan.fill} aria-valuemin={0} aria-valuemax={100} aria-label="Billing cycle progress">
          <div className="h-full rounded-full bg-jade transition-[width] duration-500" style={{ width: `${plan.fill}%` }} />
        </div>
      </div>

      <ul className="mt-5 space-y-2 text-sm">
        {["Invoice created", "Charge or transfer requested", "Payment matched to the invoice"].map((s) => (
          <li key={s} className="flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-jade-100 text-jade-700"><IconCheck width={12} height={12} /></span>{s}</li>
        ))}
      </ul>

      <div className="relative mt-5">
        <button type="button" onClick={() => setTip((v) => !v)} aria-expanded={tip} className="rule-link text-sm text-mid">What does this plan include?</button>
        {tip && <p className="mt-2 rounded-xl bg-jade-100 p-3 text-sm text-jade-700">{plan.info}</p>}
      </div>
    </div>
  );
}

function Copy({ light = false }: { light?: boolean }) {
  return (
    <div>
      <Eyebrow>Subscriptions</Eyebrow>
      <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl">Plans that bill themselves.</h2>
      <p className={`mt-5 max-w-md text-lg leading-relaxed ${light ? "text-bone/70" : "text-mid"}`}>
        Create a plan once. Plinth issues invoices, collects by card or transfer, retries what fails and tells your product who has access.
      </p>
      <div className="mt-7 flex flex-wrap gap-3"><PrimaryButton href="#how">See how it works</PrimaryButton><SecondaryButton href="#developers">Read the docs</SecondaryButton></div>
    </div>
  );
}

export default function Subscriptions() {
  const desktop = useDesktop();
  const reduce = useReducedMotion();
  const [gl, setGl] = useState(false);
  useEffect(() => setGl(canWebGL()), []);
  const cinematic = desktop && !reduce;

  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const cards = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const prog = useRef(0);

  useEffect(() => {
    if (!cinematic) return;
    const apply = (p: number) => {
      prog.current = p;
      const cin = easeOut(seg(p, T.cardsIn)), cout = seg(p, T.copyOut), bg = seg(p, T.bg), rise = easeOut(seg(p, T.rise));
      if (stage.current) { stage.current.style.backgroundColor = mix(INK, BONE, bg); stage.current.style.color = bg > 0.5 ? "#0A0A0A" : "#FAFAFA"; stage.current.dataset.tone = bg > 0.5 ? "light" : "dark"; }
      if (cards.current) {
        cards.current.style.opacity = String(cin * (1 - cout));
        cards.current.style.transform = `translate3d(${(1 - cin) * -60}px,0,0)`;
        cards.current.style.pointerEvents = cout > 0.9 ? "none" : "auto";
      }
      if (content.current) {
        content.current.style.opacity = String(rise);
        content.current.style.transform = `translate3d(0,${(1 - rise) * 80}px,0)`;
      }
    };
    apply(0);
    const st = ScrollTrigger.create({ trigger: section.current, start: "top top", end: "bottom bottom", onUpdate: (s) => apply(s.progress) });
    return () => st.kill();
  }, [cinematic]);

  if (!cinematic) {
    return (
      <div id="subscriptions" className="scroll-mt-24">
        <Problem />
        <section aria-label="Subscriptions" className="bg-bone py-20 md:py-28">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
            <Copy /><div className="flex justify-center md:justify-end"><PlanCard /></div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <section ref={section} id="subscriptions" aria-label="Subscriptions" className="relative scroll-mt-0" style={{ height: "500vh" }}>
      <div ref={stage} data-tone="dark" className="sticky top-0 h-[100svh] overflow-hidden" style={{ backgroundColor: "#0A0A0A", color: "#FAFAFA" }}>
        {gl && <div className="absolute inset-0"><BronzeCanvas prog={prog} dark /></div>}

        <div ref={cards} className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-[44%] min-w-[420px] flex-col justify-center gap-3 px-10">
          <h2 className="pointer-events-auto mb-2 font-display text-5xl font-semibold leading-[1.02] tracking-tight">Recurring revenue breaks in three places.</h2>
          {PROBLEMS.map((p) => <div key={p.n} className="pointer-events-auto"><ProblemCard p={p} compact /></div>)}
        </div>

        <div ref={content} className="pointer-events-none absolute inset-0 z-10 flex items-center" style={{ opacity: 0 }}>
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
            <div className="pointer-events-auto"><Copy /></div>
            <div className="pointer-events-auto flex justify-end"><PlanCard /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
