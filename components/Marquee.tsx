"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

interface Props {
  text: string;
  baseVelocity?: number;
}

/** Infinite marquee that speeds up and reverses with scroll velocity. */
export default function Marquee({ text, baseVelocity = 2.5 }: Props) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const direction = useRef(baseVelocity < 0 ? -1 : 1);

  useAnimationFrame((_, delta) => {
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = baseVelocity < 0 ? 1 : -1;
    else if (vf > 0) direction.current = baseVelocity < 0 ? -1 : 1;

    let moveBy = direction.current * Math.abs(baseVelocity) * (delta / 1000);
    moveBy += moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  const chunk = (
    <>
      <span style={{ color: "var(--fg)" }}>{text}</span>
      <span aria-hidden="true" style={{ color: "var(--accent-text)", margin: "0 1.5rem" }}>✦</span>
      <span
        aria-hidden="true"
        style={{ color: "transparent", WebkitTextStroke: "1px var(--outline-stroke)" }}
      >
        {text}
      </span>
      <span aria-hidden="true" style={{ color: "var(--accent-text)", margin: "0 1.5rem" }}>✦</span>
    </>
  );

  return (
    <div
      aria-label={text}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        padding: "1.75rem 0",
        borderTop: "1px solid var(--border-soft)",
        borderBottom: "1px solid var(--border-soft)",
        background: "var(--bg-alt)",
      }}
    >
      <motion.div
        style={{
          x,
          display: "inline-block",
          fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(2rem, 5vw, 4rem)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          userSelect: "none",
          willChange: "transform",
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <span key={i} aria-hidden={i > 0}>{chunk}</span>
        ))}
      </motion.div>
    </div>
  );
}
