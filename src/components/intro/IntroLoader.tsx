import { useEffect, useRef, type RefObject } from "react";
import {
  REST_POSE,
  buildSegs,
  clamp,
  drawRoom,
  hexToRgb,
  parseCssColor,
  lerp,
  metrics,
  project,
  wallQuad,
  type Metrics,
  type Pose,
  type Seg,
} from "./room";

/**
 * Intro loader: a perspective room is drawn line by line while a counter runs
 * 000 -> 100 (gated by real asset loading). The camera then dollies into the
 * back wall, which opens as a window onto the hero.
 *
 * Colours come from --intro-bg / --intro-ink in styles.css.
 */

let played = false;
/** true once the intro has run in this page load (so client-side navigation skips it) */
export const hasIntroPlayed = () => played;

type Props = {
  /** the hero element that gets revealed through the back wall */
  heroRef: RefObject<HTMLElement | null>;
  /** images to wait for (a 404 counts as loaded, so a missing file never hangs the loader) */
  assets?: string[];
  /** fired once the window is about half open - start the hero's own entrance here */
  onReveal: () => void;
  /** fired when the loader is finished - unmount it here */
  onDone: () => void;
};

const MIN_LOAD = 2500; // ms - the counter never finishes faster than this
const MAX_WAIT = 6000; // ms - give up waiting for assets
const HOLD = 420; // ms - pause on 100
const DOLLY = 1750; // ms - camera push-in + window opening
const CZ_END = 1.32; // camera depth at the end (back wall is at 2)

const easeIO = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 2.2);

const HERO_STYLES = ["zIndex", "willChange", "opacity", "clipPath", "transform", "transformOrigin"] as const;

