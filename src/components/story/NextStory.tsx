"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { stories, type Story } from "@/data/stories";
import { homeTheme } from "@/data/site";
import { usePageTransition } from "@/components/motion/PageTransition";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { useReducedMotionSafe } from "@/components/motion/hooks";
import { themeVars } from "@/lib/theme";
import { getHome } from "@/data/homes";

const cssVarsOnly = (vars: Record<string, string>) => Object.fromEntries(Object.entries(vars).filter(([k]) => k.startsWith("--")));

/**
 * The chapter ending: the next story's atmosphere rises into view as an
 * oversized title; clicking wipes its colour across the screen.
 */
export function NextStory({ next }: { next: Story | null }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const go = usePageTransition();
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.25, 1]);
  const imgClip = useTransform(scrollYProgress, [0, 1], reduced ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] : ["inset(18% 30% 18% 30%)", "inset(0% 0% 0% 0%)"]);

  const theme = next?.theme ?? homeTheme;
  const href = next ? `/stories/${next.slug}` : "/#collection";
  const title = next ? next.title : "The Collection";
  const eyebrow = next ? `Next story — ${next.number} / 05` : "End of the exhibition — return to";

  const onClick = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    go({ href, theme, eyebrow, title, palette: next?.palette.map((p) => p.hex) ?? stories.map((s) => s.palette[0].hex) });
  };

  return (
    <section aria-label="Continue">
      <Link
        ref={ref}
        href={href}
        onClick={onClick}
        className="group relative block overflow-hidden"
        style={{ ...(cssVarsOnly(themeVars(theme)) as React.CSSProperties), background: theme.bg, color: theme.ink }}
      >
        <div className="gutter relative z-10 flex min-h-[90svh] flex-col justify-between py-[10vh]">
          <div className="flex items-center justify-between gap-6">
            <p className="eyebrow">{eyebrow}</p>
            <span className="flex gap-1.5" aria-hidden>
              {(next ? next.palette.map((p) => p.hex) : stories.map((s) => s.palette[0].hex)).map((hex) => (
                <span key={hex} className="h-10 w-3 sm:h-14 sm:w-4" style={{ background: hex }} />
              ))}
            </span>
          </div>

          <div className="relative mx-auto my-10 aspect-[16/10] w-full max-w-[880px] overflow-hidden sm:aspect-[21/9]">
            <motion.div className="absolute inset-0" style={{ clipPath: imgClip }}>
              <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
                {next ? (
                  <Image src={getHome(next.slug).heroImage.src} alt="" fill sizes="(min-width: 900px) 880px, 100vw" className="object-cover" />
                ) : (
                  <div className="flex h-full">
                    {stories.map((s) => (
                      <div key={s.slug} className="relative flex-1">
                        <Image src={s.images.swatch.src} alt="" fill sizes="180px" className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <AnimatedHeadline as="p" text={title} className="display text-title" />
              {next ? <p className="display mt-3 text-xl italic opacity-75 sm:text-2xl">{getHome(next.slug).name} · {next.subtitle}</p> : null}
            </div>
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-current/30 transition-all duration-500 group-hover:scale-110 group-hover:bg-[var(--ink)] group-hover:text-[var(--bg)] sm:h-20 sm:w-20">
              <ArrowRight size={22} aria-hidden className="transition-transform duration-500 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
