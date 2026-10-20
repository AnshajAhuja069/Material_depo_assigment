"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { MaterialId } from "@/data/materials";
import type { Home } from "@/data/homes";

interface Selection {
  home: Home;
  room: string;
  setRoom: (id: string) => void;
  material: MaterialId | null;
  setMaterial: (id: MaterialId | null) => void;
  /** Select a room and bring the room explorer into view. */
  showRoom: (id: string) => void;
}

const Ctx = createContext<Selection | null>(null);

/**
 * Shared state for one home: the active room and the material being traced.
 * The flat-lay, room explorer, matrix and whole-home reveal all read it, so
 * choosing a material anywhere highlights it everywhere.
 */
export function HomeSelectionProvider({ home, children }: { home: Home; children: ReactNode }) {
  const [room, setRoom] = useState(home.rooms[0].id);
  const [material, setMaterial] = useState<MaterialId | null>(null);

  const showRoom = useCallback((id: string) => {
    setRoom(id);
    document.getElementById("chapter-3")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const value = useMemo(() => ({ home, room, setRoom, material, setMaterial, showRoom }), [home, room, material, showRoom]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useHomeSelection() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useHomeSelection must be used inside HomeSelectionProvider");
  return v;
}