export function IntroLoader({ heroRef, assets = [], onReveal, onDone }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const cntRef = useRef<HTMLDivElement>(null);
  const cb = useRef({ onReveal, onDone });
  cb.current = { onReveal, onDone };
  const assetKey = assets.join("|");

  useEffect(() => {
    const root = rootRef.current;
    const cv = cvRef.current;
    const cnt = cntRef.current;
    if (!root || !cv || !cnt) return;
    const ctx = cv.getContext("2d");
    const hero = heroRef.current;
    const html = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dead = false;
    let ro: ResizeObserver | null = null;
    let raf = 0;
    let failsafe = 0;
    let fadeTimer = 0;

    /* ---- lock scrolling while the intro runs --------------------------- */
    html.dataset.intro = "on";
    window.scrollTo(0, 0);
    const block = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const onKey = (e: KeyboardEvent) => {
      if ([" ", "PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown"].includes(e.key)) e.preventDefault();
    };
    const onScroll = () => {
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };
    window.addEventListener("wheel", block, { passive: false, capture: true });
    window.addEventListener("touchmove", block, { passive: false, capture: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });

    const resetHero = () => {
      if (!hero) return;
      for (const k of HERO_STYLES) hero.style[k] = "";
    };
    const teardown = () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
      window.clearTimeout(fadeTimer);
      window.removeEventListener("wheel", block, { capture: true });
      window.removeEventListener("touchmove", block, { capture: true });
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      ro?.disconnect();
    };
    const finish = () => {
      if (dead) return;
      dead = true;
      teardown();
      resetHero();
      delete html.dataset.intro; // header slides in
      played = true;
      cb.current.onDone();
    };

    /* ---- reduced motion: no animation at all --------------------------- */
    if (reduce || !ctx) {
      cnt.textContent = "100";
      cb.current.onReveal();
      root.style.transition = "opacity 300ms ease";
      requestAnimationFrame(() => (root.style.opacity = "0"));
      fadeTimer = window.setTimeout(finish, 320);
      return () => {
        dead = true;
        window.removeEventListener("wheel", block, { capture: true });
        window.removeEventListener("touchmove", block, { capture: true });
        window.removeEventListener("keydown", onKey);
        window.removeEventListener("scroll", onScroll);
        window.clearTimeout(fadeTimer);
        delete html.dataset.intro;
      };
    }

    const ink =
      parseCssColor(getComputedStyle(root).getPropertyValue("--intro-ink")) ??
      parseCssColor(getComputedStyle(root).color) ??
      [20, 54, 66];

    /* ---- sizing -------------------------------------------------------- */
    let m: Metrics = metrics(1, 1);
    let segs: Seg[] = [];
    let dpr = 1;
    const layout = () => {
      const r = root.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      m = metrics(r.width, r.height);
      cv.width = Math.round(r.width * dpr);
      cv.height = Math.round(r.height * dpr);
      segs = buildSegs(m);
    };
    ro = new ResizeObserver(layout);
    ro.observe(root);
    layout();

    /* ---- pointer parallax ---------------------------------------------- */
    const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
    function onMove(e: PointerEvent) {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("pointermove", onMove, { passive: true });

    /* ---- real loading progress ----------------------------------------- */
    const list = assetKey ? assetKey.split("|") : [];
    const total = list.length + 1; // + fonts
    let loaded = 0;
    const bump = () => {
      loaded = Math.min(total, loaded + 1);
    };
    (document.fonts?.ready ?? Promise.resolve()).then(bump, bump);
    for (const src of list) {
      const im = new Image();
      im.onload = bump;
      im.onerror = bump;
      im.src = src;
    }
    failsafe = window.setTimeout(() => (loaded = total), MAX_WAIT);

    /* ---- timeline ------------------------------------------------------- */
    type Phase = "load" | "hold" | "dolly";
    let phase: Phase = "load";
    let t0 = -1;
    let last = 0;
    let tHold = 0;
    let tDolly = 0;
    let shown = 0;
    let revealed = false;
    let heroRect: DOMRect | null = null;

    const startDolly = (now: number) => {
      phase = "dolly";
      tDolly = now;
      if (hero) {
        heroRect = hero.getBoundingClientRect();
        hero.style.zIndex = "60";
        hero.style.willChange = "clip-path, transform, opacity";
        hero.style.opacity = "0";
      }
    };

    const frame = (now: number) => {
      if (dead) return;
      if (t0 < 0) {
        t0 = now;
        last = now;
      }
      const dt = Math.min(64, now - last);
      last = now;
      const t = now - t0;

      const k = 1 - Math.exp(-dt / 140);
      mouse.sx += (mouse.x - mouse.sx) * k;
      mouse.sy += (mouse.y - mouse.sy) * k;

      if (phase === "load") {
        const timeP = easeOut(clamp(t / MIN_LOAD));
        const assetP = loaded / total;
        const cap = assetP >= 1 ? 1 : 0.12 + 0.8 * assetP;
        const target = Math.min(timeP, cap) * 100;
        shown += (target - shown) * (1 - Math.exp(-dt / 110));
        if (target >= 100 && shown > 99.6) {
          shown = 100;
          phase = "hold";
          tHold = now;
        }
      } else if (phase === "hold" && now - tHold >= HOLD) {
        startDolly(now);
      }

      const u = phase === "dolly" ? clamp((now - tDolly) / DOLLY) : 0;
      const calm = phase === "dolly" ? easeIO(clamp(u / 0.75)) : 0;
      const par = 1 - calm;
      const sway = Math.sin(t / 1700) * 0.004;

      const pose: Pose = {
        cz: CZ_END * easeIO(u),
        phi: REST_POSE.phi * (1 - calm) + (mouse.sx * 0.012 + sway) * par,
        psi: REST_POSE.psi * (1 - calm) + mouse.sy * 0.008 * par,
        tx: REST_POSE.tx * (1 - calm) + mouse.sx * 0.02 * par,
        ty: REST_POSE.ty * (1 - calm) + mouse.sy * 0.012 * par,
      };

      /* lines */
      const lineFade = phase === "dolly" ? 1 - clamp((u - 0.5) / 0.4) : 1;
      drawRoom(ctx, segs, pose, m, Math.pow(shown / 100, 1.5), dpr, ink as [number, number, number], lineFade);

      /* counter rides on the back wall's bottom-left corner */
      const label = phase === "load" ? Math.min(99, Math.round(shown)) : 100;
      cnt.textContent = String(label).padStart(3, "0");
      const anchor = project([-1, m.hy, 2], pose, m);
      if (anchor) {
        cnt.style.transform = `translate3d(${anchor[0] + 6}px, ${anchor[1] + 6}px, 0)`;
      }
      cnt.style.opacity = String(phase === "dolly" ? 1 - clamp(u / 0.22) : 1);

      /* hero seen through the back wall */
      if (phase === "dolly" && hero && heroRect) {
        const quad = wallQuad(pose, m);
        const cx = (quad[0][0] + quad[2][0]) / 2;
        const cy = (quad[0][1] + quad[2][1]) / 2;
        const s = lerp(0.8, 1, easeIO(u));
        const ox = cx - heroRect.left;
        const oy = cy - heroRect.top;
        // clip-path is applied before the transform, so map the screen quad back into local space
        const poly = quad.map(([x, y]) => `${(ox + (x - cx) / s).toFixed(1)}px ${(oy + (y - cy) / s).toFixed(1)}px`).join(",");
        hero.style.transformOrigin = `${ox}px ${oy}px`;
        hero.style.transform = `scale(${s})`;
        hero.style.clipPath = `polygon(${poly})`;
        hero.style.opacity = String(clamp(u / 0.2));
      }

      if (phase === "dolly") {
        if (!revealed && u >= 0.45) {
          revealed = true;
          cb.current.onReveal();
        }
        root.style.opacity = String(1 - clamp((u - 0.62) / 0.28));
        if (u >= 1) {
          if (!revealed) cb.current.onReveal();
          finish();
          return;
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      if (dead) return;
      dead = true;
      teardown();
      resetHero();
      delete html.dataset.intro;
    };
  }, [heroRef, assetKey]);

  return (
    <div ref={rootRef} className="intro-root" role="status" aria-label="Loading">
      <canvas ref={cvRef} className="absolute inset-0 h-full w-full" aria-hidden />
      <div ref={cntRef} className="intro-counter" aria-hidden>
        000
      </div>
    </div>
  );
}
