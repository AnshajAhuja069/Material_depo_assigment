import { ArrowUpRight, Info } from "lucide-react";
import type { Story } from "@/data/stories";
import { ChapterHeading } from "@/components/story/ChapterHeading";
import { TextureInspector } from "@/components/story/TextureInspector";
import { RevealImage } from "@/components/motion/RevealImage";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticLink } from "@/components/motion/MagneticLink";

/** Chapter 05 — the real Material Depot product behind the story. */
export function MaterialDetail({ story }: { story: Story }) {
  const p = story.product;
  const specs: Array<[string, string]> = [
    ["Size", p.sizeNote ? `${p.size} (${p.sizeNote})` : p.size],
    ["Finish", p.finish],
    ["Material", p.material],
    ["Thickness", p.thickness],
    ["Type", p.type],
    ...(p.designs ? ([["Designs", p.designs]] as Array<[string, string]>) : []),
  ];
  const discontinued = p.status === "discontinued";

  return (
    <section id="chapter-5" className="gutter scroll-mt-24 py-[14vh]">
      <ChapterHeading index={5} title={story.chapters[4]} />

      <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <TextureInspector image={story.images.tile} style={story.motion} label={`${p.code} ${p.name}`} />
        </div>

        <Reveal className="lg:col-span-5 lg:col-start-8">
          <p className="eyebrow text-accent-ink">Material Depot · {p.code}</p>
          <h3 className="display mt-3 text-[clamp(2.2rem,4vw,3.6rem)]">{p.name}</h3>

          {discontinued ? (
            <div className="mt-6 flex gap-3 border border-current/25 p-4 text-sm leading-relaxed">
              <Info size={18} className="mt-0.5 shrink-0 text-accent-ink" aria-hidden />
              <p>
                <span className="eyebrow mb-1 block text-accent-ink">Discontinued · design exploration</span>
                {p.statusNote}
              </p>
            </div>
          ) : null}

          <p className="mt-6 leading-relaxed text-muted">{story.intro}</p>

          <dl className="mt-8 grid grid-cols-2 border-t hairline">
            {specs.map(([k, v]) => (
              <div key={k} className="border-b hairline py-3 pr-3">
                <dt className="eyebrow text-muted">{k}</dt>
                <dd className="mt-1">{v}</dd>
              </div>
            ))}
          </dl>

          {p.notes?.map((n) => (
            <p key={n} className="mt-4 text-sm text-muted">
              {n}
            </p>
          ))}

          <p className="eyebrow mt-8 text-muted">Suggested applications</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {p.applications.map((a) => (
              <li key={a} className="rounded-full border border-current/20 px-3 py-1.5 text-sm">
                {a}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <MagneticLink
              href={p.url}
              external
              className="group"
              aria-label={`${discontinued ? "View original listing (discontinued)" : "View material on Material Depot"} — opens in a new tab`}
            >
              <span className="inline-flex h-14 items-center gap-3 rounded-full bg-ink px-7 text-bg transition-colors group-hover:bg-accent-ink">
                <span className="eyebrow">{discontinued ? "View original listing" : "View on Material Depot"}</span>
                <ArrowUpRight size={16} aria-hidden />
              </span>
            </MagneticLink>
          </div>

          {p.alternative ? (
            <div className="mt-8 border-t hairline pt-6">
              <p className="eyebrow text-muted">Related product, shown separately</p>
              <a href={p.alternative.url} target="_blank" rel="noopener noreferrer" className="group mt-2 inline-flex items-center gap-2">
                <span className="link-line">
                  {p.alternative.code} — {p.alternative.name}
                </span>
                <ArrowUpRight size={14} aria-hidden />
              </a>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.alternative.note}</p>
            </div>
          ) : null}
        </Reveal>
      </div>

      <div className="mt-20">
        <RevealImage
          image={story.images.detail}
          style={story.motion}
          sizes="100vw"
          parallax={0}
          caption={{ label: "Texture studies", text: "Surface, edge profile and laid joint, as studied on the board." }}
        />
      </div>
    </section>
  );
}
