import { Link, createFileRoute } from "@tanstack/react-router";
import { ChatCta } from "@/components/chrome";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Camera } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Atharv Pathak" },
      { name: "description", content: "Learn more about my background and experience." },
    ],
  }),
});

/* ------------------------------------------------------------------ */
/* IMAGE PATHS                                                        */
/* ------------------------------------------------------------------ */
const IMG_HEADER = "/media/DSCF0725_converted-1.webp";
const IMG_ME     = "/media/main.jpg";
const IMG_WISE   = "/media/wise.jpg";

/* ------------------------------------------------------------------ */
/* TextReveal — each word fades from faint → solid on scroll           */
/* ------------------------------------------------------------------ */
function TextReveal({ text }: { text: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.6"],
  });

  const words = text.split(" ");
  return (
    <h3
      ref={ref}
      className="text-[1.55rem] md:text-[2.15rem] lg:text-[2.4rem] font-bold tracking-tight text-primary leading-[1.2] flex flex-wrap gap-x-[0.4em] gap-y-0.5"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.18, 1]);
        return (
          <motion.span key={i} style={{ opacity }}>
            {word}
          </motion.span>
        );
      })}
    </h3>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */
const toolkitData = [
  {
    n: "01",
    title: "build",
    Icon: Code2,
    items: [
      "javascript", "typescript", "html", "css", "tailwind",
      "git", "python", "react", "next.js", "ui frameworks",
    ],
  },
  {
    n: "02",
    title: "design",
    Icon: Palette,
    items: [
      "figma", "wireframing", "ui design", "user testing",
      "rapid prototyping", "style guides", "design systems",
      "responsive layouts",
    ],
  },
  {
    n: "03",
    title: "shoot",
    Icon: Camera,
    items: ["davinci resolve", "premiere pro", "lightroom"],
  },
];

