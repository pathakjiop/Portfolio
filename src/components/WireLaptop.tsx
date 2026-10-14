import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

/**
 * Wireframe laptop powered by laptop_lines_6a041d.glb (light) and laptop_lines_f5b841.glb (dark).
 *
 * All motion is driven through one plain mutable object (`LaptopState`) so the page can animate it
 * with GSAP (intro) and with scroll (spin) without re-rendering React every frame.
 */
export type LaptopState = {
  /** 0 → 1: strokes draw on */
  draw: number;
  /** 0 → 1: the screen picture fades in */
  screen: number;
  yaw: number;
  pitch: number;
  lid: number;
  y: number;
  scale: number;
};

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const SCREEN_W = 1.86;
const SCREEN_H = 1.30;

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
          const screenAspect = SCREEN_W / SCREEN_H;
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
  isDark: boolean;
};

function Scene({ state, cover, isDark }: SceneProps) {
  const modelUrl = isDark ? "/model/laptop_lines_f5b841.glb" : "/model/laptop_lines_6a041d.glb";
  const { scene } = useGLTF(modelUrl);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  const root = useRef<THREE.Group>(null);
  const screenMat = useRef<THREE.MeshBasicMaterial>(null);
  const shown = useRef<{ yaw: number; pitch: number; y?: number; scale?: number }>({
    yaw: state.current.yaw,
    pitch: state.current.pitch,
    y: state.current.y,
    scale: state.current.scale,
  });

  const linesObj = useMemo(() => {
    let found: THREE.LineSegments | null = null;
    cloned.traverse((child) => {
      if ((child as any).isLineSegments) found = child as THREE.LineSegments;
    });
    return found;
  }, [cloned]);

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

    if (sh.y === undefined) sh.y = s.y;
    if (sh.scale === undefined) sh.scale = s.scale;
    sh.y += (s.y - sh.y) * k;
    sh.scale += (s.scale - sh.scale) * k;

    g.rotation.set(sh.pitch, sh.yaw, 0);
    g.position.y = sh.y;
    g.scale.setScalar(sh.scale * 1.55);

    // Line drawing animation via geometry draw range
    if (linesObj?.geometry?.index) {
      const total = linesObj.geometry.index.count;
      linesObj.geometry.setDrawRange(0, Math.floor(clamp01(s.draw) * total));
    }

    if (screenMat.current) {
      screenMat.current.opacity = clamp01(s.screen);
    }
  });

  return (
    <group ref={root}>
      <primitive object={cloned} />
      {/* Front screen quad aligned to the GLB laptop lid display */}
      <mesh position={[-0.0195, 0.032, -0.812]} rotation={[-0.2576, 0, 0]} renderOrder={-1}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial
          ref={screenMat}
          map={tex ?? undefined}
          color="#ffffff"
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Preload models for immediate display
useGLTF.preload("/model/laptop_lines_6a041d.glb");
useGLTF.preload("/model/laptop_lines_f5b841.glb");

type Props = {
  state: MutableRefObject<LaptopState>;
  /** project cover shown on the laptop screen (falls back to a flat panel if it fails to load) */
  cover?: string;
  className?: string;
};

export function WireLaptop({ state, cover, className = "" }: Props) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkDark = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const mo = new MutationObserver(checkDark);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  return (
    <div className={className} aria-hidden>
      {mounted && (
        <Canvas
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [0, 0, 7], fov: 30 }}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          <Scene state={state} cover={cover} isDark={isDark} />
        </Canvas>
      )}
    </div>
  );
}
