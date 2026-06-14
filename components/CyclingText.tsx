"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PHRASES = [
  "— Build.",
  "— Shape.",
  "— Evolve.",
  "— Be seen.",
];

export default function CyclingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % PHRASES.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      height: "clamp(1.4rem, 3vw, 2rem)",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
    }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.38, ease: "easeInOut" }}
          style={{
            fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(1rem, 2.2vw, 1.35rem)",
            color: "var(--accent-text)",
            letterSpacing: "-0.02em",
            display: "block",
          }}
        >
          {PHRASES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
