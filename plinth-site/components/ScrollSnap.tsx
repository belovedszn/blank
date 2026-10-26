"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

/** Proximity snapping, desktop only. Deliberately not CSS scroll-snap: it must never trap tall sections. */
export default function ScrollSnap() {
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;
    let settle = 0, tween: gsap.core.Tween | null = null;

    const abort = () => { tween?.kill(); tween = null; };
    const snap = () => {
      const main = document.getElementById("main");
      if (!main) return;
      const vh = window.innerHeight, y = window.scrollY;
      const tops = Array.from(main.children).map((c) => (c as HTMLElement).getBoundingClientRect().top + y);
      // never snap while inside a tall section's interior
      const inside = Array.from(main.children).some((c) => {
        const r = (c as HTMLElement).getBoundingClientRect();
        return r.height > vh * 1.4 && r.top < -vh * 0.1 && r.bottom > vh * 1.1;
      });
      if (inside) return;
      const nearest = tops.reduce((a, b) => (Math.abs(b - y) < Math.abs(a - y) ? b : a), tops[0]);
      if (Math.abs(nearest - y) < vh * 0.38 && Math.abs(nearest - y) > 2) {
        tween = gsap.to(window, { scrollTo: { y: nearest, autoKill: true }, duration: 0.6, ease: "power2.out" });
      }
    };
    const onScroll = () => { window.clearTimeout(settle); settle = window.setTimeout(snap, 140); };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", abort, { passive: true });
    window.addEventListener("touchstart", abort, { passive: true });
    window.addEventListener("keydown", abort);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", abort);
      window.removeEventListener("touchstart", abort);
      window.removeEventListener("keydown", abort);
      window.clearTimeout(settle); abort();
    };
  }, []);
  return null;
}
