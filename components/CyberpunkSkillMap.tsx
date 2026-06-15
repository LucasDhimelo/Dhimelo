"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SKILLS } from "@/data/skills";
import GlitchText from "./GlitchText";

const CAT_COLOR: Record<string, string> = {
  "Core Development": "#FF3B30",
  Frontend:           "#00D4FF",
  Design:             "#FF2D55",
  Workflow:           "#39FF14",
};

const CATS = [
  "Core Development",
  "Frontend",
  "Design",
  "Workflow",
] as const;

// Each column fires at a different interval (ms) and initial start offset (ms)
// so they never sync up and always feel "random"
const COL_CONFIG = [
  { interval: 4200, startDelay: 800  },  // Core Dev
  { interval: 5800, startDelay: 2400 },  // Frontend
  { interval: 3600, startDelay: 1500 },  // Design
  { interval: 6500, startDelay: 3200 },  // Workflow
] as const;

const BURST_MS = 440;

export default function CyberpunkSkillMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });
  const [hovered,    setHovered]    = useState<string | null>(null);
  const [colGlitch,  setColGlitch]  = useState([false, false, false, false]);

  useEffect(() => {
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers: ReturnType<typeof setInterval>[]  = [];
    const starters: ReturnType<typeof setTimeout>[] = [];

    COL_CONFIG.forEach(({ interval, startDelay }, i) => {
      const trigger = () => {
        setColGlitch(prev => { const n = [...prev]; n[i] = true;  return n; });
        setTimeout(() => {
          setColGlitch(prev => { const n = [...prev]; n[i] = false; return n; });
        }, BURST_MS);
      };

      const s = setTimeout(() => {
        trigger();
        timers.push(setInterval(trigger, interval));
      }, startDelay);
      starters.push(s);
    });

    return () => {
      starters.forEach(clearTimeout);
      timers.forEach(clearInterval);
    };
  }, []);

  let globalIdx = 0;

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-labelledby="skills-heading"
      className="section-pad bg-grid"
      style={{ backgroundColor: "var(--bg-alt)", borderTop: "1px solid var(--border-soft)" }}
    >
      <div className="container-inner">

        {/* Label */}
        <motion.p
          className="section-label"
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? {
            opacity: [0, 0, 1, 0.35, 1, 0.65, 1],
            x:       [-16, -16, 0, -4, 2, -1, 0],
          } : {}}
          transition={{ duration: 0.55, times: [0, 0.28, 0.48, 0.63, 0.74, 0.87, 1] }}
        >
          SISTEMA / HABILIDADES
        </motion.p>

        {/* Title */}
        <motion.h2
          id="skills-heading"
          className="section-title"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "1.5rem" }}
        >
          Habilidades
          <br />
          mapeadas.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize:   "clamp(0.88rem, 1.5vw, 1rem)",
            color:      "var(--fg-muted)",
            lineHeight: 1.85,
            maxWidth:   560,
            marginBottom: "3.5rem",
          }}
        >
          Cada projeto exige uma combinação diferente de lógica, estética e
          movimento. Essas são as ferramentas que conectam minhas ideias à
          interface final.
        </motion.p>

        {/* ── Skill grid ─────────────────────────────────── */}
        <div className="skill-cat-grid">
          {CATS.map((cat, catIdx) => {
            const catSkills = SKILLS.filter(s => s.category === cat);
            const color     = CAT_COLOR[cat];
            const glitching = colGlitch[catIdx];

            return (
              <motion.div
                key={cat}
                className={glitching ? "skill-col--glitch" : undefined}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.45 + catIdx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Category header */}
                <div style={{
                  display:       "flex",
                  alignItems:    "center",
                  gap:           "0.55rem",
                  marginBottom:  "1rem",
                  paddingBottom: "0.75rem",
                  borderBottom:  `1px solid ${color}28`,
                }}>
                  <span aria-hidden="true" style={{
                    display:    "inline-block",
                    width:      22,
                    height:     1,
                    background: color,
                    opacity:    0.6,
                    flexShrink: 0,
                  }} />
                  <GlitchText
                    intervalMs={COL_CONFIG[catIdx].interval}
                    burstMs={BURST_MS}
                    style={{
                      fontFamily:    'var(--font-jetbrains), "JetBrains Mono", monospace',
                      fontSize:      "0.52rem",
                      color:         color,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      opacity:       0.85,
                    }}
                  >
                    {cat}
                  </GlitchText>
                </div>

                {/* Chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                  {catSkills.map((skill) => {
                    const idx   = globalIdx++;
                    const isHov = hovered === skill.id;

                    return (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration:  0.3,
                          delay:     0.55 + catIdx * 0.1 + idx * 0.035,
                          type:      "spring",
                          stiffness: 260,
                        }}
                        style={{ position: "relative" }}
                        onMouseEnter={() => setHovered(skill.id)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <motion.div
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.12 }}
                          style={{
                            padding:    "0.35rem 0.75rem",
                            border:     `1px solid ${isHov ? skill.neon : skill.neon + "50"}`,
                            background: `color-mix(in srgb, ${skill.neon} ${isHov ? 11 : 5}%, var(--surface))`,
                            clipPath:   "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                            boxShadow:  isHov
                              ? `0 0 14px ${skill.neon}44, 0 0 28px ${skill.neon}18`
                              : `0 0 4px ${skill.neon}18`,
                            transition: "box-shadow 160ms ease, background 160ms ease, border-color 160ms ease",
                            position:   "relative",
                            cursor:     "default",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <span aria-hidden="true" style={{
                            position: "absolute", top: 2, left: 2,
                            width: 4, height: 4,
                            borderTop:  `1px solid ${skill.neon}`,
                            borderLeft: `1px solid ${skill.neon}`,
                          }} />
                          <span style={{
                            fontFamily:    'var(--font-jetbrains), "JetBrains Mono", monospace',
                            fontSize:      "0.6rem",
                            color:         skill.neon,
                            letterSpacing: "0.09em",
                            textTransform: "uppercase",
                          }}>
                            {skill.name}
                          </span>
                        </motion.div>

                        {/* Tooltip */}
                        <AnimatePresence>
                          {isHov && (
                            <motion.div
                              role="tooltip"
                              initial={{ opacity: 0, y: 6, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0,  scale: 1    }}
                              exit={{    opacity: 0, y: 6, scale: 0.95  }}
                              transition={{ duration: 0.14 }}
                              style={{
                                position:      "absolute",
                                top:           "calc(100% + 8px)",
                                left:          0,
                                background:    "var(--surface)",
                                border:        `1px solid ${skill.neon}38`,
                                padding:       "0.55rem 0.8rem",
                                pointerEvents: "none",
                                zIndex:        30,
                                minWidth:      160,
                                maxWidth:      230,
                                boxShadow:     `0 6px 28px ${skill.neon}14`,
                                clipPath:      "polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 0 100%)",
                              }}
                            >
                              <span style={{
                                display:       "block",
                                fontFamily:    'var(--font-jetbrains), "JetBrains Mono", monospace',
                                fontSize:      "0.46rem",
                                color:         skill.neon,
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                marginBottom:  "0.3rem",
                                opacity:       0.65,
                              }}>
                                {skill.category}
                              </span>
                              <span style={{
                                display:    "block",
                                fontFamily: 'var(--font-inter), Inter, sans-serif',
                                fontSize:   "0.74rem",
                                color:      "var(--fg-muted)",
                                lineHeight: 1.55,
                              }}>
                                {skill.desc}
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
