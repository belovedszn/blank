"use client";
import { useEffect, useState } from "react";

/** True when the visitor prefers reduced motion. Starts false on the server, settles on mount. */
export function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduce(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return reduce;
}

/** Desktop = wide viewport + fine pointer. Gates cinematic pinning, cursor and snap. */
export function useDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    const set = () => setDesktop(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return desktop;
}

/** Cheap WebGL capability test. */
export function canWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Query flag for deterministic screenshots: ?still=1 */
export function isStill(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("still") === "1";
}
