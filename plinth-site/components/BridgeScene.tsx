"use client";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Danfo from "./Danfo";
import RoadLogos from "./RoadLogos";

/* ---------- geometry constants (world units ~ metres) ---------- */
const BRIDGE_Y = -6;        // lowers the world so the camera (y=2) sits ~8 above the deck
const PZ = -60;             // pylon z
const H = 92;               // pylon height
const CREAM = "#F4DDB4";
const CREAM_SHADE = "#CFB48C";
const ASPHALT = "#2A3039";
const HORIZON = "#E8EEE6";

type Item = { p: [number, number, number]; s: [number, number, number]; c?: string; ry?: number; q?: THREE.Quaternion };

/** One draw call for many boxes. Transforms live in data, not in JSX. */
function Boxes({ items, color = "#ffffff", roughness = 0.85 }: { items: Item[]; color?: string; roughness?: number }) {
  const ref = useRef<THREE.InstancedMesh>(null!);
  useLayoutEffect(() => {
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
    const v = new THREE.Vector3(), s = new THREE.Vector3(), col = new THREE.Color();
    items.forEach((it, i) => {
      if (it.q) q.copy(it.q); else q.setFromEuler(e.set(0, it.ry ?? 0, 0));
      m.compose(v.set(...it.p), q, s.set(...it.s));
      ref.current.setMatrixAt(i, m);
      if (it.c) ref.current.setColorAt(i, col.set(it.c));
    });
    ref.current.instanceMatrix.needsUpdate = true;
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
  }, [items]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, items.length]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} roughness={roughness} />
    </instancedMesh>
  );
}

/* ---------- pylon: both legs from one parametric curve ---------- */
const legX = (t: number) => 2.6 + 8.6 * Math.pow(1 - t, 1.5);

function Pylon() {
  const legs = useMemo(() => [-1, 1].map((side) => {
    const pts = Array.from({ length: 41 }, (_, i) => {
      const t = i / 40;
      return new THREE.Vector3(side * legX(t), t * H, PZ);
    });
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 60, 1.9, 4, false);
  }), []);

  const braces = useMemo<Item[]>(() => [50, 59, 68, 77].map((y) => {
    const t = y / H;
    return { p: [0, y, PZ], s: [legX(t) * 2, 2.2, 2.6], c: CREAM };
  }), []);
  const shadows = useMemo<Item[]>(() => [50, 59, 68, 77].map((y) => {
    const t = y / H;
    return { p: [0, y - 1.9, PZ], s: [legX(t) * 2 - 2, 1.6, 2.2], c: CREAM_SHADE };
  }), []);

  return (
    <group>
      {legs.map((g, i) => (
        <mesh key={i} geometry={g}>
          <meshStandardMaterial color={CREAM} roughness={0.8} flatShading />
        </mesh>
      ))}
      <Boxes items={braces} />
      <Boxes items={shadows} />
    </group>
  );
}

/* ---------- stay cables ---------- */
function Cables() {
  const items = useMemo<Item[]>(() => {
    const out: Item[] = [];
    const up = new THREE.Vector3(0, 0, 1);
    for (const side of [-1, 1]) {
      for (const dir of [1, -1]) {           // toward camera / away
        for (let i = 0; i < 8; i++) {
          const y = 46 + i * 5.5;
          const a = new THREE.Vector3(side * legX(y / H), y, PZ);
          const b = new THREE.Vector3(side * 16.5, 0.6, PZ + dir * (14 + i * 17));
          const d = b.clone().sub(a);
          const len = d.length();
          const q = new THREE.Quaternion().setFromUnitVectors(up, d.clone().normalize());
          const mid = a.clone().add(b).multiplyScalar(0.5);
          out.push({ p: [mid.x, mid.y, mid.z], s: [0.22, 0.22, len], q });
        }
      }
    }
    return out;
  }, []);
  return <Boxes items={items} color="#FBEACB" roughness={0.6} />;
}

