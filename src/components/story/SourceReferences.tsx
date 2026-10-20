import { ArrowUpRight } from "lucide-react";
import type { Story } from "@/data/stories";
import { site } from "@/data/site";
import { kindLabel } from "@/lib/images";
import { Reveal } from "@/components/motion/Reveal";

/** Material References — attributed sources, not endorsements. */
export function SourceReferences({ story }: { story: Story }) {
  const p = story.product;
  const links = [
    {
      label: p.status === "discontinued" ? "View original material listing" : "View Material on Material Depot",
      sub: `${p.code} — ${p.name}${p.status === "discontinued" ? " (listed as discontinued)" : ""}`,
      href: p.url,
    },
    { label: "Explore Original Inspiration", sub: "Material Depot image gallery", href: story.inspirationUrl },
  ];

  const credits = [
    story.images.hero,
    ...story.applications.map((a) => a.image),
    story.images.tile,
    story.images.moodboard,
    story.images.board,
  ];
  const kinds = Array.from(new Set(credits.map((c) => c.kind)));

  return (
    <section className="gutter border-t hairline py-[12vh]" aria-labelledby="refs-heading">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="refs-heading" className="display text-[clamp(2rem,3.6vw,3rem)]">
            Material References
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{site.imageNote}</p>
        </div>
        <ul className="lg:col-span-8">
          {links.map((l, i) => (
            <Reveal as="li" key={l.href} delay={i * 0.08} className="border-t hairline last:border-b">
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[1fr_auto] items-center gap-6 py-6 sm:py-8"
              >
                <span>
                  <span className="display block text-[clamp(1.6rem,3.2vw,2.6rem)] transition-transform duration-500 group-hover:translate-x-2">
                    {l.label}
                  </span>
                  <span className="mt-1 block text-sm text-muted">{l.sub} · materialdepot.com</span>
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-full border border-current/25 transition-colors group-hover:bg-ink group-hover:text-bg">
                  <ArrowUpRight size={18} aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </a>
            </Reveal>
          ))}
          <li className="pt-6 text-xs leading-relaxed text-muted">
            Image provenance on this page: {kinds.map((k) => kindLabel[k]).join(" · ")}. Interiors are concept visualizations from the
            original Figma boards, not photographs of installed products. Links are references, not an endorsement by Material Depot.
          </li>
        </ul>
      </div>
    </section>
  );
}
