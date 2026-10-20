"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import type { Story } from "@/data/stories";
import { Dialog } from "@/components/ui/Dialog";
import { ease } from "@/lib/motion";

interface Props {
  boards: Story[];
  index: number | null;
  onIndex: (i: number | null) => void;
}

/** Full-resolution inspection of the original Figma boards, with arrow-key paging. */
export function BoardViewer({ boards, index, onIndex }: Props) {
  const [zoomed, setZoomed] = useState(false);
  const open = index !== null;
  const story = open ? boards[index] : null;
  const many = boards.length > 1;

  useEffect(() => {
    if (!open || !many) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onIndex(((index ?? 0) + 1) % boards.length);
      if (e.key === "ArrowLeft") onIndex(((index ?? 0) - 1 + boards.length) % boards.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, many, index, boards.length, onIndex]);

  useEffect(() => setZoomed(false), [index]);

  return (
    <Dialog open={open} onClose={() => onIndex(null)} label={story ? `Original board ${story.number} — ${story.title}` : "Original board"} tone="dark">
      {story ? (
        <div className="flex min-h-full flex-col items-center gap-6 px-4 pb-16 pt-20">
          <div className="flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4">
            <p className="eyebrow">
              Board {story.number} / 05 — {story.title}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                className="eyebrow inline-flex h-10 items-center gap-2 rounded-full border border-current/25 px-4 hover:bg-white/10"
              >
                {zoomed ? <ZoomOut size={14} aria-hidden /> : <ZoomIn size={14} aria-hidden />}
                {zoomed ? "Fit" : "Actual size"}
              </button>
              <a
                href={story.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow inline-flex h-10 items-center gap-2 rounded-full border border-current/25 px-4 hover:bg-white/10"
              >
                Open frame in Figma <ArrowUpRight size={14} aria-hidden />
              </a>
              {many ? (
                <>
                  <button
                    type="button"
                    aria-label="Previous board"
                    onClick={() => onIndex((index! - 1 + boards.length) % boards.length)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-current/25 hover:bg-white/10"
                  >
                    <ArrowLeft size={16} aria-hidden />
                  </button>
                  <button
                    type="button"
                    aria-label="Next board"
                    onClick={() => onIndex((index! + 1) % boards.length)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-current/25 hover:bg-white/10"
                  >
                    <ArrowRight size={16} aria-hidden />
                  </button>
                </>
              ) : null}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={story.slug}
              className={zoomed ? "w-full max-w-full overflow-auto" : "w-full max-w-[min(1200px,calc((100svh-12rem)*0.667))]"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: ease.out }}
            >
              <Image
                src={story.images.board.src}
                alt={story.images.board.alt}
                width={story.images.board.width}
                height={story.images.board.height}
                sizes={zoomed ? "1200px" : "(min-width: 800px) 800px, 100vw"}
                quality={90}
                className={zoomed ? "mx-auto h-auto max-w-none" : "h-auto w-full"}
                style={zoomed ? { width: story.images.board.width } : undefined}
              />
            </motion.div>
          </AnimatePresence>
          <p className="max-w-xl text-center text-xs text-[#b6a597]">
            Exported from Figma at 1200 × 1800 px (2:3). Use Esc to close{many ? ", ← → to change board" : ""}.
          </p>
        </div>
      ) : null}
    </Dialog>
  );
}
