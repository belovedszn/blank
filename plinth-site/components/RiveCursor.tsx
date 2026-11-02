"use client";
import "@/lib/wasm";
import { useEffect, useRef, useState } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

const IDLE_MS = 3500;

function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  const { rive, RiveComponent } = useRive({ src: "/cursor.riv", artboard: "New Artboard", stateMachines: "State Machine 1", autoplay: true });
  const click = useStateMachineInput(rive, "State Machine 1", "Click");
  const hovering = useStateMachineInput(rive, "State Machine 1", "IsHovering");
  const dark = useStateMachineInput(rive, "State Machine 1", "isDark");
  const idle = useStateMachineInput(rive, "State Machine 1", "isIdle");
  const inputs = useRef({ click, hovering, dark, idle });
  inputs.current = { click, hovering, dark, idle };

  useEffect(() => {
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = 0, idleTimer = 0, lastDark: boolean | null = null, lastHover: boolean | null = null;

    const wake = () => {
      if (inputs.current.idle) inputs.current.idle.value = false;
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => { if (inputs.current.idle) inputs.current.idle.value = true; }, IDLE_MS);
    };
    const probe = (x: number, y: number) => {
      const t = document.elementFromPoint(x, y) as HTMLElement | null;
      if (!t) return;
      const h = !!t.closest("a,button,[role=button],input,summary,label");
      const d = !!t.closest('[data-tone="dark"]');
      if (h !== lastHover && inputs.current.hovering) { inputs.current.hovering.value = h; lastHover = h; }
      if (d !== lastDark && inputs.current.dark) { inputs.current.dark.value = d; lastDark = d; }
    };
    const move = (e: PointerEvent) => { target.x = e.clientX; target.y = e.clientY; wake(); probe(e.clientX, e.clientY); };
    const down = () => inputs.current.click?.fire();
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.35; pos.y += (target.y - pos.y) * 0.35;
      if (el.current) el.current.style.transform = `translate3d(${pos.x}px,${pos.y}px,0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    raf = requestAnimationFrame(tick);
    wake();
    document.documentElement.classList.add("has-cursor");
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      cancelAnimationFrame(raf); window.clearTimeout(idleTimer);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={el} aria-hidden className="pointer-events-none bg-yellow-500 fixed left-0 top-0 z-[200] will-change-transform" style={{ width: 64, height: 64, marginLeft: -8, marginTop: -8 }}>
      <RiveComponent />
    </div>
  );
}

/** Fine pointer + motion allowed only. Touch and reduced-motion never mount it. */
export default function RiveCursor() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const set = () => setOn(mq.matches);
    set(); mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return on ? <Cursor /> : null;
}
