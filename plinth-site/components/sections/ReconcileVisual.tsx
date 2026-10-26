"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";

const ROWS = [
  { who: "Adaeze O.", ref: "INV-1042", amt: "₦25,000" },
  { who: "Kunle B.", ref: "INV-1043", amt: "₦12,500" },
  { who: "Ngozi E.", ref: "INV-1044", amt: "₦40,000" },
];

/** staged: 0 idle → 1 incoming → 2 matching → 3 reconciled. Starts when it enters view. */
export default function ReconcileVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) { setStep(3); return; }
    const el = ref.current; if (!el) return;
    let timers: number[] = [];
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      timers = [setTimeout(() => setStep(1), 200), setTimeout(() => setStep(2), 1300), setTimeout(() => setStep(3), 2500)] as unknown as number[];
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, [reduce]);

  const label = ["Waiting for a transfer", "Transfer received", "Matching to open invoices", "Reconciled"][step];
  return (
    <div ref={ref} className="rounded-3xl border border-ink/10 bg-white p-5 md:p-6">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Virtual account</span>
        <span className="font-mono text-mid" aria-live="polite">{label}</span>
      </div>
      <ul className="mt-4 divide-y divide-ink/10">
        {ROWS.map((r, i) => {
          const hit = i === 1;
          const done = step === 3 && hit;
          const matching = step === 2 && hit;
          return (
            <li key={r.ref} className={`flex items-center justify-between gap-3 py-3 transition-colors duration-500 ${done ? "bg-jade-100/60" : ""} ${matching ? "bg-bone-200" : ""}`}>
              <div>
                <p className="text-sm font-medium">{r.who}</p>
                <p className="font-mono text-xs text-mid">{r.ref}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm">{r.amt}</p>
                <p className={`text-xs transition-colors duration-500 ${done ? "text-jade-700" : "text-mid"}`}>{done ? "Paid" : "Open"}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={`mt-4 flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-all duration-500 ${step >= 1 ? "bg-ink text-bone opacity-100" : "bg-bone-200 text-mid opacity-60"}`}>
        <span>Incoming transfer</span><span className="font-mono">₦12,500</span>
      </div>
    </div>
  );
}
