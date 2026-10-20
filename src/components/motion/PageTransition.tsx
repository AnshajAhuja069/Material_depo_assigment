"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { ThemeTokens } from "@/data/stories";
import { applyTheme } from "@/lib/theme";
import { ease } from "@/lib/motion";

interface Destination {
  href: string;
  theme: ThemeTokens;
  eyebrow: string;
  title: string;
  /** Strip of colour shown on the wipe — the destination's palette. */
  palette?: string[];
}

type Phase = "idle" | "cover" | "reveal";

const COVER_MS = 850;

const Ctx = createContext<(d: Destination) => void>(() => {});

/** Navigate with a themed wipe: cover in the destination's colour, swap route, reveal. */
export const usePageTransition = () => useContext(Ctx);

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [dest, setDest] = useState<Destination | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const startPath = useRef(pathname);

  const go = useCallback(
    (d: Destination) => {
      if (reduced) {
        router.push(d.href);
        return;
      }
      startPath.current = window.location.pathname;
      router.prefetch(d.href);
      setDest(d);
      setPhase("cover");
      applyTheme(document.documentElement, d.theme);
    },
    [reduced, router],
  );

  // Once the cover has landed, change route underneath it. A timer rather than
  // an animation callback, so navigation never depends on frames being painted.
  useEffect(() => {
    if (phase !== "cover" || !dest) return;
    const push = setTimeout(() => router.push(dest.href), COVER_MS);
    // Safety: never leave the cover up if a navigation stalls.
    const bail = setTimeout(() => {
      setPhase("reveal");
      applyTheme(document.documentElement, null);
    }, COVER_MS + 4000);
    return () => {
      clearTimeout(push);
      clearTimeout(bail);
    };
  }, [phase, dest, router]);

  // New route mounted → reveal it and hand theming back to the route's own tokens.
  useEffect(() => {
    if (phase === "cover" && pathname !== startPath.current) {
      const t = setTimeout(() => {
        setPhase("reveal");
        applyTheme(document.documentElement, null);
      }, 120);
      return () => clearTimeout(t);
    }
  }, [pathname, phase]);

  return (
    <Ctx.Provider value={go}>
      {children}
      <AnimatePresence onExitComplete={() => setPhase("idle")}>
        {dest && phase === "cover" ? (
          <motion.div
            key={dest.href}
            aria-hidden
            className="pointer-events-auto fixed inset-0 z-[80] flex items-end"
            style={{ background: dest.theme.bg, color: dest.theme.ink }}
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: COVER_MS / 1000, ease: ease.inOut }}
          >
            <div className="gutter w-full pb-[12vh]">
              {dest.palette ? (
                <div className="mb-8 flex gap-2">
                  {dest.palette.map((hex, i) => (
                    <motion.span
                      key={hex}
                      className="h-16 w-3 sm:h-24 sm:w-4"
                      style={{ background: hex, transformOrigin: "top" }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.7, ease: ease.out, delay: 0.35 + i * 0.05 }}
                    />
                  ))}
                </div>
              ) : null}
              <motion.p
                className="eyebrow mb-3 opacity-70"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                {dest.eyebrow}
              </motion.p>
              <motion.p
                className="display text-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: ease.expo, delay: 0.4 }}
              >
                {dest.title}
              </motion.p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
