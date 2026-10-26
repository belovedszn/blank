"use client";
import { useEffect, useState } from "react";
import * as THREE from "three";

/**
 * Road branding. HTML Image -> offscreen Canvas -> CanvasTexture -> mesh.
 * Painted on the road like real carriageway lettering, so it is stretched along the
 * direction of travel to survive perspective foreshortening.
 */
function paint(img: HTMLImageElement | null) {
  const W = 1024, H = 512;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, W, H);

  if (img) {
    // tint the full-colour logo to a single road-paint white
    const t = document.createElement("canvas");
    t.width = t.height = 300;
    const tctx = t.getContext("2d")!;
    tctx.drawImage(img, 0, 0, 300, 300);
    tctx.globalCompositeOperation = "source-in";
    tctx.fillStyle = "#F4F3EC";
    tctx.fillRect(0, 0, 300, 300);
    ctx.drawImage(t, 24, (H - 300) / 2, 300, 300);
  }

  ctx.fillStyle = "#F4F3EC";
  ctx.textBaseline = "middle";
  ctx.font = '700 190px "Clash Display", "Arial Black", sans-serif';
  ctx.fillText("PLINTH", 350, H / 2 + 6);
  return c;
}

export default function RoadLogos({ position, size = [11, 38] }: { position: [number, number, number]; size?: [number, number] }) {
  const [tex, setTex] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    let dead = false;
    let made: THREE.CanvasTexture | null = null;
    (async () => {
      try { await document.fonts.load('700 200px "Clash Display"'); } catch {}
      const img = new Image();
      img.src = "/plinth-logo.png";
      let ok: HTMLImageElement | null = null;
      try { await img.decode(); ok = img; } catch {}
      if (dead) return;
      const t = new THREE.CanvasTexture(paint(ok));
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      made = t;
      setTex(t);
    })();
    return () => { dead = true; made?.dispose(); };
  }, []);

  if (!tex) return null;
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} renderOrder={2}>
      <planeGeometry args={size} />
      <meshBasicMaterial map={tex} transparent opacity={0.9} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}
