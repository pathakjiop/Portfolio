import { createRouter, Link } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { resetScroll } from "@/lib/scroll";
import { routeTree } from "./routeTree.gen";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-primary">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">404.</h1>
      <p className="text-lg md:text-xl opacity-80 mb-8">This page could not be found.</p>
      <Link to="/" className="btn">Return home</Link>
    </div>
  );
}

export function getRouter() {
  const router = createRouter({ 
    routeTree, 
    defaultErrorComponent: AppErrorComponent,
    defaultNotFoundComponent: NotFound
  });

  router.subscribe("onBeforeLoad", (event) => {
    if (event.fromLocation && event.toLocation && event.fromLocation.pathname !== event.toLocation.pathname) {
      resetScroll();
    }
  });

  return router;
}
