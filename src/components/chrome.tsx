import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cities, socials } from "@/data/content";
import { media } from "@/data/media";

type Theme = "light" | "dark";

import gsap from "gsap";

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("atharv-theme");
      if (stored === "dark" || stored === "light") return stored;
      if (document.documentElement.classList.contains("dark")) return "dark";
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    }
    return "light";
  });

  useEffect(() => {
    const stored = window.localStorage.getItem("atharv-theme");
    const isDark = stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const active = isDark ? "dark" : "light";
    setTheme(active);
    document.documentElement.classList.toggle("dark", active === "dark");
  }, []);

  const toggle = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    const nextBg = nextTheme === "dark" ? "#143642" : "#dad2d8";

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.zIndex = "9999";
    overlay.style.backgroundColor = nextBg;
    overlay.style.clipPath = "polygon(0 0, 0 0, -20% 100%, -20% 100%)";
    document.body.appendChild(overlay);

    gsap.to(overlay, {
      clipPath: "polygon(0 0, 120% 0, 100% 100%, -20% 100%)",
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        setTheme(nextTheme);
        document.documentElement.classList.toggle("dark", nextTheme === "dark");
        window.localStorage.setItem("atharv-theme", nextTheme);

        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => overlay.remove()
        });
      }
    });
  };

  return { theme, toggle };
}

function useNow(active: boolean) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    if (!active) return;
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, [active]);
  return now;
}

function formatClock(date: Date, tz: string) {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(date);
  return { time };
}

