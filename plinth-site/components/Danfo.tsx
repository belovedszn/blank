"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const SRC = "/danfo-3d.glb";
// The GLB is normalised: 0.505 x 0.459 x 1.0 (length on Z), centred at the origin.
const LENGTH = 9;
const HALF_HEIGHT = 0.2295 * LENGTH;
const FRONT_IS_POS_Z = true;

const LANE_X = 8.6;
const Z_NEAR = 118;
const Z_FAR = -330;
const SPEED = 9; // world units / second

function shadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const r = g.createRadialGradient(64, 64, 4, 64, 64, 62);
  r.addColorStop(0, "rgba(0,0,0,0.55)");
  r.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

function Bus({ direction, x, startZ, reduce }: { direction: 1 | -1; x: number; startZ: number; reduce: boolean }) {
  const { scene } = useGLTF(SRC);
  const group = useRef<THREE.Group>(null);
  const zRef = useRef(startZ);

  // clone the scene AND its materials so the two buses never share mutable state
  const model = useMemo(() => {
    const s = scene.clone(true);
    s.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.material = Array.isArray(m.material) ? m.material.map((q) => q.clone()) : m.material.clone();
      }
    });
    return s;
  }, [scene]);
  const shadow = useMemo(() => shadowTexture(), []);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    if (!reduce) {
      // dt is clamped so a background tab does not teleport the bus
      zRef.current += direction * -1 * SPEED * Math.min(dt, 0.05);
      // direction 1 = travels away (-z), -1 = travels toward camera (+z)
      if (zRef.current < Z_FAR) zRef.current = Z_NEAR;
      if (zRef.current > Z_NEAR) zRef.current = Z_FAR;
    }
    g.position.z = zRef.current;
  });

  const facing = (direction === 1 ? -1 : 1) * (FRONT_IS_POS_Z ? 1 : -1);
  return (
    <group ref={group} position={[x, 0, startZ]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <planeGeometry args={[6.4, LENGTH * 1.25]} />
        <meshBasicMaterial map={shadow} transparent depthWrite={false} />
      </mesh>
      <primitive object={model} scale={LENGTH} position={[0, HALF_HEIGHT + 0.15, 0]} rotation={[0, facing === 1 ? 0 : Math.PI, 0]} />
    </group>
  );
}

export default function Danfo({ reduce }: { reduce: boolean }) {
  return (
    <>
      <Bus direction={-1} x={-LANE_X} startZ={46} reduce={reduce} />
      <Bus direction={1} x={LANE_X} startZ={-20} reduce={reduce} />
    </>
  );
}

useGLTF.preload(SRC);
