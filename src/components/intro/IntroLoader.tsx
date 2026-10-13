import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";

/**
 * Intro loader – "room" intro (rebuilt from a frame-by-frame study of a screen recording)
 * ---------------------------------------------------------------------------------------
 * Timeline (seconds from mount, `u`):
 *   0.05  small wireframe room; back-wall grid lines fade in one by one; counter 000
 *   0.35  counter starts: 0 → 13 → 42 → 58 … 99 (fast ease-out), side walls fade in
 *   1.25  name wordmark pops onto the back wall
 *   1.35  white photo placeholder appears on the wall
 *   1.55  photo wipes in top → bottom (waits here, counter parked, until images are loaded)
 *   2.05  counter hits 100
 *   2.75  camera rushes forward (wall 51 % → 100 % of the viewport width in ~0.5 s)
 *   3.40  grid fades out
 *   3.50  the wall photo glides LEFT and scales into the hero's left image slot
 *   3.75  name + counter fade out
 *   4.00  landed → hero revealed (onReveal), overlay background removed
 *   4.20  done (onDone)
 *
 * The room is a real pinhole projection (back wall + two side walls, ceiling and floor are
 * open). The camera path is keyframed from measurements of the recording.
 *
 * Stacking: the overlay is z-[45]: above the hero (z-40) and the fixed header (z-30), so the
 * hero and nav are revealed when the overlay's background goes away at the end.
 */

let played = false;

/** True once the intro has run in this page session (client-side navigation back to "/" skips it). */
export function hasIntroPlayed(): boolean {
  return played;
}

type Props = {
  heroRef: RefObject<HTMLElement | null>;
  /** element the wall photo lands on (the hero's left image slot) */
  targetRef?: RefObject<HTMLElement | null>;
  /** extra image URLs to wait for before the intro may continue */
  assets?: string[];
  /** fired when the photo has landed and the hero starts animating in */
  onReveal?: () => void;
  /** fired when everything is finished – parent should unmount the loader */
  onDone?: () => void;
};

// ---- the photo that sits on the wall (must be the first quote slide of the hero) ----
const PHOTO_LIGHT = "/media/qoutes/light/quote1.png?v=2";
const PHOTO_DARK = "/media/qoutes/dark/quote1.png?v=2";

// ---- timeline (seconds) -----------------------------------------------------------
const FREEZE_AT = 1.55; // park here until images are ready
const ASSET_TIMEOUT_S = 5;
const T_COUNT_100 = 2.05;
const T_NAME_IN = 1.25;
const T_PHOTO_BOX = 1.35;
const T_PHOTO_WIPE = 1.55;
const T_PHOTO_WIPE_S = 0.25;
const T_GRID_FADE = 3.4;
const T_GRID_FADE_S = 0.4;
const T_MOVE = 3.5;
const T_MOVE_S = 0.5;
const T_DECO_FADE = 3.75;
const T_DECO_FADE_S = 0.4;
const T_LAND = T_MOVE + T_MOVE_S; // 4.0
const T_DONE = 4.2;

// ---- room ------------------------------------------------------------------------------
const WALL_A = 2.42; // wall half-width in units where half-height = 1  (aspect 2.42 : 1)
const COLS = 12;
const ROWS = 6;
const RING = 0.4; // spacing of side-wall depth rings
const VP_Y = 0.46; // vanishing point (fraction of viewport height); x is centred

// back-wall camera path: wall width as fraction of viewport width, wall centre as fractions
const WF: [number, number][] = [
  [0, 0.42], [0.65, 0.425], [1.45, 0.448], [2.05, 0.479], [2.25, 0.484], [2.55, 0.509],
  [2.75, 0.512], [2.85, 0.675], [2.95, 0.769], [3.05, 0.919], [3.15, 0.96], [3.25, 1.0],
];
// horizontal drift comes from the mouse now (see MOUSE_*), so the base path is centred
const CXF: [number, number][] = [[0, 0.5], [3.25, 0.5]];
const CYF: [number, number][] = [[0, 0.46], [2.75, 0.48], [3.15, 0.43], [3.25, 0.43]];

// mouse parallax: the whole room (walls, photo, name, counter) follows the cursor.
// Fraction of the viewport the wall may shift at the screen edge; fades out during the rush.
const MOUSE_X = 0.03;
const MOUSE_Y = 0.03;
const MOUSE_EASE = 0.03; // smoothing per frame
const MOUSE_FADE_START = 2.75;
const MOUSE_FADE_S = 0.5;

// counter readout measured from the recording
const COUNT: [number, number][] = [
  [0.35, 0], [0.45, 13], [0.55, 42], [0.65, 58], [0.75, 68], [0.85, 77], [0.95, 82], [1.05, 87],
  [1.15, 91], [1.25, 93], [1.35, 95], [1.45, 96], [1.55, 97],
];

