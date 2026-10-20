"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Story } from "@/data/stories";
import { getMaterial, surfaceLabel } from "@/data/materials";
import { roomsUsing, type Room } from "@/data/homes";
import { useHomeSelection } from "@/components/curation/HomeSelection";
import { SampleImage } from "@/components/curation/SampleImage";
import { ChapterHeading } from "@/components/story/ChapterHeading";
import { instant, useReducedMotionSafe } from "@/components/motion/hooks";
import { kindLabel, maxDisplayWidth, sourceLabel } from "@/lib/images";
import { motionTokens } from "@/lib/motion";
import { cn } from "@/lib/cn";

function RoomImage({ room, story }: { room: Room; story: Story }) {
  const { material, setMaterial } = useHomeSelection();
  const reduced = useReducedMotionSafe();
  const [hover, setHover] = useState<number | null>(null);
  const t = motionTokens[story.motion];
  const cap = maxDisplayWidth(room.image);

  return (
    <figure className="mx-auto w-full" style={{ maxWidth: cap }}>
      <div className="relative w-full overflow-hidden bg-surface" style={{ aspectRatio: `${room.image.width}/${room.image.height}` }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={room.id}
            className="absolute inset-0"
            initial={reduced ? false : { clipPath: t.clipFrom, scale: t.scaleFrom }}
            animate={{ clipPath: t.clipTo, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={reduced ? instant : { duration: t.duration * 0.75, ease: t.ease }}
          >
            <Image src={room.image.src} alt={room.image.alt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" style={{ objectPosition: room.focus }} />
          </motion.div>
        </AnimatePresence>
        <ol className="absolute inset-0" aria-label={`Materials marked in the ${room.name.toLowerCase()} image`}>
          {room.annotations.map((a, i) => {
            const m = getMaterial(a.material);
            const on = material === a.material || hover === i;
            const faded = material !== null && material !== a.material;
            return (
              <li key={`${room.id}-${a.material}`} className="absolute" style={{ left: `${a.x}%`, top: `${a.y}%` }}>
                <motion.button
                  type="button"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  onClick={() => setMaterial(material === a.material ? null : a.material)}
                  aria-label={`${m.name}${m.code ? ` (${m.code})` : ""}`}
                  aria-pressed={material === a.material}
                  className={cn(
                    "relative -translate-x-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full text-[11px] font-semibold tabular-nums shadow-lg ring-2 transition-colors",
                    on ? "bg-white text-black ring-white" : "bg-black/55 text-white ring-white/70 backdrop-blur-sm",
                  )}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, opacity: faded ? 0.35 : 1 }}
                  transition={reduced ? instant : { duration: 0.4, delay: 0.5 + i * 0.08 }}
                >
                  {i + 1}
                </motion.button>
                <AnimatePresence>
                  {on ? (
                    <motion.span
                      className="pointer-events-none absolute left-1/2 top-5 z-10 w-max max-w-[200px] -translate-x-1/2 bg-white px-3 py-2 text-[11px] leading-snug text-black shadow-xl"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <span className="block font-semibold">{m.code ?? "Concept finish"}</span>
                      {m.name}
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>
      </div>
      <figcaption className="mt-3 text-[11px] leading-relaxed text-muted">
        {kindLabel[room.image.kind]} · {room.imageNote ?? sourceLabel[room.image.source]}
      </figcaption>
    </figure>
  );
}

/** Section D — Explore the Home: each room, its own combination of the shared materials. */
export function RoomExplorer({ story }: { story: Story }) {
  const { home, room: roomId, setRoom, material, setMaterial } = useHomeSelection();
  const reduced = useReducedMotionSafe();
  const index = home.rooms.findIndex((r) => r.id === roomId);
  const room = home.rooms[index];

  return (
    <section id="chapter-3" className="gutter scroll-mt-20 py-[14vh]" aria-labelledby="rooms-heading">
      <ChapterHeading
        index={3}
        title="Different Rooms. One Design Language."
        copy="Each room uses its own combination of the same family. Choose a room, then trace any material to see where else it carries the home's identity."
      />

      <div role="tablist" aria-label="Rooms" className="mt-12 flex flex-wrap gap-2 border-b hairline">
        {home.rooms.map((r, i) => (
          <button
            key={r.id}
            role="tab"
            type="button"
            aria-selected={r.id === roomId}
            aria-controls="room-panel"
            onClick={() => setRoom(r.id)}
            className={cn(
              "relative -mb-px flex items-baseline gap-3 px-1 pb-4 pr-6 pt-2 text-left transition-colors",
              r.id === roomId ? "text-ink" : "text-muted hover:text-ink",
            )}
          >
            <span className="eyebrow tabular-nums">Room {String(i + 1).padStart(2, "0")}</span>
            <span className="display text-[clamp(1.4rem,2.4vw,2rem)]">{r.name}</span>
            {r.id === roomId ? (
              <motion.span layoutId="room-tab" className="absolute inset-x-0 bottom-0 h-[2px] bg-accent-ink" transition={reduced ? instant : { duration: 0.5 }} />
            ) : null}
          </button>
        ))}
      </div>

      <div id="room-panel" role="tabpanel" aria-label={room.name} className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <RoomImage room={room} story={story} />
        </div>
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={reduced ? instant : { duration: 0.45 }}
            >
              <p className="eyebrow text-accent-ink">
                Room {String(index + 1).padStart(2, "0")} · {room.uses.length} materials
              </p>
              <h3 className="display mt-3 text-[clamp(2rem,3.4vw,3rem)]">{room.name}</h3>
              <p className="mt-4 leading-relaxed text-muted">{room.rationale}</p>

              <ol className="mt-8 border-t hairline">
                {room.uses.map((u) => {
                  const m = getMaterial(u.material);
                  const n = room.annotations.findIndex((a) => a.material === u.material);
                  const elsewhere = roomsUsing(home, u.material).filter((r) => r.id !== room.id);
                  const on = material === u.material;
                  return (
                    <li key={u.material} className="border-b hairline">
                      <button
                        type="button"
                        onClick={() => setMaterial(on ? null : u.material)}
                        aria-pressed={on}
                        className={cn("grid w-full grid-cols-[3rem_1fr] items-center gap-4 py-3 text-left transition-opacity", material && !on && "opacity-50")}
                      >
                        <span className="relative h-12 w-12 overflow-hidden rounded-sm ring-1 ring-black/10">
                          <SampleImage material={m} sizes="48px" height={160} />
                          {n >= 0 ? (
                            <span className="absolute left-0.5 top-0.5 grid h-4 w-4 place-items-center rounded-full bg-white text-[9px] font-bold text-black">
                              {n + 1}
                            </span>
                          ) : null}
                        </span>
                        <span className="min-w-0">
                          <span className="flex flex-wrap items-baseline gap-x-2">
                            <span className="font-semibold">{m.name}</span>
                            <span className="text-xs text-muted">{m.code ?? "Concept finish"}</span>
                          </span>
                          <span className="block text-sm text-muted">
                            {surfaceLabel[u.surface]}: {u.detail}
                            {u.pictured === false ? " (specified, not pictured)" : ""}
                          </span>
                          <span className="block text-xs text-muted">
                            {elsewhere.length ? `Also in: ${elsewhere.map((r) => r.name.toLowerCase()).join(", ")}` : "Only in this room"}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
              <div className="mt-8 flex gap-2">
                {home.rooms.map((r, i) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRoom(r.id)}
                    aria-label={`Show ${r.name}`}
                    className={cn("h-1.5 flex-1 rounded-full transition-colors", i === index ? "bg-accent-ink" : "bg-line hover:bg-muted")}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
