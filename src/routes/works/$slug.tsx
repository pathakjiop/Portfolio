import { Link, createFileRoute } from "@tanstack/react-router";
import { getWork, getNextWork, getPrevWork, type Work } from "@/data/content";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { WireLaptop, type LaptopState } from "@/components/WireLaptop";
import { HERO_POSE, poseAt } from "@/lib/laptop-wire";
import { resetScroll } from "@/lib/scroll";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Cpu,
  Database,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  FileCode2,
  Maximize2,
  X,
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

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Block wheel / touch / keyboard scrolling while the intro plays. Returns an unlock function. */
function lockScroll() {
  const stop = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const keys = new Set([" ", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"]);
  const onKey = (e: KeyboardEvent) => {
    if (keys.has(e.key)) stop(e);
  };
  document.addEventListener("wheel", stop, { capture: true, passive: false });
  document.addEventListener("touchmove", stop, { capture: true, passive: false });
  document.addEventListener("keydown", onKey, true);
  return () => {
    document.removeEventListener("wheel", stop, true);
    document.removeEventListener("touchmove", stop, true);
    document.removeEventListener("keydown", onKey, true);
  };
}

const headerHeight = () => (window.innerWidth >= 768 ? 64 : 56);

export function WorkPage() {
  const { slug } = Route.useParams();
  const work = getWork(slug);

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

  // key = remount per project so the intro replays when jumping prev/next
  return <WorkView key={work.slug} work={work} />;
}

const HERO_Y = -0.34;
const SETTLED_Y = 0;
const HERO_SCALE = 0.98;
const SETTLED_SCALE = 0.92;

const isDesktop = () => (typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : true);

function WorkView({ work }: { work: Work }) {
  const nextWork = getNextWork(work.slug);
  const prevWork = getPrevWork(work.slug);

  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string } | null>(null);

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);

  // Everything the laptop does is driven through this one object (GSAP during entrance, scroll after).
  const laptop = useRef<LaptopState>({ draw: 0, screen: 1, ...HERO_POSE, y: 1.2, scale: HERO_SCALE });
  const introDone = useRef(false);

  /* ---------------------------------------------------------------- intro */
  useIsoLayoutEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    const title = titleRef.current;
    const topBar = topBarRef.current;
    const bottomBar = bottomBarRef.current;
    const prompt = scrollPromptRef.current;
    if (!left || !right || !title || !topBar || !bottomBar) return;

    const html = document.documentElement;
    const s = laptop.current;
    const desktop = isDesktop();
    const header = headerHeight();
    const viewport = window.innerHeight - header;

    // hero state, applied before the first paint
    introDone.current = false;
    resetScroll();
    html.dataset.intro = "on"; // parks the site header above the viewport
    Object.assign(s, { draw: 0, screen: 1, ...HERO_POSE, y: 1.2, scale: HERO_SCALE });

    gsap.set(title, { opacity: 0, y: 25 });
    if (prompt) gsap.set(prompt, { opacity: 0 });
    gsap.set([topBar, bottomBar], { opacity: 0 });
    gsap.set(right, { opacity: 0 });

    if (desktop) {
      gsap.set(left, { flexBasis: "100%" });
    } else {
      gsap.set(left, { height: viewport });
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      delete html.dataset.intro;
      Object.assign(s, { draw: 1, screen: 1, y: HERO_Y, scale: HERO_SCALE });
      gsap.set(title, { opacity: 1, y: 0 });
      if (prompt) gsap.set(prompt, { opacity: 0.7 });
      introDone.current = true;
      return;
    }

    const unlock = lockScroll();

    const tl = gsap.timeline({
      delay: 0.05,
      onComplete: () => {
        unlock();
        introDone.current = true;
        window.dispatchEvent(new Event("scroll")); // hand the pose over to scroll
      },
    });

    // 1. In the start: ONLY the name appears
    tl.to(title, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.1)
      .call(() => {
        delete html.dataset.intro; // header glides in
      }, [], 0.5)
      // 2. Then: the laptop comes down from above into the center while drawing on
      .to(s, { y: HERO_Y, duration: 1.0, ease: "power2.out" }, 0.6)
      .to(s, { draw: 1, duration: 0.85, ease: "power1.inOut" }, 0.6)
      // 3. Subtle prompt to scroll
      .to(prompt, { opacity: 0.75, duration: 0.4 }, 1.35);

    return () => {
      tl.kill();
      unlock();
      delete html.dataset.intro;
      introDone.current = true;
    };
  }, []);

  /* --------------------------------- scroll → go to left, add image, spin */
  useEffect(() => {
    const onScroll = () => {
      if (!introDone.current) return;
      const left = leftRef.current;
      const right = rightRef.current;
      const title = titleRef.current;
      const topBar = topBarRef.current;
      const bottomBar = bottomBarRef.current;
      const prompt = scrollPromptRef.current;
      if (!left || !right || !title || !topBar || !bottomBar) return;

      const desktop = isDesktop();
      const header = headerHeight();
      const viewport = window.innerHeight - header;
      const scrollY = Math.max(0, window.scrollY);
      const settled = poseAt(0);

      const transDist = desktop ? 240 : 180;
      const stillDist = desktop ? 500 : 360; // buffer where laptop stays still
      const pTrans = Math.min(1, Math.max(0, scrollY / transDist));
      const easeTrans = pTrans * (2 - pTrans); // smooth ease-out quad

      // Phase 1: Going to the left
      if (desktop) {
        const basis = 100 - easeTrans * 52; // 100% -> 48%
        left.style.flexBasis = `${basis}%`;
      } else {
        const mobileTarget = Math.round(window.innerHeight * 0.56);
        const mobileHeight = viewport - easeTrans * (viewport - mobileTarget);
        left.style.height = `${mobileHeight}px`;
      }

      // Title & prompt fade out immediately when scroll begins
      title.style.opacity = `${Math.max(0, 1 - pTrans * 4)}`;
      title.style.transform = `translate3d(0, ${-pTrans * 30}px, 0)`;
      if (prompt) {
        prompt.style.opacity = `${Math.max(0, 1 - pTrans * 4)}`;
      }

      // Top & bottom bars fade in as laptop arrives at the left
      const barsOpacity = Math.min(1, Math.max(0, (pTrans - 0.5) / 0.4));
      topBar.style.opacity = `${barsOpacity}`;
      bottomBar.style.opacity = `${barsOpacity}`;

      // Right case study fades in quickly so text is 100% opaque, crisp, and high-contrast
      const rightOpacity = Math.min(1, Math.max(0, pTrans * 3.5));
      right.style.opacity = `${rightOpacity}`;
      if (desktop) {
        const slideX = (1 - easeTrans) * 30;
        right.style.transform = `translate3d(${slideX}px, 0, 0)`;
      } else {
        right.style.transform = "none";
      }

      const s = laptop.current;
      // Screen image remains active on the display
      s.screen = 1;

      if (pTrans < 1) {
        // Gliding to left: Laptop moves from hero straight-on pose to settled side pose
        s.yaw = HERO_POSE.yaw + (settled.yaw - HERO_POSE.yaw) * easeTrans;
        s.pitch = HERO_POSE.pitch + (settled.pitch - HERO_POSE.pitch) * easeTrans;
        s.lid = HERO_POSE.lid + (settled.lid - HERO_POSE.lid) * easeTrans;
        s.y = HERO_Y + (SETTLED_Y - HERO_Y) * easeTrans;
        s.scale = HERO_SCALE + (SETTLED_SCALE - HERO_SCALE) * easeTrans;
      } else if (scrollY < transDist + stillDist) {
        // Phase 2: Settled on the left -> keep STILL for 2-3 scrolls of reading
        s.yaw = settled.yaw;
        s.pitch = settled.pitch;
        s.lid = settled.lid;
        s.y = SETTLED_Y;
        s.scale = SETTLED_SCALE;
        s.screen = 1;
      } else {
        // Phase 3: After 2-3 scrolls -> now SPIN with scroll!
        const scrollPast = scrollY - (transDist + stillDist);
        const r = right.getBoundingClientRect();
        const travel = Math.max(1, r.height - viewport - stillDist);
        const pSpin = Math.min(1, Math.max(0, scrollPast / travel));

        const spinPose = poseAt(pSpin);
        s.yaw = spinPose.yaw;
        s.pitch = spinPose.pitch;
        s.lid = spinPose.lid;
        s.y = SETTLED_Y;
        s.scale = SETTLED_SCALE;
        s.screen = 1;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const gallery = Array.from(new Set([work.cover, ...work.gallery].filter(Boolean)));

  return (
    <main className="text-primary min-h-[calc(100vh-4rem)] selection:bg-primary selection:text-paper">
      <div className="flex flex-col lg:flex-row lg:overflow-x-clip">
        {/* ───────────── LEFT: sticky wireframe laptop panel ───────────── */}
        <div
          ref={leftRef}
          className="bg-paper relative z-10 h-[56svh] shrink-0 overflow-hidden border-b border-primary/40 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:basis-[48%] lg:border-b-0 lg:border-r"
        >
          <WireLaptop state={laptop} cover={work.cover} className="absolute inset-0" />

          {/* big title card (start only) */}
          <div
            ref={titleRef}
            className="pointer-events-none absolute inset-x-0 top-5 z-20 flex flex-col items-center justify-center px-6 text-center md:top-7 lg:top-9"
          >
            <h1 className="text-[clamp(2.6rem,6.8vw,6.2rem)] font-bold leading-[0.9] tracking-[-0.05em]">
              {work.shortTitle}
            </h1>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.25em] opacity-65 md:text-xs">
              {work.kind}
            </p>
          </div>

          {/* scroll cue */}
          <div
            ref={scrollPromptRef}
            className="pointer-events-none absolute bottom-4 inset-x-0 z-20 flex flex-col items-center justify-center gap-0.5 opacity-70"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.25em]">Scroll to explore</span>
            <span className="text-xs animate-bounce">↓</span>
          </div>

          <div
            ref={topBarRef}
            className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 border-b border-primary/40 bg-paper px-5 py-4 md:px-6"
          >
            <span className="kicker font-bold">{work.shortTitle}</span>
            <span className="kicker text-right opacity-60">{work.kind}</span>
          </div>

          <div
            ref={bottomBarRef}
          ></div>
        </div>

        {/* ───────────── RIGHT: scrolling case study ───────────── */}
        <div ref={rightRef} className="bg-paper relative flex shrink-0 flex-col lg:basis-[52%] lg:pt-[240px]">
          {/* lead */}
          <div className="border-b border-primary/40 p-6 md:p-10 lg:p-12">
            <span className="kicker block text-primary/75 font-semibold">The work</span>
            <h2 className="mt-4 text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl text-primary">{work.title}</h2>
            <p className="mt-5 max-w-2xl text-lg font-normal leading-relaxed text-primary md:text-xl">{work.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] text-primary/85">
              <span className="border border-primary/50 bg-primary/5 px-2.5 py-0.5 font-bold uppercase tracking-wider text-primary">
                {work.statusBadge}
              </span>
              <span>{work.status}</span>
              <span className="opacity-40">•</span>
              <span>{work.year}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {work.tags.map((tag) => (
                <span key={tag} className="border border-primary/40 bg-primary/[0.03] px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase text-primary">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Problem & Solution Dual Columns */}
          <div className="grid grid-cols-1 divide-y divide-primary/50 border-b border-primary/50 md:grid-cols-2 md:divide-x md:divide-y-0">
            <div className="bg-primary/[0.02] p-6 md:p-8">
              <span className="mb-3 block font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">
                01 // The Problem
              </span>
              <p className="text-sm font-normal leading-relaxed text-primary md:text-base">{work.problem}</p>
            </div>
            <div className="bg-primary/[0.04] p-6 md:p-8">
              <span className="mb-3 block font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">
                02 // The Solution
              </span>
              <p className="text-sm font-normal leading-relaxed text-primary md:text-base">{work.solution}</p>
            </div>
          </div>

          {/* Detailed Narrative Paragraphs */}
          <div className="border-b border-primary/50 p-6 md:p-10 lg:p-12">
            <span className="mb-6 block font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">
              03 // Engineering Deep Dive
            </span>
            <div className="space-y-6 text-base font-normal leading-relaxed text-primary md:text-lg">
              {work.body.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* 04 // Visual System Breakdown & Architecture Views */}
          {work.showcase && work.showcase.length > 0 && (
            <div className="border-b border-primary/50">
              <div className="border-b border-primary/50 bg-primary/[0.03] p-6 md:p-10 lg:p-12">
                <span className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">
                  04 // System Architecture & Visual Breakdown
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-primary md:text-4xl">
                  Architecture in Action
                </h2>
                <p className="mt-3 max-w-2xl text-base font-normal leading-relaxed text-primary/80 md:text-lg">
                  Visual walk-through of the operational pipeline, core algorithmic stages, and execution telemetry. Click any diagram to inspect in full resolution.
                </p>
              </div>

              <div className="divide-y divide-primary/50">
                {work.showcase.map((item, idx) => (
                  <div key={item.src} className="flex flex-col bg-paper">
                    {/* Visual Preview Container */}
                    <div
                      onClick={() => setLightboxImg({ src: item.src, title: item.title })}
                      className="group relative cursor-zoom-in overflow-hidden border-b border-primary/40 bg-primary/[0.04] p-4 md:p-8 transition-colors hover:bg-primary/[0.07]"
                    >
                      <div className="relative mx-auto overflow-hidden rounded-lg border border-primary/30 shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.015]">
                        <img
                          src={item.src}
                          alt={item.title}
                          loading="lazy"
                          className="block w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/5 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-2 bg-primary/95 text-paper font-mono text-xs px-3.5 py-1.5 rounded-full shadow-lg">
                            <Maximize2 className="h-3.5 w-3.5" />
                            <span>Click to enlarge view</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Explanatory Technical Breakdown */}
                    <div className="p-6 md:p-10 lg:p-12">
                      <div className="flex flex-wrap items-center gap-2.5 mb-3">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 border border-primary/50 bg-primary/10 text-primary">
                          FIGURE 0{idx + 1} // 03
                        </span>
                        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-primary/75">
                          {item.kicker}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-base md:text-lg leading-relaxed text-primary/90 font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Matrix */}
          <div className="border-b border-primary/50">
            <div className="border-b border-primary/50 bg-primary/[0.02] p-6 md:p-8">
              <span className="mb-1 block font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">
                05 // Architecture Stack
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-primary">System Components</h2>
            </div>
            <div className="grid grid-cols-1 divide-y divide-primary/50 border-b border-primary/50 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              {work.architecture.frontend && (
                <div className="border-b border-primary/50 p-6 sm:border-b-0">
                  <div className="mb-2 flex items-center gap-2 font-mono text-xs font-bold uppercase text-primary/80">
                    <FileCode2 className="h-4 w-4" />
                    <span>Client / UI</span>
                  </div>
                  <p className="font-mono text-sm leading-relaxed text-primary">{work.architecture.frontend}</p>
                </div>
              )}
              {work.architecture.backend && (
                <div className="p-6">
                  <div className="mb-2 flex items-center gap-2 font-mono text-xs font-bold uppercase text-primary/80">
                    <Terminal className="h-4 w-4" />
                    <span>Backend & API</span>
                  </div>
                  <p className="font-mono text-sm leading-relaxed text-primary">{work.architecture.backend}</p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 divide-y divide-primary/50 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              {work.architecture.database && (
                <div className="border-b border-primary/50 p-6 sm:border-b-0">
                  <div className="mb-2 flex items-center gap-2 font-mono text-xs font-bold uppercase text-primary/80">
                    <Database className="h-4 w-4" />
                    <span>Data & Storage</span>
                  </div>
                  <p className="font-mono text-sm leading-relaxed text-primary">{work.architecture.database}</p>
                </div>
              )}
              {work.architecture.services && (
                <div className="p-6">
                  <div className="mb-2 flex items-center gap-2 font-mono text-xs font-bold uppercase text-primary/80">
                    <Cpu className="h-4 w-4" />
                    <span>Protocols / Services</span>
                  </div>
                  <p className="font-mono text-sm leading-relaxed text-primary">{work.architecture.services}</p>
                </div>
              )}
            </div>
          </div>

          {/* Key Implemented Features */}
          <div className="border-b border-primary/50 p-6 md:p-10 lg:p-12">
            <span className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">
              06 // Capabilities
            </span>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-primary md:text-3xl">Core Implemented Features</h2>
            <ul className="grid grid-cols-1 gap-3.5">
              {work.keyFeatures.map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-normal leading-relaxed text-primary md:text-base">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary/85" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Challenge & Lessons Learned */}
          <div className="border-b border-primary/50 bg-primary/[0.02] p-6 md:p-10 lg:p-12">
            <span className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">
              07 // Technical Challenge & Retrospective
            </span>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-primary">Overcoming Bottlenecks</h2>
            <p className="text-base font-normal leading-relaxed text-primary md:text-lg">{work.challenges}</p>
          </div>

          {/* Truthful Safety Note / Disclaimer */}
          {work.safetyNote && (
            <div className="flex items-start gap-4 border-b border-primary/50 bg-primary/[0.04] p-6 md:p-8">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 opacity-70" />
              <div>
                <span className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-wider opacity-70">
                  Verification & Scope Note
                </span>
                <p className="font-mono text-xs leading-relaxed opacity-80 md:text-sm">{work.safetyNote}</p>
              </div>
            </div>
          )}

          {/* related links */}
          <div className="border-b border-primary/40 px-6 pb-2 pt-10 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold tracking-[-0.04em] md:text-4xl">related links.</h2>
            <ul className="mt-6">
              {work.links.map((link) => (
                <li key={link.label} className="border-t border-primary/40">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-primary"
                  >
                    <span className="kicker inline-flex items-center gap-2 opacity-60">
                      <Github className="h-3.5 w-3.5" />
                      {link.label}
                    </span>
                    <span className="kicker inline-flex items-center gap-2 font-bold">
                      {link.meta}
                      <ExternalLink className="h-3 w-3 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* gallery (tiles hide themselves if an image is missing) */}
          {gallery.length > 0 && (
            <div className="border-b border-primary/40">
              <div className="border-b border-primary/40 bg-primary/[0.02] p-6 md:p-8">
                <span className="mb-1 block font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80">
                  Project Gallery
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-primary">Visual Artifacts & Diagrams</h2>
              </div>
              <div className="flex flex-col gap-px bg-primary/40">
                {gallery.map((src) => (
                  <div
                    key={src}
                    onClick={() => setLightboxImg({ src, title: `${work.shortTitle} Preview` })}
                    className="group relative cursor-zoom-in bg-paper p-4 md:p-6 transition-colors hover:bg-primary/[0.04]"
                  >
                    <img
                      src={src}
                      alt={`${work.shortTitle} preview`}
                      loading="lazy"
                      className="block w-full object-cover rounded border border-primary/20 transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                      onError={(e) => {
                        const tile = e.currentTarget.parentElement;
                        if (tile) tile.style.display = "none";
                      }}
                    />
                    <div className="absolute right-8 top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-primary/95 text-paper font-mono text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                      <Maximize2 className="h-3 w-3" />
                      <span>Enlarge</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Previous / Next project */}
          <div className="grid grid-cols-2 divide-x divide-primary/50 border-b border-primary/50">
            <Link
              to="/works/$slug"
              params={{ slug: prevWork.slug }}
              className="group flex flex-col justify-between p-6 transition-colors hover:bg-primary hover:text-paper md:p-8"
            >
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100">
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Previous Project</span>
              </div>
              <div className="mt-4">
                <span className="block text-xl font-bold tracking-tight md:text-2xl">{prevWork.shortTitle}</span>
                <span className="mt-1 line-clamp-1 block font-mono text-xs opacity-70">{prevWork.subtitle}</span>
              </div>
            </Link>

            <Link
              to="/works/$slug"
              params={{ slug: nextWork.slug }}
              className="group flex flex-col justify-between p-6 text-right transition-colors hover:bg-primary hover:text-paper md:p-8"
            >
              <div className="flex items-center justify-end gap-2 font-mono text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100">
                <span>Next Project</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
              <div className="mt-4">
                <span className="block text-xl font-bold tracking-tight md:text-2xl">{nextWork.shortTitle}</span>
                <span className="mt-1 line-clamp-1 block font-mono text-xs opacity-70">{nextWork.subtitle}</span>
              </div>
            </Link>
          </div>

          {/* back to all works */}
          <div className="px-6 pb-16 pt-14 md:px-10 lg:px-12 border-b border-primary/40">
            <span className="kicker block opacity-60">Back to the</span>
            <Link
              to="/works"
              className="group mt-3 inline-flex items-center gap-4 text-[clamp(3rem,6.5vw,6rem)] font-bold leading-none tracking-[-0.05em]"
            >
              <span className="inline-block transition-transform duration-500 ease-out group-hover:-translate-x-2" aria-hidden>
                ←
              </span>
              all works.
            </Link>
          </div>
        </div>
      </div>

      {/* High-Resolution Image Lightbox Modal */}
      {lightboxImg && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-8 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col max-h-[92vh] max-w-6xl w-full bg-paper border border-primary/40 rounded-xl overflow-hidden shadow-2xl"
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between border-b border-primary/30 bg-primary/10 px-5 py-3.5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                {lightboxImg.title}
              </span>
              <button
                type="button"
                onClick={() => setLightboxImg(null)}
                className="rounded-full p-1 text-primary hover:bg-primary/20 transition-colors"
                aria-label="Close image modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Lightbox Image */}
            <div className="overflow-auto p-2 md:p-4 bg-black/40 flex items-center justify-center">
              <img
                src={lightboxImg.src}
                alt={lightboxImg.title}
                className="max-h-[80vh] w-auto object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
