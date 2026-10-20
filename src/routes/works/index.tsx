import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { filters, works, type Work } from "@/data/content";
import { LaptopModel } from "@/components/LaptopModel";
import { motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";

export const Route = createFileRoute("/works/")({
  component: WorksPage,
  head: () => ({
    meta: [
      { title: "Works — Atharv Pathak" },
      {
        name: "description",
        content:
          "Selected works & software engineering catalog: full-stack systems, local AI execution gateways, browser automation, and developer protocols.",
      },
    ],
  }),
});

/* ───────────── layout tokens ─────────────
   RAIL    – the two vertical lines that frame every section below the hero
   HEADER  – the tall "big word at the bottom-left" row used by featured / the rest / chat */
const RAIL = "md:mx-[8.4%] md:border-x border-primary/40";

const HEADING =
  "text-[clamp(2.6rem,6vw,5.5rem)] font-extrabold leading-[0.88] tracking-[-0.05em] text-primary";

const HEADER =
  "border-b border-primary/40 p-5 md:p-6 flex flex-col justify-end min-h-[130px] md:min-h-[17vw]";

export function WorksPage() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const featured = useMemo(
    () => works.find((work) => work.featured) ?? works[0],
    [],
  );

  const restWorks = useMemo(() => {
    return works.filter((w) => w.slug !== featured.slug);
  }, [featured]);

  const filteredRestWorks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return restWorks.filter((w) => {
      const inFilter =
        filter === "All" ||
        w.filterCategories.some((c) => c.toLowerCase() === filter.toLowerCase()) ||
        w.tags.some((t) => t.toLowerCase() === filter.toLowerCase());
      const inSearch =
        !q ||
        [w.title, w.subtitle, w.kind, ...w.tags].join(" ").toLowerCase().includes(q);
      return inFilter && inSearch;
    });
  }, [restWorks, filter, query]);

  return (
    <main className="bg-paper text-primary selection:bg-primary selection:text-paper min-h-screen">
      {/* ────────────────── HERO: works. bottom-left, portrait chamber flush to screen end ────────────────── */}
      <section className="border-b border-primary/40">
        <div className="flex flex-col md:flex-row items-stretch justify-between w-full">
          {/* Left Title Area: bottom-left aligned */}
          <div className="flex-1 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-end">
            <h1 className="text-[clamp(4.5rem,11vw,10.5rem)] font-extrabold leading-[0.82] tracking-[-0.07em] text-primary select-none">
              works.
            </h1>
          </div>

          {/* Right Portrait Box: flush to the screen end, locked aspect ratio so it never resizes/distorts on zoom */}
          <div className="w-full md:w-[340px] lg:w-[420px] xl:w-[460px] aspect-square shrink-0 border-t md:border-t-0 md:border-l border-primary/40 bg-[#140407] relative overflow-hidden flex items-end justify-center">
            {/* Spinning Circular Badge with SMOOTH OPERATOR */}
            <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-[#7a1224] flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                className="absolute inset-0 rounded-full"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full text-paper" overflow="visible">
                  <path id="heroVinylCircle" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
                  <text className="text-[9.5px] font-mono font-bold uppercase tracking-[0.2em] fill-current">
                    <textPath href="#heroVinylCircle" startOffset="0%">
                      SMOOTH OPERATOR · SMOOTH OPERATOR ·
                    </textPath>
                  </text>
                </svg>
              </motion.div>
            </div>

            {/* Atharv Portrait: anchored to bottom, fully stable during zoom in/out */}
            <img
              src="/media/Square_Transparent_Portrait.png"
              alt="Atharv Pathak"
              className="relative z-10 w-full h-full object-contain object-bottom filter contrast-125 brightness-95 select-none pointer-events-none"
            />
          </div>
        </div>
      </section>

      {/* ────────────────── FEATURED: heading row, then laptop | details ────────────────── */}
      <section className="border-b border-primary/40">
        <div className={RAIL}>
          <div className={HEADER}>
            <h2 className={HEADING}>featured.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left half: 3D wireframe laptop with project cover */}
            <div className="border-b md:border-b-0 md:border-r border-primary/40 flex items-center justify-center p-4 md:p-8 min-h-[360px] md:min-h-[500px] lg:min-h-[540px]">
              <LaptopModel
                cover={featured.cover}
                className="w-full h-full min-h-[360px] md:min-h-[480px]"
              />
            </div>

            {/* Right half: project details, tags + LEARN MORE matching reference layout */}
            <Link
              to="/works/$slug"
              params={{ slug: featured.slug }}
              className="group/feat flex flex-col justify-between p-6 sm:p-8 md:p-12 lg:p-14 bg-paper transition-colors hover:bg-primary/[0.02]"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[9px] font-bold tracking-widest bg-primary text-paper px-2.5 py-1 uppercase">
                    [ FLAGSHIP // 00 ]
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider border border-primary/40 px-2 py-0.5 opacity-80 font-bold">
                    {featured.statusBadge}
                  </span>
                  <span className="font-mono text-[10px] opacity-60 ml-auto tracking-wider">
                    {featured.year}
                  </span>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-65 block mb-2">
                  {featured.subtitle}
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] text-primary group-hover/feat:underline decoration-1 underline-offset-4">
                  {featured.title}
                </h3>
                <p className="mt-5 text-sm sm:text-base md:text-lg leading-relaxed opacity-85 max-w-[46ch]">
                  {featured.excerpt}
                </p>

                {featured.architecture && (
                  <div className="mt-6 flex flex-wrap gap-2 font-mono text-[10px] opacity-80">
                    {featured.architecture.backend && (
                      <span className="border border-primary/30 px-2.5 py-1 bg-primary/5">
                        Core: {featured.architecture.backend.split(",")[0]}
                      </span>
                    )}
                    {featured.architecture.frontend && (
                      <span className="border border-primary/30 px-2.5 py-1 bg-primary/5">
                        Client: {featured.architecture.frontend.split(",")[0]}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-primary/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider border border-primary/50 px-3 py-1">
                    {featured.kind}
                  </span>
                  {featured.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] uppercase tracking-wider border border-primary/30 px-2.5 py-1 opacity-80"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-widest inline-flex items-center gap-1.5 group-hover/feat:translate-x-1.5 transition-transform self-end sm:self-auto shrink-0">
                  EXPLORE CASE STUDY →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────── THE REST: heading, search + filters, architectural mosaic grid ────────────────── */}
      <section className="border-b border-primary/40">
        <div className={RAIL}>
          <div className={HEADER}>
            <h2 className={HEADING}>the rest.</h2>
          </div>

          {/* Search (left) | filter pills (right) */}
          <div className="grid grid-cols-1 md:grid-cols-[30%_1fr] border-b border-primary/40">
            <label className="flex items-center gap-2 px-5 md:px-6 py-4 border-b md:border-b-0 md:border-r border-primary/40 cursor-text">
              <Search className="w-3 h-3 shrink-0 opacity-70" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search works"
                aria-label="Search works"
                className="w-full bg-transparent outline-none font-mono text-[10px] uppercase tracking-[0.2em] text-primary placeholder:text-primary/60"
              />
            </label>

            <div className="flex flex-wrap gap-1.5 p-3 md:p-4">
              {filters.map((f) => {
                const active = f === filter;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`text-[10px] font-mono font-bold uppercase tracking-[0.15em] px-4 py-2.5 rounded-[2px] transition-colors cursor-pointer ${active
                        ? "bg-primary text-paper"
                        : "border border-primary/60 text-primary hover:bg-primary/10"
                      }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Architectural Mosaic Grid */}
          {filteredRestWorks.length === 0 ? (
            <div className="p-12 text-center font-mono text-xs uppercase tracking-widest opacity-60">
              No works match your current filter.
            </div>
          ) : (
            <div className="grid grid-cols-12 border-b border-primary/40">
              {filteredRestWorks.map((work, idx) => {
                const patternIdx = idx % 6;
                const isLone = filteredRestWorks.length === 1;

                if (isLone || patternIdx === 0) {
                  return (
                    <SpotlightCard
                      key={work.slug}
                      work={work}
                      index={idx}
                      isFullWidth={isLone}
                    />
                  );
                }

                if (patternIdx === 1) {
                  return <TechnicalSpecCard key={work.slug} work={work} index={idx} />;
                }

                if (patternIdx === 2) {
                  return (
                    <BentoCard
                      key={work.slug}
                      work={work}
                      index={idx}
                      borderRight
                    />
                  );
                }

                if (patternIdx === 3) {
                  return (
                    <BentoCard
                      key={work.slug}
                      work={work}
                      index={idx}
                      borderRight
                    />
                  );
                }

                if (patternIdx === 4) {
                  return <BentoCard key={work.slug} work={work} index={idx} />;
                }

                // patternIdx === 5
                return <GrandEditorialCard key={work.slug} work={work} index={idx} />;
              })}
            </div>
          )}
        </div>
      </section>

      {/* ────────────────── CHAT: heading row, then text + button | photograph ────────────────── */}
      <section className="border-b border-primary/40 bg-paper text-primary">
        <div className={RAIL}>
          <div className={HEADER}>
            <span className="kicker block mb-2 font-mono font-bold text-[10px] opacity-65">
              SAY HI
            </span>
            <h2 className={HEADING}>chat?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-2 border-b md:border-b-0 md:border-r border-primary/40 p-5 md:p-6 flex flex-col items-start gap-5">
              <p className="text-sm md:text-base font-medium opacity-90 max-w-[28ch]">
                Have a project in mind? Let's talk about it.
              </p>
              <Link
                to="/contact"
                className="inline-block border border-primary px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-widest transition-colors hover:bg-primary hover:text-paper"
              >
                Drop me a line
              </Link>
            </div>

            <div className="md:col-span-3 overflow-hidden bg-primary/10 min-h-[220px] md:min-h-0 relative">
              <img
                src="/media/main.jpg"
                alt="Atharv Pathak"
                className="w-full h-full object-cover object-center filter contrast-105"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SPECIAL ARCHITECTURAL CARD ARCHETYPES
   Crafted with editorial layouts, technical blueprint specs, and rich tactile accents
───────────────────────────────────────────────────────────────────────────── */

function SpotlightCard({
  work,
  index,
  isFullWidth,
}: {
  work: Work;
  index: number;
  isFullWidth?: boolean;
}) {
  return (
    <article
      className={`col-span-12 ${isFullWidth ? "lg:col-span-12" : "lg:col-span-7"
        } border-b border-primary/40 ${!isFullWidth ? "lg:border-r" : ""
        } flex flex-col justify-between group hover:bg-primary/[0.02] transition-colors`}
    >
      <Link
        to="/works/$slug"
        params={{ slug: work.slug }}
        className="p-6 sm:p-8 flex flex-col justify-between h-full"
      >
        <div>
          {/* Metadata Topline */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold opacity-60">
                [{String(index + 1).padStart(2, "0")}]
              </span>
              {work.statusBadge && (
                <span className="font-mono text-[9px] uppercase tracking-wider border border-primary/40 px-2 py-0.5 inline-flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {work.statusBadge}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px] opacity-70">
              <span className="uppercase tracking-wider">{work.kind}</span>
              <span>•</span>
              <span>{work.year}</span>
            </div>
          </div>

          {/* Media Showcase */}
          <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden border border-primary/30 bg-primary/5 relative my-4">
            <img
              src={work.cover}
              alt={work.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <span className="absolute bottom-2.5 left-2.5 font-mono text-[9px] uppercase tracking-widest bg-paper/90 px-2 py-0.5 border border-primary/30 backdrop-blur-sm">
              [VIEW // {String(index + 1).padStart(2, "0")}]
            </span>
          </div>

          {/* Header & Excerpt */}
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-65 block mt-5 mb-2">
            {work.subtitle}
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary leading-tight group-hover:underline underline-offset-4 decoration-1">
            {work.title}
          </h3>
          <p className="mt-3 text-sm sm:text-base leading-relaxed opacity-85 max-w-[55ch]">
            {work.excerpt}
          </p>
        </div>

        {/* Footer info & CTA */}
        <div className="mt-8 pt-5 border-t border-primary/25 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {work.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-wider border border-primary/30 px-2 py-0.5 opacity-80"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
            EXPLORE WORK <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}

function TechnicalSpecCard({
  work,
  index,
}: {
  work: Work;
  index: number;
}) {
  return (
    <article className="col-span-12 lg:col-span-5 border-b border-primary/40 flex flex-col justify-between group hover:bg-primary/[0.02] transition-colors">
      <Link
        to="/works/$slug"
        params={{ slug: work.slug }}
        className="p-6 sm:p-7 flex flex-col justify-between h-full"
      >
        <div>
          {/* Top Spec Header */}
          <div className="flex items-center justify-between font-mono text-[10px] pb-3 border-b border-primary/20 opacity-70">
            <span className="font-bold tracking-wider">
              [{String(index + 1).padStart(2, "0")}] TECHNICAL SPEC
            </span>
            <span>{work.year}</span>
          </div>

          {/* Media Preview */}
          <div className="aspect-[16/10] overflow-hidden border border-primary/25 bg-primary/5 my-4 relative">
            <img
              src={work.cover}
              alt={work.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>

          {/* Blueprint Specs Box */}
          <div className="border border-primary/25 bg-primary/[0.03] p-3 font-mono text-[10px] space-y-1.5 my-3">
            <div className="flex items-center justify-between opacity-75 border-b border-primary/15 pb-1">
              <span className="opacity-60">DOMAIN</span>
              <span className="font-bold uppercase">{work.kind}</span>
            </div>
            {work.architecture?.backend && (
              <div className="flex items-center justify-between opacity-85">
                <span className="opacity-60">CORE</span>
                <span className="truncate max-w-[22ch]">{work.architecture.backend}</span>
              </div>
            )}
            {work.architecture?.frontend && (
              <div className="flex items-center justify-between opacity-85">
                <span className="opacity-60">CLIENT</span>
                <span className="truncate max-w-[22ch]">{work.architecture.frontend}</span>
              </div>
            )}
            {work.statusBadge && (
              <div className="flex items-center justify-between opacity-85">
                <span className="opacity-60">STATUS</span>
                <span className="font-bold">{work.statusBadge}</span>
              </div>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-primary group-hover:underline underline-offset-4 decoration-1 mt-3">
            {work.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed opacity-80 line-clamp-2">
            {work.excerpt}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-primary/20 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider opacity-65">
            {work.tags[0]}
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            DETAILS <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}

function BentoCard({
  work,
  index,
  borderRight,
}: {
  work: Work;
  index: number;
  borderRight?: boolean;
}) {
  return (
    <article
      className={`col-span-12 md:col-span-6 lg:col-span-4 border-b ${borderRight ? "md:border-r" : ""
        } border-primary/40 flex flex-col justify-between group transition-colors hover:bg-primary/[0.02]`}
    >
      <Link
        to="/works/$slug"
        params={{ slug: work.slug }}
        className="p-5 sm:p-6 flex flex-col justify-between h-full"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between font-mono text-[10px] mb-4">
            <span className="font-bold opacity-60">
              [{String(index + 1).padStart(2, "0")}]
            </span>
            <span className="uppercase tracking-wider px-2 py-0.5 text-[9px] border font-bold border-primary/40 text-primary">
              {work.statusBadge || work.kind}
            </span>
            <span className="opacity-60">
              {work.year}
            </span>
          </div>

          {/* Media preview */}
          <div className="aspect-[16/10] overflow-hidden border my-3 relative border-primary/25 bg-primary/5">
            <img
              src={work.cover}
              alt={work.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>

          <span className="font-mono text-[10px] uppercase tracking-[0.2em] block mt-4 mb-1.5 opacity-60">
            {work.kind}
          </span>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight leading-snug group-hover:underline underline-offset-4 decoration-1 text-primary">
            {work.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed line-clamp-2 opacity-80">
            {work.excerpt}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-primary/20 flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {work.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border border-primary/25 opacity-70"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform text-primary">
            OPEN <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </Link>
    </article>
  );
}

function GrandEditorialCard({
  work,
  index,
}: {
  work: Work;
  index: number;
}) {
  return (
    <article className="col-span-12 border-b border-primary/40 group hover:bg-primary/[0.015] transition-colors">
      <Link
        to="/works/$slug"
        params={{ slug: work.slug }}
        className="grid grid-cols-1 lg:grid-cols-12"
      >
        {/* Left Column: Editorial Specs */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-primary/40">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2 font-mono text-[10px]">
                <span className="font-bold opacity-60">
                  [{String(index + 1).padStart(2, "0")}] EDITORIAL SHOWCASE
                </span>
                {work.statusBadge && (
                  <span className="border border-primary/40 px-2 py-0.5 font-bold uppercase text-[9px]">
                    {work.statusBadge}
                  </span>
                )}
              </div>
              <span className="font-mono text-[10px] opacity-60 tracking-wider">
                {work.year}
              </span>
            </div>

            <span className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-65 block mb-2">
              {work.subtitle}
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary leading-[1.1] group-hover:underline underline-offset-4 decoration-1">
              {work.title}
            </h3>
            <p className="mt-4 text-sm sm:text-base leading-relaxed opacity-85 max-w-[50ch]">
              {work.excerpt}
            </p>

            {/* Problem & Solution High-Level Snippet */}
            {work.solution && (
              <div className="mt-6 border-l-2 border-primary/50 pl-4 py-1 text-xs sm:text-sm italic opacity-80 max-w-[52ch]">
                "{work.solution.slice(0, 140)}..."
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-primary/25 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider border border-primary/50 px-2.5 py-0.5">
                {work.kind}
              </span>
              {work.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] uppercase tracking-wider border border-primary/30 px-2 py-0.5 opacity-80"
                >
                  {t}
                </span>
              ))}
            </div>

            <span className="font-mono text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform">
              EXPLORE CASE STUDY →
            </span>
          </div>
        </div>

        {/* Right Column: Full-Bleed Media */}
        <div className="lg:col-span-5 relative overflow-hidden bg-primary/5 min-h-[260px] sm:min-h-[340px] lg:min-h-full">
          <img
            src={work.cover}
            alt={work.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-60" />
          <span className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-widest bg-paper/90 px-2.5 py-1 border border-primary/30 backdrop-blur-sm">
            [ARCHIVE // {work.year}]
          </span>
        </div>
      </Link>
    </article>
  );
}