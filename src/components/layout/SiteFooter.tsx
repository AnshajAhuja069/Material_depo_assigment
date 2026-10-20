import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { signatureColor, stories } from "@/data/stories";

export function SiteFooter() {
  return (
    <footer className="gutter border-t hairline pb-10 pt-16 sm:pt-24">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display text-[clamp(2.6rem,7vw,5.5rem)]">
            Material <em>Stories</em>
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">{site.disclaimer}</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{site.imageNote}</p>
        </div>
        <div>
          <p className="eyebrow mb-4 text-muted">The collection</p>
          <ul className="space-y-2">
            {stories.map((s) => (
              <li key={s.slug}>
                <Link href={`/stories/${s.slug}`} className="link-line inline-flex items-center gap-3 py-1">
                  <span className="h-2.5 w-2.5" style={{ background: signatureColor(s) }} aria-hidden />
                  <span className="tabular-nums text-muted">{s.number}</span> {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4 text-muted">Process</p>
          <ul className="space-y-2">
            <li>
              <a href={site.figmaFile} target="_blank" rel="noopener noreferrer" className="link-line inline-flex items-center gap-1 py-1">
                Complete Figma file <ArrowUpRight size={14} aria-hidden />
              </a>
            </li>
            <li>
              <Link href="/#boards" className="link-line inline-flex py-1">
                The five original boards
              </Link>
            </li>
            <li>
              <Link href="/#display" className="link-line inline-flex py-1">
                Physical display concept
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-16 flex flex-wrap justify-between gap-4 border-t hairline pt-6 text-xs text-muted">
        <p>Concept, art direction &amp; boards — {site.designer}</p>
        <p>Material references: materialdepot.com · Exploratory design proposal, 2026</p>
      </div>
    </footer>
  );
}
