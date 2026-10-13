import { useEffect, useRef } from "react";
import { useRouter } from "@tanstack/react-router";
import gsap from "gsap";

/**
 * Page transition (rebuilt from a frame study of the reference recording):
 *
 *   12 columns of page colour drop from the top of the viewport, staggered left → right, erasing the
 *   old page in a staircase (~0.45 s). The route is swapped while everything is covered, then the
 *   cover fades away to reveal the new page.
 *
 * It hooks every same-origin <a> click in the capture phase, so TanStack <Link>s, plain anchors and
 * the footer/nav all get the transition without being touched. Modified clicks (⌘/ctrl/shift/alt),
 * target=_blank, downloads, hash-only changes and `data-no-transition` links are left alone, as is
 * everything when the visitor prefers reduced motion.
 */

const COLS = 12;
const COVER_S = 0.22; // each column's drop
const STAGGER_S = 0.02; // delay between neighbouring columns (12 columns ≈ 0.45 s in total)
const FADE_S = 0.28;
const ROUTE_TIMEOUT_MS = 1600;

export function StairTransition() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cols = Array.from(root.children) as HTMLElement[];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const finish = () => {
      gsap.to(root, {
        opacity: 0,
        duration: FADE_S,
        ease: "power1.out",
        onComplete: () => {
          gsap.set(root, { visibility: "hidden" });
          busy.current = false;
        },
      });
    };

    const go = (href: string) => {
      busy.current = true;
      gsap.set(root, { visibility: "visible", opacity: 1 });
      gsap.set(cols, { scaleY: 0, transformOrigin: "top" });

      gsap.to(cols, {
        scaleY: 1,
        duration: COVER_S,
        ease: "power3.inOut",
        stagger: { each: STAGGER_S, from: "start" },
        onComplete: () => {
          let done = false;
          const reveal = () => {
            if (done) return;
            done = true;
            unsubscribe();
            window.clearTimeout(fallback);
            // let the new route paint under the cover before it fades
            requestAnimationFrame(() => requestAnimationFrame(finish));
          };
          const unsubscribe = router.subscribe("onResolved", reveal);
          const fallback = window.setTimeout(reveal, ROUTE_TIMEOUT_MS);
          router.history.push(href);
        },
      });
    };

    const onClick = (e: MouseEvent) => {
      if (busy.current || reduce.matches) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      if ((a.target && a.target !== "_self") || a.hasAttribute("download") || "noTransition" in a.dataset) return;

      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      e.preventDefault();
      e.stopPropagation();
      go(url.pathname + url.search + url.hash);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      gsap.killTweensOf([root, ...cols]);
    };
  }, [router]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70] grid grid-cols-12"
      style={{ visibility: "hidden" }}
    >
      {Array.from({ length: COLS }, (_, i) => (
        <div
          key={i}
          className={`h-full bg-paper ${i === 0 ? "" : "border-l border-primary/25"}`}
          style={{ transform: "scaleY(0)", transformOrigin: "top" }}
        />
      ))}
    </div>
  );
}
