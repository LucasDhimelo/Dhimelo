"use client";

import { useRef, useState, useEffect } from "react";
import { useMotionValue, useSpring, useScroll, useTransform, motion } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas";
import CyclingText from "./CyclingText";

const NAME = "DHIMELO";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 18 });
  const sy = useSpring(my, { stiffness: 45, damping: 18 });

  // Glitch the name every 5s; let the entrance reveal finish before allowing overflow
  const [glitching, setGlitching] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntranceDone(true), 1300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let off: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      setGlitching(true);
      off = setTimeout(() => setGlitching(false), 700);
    }, 2600);
    return () => { clearInterval(id); clearTimeout(off); };
  }, []);

  // Scroll-driven exit: content recedes and fades as the hero leaves the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const ghostY = useTransform(scrollYProgress, [0, 1], ["-52%", "-20%"]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - left) / width  - 0.5) * 24);
    my.set(((e.clientY - top)  / height - 0.5) * 24);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{
        position: "relative",
        height: "100dvh",
        minHeight: "600px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        overflow: "hidden",
        padding: "6rem 1.5rem 4rem",
        backgroundColor: "var(--bg)",
      }}
      className="bg-grid"
    >
      <ParticleCanvas />

      {/* Ghost letter D — depth layer with scroll parallax */}
      <motion.div aria-hidden="true" style={{
        y: ghostY,
        position: "absolute",
        right: "-4vw",
        top: "50%",
        fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: "clamp(280px, 48vw, 680px)",
        letterSpacing: "-0.06em",
        lineHeight: 0.85,
        color: "transparent",
        WebkitTextStroke: "1px var(--ghost-stroke)",
        userSelect: "none",
        pointerEvents: "none",
        zIndex: 0,
      }}>
        D
      </motion.div>

      {/* Vertical side label */}
      <div aria-hidden="true" style={{
        position: "absolute",
        right: "2rem",
        bottom: "5rem",
        transformOrigin: "bottom right",
        transform: "rotate(-90deg) translateX(100%)",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        pointerEvents: "none",
      }}>
        <span style={{
          fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
          fontSize: "0.55rem",
          color: "var(--fg-faint)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}>
          Portfolio 2026
        </span>
        <span style={{ display: "block", width: 28, height: 1, background: "var(--fg-faint)" }} />
      </div>

      {/* Content — scroll exit wrapper around mouse-parallax layer */}
      <motion.div style={{
        y: contentY,
        opacity: contentOpacity,
        scale: contentScale,
        position: "relative",
        zIndex: 1,
        maxWidth: 1340,
        width: "100%",
        margin: "0 auto",
        willChange: "transform, opacity",
      }}>
      <motion.div style={{ x: sx, y: sy }}>
        {/* Availability */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            color: "var(--fg-muted)",
            letterSpacing: "0.1em",
            marginBottom: "2rem",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span className="pulse-dot" />
          based in Brazil — available worldwide
        </motion.p>

        {/* Name — staggered letter reveal + periodic RGB-split glitch */}
        <h1
          aria-label={NAME}
          data-text={NAME}
          className={`glitch-name${glitching ? " is-glitching" : ""}`}
          style={{
            fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(72px, 14vw, 180px)",
            letterSpacing: "-0.055em",
            lineHeight: 0.88,
            color: "var(--fg)",
            userSelect: "none",
            display: "flex",
            overflow: entranceDone ? "visible" : "hidden",
            paddingBottom: "0.08em",
          }}
        >
          {NAME.split("").map((letter, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              initial={{ y: "110%", rotate: 4 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.25 + i * 0.055,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ display: "inline-block", willChange: "transform" }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        {/* Yellow divider — draws in */}
        <motion.div
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: "min(100%, 640px)",
            height: 1,
            background: "linear-gradient(to right, var(--accent-text) 0%, var(--accent-soft) 60%, transparent 100%)",
            margin: "1.75rem 0",
            transformOrigin: "left",
          }}
        />

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
            color: "var(--fg-muted)",
            letterSpacing: "0.02em",
            marginBottom: "0.6rem",
            textTransform: "uppercase",
          }}
        >
          Web Developer &amp; Graphic Designer
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <CyclingText />
        </motion.div>
      </motion.div>
      </motion.div>

      {/* Scroll indicator — fades out once scrolling starts */}
      <motion.div aria-hidden="true" style={{
        opacity: scrollHintOpacity,
        position: "absolute",
        bottom: "2.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}>
        <span style={{
          fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
          fontSize: "0.5rem",
          color: "var(--fg-faint)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}>
          scroll
        </span>
        <motion.div
          animate={{ scaleY: [1, 0.35, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 44,
            background: "linear-gradient(to bottom, var(--accent-text), transparent)",
            transformOrigin: "top",
          }}
        />
      </motion.div>
    </section>
  );
}
