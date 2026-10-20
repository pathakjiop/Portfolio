import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const SCREEN_W = 1.77;
const SCREEN_H = 1.238;

function ModelContent({ cover, isDark }: { cover?: string; isDark: boolean }) {
  const modelUrl = isDark ? "/model/laptop_lines_dad2d8.glb" : "/model/laptop_lines_143642.glb";
  const { scene } = useGLTF(modelUrl);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  const groupRef = useRef<THREE.Group>(null);
  const [tex, setTex] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!cover) return;
    let alive = true;
    new THREE.TextureLoader().load(cover, (t) => {
      if (!alive) return;
      t.colorSpace = THREE.SRGBColorSpace;
      t.generateMipmaps = true;
      t.wrapS = THREE.ClampToEdgeWrapping;
      t.wrapT = THREE.ClampToEdgeWrapping;
      t.repeat.set(1, 1);
      t.offset.set(0, 0);
      t.needsUpdate = true;
      setTex(t);
    });
    return () => {
      alive = false;
    };
  }, [cover]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = -0.3 + Math.sin(t * 0.8) * 0.15;
    groupRef.current.rotation.x = 0.28 + Math.cos(t * 0.6) * 0.05;
    groupRef.current.position.y = -0.15 + Math.sin(t * 1.2) * 0.04;
  });

  return (
    <group ref={groupRef} scale={1.5}>
      <primitive object={cloned} />
      <mesh position={[-0.015, 0.026, -0.803]} rotation={[-0.2577, 0, 0]} renderOrder={-1}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial
          key={tex?.uuid ?? "no-tex"}
          map={tex ?? undefined}
          color="#ffffff"
          toneMapped={false}
          side={THREE.FrontSide}
          depthWrite={true}
        />
      </mesh>
    </group>
  );
}

export function LaptopModel({
  cover,
  className = "w-full h-full",
}: {
  cover?: string;
  theme?: "light" | "dark";
  className?: string;
}) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const mo = new MutationObserver(checkDark);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 7], fov: 32 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ModelContent cover={cover} isDark={isDark} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/model/laptop_lines_143642.glb");
useGLTF.preload("/model/laptop_lines_dad2d8.glb");
