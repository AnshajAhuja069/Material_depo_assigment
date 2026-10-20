"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useFinePointer, useReducedMotionSafe } from "@/components/motion/hooks";

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  strength?: number;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  "aria-label"?: string;
}

/** A link that leans gently toward the pointer on fine-pointer devices only. */
export function MagneticLink({ href, children, className, external, strength = 0.28, onClick, ...rest }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotionSafe();
  const fine = useFinePointer();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const active = fine && !reduced;

  const onMove = (e: React.PointerEvent) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.span ref={ref} style={{ x, y }} className="inline-flex">
      {children}
    </motion.span>
  );

  const shared = {
    className: cn("inline-flex", className),
    onPointerMove: onMove,
    onPointerLeave: reset,
    onClick,
    "aria-label": rest["aria-label"],
  };

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" {...shared}>
      {inner}
    </a>
  ) : (
    <Link href={href} {...shared}>
      {inner}
    </Link>
  );
}
