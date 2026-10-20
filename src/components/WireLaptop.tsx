import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

/**
 * Wireframe laptop powered by laptop_lines_143642.glb (light) and laptop_lines_dad2d8.glb (dark).
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
const SCREEN_W = 1.77;
const SCREEN_H = 1.262;
const SCREEN_RADIUS = 0.042;

function createRoundedRectGeometry(width: number, height: number, radius: number, segments = 12) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  const w = width;
  const h = height;
  const r = Math.min(radius, w / 2, h / 2);

  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(x + w, y + h - r);
  shape.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  shape.lineTo(x + r, y + h);
  shape.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(x, y + r);
  shape.absarc(x + r, y + r, r, Math.PI, (3 * Math.PI) / 2, false);

  const geom = new THREE.ShapeGeometry(shape, segments);

  const pos = geom.attributes.position;
  const uvs = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    const px = pos.getX(i);
    const py = pos.getY(i);
    uvs[i * 2] = (px - x) / w;
    uvs[i * 2 + 1] = (py - y) / h;
  }
  geom.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

  return geom;
}

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
        t.wrapS = THREE.ClampToEdgeWrapping;
        t.wrapT = THREE.ClampToEdgeWrapping;
        t.repeat.set(1, 1);
        t.offset.set(0, 0);
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
  const modelUrl = isDark ? "/model/laptop_lines_dad2d8.glb" : "/model/laptop_lines_143642.glb";
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

  useFrame((threeState, dt) => {
    const s = state.current;
    const g = root.current;
    if (!g) return;

    // Keep Three.js canvas size and camera aspect immediately in sync with DOM container
    const canvas = threeState.gl.domElement;
    const parent = canvas.parentElement;
    if (parent) {
      const rect = parent.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        if (Math.abs(threeState.size.width - rect.width) > 1 || Math.abs(threeState.size.height - rect.height) > 1) {
          threeState.setSize(rect.width, rect.height);
        }
      }
    }

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
    const geom = (linesObj as any)?.geometry;
    if (geom?.index) {
      const total = geom.index.count;
      geom.setDrawRange(0, Math.floor(clamp01(s.draw) * total));
    }

    if (screenMat.current) {
      screenMat.current.opacity = clamp01(s.screen);
    }
  });

  const screenGeom = useMemo(() => createRoundedRectGeometry(SCREEN_W, SCREEN_H, SCREEN_RADIUS), []);

  return (
    <group ref={root}>
      <primitive object={cloned} />
      {/* Front screen with curved corners precisely matching the laptop lid display curvature */}
      <mesh position={[-0.015, 0.026, -0.803]} rotation={[-0.2577, 0, 0]} renderOrder={-1} geometry={screenGeom}>
        <meshBasicMaterial
          ref={screenMat}
          key={tex?.uuid ?? "no-tex"}
          map={tex ?? undefined}
          color="#ffffff"
          transparent
          opacity={0}
          depthWrite={true}
          toneMapped={false}
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  );
}

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
