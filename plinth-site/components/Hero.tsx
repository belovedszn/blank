"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import BridgeSceneBoundary, { BridgeFallback } from "./BridgeSceneBoundary";
import VideoModal from "./VideoModal";
import { PrimaryButton, SecondaryButton } from "./sections/ui";
import { canWebGL, isStill, useReducedMotion } from "@/lib/hooks";
import { NAV } from "@/lib/site";

// WebGL never runs on the server.
const BridgeScene = dynamic(() => import("./BridgeScene"), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [webglOk, setWebglOk] = useState<boolean | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [still, setStill] = useState(false);
  const [small, setSmall] = useState(false);

  useEffect(() => {
    setWebglOk(canWebGL()); setStill(isStill());
    // Phones get the supplied illustration: no WebGL cost, no blank first paint.
    const mq = window.matchMedia("(max-width: 767px)");
    const set = () => setSmall(mq.matches);
    set(); mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    if (reduce || still) return;
    const ctx = gsap.context(() => {
      gsap.from(".intro", { y: 24, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.15 });
    }, root);
    return () => ctx.revert();
  }, [reduce, still]);

  return (
    <section ref={root} id="top" aria-label="Plinth" data-tone="light"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
      style={{ background: "linear-gradient(to bottom,#6CB1E2 0%,#9CD0E8 34%,#CFE6EA 60%,#EDEFE4 76%,#D9DDD0 100%)" }}>
      {/* Layer 1: 3D bridge (decorative, never intercepts pointer) */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        {webglOk === false || small ? <BridgeFallback /> : webglOk ? (
          <BridgeSceneBoundary><BridgeScene reduce={reduce || still} /></BridgeSceneBoundary>
        ) : (
          <Image src="/lagos-bridge.png" alt="" fill priority sizes="100vw" className="object-cover object-[50%_62%]" />
        )}
      </div>

      {/* Layer 3: navigation */}
      <header className="intro relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
        <Link href="#top" className="flex items-center gap-2.5" aria-label="Plinth home">
          <Image src="/plinth-logo.png" alt="" width={36} height={36} priority />
          <span className="font-display text-xl font-bold tracking-tight">Plinth</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 text-[15px] font-medium md:flex">
          {NAV.map((n) => <a key={n.href} href={n.href} className="rule-link py-1">{n.label}</a>)}
        </nav>
        <PrimaryButton href="#pricing" arrow={false}>Start building</PrimaryButton>
      </header>

      {/* Layers 4-6: headline, copy, CTAs */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-10 pt-6 md:pb-14">
        <h1 className="font-display font-bold uppercase text-ink" style={{ letterSpacing: "-0.03em" }}>
          <span className="intro block text-left leading-[0.9]" style={{ fontSize: "clamp(2.25rem, 7vw, 6.5rem)" }}>The base</span>
          <span className="mt-1 flex flex-col gap-x-8 leading-[0.84] md:mt-2 md:flex-row md:items-baseline md:justify-between"
            style={{ fontSize: "clamp(2.75rem, 9.2vw, 8.5rem)" }}>
            <span className="intro block text-left">Your</span>
            <span className="intro block text-left md:text-right">Billing</span>
          </span>
          <span className="intro block text-left leading-[0.84] md:text-right" style={{ fontSize: "clamp(2.75rem, 9.2vw, 8.5rem)" }}>Stands on.</span>
        </h1>

        <p className="intro mt-8 max-w-md text-lg font-medium leading-snug text-ink md:mt-6 md:text-xl">
          Recurring billing &amp; reconciliation, built for how Nigeria <em className="not-italic underline decoration-jade decoration-2 underline-offset-4">actually</em> pays.
        </p>

        <div className="intro mt-auto flex flex-wrap items-center gap-3 pt-10 md:justify-end">
          <PrimaryButton href="#pricing">Schedule a demo</PrimaryButton>
          <SecondaryButton className="bg-bone/80 backdrop-blur" onClick={() => setVideoOpen(true)}>Watch a video</SecondaryButton>
        </div>
      </div>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </section>
  );
}
