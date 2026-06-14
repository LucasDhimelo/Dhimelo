"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const hover   = useRef(false);
  const [ready,   setReady]   = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) { setIsTouch(true); return; }
    setReady(true);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      hover.current = !!t?.closest("a, button, [role='button'], input, textarea, label");
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });

    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.13);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.13);
      if (ringRef.current) {
        const sz = hover.current ? 48 : 28;
        ringRef.current.style.width     = `${sz}px`;
        ringRef.current.style.height    = `${sz}px`;
        ringRef.current.style.opacity   = hover.current ? "1" : "0.45";
        ringRef.current.style.transform = `translate(${ring.current.x - sz / 2}px, ${ring.current.y - sz / 2}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (isTouch || !ready) return null;

  return (
    <>
      <div ref={dotRef} aria-hidden="true" style={{
        position: "fixed", top: 0, left: 0,
        width: 6, height: 6, borderRadius: "50%",
        background: "var(--accent-text)",
        pointerEvents: "none", zIndex: 99999,
        willChange: "transform",
      }} />
      <div ref={ringRef} aria-hidden="true" style={{
        position: "fixed", top: 0, left: 0,
        width: 28, height: 28, borderRadius: "50%",
        border: "1px solid var(--accent-text)",
        pointerEvents: "none", zIndex: 99998,
        willChange: "transform", opacity: 0.45,
        transition: "width 180ms ease, height 180ms ease, opacity 180ms ease",
      }} />
    </>
  );
}
