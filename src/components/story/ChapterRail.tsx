"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Chapter progress. Desktop: a quiet vertical index on the left edge.
 * Everywhere: a hairline page-progress bar under the header.
 */
export function ChapterRail({ chapters }: { chapters: readonly string[] }) {
  const [active, setActive] = useState(0);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const sections = chapters
      .map((_, i) => document.getElementById(`chapter-${i + 1}`))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number(e.target.id.split("-")[1]) - 1);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [chapters]);

  const jump = (i: number) => {
    const el = document.getElementById(`chapter-${i + 1}`);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -72 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
        style={{ scaleX: progress }}
      />
      <nav
        aria-label="Chapters"
        className="fixed left-[calc(var(--gutter)/2-6px)] top-1/2 z-40 hidden -translate-y-1/2 2xl:block"
      >
        <ol className="flex flex-col gap-3">
          {chapters.map((title, i) => (
            <li key={title}>
              <button
                type="button"
                onClick={() => jump(i)}
                aria-current={i === active ? "step" : undefined}
                className="group flex items-center gap-3 py-1 text-left"
              >
                <span
                  className={cn(
                    "block h-px transition-all duration-500",
                    i === active ? "w-8 bg-accent-ink" : "w-3 bg-muted/60 group-hover:w-6",
                  )}
                />
                <span
                  className={cn(
                    "eyebrow tabular-nums transition-opacity duration-500",
                    i === active ? "opacity-100" : "opacity-0 group-hover:opacity-70 group-focus-visible:opacity-70",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="eyebrow whitespace-nowrap rounded-sm bg-bg px-2 py-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {title}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
