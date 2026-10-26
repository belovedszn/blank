"use client";
import { Suspense, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { BRONZES, T, easeInOut, seg, type BronzeCfg, type V3 } from "@/lib/bronzes";

type Edit = { pos: V3; scale: number; rotY: number };
type Hover = { i: number; x: number; y: number } | null;

function Piece({ cfg, index, prog, frozen, edits, editMode, selected, onSelect, onHover }: {
  cfg: BronzeCfg; index: number; prog: MutableRefObject<number>; frozen: MutableRefObject<boolean>;
  edits: Record<number, Edit>; editMode: boolean; selected: boolean;
  onSelect: (i: number) => void; onHover: (h: Hover) => void;
}) {
  const { scene } = useGLTF(cfg.src);
  const group = useRef<THREE.Group>(null);
  const model = useMemo(() => {
    const s = scene.clone(true);
    s.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        const mat = (m.material as THREE.Material).clone();
        mat.transparent = true;
        m.material = mat;
      }
    });
    return s;
  }, [scene]);

  const st = useRef({ hover: false, spin: 0, drag: false, lastX: 0, k: 1, op: -1 });

  useFrame((_, dt) => {
    const g = group.current; if (!g) return;
    const s = st.current;
    const p = prog.current;
    const fade = seg(p, T.bronzeIn);
    const part = easeInOut(seg(p, T.part));
    const e = edits[index];

    const base = e ? e.pos : cfg.base;
    g.position.set(
      base[0] + cfg.move[0] * p + cfg.aside[0] * part,
      base[1] + cfg.move[1] * p + cfg.aside[1] * part,
      base[2] + cfg.move[2] * p + cfg.aside[2] * part,
    );

    if (s.hover && !s.drag) s.spin += dt * 0.6; // slow spin while hovered
    g.rotation.set(
      cfg.rot0[0] + cfg.rotDelta[0] * part,
      (e ? e.rotY : cfg.rot0[1]) + cfg.rotDelta[1] * part + s.spin,
      cfg.rot0[2] + cfg.rotDelta[2] * part,
    );

    s.k += ((s.hover ? 1.06 : 1) - s.k) * Math.min(1, dt * 8);
    const sc = (e ? e.scale : cfg.scale) * s.k * (0.9 + 0.1 * fade);
    g.scale.setScalar(sc);

    const op = editMode ? 1 : fade * (1 - seg(p, T.bronzeOut));
    if (op !== s.op) {
      s.op = op;
      model.traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh) (m.material as THREE.Material).opacity = op; });
    }
    g.visible = op > 0.01;
  });

  const down = (ev: ThreeEvent<PointerEvent>) => {
    ev.stopPropagation();
    if (editMode) { onSelect(index); return; }
    (ev.target as Element).setPointerCapture?.(ev.pointerId);
    st.current.drag = true; st.current.lastX = ev.clientX;
  };
  const move = (ev: ThreeEvent<PointerEvent>) => {
    const s = st.current;
    if (s.drag) { s.spin += (ev.clientX - s.lastX) * 0.012; s.lastX = ev.clientX; } // accumulates, never resets
    if (s.hover) onHover({ i: index, x: ev.clientX, y: ev.clientY });
  };
  const up = () => { st.current.drag = false; };

  return (
    <group ref={group}
      onPointerOver={(e) => { e.stopPropagation(); st.current.hover = true; document.body.style.cursor = "grab"; onHover({ i: index, x: e.clientX, y: e.clientY }); }}
      onPointerOut={() => { st.current.hover = false; st.current.drag = false; document.body.style.cursor = ""; onHover(null); }}
      onPointerDown={down} onPointerMove={move} onPointerUp={up}>
      <primitive object={model} />
      {selected && editMode && (
        <mesh><sphereGeometry args={[0.62, 24, 16]} /><meshBasicMaterial color="#0FA37F" wireframe transparent opacity={0.35} /></mesh>
      )}
    </group>
  );
}

function Studio() {
  return (
    <Environment resolution={256}>
      <Lightformer form="rect" intensity={3.2} color="#FFE2B8" position={[0, 1, 6]} scale={[8, 5, 1]} />      {/* warm frontal */}
      <Lightformer form="rect" intensity={2.2} color="#BFD8FF" position={[-7, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 5, 1]} /> {/* cool side */}
      <Lightformer form="rect" intensity={2.6} color="#FFC890" position={[6, -2, 3]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} /> {/* warm lower right */}
    </Environment>
  );
}