const experienceData = [
  { when: "Nov 2023 – Present",  role: "Mid Developer",                  company: "Pureframe Labs",           rest: "Full-time" },
  { when: "Apr 2022 – Nov 2023", role: "Junior Web Developer",           company: "Studio Craft",             rest: "Frontend Development" },
  { when: "Jan 2022 – Apr 2022", role: "UI Designer + Web Developer",    company: "Google Solution Challenge", rest: "Lead Engineering" },
  { when: "Nov 2021 – Jan 2022", role: "Junior Web Developer",           company: "FabLab Mentorship",        rest: "Java & Systems" },
  { when: "Dec 2020 – Oct 2021", role: "Graphic Designer",               company: "Creative Collective",      rest: "Branding & Visuals" },
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
function About() {
  return (
    <main className="bg-paper text-primary">

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — THE developer. + bench photo
          ═══════════════════════════════════════════════════════════════ */}
      <section className="border-b border-primary/50">
        <div className="grid grid-cols-1 md:grid-cols-12 border-x border-primary/50">
          {/* Left 8 cols — label at top, huge heading at bottom */}
          <div className="md:col-span-8 p-6 md:p-10 lg:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-primary/50 min-h-[280px] md:min-h-[420px] lg:min-h-[460px]">
            <p className="text-[0.62rem] md:text-[0.7rem] font-bold tracking-[0.28em] uppercase opacity-65">
              THE
            </p>
            <h1 className="text-[clamp(4.2rem,13.5vw,9.8rem)] leading-[0.8] font-bold tracking-[-0.06em]">
              developer.
            </h1>
          </div>

          {/* Right 4 cols — bench photo, edge-to-edge */}
          <div className="md:col-span-4 relative min-h-[280px] md:min-h-full overflow-hidden bg-primary/5">
            <img
              src={IMG_HEADER}
              alt="Developer sitting on a park bench"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — "This is me" (sticky left) + Bio + Toolkit
          ═══════════════════════════════════════════════════════════════ */}
      <section className="border-b border-primary/50">
        <div className="grid grid-cols-1 md:grid-cols-12 border-x border-primary/50 md:items-start">

          {/* LEFT 5 / 12 — sticky on desktop */}
          <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-primary/50">
            <div className="p-6 md:p-8 lg:p-10 md:sticky md:top-16">
              <p className="text-[0.58rem] font-bold font-mono tracking-[0.24em] uppercase opacity-65 mb-3">
                HI, I'M ATHARV!
              </p>
              <h2 className="text-[1.85rem] md:text-[2.75rem] font-bold tracking-tight leading-[1.05] mb-5 md:mb-6">
                This is me.
              </h2>
              <figure>
                <img
                  src={IMG_ME}
                  alt="Balancing on a log"
                  className="w-full aspect-[4/3] object-cover border border-primary/50"
                />
                <figcaption className="text-[0.55rem] font-mono tracking-[0.24em] uppercase mt-2.5 opacity-40">
                  STUDIO, 2025
                </figcaption>
              </figure>
            </div>
          </div>

          {/* RIGHT 7 / 12 */}
          <div className="md:col-span-7 flex flex-col">

            {/* ── reveal heading ── */}
            <div className="p-6 md:px-8 md:py-8 lg:p-10 border-b border-primary/50 min-h-[120px] md:min-h-[160px] flex items-end">
              <TextReveal text="Your friendly neighbourhood developer." />
            </div>

            {/* ── bio ── */}
            <div className="p-6 md:px-8 md:py-8 lg:p-10 border-b border-primary/50">
              <div className="space-y-4 text-[0.8rem] md:text-[0.86rem] leading-[1.85] max-w-[34rem] opacity-85">
                <p>
                  I'm a 24-year-old web developer based in Brisbane, Australia.
                  My path started in UI design, eventually graduating from QUT
                  with a Bachelor of Design in Interactive Design but somewhere
                  between wireframing a button and wondering how it actually
                  worked, I fell down the development rabbit hole and never
                  climbed back out. These days I spend most of my time building
                  things on the internet with a heavy emphasis for detail and a
                  developer's stubbornness about getting the spacing right. When
                  I'm not writing code, I'm shooting video or making music,
                  which keeps the creative side of my brain from getting jealous.
                </p>
                <p>
                  I build with HTML, CSS, JavaScript, [11ty/Next.js/etc.], React
                  / Vue... Before development claimed me, years in the Adobe
                  suite (Photoshop, Illustrator, InDesign, Premiere Pro,
                  Lightroom) gave me a solid foundation in visual craft and my UX
                  background means I can run user research, build wireframes and
                  prototypes, and find my way to something that actually works
                  for real people. Outside the browser, I edit video in DaVinci
                  Resolve and take my fujifilm x-pro3 &amp; 28mm pretty much
                  everywhere.
                </p>
              </div>
              <div className="mt-7">
                <Link
                  to="/contact"
                  className="inline-block border border-primary/60 px-4 py-2.5 text-[0.62rem] font-mono uppercase tracking-[0.2em] hover:bg-primary hover:text-paper transition-colors duration-200"
                >
                  Get in touch
                </Link>
              </div>
            </div>

            {/* ── toolkit ── */}
            <div className="p-6 md:px-8 md:pt-8 md:pb-10 lg:p-10">
              <p className="text-[0.55rem] font-bold font-mono tracking-[0.24em] uppercase opacity-55 mb-1.5">
                WHAT I WORK IN
              </p>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6">
                Toolkit
              </h2>

              <div className="space-y-5">
                {toolkitData.map(({ n, title, Icon, items }) => (
                  <div key={n}>
                    <div className="flex items-center gap-2 pb-2 mb-2.5 border-b border-primary/25 text-[0.72rem] font-mono font-bold">
                      <Icon className="h-3 w-3 opacity-60" strokeWidth={1.5} />
                      <span>{n}</span>
                      <span className="opacity-40">—</span>
                      <span>{title}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((item) => (
                        <span
                          key={item}
                          className="border border-primary/35 px-2 py-0.5 text-[0.58rem] font-mono lowercase tracking-wide hover:bg-primary hover:text-paper transition-colors duration-150 inline-block cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — Experience timeline + "I'm very wise." + photo
          ═══════════════════════════════════════════════════════════════ */}
      <section className="border-b border-primary/50">
        <div className="grid grid-cols-1 md:grid-cols-12 border-x border-primary/50">

          {/* LEFT 7 / 12 — timeline */}
          <div className="md:col-span-7 border-b md:border-b-0 md:border-r border-primary/50 divide-y divide-primary/50">
            {experienceData.map((job) => (
              <div
                key={job.when + job.role}
                className="px-6 md:px-8 py-4 md:py-5 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 hover:bg-primary hover:text-paper transition-colors duration-200 group/row cursor-default"
              >
                <span className="text-[0.58rem] font-mono tracking-[0.06em] opacity-55 group-hover/row:opacity-80 shrink-0 sm:w-[130px] sm:pt-1 whitespace-nowrap">
                  {job.when}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[0.95rem] md:text-base font-bold tracking-tight leading-tight">
                    {job.role}
                  </h4>
                  <p className="text-[0.58rem] font-mono mt-1 opacity-75">
                    <span className="underline underline-offset-2 decoration-current/40">
                      {job.company}
                    </span>
                    <span className="opacity-50"> · {job.rest}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT 5 / 12 — heading + photo */}
          <div className="md:col-span-5 p-6 md:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <p className="text-[0.58rem] font-bold font-mono tracking-[0.24em] uppercase opacity-65 mb-2 mt-0.5 md:mt-2">
                EXPERIENCE
              </p>
              <h2 className="text-[2rem] md:text-[2.6rem] font-bold tracking-[-0.04em] leading-[0.95] mb-5">
                I'm very wise.
              </h2>
            </div>
            <img
              src={IMG_WISE}
              alt="Looking out over the city"
              className="w-full aspect-[4/3] object-cover border border-primary/50 mt-4 md:mt-0"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 — Chat CTA
          ═══════════════════════════════════════════════════════════════ */}
      <ChatCta />
    </main>
  );
}