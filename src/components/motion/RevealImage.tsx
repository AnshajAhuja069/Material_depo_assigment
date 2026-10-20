"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { instant, useReducedMotionSafe } from "@/components/motion/hooks";
import { useRef, type CSSProperties } from "react";
import { kindLabel, maxDisplayWidth, type Img } from "@/lib/images";
import { motionTokens, type MotionStyle } from "@/lib/motion";
import { cn } from "@/lib/cn";

export type MaskShape = "none" | "arch" | "leaf" | "round";

const maskRadius: Record<MaskShape, string | undefined> = {
  none: undefined,
  arch: "50% 50% 0 0 / 34% 34% 0 0",
  leaf: "0 42% 0 42% / 0 30% 0 30%",
  round: "18px",
};

interface Props {
  image: Img;
  style?: MotionStyle;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Aspect ratio of the frame, e.g. "4/3". Defaults to the image's own. */
  aspect?: string;
  /** Responsive frame classes (e.g. Tailwind aspect utilities) — overrides `aspect`. */
  frameClassName?: string;
  focus?: string;
  /** Scroll parallax multiplier; 0 disables. */
  parallax?: number;
  mask?: MaskShape;
  delay?: number;
  /** Respect native resolution for low-res crops. */
  capWidth?: boolean;
  caption?: { label: string; text?: string };
  /** Slow continuous zoom while in view (Monaco). */
  drift?: boolean;
}

/**
 * The core image primitive: a clip-path reveal in the story's motion style,
 * an optional settle-scale, and controlled scroll parallax.
 */
export function RevealImage({
  image,
  style = "measured",
  sizes,
  priority,
  className,
  aspect,
  frameClassName,
  focus,
  parallax = 1,
  mask = "none",
  delay = 0,
  capWidth = true,
  caption,
  drift,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduced = useReducedMotionSafe();
  const t = motionTokens[style];

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const travel = reduced ? 0 : t.parallax * parallax;
  const y = useTransform(scrollYProgress, [0, 1], [-travel / 2, travel / 2]);
  const driftScale = useTransform(scrollYProgress, [0, 1], drift && !reduced ? [1.12, 1] : [1, 1]);

  const cap = capWidth ? maxDisplayWidth(image) : undefined;
  const frameStyle: CSSProperties = {
    aspectRatio: frameClassName ? undefined : aspect ?? `${image.width}/${image.height}`,
    borderRadius: maskRadius[mask],
  };

  const show = priority || inView || reduced;

  return (
    <figure className={cn("relative w-full", className)} style={cap ? { maxWidth: cap } : undefined}>
      <div ref={ref} className={cn("relative w-full overflow-hidden bg-surface", frameClassName)} style={frameStyle}>
        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: t.clipFrom }}
          animate={show ? { clipPath: t.clipTo } : undefined}
          transition={reduced ? instant : { duration: t.duration, ease: t.ease, delay }}
        >
          {/* Overscan only when the image actually travels, so nothing is cropped needlessly. */}
          <motion.div className={cn("absolute inset-x-0", travel ? "-inset-y-[6%]" : "inset-y-0")} style={{ y }}>
            <motion.div
              className="absolute inset-0"
              initial={{ scale: t.scaleFrom }}
              animate={show ? { scale: 1 } : undefined}
              transition={reduced ? instant : { duration: t.duration * 1.25, ease: t.ease, delay }}
            >
              <motion.div className="absolute inset-0" style={{ scale: driftScale }}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={sizes}
                  priority={priority}
                  className="object-cover"
                  style={{ objectPosition: focus }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      {caption ? (
        <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span className="eyebrow text-ink">{caption.label}</span>
          <span className="text-[11px] tracking-wide text-muted">{kindLabel[image.kind]}</span>
          {caption.text ? <span className="basis-full text-sm leading-relaxed text-muted">{caption.text}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
