import { Link, createFileRoute, useLayoutEffect } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import toast from "react-hot-toast";
import { registerLenis, resetScroll } from "@/lib/scroll";
import {
  Code2,
  Terminal,
  Database,
  Server,
  Cpu,
  Workflow,
  GraduationCap,
  Award,
  Users,
  ArrowUpRight,
  Sparkles,
  Check,
  Mail,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "Atharv Pathak" },
      {
        name: "description",
        content:
          "Final-year Information Technology engineering student specializing in Python, full-stack web development, automation, APIs, and AI/LLM applications.",
      },
    ],
  }),
});

/* ------------------------------------------------------------------ */
/* ASSET PATHS                                                        */
/* ------------------------------------------------------------------ */
const IMG_HERO = "/media/sit.png";
const IMG_ME = "/media/lift.webp";
const IMG_RELIABLE = "/media/still-08.jpg";
const IMG_CTA = "/media/wall.webp";

/* ------------------------------------------------------------------ */
/* Roll Hover helper                                                  */
/* ------------------------------------------------------------------ */
function RollText({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span>{children}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* DATA SOURCES (Directly from ME.md)                                  */
/* ------------------------------------------------------------------ */
const toolkitCategories = [
  {
    id: "languages",
    label: "Languages",
    n: "01",
    title: "Programming Languages",
    Icon: Terminal,
    description: "Core languages used across backend systems, algorithms, and applications.",
    items: [
      { name: "Python", highlight: true, note: "Primary Language" },
      { name: "JavaScript", highlight: true, note: "Web & Scripting" },
      { name: "TypeScript", highlight: false, note: "Typed Apps" },
      { name: "C", highlight: false, note: "Fundamentals" },
      { name: "C++", highlight: false, note: "DSA & Problem Solving" },
      { name: "Java", highlight: false, note: "OOP & Mentorship" },
      { name: "Rust", highlight: false, note: "Systems / Learning" },
      { name: "SQL", highlight: true, note: "Relational Queries" },
      { name: "HTML5", highlight: false, note: "Semantics" },
      { name: "CSS3", highlight: false, note: "Styling" },
    ],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    n: "02",
    title: "Backend & Systems",
    Icon: Server,
    description: "Server architecture, RESTful APIs, asynchronous pipelines, and auth.",
    items: [
      { name: "Python Backend", highlight: true, note: "Core Specialty" },
      { name: "REST API Design", highlight: true, note: "Clean Contracts" },
      { name: "OAuth 2.0 & OIDC", highlight: false, note: "Auth Flows" },
      { name: "Django", highlight: false, note: "Full-Stack Python" },
      { name: "Flask", highlight: false, note: "Microservices" },
      { name: "Hono", highlight: false, note: "Edge APIs" },
      { name: "Actix", highlight: false, note: "Rust Web" },
      { name: "Axum", highlight: false, note: "Modern Async" },
      { name: "Verifiable Credentials", highlight: false, note: "Decentralized Auth" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    n: "03",
    title: "Frontend Engineering",
    Icon: Code2,
    description: "Interactive, accessible user interfaces built with modern reactive stacks.",
    items: [
      { name: "React.js", highlight: true, note: "UI Components" },
      { name: "Next.js", highlight: true, note: "SSR & Static Sites" },
      { name: "Tailwind CSS", highlight: true, note: "Utility-First" },
      { name: "Responsive Layouts", highlight: false, note: "Mobile to Desktop" },
      { name: "Vite", highlight: false, note: "Fast Build Tool" },
      { name: "UI Frameworks", highlight: false, note: "Design Tokens" },
    ],
  },
  {
    id: "data",
    label: "Databases & Data",
    n: "04",
    title: "Databases & Persistence",
    Icon: Database,
    description: "Relational schema design, database querying, and automated data pipelines.",
    items: [
      { name: "PostgreSQL", highlight: true, note: "Primary Relational DB" },
      { name: "MySQL", highlight: false, note: "Relational Storage" },
      { name: "Supabase", highlight: true, note: "Backend-as-a-Service" },
      { name: "Prisma ORM", highlight: false, note: "Type-safe DB" },
      { name: "Data Modeling", highlight: false, note: "Normalized Schemas" },
      { name: "ETL & Scraping Workflows", highlight: true, note: "Data Harvesting" },
    ],
  },
  {
    id: "automation",
    label: "Automation & Tools",
    n: "05",
    title: "Automation & Dev Tools",
    Icon: Workflow,
    description: "Browser automation, asynchronous queues, containerization, and developer tooling.",
    items: [
      { name: "Playwright", highlight: true, note: "Headless Browser Automation" },
      { name: "Web Scraping", highlight: true, note: "Document Extraction" },
      { name: "RabbitMQ", highlight: true, note: "Message Queue Workers" },
      { name: "Git & GitHub", highlight: true, note: "Version Control" },
      { name: "Docker", highlight: false, note: "Containers" },
      { name: "Bun", highlight: false, note: "Fast Runtime" },
      { name: "Tkinter", highlight: false, note: "Desktop GUI" },
      { name: "Turborepo", highlight: false, note: "Monorepo Workflows" },
      { name: "Vercel", highlight: false, note: "Deployment" },
    ],
  },
  {
    id: "aiml",
    label: "AI, ML & LLMs",
    n: "06",
    title: "AI, Machine Learning & LLMs",
    Icon: Cpu,
    description: "Predictive classification, model evaluation, and modern LLM application workflows.",
    items: [
      { name: "scikit-learn", highlight: true, note: "ML Algorithms" },
      { name: "pandas", highlight: true, note: "Data Analysis" },
      { name: "Matplotlib", highlight: false, note: "Visualization" },
      { name: "Decision Trees", highlight: true, note: "0.971 Accuracy" },
      { name: "Logistic Regression", highlight: false, note: "0.913 Accuracy" },
      { name: "Random Forest", highlight: false, note: "Ensemble Models" },
      { name: "Model Evaluation (ROC, AUC)", highlight: true, note: "Metrics & Confusion Matrix" },
      { name: "Ollama", highlight: true, note: "Local Model Inference" },
      { name: "OpenRouter", highlight: false, note: "LLM API Gateway" },
      { name: "Qwen2.5-Coder", highlight: false, note: "Local Coding LLM" },
      { name: "DeepSeek-Coder", highlight: false, note: "Model Experimentation" },
    ],
  },
];

const experienceList = [
  {
    when: "1 May 2026 – 26 June 2026",
    role: "Software Developer Intern",
    company: "Pureframe Labs Pvt. Ltd.",
    type: "Internship",
    description:
      "Engineered an automated document-retrieval and delivery workflow handling online PDF document retrieval, headless browser automation, background task processing, and PostgreSQL storage.",
    highlights: [
      "Built headless browser scraping & PDF extraction flows with Playwright and Python",
      "Integrated RabbitMQ-powered background worker queues for decoupled, resilient task execution",
      "Engineered PostgreSQL database schemas for tracking document requests, job states, and delivery logs",
      "Demonstrated scale handling data-collection runs (observed ~5,000 records collected in an 8-hour window)",
      "Designed WhatsApp delivery flow concepts and administrative monitoring pipelines",
    ],
    tech: ["Python", "Playwright", "RabbitMQ", "PostgreSQL", "Browser Automation"],
  },
];

const leadershipList = [
  {
    role: "Team Leader",
    initiative: "Google Solution Challenge",
    project: "Ayurvedic Information System",
    description:
      "Led an engineering team building an accessible digital platform to organize and present Ayurvedic health information with React and Python.",
  },
  {
    role: "Technical Workshop Coordinator",
    initiative: "Student Developer Community",
    project: "AI / ML & Android Development",
    description:
      "Coordinated hands-on student workshops introducing foundational machine learning concepts and mobile development practices to peers.",
  },
  {
    role: "Java Module Mentor",
    initiative: "FabLab",
    project: "Object-Oriented Programming",
    description:
      "Mentored fellow engineering students through core Java syntax, object-oriented principles, and practical problem solving.",
  },
  {
    role: "Engineering Project Lead",
    initiative: "Final-Year B.E. Capstone",
    project: "Engineering Final Year Project Lead",
    description:
      "Leading technical architecture, full-stack implementation, and milestone delivery for the final-year B.E. Information Technology capstone engineering project.",
  },
];

const educationList = [
  {
    degree: "Bachelor of Engineering (B.E.) — Information Technology",
    institution: "Engineering Degree",
    period: "Final Year · Expected May 2027",
    focus:
      "Core computing fundamentals, Data Structures & Algorithms, Database Engineering, Operating Systems, Computer Networks, and Machine Learning.",
    badge: "Current / Final Year",
  },
  {
    degree: "Senior Secondary (Class 12)",
    institution: "Vidya Bhumi Public School, Chhindwara, Madhya Pradesh",
    period: "Completed March 2023",
    focus: "Mathematics, Physics, Chemistry & Computer Science fundamentals.",
    badge: "Class 12",
  },
  {
    degree: "Secondary School (Class 10)",
    institution: "Vidya Bhumi Public School, Chhindwara, Madhya Pradesh",
    period: "Completed March 2022",
    focus: "Foundational education and high academic standing.",
    badge: "Class 10",
  },
];

const certificationsList = [
  {
    name: "JavaScript (Intermediate) Certificate",
    issuer: "HackerRank",
    category: "Certification",
  },
  {
    name: "SQL (Basic) Certificate",
    issuer: "HackerRank",
    category: "Certification",
  },
  {
    name: "Python Gold Badge & 5-Star Rating",
    issuer: "HackerRank",
    category: "Badge",
  },
  {
    name: "C++ 5-Star Badge",
    issuer: "HackerRank",
    category: "Badge",
  },
  {
    name: "Java 5-Star Badge",
    issuer: "HackerRank",
    category: "Badge",
  },
];

const learningRadar = [
  {
    topic: "Rust Systems Programming",
    detail: "Memory safety without garbage collection, concurrency, and high-performance backend microservices.",
  },
  {
    topic: "DSA in Python & Competitive Algorithms",
    detail: "Deepening algorithmic efficiency, graph traversal, and dynamic programming.",
  },
  {
    topic: "Distributed Worker Queues & Background Jobs",
    detail: "Building resilient automation pipelines capable of handling asynchronous surges.",
  },
  {
    topic: "LLM Agents & Local Inference",
    detail: "Experimenting with local models (Qwen2.5-Coder, Ollama) and prompt evaluation frameworks.",
  },
  {
    topic: "Identity & Verifiable Credentials (VCs / DIDs)",
    detail: "Decentralized identifier workflows and minimal-disclosure verification protocols.",
  },
];

/* ------------------------------------------------------------------ */
/* COMPONENT                                                           */
/* ------------------------------------------------------------------ */
function About() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const displayedCategories =
    activeTab === "all"
      ? toolkitCategories
      : toolkitCategories.filter((c) => c.id === activeTab);

  // Animation Refs
  const pageContainerRef = useRef<HTMLElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);

  const bioSectionRef = useRef<HTMLElement>(null);
  const sideBlockRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const meWrapperRef = useRef<HTMLDivElement>(null);
  const meImgRef = useRef<HTMLImageElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  const reliableWrapperRef = useRef<HTMLDivElement>(null);
  const reliableImgRef = useRef<HTMLImageElement>(null);
  const reliableCaptionRef = useRef<HTMLParagraphElement>(null);

  const ctaSectionRef = useRef<HTMLElement>(null);
  const ctaHeadingRef = useRef<HTMLHeadingElement>(null);
  const ctaImgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    resetScroll();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const isDesktop = window.innerWidth >= 1024;
    const headerHeight = 64;

    // 1. Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    registerLenis(lenis);
    resetScroll();

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(500, 33);

    // 2. Wrap all animations in gsap.context()
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            heroImgRef.current,
            meImgRef.current,
            reliableImgRef.current,
            ctaImgRef.current,
            ".footer-band-img",
            ".footer-wordmark-char",
          ],
          {
            clearProps: "all",
            opacity: 1,
            clipPath: "none",
            scale: 1,
            y: 0,
            yPercent: 0,
            filter: "none",
          }
        );

        if (sideBlockRef.current) {
          sideBlockRef.current.style.position = "sticky";
          sideBlockRef.current.style.top = "calc(4rem + 1.5rem)";
        }
        return;
      }

      // -------------------------------------------------------------
      // IMAGE 1: HERO SIT CUTOUT (seated on the bottom line of hero)
      // -------------------------------------------------------------
      if (heroImgRef.current && heroSectionRef.current) {
        // On load: smooth scale & fade reveal for the sitting cutout anchored at palm contact line
        gsap.fromTo(
          heroImgRef.current,
          { opacity: 0, scale: 1.5, transformOrigin: "80% 68.5%" },
          {
            opacity: 1,
            scale: 1,
            transformOrigin: "80% 68.5%",
            duration: 1.2,
            ease: "power3.out",
          }
        );

        const headingParallax = isMobile ? -10 : -20;

        // The huge "engineer." heading on left moves yPercent 0 -> -20 on same trigger
        if (heroHeadingRef.current) {
          gsap.to(heroHeadingRef.current, {
            yPercent: headingParallax,
            ease: "none",
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      }

      // -------------------------------------------------------------
      // IMAGE 2: "THIS IS ME" SECTION (Floating Side-Block + Motion)
      // -------------------------------------------------------------
      if (bioSectionRef.current && sideBlockRef.current && rightColumnRef.current && meImgRef.current) {
        // On first entry: eyebrow and heading rise from masked lines (yPercent 100 -> 0, 0.9s, power4.out, stagger 0.1),
        // photo reveals with clip-path inset(100% 0 0 0) -> inset(0)
        const entryTl = gsap.timeline({
          scrollTrigger: {
            trigger: bioSectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        entryTl.fromTo(
          [eyebrowRef.current, headingRef.current],
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power4.out",
          }
        );

        entryTl.fromTo(
          meImgRef.current,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0 0 0 0)",
            duration: 1.2,
            ease: "power4.out",
          },
          "<0.1"
        );

        // Desktop only (min-width 1024px) scroll-travel animation:
        // side-block floats down with page and stays in viewport until end of right column
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
          ScrollTrigger.create({
            trigger: bioSectionRef.current,
            start: `top top+=${headerHeight}`,
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
            animation: gsap.to(sideBlockRef.current, {
              y: () => {
                if (!rightColumnRef.current || !sideBlockRef.current) return 0;
                const distance = rightColumnRef.current.offsetHeight - sideBlockRef.current.offsetHeight;
                return Math.max(0, distance);
              },
              ease: "none",
            }),
          });

          // Photo inner parallax: img scale 1.12, yPercent -5 -> 5 scrubbed over the same trigger
          gsap.fromTo(
            meImgRef.current,
            { scale: 1.12, yPercent: -5 },
            {
              scale: 1.12,
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: bioSectionRef.current,
                start: `top top+=${headerHeight}`,
                end: "bottom bottom",
                scrub: 1,
              },
            }
          );
        });

        // Desaturate -> full color as image reaches viewport center (top 80% to top 40%)
        gsap.fromTo(
          meImgRef.current,
          { filter: "grayscale(1)" },
          {
            filter: "grayscale(0)",
            ease: "none",
            scrollTrigger: {
              trigger: meWrapperRef.current || bioSectionRef.current,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      }

      // -------------------------------------------------------------
      // IMAGE 3 & 4: Shown directly without scroll animations
      // -------------------------------------------------------------

      // -------------------------------------------------------------
      // IMAGE 5: FULL-BLEED BASKETBALL / SHIBUYA BAND (above footer nav)
      // -------------------------------------------------------------
      const footerBandWrapper = document.querySelector(".footer-band-wrapper");
      const footerBandImg = document.querySelector(".footer-band-img");
      if (footerBandWrapper && footerBandImg) {
        const bandParallax = isMobile ? 6 : 12;

        gsap.fromTo(
          footerBandImg,
          { scale: 1.35, yPercent: -bandParallax },
          {
            scale: 1.0,
            yPercent: bandParallax,
            ease: "none",
            scrollTrigger: {
              trigger: footerBandWrapper,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );

        // Blur-to-sharp entry: filter blur(8px) -> blur(0) during first 25% of scrub
        gsap.fromTo(
          footerBandImg,
          { filter: "blur(8px)" },
          {
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: footerBandWrapper,
              start: "top bottom",
              end: "top 75%",
              scrub: 1,
            },
          }
        );
      }

      // -------------------------------------------------------------
      // FOOTER WORDMARK ("Namaste.")
      // -------------------------------------------------------------
      const footerWordmark = document.querySelector(".footer-wordmark");
      const footerChars = document.querySelectorAll(".footer-wordmark-char");
      const footerContainer = document.querySelector(".footer-wordmark-container");

      if (footerWordmark && footerContainer) {
        // Scrubbed rise: yPercent 40 -> 0 and opacity 0.4 -> 1 from top bottom to bottom bottom
        gsap.fromTo(
          footerWordmark,
          { yPercent: 40, opacity: 0.4 },
          {
            yPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: footerContainer,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      }

      if (footerChars.length && footerContainer) {
        // Letters split into characters: stagger each char with yPercent 100 -> 0 on enter (0.9s, power4.out, stagger 0.04)
        gsap.fromTo(
          footerChars,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.04,
            ease: "power4.out",
            scrollTrigger: {
              trigger: footerContainer,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, pageContainerRef);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    // Refresh ScrollTrigger after fonts load
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    // Refresh ScrollTrigger as images finish loading
    const onImgLoad = () => {
      ScrollTrigger.refresh();
    };

    const trackedImages = [
      heroImgRef.current,
      meImgRef.current,
      reliableImgRef.current,
      ctaImgRef.current,
    ].filter(Boolean) as HTMLImageElement[];

    trackedImages.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", onImgLoad);
      }
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      window.removeEventListener("resize", handleResize);
      trackedImages.forEach((img) => {
        img.removeEventListener("load", onImgLoad);
      });
      clearTimeout(refreshTimer);
      ctx.revert();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      registerLenis(null);
    };
  }, []);

  return (
    <main ref={pageContainerRef} className="bg-paper text-primary overflow-x-clip">
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — THE engineer. + sun.jpg
          ═══════════════════════════════════════════════════════════════ */}
      <section ref={heroSectionRef} className="border-b-2 border-primary relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 border-x border-primary/50">
          {/* Left 8 cols — label on top of letter e, huge heading at bottom */}
          <div className="md:col-span-8 flex min-h-[320px] sm:min-h-[380px] md:min-h-[440px] lg:min-h-[500px] flex-col justify-end border-b border-primary/50 p-6 sm:p-8 md:border-b-0 md:border-r md:p-10 lg:p-12">
            <div className="relative">
              <p className="text-sm sm:text-sm md:text-base font-mono font-bold uppercase tracking-[0.32em] opacity-80 mb-2 sm:mb-3">
                THE
              </p>
              <div className="overflow-hidden">
                <h1
                  ref={heroHeadingRef}
                  className="text-[clamp(4.6rem,12.8vw,11.2rem)] xl:text-[12.2rem] 2xl:text-[13.6rem] font-bold leading-[0.82] tracking-[-0.065em] whitespace-nowrap will-change-transform"
                >
                  engineer.
                </h1>
              </div>
            </div>
          </div>
          {/* Right 4 cols — sit.png cutout sitting on the line in place of sun.jpg */}
          <div
            ref={heroWrapperRef}
            className="md:col-span-4 relative min-h-[340px] md:min-h-[460px] lg:min-h-[500px] flex items-end justify-center bg-primary/[0.015]"
          >
            <div className="absolute bottom-0.5 right-[-8px] sm:right-[-12px] md:right-[-18px] lg:right-[-24px] xl:right-[-32px] translate-y-[31.5%] pointer-events-none select-none z-30">
              <img
                ref={heroImgRef}
                src={IMG_HERO}
                alt="Atharv Pathak sitting on the line"
                className="h-[520px] sm:h-[600px] md:h-[730px] lg:h-[840px] xl:h-[920px] w-auto max-w-none object-contain sit-shadow will-change-transform"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — "This is me" (Two-column layout, left side-block)
          ═══════════════════════════════════════════════════════════════ */}
      <section ref={bioSectionRef} className="border-b border-primary/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 border-x border-primary/50 items-start">
          {/* LEFT 5 / 12 — side-block sitting in left column */}
          <div className="lg:col-span-5 border-b lg:border-b-0 self-start">
            <div
              ref={sideBlockRef}
              className="side-block p-6 md:p-8 lg:p-10 will-change-transform"
            >
              {/* 1. Small eyebrow label */}
              <div className="overflow-hidden mb-3">
                <p
                  ref={eyebrowRef}
                  className="text-[0.58rem] font-bold font-mono tracking-[0.24em] uppercase opacity-65 will-change-transform"
                >
                  HI, I'M ATHARV!
                </p>
              </div>

              {/* 2. Large heading */}
              <div className="overflow-hidden mb-5 md:mb-6">
                <h2
                  ref={headingRef}
                  className="text-[1.85rem] md:text-[2.75rem] font-bold tracking-tight leading-[1.05] will-change-transform"
                >
                  This is me.
                </h2>
              </div>

              {/* 3. Bordered photo (landscape aspect ratio, max-height: 55vh) */}
              <figure className="relative">
                <div
                  ref={meWrapperRef}
                  style={{ maxHeight: "55vh" }}
                  className="w-full aspect-[4/3] max-h-[55vh] overflow-hidden border border-primary/50 relative bg-primary/5"
                >
                  <img
                    ref={meImgRef}
                    src={IMG_ME}
                    alt="Atharv Pathak Portrait"
                    className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover will-change-transform filter grayscale"
                  />
                </div>
              </figure>
            </div>
          </div>

          {/* RIGHT 7 / 12 */}
          <div ref={rightColumnRef} className="lg:col-span-7 flex flex-col lg:border-l border-primary/50">
            {/* ── Subtitle heading ── */}
            <div className="flex min-h-[130px] items-center border-b border-primary/50 px-5 py-6 md:min-h-[150px] md:px-7 lg:px-8">
              <h3 className="max-w-[380px] text-[1.1rem] font-semibold leading-[1.55] tracking-tight text-primary sm:text-[1.25rem] md:text-[1.45rem] lg:text-[1.6rem]">
                Building useful software with modern web technologies and automation.
              </h3>
            </div>

            {/* ── Bio Narrative from ME.md ── */}
            <div className="p-6 md:px-8 md:py-8 lg:p-10 border-b border-primary/50">
              <div className="space-y-4 text-[0.82rem] md:text-[0.88rem] leading-[1.85] max-w-[36rem] opacity-90">
                <p>
                  I’m a final-year Information Technology engineering student based in India with a
                  Python-first development approach. My focus is on creating practical, reliable
                  software—from resilient web platforms and headless browser automation to scalable
                  REST APIs, database systems, and AI/LLM-powered tooling.
                </p>
                <p>
                  My engineering toolkit pairs Python on the server with modern frontend ecosystems like
                  React and Next.js. I’ve built end-to-end applications including browser automation
                  pipelines using Playwright, asynchronous background worker systems with RabbitMQ,
                  relational data architectures backed by PostgreSQL, and classification models
                  evaluated on scikit-learn.
                </p>
                <p>
                  Beyond individual projects, I enjoy contributing to student developer communities. I led
                  an engineering team for the <strong>Google Solution Challenge</strong> developing the
                  Ayurvedic Information System, coordinated hands-on workshops in AI/Machine Learning and
                  Android Development, and mentored peers in Java and Object-Oriented principles at FabLab.
                </p>
                <p className="italic text-[0.78rem] opacity-75 border-l-2 border-primary/60 pl-3">
                  "I enjoy learning by building, improving project documentation, and exploring how
                  APIs, structured data, and modern AI can make applications genuinely useful."
                </p>
              </div>


            </div>

            {/* ── Key Focus Pillars ── */}
            <div className="p-6 md:px-8 md:py-8 lg:p-10 border-b border-primary/50 bg-primary/[0.02]">
              <p className="text-[0.55rem] font-bold font-mono tracking-[0.24em] uppercase opacity-55 mb-2">
                CORE DISCIPLINES
              </p>
              <h3 className="text-lg md:text-xl font-bold tracking-tight mb-5">
                What I Focus On
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border border-primary/30 p-4 bg-paper hover:border-primary transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Server className="h-4 w-4 opacity-75" />
                    <span className="text-[0.7rem] font-mono font-bold uppercase">Backend & APIs</span>
                  </div>
                  <p className="text-[0.72rem] leading-relaxed opacity-80">
                    Clean REST APIs, Python microservices, relational modeling, and auth protocols.
                  </p>
                </div>
                <div className="border border-primary/30 p-4 bg-paper hover:border-primary transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Workflow className="h-4 w-4 opacity-75" />
                    <span className="text-[0.7rem] font-mono font-bold uppercase">Automation & Jobs</span>
                  </div>
                  <p className="text-[0.72rem] leading-relaxed opacity-80">
                    Playwright browser scraping, RabbitMQ message queues, and headless workflows.
                  </p>
                </div>
                <div className="border border-primary/30 p-4 bg-paper hover:border-primary transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="h-4 w-4 opacity-75" />
                    <span className="text-[0.7rem] font-mono font-bold uppercase">AI / ML Systems</span>
                  </div>
                  <p className="text-[0.72rem] leading-relaxed opacity-80">
                    Classification models, scikit-learn evaluations, and local LLM tool experimentation.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Toolkit Interactive Matrix ── */}
            <div className="p-6 md:px-8 md:pt-8 md:pb-10 lg:p-10">
              <div className="flex flex-col gap-3.5 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <p className="text-[0.55rem] font-bold font-mono tracking-[0.24em] uppercase opacity-55 mb-1.5">
                      TECHNICAL STACK
                    </p>
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                      Technical Skills & Arsenal
                    </h2>
                  </div>
                  <span className="text-[0.58rem] font-mono uppercase tracking-wider opacity-45 hidden md:inline">
                    Filter by category
                  </span>
                </div>


              </div>

              {/* Category Lists */}
              <div className="space-y-6">
                {displayedCategories.map(({ n, title, Icon, description, items }) => (
                  <div key={title} className="border border-primary/30 p-4 md:p-5 bg-primary/[0.015]">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-primary/20">
                      <div className="flex items-center gap-2 text-[0.74rem] font-mono font-bold">
                        <Icon className="h-3.5 w-3.5 opacity-70" strokeWidth={1.75} />
                        <span>{n}</span>
                        <span className="opacity-40">—</span>
                        <span>{title}</span>
                      </div>
                      <span className="text-[0.58rem] font-mono opacity-50 hidden sm:inline">
                        {description}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {items.map((item) => (
                        <div
                          key={item.name}
                          className={`border px-2.5 py-1 text-[0.62rem] font-mono tracking-wide transition-all duration-150 inline-flex items-center gap-1.5 cursor-default ${item.highlight
                            ? "border-primary bg-primary/10 font-medium text-primary hover:bg-primary hover:text-paper"
                            : "border-primary/35 opacity-85 hover:border-primary hover:bg-primary hover:text-paper"
                            }`}
                        >
                          {item.highlight && <span className="h-1 w-1 rounded-full bg-primary" />}
                          <span>{item.name}</span>
                          {item.note && (
                            <span className="opacity-50 text-[0.52rem] tracking-tight">
                              ({item.note})
                            </span>
                          )}
                        </div>
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
          SECTION 3 — Professional Experience (Pureframe Labs)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="border-b border-primary/50">
        <div className="grid grid-cols-1 md:grid-cols-12 border-x border-primary/50">
          {/* LEFT 7 / 12 — Detailed Experience */}
          <div className="md:col-span-7 border-b md:border-b-0 md:border-r border-primary/50 divide-y divide-primary/50">
            <div className="p-6 md:p-8 lg:p-10">
              <span className="text-[0.58rem] font-bold font-mono tracking-[0.24em] uppercase opacity-65 mb-2 block">
                02 / PROFESSIONAL WORK
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Work Experience
              </h2>
              <p className="text-xs md:text-sm font-mono opacity-65 mt-2">
                Hands-on software development internship focused on real-world automation and data pipelines.
              </p>
            </div>

            {experienceList.map((job) => (
              <div key={job.company} className="p-6 md:p-8 lg:p-10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 border-b border-primary/25">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                      {job.role}
                    </h3>
                    <p className="text-sm font-mono opacity-80 mt-0.5">
                      <span className="underline decoration-primary/40 underline-offset-4 font-semibold">
                        {job.company}
                      </span>
                      <span className="opacity-60"> · {job.type}</span>
                    </p>
                  </div>
                  <span className="text-[0.62rem] font-mono tracking-wider opacity-65 uppercase bg-primary/10 border border-primary/30 px-2 py-0.5 self-start sm:self-auto">
                    {job.when}
                  </span>
                </div>

                <p className="text-[0.82rem] leading-relaxed opacity-85">
                  {job.description}
                </p>

                <div>
                  <h4 className="text-[0.65rem] font-mono font-bold uppercase tracking-wider opacity-70 mb-2">
                    Key Engineering Contributions:
                  </h4>
                  <ul className="space-y-2 text-[0.78rem] opacity-85">
                    {job.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 opacity-60 shrink-0 mt-0.5 text-emerald-700" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {job.tech.map((t) => (
                      <span
                        key={t}
                        className="border border-primary/40 px-2 py-0.5 text-[0.58rem] font-mono tracking-wide bg-primary/5 uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT 5 / 12 — heading + architectural photo */}
          <div className="md:col-span-5 p-6 md:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <p className="text-[0.58rem] font-bold font-mono tracking-[0.24em] uppercase opacity-65 mb-2 mt-0.5 md:mt-2">
                PRACTICE & DISCIPLINE
              </p>
              <h2 className="text-[2rem] md:text-[2.6rem] font-bold tracking-[-0.04em] leading-[0.95] mb-4">
                Reliable systems.
              </h2>
              <p className="text-[0.8rem] font-mono opacity-75 leading-relaxed">
                "I focus on the engineering behind the scenes—ensuring tasks complete reliably,
                data is structured cleanly, and edge cases don't bring down the workflow."
              </p>
            </div>

            <div className="mt-6 md:mt-10">
              <div
                ref={reliableWrapperRef}
                className="w-full aspect-[4/3] overflow-hidden border border-primary/50 relative bg-primary/5"
              >
                <img
                  ref={reliableImgRef}
                  src={IMG_RELIABLE}
                  alt="City Architecture"
                  className="w-full h-full object-cover"
                />
              </div>
              <p
                ref={reliableCaptionRef}
                className="text-[0.52rem] font-mono tracking-widest uppercase opacity-45 mt-2"
              >
                ENGINEERING FINAL YEAR PROJECT LEAD
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 — Leadership & Community Contributions
          ═══════════════════════════════════════════════════════════════ */}
      <section className="border-b border-primary/50">
        <div className="border-x border-primary/50">
          <div className="p-6 md:p-8 lg:p-10 border-b border-primary/50">
            <span className="text-[0.58rem] font-bold font-mono tracking-[0.24em] uppercase opacity-65 mb-2 block">
              03 / COLLABORATION & INITIATIVE
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Leadership & Community
            </h2>
            <p className="text-xs md:text-sm font-mono opacity-65 mt-2 max-w-xl">
              Collaborative engineering, team project leadership, peer mentorship, and developer ecosystems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-primary/50">
            {leadershipList.map((item, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 hover:bg-primary hover:text-paper transition-colors duration-200 group cursor-default flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-[0.62rem] font-mono tracking-widest uppercase opacity-60 group-hover:opacity-85">
                    <span>{item.initiative}</span>
                    <span>0{idx + 1}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold tracking-tight mb-1">
                    {item.role}
                  </h3>
                  <h4 className="text-xs font-mono font-medium underline underline-offset-4 decoration-current/40 mb-3">
                    {item.project}
                  </h4>
                  <p className="text-[0.8rem] leading-relaxed opacity-85 group-hover:opacity-95">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 — Education & Academic Milestones
          ═══════════════════════════════════════════════════════════════ */}
      <section className="border-b border-primary/50">
        <div className="grid grid-cols-1 md:grid-cols-12 border-x border-primary/50">
          <div className="md:col-span-4 p-6 md:p-8 lg:p-10 border-b md:border-b-0 md:border-r border-primary/50">
            <span className="text-[0.58rem] font-bold font-mono tracking-[0.24em] uppercase opacity-65 mb-2 block">
              04 / ACADEMICS
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Education
            </h2>
            <p className="text-xs font-mono opacity-70 leading-relaxed mb-6">
              Strengthening software engineering fundamentals, systems architecture, and mathematical foundations.
            </p>

            <div className="border border-primary/30 p-4 bg-primary/5">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="h-4 w-4 opacity-75" />
                <span className="text-[0.7rem] font-mono font-bold uppercase">Degree Target</span>
              </div>
              <p className="text-sm font-bold">B.E. Information Technology</p>
              <p className="text-[0.68rem] font-mono opacity-70 mt-1">Expected Graduation: May 2027</p>
            </div>
          </div>

          <div className="md:col-span-8 divide-y divide-primary/50">
            {educationList.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 hover:bg-primary/[0.02] transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <h3 className="text-base md:text-lg font-bold tracking-tight">
                    {edu.degree}
                  </h3>
                  <span className="text-[0.62rem] font-mono tracking-wider opacity-65 uppercase bg-primary/10 px-2 py-0.5 border border-primary/30 self-start sm:self-auto">
                    {edu.badge}
                  </span>
                </div>
                <p className="text-xs font-mono opacity-75 mb-2">{edu.institution}</p>
                <p className="text-[0.78rem] leading-relaxed opacity-85">{edu.focus}</p>
                <p className="text-[0.62rem] font-mono opacity-60 mt-3">{edu.period}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7 — What I'm Learning & Research Radar
          ═══════════════════════════════════════════════════════════════ */}
      <section className="border-b border-primary/50">
        <div className="p-6 md:p-8 lg:p-10 border-x border-primary/50">
          <span className="text-[0.58rem] font-bold font-mono tracking-[0.24em] uppercase opacity-65 mb-2 block">
            07 / CONTINUOUS LEARNING
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            What I'm Learning & Exploring
          </h2>
          <p className="text-xs md:text-sm font-mono opacity-65 max-w-2xl mb-8">
            Active technical pursuits and areas where I'm deepening my understanding and building experiments.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningRadar.map((radar, idx) => (
              <div
                key={idx}
                className="p-5 border border-primary/35 bg-primary/[0.015] hover:border-primary hover:bg-primary hover:text-paper transition-all duration-200 group flex flex-col justify-between min-h-[140px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[0.58rem] font-mono opacity-50 group-hover:opacity-80">
                      0{idx + 1}
                    </span>
                    <Sparkles className="h-3.5 w-3.5 opacity-40 group-hover:opacity-90" />
                  </div>
                  <h3 className="text-sm md:text-base font-bold tracking-tight mb-2">
                    {radar.topic}
                  </h3>
                  <p className="text-[0.74rem] leading-relaxed opacity-80 group-hover:opacity-90">
                    {radar.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 8 — Chat CTA with Pinned Image Animation
          ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={ctaSectionRef}
        className="border-b border-primary/50 bg-paper text-primary overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 border-x border-primary/50 min-h-[380px] md:min-h-[460px]">
          <div className="md:col-span-7 p-6 md:p-10 lg:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-primary/50">
            <div>
              <span className="mb-2 block text-[0.58rem] font-bold font-mono uppercase tracking-[0.24em] opacity-65">
                SAY HI
              </span>
              <h2
                ref={ctaHeadingRef}
                className="text-[3.8rem] md:text-[5.5rem] lg:text-[7rem] font-extrabold leading-[0.85] tracking-[-0.06em] will-change-transform origin-left"
              >
                chat?
              </h2>
            </div>
            <div className="pt-8">
              <div className="w-full border-b border-primary/50 mb-6" />
              <p className="text-sm md:text-base font-medium opacity-90 mb-6">
                Got a question in mind? I'd love to hear about it.
              </p>
              <div>
                <Link
                  to="/contact"
                  className="inline-block border border-primary px-5 py-2.5 text-[0.65rem] font-mono uppercase tracking-widest transition-colors hover:bg-primary hover:text-paper"
                  onClick={() => toast.success("Redirecting to Contact page!", { icon: "🚀" })}
                >
                  <RollText>Contact me</RollText>
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 relative min-h-[300px] md:min-h-full overflow-hidden bg-primary/5 border border-primary/50">
            <img
              ref={ctaImgRef}
              src={IMG_CTA}
              alt="Say hi"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
export default About;

