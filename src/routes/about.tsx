import { Link, createFileRoute } from "@tanstack/react-router";
import { ChatCta } from "@/components/chrome";
import { media } from "@/data/media";
import { experience, toolkit } from "@/data/content";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Route = createFileRoute("/about")({ 
  component: About,
  head: () => ({
    meta: [
      { title: "About — Atharv Pathak" },
      { name: "description", content: "Learn more about my background and experience." }
    ]
  })
});

function TextReveal({ text }: { text: string }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "end 60%"]
  });
  
  const words = text.split(" ");
  return (
    <p ref={container} className="text-3xl leading-tight font-medium tracking-tight md:text-5xl flex flex-wrap gap-x-2 gap-y-1">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
        return (
          <motion.span key={i} style={{ opacity }}>
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}

function About() {
  return (
    <main className="pt-14 md:pt-16">
      <section className="border-b border-primary/50 text-primary">
        <div className="grid grid-cols-4 md:grid-cols-12">
          <div className="col-span-4 md:col-span-10 md:col-start-2 border-x border-primary/50 pt-16 md:pt-40 pb-0">
            <div className="grid grid-cols-4 md:grid-cols-10 border-b border-primary/50">
              <div className="col-span-4 md:col-span-6 p-3 md:p-4 flex flex-col justify-end">
                <p className="mb-2 md:mb-3 text-[0.7rem] font-bold tracking-[0.18em] uppercase opacity-75">The</p>
                <h1 className="text-[clamp(4.5rem,15vw,9rem)] leading-[0.8] font-bold tracking-[-0.06em]">
                  developer.
                </h1>
              </div>
              <div className="col-span-4 md:col-span-4 border-t md:border-t-0 md:border-l border-primary/50 relative aspect-video md:aspect-auto md:min-h-full overflow-hidden bg-primary/10">
                <video src={media.aboutVideo} autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
            
            <div className="grid grid-cols-4 md:grid-cols-10 border-b border-primary/50">
              <div className="col-span-4 md:col-span-4 border-r border-primary/50 p-6 md:p-10 flex flex-col items-start gap-8 bg-paper">
                <div>
                  <p className="text-[0.7rem] font-bold tracking-[0.18em] uppercase opacity-75 mb-4">HI, I'M ATHARV!</p>
                  <p className="text-3xl leading-none font-semibold tracking-tight md:text-5xl">This is me.</p>
                </div>
                <figure className="mt-4 w-full">
                  <img
                    src={media.aboutPortrait || "/media/DSCF0746_converted-1.webp"}
                    alt="Atharv Pathak"
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <figcaption className="text-[0.65rem] font-bold tracking-[0.18em] uppercase mt-3 opacity-70">Studio, 2025</figcaption>
                </figure>
              </div>
              <div className="col-span-4 md:col-span-6 p-6 md:p-10 flex flex-col justify-between bg-paper">
                <div>
                  <TextReveal text="Your friendly neighbourhood developer." />
                  <div className="mt-12 max-w-xl space-y-6 text-lg leading-relaxed">
                    <p>
                      I’m an Information Technology engineering student who enjoys building practical software—from web applications and automation tools to data-driven and AI-focused projects. I work primarily with Python and also build interfaces with React and Next.js. I’m interested in backend systems, APIs, databases, browser automation, and using technology to solve real problems.
                    </p>
                    <p>
                      I have also contributed to student developer communities, helped coordinate technical workshops, mentored peers in Java, and led a team project for the Google Solution Challenge. I’m continuing to strengthen my engineering fundamentals and build a portfolio of clear, useful, well-documented projects.
                    </p>
                    <p>
                      When I'm not writing code, I enjoy exploring how APIs, data, and AI can make applications more useful.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-primary/50 text-primary">
        <div className="grid grid-cols-4 md:grid-cols-12">
          <div className="col-span-4 md:col-span-10 md:col-start-2 border-x border-primary/50 pt-16 md:pt-32">
            <div className="grid grid-cols-4 md:grid-cols-10 border-b border-primary/50">
              <div className="col-span-4 md:col-span-10 p-3 md:p-4">
                <p className="mb-2 md:mb-3 text-[0.7rem] font-bold tracking-[0.18em] uppercase opacity-75">What I work in</p>
                <h2 className="text-5xl leading-[0.85] font-bold tracking-[-0.06em] md:text-7xl lg:text-8xl">Toolkit.</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3">
              {toolkit.map((group, idx) => (
                <div key={group.n} className={`py-8 md:py-12 p-6 md:p-8 ${idx !== 2 ? "border-b md:border-b-0 md:border-r border-primary/50" : ""}`}>
                  <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase border border-primary/50 inline-block px-3 py-1 mb-6">
                    {group.n} — {group.title}
                  </p>
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="text-lg lowercase font-medium">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="text-primary bg-paper">
        <div className="grid grid-cols-4 md:grid-cols-12">
          <div className="col-span-4 md:col-span-10 md:col-start-2 border-x border-primary/50 pt-16 md:pt-32">
            <div className="grid grid-cols-4 md:grid-cols-10 border-b border-primary/50">
              <div className="col-span-4 md:col-span-10 p-3 md:p-4">
                <p className="mb-2 md:mb-3 text-[0.7rem] font-bold tracking-[0.18em] uppercase opacity-75">Experience</p>
                <h2 className="text-5xl leading-[0.85] font-bold tracking-[-0.06em] md:text-7xl lg:text-8xl">I'm very wise.</h2>
              </div>
            </div>
            <div className="grid lg:grid-cols-10">
              <ol className="lg:col-span-6">
                {experience.map((job, i) => (
                  <li
                    key={job.role + job.when}
                    className={`grid gap-4 py-8 px-6 md:px-8 grid-cols-1 sm:grid-cols-12 sm:items-baseline sm:gap-6 ${i !== experience.length - 1 ? "border-b border-primary/50" : "border-b lg:border-b-0 border-primary/50"}`}
                  >
                    <p className="text-[0.65rem] font-bold tracking-[0.18em] uppercase sm:col-span-3 opacity-75">{job.when}</p>
                    <p className="text-2xl font-semibold tracking-tight sm:col-span-5">{job.role}</p>
                    <p className="sm:col-span-4 sm:text-right text-lg">
                      {job.href ? (
                        <a href={job.href} target="_blank" rel="noreferrer" className="underline hover:opacity-70">{job.company}</a>
                      ) : (
                        job.company
                      )}
                      <br/><span className="text-base opacity-75">{job.rest}</span>
                    </p>
                  </li>
                ))}
              </ol>
              <div className="lg:col-span-4 relative min-h-64 lg:min-h-full border-t lg:border-t-0 lg:border-l border-primary/50 bg-primary/10">
                <img src={media.aboutExperienceStill} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ChatCta />
    </main>
  );
}
