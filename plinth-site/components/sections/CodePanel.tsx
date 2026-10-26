"use client";
import { useState } from "react";
import { IconCheck, IconCopy } from "./icons";

const CODE = `const res = await fetch(
  "https://api.plinth.example/v1/entitlements/check",
  {
    method: "POST",
    headers: { Authorization: "Bearer $PLINTH_KEY" },
    body: JSON.stringify({
      customer: "cus_8f2a1",
      feature: "exports",
    }),
  }
);`;

const RESPONSE = `{ "allowed": true, "plan": "growth" }`;

export default function CodePanel() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(CODE); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* fail silently, code stays visible */ }
  };
  return (
    <figure className="overflow-hidden rounded-3xl bg-ink-800 text-bone shadow-[0_30px_70px_-35px_rgba(0,0,0,.55)]" data-tone="dark">
      <div className="flex items-center justify-between border-b border-bone/10 px-4 py-3">
        <div className="flex items-center gap-2" aria-hidden><i className="h-3 w-3 rounded-full bg-[#FF5F57]" /><i className="h-3 w-3 rounded-full bg-[#FEBC2E]" /><i className="h-3 w-3 rounded-full bg-[#28C840]" /></div>
        <figcaption className="font-mono text-xs text-bone/60">check-access.ts</figcaption>
        <button type="button" onClick={copy} aria-label="Copy code" className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-bone/80 hover:bg-bone/10">
          {copied ? <IconCheck width={14} height={14} /> : <IconCopy />}{copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed"><code>
        {CODE.split("\n").map((l, i) => (
          <span key={i} className="block">
            {l.split(/(".*?"|\bconst\b|\bawait\b)/g).map((t, j) =>
              /^".*"$/.test(t) ? <span key={j} className="text-jade-400">{t}</span> : /^(const|await)$/.test(t) ? <span key={j} className="text-bone/50">{t}</span> : <span key={j}>{t}</span>)}
          </span>
        ))}
      </code></pre>
      <div className="flex items-center justify-between border-t border-bone/10 bg-ink-900 px-5 py-3 font-mono text-[13px]">
        <span className="flex items-center gap-2 text-jade-400"><span className="h-2 w-2 rounded-full bg-jade" aria-hidden />200 OK</span>
        <span className="text-bone/70">{RESPONSE}</span>
      </div>
    </figure>
  );
}
