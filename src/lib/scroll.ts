import type Lenis from "lenis";

let activeLenis: Lenis | null = null;

export function registerLenis(lenis: Lenis | null) {
  activeLenis = lenis;
  if (typeof window !== "undefined") {
    (window as any).__lenis = lenis;
  }
}

export function getActiveLenis(): Lenis | null {
  return activeLenis || (typeof window !== "undefined" ? (window as any).__lenis : null);
}

export function resetScroll(immediate = true) {
  if (typeof window === "undefined") return;

  // 1. Set manual scroll restoration so browser doesn't try to restore scroll to the bottom on route switch
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  // 2. Reset Lenis smooth scroll target if active
  const lenis = getActiveLenis();
  if (lenis) {
    lenis.scrollTo(0, { immediate });
  }

  // 3. Reset native viewport scroll immediately
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}
