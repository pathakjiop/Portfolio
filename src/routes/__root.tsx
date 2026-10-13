import { createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteFrame } from "@/components/chrome";
import appCss from "../styles.css?url";

import { SmoothScroll } from "@/components/SmoothScroll";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";



export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Atharv Pathak" },
      {
        name: "description",
        content: "Atharv Pathak — Python Developer & Full-Stack Web Developer.",
      },
      { name: "theme-color", content: "#dad2d8" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Yatra+One&family=Rozha+One&display=swap",
      },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("atharv-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark");}else{document.documentElement.classList.remove("dark");}}catch(e){}})();`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <SmoothScroll>
            <SiteFrame>
              <Outlet />
            </SiteFrame>
          </SmoothScroll>
        </AuthProvider>
        <Toaster position="bottom-right" />
        <Scripts />
      </body>
    </html>
  ),
});