function ClockMarquee() {
  const now = useNow(true);
  const loop = [...cities, ...cities];
  return (
    <div className="group relative h-full overflow-hidden">
      <div className="marquee-track flex h-full w-max items-center">
        {loop.map((city, index) => {
          const clock = now ? formatClock(now, city.tz) : { time: "--:--:--" };
          return (
            <span key={`${city.city}-${index}`} className="flex shrink-0 items-center">
              <span
                className={
                  city.home
                    ? "kicker bg-primary px-3 py-1 font-bold text-paper uppercase"
                    : "kicker px-3 opacity-70 uppercase"
                }
              >
                <span className="tabular-nums">
                  {city.city} <span className="mx-2">{clock.time}</span> <span className="opacity-70">{city.label}</span>
                </span>
              </span>
              <span className="opacity-40 mx-4">/</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span>{children}</span>
    </span>
  );
}

const nav = [
  { to: "/about", label: "About" },
  { to: "/works", label: "Works" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFrame({ children }: { children: ReactNode }) {
  const { theme, toggle } = useTheme();
  const [menu, setMenu] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMenu(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <p className="sr-only">
        Atharv Pathak is a Python developer, full-stack web developer, and IT engineering student based in India.
      </p>
      <div className="pointer-events-none fixed inset-0 -z-10 grid grid-cols-4 md:grid-cols-12" aria-hidden>
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className={`h-full border-l border-primary/25 ${i === 0 ? "border-transparent" : ""} ${i > 3 ? "hidden md:block" : ""}`}
          />
        ))}
      </div>

      <header className="site-header fixed inset-x-0 top-0 z-50 grid h-14 grid-cols-4 border-b border-primary/40 bg-paper md:h-16 md:grid-cols-12">
        <Link
          to="/"
          aria-label="Atharv Pathak home"
          className="col-span-2 flex items-center border-r border-primary/40 px-4 md:col-span-3"
        >
          <span className="wordmark font-bold text-2xl tracking-tighter">Namaste.</span>
        </Link>
        <div className="hidden border-r border-primary/40 md:col-span-6 md:block">
          <ClockMarquee />
        </div>
        <div className="col-span-2 flex md:col-span-3">
          <button
            type="button"
            onClick={toggle}
            className="group flex flex-1 items-center justify-end gap-2.5 px-4"
            aria-label={theme === "light" ? "Switch to dark" : "Switch to light"}
          >
            <span className="kicker">
              <Roll>{theme === "light" ? "Light" : "Dark"}</Roll>
            </span>
            <span className="block h-3 w-3 border border-current" />
          </button>
          <button
            type="button"
            onClick={() => setMenu((open) => !open)}
            className="flex w-14 items-center justify-center border-l border-primary/40 md:w-16"
            aria-expanded={menu}
            aria-label={menu ? "Close menu" : "Open menu"}
          >
            <span className="flex w-5 flex-col gap-1.5">
              <span className={`h-px w-full bg-current transition ${menu ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`h-px w-full bg-current transition ${menu ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-transparent transition-opacity duration-[600ms] ${menu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMenu(false)}
        aria-hidden
      />
      <div
        className={`fixed inset-y-0 right-0 z-50 w-[85vw] sm:w-1/2 md:w-4/12 bg-primary text-paper border-l border-paper/20 flex flex-col shadow-2xl transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${menu ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close button inside sidebar */}
        <button
          className="absolute top-0 right-0 h-14 md:h-16 w-14 md:w-16 border-b border-l border-paper/20 flex items-center justify-center hover:bg-paper/10 transition-colors"
          onClick={() => setMenu(false)}
          aria-label="Close menu"
        >
          <span className="flex w-5 flex-col gap-1.5 relative">
            <span className="h-[1.5px] w-full bg-current absolute top-1/2 -translate-y-1/2 rotate-45" />
            <span className="h-[1.5px] w-full bg-current absolute top-1/2 -translate-y-1/2 -rotate-45" />
          </span>
        </button>

        <nav className="flex flex-col mt-14 md:mt-16">
          <div className="border-t border-paper/20" />
          {nav.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              className="group relative border-b border-paper/20 px-6 py-6 md:px-8 md:py-8 hover:bg-paper/10 transition-colors"
              onClick={() => setMenu(false)}
            >
              <div className="flex items-center gap-4">
                <span className="kicker w-4 md:w-6 opacity-80">0{index + 1}</span>
                <span className="block lowercase tracking-tight font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl overflow-hidden text-ellipsis">
                  <Roll>{item.label.toLowerCase()}</Roll>
                </span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-6 py-8 md:px-8 md:py-10 flex flex-col gap-4">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {socials.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="group kicker uppercase opacity-90 hover:opacity-100 transition-opacity">
                <Roll>{item.label}</Roll>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-14 md:pt-16">{children}</div>
      <Footer />
    </>
  );
}

export function ShibuyaBlock() {
  const src = media.shibuya || "/media/sea.mp4";
  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".mov");
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => { });
        } else {
          videoRef.current?.pause();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isVideo]);

  return (
    <div
      ref={containerRef}
      className="footer-band-wrapper relative h-64 sm:h-72 md:h-[38vh] lg:h-[44vh] w-full overflow-hidden border-b border-paper/30 bg-primary"
    >
      {isVideo ? (
        <video
          ref={videoRef}
          src={src}
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
          className="footer-band-img h-full w-full object-cover object-center"
        />
      ) : (
        <img
          src={src}
          alt="Footer band media"
          loading="lazy"
          className="footer-band-img h-full w-full object-cover object-center"
        />
      )}
    </div>
  );
}


export function Footer() {
  return (
    <footer className="footer-root bg-primary text-paper relative z-20 w-full">
      <ShibuyaBlock />
      <nav className="grid grid-cols-1 md:grid-cols-3 border-b border-paper/30 w-full">
        {nav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group flex items-center justify-center border-b border-paper/30 py-10 md:border-b-0 md:border-r md:py-14 md:last:border-r-0 transition-colors hover:bg-paper hover:text-primary w-full"
          >
            <span className="text-base md:text-lg tracking-[0.2em] uppercase font-medium">
              <Roll>{item.label}</Roll>
            </span>
          </Link>
        ))}
      </nav>
      <div className="grid md:grid-cols-2 px-4 md:px-8">
        <div className="border-b border-paper/30 py-6 md:border-r md:border-b-0 md:py-8 pr-6 md:pr-8">
          <p className="kicker opacity-70">Elsewhere</p>
          <ul className="mt-8 space-y-3">
            {socials.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noreferrer" className="group kicker inline-flex gap-3">
                  <Roll>{item.label}</Roll>
                  <span aria-hidden>→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex min-h-48 flex-col justify-between py-6 md:py-8 pl-0 md:pl-8">
          <p className="kicker opacity-70">Colophon</p>
          <p className="kicker mt-10 opacity-80">© 2026 Atharv Pathak. All rights reserved.</p>
        </div>
      </div>
      <div className="footer-wordmark-container overflow-hidden border-t border-paper/30 pt-4 px-4 md:px-8">
        <div className="wordmark-xl footer-wordmark inline-block w-full overflow-hidden" role="img" aria-label="Namaste.">
          {"Namaste.".split("").map((char, idx) => (
            <span
              key={idx}
              className="footer-wordmark-char inline-block will-change-transform"
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

import toast from "react-hot-toast";

export function ChatCta({ image = "/media/nightwalk.jpeg" }: { image?: string }) {
  return (
    <section className="border-t border-primary/50 bg-paper text-primary">
      <div className="grid grid-cols-1 md:grid-cols-12 border-x border-primary/50">
        <div className="md:col-span-7 p-6 md:p-10 lg:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-primary/50">
          <div>
            <span className="mb-2 block text-[0.58rem] font-bold font-mono uppercase tracking-[0.24em] opacity-65">
              SAY HI
            </span>
            <h2 className="text-[3.8rem] md:text-[5.5rem] lg:text-[7rem] font-extrabold leading-[0.85] tracking-[-0.06em]">
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
              >
                <Roll>Contact me</Roll>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:col-span-5 relative min-h-[300px] md:min-h-full overflow-hidden bg-primary/5">
          <img
            src={image}
            alt="Say hi"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}