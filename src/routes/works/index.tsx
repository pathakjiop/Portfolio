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
   HEADER  – the tall "big word at the bottom-left" row used by featured / the rest / chat
   ROWS    – the tile rhythm of the grid: 3 across → 60/40 → 50/50, then repeats      */
const RAIL = "md:mx-[8.4%] md:border-x border-primary/40";

const HEADING =
  "text-[clamp(2.6rem,6vw,5.5rem)] font-extrabold leading-[0.88] tracking-[-0.05em] text-primary";

const HEADER =
  "border-b border-primary/40 p-5 md:p-6 flex flex-col justify-end min-h-[130px] md:min-h-[17vw]";

const ROWS = [
  { cols: ["md:w-1/3", "md:w-1/3", "md:w-1/3"], aspect: "aspect-[4/3] md:aspect-square" },
  { cols: ["md:w-3/5", "md:w-2/5"], aspect: "aspect-[16/10]" },
  { cols: ["md:w-1/2", "md:w-1/2"], aspect: "aspect-[4/3]" },
];

export function WorksPage() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const featured = useMemo(
    () => works.find((work) => work.slug === "uai") ?? works[0],
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

  // Chunk the filtered list into rows following the ROWS rhythm
  const rows = useMemo(() => {
    const out: { items: Work[]; spec: (typeof ROWS)[number] }[] = [];
    let i = 0;
    let r = 0;
    while (i < filteredRestWorks.length) {
      const spec = ROWS[r % ROWS.length];
      out.push({ items: filteredRestWorks.slice(i, i + spec.cols.length), spec });
      i += spec.cols.length;
      r += 1;
    }
    return out;
  }, [filteredRestWorks]);

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
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] text-primary group-hover/feat:underline decoration-1 underline-offset-4">
                  {featured.title}
                </h3>
                <p className="mt-6 text-sm sm:text-base md:text-lg leading-relaxed opacity-85 max-w-[44ch]">
                  {featured.excerpt}
                </p>
              </div>

              <div className="mt-10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider border border-primary/40 px-3 py-1 opacity-75">
                    {featured.kind}
                  </span>
                  {featured.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] font-bold uppercase tracking-wider border border-primary/50 px-3 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <span className="font-mono text-sm md:text-base font-bold uppercase tracking-wider inline-flex items-center gap-1 group-hover/feat:translate-x-1.5 transition-transform self-end sm:self-auto shrink-0">
                  LEARN MORE →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────── THE REST: heading, search + filters, tile grid ────────────────── */}
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

          {/* Tile rows */}
          {rows.length === 0 ? (
            <p className="p-8 font-mono text-xs uppercase tracking-widest opacity-60">
              No works match.
            </p>
          ) : (
            rows.map((row, r) => (
              <div
                key={r}
                className="flex flex-col md:flex-row md:border-b border-primary/40 last:border-b-0"
              >
                {row.items.map((work, ci) => (
                  <motion.div
                    key={work.slug}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: ci * 0.06 }}
                    className={`${row.spec.cols[ci]} md:shrink-0 border-b md:border-b-0 md:border-r md:last:border-r-0 border-primary/40`}
                  >
                    <Link
                      to="/works/$slug"
                      params={{ slug: work.slug }}
                      className="group flex h-full flex-col"
                    >
                      <div
                        className={`relative w-full overflow-hidden bg-primary/10 ${row.spec.aspect}`}
                      >
                        <img
                          src={work.cover}
                          alt={work.title}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>

                      <div className="border-t border-primary/40 p-4 md:p-5">
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="text-sm md:text-base font-medium leading-snug group-hover:underline underline-offset-4 decoration-1">
                            {work.title}
                          </h3>
                          <span className="font-mono text-[10px] opacity-50 shrink-0">
                            {work.year}
                          </span>
                        </div>
                        <div className="mt-1.5 flex items-center justify-between gap-3">
                          <span className="kicker font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
                            {work.kind}
                          </span>
                          <span className="font-mono text-[10px] font-bold uppercase tracking-widest inline-flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                            Read Case Study <ArrowUpRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ))
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