"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDownRight } from "lucide-react";
import type { Story } from "@/data/stories";
import { getMaterial } from "@/data/materials";
import { useHomeSelection } from "@/components/curation/HomeSelection";
import { SampleImage } from "@/components/curation/SampleImage";
import { ChapterHeading } from "@/components/story/ChapterHeading";
import { instant, useReducedMotionSafe } from "@/components/motion/hooks";
import { maxDisplayWidth } from "@/lib/images";
import { motionTokens } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** Section B — One Vision. An Entire Home. Three rooms at a glance. */
export function HomeOverview({ story }: { story: Story }) {
  const { home, showRoom } = useHomeSelection();
  const reduced = useReducedMotionSafe();
  const t = motionTokens[story.motion];

  return (
    <section id="chapter-1" className="gutter scroll-mt-24 py-[14vh]" aria-labelledby="home-heading">
      <ChapterHeading index={1} title="One Vision. An Entire Home." copy={home.concept} size="title" />

      <ul className="mt-14 grid gap-6 md:grid-cols-12 md:gap-6">
        {home.rooms.map((r, i) => {
          const cap = maxDisplayWidth(r.image);
          return (
            <motion.li
              key={r.id}
              className={cn(i === 0 ? "md:col-span-6 md:row-span-2" : "md:col-span-6")}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={reduced ? instant : { duration: t.duration * 0.7, ease: t.ease, delay: i * t.stagger * 1.5 }}
            >
              <button type="button" onClick={() => showRoom(r.id)} className="group block w-full text-left" aria-label={`Explore the ${r.name.toLowerCase()}`}>
                <span
                  className={cn("relative mx-auto block overflow-hidden bg-surface", i === 0 ? "aspect-[4/5] md:aspect-auto md:h-full md:min-h-[560px]" : "aspect-[16/10]")}
                  style={cap ? { maxWidth: cap } : undefined}
                >
                  <Image
                    src={r.image.src}
                    alt={r.image.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/65 via-black/25 to-transparent p-4 pt-16 text-white sm:p-5">
                    <span>
                      <span className="eyebrow block opacity-80">Room {String(i + 1).padStart(2, "0")}</span>
                      <span className="display mt-1 block text-[clamp(1.6rem,2.6vw,2.4rem)]">{r.name}</span>
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="flex -space-x-2" aria-hidden>
                        {r.uses.slice(0, 5).map((u) => (
                          <span key={u.material} className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-white/80">
                            <SampleImage material={getMaterial(u.material)} sizes="32px" height={100} />
                          </span>
                        ))}
                      </span>
                      <ArrowDownRight size={18} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                    </span>
                  </span>
                </span>
              </button>
              <p className="mt-3 text-sm text-muted">
                {r.uses.length} materials · {r.uses.map((u) => getMaterial(u.material).code ?? "concept finish").join(" · ")}
              </p>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