/* ---------- deck, road, markings, barriers, rails, lamps ---------- */
function Deck() {
  const Z0 = 150, Z1 = -330, LEN = Z0 - Z1, ZC = (Z0 + Z1) / 2;

  const dashes = useMemo<Item[]>(() => {
    const out: Item[] = [];
    for (const x of [-12.4, -7.2, 7.2, 12.4]) {
      for (let z = Z0; z > Z1; z -= 10) out.push({ p: [x, 0.04, z], s: [0.28, 0.02, 3.6], c: "#F2F2EA" });
    }
    return out;
  }, []);

  const median = useMemo<Item[]>(() => {
    const out: Item[] = [];
    for (let z = Z0, i = 0; z > Z1; z -= 3, i++) {
      out.push({ p: [0, 0.7, z], s: [3.2, 1.4, 3], c: i % 2 ? "#2D333B" : "#EAD3AA" });
    }
    return out;
  }, []);

  const rail = useMemo<Item[]>(() => {
    const out: Item[] = [{ p: [18.4, 1.9, ZC], s: [0.18, 0.18, LEN], c: "#6E8493" }, { p: [18.4, 1.0, ZC], s: [0.14, 0.14, LEN], c: "#6E8493" }];
    for (let z = Z0; z > Z1; z -= 6) out.push({ p: [18.4, 1.0, z], s: [0.2, 2, 0.2], c: "#6E8493" });
    return out;
  }, []);

  const lamps = useMemo(() => {
    const poles: Item[] = [], arms: Item[] = [], heads: Item[] = [];
    for (const side of [-1, 1]) {
      const x = side * 17.6;
      for (let z = 112; z > Z1; z -= 26) {
        poles.push({ p: [x, 6, z], s: [0.3, 12, 0.3], c: "#7C8791" });
        arms.push({ p: [x - side * 1.7, 12.1, z], s: [3.6, 0.22, 0.22], c: "#7C8791" });
        heads.push({ p: [x - side * 3.3, 11.9, z], s: [1.2, 0.2, 0.5], c: "#D9DEE0" });
      }
    }
    return { poles, arms, heads };
  }, []);

  return (
    <group>
      {/* carriageways */}
      <mesh position={[-9.3, 0, ZC]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[15, LEN]} /><meshStandardMaterial color={ASPHALT} roughness={0.95} /></mesh>
      <mesh position={[9.3, 0, ZC]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[15, LEN]} /><meshStandardMaterial color={ASPHALT} roughness={0.95} /></mesh>
      {/* left raised walkway */}
      <mesh position={[-24.5, 0.55, ZC]}><boxGeometry args={[14, 1.1, LEN]} /><meshStandardMaterial color="#D9BE92" roughness={0.9} /></mesh>
      {/* right shoulder */}
      <mesh position={[17.6, 0.05, ZC]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[1.8, LEN]} /><meshStandardMaterial color="#8FA3AE" roughness={0.9} /></mesh>
      {/* deck slab */}
      <mesh position={[-3, -2, ZC]}><boxGeometry args={[46, 3.6, LEN]} /><meshStandardMaterial color="#C9B08A" roughness={0.9} /></mesh>

      <Boxes items={dashes} />
      <Boxes items={median} />
      <Boxes items={rail} />
      <Boxes items={lamps.poles} />
      <Boxes items={lamps.arms} />
      <Boxes items={lamps.heads} />

      {/* painted branding, one per carriageway */}
      <RoadLogos position={[-9.3, 0.06, 58]} size={[12, 40]} />
    </group>
  );
}

/* ---------- atmosphere ---------- */
function Backdrop() {
  const skyline = useMemo<Item[]>(() => {
    const out: Item[] = [];
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 46; i++) {
      const w = 6 + rnd() * 16, h = 5 + rnd() * 24;
      out.push({ p: [-260 + i * 11.5 + rnd() * 6, h / 2 - 8, -380 - rnd() * 40], s: [w, h, 8], c: i % 3 ? "#C9D8DE" : "#D6DFE0" });
    }
    return out;
  }, []);
  const puffs = useMemo(() => ({
    left: [[0, 0, 0, 22], [24, -4, 2, 17], [-22, -6, 0, 15], [46, -8, 0, 12]] as number[][],
    right: [[0, 0, 0, 20], [-22, -3, 2, 15], [26, -6, 0, 14]] as number[][],
  }), []);
  return (
    <group>
      {/* water */}
      <mesh position={[0, -9, -120]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[1600, 1200]} /><meshBasicMaterial color="#93BBCC" /></mesh>
      <Boxes items={skyline} roughness={1} />
      {(["left", "right"] as const).map((k) => (
        <group key={k} position={k === "left" ? [-230, 62, -330] : [250, 44, -330]}>
          {puffs[k].map(([x, y, z, r], i) => (
            <mesh key={i} position={[x, y, z]}><sphereGeometry args={[r, 20, 14]} /><meshBasicMaterial color="#FFF3DD" fog={false} /></mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/** Camera: spec position/fov, aimed above the horizon so the road sits low and the pylon high. */
function CameraRig() {
  const { camera, size } = useThree();
  useLayoutEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = size.width / size.height < 0.85 ? 56 : 40; // portrait phones need a wider frame
    cam.position.set(0, 2, 135);
    cam.lookAt(0, 39, PZ);
    cam.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

export default function BridgeScene({ reduce }: { reduce: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 2, 135], fov: 40, near: 0.1, far: 800 }}
      dpr={[1, 1.75]}
      flat
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      aria-hidden
    >
      <CameraRig />
      <fog attach="fog" args={[HORIZON, 150, 560]} />
      <ambientLight intensity={0.75} />
      <directionalLight position={[-30, 80, 50]} intensity={1.6} />
      <group position={[0, BRIDGE_Y, 0]}>
        <Backdrop />
        <Deck />
        <Pylon />
        <Cables />
        <Suspense fallback={null}>
          <Danfo reduce={reduce} />
        </Suspense>
      </group>
    </Canvas>
  );
}
