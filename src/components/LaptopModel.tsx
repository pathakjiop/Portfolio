import { useGLTF, useTexture } from '@react-three/drei'
import { useMemo } from 'react'

export function LaptopModel({ cover, theme }: { cover: string, theme: "light" | "dark" }) {
  const modelUrl = theme === 'dark' ? '/model/laptop_lines_f5b841.glb' : '/model/laptop_lines_6a041d.glb';
  const { scene } = useGLTF(modelUrl);
  
  // Clone the scene so we can mutate it if needed
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  
  // Attempt to apply the cover texture to a mesh named "Screen" or similar
  // If the creator of the GLB made a screen mesh, they usually name it 'Screen' or 'Display'
  const texture = useTexture(cover);
  texture.flipY = false;

  useMemo(() => {
    clonedScene.traverse((child: any) => {
      if (child.isMesh && (child.name.toLowerCase().includes('screen') || child.name.toLowerCase().includes('display'))) {
        child.material = child.material.clone();
        child.material.map = texture;
        child.material.needsUpdate = true;
      }
    });
  }, [clonedScene, texture]);

  return <primitive object={clonedScene} scale={2} position={[0, -0.5, 0]} />
}

// Preload both models
useGLTF.preload('/model/laptop_lines_f5b841.glb')
useGLTF.preload('/model/laptop_lines_6a041d.glb')
