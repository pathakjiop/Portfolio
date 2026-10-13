/**
 * Wireframe laptop — pure geometry + pose math (no three.js / React imports).
 *
 * Coordinate system (right-handed, y up, camera looks down -z):
 *   base:  x ∈ [-W/2, W/2]   y ∈ [0, BASE_T]   z ∈ [-D/2, D/2]   (z = +D/2 is the front edge)
 *   hinge: along x at (y = BASE_T, z = -D/2)
 *
 * The lid is authored in its OWN local frame (a "closed" laptop):
 *   the screen face is the plane y = 0 spanning x ∈ [-W/2, W/2] and v ∈ [0, LID_H]
 *   (v is stored in the z component), the outer shell sits at y = +LID_T.
 * Rotating that frame about the x axis by -θ and moving it to the hinge opens the lid:
 *   θ = 0      closed, flat on the keyboard
 *   θ = π/2    vertical
 *   θ ≈ 1.95   a comfortable "open" laptop
 * `lidToBase()` applies exactly that transform, so the three.js scene (group rotation.x = -θ)
 * and the 2D preview agree.
 */

export type Seg = [number, number, number, number, number, number];

export const W = 3.4;
export const D = 2.3;
export const BASE_T = 0.075;
export const LID_T = 0.05;
export const LID_H = 2.2;
export const BEZEL = 0.1;

export const HINGE_Y = BASE_T;
export const HINGE_Z = -D / 2;

const rect = (x0: number, x1: number, a0: number, a1: number, fixed: number, plane: "xz" | "xv"): Seg[] => {
  // plane "xz": rectangle at y = fixed in x/z.  plane "xv": rectangle at y = fixed in x/v (v stored in z).
  void plane;
  return [
    [x0, fixed, a0, x1, fixed, a0],
    [x1, fixed, a0, x1, fixed, a1],
    [x1, fixed, a1, x0, fixed, a1],
    [x0, fixed, a1, x0, fixed, a0],
  ];
};

/** Static base: slab edges, deck lip, trackpad. Ordered so a "draw-on" reads naturally. */
export function buildBaseOutline(): Seg[] {
  const hx = W / 2;
  const hz = D / 2;
  const segs: Seg[] = [];
  // top + bottom perimeters
  segs.push(...rect(-hx, hx, -hz, hz, BASE_T, "xz"));
  segs.push(...rect(-hx, hx, -hz, hz, 0, "xz"));
  // vertical corner edges
  for (const [x, z] of [
    [-hx, hz],
    [hx, hz],
    [hx, -hz],
    [-hx, -hz],
  ] as const) {
    segs.push([x, 0, z, x, BASE_T, z]);
  }
  // inset deck lip (gives the double-stroke look of the reference)
  const i = 0.06;
  segs.push(...rect(-hx + i, hx - i, -hz + i, hz - i, BASE_T, "xz"));
  // trackpad
  segs.push(...rect(-0.55, 0.55, 0.5, 1.0, BASE_T, "xz"));
  return segs;
}

/** Keyboard: a grid of key outlines (renders as the dense red block in the reference). */
export function buildKeys(): Seg[] {
  const rows = 6;
  const cols = 14;
  const x0 = -1.46;
  const x1 = 1.46;
  const z0 = -0.95; // back row
  const z1 = 0.28; // front row
  const gap = 0.025;
  const kw = (x1 - x0) / cols;
  const kh = (z1 - z0) / rows;
  const segs: Seg[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const ax = x0 + c * kw + gap;
      const bx = x0 + (c + 1) * kw - gap;
      const az = z0 + r * kh + gap;
      const bz = z0 + (r + 1) * kh - gap;
      segs.push(...rect(ax, bx, az, bz, BASE_T, "xz"));
    }
  }
  return segs;
}

