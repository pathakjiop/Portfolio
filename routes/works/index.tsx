import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChatCta } from "@/components/chrome";
import { media } from "@/data/media";
import { filters, works } from "@/data/content";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/works/")({
  component: WorksPage,
  head: () => ({
    meta: [
      { title: "Works — Atharv Pathak" },
      { name: "description", content: "View my featured and past works." }
    ]
  })
});

function WorksPage() {
  const [filter, setFilter] = useState("All");
  const featured = works.find((work) => work.featured) ?? works[0];
  const rest = useMemo(
    () =>
      works.filter((work) => filter === "All" || work.tags.some((tag) => tag === filter)),
    [filter],
  );

  return (
    <main className="pt-14 md:pt-16">
      <section className="border-b border-primary/50 text-primary">
        <div className="grid grid-cols-4 md:grid-cols-12">
          <div className="col-span-4 md:col-span-10 md:col-start-2 border-x border-primary/50 pt-16 md:pt-40">
            <div className="grid grid-cols-4 md:grid-cols-10 border-b border-primary/50">
              <div className="col-span-4 md:col-span-6 p-3 md:p-4 flex items-end">
                <h1 className="text-[clamp(4.5rem,15vw,10rem)] leading-[0.8] font-bold tracking-[-0.06em]">
                  works.
                </h1>
              </div>
              <div className="col-span-4 md:col-span-4 border-t md:border-t-0 md:border-l border-primary/50 flex items-center justify-center p-8 bg-paper">
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center bg-primary">
                  {/* Spinning Vinyl Graphic */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                    className="absolute inset-0 rounded-full"
                  >
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-paper" overflow="visible">
                      <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
                      <text className="text-[12px] font-bold uppercase tracking-[0.2em] fill-current">
                        <textPath href="#circlePath" startOffset="0%">
                          BY ME · BY ME · BY ME · BY ME ·
                        </textPath>
                      </text>
                    </svg>
                  </motion.div>
                  {/* Center photo */}
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-paper z-10">
                    <img src="/media/pink.webp" alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-10 border-b border-primary/50">
              <div className="col-span-4 md:col-span-10 p-3 md:p-4">
                <p className="mb-2 md:mb-3 text-[0.7rem] font-bold tracking-[0.18em] uppercase opacity-75">Featured.</p>
              </div>
            </div>
            <Link to="/works/$slug" params={{ slug: featured.slug }} className="grid grid-cols-4 md:grid-cols-10 group/featured cursor-pointer">
              <div className="col-span-4 md:col-span-6 relative min-h-[300px] border-b md:border-b-0 border-primary/50 overflow-hidden bg-primary/10">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  src={featured.cover}
                  alt={featured.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="col-span-4 md:col-span-4 md:border-l border-primary/50 p-6 md:p-10 flex flex-col justify-between bg-paper">
                <div>
                  <h2 className="text-4xl leading-none font-semibold tracking-tight md:text-5xl">
                    {featured.title}
                  </h2>
                  <p className="mt-6 max-w-[40ch] leading-relaxed text-lg">{featured.excerpt}</p>
                </div>
                <div className="mt-12 flex flex-col gap-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase opacity-70 border border-primary/20 px-3 py-1">{featured.kind}</span>
                    {featured.tags.map((tag) => (
                      <span key={tag} className="text-[0.65rem] font-bold tracking-[0.18em] uppercase border border-primary/50 px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="self-end text-lg md:text-xl uppercase tracking-[0.06em] group-hover/featured:underline decoration-2 underline-offset-4">Learn more ›</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="text-primary">
        <div className="grid grid-cols-4 md:grid-cols-12">
          <div className="col-span-4 md:col-span-10 md:col-start-2 border-x border-primary/50 pt-16 md:pt-32">
            <div className="grid grid-cols-4 md:grid-cols-10 border-b border-primary/50">
              <div className="col-span-4 md:col-span-10 p-3 md:p-4">
                <h2 className="text-5xl leading-[0.85] font-bold tracking-[-0.06em] md:text-7xl lg:text-8xl">the rest.</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 border-b border-primary/50 p-4">
              <div className="flex flex-wrap gap-2 md:gap-3">
                {filters.map((item) => {
                  const active = item === filter;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFilter(item)}
                      className={`text-[0.65rem] font-bold tracking-[0.18em] uppercase px-4 py-2 transition-colors ${active ? "bg-primary text-paper" : "border border-primary/40 hover:bg-primary/10"}`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {rest.length === 0 ? (
              <div className="p-8 border-b border-primary/50">
                <p className="text-xl">Nothing in that filter yet.</p>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                  {rest.map((work, idx) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      key={work.slug}
                      className={`border-b border-primary/50 group block ${(idx + 1) % 3 !== 0 ? "lg:border-r" : ""} ${(idx + 1) % 2 !== 0 ? "md:border-r lg:border-r-0 lg:[&:not(:nth-child(3n))]:border-r" : ""}`}
                    >
                      <Link to="/works/$slug" params={{ slug: work.slug }} className="block h-full flex flex-col">
                        <div className="relative aspect-[4/3] md:aspect-square lg:aspect-[4/3] overflow-hidden bg-primary/10 border-b border-primary/50">
                          <motion.img
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            src={work.cover}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-4 md:p-5 flex-1 flex flex-col justify-between bg-paper">
                          <h3 className="text-2xl font-medium tracking-tight leading-tight">{work.title}</h3>
                          <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase mt-4 opacity-70">{work.kind}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <ChatCta />
    </main>
  );
}
