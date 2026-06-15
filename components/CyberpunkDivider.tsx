"use client";

import { useRef, useId } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  label?: string;
  /** flip=true mirrors the teeth downward (for the bottom divider) */
  flip?: boolean;
}

/*
 * SVG viewBox is 1000 × 40.
 * y=0  is the TIP of the deepest tooth (goes INTO the section above).
 * y=40 is the baseline (= top of the divider band).
 *
 * The teeth are rectangular notches — circuit-board / armor-plate style.
 */
const TEETH_D = [
  [0, 40], [55, 40], [75, 8],  [125, 8],  [145, 40],
  [240, 40], [260, 0], [320, 0], [340, 40],
  [440, 40], [460, 14], [510, 14], [530, 40],
  [640, 40], [660, 4],  [720, 4],  [740, 40],
  [840, 40], [860, 18], [915, 18], [935, 40],
  [1000, 40],
]
  .map(([x, y]) => `${x},${y}`)
  .join(" L ");

const CUT_D = `M ${TEETH_D}`;

export default function CyberpunkDivider({ label = "SYS.TRANSFER", flip = false }: Props) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  const uid    = useId().replace(/:/g, "");

  const BAND_H  = 64;   // height of center band (px)
  const TEETH_H = 40;   // teeth extend this many px above / below

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position:   "relative",
        width:      "100%",
        height:     BAND_H,
        background: "var(--bg)",
        // extend the clipping area so teeth can draw outside the box
        overflow:   "visible",
        zIndex:     1,
      }}
    >
      <svg
        aria-hidden="true"
        style={{ position: "absolute", display: "block", overflow: "visible", pointerEvents: "none" }}
      >
        <defs>
          <filter id={`glow-${uid}`} x="-30%" y="-200%" width="160%" height="500%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
      </svg>

      {/* ── TOP teeth — draw INTO the section above ─────── */}
      {!flip && (
        <svg
          viewBox={`0 0 1000 ${TEETH_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{
            position: "absolute",
            top:      -TEETH_H,
            left:     0,
            width:    "100%",
            height:   TEETH_H,
            overflow: "visible",
            display:  "block",
            pointerEvents: "none",
          }}
        >
          <defs>
            <filter id={`gt-${uid}`} x="-10%" y="-100%" width="120%" height="400%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {/* wide glow */}
          <motion.path
            d={CUT_D} fill="none" stroke="#FF2A2A" strokeWidth="5" strokeOpacity={0.15}
            filter={`url(#gt-${uid})`}
            initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* crisp line */}
          <motion.path
            d={CUT_D} fill="none" stroke="#FF2A2A" strokeWidth="1.2" strokeLinecap="square"
            filter={`url(#gt-${uid})`}
            initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      )}

      {/* ── BOTTOM teeth — draw INTO the section below ──── */}
      {flip && (
        <svg
          viewBox={`0 0 1000 ${TEETH_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{
            position:  "absolute",
            bottom:    -TEETH_H,
            left:      0,
            width:     "100%",
            height:    TEETH_H,
            transform: "scaleY(-1)",
            overflow:  "visible",
            display:   "block",
            pointerEvents: "none",
          }}
        >
          <defs>
            <filter id={`gb-${uid}`} x="-10%" y="-100%" width="120%" height="400%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <motion.path
            d={CUT_D} fill="none" stroke="#FF2A2A" strokeWidth="5" strokeOpacity={0.15}
            filter={`url(#gb-${uid})`}
            initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            d={CUT_D} fill="none" stroke="#FF2A2A" strokeWidth="1.2" strokeLinecap="square"
            filter={`url(#gb-${uid})`}
            initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      )}

      {/* ── Center band content ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.9 }}
        style={{
          position:       "absolute",
          inset:          0,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          padding:        "0 2rem",
          gap:            "1rem",
        }}
      >
        {/* Left: hex address */}
        <span style={{
          fontFamily:    'var(--font-jetbrains), "JetBrains Mono", monospace',
          fontSize:      "0.44rem",
          color:         "#FF2A2A",
          letterSpacing: "0.16em",
          opacity:       0.45,
          whiteSpace:    "nowrap",
        }}>
          0xFF / {Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, "0")}
        </span>

        {/* Center: label in a chamfered box */}
        <div style={{
          display:        "flex",
          alignItems:     "center",
          gap:            "0.5rem",
          padding:        "0.22rem 0.9rem",
          border:         "1px solid rgba(255,42,42,0.22)",
          background:     "rgba(255,42,42,0.04)",
          clipPath:       "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
          flexShrink:     0,
        }}>
          <span style={{
            width: 4, height: 4, borderRadius: "50%",
            background: "#FF2A2A", flexShrink: 0,
          }} />
          <span style={{
            fontFamily:    'var(--font-jetbrains), "JetBrains Mono", monospace',
            fontSize:      "0.46rem",
            color:         "#FF2A2A",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            opacity:       0.7,
          }}>
            {label}
          </span>
        </div>

        {/* Right: status readout */}
        <span style={{
          fontFamily:    'var(--font-jetbrains), "JetBrains Mono", monospace',
          fontSize:      "0.44rem",
          color:         "#FF2A2A",
          letterSpacing: "0.16em",
          opacity:       0.45,
          whiteSpace:    "nowrap",
        }}>
          STATUS / OK
        </span>
      </motion.div>

      {/* Horizontal scan line through center */}
      <div
        aria-hidden="true"
        style={{
          position:   "absolute",
          top:        "50%",
          left:       0,
          right:      0,
          height:     1,
          background: "linear-gradient(to right, transparent 0%, rgba(255,42,42,0.18) 20%, rgba(255,42,42,0.18) 80%, transparent 100%)",
          transform:  "translateY(-50%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
