"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { ArrowDown } from "lucide-react";
import { signatureColor, stories } from "@/data/stories";
import { site } from "@/data/site";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { MagneticLink } from "@/components/motion/MagneticLink";
import { instant, useReducedMotionSafe } from "@/components/motion/hooks";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { getHome } from "@/data/homes";
import { getMaterial } from "@/data/materials";
import { SampleImage } from "@/components/curation/SampleImage";

/**
 * Scene 01 — five slender colour strips open like samples pulled from a
 * board, resolve into their materials, and the title rises between them.
 * Nothing blocks the page: it is choreography, not a preloader.
 */
export function HomeHero() {
  const reduced = useReducedMotionSafe();
  const [hover, setHover] = useState<number | null>(null);
  const tr = (t: object) => (reduced ? instant : t);

  return (
    <section className="relative flex min-h-[100svh] flex-col pt-[var(--header-h)]" aria-labelledby="home-title">
      <div className="gutter flex flex-1 flex-col justify-center gap-10 py-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <motion.p
            className="eyebrow text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={tr({ duration: 0.8, delay: 0.9 })}
          >
            An exhibition of five whole-home material curations
          </motion.p>
          <h1 id="home-title" className="display text-hero mt-5 leading-[0.84]">
            <span className="sr-only">Material Stories</span>
            <span aria-hidden>
              <AnimatedHeadline as="span" text="Material" immediate className="block italic" delay={0.5} duration={1.3} />
              <AnimatedHeadline as="span" text="Stories" immediate className="block pl-[0.6em]" delay={0.62} duration={1.3} />
            </span>
          </h1>
        </div>
        <motion.div
          className="max-w-sm lg:pb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tr({ duration: 1, ease: ease.out, delay: 1.2 })}
        >
          <p className="display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight">{site.headline}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{site.supporting}</p>
          <MagneticLink href="#collection" className="mt-8" aria-label="Enter the Collection">
            <span className="inline-flex h-14 items-center gap-3 rounded-full bg-ink px-7 text-bg">
              <span className="eyebrow">Enter the Collection</span>
              <ArrowDown size={16} aria-hidden />
            </span>
          </MagneticLink>
        </motion.div>
      </div>

      <div className="gutter pb-6">
        <ul className="flex h-[34svh] min-h-[220px] gap-1.5 sm:gap-2" onMouseLeave={() => setHover(null)}>
          {stories.map((s, i) => (
            <li
              key={s.slug}
              className={cn("relative min-w-0 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]", hover === i ? "grow-[2.6]" : "grow")}
              style={{ flexBasis: 0 }}
              onMouseEnter={() => setHover(i)}
            >
              <Link href={`/stories/${s.slug}`} className="group absolute inset-0 block" aria-label={`${s.number} ${s.title} — ${s.subtitle}`}>
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  style={{ background: signatureColor(s) }}
                  initial={{ clipPath: "inset(0% 47% 0% 47%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  transition={tr({ duration: 1.1, ease: ease.inOut, delay: 0.15 + i * 0.08 })}
                >
                  {/* The home above, its material family below — never a single tile. */}
                  <motion.div
                    className="absolute inset-x-0 top-0 h-[54%] overflow-hidden"
                    initial={{ opacity: 0, scale: 1.15 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={tr({ duration: 1.4, ease: ease.out, delay: 1.1 + i * 0.08 })}
                  >
                    <Image
                      src={getHome(s.slug).heroImage.src}
                      alt=""
                      fill
                      priority
                      sizes="(min-width: 768px) 40vw, 30vw"
                      className="object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                    />
                  </motion.div>
                  <div className="absolute inset-x-0 bottom-0 flex h-[46%] flex-col gap-[2px] pt-[2px]">
                    {getHome(s.slug).materials.slice(0, 5).map((c, j) => (
                      <motion.div
                        key={c.material}
                        className="relative flex-1 overflow-hidden"
                        initial={{ x: j % 2 ? "100%" : "-100%" }}
                        animate={{ x: "0%" }}
                        transition={tr({ duration: 1, ease: ease.out, delay: 1.25 + i * 0.08 + j * 0.06 })}
                      >
                        <SampleImage material={getMaterial(c.material)} sizes="(min-width: 768px) 40vw, 30vw" height={240} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: signatureColor(s) }} aria-hidden />
                <span className="absolute bottom-2 left-2 right-2 flex items-end justify-between gap-2 sm:bottom-3 sm:left-3">
                  <span className="bg-bg/90 px-2 py-1 text-ink">
                    <span className="eyebrow block tabular-nums">{s.number}</span>
                    <span
                      className={cn(
                        "display hidden whitespace-nowrap text-lg transition-opacity duration-500 md:block",
                        hover === null || hover === i ? "opacity-100" : "opacity-0",
                      )}
                    >
                      {s.title}
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between text-muted">
          <span className="eyebrow">Visual Designer — Tiles · an independent concept</span>
          <span className="flex items-center gap-3" aria-hidden>
            <span className="eyebrow hidden sm:inline">Scroll</span>
            <span className="relative block h-8 w-px overflow-hidden bg-line">
              <span className="animate-cue absolute inset-0 bg-ink" />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
