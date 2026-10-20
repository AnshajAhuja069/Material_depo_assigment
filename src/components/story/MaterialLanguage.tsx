import type { Story } from "@/data/stories";
import { ChapterHeading } from "@/components/story/ChapterHeading";
import { MaterialMoodboard } from "@/components/story/MaterialMoodboard";
import { MaterialPalette } from "@/components/story/MaterialPalette";
import { Reveal } from "@/components/motion/Reveal";

/** Chapter 04 — the material board, its pairings and its palette. */
export function MaterialLanguage({ story }: { story: Story }) {
  return (
    <section id="chapter-4" className="gutter scroll-mt-24 py-[14vh]">
      <ChapterHeading index={4} title={story.chapters[3]} copy={story.chapterCopy.language} />
      <div className="mt-16">
        <MaterialMoodboard story={story} />
      </div>
      <div className="mt-24 grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow text-muted">Colour signature</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            The five-colour strip from the board makes each collection recognisable at a glance, on screen or across a showroom. Tap a
            colour to copy its hex value.
          </p>
        </Reveal>
        <div className="lg:col-span-8">
          <MaterialPalette story={story} />
        </div>
      </div>
    </section>
  );
}