// photo glide: fast start, long settle (progress at 20/40/60/80 % of the duration)
const MOVE: [number, number][] = [[0, 0], [0.2, 0.19], [0.4, 0.78], [0.6, 0.9], [0.8, 0.975], [1, 1]];

// layout of things on the wall (fractions of the wall rect)
// the photo sits exactly on the wall grid: columns 6 → 11 (of 12), rows 1 → 4 (of 6)
const PHOTO_FR = { x: 6 / COLS, y: 1 / ROWS, w: 5 / COLS, h: 3 / ROWS };
const REF_W = 973; // reference wall width in px for the name / counter
const REF_H = 402;
// "Namaste." stands on the grid line below the photo's bottom edge (row line 5 of 6),
// starting on column line 1. NAME_SIZE is in wall px (1rem = 16).
const NAME_SIZE = 56;
const NAME_REF = {
  left: REF_W / COLS, // column line 1
  // Yatra One's baseline sits ≈1.11em below the top of a line-height:1 box (measured from a render),
  // so 1.19em puts the baseline ≈0.08em ABOVE row line 5 instead of on / below it.
  top: (5 / ROWS) * REF_H - NAME_SIZE * 1.19,
};
// counter: inside the bottom-left two cells of the wall (same 48px size), overlapping the grid lines
const COUNTER_REF = { left: 16, top: REF_H - REF_H / ROWS + 9 };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** monotone cubic through keyframes; ends are clamped */
function makeCurve(keys: [number, number][], flatEnds = false) {
  const n = keys.length;
  const t = keys.map((k) => k[0]);
  const y = keys.map((k) => k[1]);
  const m = new Array<number>(n).fill(0);
  for (let i = 1; i < n - 1; i++) {
    const s0 = (y[i] - y[i - 1]) / (t[i] - t[i - 1]);
    const s1 = (y[i + 1] - y[i]) / (t[i + 1] - t[i]);
    m[i] = s0 * s1 <= 0 ? 0 : (2 * s0 * s1) / (s0 + s1);
  }
  if (!flatEnds) {
    m[0] = (y[1] - y[0]) / (t[1] - t[0]);
    m[n - 1] = (y[n - 1] - y[n - 2]) / (t[n - 1] - t[n - 2]);
  }
  return (x: number) => {
    if (x <= t[0]) return y[0];
    if (x >= t[n - 1]) return y[n - 1];
    let i = 0;
    while (x > t[i + 1]) i++;
    const h = t[i + 1] - t[i];
    const s = (x - t[i]) / h;
    const s2 = s * s;
    const s3 = s2 * s;
    return (
      (2 * s3 - 3 * s2 + 1) * y[i] +
      (s3 - 2 * s2 + s) * h * m[i] +
      (-2 * s3 + 3 * s2) * y[i + 1] +
      (s3 - s2) * h * m[i + 1]
    );
  };
}

const wfAt = makeCurve(WF);
const cxfAt = makeCurve(CXF);
const cyfAt = makeCurve(CYF);
const countAt = makeCurve(COUNT);
const moveAt = makeCurve(MOVE, true);

