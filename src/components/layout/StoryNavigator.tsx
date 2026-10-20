"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { stories } from "@/data/stories";
import { getHome } from "@/data/homes";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface Props {
  activeSlug?: string;
  onNavigate?: () => void;
}

/** The exhibition index — five stories with their colour signature and material. */
export function StoryNavigator({ activeSlug, onNavigate }: Props) {
  return (
    <nav aria-label="Material stories">
      <ol className="border-t hairline">
        {stories.map((story, i) => {
          const active = story.slug === activeSlug;
          return (
            <motion.li
              key={story.slug}
              className="border-b hairline"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: ease.out, delay: 0.08 + i * 0.06 }}
            >
              <Link
                href={`/stories/${story.slug}`}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4 sm:gap-8 sm:py-5"
              >
                <span className="eyebrow w-7 tabular-nums" style={{ color: active ? story.palette[0].hex : undefined }}>
                  {story.number}
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "display block text-[clamp(1.9rem,5vw,3.6rem)] transition-transform duration-500 group-hover:translate-x-2",
                      active && "italic",
                    )}
                  >
                    {story.title}
                  </span>
                  <span className="mt-2 flex items-center gap-3">
                    <span className="flex" aria-hidden>
                      {story.palette.map((s) => (
                        <span key={s.hex} className="h-3 w-3 sm:h-3.5 sm:w-5" style={{ background: s.hex }} />
                      ))}
                    </span>
                    <span className="truncate text-xs text-muted sm:text-sm">{getHome(story.slug).name} · {story.subtitle}</span>
                  </span>
                </span>
                <span className="relative flex items-center gap-4">
                  <span className="relative hidden h-16 w-24 overflow-hidden sm:block">
                    <Image
                      src={getHome(story.slug).heroImage.src}
                      alt=""
                      fill
                      sizes="96px"
                      className="scale-110 object-cover opacity-0 transition duration-700 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:opacity-100"
                    />
                  </span>
                  <span className="relative h-12 w-12 overflow-hidden rounded-full sm:hidden">
                    <Image src={story.images.swatch.src} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                  <ArrowUpRight className="hidden shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:block" size={20} aria-hidden />
                </span>
              </Link>
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}
