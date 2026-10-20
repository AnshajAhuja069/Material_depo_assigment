"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useCallback, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { StoryNavigator } from "@/components/layout/StoryNavigator";
import { site } from "@/data/site";
import { signatureColor, stories } from "@/data/stories";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 24);
    setHidden(!reduced && y > 480 && y > prev + 2);
    if (y < prev - 2) setHidden(false);
  });

  const activeSlug = pathname.startsWith("/stories/") ? pathname.split("/")[2] : undefined;
  const active = stories.find((s) => s.slug === activeSlug);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500",
          solid ? "border-b hairline bg-bg/85 backdrop-blur-md" : "border-b border-transparent",
        )}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: ease.out }}
      >
        <div className="gutter flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link href="/" className="group flex items-baseline gap-2" aria-label="Material Stories — home">
            <span className="display text-[1.6rem] italic leading-none">Material</span>
            <span className="eyebrow">Stories</span>
          </Link>

          {active ? (
            <span className="eyebrow hidden items-center gap-3 text-muted lg:flex" aria-hidden>
              <span className="h-px w-10 bg-accent" />
              {active.number} / 05 — {active.title}
            </span>
          ) : null}

          <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
            <Link href="/#about" className="eyebrow link-line hidden px-3 py-2 md:inline-block">
              Project
            </Link>
            <Link href="/#process" className="eyebrow link-line hidden px-3 py-2 md:inline-block">
              Process
            </Link>
            <a
              href={site.figmaFile}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow link-line hidden items-center gap-1 px-3 py-2 md:inline-flex"
            >
              View Figma <ArrowUpRight size={13} aria-hidden />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={open}
              className="ml-1 inline-flex h-11 items-center gap-3 rounded-full border border-current/25 pl-4 pr-3 transition-colors hover:bg-ink hover:text-bg"
            >
              <span className="eyebrow">Collection</span>
              <span className="flex gap-[3px]" aria-hidden>
                {stories.map((s) => (
                  <span key={s.slug} className="h-3.5 w-1.5" style={{ background: signatureColor(s) }} />
                ))}
              </span>
            </button>
          </nav>
        </div>
      </motion.header>

      <Dialog open={open} onClose={close} label="Collection index">
        <div className="gutter mx-auto flex min-h-full max-w-6xl flex-col justify-between gap-12 pb-10 pt-24">
          <div>
            <p className="eyebrow mb-6 text-muted">The Collection — five material stories</p>
            <StoryNavigator activeSlug={activeSlug} onNavigate={close} />
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
            <Link href="/" onClick={close} className="eyebrow link-line py-2">
              Exhibition home
            </Link>
            <Link href="/#about" onClick={close} className="eyebrow link-line py-2">
              The project
            </Link>
            <Link href="/#process" onClick={close} className="eyebrow link-line py-2">
              Design process
            </Link>
            <Link href="/#boards" onClick={close} className="eyebrow link-line py-2">
              Original boards
            </Link>
            <a href={site.figmaFile} target="_blank" rel="noopener noreferrer" className="eyebrow link-line inline-flex items-center gap-1 py-2">
              View Figma file <ArrowUpRight size={13} aria-hidden />
            </a>
          </div>
        </div>
      </Dialog>
    </>
  );
}
