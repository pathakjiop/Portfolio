import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChatCta } from "@/components/chrome";
import { filters, works, utilityProjects, type Work } from "@/data/content";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Shield,
  Layers,
  Cpu,
  Terminal,
  Activity,
  Code2,
  Workflow,
  ExternalLink,
  ChevronRight,
  Database,
  Search,
} from "lucide-react";

export const Route = createFileRoute("/works/")({
  component: WorksPage,
  head: () => ({
    meta: [
      { title: "Atharv Pathak" },
      {
        name: "description",
        content:
          "Consolidated engineering portfolio: Python backends, AI execution gateways, browser automation pipelines, systems programming in Rust, and full-stack platforms.",
      },
    ],
  }),
});

export function WorksPage() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featured = useMemo(
    () => works.find((work) => work.slug === "uai") ?? works[0],
    [],
  );

  const filteredWorks = useMemo(() => {
    return works.filter((work) => {
      const matchesFilter =
        filter === "All" ||
        work.filterCategories.includes(filter) ||
        work.tags.some((tag) => tag.toLowerCase() === filter.toLowerCase());

      const matchesSearch =
        !searchQuery ||
        work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        work.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        work.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        work.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <main className="pt-14 md:pt-16 bg-paper text-primary selection:bg-primary selection:text-paper">
      {/* HERO SECTION */}
      <section className="border-b border-primary/50 text-primary">
        <div className="grid grid-cols-4 md:grid-cols-12">
          <div className="col-span-4 md:col-span-10 md:col-start-2 border-x border-primary/50 pt-16 md:pt-28">
            <div className="grid grid-cols-4 md:grid-cols-10 border-b border-primary/50">
              <div className="col-span-4 md:col-span-7 p-4 sm:p-6 md:p-8 flex flex-col justify-end">
                <span className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase opacity-75 mb-3 block">
                  Engineering Catalog // 2024 — 2026
                </span>
                <h1 className="text-[clamp(3.8rem,12vw,9.5rem)] leading-[0.82] font-extrabold tracking-[-0.06em]">
                  works.
                </h1>
                <p className="mt-6 text-base md:text-xl font-normal max-w-[55ch] leading-relaxed opacity-90">
                  A consolidated, developer-friendly reference for my software builds: from high-throughput scraper pipelines and local AI agent execution gateways to Rust TUIs and identity protocols.
                </p>
              </div>

              {/* Spinning Badge Graphic */}
              <div className="col-span-4 md:col-span-3 border-t md:border-t-0 md:border-l border-primary/50 flex items-center justify-center p-8 bg-paper">
                <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full flex items-center justify-center bg-primary">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
                    className="absolute inset-0 rounded-full"
                  >
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-paper" overflow="visible">
                      <path id="circlePathWorks" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
                      <text className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] fill-current">
                        <textPath href="#circlePathWorks" startOffset="0%">
                          BUILT BY ATHARV · CODE & SYSTEMS ·
                        </textPath>
                      </text>
                    </svg>
                  </motion.div>
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-paper z-10 flex items-center justify-center bg-paper text-primary font-mono font-black text-sm tracking-tighter">
                    AP.
                  </div>
                </div>
              </div>
            </div>

            {/* ENGINEERING METRICS STRIP */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-primary/50 text-xs font-mono divide-x divide-primary/50">
              <div className="p-4 sm:p-5 flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest opacity-60">Architectures</span>
                <span className="text-xl sm:text-2xl font-bold tracking-tight">10 Projects</span>
              </div>
              <div className="p-4 sm:p-5 flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest opacity-60">High-Scale Pipeline</span>
                <span className="text-xl sm:text-2xl font-bold tracking-tight">25k Records</span>
              </div>
              <div className="p-4 sm:p-5 flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest opacity-60">Systems & AI</span>
                <span className="text-xl sm:text-2xl font-bold tracking-tight">Gateways & TUI</span>
              </div>
              <div className="p-4 sm:p-5 flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest opacity-60">Primary Languages</span>
                <span className="text-xl sm:text-2xl font-bold tracking-tight">Python / Rust / TS</span>
              </div>
            </div>

            {/* FEATURED SPOTLIGHT */}
            <div className="grid grid-cols-4 md:grid-cols-10 border-b border-primary/50 bg-primary/[0.02]">
              <div className="col-span-4 md:col-span-10 p-3 md:p-4 flex items-center justify-between">
                <p className="text-[0.7rem] font-mono font-bold tracking-[0.2em] uppercase opacity-75">
                  Featured Architecture Spotlight
                </p>
                <span className="text-[10px] font-mono border border-primary/40 px-2 py-0.5 uppercase tracking-wider">
                  {featured.statusBadge}
                </span>
              </div>
            </div>

            <Link
              to="/works/$slug"
              params={{ slug: featured.slug }}
              className="grid grid-cols-4 md:grid-cols-10 group/featured cursor-pointer border-b border-primary/50"
            >
              <div className="col-span-4 md:col-span-6 relative min-h-[340px] md:min-h-[440px] border-b md:border-b-0 border-primary/50 overflow-hidden bg-primary/10">
                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  src={featured.cover}
                  alt={featured.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute top-4 left-4 z-10 bg-primary/90 text-paper text-[10px] font-mono px-3 py-1 uppercase tracking-widest backdrop-blur-xs">
                  {featured.kind}
                </div>
              </div>
              <div className="col-span-4 md:col-span-4 md:border-l border-primary/50 p-6 md:p-10 flex flex-col justify-between bg-paper">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary opacity-70">
                      {featured.year} // {featured.status}
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl leading-tight font-bold tracking-tight">
                    {featured.title}
                  </h2>
                  <p className="mt-2 text-sm font-medium opacity-80 font-mono">
                    {featured.subtitle}
                  </p>
                  <p className="mt-5 text-base leading-relaxed opacity-90 line-clamp-3">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-6">
                  <div className="flex flex-wrap gap-1.5">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono font-medium tracking-wider uppercase border border-primary/50 px-2.5 py-1 bg-paper"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-primary/30">
                    <span className="text-xs font-mono uppercase tracking-widest opacity-70">Read Specification</span>
                    <span className="inline-flex items-center gap-1 text-sm font-bold uppercase tracking-widest group-hover/featured:translate-x-1 transition-transform">
                      EXPLORE ARCHITECTURE <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FILTER & ARCHIVE SECTION */}
      <section className="text-primary border-b border-primary/50">
        <div className="grid grid-cols-4 md:grid-cols-12">
          <div className="col-span-4 md:col-span-10 md:col-start-2 border-x border-primary/50 pt-16 md:pt-24">
            
            {/* Section Header */}
            <div className="grid grid-cols-4 md:grid-cols-10 border-b border-primary/50">
              <div className="col-span-4 md:col-span-10 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase opacity-75 block mb-2">
                    Directory // All Systems
                  </span>
                  <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.9]">
                    all architectures.
                  </h2>
                </div>
                <p className="text-xs font-mono uppercase tracking-widest opacity-70 md:text-right">
                  Showing {filteredWorks.length} of {works.length} projects
                </p>
              </div>
            </div>

            {/* Filter Pills & Live Search Bar */}
            <div className="grid grid-cols-1 border-b border-primary/50 p-4 md:p-6 bg-paper flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {filters.map((item) => {
                  const active = item === filter;
                  const count =
                    item === "All"
                      ? works.length
                      : works.filter((w) =>
                          w.filterCategories.includes(item) ||
                          w.tags.some((t) => t.toLowerCase() === item.toLowerCase()),
                        ).length;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFilter(item)}
                      className={`text-[11px] font-mono font-bold tracking-[0.16em] uppercase px-3.5 py-2 transition-all flex items-center gap-2 cursor-pointer ${
                        active
                          ? "bg-primary text-paper shadow-sm"
                          : "border border-primary/40 hover:bg-primary/10 text-primary"
                      }`}
                    >
                      <span>{item}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-xs ${active ? "bg-paper/20 text-paper" : "bg-primary/10 text-primary"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search input */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                <input
                  type="text"
                  placeholder="Filter by keyword (e.g. FastAPI, OCR)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs font-mono border border-primary/40 bg-transparent placeholder:text-primary/40 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Projects Grid */}
            {filteredWorks.length === 0 ? (
              <div className="p-16 border-b border-primary/50 text-center">
                <p className="text-2xl font-bold">No projects match the selected criteria.</p>
                <button
                  type="button"
                  onClick={() => {
                    setFilter("All");
                    setSearchQuery("");
                  }}
                  className="mt-4 px-4 py-2 border border-primary text-xs font-mono uppercase tracking-widest hover:bg-primary hover:text-paper"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                  {filteredWorks.map((work, idx) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      key={work.slug}
                      className={`border-b border-primary/50 group flex flex-col bg-paper ${
                        (idx + 1) % 3 !== 0 ? "lg:border-r" : ""
                      } ${(idx + 1) % 2 !== 0 ? "md:border-r lg:border-r-0 lg:[&:not(:nth-child(3n))]:border-r" : ""}`}
                    >
                      <Link
                        to="/works/$slug"
                        params={{ slug: work.slug }}
                        className="flex flex-col h-full cursor-pointer"
                      >
                        {/* Cover image container */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-primary/10 border-b border-primary/50">
                          <motion.img
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            src={work.cover}
                            alt={work.title}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                          <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-primary/90 text-paper px-2 py-0.5 backdrop-blur-xs">
                              {work.statusBadge}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3 text-[10px] font-mono bg-paper/90 text-primary px-2 py-0.5 backdrop-blur-xs">
                            {work.year}
                          </div>
                        </div>

                        {/* Card body */}
                        <div className="p-5 md:p-6 flex-1 flex flex-col justify-between bg-paper">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest opacity-60 block mb-1">
                              {work.kind}
                            </span>
                            <h3 className="text-2xl font-bold tracking-tight leading-snug group-hover:underline decoration-1 underline-offset-4">
                              {work.shortTitle}
                            </h3>
                            <p className="mt-1 text-xs font-mono opacity-75 line-clamp-1">
                              {work.subtitle}
                            </p>
                            <p className="mt-3 text-sm leading-relaxed opacity-85 line-clamp-2">
                              {work.excerpt}
                            </p>
                          </div>

                          <div className="mt-6 pt-4 border-t border-primary/20 flex flex-col gap-3">
                            {/* Tech chips */}
                            <div className="flex flex-wrap gap-1">
                              {work.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[9px] font-mono uppercase border border-primary/30 px-1.5 py-0.5"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider pt-1">
                              <span className="opacity-60">Specification</span>
                              <span className="font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                View Case Study →
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* SECONDARY UTILITIES / EXPERIMENTS SECTION */}
            <div className="grid grid-cols-4 md:grid-cols-10 border-b border-primary/50 bg-primary/[0.03]">
              <div className="col-span-4 md:col-span-10 p-6 md:p-8">
                <span className="text-[11px] font-mono font-bold tracking-[0.25em] uppercase opacity-75 block mb-2">
                  Lab Inventory // Verified Utilities
                </span>
                <h3 className="text-3xl md:text-5xl font-bold tracking-[-0.04em] leading-tight">
                  experiments & small utilities.
                </h3>
                <p className="mt-2 text-sm md:text-base max-w-[65ch] leading-relaxed opacity-85">
                  Targeted utilities, browser extensions, desktop applications, and algorithms developed across personal experiments and curriculum milestones.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-primary/50">
              {utilityProjects.map((util, i) => (
                <div
                  key={util.id}
                  className={`p-6 border-b border-primary/50 flex flex-col justify-between bg-paper hover:bg-primary/[0.02] transition-colors ${
                    (i + 1) % 3 !== 0 ? "lg:border-r" : ""
                  } ${(i + 1) % 2 !== 0 ? "md:border-r lg:border-r-0 lg:[&:not(:nth-child(3n))]:border-r" : ""}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[9px] font-mono uppercase border border-primary/40 px-2 py-0.5 tracking-wider opacity-75">
                        {util.status}
                      </span>
                      <span className="text-[10px] font-mono opacity-50">#{util.id}</span>
                    </div>
                    <h4 className="text-xl font-bold tracking-tight mb-2">{util.name}</h4>
                    <p className="text-xs md:text-sm leading-relaxed opacity-80">{util.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-primary/20 flex flex-wrap gap-1">
                    {util.tech.map((t) => (
                      <span key={t} className="text-[9px] font-mono uppercase bg-primary/10 px-2 py-0.5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <ChatCta />
    </main>
  );
}
