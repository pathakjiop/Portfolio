import { Link, createFileRoute } from "@tanstack/react-router";
import { getWork } from "@/data/content";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, useTexture } from "@react-three/drei";
import { LaptopModel } from "@/components/LaptopModel";

export const Route = createFileRoute("/works/$slug")({
  component: WorkPage,
  head: ({ params }) => {
    const work = getWork(params.slug);
    return {
      meta: [
        { title: work ? `${work.title} — Atharv Pathak` : "Work — Atharv Pathak" },
        { name: "description", content: work ? work.excerpt : "" }
      ],
    };
  },
});

function WorkPage() {
  const { slug } = Route.useParams();
  const work = getWork(slug);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    return () => observer.disconnect();
  }, []);

  if (!work) {
    return (
      <main className="pt-24 bg-paper min-h-screen flex flex-col items-center justify-center text-primary">
        <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase opacity-70 mb-4">Missing</p>
        <h1 className="text-6xl font-bold tracking-tight">not here.</h1>
        <Link to="/works" className="mt-8 border-b border-primary font-bold uppercase tracking-widest text-xs">
          All works
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-paper text-primary pt-14 md:pt-16 min-h-screen">
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
        
        {/* Left Column (Sticky 3D Model Area) */}
        <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-primary/50 flex flex-col h-[60vh] md:h-[calc(100vh-4rem)] md:sticky top-16 p-6 md:p-8 relative overflow-hidden bg-paper z-10">
          <div className="flex justify-between items-start z-10 relative">
            <h1 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] lowercase">
              {work.title}
            </h1>
            <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase opacity-70 ml-4 text-right">
              {work.kind}
            </p>
          </div>
          
          <div className="flex-1 flex items-center justify-center relative w-full h-full my-4 cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 2, 8], fov: 25 }}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[10, 10, 10]} intensity={1} />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
              <Center>
                <LaptopModel cover={work.cover} theme={theme} />
              </Center>
            </Canvas>
          </div>
          
          <div className="flex justify-between text-[0.65rem] font-bold tracking-[0.18em] uppercase opacity-50 z-10 relative mt-auto">
            <span>Scroll to spin</span>
            <span className="text-right">Made with Spline / Three.js</span>
          </div>
        </div>

        {/* Right Column (Scrollable Content) */}
        <div className="w-full md:w-1/2 flex flex-col bg-paper relative z-0">
          
          {/* Project text */}
          <div className="p-8 md:p-12 xl:p-16 border-b border-primary/50">
            <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase opacity-70 mb-8">Project</p>
            {work.body.map((paragraph, i) => (
              <p key={i} className="mb-6 text-base md:text-lg leading-relaxed last:mb-0">
                {paragraph}
              </p>
            ))}
            {work.note && <p className="mt-10 text-sm leading-relaxed opacity-70 italic">{work.note}</p>}
          </div>

          {/* Related Links */}
          <div className="border-b border-primary/50">
            <div className="p-6 md:p-8 flex justify-between items-center border-b border-primary/50">
               <h2 className="text-2xl font-bold tracking-tight">related links.</h2>
               <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase opacity-70">View Project</span>
            </div>
            
            <div className="grid grid-cols-2 grid-rows-3 aspect-[2/3] md:aspect-auto md:min-h-[60vh] border-b border-primary/50">
               <div className="border-r border-b border-primary/50 relative group flex items-center justify-center p-8 bg-paper">
                 <div className="absolute inset-0 bg-[#fce5cd] opacity-50 transition-opacity group-hover:opacity-100" />
                 <img src="/media/Transparent_-Portrait.png" className="w-16 h-16 object-contain z-10 filter sepia brightness-50" />
               </div>
               <div className="border-b border-primary/50 bg-paper" />
               <div className="border-r border-b border-primary/50 bg-paper" />
               <div className="border-b border-primary/50 bg-paper" />
               <div className="border-r border-primary/50 bg-paper" />
               <div className="bg-paper" />
            </div>
          </div>
          
          {/* Footer of the right column */}
          <div className="p-8 md:p-12 xl:p-16 flex items-end min-h-[30vh]">
            <Link to="/works" className="group inline-flex flex-col">
              <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase opacity-70 mb-4">Go Back</span>
              <div className="flex items-center gap-4 text-primary transition-opacity hover:opacity-70">
                <span className="text-3xl md:text-5xl font-light">←</span>
                <h2 className="text-[3rem] md:text-[5rem] leading-[0.8] font-bold tracking-[-0.04em]">
                  all works.
                </h2>
              </div>
            </Link>
          </div>

          <div className="w-full h-32 md:h-48 border-t border-primary/50">
             <img src="/media/shibuya.png" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </main>
  );
}

