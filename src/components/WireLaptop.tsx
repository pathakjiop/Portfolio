import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import {
  CENTER,
  HINGE_Y,
  HINGE_Z,
  SCREEN,
  buildBaseOutline,
  buildKeys,
  buildLid,
  type Seg,
} from "@/lib/laptop-wire";

/**
 * Wireframe laptop (procedural – no .glb needed).
 *
 * All motion is driven through one plain mutable object (`LaptopState`) so the page can animate it
 * with GSAP (intro) and with scroll (spin) without re-rendering React every frame.
 */
export type LaptopState = {
  /** 0 → 1: strokes draw on (lid first, then base, then keys) */
  draw: number;
  /** 0 → 1: the screen picture fades in */
  screen: number;
  yaw: number;
  pitch: number;
  /** lid opening angle in radians (0 = closed) */
  lid: number;
  /** vertical offset in world units (the hero sits low so the base is cropped by the viewport) */
  y: number;
  scale: number;
};

type Pts = [number, number, number][];
const toPoints = (segs: Seg[]): Pts => segs.flatMap((s) => [[s[0], s[1], s[2]], [s[3], s[4], s[5]]] as Pts);
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function useCoverTexture(url?: string) {
  const [tex, setTex] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    if (!url) {
      setTex(null);
      return;
    }
    let alive = true;
    new THREE.TextureLoader().load(
      url,
      (t) => {
        if (!alive) return;
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 8;
        t.generateMipmaps = true;
        t.minFilter = THREE.LinearMipmapLinearFilter;
        t.magFilter = THREE.LinearFilter;
        // "object-fit: cover" for the screen rectangle
        const img = t.image as { width: number; height: number } | undefined;
        if (img?.width && img?.height) {
          const screenAspect = SCREEN.width / SCREEN.height;
          const imgAspect = img.width / img.height;
          if (imgAspect > screenAspect) {
            t.repeat.x = screenAspect / imgAspect;
            t.offset.x = (1 - t.repeat.x) / 2;
          } else {
            t.repeat.y = imgAspect / screenAspect;
            t.offset.y = (1 - t.repeat.y) / 2;
          }
        }
        t.needsUpdate = true;
        setTex(t);
      },
      undefined,
      () => {
        if (alive) setTex(null); // missing cover → plain dark screen, never a crash
      },
    );
    return () => {
      alive = false;
    };
  }, [url]);
  return tex;
}

type SceneProps = {
  state: MutableRefObject<LaptopState>;
  cover?: string;
  ink: string;
  screenBg: string;
};

function Scene({ state, cover, ink, screenBg }: SceneProps) {
  const root = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);
  const baseLine = useRef<any>(null);
  const keysLine = useRef<any>(null);
  const lidLine = useRef<any>(null);
  const screenMat = useRef<THREE.MeshBasicMaterial>(null);
  const shown = useRef<{ yaw: number; pitch: number; lid: number; y?: number; scale?: number }>({
    yaw: state.current.yaw,
    pitch: state.current.pitch,
    lid: state.current.lid,
    y: state.current.y,
    scale: state.current.scale,
  });

  const base = useMemo(() => buildBaseOutline(), []);
  const keys = useMemo(() => buildKeys(), []);
  const lidSegs = useMemo(() => buildLid(), []);
  const basePts = useMemo(() => toPoints(base), [base]);
  const keyPts = useMemo(() => toPoints(keys), [keys]);
  const lidPts = useMemo(() => toPoints(lidSegs), [lidSegs]);
  const tex = useCoverTexture(cover);

  useEffect(() => {
    if (screenMat.current) {
      if (tex) {
        screenMat.current.map = tex;
      }
      screenMat.current.needsUpdate = true;
    }
  }, [tex]);

  useFrame((_, dt) => {
    const s = state.current;
    const g = root.current;
    if (!g) return;

    // light damping so scroll-driven turning feels weighted, not mechanical
    const k = 1 - Math.exp(-12 * Math.min(dt, 0.05));
    const sh = shown.current;
    sh.yaw += (s.yaw - sh.yaw) * k;
    sh.pitch += (s.pitch - sh.pitch) * k;
    sh.lid += (s.lid - sh.lid) * k;

    if (sh.y === undefined) sh.y = s.y;
    if (sh.scale === undefined) sh.scale = s.scale;
    sh.y += (s.y - sh.y) * k;
    sh.scale += (s.scale - sh.scale) * k;

    g.rotation.set(sh.pitch, sh.yaw, 0);
    g.position.y = sh.y;
    g.scale.setScalar(sh.scale);
    if (lid.current) lid.current.rotation.x = -sh.lid;

    // stroke draw-on: reveal segments in order via the instanced geometry count
    const reveal = (line: any, total: number, t: number) => {
      const geo = line?.geometry;
      if (geo) geo.instanceCount = Math.floor(clamp01(t) * total + 1e-6);
    };
    reveal(lidLine.current, lidSegs.length, s.draw / 0.5);
    reveal(baseLine.current, base.length, (s.draw - 0.25) / 0.45);
    reveal(keysLine.current, keys.length, (s.draw - 0.55) / 0.45);

    if (screenMat.current) {
      screenMat.current.opacity = clamp01(s.screen);
    }
  });

  const lineProps = { color: ink, lineWidth: 1.8, segments: true } as const;

  return (
    <group ref={root}>
      <group position={[-CENTER[0], -CENTER[1], -CENTER[2]]}>
        <Line ref={baseLine} points={basePts} {...lineProps} lineWidth={2} />
        <Line ref={keysLine} points={keyPts} {...lineProps} lineWidth={1.3} transparent opacity={0.85} />
        <group ref={lid} position={[0, HINGE_Y, HINGE_Z]}>
          <Line ref={lidLine} points={lidPts} {...lineProps} lineWidth={2} />
          {/* screen: plane rotated into the lid's local face (normal = -y local) */}
          <mesh position={SCREEN.center} rotation={[Math.PI / 2, 0, 0]} renderOrder={-1}>
            <planeGeometry args={[SCREEN.width, SCREEN.height]} />
            <meshBasicMaterial
              ref={screenMat}
              map={tex ?? undefined}
              color={tex ? "#ffffff" : screenBg}
              transparent
              opacity={0}
              depthWrite={false}
              toneMapped={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function readInk(): string {
  if (typeof window === "undefined") return "#143642";
  const v = getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim();
  return v || "#143642";
}

type Props = {
  state: MutableRefObject<LaptopState>;
  /** project cover shown on the laptop screen (falls back to a flat panel if it fails to load) */
  cover?: string;
  className?: string;
};

export function WireLaptop({ state, cover, className = "" }: Props) {
  const [mounted, setMounted] = useState(false);
  const [ink, setInk] = useState("#143642");

  useEffect(() => {
    setMounted(true);
    setInk(readInk());
    // follow the light/dark toggle (it flips a class on <html>)
    const mo = new MutationObserver(() => setInk(readInk()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  return (
    <div className={className} aria-hidden>
      {mounted && (
        <Canvas
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [0, 0, 8], fov: 30 }}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          <Scene state={state} cover={cover} ink={ink} screenBg={ink} />
        </Canvas>
      )}
    </div>
  );
}
