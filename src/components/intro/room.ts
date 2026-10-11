/**
 * Perspective "room" used by the intro loader.
 *
 * The geometry was fitted (least squares, ~6px RMS) to the reference frame:
 *   - back wall: 12 columns x 6 rows, sitting at 2x the depth of the near plane
 *   - side walls: 6 equal-depth slices, rows continue around the back wall
 *   - every vertical overshoots the floor by exactly one row (ruler ticks)
 *   - the camera rests slightly yawed / pitched, which is why the left wall
 *     looks a little nearer and the whole room sits up and to the left
 *
 * Nothing in here touches the DOM, so it can be unit-tested or reused.
 */

export type V3 = [number, number, number];
export type P2 = [number, number];
export type Pose = { cz: number; phi: number; psi: number; tx: number; ty: number };
export type Metrics = { W: number; H: number; F: number; hy: number; cols: number };
export type Seg = {
  a: V3;
  b: V3;
  /** progress (0..1) at which the segment starts drawing */
  start: number;
  /** progress span over which it draws */
  dur: number;
  /** draw from b -> a instead of a -> b */
  rev: boolean;
  alpha: number;
};

/** Resting camera, fitted to the reference screenshot. */
export const REST_POSE: Readonly<Pose> = {
  cz: 0,
  phi: 0.0597,
  psi: 0.0313,
  tx: -0.0833,
  ty: 0.0358,
};

