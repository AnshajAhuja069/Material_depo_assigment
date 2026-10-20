import type { Application, Story } from "@/data/stories";
import { RevealImage } from "@/components/motion/RevealImage";
import { ChapterHeading } from "@/components/story/ChapterHeading";
import { cn } from "@/lib/cn";

function Item({
  app,
  story,
  className,
  frameClassName,
  aspect,
  parallax,
  mask,
  sizes,
  delay,
}: {
  app: Application;
  story: Story;
  className?: string;
  frameClassName?: string;
  aspect?: string;
  parallax?: number;
  mask?: "none" | "arch" | "leaf" | "round";
  sizes: string;
  delay?: number;
}) {
  return (
    <RevealImage
      image={app.image}
      style={story.motion}
      focus={app.focus}
      className={className}
      frameClassName={frameClassName}
      aspect={aspect}
      parallax={parallax}
      mask={mask}
      sizes={sizes}
      delay={delay}
      caption={{ label: app.label, text: app.caption }}
    />
  );
}

/** Chapter 02 — interiors, composed differently for each story's rhythm. */
export function ApplicationGallery({ story }: { story: Story }) {
  const apps = story.applications;
  const layout = story.galleryLayout;

  return (
    <section id="chapter-2" className="gutter scroll-mt-24 pb-[14vh]">
      <ChapterHeading index={2} title={story.chapters[1]} copy={story.chapterCopy.applications} />

      {layout === "offset" ? (
        // Tidal — two tall frames drifting at different depths, like reflections.
        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-8">
          <Item app={apps[0]} story={story} className="md:col-span-7" frameClassName="aspect-[4/5]" parallax={0.7} sizes="(min-width: 768px) 58vw, 100vw" />
          <Item
            app={apps[1]}
            story={story}
            className="md:col-span-5 md:mt-[30vh]"
            frameClassName="aspect-[3/4]"
            parallax={1.6}
            sizes="(min-width: 768px) 42vw, 100vw"
            delay={0.15}
          />
        </div>
      ) : null}

      {layout === "grid" ? (
        // Nordic — strict, aligned, architectural.
        <div className="mt-16 grid gap-10 md:grid-cols-12 md:gap-8">
          <Item app={apps[0]} story={story} className="md:col-span-12" frameClassName="aspect-[4/3] md:aspect-[21/10]" parallax={0.5} sizes="100vw" />
          <div className="hidden md:col-span-5 md:block" />
          <Item app={apps[1]} story={story} className="md:col-span-7" frameClassName="aspect-[4/3] md:aspect-[16/9]" parallax={0.5} sizes="(min-width: 768px) 58vw, 100vw" />
        </div>
      ) : null}

      {layout === "arches" ? (
        // Casa — arched openings, a courtyard rhythm.
        <div className="mt-16 grid items-end gap-12 md:grid-cols-12 md:gap-10">
          <Item app={apps[0]} story={story} className="md:col-span-7" frameClassName="aspect-[4/5]" mask="arch" parallax={0.6} sizes="(min-width: 768px) 58vw, 100vw" />
          <Item app={apps[1]} story={story} className="mx-auto md:col-span-5 md:mb-[12vh]" mask="arch" parallax={1.1} sizes="(min-width: 768px) 420px, 100vw" delay={0.12} />
        </div>
      ) : null}

      {layout === "framed" ? (
        // Monaco — one image, framed like a gallery piece.
        <div className="mt-16 flex justify-center">
          <div className="relative w-full max-w-[830px]">
            <span aria-hidden className="pointer-events-none absolute -inset-3 border border-accent/50 sm:-inset-6" />
            <Item app={apps[0]} story={story} parallax={0.5} sizes="(min-width: 900px) 830px, 100vw" />
          </div>
        </div>
      ) : null}

      {layout === "organic" ? (
        // Botanical — offset, softly shaped frames that grow like a canopy.
        <div className="mt-16 flex flex-col items-center gap-14 md:flex-row md:items-start md:justify-center md:gap-10">
          {apps.map((app, i) => (
            <Item
              key={app.label}
              app={app}
              story={story}
              className={cn(i === 1 && "md:mt-[18vh]")}
              mask="leaf"
              parallax={i === 0 ? 0.6 : 1.4}
              sizes="(min-width: 768px) 440px, 100vw"
              delay={i * 0.15}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
