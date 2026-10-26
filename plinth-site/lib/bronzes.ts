/**
 * Art direction as data. Every transform for the eight bronze pieces lives here.
 * Models are normalised GLBs (largest axis = 1, centred), so `scale` is the on-screen size in world units.
 * Camera: [0,0,9], fov 32 -> ~5.2 units tall, ~9.2 wide at z=0 on a 16:9 stage.
 */
export type V3 = [number, number, number];

export type BronzeCfg = {
  src: string;
  name: string;
  desc: string;
  base: V3;      // resting position
  scale: number;
  rot0: V3;      // initial rotation (radians)
  move: V3;      // parallax travel across the whole act
  rotDelta: V3;  // extra rotation applied while parting
  aside: V3;     // offset when the artifacts part and clear the centre
};

const M = "/models/";

export const BRONZES: BronzeCfg[] = [
  { src: M + "benin-bronze-2-3d.glb", name: "Benin Bronze Mask", desc: "Cast brass portraiture from the Kingdom of Benin.",
    base: [0.9, 1.7, 0.2], scale: 1.6, rot0: [0, 0.5, 0], move: [0.1, 0.3, 0], rotDelta: [0.1, 1.4, 0], aside: [-6.4, 0.9, 0] },
  { src: M + "benin-bronze-3-3d.glb", name: "Benin Bronze Head", desc: "A commemorative head, made by lost-wax casting.",
    base: [0.9, -1.6, 0.6], scale: 1.5, rot0: [0, -0.6, 0], move: [-0.1, 0.25, 0], rotDelta: [0, -1.2, 0.1], aside: [-6.0, -1.4, 0.4] },
  { src: M + "igbo-ukwu-castings-3d.glb", name: "Igbo-Ukwu Casting", desc: "Intricate bronze work from the Igbo-Ukwu tradition.",
    base: [3.7, 1.5, 0], scale: 1.7, rot0: [0, 0.2, 0], move: [-0.1, 0.2, 0], rotDelta: [0, 1.6, 0], aside: [2.8, 1.6, 0] },
  { src: M + "nok-terracottas-3d.glb", name: "Nok Terracotta", desc: "Fired clay sculpture from the Nok culture.",
    base: [2.9, -1.2, 0.5], scale: 1.8, rot0: [0, -0.3, 0], move: [0.15, 0.2, 0], rotDelta: [0, -1.3, 0], aside: [2.6, -1.4, 0.4] },
  { src: M + "ife-bronze-head-3d.glb", name: "Ife Bronze Head", desc: "A naturalistic head cast in Ile-Ife.",
    base: [2.0, 2.4, -0.5], scale: 1.3, rot0: [0, 0.1, 0], move: [0, 0.3, 0], rotDelta: [0, 1.1, 0], aside: [-4.4, 2.0, -0.5] },
  { src: M + "benin-bronze-4-3d.glb", name: "Benin Leopard Mask", desc: "The leopard, a royal emblem in Benin art.",
    base: [4.5, -2.0, -0.3], scale: 1.2, rot0: [0, 0.7, 0], move: [0.1, 0.15, 0], rotDelta: [0, 1.0, 0], aside: [1.6, -1.3, -0.3] },
  { src: M + "benin-leopard-3d.glb", name: "Benin Bronze Leopard", desc: "A cast leopard figure from Benin.",
    base: [-0.1, 0.1, -0.4], scale: 1.1, rot0: [0, -0.8, 0], move: [0.1, 0.2, 0], rotDelta: [0, -1.1, 0], aside: [-5.2, 0.4, -0.2] },
  { src: M + "nok-terracottas-1-3d.glb", name: "Nok Terracotta Head", desc: "A terracotta head from the Nok culture.",
    base: [4.1, 0.2, 0.9], scale: 1.0, rot0: [0, 0.4, 0], move: [0, 0.1, 0], rotDelta: [0, 1.5, 0], aside: [1.4, 0.6, 0.9] },
];

/** Act timeline (normalised scroll progress). One source of truth for DOM and WebGL. */
export const T = {
  cardsIn: [0, 0.16], bronzeIn: [0.16, 0.3], copyOut: [0.3, 0.42],
  part: [0.42, 0.68], bg: [0.44, 0.64], rise: [0.64, 0.96], bronzeOut: [0.6, 0.76],
} as const;

export const seg = (p: number, [a, b]: readonly [number, number]) => Math.min(1, Math.max(0, (p - a) / (b - a)));
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
