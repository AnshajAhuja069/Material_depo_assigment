"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface Props {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
  /** Visual tone of the overlay; defaults to the active theme. */
  tone?: "theme" | "dark";
}

/** Minimal accessible modal: portal, focus trap, Esc to close, scroll lock. */
export function Dialog({ open, onClose, label, children, className, tone = "theme" }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  // Callers often pass inline handlers; keep the latest without re-running the effect.
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    lenis?.stop();

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [],
      );
    const focusTimer = setTimeout(() => focusables()[0]?.focus(), 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
      } else if (e.key === "Tab") {
        const items = focusables();
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
      lenis?.start();
      previous?.focus?.();
    };
  }, [open, lenis]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          data-lenis-prevent
          className={cn(
            "fixed inset-0 z-[90] overflow-y-auto overscroll-contain",
            tone === "dark" ? "bg-[#0e0e10] text-[#efe8df]" : "bg-bg text-ink",
            className,
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: ease.out }}
        >
          <button
            type="button"
            onClick={onClose}
            className="fixed right-[var(--gutter)] top-3 z-10 inline-flex h-11 items-center gap-2 rounded-full border border-current/20 px-4 text-sm backdrop-blur-sm transition-colors hover:bg-current/10"
            aria-label="Close"
          >
            <span className="eyebrow">Close</span>
            <X size={16} aria-hidden />
          </button>
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
