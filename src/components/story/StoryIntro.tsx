import type { Story } from "@/data/stories";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { Reveal } from "@/components/motion/Reveal";

/** Chapter 01 — the cinematic statement followed by the board's narrative. */
export function StoryIntro({ story }: { story: Story }) {
  return (
    <section id="chapter-1" className="gutter scroll-mt-24 py-[16vh] sm:py-[20vh]">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-3">
          <p className="eyebrow text-accent-ink">Chapter 01</p>
          <p className="eyebrow mt-2 text-muted">{story.chapters[0]}</p>
        </Reveal>
        <div className="lg:col-span-9">
          <ScrollWords text={story.statement} className="display text-headline max-w-5xl text-balance" />
          <Reveal delay={0.1}>
            <p className="text-lede mt-10 max-w-2xl text-muted">{story.narrative}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
