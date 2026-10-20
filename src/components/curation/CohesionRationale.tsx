"use client";

import { motion } from "motion/react";
import type { Story } from "@/data/stories";
import { getMaterial } from "@/data/materials";
import { useHomeSelection } from "@/components/curation/HomeSelection";
import { ChapterHeading } from "@/components/story/ChapterHeading";
import { instant, useReducedMotionSafe } from "@/components/motion/hooks";
import { motionTokens } from "@/lib/motion";

/** Section F — The Art of Cohesion: specific, per-home design reasoning. */
export function CohesionRationale({ story }: { story: Story }) {
  const { home } = useHomeSelection();
  const reduced = useReducedMotionSafe();
  const t = motionTokens[story.motion];
  const tones = home.materials.map((c) => getMaterial(c.material).tone);

  return (
    <section id="chapter-5" className="gutter scroll-mt-24 py-[14vh]" aria-labelledby="cohesion-heading">
      <ChapterHeading index={5} title="The Art of Cohesion" copy="Why these materials belong together, and what keeps the home from becoming a catalogue." />

      <div className="mt-12" aria-hidden>
        <p className="eyebrow mb-3 text-muted">The home&apos;s undertone, sampled from each material</p>
        <motion.div
          className="h-6 rounded-full"
          style={{ background: `linear-gradient(90deg, ${tones.join(", ")})` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={reduced ? instant : { duration: 1.4, ease: t.ease }}
        />
      </div>

      <ol className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {home.rationale.map((r, i) => (
          <motion.li
            key={r.title}
            className="border-t hairline pt-5"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={reduced ? instant : { duration: 0.8, ease: t.ease, delay: (i % 3) * 0.08 }}
          >
            <p className="eyebrow tabular-nums text-accent-ink">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="display mt-3 text-[clamp(1.6rem,2.4vw,2.2rem)] leading-tight">{r.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{r.text}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