export default function BronzeCanvas({ prog, dark }: { prog: MutableRefObject<number>; dark: boolean }) {
  const frozen = useRef(false);
  const [editMode, setEditMode] = useState(false);
  const [sel, setSel] = useState(0);
  const [edits, setEdits] = useState<Record<number, Edit>>({});
  const [hover, setHover] = useState<Hover>(null);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "e") setEditMode((v) => !v);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);

  useEffect(() => {
    frozen.current = editMode;
    document.body.style.overflow = editMode ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [editMode]);

  const cur = (i: number): Edit => edits[i] ?? { pos: BRONZES[i].base, scale: BRONZES[i].scale, rotY: BRONZES[i].rot0[1] };
  const patch = (i: number, p: Partial<Edit>) => setEdits((e) => ({ ...e, [i]: { ...cur(i), ...p } }));
  const setPos = (axis: 0 | 1 | 2, v: number) => { const c = cur(sel); const pos = [...c.pos] as V3; pos[axis] = v; patch(sel, { pos }); };

  const log = () => {
    const out = BRONZES.map((b, i) => { const e = cur(i); return { name: b.name, base: e.pos.map((n) => +n.toFixed(2)), scale: +e.scale.toFixed(2), rot0Y: +e.rotY.toFixed(2) }; });
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(out, null, 2));
  };

  return (
    <>
      <Canvas camera={{ position: [0, 0, 9], fov: 32, near: 0.1, far: 100 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }} aria-hidden>
        <Suspense fallback={null}>
          <Studio />
          {BRONZES.map((cfg, i) => (
            <Piece key={cfg.src} cfg={cfg} index={i} prog={prog} frozen={frozen} edits={edits} editMode={editMode}
              selected={sel === i} onSelect={setSel} onHover={setHover} />
          ))}
          <ContactShadows position={[0, -3.1, 0]} opacity={dark ? 0.55 : 0.3} scale={14} blur={2.8} far={5} />
        </Suspense>
      </Canvas>

      {hover && !editMode && (
        <div role="tooltip" className="pointer-events-none fixed z-[60] max-w-[220px] rounded-xl bg-bone px-3 py-2 text-ink shadow-lg"
          style={{ left: hover.x + 16, top: hover.y + 16 }}>
          <p className="text-sm font-bold">{BRONZES[hover.i].name}</p>
          <p className="text-xs text-mid">{BRONZES[hover.i].desc}</p>
        </div>
      )}

      {editMode && (
        <div className="fixed bottom-4 right-4 z-[120] w-72 rounded-2xl bg-ink p-4 font-mono text-xs text-bone shadow-2xl" role="group" aria-label="Bronze editor">
          <p className="mb-2 text-jade-400">Bronze editor · Shift+E to exit</p>
          <label className="mb-2 block">Piece
            <select value={sel} onChange={(e) => setSel(+e.target.value)} className="mt-1 w-full rounded bg-ink-700 p-1">
              {BRONZES.map((b, i) => <option key={b.src} value={i}>{b.name}</option>)}
            </select>
          </label>
          {(["x", "y", "z"] as const).map((a, k) => (
            <label key={a} className="mb-1 block">{a}: {cur(sel).pos[k].toFixed(2)}
              <input type="range" min={-8} max={8} step={0.05} value={cur(sel).pos[k]} onChange={(e) => setPos(k as 0 | 1 | 2, +e.target.value)} className="w-full accent-[#0FA37F]" />
            </label>
          ))}
          <label className="mb-1 block">scale: {cur(sel).scale.toFixed(2)}
            <input type="range" min={0.4} max={4} step={0.02} value={cur(sel).scale} onChange={(e) => patch(sel, { scale: +e.target.value })} className="w-full accent-[#0FA37F]" />
          </label>
          <label className="mb-3 block">rotY: {cur(sel).rotY.toFixed(2)}
            <input type="range" min={-6.3} max={6.3} step={0.02} value={cur(sel).rotY} onChange={(e) => patch(sel, { rotY: +e.target.value })} className="w-full accent-[#0FA37F]" />
          </label>
          <button type="button" onClick={log} className="w-full rounded-full bg-jade py-2 font-bold text-white hover:bg-jade-600">Log all</button>
        </div>
      )}
    </>
  );
}

BRONZES.forEach((b) => useGLTF.preload(b.src));