export const ROWS = 6;
export const SLICES = 6;
/** focal length as a fraction of viewport width (near plane spans x in [-1, 1]) */
const FX = 0.4558;
/** half room height (world) * focal length / viewport height */
const HY_K = 0.3871;
const NEAR_EPS = 0.04;

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function metrics(W: number, H: number): Metrics {
  const F = FX * W;
  return { W, H, F, hy: (HY_K * H) / F, cols: W < 700 ? 6 : 12 };
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildSegs(m: Metrics, seed = 11): Seg[] {
  const rnd = mulberry32(seed);
  const { hy, cols } = m;
  const rowH = (2 * hy) / ROWS;
  const yOver = hy + rowH; // verticals run one row past the floor
  const out: Seg[] = [];

  const add = (a: V3, b: V3, bias: number) => {
    // most lines finish late and take long, so at ~95% many are still mid-stroke
    const finish = clamp(0.66 + 0.42 * rnd() + bias, 0.62, 1);
    const span = 0.3 + 0.35 * rnd();
    const start = Math.max(0, finish - span);
    out.push({
      a,
      b,
      start,
      dur: finish - start,
      rev: rnd() < 0.5,
      alpha: rnd() < 0.07 ? 0.62 : 0.2 + 0.18 * rnd(),
    });
  };

  // verticals are cut into thirds so they build up as dashes. The back wall
  // (cols + 1 of them) comes first, then one per depth slice on each side wall
  // (the back corner is shared).
  const vertical = (x: number, z: number, bias: number) => {
    for (let c = 0; c < 3; c++) {
      const y0 = lerp(-hy, yOver, c / 3);
      const y1 = lerp(-hy, yOver, (c + 1) / 3);
      add([x, y0, z], [x, y1, z], bias);
    }
  };
  for (let j = 0; j <= cols; j++) vertical(-1 + (2 * j) / cols, 2, -0.08);
  for (let i = 0; i < SLICES; i++) {
    const z = 1 + i / SLICES;
    const bias = i === 0 ? 0.06 : 0.03;
    vertical(-1, z, bias);
    vertical(1, z, bias);
  }

  // rows: one continuous line around left wall -> back wall -> right wall,
  // cut into chunks so they assemble like dashes while drawing
  const chunks = cols / 2;
  for (let k = 0; k <= ROWS; k++) {
    const y = -hy + k * rowH;
    for (let c = 0; c < 2; c++) {
      add([-1, y, 1 + c / 2], [-1, y, 1 + (c + 1) / 2], 0.04);
      add([1, y, 2 - c / 2], [1, y, 2 - (c + 1) / 2], 0.04);
    }
    for (let c = 0; c < chunks; c++) {
      add([-1 + (2 * c) / chunks, y, 2], [-1 + (2 * (c + 1)) / chunks, y, 2], -0.04);
    }
  }
  return out;
}

/* ------------------------------------------------------------------ camera */

function toCam(P: V3, pose: Pose): V3 {
  const dx = P[0] - pose.tx;
  const dy = P[1] - pose.ty;
  const dz = P[2] - pose.cz;
  const cp = Math.cos(pose.phi);
  const sp = Math.sin(pose.phi);
  const x1 = dx * cp - dz * sp;
  const z1 = dx * sp + dz * cp;
  const cs = Math.cos(pose.psi);
  const ss = Math.sin(pose.psi);
  return [x1, dy * cs - z1 * ss, dy * ss + z1 * cs];
}

export function project(P: V3, pose: Pose, m: Metrics): P2 | null {
  const c = toCam(P, pose);
  if (c[2] <= NEAR_EPS) return null;
  return [m.W / 2 + (m.F * c[0]) / c[2], m.H / 2 + (m.F * c[1]) / c[2]];
}

/** Projected back wall: TL, TR, BR, BL in viewport pixels. */
export function wallQuad(pose: Pose, m: Metrics): [P2, P2, P2, P2] {
  const p = (x: number, y: number) => project([x, y, 2], pose, m) ?? [m.W / 2, m.H / 2];
  return [p(-1, -m.hy), p(1, -m.hy), p(1, m.hy), p(-1, m.hy)];
}

/* ----------------------------------------------------------------- drawing */

const lerp3 = (a: V3, b: V3, t: number): V3 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

/** Project a world segment, clipping it against the camera's near plane. */
function projectSegment(A: V3, B: V3, pose: Pose, m: Metrics): [P2, P2] | null {
  let a = toCam(A, pose);
  let b = toCam(B, pose);
  if (a[2] <= NEAR_EPS && b[2] <= NEAR_EPS) return null;
  if (a[2] <= NEAR_EPS || b[2] <= NEAR_EPS) {
    const t = (NEAR_EPS - a[2]) / (b[2] - a[2]);
    const hit: V3 = [lerp(a[0], b[0], t), lerp(a[1], b[1], t), NEAR_EPS];
    if (a[2] <= NEAR_EPS) a = hit;
    else b = hit;
  }
  return [
    [m.W / 2 + (m.F * a[0]) / a[2], m.H / 2 + (m.F * a[1]) / a[2]],
    [m.W / 2 + (m.F * b[0]) / b[2], m.H / 2 + (m.F * b[1]) / b[2]],
  ];
}

export function drawRoom(
  ctx: CanvasRenderingContext2D,
  segs: Seg[],
  pose: Pose,
  m: Metrics,
  progress: number,
  dpr: number,
  rgb: [number, number, number],
  fade = 1,
) {
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, m.W, m.H);
  ctx.lineWidth = 1;
  ctx.lineCap = "butt";

  const stroke = (A: V3, B: V3, alpha: number) => {
    const s = projectSegment(A, B, pose, m);
    if (!s) return;
    ctx.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha * fade})`;
    ctx.beginPath();
    ctx.moveTo(s[0][0], s[0][1]);
    ctx.lineTo(s[1][0], s[1][1]);
    ctx.stroke();
  };

  for (const s of segs) {
    const t = clamp((progress - s.start) / s.dur);
    if (t <= 0) continue;
    const q = 1 - Math.pow(1 - t, 1.6);
    const o = s.rev ? s.b : s.a;
    const d = s.rev ? s.a : s.b;
    const head = lerp3(o, d, q);
    stroke(o, head, s.alpha);
    // the pen tip is darker while a line is still being drawn
    if (t < 1) stroke(lerp3(o, d, Math.max(0, q - 0.05)), head, Math.min(1, s.alpha + 0.3));
  }
}

export function hexToRgb(hex: string): [number, number, number] | null {
  const h = hex.trim().replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  return [parseInt(full.slice(0, 2), 16), parseInt(full.slice(2, 4), 16), parseInt(full.slice(4, 6), 16)];
}

export function parseCssColor(color: string): [number, number, number] | null {
  if (!color) return null;
  const hex = hexToRgb(color);
  if (hex) return hex;
  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (rgbMatch) {
    return [parseInt(rgbMatch[1], 10), parseInt(rgbMatch[2], 10), parseInt(rgbMatch[3], 10)];
  }
  return null;
}

