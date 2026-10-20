import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef, type Ref } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChatCta } from "@/components/chrome";
import { IntroLoader, hasIntroPlayed } from "@/components/intro/IntroLoader";
import { media } from "@/data/media";
import { getWork, heroFrames, selectedSlugs, services } from "@/data/content";

export const Route = createFileRoute("/")({ component: Home });

const selected = selectedSlugs
  .map((slug) => getWork(slug))
  .filter((work): work is NonNullable<typeof work> => Boolean(work));

function RollLink({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span>{children}</span>
    </span>
  );
}

const quoteImages = [
  "quote1.webp",
  "quote2.webp",
  "quote3.webp",
  "quote4.webp",
  "quote5.webp"
];

function QuoteSlideshow({
  innerRef,
  active,
  className = "relative col-span-1 md:col-span-8 h-full overflow-hidden border-b md:border-b-0 md:border-r border-primary/50",
}: {
  innerRef?: Ref<HTMLDivElement>;
  active: boolean;
  className?: string;
}) {
  const [current, setCurrent] = useState(0);

  // don't start cycling until the intro is over, so quote1 is still showing when the loader hands over
  useEffect(() => {
    if (!active) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % quoteImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [active]);

  return (
    <div ref={innerRef} className={className}>
      <AnimatePresence>
        <motion.img
          key={`light-${current}`}
          src={`/media/qoutes/light/${quoteImages[current]}?v=2`}
          alt="Quote"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover quote-light"
        />
        <motion.img
          key={`dark-${current}`}
          src={`/media/qoutes/dark/${quoteImages[current]}?v=2`}
          alt="Quote"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover quote-dark"
        />
      </AnimatePresence>
    </div>
  );
}

// images the loader waits for before the counter may reach 100 (a missing file never blocks it)
const INTRO_ASSETS = ["/media/pink.webp"];

function Home() {
  const [index, setIndex] = useState(0);
  // `intro` gates the hero's own entrance (text, roles, monogram); `showLoader` mounts the loader.
  // Both start true on a fresh page load and false on client-side navigation back to "/".
  const [intro, setIntro] = useState(() => !hasIntroPlayed());
  const [showLoader, setShowLoader] = useState(() => !hasIntroPlayed());
  const heroRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const work = selected[index] ?? selected[0];

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const stageRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const slot = slotRef.current;
    const box = targetRef.current;
    const frame = frameRef.current;
    const img = imgRef.current;
    if (!stage || !slot || !box || !frame || !img) return;

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cur = reduce ? 1 : 0;
    let raf = 0;

    function clamp(v: number) { return Math.min(1, Math.max(0, v)); }
    function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
    function rel(el: HTMLElement) {
      const s = stage!.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      return { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height };
    }
    let cachedA = rel(slot!);
    let cachedB = rel(box!);
    function measure() {
      if (!slot || !box || !stage) return;
      cachedA = rel(slot);
      cachedB = rel(box);
    }
    function targetVal() {
      if (reduce) return 1;
      const top = box!.getBoundingClientRect().top;
      const vh = window.innerHeight;
      return clamp((vh * 0.9 - top) / (vh * 0.7));
    }
    function paint(p: number) {
      frame!.style.left = lerp(cachedA.x, cachedB.x, p) + 'px';
      frame!.style.top = lerp(cachedA.y, cachedB.y, p) + 'px';
      frame!.style.width = lerp(cachedA.w, cachedB.w, p) + 'px';
      frame!.style.height = lerp(cachedA.h, cachedB.h, p) + 'px';
      img!.style.transform = 'scale(' + lerp(1.3, 1, p) + ')';
    }
    function tick() {
      const t = targetVal();
      cur += (t - cur) * 0.14;
      if (Math.abs(t - cur) < 0.001) cur = t;
      paint(cur);
      raf = cur === t ? 0 : requestAnimationFrame(tick);
    }
    function kick() { if (!raf) raf = requestAnimationFrame(tick); }
    function onResize() { measure(); kick(); }

    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);
    measure();
    kick();

    return () => {
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main className="overflow-hidden">
      {showLoader && (
        <IntroLoader
          heroRef={heroRef}
          targetRef={quoteRef}
          assets={INTRO_ASSETS}
          onReveal={() => setIntro(false)}
          onDone={() => setShowLoader(false)}
        />
      )}

      <section
        ref={heroRef}
        className="flex flex-col h-auto md:h-[calc(100svh-4rem)] border-b border-primary/50 relative z-40 bg-paper overflow-hidden"
      >
        {/* TOP ROW: Two images with vertical divider (8 cols / 4 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-primary/50 bg-paper h-[38vh] sm:h-[42vh] md:h-[48vh] lg:h-[50vh] max-h-[480px]">
          {/* Quote Slideshow (8 columns on desktop) */}
          <QuoteSlideshow
            innerRef={quoteRef}
            active={!showLoader}
            className="relative col-span-1 md:col-span-8 h-full overflow-hidden border-b md:border-b-0 md:border-r border-primary/50"
          />

          {/* Right Image (4 columns on desktop) */}
          {/* wipes up from the bottom once the intro photo has landed */}
          <motion.div
            initial={intro ? { clipPath: "inset(100% 0% 0% 0%)" } : false}
            animate={{ clipPath: intro ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative col-span-1 md:col-span-4 h-full overflow-hidden cursor-crosshair"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              src="/media/pink.webp"
              alt="Atharv Pathak"
              className="absolute inset-0 h-full w-full object-cover transform-gpu"
            />
          </motion.div>
        </div>

        {/* BOTTOM ROW: Name (7 cols) | Roles (3 cols) | Monogram (2 cols) */}
        <div className="grid grid-cols-12 bg-paper relative flex-1 min-h-[160px] md:min-h-0">
          {/* Cell 1: Name / Wordmark (7 columns) */}
          <div className="col-span-12 md:col-span-7 flex items-end p-3 sm:p-4 md:p-5 lg:p-6 overflow-hidden border-b md:border-b-0 md:border-r border-primary/50">
            {/* letters fade in one after another, like the reference intro */}
            <p
              aria-label="Atharv Pathak."
              className="text-[clamp(2.8rem,6.8vw,7.6rem)] leading-[0.85] font-bold tracking-[-0.08em] text-primary select-none"
            >
              {"Atharv Pathak.".split("").map((ch, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  initial={intro ? { opacity: 0 } : false}
                  animate={{ opacity: intro ? 0 : 1 }}
                  transition={{ delay: 0.8 + i * 0.035, duration: 0.25, ease: "easeOut" }}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                  {ch}
                </motion.span>
              ))}
            </p>
          </div>

          {/* Cell 2: Roles (3 columns) */}
          <motion.ul
            initial={intro ? "hidden" : false}
            animate={intro ? "hidden" : "visible"}
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 1.0 } }
            }}
            className="col-span-8 md:col-span-3 flex flex-col justify-end gap-1 p-3 sm:p-4 md:p-5 lg:p-6 border-r border-primary/50 text-base leading-[1.15] font-medium tracking-[-0.02em] md:text-lg lg:text-2xl"
          >
            <motion.li variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>Web Developer</motion.li>
            <motion.li variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>UX Designer</motion.li>
            <motion.li variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>ML Learner</motion.li>
          </motion.ul>

          {/* Cell 3: Monogram (2 columns) */}
          <div className="col-span-4 md:col-span-2 flex items-center justify-center p-3 sm:p-4 md:p-5">
            <motion.span
              initial={intro ? { scale: 0.5, opacity: 0 } : false}
              animate={intro ? { scale: 0.5, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ delay: 1.15, duration: 0.6, ease: "easeOut" }}
              className="monogram"
              aria-hidden
            />
          </div>
        </div>
      </section>

      <section className="w-full bg-paper text-primary border-b border-primary/50 relative">
        <div className="max-w-[1100px] mx-auto border-x border-primary/50 pb-[40vh]">
          <h2 className="pt-[clamp(48px,12vh,120px)] px-[clamp(16px,3vw,40px)] pb-3 text-[clamp(3rem,10vw,7.5rem)] leading-[0.9] tracking-[-0.05em] font-bold border-b border-primary/50">
            developer.
          </h2>
          <div className="relative" ref={stageRef}>
            <div className="grid grid-cols-1 md:grid-cols-[40%_60%]">
              <div className="p-[24px_clamp(16px,3vw,40px)] md:border-r border-primary/50 text-[0.95rem]">
                <p className="mb-5 text-base md:text-lg">
                  I’m an Information Technology engineering student who enjoys building practical software—from web applications and automation tools to data-driven and AI-focused projects. I work primarily with Python and also build interfaces with React and Next.js.
                </p>
                <Link to="/about" className="inline-block border border-primary px-[14px] py-[6px] text-[0.8rem] transition-colors hover:bg-primary hover:text-paper font-medium uppercase tracking-widest">
                  Learn more
                </Link>
              </div>
              <div ref={slotRef} className="min-h-[clamp(220px,32vw,360px)]"></div>
            </div>
            <div ref={targetRef} className="mt-[clamp(24px,6vw,80px)] border-y border-primary/50 aspect-[16/9]"></div>
            <div ref={frameRef} className="absolute left-0 top-0 overflow-hidden pointer-events-none bg-black">
              <img ref={imgRef} alt="Atharv Pathak" src="/media/main.jpg" className="block w-full h-full object-cover object-top origin-top" />
            </div>
          </div>
        </div>
      </section>
      {/* SELECTED WORKS SECTION */}
      <section className="w-full bg-paper text-primary relative z-20">
        <div className="max-w-[1600px] mx-auto border-x border-primary/50 relative flex flex-col lg:flex-row">

          {/* Left Container (Thumbnails + Feature) */}
          <div className="w-full lg:w-[957px] flex flex-col lg:border-r border-primary/50">

            {/* Header Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="p-8 lg:p-[40px_40px_30px_40px]"
            >
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary block mb-2">Selected</span>
              <h2 className="text-[70px] lg:text-[110px] font-extrabold tracking-[-0.06em] leading-[0.85] text-primary">
                works.
              </h2>
            </motion.div>

            {/* Main Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col lg:flex-row lg:h-[700px]"
            >
              {/* Thumbnails */}
              <div className="w-full lg:w-[200px] flex lg:flex-col overflow-x-auto lg:overflow-hidden lg:border-r border-primary/50">
                {selected.map((item, i) => (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`relative w-[150px] lg:w-full aspect-square lg:aspect-auto lg:flex-1 shrink-0 border-r lg:border-r-0 lg:border-b border-primary/50 lg:last:border-b-0 cursor-pointer overflow-hidden group transition-all ${i === index ? "ring-2 ring-primary ring-inset" : ""
                      }`}
                    aria-label={item.title}
                  >
                    <img src={item.cover} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className={`absolute inset-0 bg-paper transition-opacity duration-300 ${i === index ? 'opacity-0' : 'opacity-75 group-hover:opacity-40 grayscale'}`} />
                    <div className="absolute bottom-1.5 left-2 z-10 text-[9px] font-mono uppercase tracking-wider bg-paper/95 text-primary px-1.5 py-0.5 rounded shadow-xs opacity-90 backdrop-blur-xs">
                      {item.shortTitle}
                    </div>
                  </button>
                ))}
              </div>

              {/* Feature Card */}
              <div className="w-full lg:w-[757px] flex flex-col h-[520px] lg:h-auto">
                {/* Top Panel */}
                <div className="bg-primary text-paper p-[24px_24px_18px_24px] lg:p-[32px_36px_22px_36px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-block text-[9px] lg:text-[10px] tracking-[0.2em] font-bold uppercase border border-paper/40 px-2.5 py-0.5 rounded-full opacity-90">
                        {work.statusBadge}
                      </span>
                      <span className="text-[10px] lg:text-[11px] font-mono tracking-widest opacity-75">
                        0{index + 1} / 0{selected.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline gap-4 pb-1">
                      <h3 className="text-[24px] lg:text-[34px] font-bold leading-tight m-0 tracking-tight">
                        {work.shortTitle}
                      </h3>
                      <Link to="/works/$slug" params={{ slug: work.slug }} className="text-[11px] lg:text-[13px] tracking-[0.14em] font-semibold uppercase hover:underline decoration-2 underline-offset-4 whitespace-nowrap text-paper">
                        CASE STUDY &gt;
                      </Link>
                    </div>
                    <p className="text-paper/85 text-[12px] lg:text-[14px] line-clamp-1 mt-1 font-light">
                      {work.subtitle}
                    </p>
                  </div>
                  <hr className="border-t border-paper/20 w-full my-3" />
                  <div className="flex justify-between items-center text-[9px] lg:text-[11px] uppercase tracking-[0.16em] opacity-80 font-mono">
                    <span className="truncate pr-4">{work.tags.slice(0, 3).join(" • ")}</span>
                    <span className="whitespace-nowrap">{work.year}</span>
                  </div>
                </div>

                {/* Bottom Panel */}
                <div className="flex-1 relative overflow-hidden bg-paper">
                  <motion.img
                    key={work.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    src={work.cover}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Arrow Navigation */}
                <div className="flex border-t border-primary/50">
                  <button
                    type="button"
                    onClick={() => setIndex((index - 1 + selected.length) % selected.length)}
                    className="flex-1 flex items-center justify-center py-6 border-r border-primary/50 text-primary hover:bg-primary hover:text-paper transition-colors duration-300 cursor-pointer"
                    aria-label="Previous project"
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12" />
                      <polyline points="12 19 5 12 12 5" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIndex((index + 1) % selected.length)}
                    className="flex-1 flex items-center justify-center py-6 text-primary hover:bg-primary hover:text-paper transition-colors duration-300 cursor-pointer"
                    aria-label="Next project"
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column (Portrait) */}
          <div className="w-full lg:w-[641px] relative h-[400px] lg:h-auto bg-paper">
            <motion.img
              src="/media/Transparent_-Portrait.webp"
              alt="Atharv Pathak"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain object-bottom scale-[1.1] origin-bottom z-20 grayscale contrast-125 cursor-pointer"
              animate={{ x: [0, 0, 2, 2, 0] }}
              transition={{ duration: 4.4, ease: "linear", times: [0, 0.4545, 0.5, 0.9545, 1], repeat: Infinity }}
              whileHover={{
                x: [0, 15, -15, 0],
                transition: { duration: 0.4, ease: "easeInOut" }
              }}
            />
          </div>

        </div>

        {/* Marquee Strip */}
        <Link to="/works" className="w-full h-[54px] border-y border-primary/50 overflow-hidden flex items-center bg-paper hover:bg-primary hover:text-paper transition-colors group/marquee block relative z-30">
          <div className="marquee-track flex h-full w-max items-center text-[13px] tracking-[0.2em] uppercase text-primary group-hover/marquee:text-paper group-hover/marquee:[animation-play-state:paused]">
            {Array.from({ length: 4 }, (_, copy) => (
              <span key={copy} className="flex shrink-0 items-center">
                {Array.from({ length: 12 }, (_, n) => (
                  <span key={n} className="flex shrink-0 items-center whitespace-nowrap">
                    VIEW ALL WORKS<span className="px-[30px] opacity-70">/</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </Link>
      </section>

      <section className="text-primary">
        <div className="grid grid-cols-4 md:grid-cols-12">
          <div className="col-span-4 md:col-span-10 md:col-start-2 border-x border-primary/50 pt-16 md:pt-32 bg-paper relative">
            <div className="grid grid-cols-4 md:grid-cols-10 border-b border-primary/50">
              <div className="col-span-4 md:col-span-10 p-3 md:p-4">
                <p className="mb-3 md:mb-4 text-[0.7rem] font-bold tracking-[0.18em] uppercase opacity-75">My</p>
                <h2 className="text-5xl leading-[0.85] font-bold tracking-[-0.06em] md:text-7xl lg:text-8xl">services.</h2>
              </div>
            </div>
            {services.map((service) => (
              <div key={service.n} className="group grid grid-cols-1 lg:grid-cols-10 border-b border-primary/50 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-primary/[0.03]">
                <div className="lg:col-span-6 flex flex-col md:flex-row items-start p-6 md:p-8 lg:py-20 lg:px-12 lg:border-r border-primary/50 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:py-32">
                  <div className="w-12 md:w-20 shrink-0 mt-2 md:mt-3">
                    <p className="text-[0.65rem] tracking-[0.18em] uppercase opacity-60">{service.n}</p>
                  </div>
                  <div className="flex-1 pr-4">
                    <h3 className="text-3xl font-bold tracking-[-0.04em] md:text-5xl lg:text-[4rem] leading-[1.1] lowercase">
                      {service.title}
                    </h3>
                  </div>
                  <div className="w-full md:w-48 lg:w-56 shrink-0 mt-6 md:mt-3">
                    <ul className="flex flex-col gap-2">
                      {service.items.map((item) => (
                        <li key={item} className="text-[0.65rem] font-bold tracking-[0.18em] uppercase opacity-80">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="lg:col-span-4 relative h-48 lg:h-auto border-t lg:border-t-0 border-primary/50 overflow-hidden bg-primary/10">
                  <div className="absolute inset-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 origin-center">
                    {service.n === "01" && (
                      <img src="/media/Full-Stack.webp" alt="Full-Stack Development" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-left-top" />
                    )}
                    {service.n === "02" && (
                      <img src="/media/AutomationAndData.webp" alt="Automation & Data" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-left-top" />
                    )}
                    {service.n === "03" && (
                      <img src="/media/AIML.webp" alt="AI & Machine Learning" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-left-top" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ChatCta />
    </main>
  );
}