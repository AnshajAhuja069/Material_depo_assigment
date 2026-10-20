import { ArrowUpRight } from "lucide-react";
import type { Story } from "@/data/stories";
import { getMaterial, originalBoardTiles, VERIFIED_ON } from "@/data/materials";
import { getHome } from "@/data/homes";
import { kindLabel, sourceLabel } from "@/lib/images";
import { site } from "@/data/site";

/** Section H — sources, separated into products, inspiration and imagery. */
export function MaterialSources({ story }: { story: Story }) {
  const home = getHome(story.slug);
  const products = home.materials.map((c) => getMaterial(c.material));

  return (
    <section className="gutter border-t hairline py-[12vh]" aria-labelledby="sources-heading">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="sources-heading" className="display text-[clamp(2rem,3.6vw,3rem)]">
            Material Sources
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{site.imageNote}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Product details were checked against each live listing on {VERIFIED_ON}. Links are references, not an endorsement by Material Depot.
          </p>
        </div>

        <div className="space-y-12 lg:col-span-8">
          <div>
            <p className="eyebrow text-muted">Product references</p>
            <ul className="mt-3 border-t hairline">
              {products.map((m) => (
                <li key={m.id} className="border-b hairline">
                  {m.url ? (
                    <a href={m.url} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[6.5rem_1fr_auto] items-center gap-4 py-3">
                      <span className="text-xs font-semibold tabular-nums">{m.code}</span>
                      <span className="min-w-0">
                        <span className="block truncate transition-transform group-hover:translate-x-1">{m.name}</span>
                        <span className="block truncate text-xs text-muted">
                          {m.category} · {m.availability === "listed" ? "Listed" : "Discontinued"}
                        </span>
                      </span>
                      <ArrowUpRight size={15} aria-hidden />
                      <span className="sr-only">(opens materialdepot.com in a new tab)</span>
                    </a>
                  ) : (
                    <div className="grid grid-cols-[6.5rem_1fr] gap-4 py-3">
                      <span className="text-xs font-semibold text-muted">Concept</span>
                      <span>
                        <span className="block">{m.name}</span>
                        <span className="block text-xs text-muted">{m.note}</span>
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            {story.slug === "casa-terracotta" ? (
              <p className="mt-3 text-xs leading-relaxed text-muted">
                The original board tile{" "}
                <a className="link-line" href={originalBoardTiles["tl-05181"].url} target="_blank" rel="noopener noreferrer">
                  TL 05181
                </a>{" "}
                and the suggested alternative{" "}
                <a className="link-line" href={originalBoardTiles["tl-05859-b"].url} target="_blank" rel="noopener noreferrer">
                  TL 05859 B
                </a>{" "}
                are both listed as discontinued, so this home specifies TL 05430.
              </p>
            ) : null}
          </div>

          <div>
            <p className="eyebrow text-muted">Official inspiration reference</p>
            <a href={story.inspirationUrl} target="_blank" rel="noopener noreferrer" className="group mt-3 flex items-center justify-between gap-4 border-y hairline py-4">
              <span className="display text-[clamp(1.4rem,2.6vw,2rem)] transition-transform group-hover:translate-x-1">Material Depot inspiration gallery</span>
              <ArrowUpRight size={18} aria-hidden />
            </a>
          </div>

          <div>
            <p className="eyebrow text-muted">Imagery</p>
            <ul className="mt-3 space-y-1 text-sm text-muted">
              {home.rooms.map((r) => (
                <li key={r.id}>
                  <span className="text-ink">{r.name}</span>: {kindLabel[r.image.kind]}, {sourceLabel[r.image.source].toLowerCase()}.
                </li>
              ))}
              <li>
                <span className="text-ink">Material samples</span>: official Material Depot product photographs, loaded from materialdepot.com.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
