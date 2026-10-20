"use client";

import { MotionConfig, useReducedMotion } from "motion/react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { PageTransitionProvider } from "@/components/motion/PageTransition";

function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  useEffect(() => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) lenis?.scrollTo(target as HTMLElement, { immediate: true, offset: -64 });
      return;
    }
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname, lenis]);
  return null;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  // Same tree on server and client; reduced motion simply turns smoothing off.
  const reduced = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ lerp: 0.1, smoothWheel: !reduced, anchors: { offset: -64 }, syncTouch: false }}>
        <ScrollReset />
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </ReactLenis>
    </MotionConfig>
  );
}
