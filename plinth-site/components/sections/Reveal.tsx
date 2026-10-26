"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/hooks";

/** One-shot viewport reveal. IntersectionObserver + CSS only — no animation library. */
export default function Reveal({ children, index = 0, className = "", as: Tag = "div" }: {
  children: ReactNode; index?: number; className?: string; as?: "div" | "li" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) { setShown(true); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  const visible = shown || reduce;
  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: reduce ? "none" : `opacity 620ms cubic-bezier(0.22,0.72,0.2,1) ${index * 80}ms, transform 620ms cubic-bezier(0.22,0.72,0.2,1) ${index * 80}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
