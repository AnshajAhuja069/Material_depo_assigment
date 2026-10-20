"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { stories } from "@/data/stories";
import type { Img } from "@/lib/images";
import { kindLabel } from "@/lib/images";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { RevealImage } from "@/components/motion/RevealImage";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

const example = stories[0];

const steps: Array<{ n: string; title: string; text: string; image: Img; note: string }> = [
  {
    n: "01",
    title: "Discover",
    text: "Study the product's texture, form, colour, scale, finish and use cases.",
    image: example.images.tile,
    note: "Raw material: the kitkat tile",
  },
  {
    n: "02",
    title: "Interpret",
    text: "Define an emotional and architectural direction for the material.",
    image: example.images.moodboard,
    note: "Direction: a coastal material family",
  },
  {
    n: "03",
    title: "Visualize",
    text: "Present the selected tile through realistic applications, close-up material details and complementary finishes.",
    image: example.images.hero,
    note: "Application: the spa bathroom",
  },
  {
    n: "04",
    title: "Translate",
    text: "Adapt the visual narrative into a showroom display and an interactive digital experience.",
    image: example.images.board,
    note: "Outcome: the finished board",
  },
];

function Step({ step, index, onActive }: { step: (typeof steps)[number]; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="border-t hairline py-10 md:flex md:min-h-[62svh] md:flex-col md:justify-center md:py-0">
      <div className="mb-8 md:hidden">
        <RevealImage image={step.image} sizes="100vw" frameClassName="aspect-[4/3]" parallax={0} capWidth={false} />
      </div>
      <p className="eyebrow tabular-nums text-muted">{step.n} /</p>
      <h3 className="display mt-3 text-[clamp(2.6rem,6vw,5rem)]">{step.title}</h3>
      <p className="text-lede mt-4 max-w-md text-muted">{step.text}</p>
      <p className="eyebrow mt-6 text-muted">
        Example — {example.number} {example.title} · {step.note}
      </p>
    </li>
  );
}

/** Scene 04 — four principles, with a sticky visual that progresses from raw tile to finished board. */
export function ApproachSteps() {
  const [active, setActive] = useState(0);
  const current = steps[active];

  return (
    <section id="process" className="gutter scroll-mt-16 py-[14vh]" aria-labelledby="approach-heading">
      <p className="eyebrow text-muted">The approach</p>
      <AnimatedHeadline id="approach-heading" text="A Story Behind Every Surface" className="display text-title mt-4 max-w-4xl" />

      <div className="mt-14 grid gap-10 md:grid-cols-12">
        <div className="hidden md:col-span-6 md:block">
          <div className="sticky top-[calc(var(--header-h)+4vh)]">
            <div className="relative aspect-[4/5] max-h-[78svh] overflow-hidden bg-surface">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.n}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: ease.inOut }}
                >
                  <Image
                    src={current.image.src}
                    alt={current.image.alt}
                    fill
                    sizes="45vw"
                    className={cn(current.image.kind === "board" ? "object-contain p-6" : "object-cover")}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-4 flex items-center gap-2" aria-hidden>
              {steps.map((s, i) => (
                <span key={s.n} className={cn("h-px flex-1 transition-colors duration-500", i <= active ? "bg-ink" : "bg-line")} />
              ))}
            </div>
            <p className="mt-3 text-[11px] tracking-wide text-muted">
              {current.n} {current.title} · {kindLabel[current.image.kind]}
            </p>
          </div>
        </div>
        <ol className="md:col-span-5 md:col-start-8">
          {steps.map((s, i) => (
            <Step key={s.n} step={s} index={i} onActive={setActive} />
          ))}
        </ol>
      </div>
    </section>
  );
}