/** Lid in its local (closed) frame — see header comment. */
export function buildLid(): Seg[] {
  const hx = W / 2;
  const segs: Seg[] = [];
  // draw order: left edge up, across the top, down the right, then the bottom
  segs.push([-hx, 0, 0, -hx, 0, LID_H]);
  segs.push([-hx, 0, LID_H, hx, 0, LID_H]);
  segs.push([hx, 0, LID_H, hx, 0, 0]);
  segs.push([hx, 0, 0, -hx, 0, 0]);
  // shell outline
  segs.push(...rect(-hx, hx, 0, LID_H, LID_T, "xv"));
  // thickness connectors
  for (const [x, v] of [
    [-hx, 0],
    [hx, 0],
    [hx, LID_H],
    [-hx, LID_H],
  ] as const) {
    segs.push([x, 0, v, x, LID_T, v]);
  }
  // bezel (the screen rectangle)
  segs.push(...rect(-hx + BEZEL, hx - BEZEL, BEZEL, LID_H - BEZEL, -0.002, "xv"));
  return segs;
}

/** Screen rectangle in lid-local space, plus its size — used for the textured plane. */
export const SCREEN = {
  width: W - BEZEL * 2,
  height: LID_H - BEZEL * 2,
  /** centre of the screen in lid-local coordinates (x, y, v) */
  center: [0, -0.004, LID_H / 2] as [number, number, number],
};

export function flatten(segs: Seg[]): Float32Array {
  const out = new Float32Array(segs.length * 6);
  segs.forEach((s, i) => out.set(s, i * 6));
  return out;
}

/* ------------------------------------------------------------------ pose */

export type Pose = { yaw: number; pitch: number; lid: number };

/** Lid angle used while spinning (radians). */
export const LID_OPEN = 1.9;

/** Number of full turns the laptop makes between scroll 0 and scroll 1. */
export const TURNS = 1.75;

/** Yaw at scroll 0, i.e. where the intro settles. */
export const YAW_START = -0.3;

export const PITCH_VIEW = 0.42;

/** Pose for a scroll progress p ∈ [0, 1]. */
export function poseAt(p: number): Pose {
  const t = Math.min(1, Math.max(0, p));
  const yaw = YAW_START + t * TURNS * Math.PI * 2;
  // tiny breathing in the lid angle so the silhouette never feels mechanical
  const lid = LID_OPEN + Math.sin(t * Math.PI * 4) * 0.32;
  return { yaw, pitch: PITCH_VIEW, lid };
}

/** Hero pose: straight-on, like the first view in the reference (frame ≈ 72). */
export const HERO_POSE: Pose = { yaw: -0.04, pitch: 0.2, lid: 1.8 };

/* ------------------------------------------------- preview-only projection */

type V3 = [number, number, number];

const rotX = (p: V3, a: number): V3 => {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
};
const rotY = (p: V3, a: number): V3 => {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
};

/** Move a lid-local point into base space for a lid opening angle θ. */
export function lidToBase(p: V3, theta: number): V3 {
  const r = rotX(p, -theta);
  return [r[0], r[1] + HINGE_Y, r[2] + HINGE_Z];
}

/** Visual centre of the opened laptop; the scene subtracts this so it spins about its middle. */
export const CENTER: [number, number, number] = [0, 1.0, -0.3];

export type Camera = { distance: number; fovDeg: number; width: number; height: number };

/** Project a base-space point to screen pixels: world → yaw (about y) → pitch (about x) → perspective. */
export function project(p: V3, pose: Pose, cam: Camera, offset: [number, number] = [0, 0]): [number, number] {
  let q = rotY([p[0] - CENTER[0], p[1] - CENTER[1], p[2] - CENTER[2]], pose.yaw);
  q = rotX(q, pose.pitch);
  const z = cam.distance - q[2];
  const f = 1 / Math.tan((cam.fovDeg * Math.PI) / 360);
  const sx = (q[0] * f) / z;
  const sy = (q[1] * f) / z;
  return [cam.width / 2 + sx * (cam.height / 2) + offset[0], cam.height / 2 - sy * (cam.height / 2) + offset[1]];
}
