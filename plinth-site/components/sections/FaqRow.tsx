"use client";
import { useId, useState } from "react";
import { IconPlus } from "./icons";

export default function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="border-b border-ink/10">
      <h3>
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-6 py-6 text-left text-xl font-semibold tracking-tight">
          {q}
          <span aria-hidden className={`shrink-0 text-jade transition-transform duration-300 ${open ? "rotate-45" : ""}`}><IconPlus /></span>
        </button>
      </h3>
      <div id={id} role="region" className="faq-panel" data-open={open}>
        <div><p className="max-w-2xl pb-6 text-mid">{a}</p></div>
      </div>
    </div>
  );
}
