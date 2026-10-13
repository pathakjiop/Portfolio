import { Link, createFileRoute } from "@tanstack/react-router";
import { getWork, getNextWork, getPrevWork } from "@/data/content";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import { LaptopModel } from "@/components/LaptopModel";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  ShieldAlert,
  Cpu,
  Layers,
  Database,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  FileCode2,
} from "lucide-react";

export const Route = createFileRoute("/works/$slug")({
  component: WorkPage,
  head: ({ params }) => {
    const work = getWork(params.slug);
    return {
      meta: [
        { title: "Atharv Pathak" },
        { name: "description", content: work ? work.excerpt : "" },
      ],
    };
  },
});

export function WorkPage() {
  const { slug } = Route.useParams();
  const work = getWork(slug);
  const nextWork = getNextWork(slug);
  const prevWork = getPrevWork(slug);
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
        <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase opacity-70 mb-4 font-mono">
          404 // NOT FOUND
        </p>
        <h1 className="text-6xl font-bold tracking-tight">not here.</h1>
        <Link
          to="/works"
          className="mt-8 border border-primary px-6 py-2.5 font-mono uppercase tracking-widest text-xs hover:bg-primary hover:text-paper transition-colors"
        >
          Return to all works
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-paper text-primary pt-14 md:pt-16 min-h-screen selection:bg-primary selection:text-paper">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
        {/* LEFT COLUMN: Sticky 3D Model & Interactive Spec Sidebar */}
        <div className="w-full lg:w-[48%] border-b lg:border-b-0 lg:border-r border-primary/50 flex flex-col lg:h-[calc(100vh-4rem)] lg:sticky top-16 bg-paper z-20">
          {/* Top Bar inside Left Column */}
          <div className="p-5 md:p-6 border-b border-primary/50 flex justify-between items-center bg-paper">
            <Link
              to="/works"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider opacity-75 hover:opacity-100 transition-opacity"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to index</span>
            </Link>
            <span className="text-[10px] font-mono border border-primary/40 px-2 py-0.5 uppercase tracking-wider">
              {work.statusBadge}
            </span>
          </div>

          {/* 3D Canvas Area */}
          <div className="flex-1 flex flex-col items-center justify-center relative w-full min-h-[360px] lg:min-h-0 p-4 cursor-grab active:cursor-grabbing bg-radial from-primary/5 to-transparent">
            <Canvas camera={{ position: [0, 2, 8], fov: 25 }}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[10, 10, 10]} intensity={1} />
              <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 3}
              />
              <Center>
                <LaptopModel cover={work.cover} theme={theme} />
              </Center>
            </Canvas>

            <div className="absolute bottom-3 inset-x-6 flex justify-between text-[10px] font-mono uppercase tracking-widest opacity-50 pointer-events-none">
              <span>Drag to rotate 3D view</span>
              <span>Spline · Three.js</span>
            </div>
          </div>

          {/* Quick Specifications Strip */}
          <div className="border-t border-primary/50 p-5 md:p-6 bg-paper grid grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <span className="opacity-50 text-[10px] uppercase block mb-1">Domain</span>
              <span className="font-bold">{work.kind}</span>
            </div>
            <div>
              <span className="opacity-50 text-[10px] uppercase block mb-1">Timeline</span>
              <span className="font-bold">{work.year}</span>
            </div>
            <div className="col-span-2 pt-2 border-t border-primary/20 flex flex-wrap gap-1.5">
              {work.tags.map((tag) => (
                <span key={tag} className="text-[9px] uppercase border border-primary/40 px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Scrollable In-Depth Engineering Narrative */}
        <div className="w-full lg:w-[52%] flex flex-col bg-paper relative z-10">
          
          {/* Header Title Section */}
          <div className="p-6 md:p-10 lg:p-12 border-b border-primary/50">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase opacity-75">
                Technical Case Study
              </span>
              <span className="opacity-40">•</span>
              <span className="text-[11px] font-mono opacity-75">{work.status}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95]">
              {work.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg font-mono opacity-80 leading-snug">
              {work.subtitle}
            </p>

            {/* Quick Action Links */}
            <div className="mt-8 flex flex-wrap gap-3">
              {work.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-primary px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest hover:bg-primary hover:text-paper transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              ))}
            </div>
          </div>

          {/* Problem & Solution Dual Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-primary/50 divide-y md:divide-y-0 md:divide-x divide-primary/50">
            <div className="p-6 md:p-8 bg-primary/[0.02]">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase opacity-60 block mb-2">
                01 // The Problem
              </span>
              <p className="text-sm md:text-base leading-relaxed opacity-90">
                {work.problem}
              </p>
            </div>
            <div className="p-6 md:p-8 bg-primary/[0.04]">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase opacity-60 block mb-2">
                02 // The Solution
              </span>
              <p className="text-sm md:text-base leading-relaxed opacity-90">
                {work.solution}
              </p>
            </div>
          </div>

          {/* Detailed Narrative Paragraphs */}
          <div className="p-6 md:p-10 lg:p-12 border-b border-primary/50">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase opacity-60 block mb-6">
              03 // Engineering Deep Dive
            </span>
            <div className="space-y-6 text-base md:text-lg leading-relaxed opacity-90">
              {work.body.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Architecture Matrix */}
          <div className="border-b border-primary/50">
            <div className="p-6 md:p-8 border-b border-primary/50 bg-primary/[0.02]">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase opacity-60 block mb-1">
                04 // Architecture Stack
              </span>
              <h2 className="text-2xl font-bold tracking-tight">System Components</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-primary/50 border-b border-primary/50">
              {work.architecture.frontend && (
                <div className="p-6 border-b sm:border-b-0 border-primary/50">
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase opacity-70">
                    <FileCode2 className="w-4 h-4" />
                    <span>Client / UI</span>
                  </div>
                  <p className="text-sm font-mono leading-relaxed">{work.architecture.frontend}</p>
                </div>
              )}
              {work.architecture.backend && (
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase opacity-70">
                    <Terminal className="w-4 h-4" />
                    <span>Backend & API</span>
                  </div>
                  <p className="text-sm font-mono leading-relaxed">{work.architecture.backend}</p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-primary/50">
              {work.architecture.database && (
                <div className="p-6 border-b sm:border-b-0 border-primary/50">
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase opacity-70">
                    <Database className="w-4 h-4" />
                    <span>Data & Storage</span>
                  </div>
                  <p className="text-sm font-mono leading-relaxed">{work.architecture.database}</p>
                </div>
              )}
              {work.architecture.services && (
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase opacity-70">
                    <Cpu className="w-4 h-4" />
                    <span>Protocols / Services</span>
                  </div>
                  <p className="text-sm font-mono leading-relaxed">{work.architecture.services}</p>
                </div>
              )}
            </div>
          </div>

          {/* Key Implemented Features */}
          <div className="p-6 md:p-10 lg:p-12 border-b border-primary/50">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase opacity-60 block mb-2">
              05 // Capabilities
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
              Core Implemented Features
            </h2>
            <ul className="grid grid-cols-1 gap-3.5">
              {work.keyFeatures.map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-sm md:text-base leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-1 opacity-80" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Challenge & Lessons Learned */}
          <div className="p-6 md:p-10 lg:p-12 border-b border-primary/50 bg-primary/[0.02]">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase opacity-60 block mb-2">
              06 // Technical Challenge & Retrospective
            </span>
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Overcoming Bottlenecks
            </h2>
            <p className="text-base md:text-lg leading-relaxed opacity-90">
              {work.challenges}
            </p>
          </div>

          {/* Truthful Safety Note / Disclaimer */}
          {work.safetyNote && (
            <div className="p-6 md:p-8 border-b border-primary/50 flex items-start gap-4 bg-primary/[0.04]">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 opacity-70" />
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider block mb-1 opacity-70">
                  Verification & Scope Note
                </span>
                <p className="text-xs md:text-sm font-mono leading-relaxed opacity-80">
                  {work.safetyNote}
                </p>
              </div>
            </div>
          )}

          {/* Navigation to Next / Previous Projects */}
          <div className="grid grid-cols-2 divide-x divide-primary/50 border-b border-primary/50">
            <Link
              to="/works/$slug"
              params={{ slug: prevWork.slug }}
              className="p-6 md:p-8 flex flex-col justify-between hover:bg-primary hover:text-paper transition-colors group"
            >
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest opacity-60 group-hover:opacity-100">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Project</span>
              </div>
              <div className="mt-4">
                <span className="text-xl md:text-2xl font-bold tracking-tight block">
                  {prevWork.shortTitle}
                </span>
                <span className="text-xs font-mono opacity-70 line-clamp-1 block mt-1">
                  {prevWork.subtitle}
                </span>
              </div>
            </Link>

            <Link
              to="/works/$slug"
              params={{ slug: nextWork.slug }}
              className="p-6 md:p-8 flex flex-col justify-between text-right hover:bg-primary hover:text-paper transition-colors group"
            >
              <div className="flex items-center justify-end gap-2 text-xs font-mono uppercase tracking-widest opacity-60 group-hover:opacity-100">
                <span>Next Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="mt-4">
                <span className="text-xl md:text-2xl font-bold tracking-tight block">
                  {nextWork.shortTitle}
                </span>
                <span className="text-xs font-mono opacity-70 line-clamp-1 block mt-1">
                  {nextWork.subtitle}
                </span>
              </div>
            </Link>
          </div>

          {/* All works return strip */}
          <div className="p-8 md:p-12 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest opacity-60 block mb-1">
                Portfolio Index
              </span>
              <h3 className="text-3xl font-bold tracking-tight">explore all works.</h3>
            </div>
            <Link
              to="/works"
              className="border border-primary px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-widest hover:bg-primary hover:text-paper transition-colors"
            >
              View All 10+ Projects →
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
