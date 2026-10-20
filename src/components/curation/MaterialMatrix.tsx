"use client";

import { motion } from "motion/react";
import { X } from "lucide-react";
import type { Story } from "@/data/stories";
import { getMaterial, surfaces, type MaterialId, type Surface } from "@/data/materials";
import { roomsUsing, type Room } from "@/data/homes";
import { useHomeSelection } from "@/components/curation/HomeSelection";
import { SampleImage } from "@/components/curation/SampleImage";
import { ChapterHeading } from "@/components/story/ChapterHeading";
import { instant, useReducedMotionSafe } from "@/components/motion/hooks";
import { cn } from "@/lib/cn";

function Cell({ room, surface }: { room: Room; surface: Surface }) {
  const { material, setMaterial } = useHomeSelection();
  const items = room.uses.filter((u) => u.surface === surface);
  if (!items.length) return <span className="block h-full min-h-14 rounded-sm border border-dashed border-current/10" aria-label="None" />;
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((u) => {
        const m = getMaterial(u.material);
        const on = material === u.material;
        return (
          <li key={u.material}>
            <button
              type="button"
              onClick={() => setMaterial(on ? null : u.material)}
              aria-pressed={on}
              title={u.detail}
              className={cn(
                "flex w-full items-center gap-2 rounded-sm p-1.5 text-left text-xs transition-all duration-300",
                on ? "bg-ink text-bg shadow-lg" : material ? "opacity-30" : "hover:bg-surface",
              )}
            >
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-[2px] ring-1 ring-black/10">
                <SampleImage material={m} sizes="36px" height={120} />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block truncate font-semibold">{m.code ?? "Concept"}</span>
                <span className={cn("block truncate", on ? "opacity-70" : "text-muted")}>{m.name}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** Section E — the whole-home material matrix: rooms × surfaces, fully data-driven. */
export function MaterialMatrix({ story }: { story: Story }) {
  const { home, room: roomId, setRoom, material, setMaterial } = useHomeSelection();
  const reduced = useReducedMotionSafe();
  const used = surfaces.filter((s) => home.rooms.some((r) => r.uses.some((u) => u.surface === s.id)));
  const traced = material ? getMaterial(material) : null;
  const tracedRooms = material ? roomsUsing(home, material) : [];
  const activeRoom = home.rooms.find((r) => r.id === roomId)!;

  return (
    <section id="chapter-4" className="gutter scroll-mt-24 py-[14vh]" aria-labelledby="matrix-heading">
      <ChapterHeading
        index={4}
        title="The Details That Connect a Home"
        copy="Every room and every surface, mapped. Select a material to see each room it belongs to, or select a room to see its complete palette."
      />

      {/* Material legend */}
      <div className="mt-12 flex flex-wrap items-center gap-2" role="group" aria-label="Trace a material">
        {home.materials.map((c) => {
          const m = getMaterial(c.material);
          const on = material === c.material;
          return (
            <button
              key={c.material}
              type="button"
              onClick={() => setMaterial(on ? null : (c.material as MaterialId))}
              aria-pressed={on}
              className={cn(
                "inline-flex h-11 items-center gap-2 rounded-full border pl-1.5 pr-4 text-xs transition-all",
                on ? "border-transparent bg-ink text-bg" : "border-current/20 hover:border-current/50",
              )}
            >
              <span className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-black/10">
                <SampleImage material={m} sizes="32px" height={100} />
              </span>
              {m.code ?? m.name}
            </button>
          );
        })}
        {material ? (
          <button type="button" onClick={() => setMaterial(null)} className="eyebrow inline-flex h-11 items-center gap-1 px-3 text-muted hover:text-ink">
            <X size={13} aria-hidden /> Clear
          </button>
        ) : null}
      </div>

      <p className="mt-5 min-h-12 max-w-3xl text-sm leading-relaxed text-muted" aria-live="polite">
        {traced ? (
          <>
            <strong className="text-ink">{traced.name}</strong> appears in {tracedRooms.length} of {home.rooms.length} rooms:{" "}
            {tracedRooms
              .map((r) => `${r.name.toLowerCase()} (${r.uses.filter((u) => u.material === material).map((u) => u.detail.toLowerCase()).join("; ")})`)
              .join(", ")}
            .
          </>
        ) : (
          <>Showing the complete palette of the <strong className="text-ink">{activeRoom.name.toLowerCase()}</strong>. Select a room name to switch.</>
        )}
      </p>

      {/* Desktop matrix */}
      <div className="mt-6 hidden overflow-hidden rounded-sm border hairline md:block">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">Materials used in each room of {home.name}, by surface</caption>
          <thead>
            <tr className="border-b hairline">
              <th scope="col" className="w-44 p-4 align-bottom">
                <span className="eyebrow text-muted">Room</span>
              </th>
              {used.map((s) => (
                <th key={s.id} scope="col" className="p-4 align-bottom">
                  <span className="eyebrow">{s.label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {home.rooms.map((r, i) => {
              const active = r.id === roomId && !material;
              const lit = material ? r.uses.some((u) => u.material === material) : active;
              return (
                <motion.tr
                  key={r.id}
                  className={cn("border-b hairline align-top transition-colors last:border-0", lit && "bg-surface")}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={reduced ? instant : { duration: 0.6, delay: i * 0.1 }}
                >
                  <th scope="row" className="p-4">
                    <button type="button" onClick={() => { setMaterial(null); setRoom(r.id); }} className="text-left" aria-pressed={active}>
                      <span className="eyebrow block tabular-nums text-muted">Room {String(i + 1).padStart(2, "0")}</span>
                      <span className={cn("display mt-1 block text-2xl", lit && "italic")}>{r.name}</span>
                      <span className="mt-1 block text-xs text-muted">{r.uses.length} materials</span>
                    </button>
                  </th>
                  {used.map((s) => (
                    <td key={s.id} className="p-3">
                      <Cell room={r} surface={s.id} />
                    </td>
                  ))}
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile: one card per room */}
      <div className="mt-6 space-y-4 md:hidden">
        {home.rooms.map((r, i) => {
          const lit = material ? r.uses.some((u) => u.material === material) : r.id === roomId;
          return (
            <div key={r.id} className={cn("rounded-sm border hairline p-4 transition-colors", lit && "bg-surface")}>
              <button type="button" onClick={() => { setMaterial(null); setRoom(r.id); }} className="text-left">
                <span className="eyebrow block text-muted">Room {String(i + 1).padStart(2, "0")}</span>
                <span className="display text-2xl">{r.name}</span>
              </button>
              <dl className="mt-3 space-y-3">
                {used
                  .filter((s) => r.uses.some((u) => u.surface === s.id))
                  .map((s) => (
                    <div key={s.id} className="grid grid-cols-[6.5rem_1fr] gap-2">
                      <dt className="eyebrow pt-3 text-[10px] text-muted">{s.label}</dt>
                      <dd className="min-w-0">
                        <Cell room={r} surface={s.id} />
                      </dd>
                    </div>
                  ))}
              </dl>
            </div>
          );
        })}
      </div>

      {/* Selected room's complete palette */}
      {!material ? (
        <div className="mt-10">
          <p className="eyebrow text-muted">{activeRoom.name}: complete palette</p>
          <div className="mt-3 flex h-24 overflow-hidden rounded-sm sm:h-28">
            {activeRoom.uses.map((u, i) => {
              const m = getMaterial(u.material);
              return (
                <motion.div
                  key={`${activeRoom.id}-${u.material}`}
                  className="relative flex-1"
                  initial={{ opacity: 0, scaleY: 0.4 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={reduced ? instant : { duration: 0.5, delay: i * 0.06 }}
                  style={{ transformOrigin: "bottom" }}
                >
                  <SampleImage material={m} sizes="20vw" height={300} />
                  <span className="absolute bottom-1.5 left-1.5 bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold text-black">{m.code ?? "Concept"}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : null}
      <p className="mt-6 text-xs text-muted">Matrix generated from the room specifications of {story.title}; no cell is hand-placed.</p>
    </section>
  );
}
