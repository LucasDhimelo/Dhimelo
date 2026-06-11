"use client";

import { useScroll, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: 2,
        background: "#FCF00A",
        transformOrigin: "0%",
        scaleX: scrollYProgress,
        zIndex: 9999,
      }}
    />
  );
}