function preload(urls: string[]): Promise<void> {
  if (typeof window === "undefined" || urls.length === 0) return Promise.resolve();
  return Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // a missing file never blocks the intro
          img.src = src;
          if (img.complete) resolve();
        }),
    ),
  ).then(() => undefined);
}

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function IntroLoader({ heroRef, targetRef, assets = [], onReveal, onDone }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const decoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);

  // keep latest callbacks without restarting the animation
  const cb = useRef({ onReveal, onDone });
  cb.current = { onReveal, onDone };

  // lock scroll for the duration of the intro
  useIsoLayoutEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const cv = canvasRef.current;
    const deco = decoRef.current;
    const nameEl = nameRef.current;
    const cnt = counterRef.current;
    const photo = photoRef.current;
    const wipe = wipeRef.current;
    if (!root || !cv || !deco || !nameEl || !cnt || !photo || !wipe) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const speed = reduce ? 3 : 1;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let dpr = 1;
    function layout() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      cv!.width = Math.round(W * dpr);
      cv!.height = Math.round(H * dpr);
    }

    // per-line random fade-in delays for the back-wall grid
    const vDelay = Array.from({ length: COLS + 1 }, () => 0.05 + Math.random() * 0.45);
    const hDelay = Array.from({ length: ROWS + 1 }, () => 0.05 + Math.random() * 0.45);

    // ---- asset gate ---------------------------------------------------------------
    let ready = false;
    const markReady = () => {
      ready = true;
    };
    const fontReady = document.fonts?.load
      ? document.fonts.load('700 28px "Yatra One"').then(() => undefined, () => undefined)
      : Promise.resolve();
    Promise.all([preload([PHOTO_LIGHT, PHOTO_DARK, ...assets]), fontReady]).then(markReady);
    const timeout = window.setTimeout(markReady, ASSET_TIMEOUT_S * 1000);

    // ---- helpers ------------------------------------------------------------------
    function targetRect() {
      const el =
        targetRef?.current ??
        (heroRef.current?.firstElementChild?.firstElementChild as HTMLElement | null) ??
        null;
      if (el) {
        const r = el.getBoundingClientRect();
        return { x: r.left, y: r.top, w: r.width, h: r.height };
      }
      return { x: 0, y: H * 0.1, w: W * 0.66, h: H * 0.45 };
    }

    function drawRoom(
      wall: { cx: number; cy: number; w: number; h: number },
      u: number,
      gridFade: number,
    ) {
      const f = 0.9 * H;
      const vx = W / 2;
      const vy = H * VP_Y;
      const d = (2 * f) / wall.h; // depth of the back wall
      const xc = ((vx - wall.cx) * d) / f; // camera offset so the wall lands on its keyframed rect
      const yc = ((vy - wall.cy) * d) / f;
      const P = (X: number, Y: number, z: number): [number, number] => [
        vx + (f * (X - xc)) / z,
        vy + (f * (Y - yc)) / z,
      ];

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, W, H);
      ctx!.lineWidth = 1;
      ctx!.strokeStyle =
        getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim() ||
        "#143642";

      const line = (a: [number, number], b: [number, number], alpha: number) => {
        if (alpha <= 0.002) return;
        ctx!.globalAlpha = alpha;
        ctx!.beginPath();
        ctx!.moveTo(a[0], a[1]);
        ctx!.lineTo(b[0], b[1]);
        ctx!.stroke();
      };

      const BACK = 0.55 * gridFade;
      const SIDE = 0.4 * gridFade * clamp((u - 0.5) / 0.9);
      const NEAR = 0.12;

      // back wall 12 × 6, each line fading in at its own moment
      for (let i = 0; i <= COLS; i++) {
        const X = -WALL_A + (2 * WALL_A * i) / COLS;
        line(P(X, -1, d), P(X, 1, d), BACK * clamp((u - vDelay[i]) / 0.25));
      }
      for (let j = 0; j <= ROWS; j++) {
        const Y = -1 + (2 * j) / ROWS;
        line(P(-WALL_A, Y, d), P(WALL_A, Y, d), BACK * clamp((u - hDelay[j]) / 0.25));
      }

      // side walls: rows converge to the back wall (ceiling / floor edges included, nothing between)
      for (let j = 0; j <= ROWS; j++) {
        const Y = -1 + (2 * j) / ROWS;
        line(P(-WALL_A, Y, NEAR), P(-WALL_A, Y, d), SIDE);
        line(P(WALL_A, Y, NEAR), P(WALL_A, Y, d), SIDE);
      }
      // side walls: depth rings, fixed in the world so they stream past the camera
      for (let k = 1; ; k++) {
        const z = d - k * RING;
        if (z < NEAR) break;
        line(P(-WALL_A, -1, z), P(-WALL_A, 1, z), SIDE);
        line(P(WALL_A, -1, z), P(WALL_A, 1, z), SIDE);
      }
      ctx!.globalAlpha = 1;
    }

    // ---- mouse parallax --------------------------------------------------------------
    let mxT = 0; // target, -1 … 1 (0 = centre)
    let myT = 0;
    let mx = 0; // smoothed
    let my = 0;
    const onMove = (e: PointerEvent) => {
      mxT = (e.clientX / Math.max(1, W) - 0.5) * 2;
      myT = (e.clientY / Math.max(1, H) - 0.5) * 2;
    };
    if (!reduce) window.addEventListener("pointermove", onMove, { passive: true });

    // ---- main loop -----------------------------------------------------------------
    let raf = 0;
    let t0: number | null = null;
    let delay = -1; // time spent parked waiting for assets
    let landed = false;
    let finished = false;

    function frame(now: number) {
      if (finished) return;
      if (t0 === null) t0 = now;
      const T = ((now - t0) / 1000) * speed;

      // park at FREEZE_AT until everything is loaded
      let u: number;
      if (!ready && T < ASSET_TIMEOUT_S) {
        u = Math.min(T, FREEZE_AT);
      } else {
        if (delay < 0) delay = Math.max(0, T - FREEZE_AT);
        u = T - delay;
      }

      // wall rectangle (screen px)
      const uc = Math.min(u, 3.25);
      const wf = wfAt(uc);
      const ww = wf * W;
      // wall aspect (width : height) = WALL_A, i.e. 2a : 2
      mx += (mxT - mx) * MOUSE_EASE;
      my += (myT - my) * MOUSE_EASE;
      const mf = 1 - clamp((u - MOUSE_FADE_START) / MOUSE_FADE_S);
      const wall = {
        w: ww,
        h: ww / WALL_A,
        cx: cxfAt(uc) * W + mx * MOUSE_X * W * mf,
        cy: cyfAt(uc) * H + my * MOUSE_Y * H * mf,
      };
      const wl = wall.cx - wall.w / 2;
      const wt = wall.cy - wall.h / 2;

      // ---- room
      const gridFade = 1 - clamp((u - T_GRID_FADE) / T_GRID_FADE_S);
      drawRoom(wall, u, gridFade);

      // ---- name + counter live in the wall frame (scale with the camera)
      const decoFade = 1 - clamp((u - T_DECO_FADE) / T_DECO_FADE_S);
      const s = wall.w / REF_W;
      deco!.style.transform = `translate(${wl}px, ${wt}px) scale(${s})`;
      deco!.style.opacity = String(decoFade);
      nameEl!.style.opacity = u >= T_NAME_IN ? "1" : "0";

      // counter
      const n = u >= T_COUNT_100 ? 100 : Math.round(countAt(u));
      cnt!.textContent = String(n).padStart(3, "0");

      // ---- photo
      let px = wl + PHOTO_FR.x * wall.w;
      let py = wt + PHOTO_FR.y * wall.h;
      let pw = PHOTO_FR.w * wall.w;
      let ph = PHOTO_FR.h * wall.h;
      if (u >= T_MOVE) {
        const tr = targetRect();
        const e = moveAt(clamp((u - T_MOVE) / T_MOVE_S));
        px += (tr.x - px) * e;
        py += (tr.y - py) * e;
        pw += (tr.w - pw) * e;
        ph += (tr.h - ph) * e;
      }
      photo!.style.display = u >= T_PHOTO_BOX && !landed ? "block" : "none";
      photo!.style.left = `${px}px`;
      photo!.style.top = `${py}px`;
      photo!.style.width = `${pw}px`;
      photo!.style.height = `${ph}px`;
      // image wipes in top → bottom over the white placeholder
      const wp = clamp((u - T_PHOTO_WIPE) / T_PHOTO_WIPE_S);
      wipe!.style.clipPath = `inset(0 0 ${(1 - wp) * 100}% 0)`;

      // ---- landing
      if (u >= T_LAND && !landed) {
        landed = true;
        root!.style.background = "transparent";
        root!.style.pointerEvents = "none";
        photo!.style.display = "none";
        cb.current.onReveal?.();
      }
      if (u >= T_DONE) {
        finished = true;
        played = true;
        cb.current.onDone?.();
        return;
      }
      raf = requestAnimationFrame(frame);
    }

    layout();
    window.addEventListener("resize", layout);
    raf = requestAnimationFrame(frame);

    return () => {
      finished = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      window.removeEventListener("resize", layout);
      window.removeEventListener("pointermove", onMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[45] overflow-hidden bg-paper text-primary select-none"
    >
      {/* Yatra One for the wordmark (React 19 hoists this into <head>) */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Yatra+One&display=swap"
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* name + counter, laid out in the back wall's own coordinate frame */}
      <div
        ref={decoRef}
        className="absolute left-0 top-0"
        style={{
          width: REF_W,
          height: REF_H,
          transformOrigin: "0 0",
          // hidden until the first frame has placed it on the wall (no flash of "000" at the screen edge)
          opacity: 0,
          transform: "scale(0)",
        }}
      >
        <div
          ref={nameRef}
          className="absolute"
          style={{
            left: NAME_REF.left,
            top: NAME_REF.top,
            opacity: 0,
            fontSize: NAME_SIZE,
          }}
        >
          {/* "Namaste." wordmark – same rules as the site's wordmark, inlined so it can't clash with
              the existing mask-based `.wordmark` class in styles.css */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "baseline",
              fontFamily: 'var(--font-hindi), "Yatra One", serif',
              fontSize: "1em",
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: "0.02em",
              color: "currentColor",
              textDecoration: "none",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            Namaste.
          </span>
        </div>
        <div
          ref={counterRef}
          className="absolute font-bold tabular-nums text-primary"
          style={{
            left: COUNTER_REF.left,
            top: COUNTER_REF.top,
            fontSize: 40,
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          000
        </div>
      </div>

      {/* wall photo: white placeholder, image wipes in over it, later glides into the hero */}
      <div ref={photoRef} className="absolute bg-white" style={{ display: "none" }}>
        <div ref={wipeRef} className="absolute inset-0" style={{ clipPath: "inset(0 0 100% 0)" }}>
          <img
            src={PHOTO_LIGHT}
            alt=""
            className="quote-light absolute inset-0 h-full w-full object-cover"
          />
          <img
            src={PHOTO_DARK}
            alt=""
            className="quote-dark absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default IntroLoader;