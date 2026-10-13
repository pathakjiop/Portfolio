import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { useLocation } from "@tanstack/react-router";
import { hasIntroPlayed } from "@/components/intro/IntroLoader";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);
  const [introReady, setIntroReady] = useState(() => hasIntroPlayed());

  // Poll for intro completion (hasIntroPlayed flips to true when the loader finishes)
  useEffect(() => {
    if (introReady) return;
    const id = window.setInterval(() => {
      if (hasIntroPlayed()) {
        setIntroReady(true);
        window.clearInterval(id);
      }
    }, 100);
    return () => window.clearInterval(id);
  }, [introReady]);

  useEffect(() => {
    // Don't start Lenis until the intro is done
    if (!introReady) return;

    // When on /about, the About page manages its own Lenis instance wired to GSAP ticker per spec
    if (location.pathname === "/about") {
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
    };
  }, [location.pathname, introReady]);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return <>{children}</>;
}
