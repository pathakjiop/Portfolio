import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { useLocation, useLayoutEffect } from "@tanstack/react-router";
import { hasIntroPlayed } from "@/components/intro/IntroLoader";
import { registerLenis, resetScroll } from "@/lib/scroll";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);
  const [introReady, setIntroReady] = useState(() => hasIntroPlayed());

  // Intro completion listener
  useEffect(() => {
    if (introReady) return;
    const onIntroDone = () => setIntroReady(true);
    window.addEventListener("introDone", onIntroDone, { once: true });
    if (hasIntroPlayed()) setIntroReady(true);
    return () => window.removeEventListener("introDone", onIntroDone);
  }, [introReady]);

  useEffect(() => {
    // Don't start Lenis until the intro is done
    if (!introReady) return;

    // When on /about, the About page manages its own Lenis instance wired to GSAP ticker per spec
    if (location.pathname === "/about") {
      registerLenis(null);
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });
    
    lenisRef.current = lenis;
    registerLenis(lenis);

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      registerLenis(null);
    };
  }, [location.pathname, introReady]);

  useLayoutEffect(() => {
    resetScroll();
  }, [location.pathname]);

  return <>{children}</>;
}
