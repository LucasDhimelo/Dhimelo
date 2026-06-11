"use client";

import { useMotionValue, useSpring, motion } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas";
import CyclingText from "./CyclingText";

export default function HeroSection() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 18 });
  const sy = useSpring(my, { stiffness: 45, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - left) / width  - 0.5) * 24);
    my.set(((e.clientY - top)  / height - 0.5) * 24);
  };

  return (
    <section
      onMouseMove={handleMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        overflow: "hidden",
        padding: "8rem 1.5rem 6rem",
        backgroundColor: "#060608",
      }}
      className="bg-grid"
    >
      <ParticleCanvas />

      {/* Ghost letter D â€” depth layer */}
      <div aria-hidden="true" style={{
        position: "absolute",
        right: "-4vw",
        top: "50%",
        transform: "translateY(-52%)",
        fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: "clamp(280px, 48vw, 680px)",
        letterSpacing: "-0.06em",
        lineHeight: 0.85,
        color: "transparent",
        WebkitTextStroke: "1px rgba(252,240,10,0.06)",
        userSelect: "none",
        pointerEvents: "none",
        zIndex: 0,
      }}>
        D
      </div>

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
          color: "#3a3a4a",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}>
          Portfolio 2025
        </span>
        <span style={{ display: "block", width: 28, height: 1, background: "#3a3a4a" }} />
      </div>

      {/* Content */}
      <motion.div style={{
        x: sx, y: sy,
        position: "relative",
        zIndex: 1,
        maxWidth: 1340,
        width: "100%",
        margin: "0 auto",
      }}>
        {/* Availability */}
        <p style={{
          fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
          fontSize: "0.65rem",
          color: "#c8c8d0",
          letterSpacing: "0.1em",
          marginBottom: "2rem",
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
        }}>
          <span className="pulse-dot" />
          based in Brazil â€” available worldwide
        </p>

        {/* Name */}
        <h1 style={{
          fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(72px, 14vw, 180px)",
          letterSpacing: "-0.055em",
          lineHeight: 0.88,
          color: "#e8e8e8",
          userSelect: "none",
        }}>
          DHIMELO
        </h1>

        {/* Yellow divider */}
        <div aria-hidden="true" style={{
          width: "min(100%, 640px)",
          height: 1,
          background: "linear-gradient(to right, #FCF00A 0%, rgba(252,240,10,0.25) 60%, transparent 100%)",
          margin: "1.75rem 0",
        }} />

        {/* Role */}
        <p style={{
          fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
          fontWeight: 400,
          fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
          color: "#c8c8d0",
          letterSpacing: "0.02em",
          marginBottom: "0.6rem",
          textTransform: "uppercase",
        }}>
          Web Developer &amp; Graphic Designer
        </p>

        <CyclingText />
      </motion.div>

      {/* Scroll indicator */}
      <div aria-hidden="true" style={{
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
          color: "#3a3a4a",
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
            background: "linear-gradient(to bottom, #FCF00A, transparent)",
            transformOrigin: "top",
          }}
        />
      </div>
    </section>
  );
}



