"use client";

import { useState, useEffect, type ReactNode, type CSSProperties } from "react";

interface GlitchTextProps {
  children: ReactNode;
  /** ms between glitch bursts */
  intervalMs?: number;
  /** burst duration in ms (should match the CSS animation length) */
  burstMs?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Wraps text in an RGB-split glitch that fires periodically.
 * Renders two absolutely-positioned cyan/red copies of the content
 * (so it works with multi-line titles and nested colored spans).
 */
export default function GlitchText({
  children,
  intervalMs = 3000,
  burstMs = 700,
  className,
  style,
}: GlitchTextProps) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let off: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      setOn(true);
      off = setTimeout(() => setOn(false), burstMs);
    }, intervalMs);

    return () => { clearInterval(id); clearTimeout(off); };
  }, [intervalMs, burstMs]);

  return (
    <span
      className={`glitch-text${on ? " is-glitching" : ""}${className ? " " + className : ""}`}
      style={style}
    >
      <span aria-hidden="true" className="glitch-layer glitch-layer--cyan">{children}</span>
      <span aria-hidden="true" className="glitch-layer glitch-layer--red">{children}</span>
      <span className="glitch-base">{children}</span>
    </span>
  );
}
