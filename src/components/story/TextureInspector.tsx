"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { Maximize2 } from "lucide-react";
import type { Img } from "@/lib/images";
import { kindLabel, maxDisplayWidth } from "@/lib/images";
import type { MotionStyle } from "@/lib/motion";
import { RevealImage } from "@/components/motion/RevealImage";
import { Dialog } from "@/components/ui/Dialog";
import { useFinePointer } from "@/components/motion/hooks";

const LENS = 190;

/**
 * Material inspection: a pointer-following loupe on desktop, and a full-
 * resolution pan-and-zoom view on every device (tap, click or keyboard).
 */
export function TextureInspector({ image, style, label }: { image: Img; style: MotionStyle; label: string }) {
  const fine = useFinePointer();
  const box = useRef<HTMLDivElement>(null);
  const [lens, setLens] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [open, setOpen] = useState(false);
  const cap = maxDisplayWidth(image);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!fine || !box.current) return;
    const r = box.current.getBoundingClientRect();
    setLens({ x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height });
  };

  // Magnify towards native pixels, never past 2.6×.
  const zoom = lens ? Math.min(2.6, Math.max(1.6, image.width / lens.w)) : 2;

  return (
    <div className="mx-auto w-full" style={{ maxWidth: Math.min(cap ?? 480, 480) }}>
      <div
        ref={box}
        className="relative cursor-crosshair"
        onPointerMove={onMove}
        onPointerLeave={() => setLens(null)}
        onClick={() => !fine && setOpen(true)}
      >
        <RevealImage image={image} style={style} sizes="(min-width: 1024px) 46vw, 100vw" parallax={0} />
        <AnimatePresence>
          {lens ? (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute z-10 rounded-full border-2 border-bg shadow-2xl"
              style={{
                width: LENS,
                height: LENS,
                left: lens.x - LENS / 2,
                top: lens.y - LENS / 2,
                backgroundImage: `url(${image.src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: `${lens.w * zoom}px ${lens.h * zoom}px`,
                backgroundPosition: `${-(lens.x * zoom - LENS / 2)}px ${-(lens.y * zoom - LENS / 2)}px`,
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25 }}
            />
          ) : null}
        </AnimatePresence>
      </div>
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="text-[11px] tracking-wide text-muted">
          {kindLabel[image.kind]} · {fine ? "Hover to magnify" : "Tap to inspect"}
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="eyebrow inline-flex h-10 items-center gap-2 rounded-full border border-current/20 px-4 transition-colors hover:bg-ink hover:text-bg"
        >
          <Maximize2 size={13} aria-hidden /> Inspect
        </button>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} label={`${label} — full resolution`} tone="dark">
        <div className="flex min-h-full flex-col items-center justify-center gap-4 px-4 py-20">
          <p className="eyebrow text-[#b6a597]">
            {label} · {image.width} × {image.height}px · scroll or drag to pan
          </p>
          <div className="max-w-full overflow-auto">
            <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={`${image.width}px`} quality={90} className="h-auto max-w-none" style={{ width: image.width }} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
