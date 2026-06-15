"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";

const PROJECTS = [
  {
    id: "01",
    name: "UpwardBR",
    tag: "CORPORATE / WEB",
    url: "https://www.upwardbr.com",
    tech: ["Next.js", "React", "CSS"],
    desc: "Institutional website for an American company — from layout to launch.",
    image: "/projects/upwardbr.png",
    color: "#0066FF",
  },
  {
    id: "02",
    name: "Oakridge",
    tag: "REAL ESTATE / WEB",
    url: "https://oakridge-wheat.vercel.app/",
    tech: ["Next.js", "React", "Tailwind"],
    desc: "Full website built and deployed from scratch.",
    image: "/projects/oakridge.png",
    color: "#4CAF7D",
  },
  {
    id: "03",
    name: "Smart Floor",
    tag: "SERVICES / WEB",
    url: "https://www.smartfloorservices.com/en",
    tech: ["Web", "Design", "UI/UX"],
    desc: "Institutional website for a floor services company.",
    image: "/projects/smartfloor.png",
    color: "#38BDF8",
  },
  {
    id: "04",
    name: "TitanFit",
    tag: "FITNESS / WEB",
    url: "https://titanfit-lilac.vercel.app/",
    tech: ["Next.js", "React", "Tailwind"],
    desc: "Fitness brand website built and deployed from scratch.",
    image: "/projects/titanfit.png",
    color: "#FFD600",
  },
];

const RED = "#FF2A2A";
const ch = (n: number) =>
  `polygon(0 ${n}px,${n}px 0,calc(100% - ${n}px) 0,100% ${n}px,100% calc(100% - ${n}px),calc(100% - ${n}px) 100%,${n}px 100%,0 calc(100% - ${n}px))`;

const randHex = () =>
  "0x" + Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, "0");

// Fake FPS that hovers around 60
const randFps = () => 56 + Math.floor(Math.random() * 5);

export default function WebDevSection() {
  const [active,    setActive]    = useState(0);
  const [dir,       setDir]       = useState(1);
  const [switching, setSwitching] = useState(false);
  const [liveHex,   setLiveHex]   = useState("0xFF3A");
  const [sigBars,   setSigBars]   = useState(5);
  const [fps,       setFps]       = useState(60);
  const [blink,     setBlink]     = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  // Live hex address in status bar
  useEffect(() => {
    const id = setInterval(() => setLiveHex(randHex()), 1800);
    return () => clearInterval(id);
  }, []);

  // FPS readout fluctuation
  useEffect(() => {
    const id = setInterval(() => setFps(randFps()), 1200);
    return () => clearInterval(id);
  }, []);

  // Signal bar occasional drop + recover
  useEffect(() => {
    let recover: ReturnType<typeof setTimeout>;
    const flicker = () => {
      setSigBars(1 + Math.floor(Math.random() * 3));
      recover = setTimeout(() => setSigBars(5), 700 + Math.random() * 400);
    };
    const id = setInterval(flicker, 3200 + Math.random() * 2400);
    return () => { clearInterval(id); clearTimeout(recover); };
  }, []);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  const p   = PROJECTS[active];
  const col = p.color; // project accent color

  const go = (next: number) => {
    if (next === active) return;
    setSwitching(true);
    setTimeout(() => {
      setDir(next > active ? 1 : -1);
      setActive(next);
      setSwitching(false);
    }, 160);
  };
  const prev = () => go((active - 1 + PROJECTS.length) % PROJECTS.length);
  const next = () => go((active + 1) % PROJECTS.length);

  const CORNERS: React.CSSProperties[] = [
    { top: 10,    left: 10,  borderTop:    `1px solid ${col}`, borderLeft:  `1px solid ${col}` },
    { top: 10,    right: 10, borderTop:    `1px solid ${col}`, borderRight: `1px solid ${col}` },
    { bottom: 10, left: 10,  borderBottom: `1px solid ${col}`, borderLeft:  `1px solid ${col}` },
    { bottom: 10, right: 10, borderBottom: `1px solid ${col}`, borderRight: `1px solid ${col}` },
  ];

  return (
    <section
      ref={sectionRef}
      id="web"
      className="section-pad bg-grid"
      style={{ backgroundColor: "var(--bg-alt)", borderTop: "1px solid var(--border-soft)" }}
    >
      <div className="container-inner">

        {/* Header */}
        <motion.p
          className="section-label"
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          02 / Web Dev
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.06 }}
          style={{ marginBottom: "3rem" }}
        >
          Web<br />Development
        </motion.h2>

        {/* Monitor + Info */}
        <div className="monitor-layout">

          {/* ── Monitor ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            {/* Outer bezel — pulsing neon glow in project color */}
            <motion.div
              animate={{
                boxShadow: [
                  `0 0 40px ${col}12, inset 0 0 0 1px ${col}10`,
                  `0 0 80px ${col}35, 0 0 20px ${col}18, inset 0 0 0 1px ${col}28`,
                  `0 0 40px ${col}12, inset 0 0 0 1px ${col}10`,
                ],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "100%",
                background: "var(--surface-deep)",
                border: "1px solid var(--border-strong)",
                clipPath: ch(10),
                position: "relative",
              }}
            >

              {/* ── Top status bar ── */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0.5rem 1rem", borderBottom: "1px solid var(--border)", gap: "0.75rem",
              }}>
                {/* Label */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexShrink: 0 }}>
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1], boxShadow: [`0 0 6px ${RED}`, `0 0 2px ${RED}`, `0 0 6px ${RED}`] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: "50%", background: RED, display: "inline-block" }}
                  />
                  <span style={{ fontFamily: 'var(--font-jetbrains),"JetBrains Mono",monospace', fontSize: "0.42rem", color: RED, letterSpacing: "0.15em", opacity: 0.85 }}>
                    DHIMELO.STUDIO
                  </span>
                </div>

                {/* Center: live hex + signal bars */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <motion.span
                    key={liveHex}
                    initial={{ opacity: 0 }} animate={{ opacity: 0.65 }} transition={{ duration: 0.3 }}
                    style={{ fontFamily: 'var(--font-jetbrains),"JetBrains Mono",monospace', fontSize: "0.38rem", color: col, letterSpacing: "0.1em" }}
                  >
                    {liveHex}
                  </motion.span>
                  <span style={{ fontFamily: 'var(--font-jetbrains),"JetBrains Mono",monospace', fontSize: "0.38rem", color: "var(--fg-faint)", letterSpacing: "0.1em" }}>
                    HDMI·1080p
                  </span>
                  {/* Signal bars */}
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "1.5px" }}>
                    {[1, 2, 3, 4, 5].map(n => (
                      <motion.span
                        key={n}
                        animate={{ opacity: n <= sigBars ? 1 : 0.12, background: n <= sigBars ? "#00FF41" : "var(--border-strong)" }}
                        transition={{ duration: 0.15 }}
                        style={{ display: "block", width: 2.5, height: 3 + n * 1.5, background: "#00FF41", borderRadius: "1px" }}
                      />
                    ))}
                  </div>
                </div>

                {/* FPS + LIVE */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                  <span style={{ fontFamily: 'var(--font-jetbrains),"JetBrains Mono",monospace', fontSize: "0.38rem", color: "var(--fg-faint)", letterSpacing: "0.08em" }}>
                    {fps}<span style={{ opacity: 0.5 }}>fps</span>
                  </span>
                  <motion.span
                    animate={{ opacity: [1, 0.25, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    style={{ width: 5, height: 5, borderRadius: "50%", background: "#00FF41", display: "inline-block" }}
                  />
                  <span style={{ fontFamily: 'var(--font-jetbrains),"JetBrains Mono",monospace', fontSize: "0.4rem", color: "#00FF41", letterSpacing: "0.12em" }}>
                    LIVE
                  </span>
                </div>
              </div>

              {/* ── Screen ── */}
              <div style={{ position: "relative", aspectRatio: "16/9", background: "#000", overflow: "hidden" }}>

                {/* Screenshot — with glitch-slide on switch */}
                <AnimatePresence mode="wait" initial={false}>
                  {!switching && (
                    <motion.div
                      key={active}
                      style={{ position: "absolute", inset: 0 }}
                      initial={{ opacity: 0, x: dir * 60, filter: "blur(4px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{   opacity: 0, x: -dir * 60, filter: "blur(4px)" }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={p.image}
                        alt={`Preview of ${p.name}`}
                        fill
                        sizes="(max-width:900px) 100vw, 58vw"
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Glitch flash during project switch */}
                <AnimatePresence>
                  {switching && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.9, 0.4, 0.8, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.16, times: [0, 0.2, 0.5, 0.7, 1] }}
                      style={{
                        position: "absolute", inset: 0, zIndex: 9,
                        background: "repeating-linear-gradient(0deg, rgba(255,42,42,0.3) 0px, rgba(0,0,0,0.8) 1px, rgba(0,0,0,0.8) 3px, rgba(0,255,65,0.15) 3px, rgba(0,0,0,0.8) 4px)",
                        mixBlendMode: "overlay",
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Project color tint — bottom vignette gradient */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active + "-tint"}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    aria-hidden="true"
                    style={{
                      position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
                      background: `linear-gradient(to top, ${col}28 0%, ${col}10 30%, transparent 65%)`,
                    }}
                  />
                </AnimatePresence>

                {/* Static scanlines */}
                <div aria-hidden="true" style={{
                  position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
                  background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.1) 2px,rgba(0,0,0,0.1) 4px)",
                }} />

                {/* Moving scanline sweep */}
                <motion.div
                  aria-hidden="true"
                  animate={{ top: ["-18%", "115%"] }}
                  transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
                  style={{
                    position: "absolute", left: 0, right: 0, height: "14%",
                    background: "linear-gradient(to bottom,transparent,rgba(255,255,255,0.025) 40%,rgba(255,255,255,0.06) 50%,rgba(255,255,255,0.025) 60%,transparent)",
                    zIndex: 3, pointerEvents: "none",
                  }}
                />

                {/* HUD corner brackets — slow opacity pulse in project color */}
                {CORNERS.map((s, i) => (
                  <motion.div
                    key={i}
                    aria-hidden="true"
                    animate={{ opacity: [0.45, 1, 0.45] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.55, ease: "easeInOut" }}
                    style={{ position: "absolute", width: 16, height: 16, zIndex: 4, ...s }}
                  />
                ))}

                {/* Top-right HUD readout */}
                <div aria-hidden="true" style={{
                  position: "absolute", top: 10, right: 30, zIndex: 4,
                  fontFamily: 'var(--font-jetbrains),"JetBrains Mono",monospace',
                  fontSize: "0.35rem", color: col, letterSpacing: "0.08em", opacity: 0.7,
                  lineHeight: 1.6, textAlign: "right",
                }}>
                  <div>1920×1080</div>
                  <motion.div
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {fps}fps
                  </motion.div>
                </div>

                {/* Tag overlay */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active + "-tag"}
                    initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute", bottom: 12, left: 12, zIndex: 5,
                      background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)",
                      border: `1px solid ${col}50`, padding: "0.2rem 0.55rem",
                      clipPath: ch(4),
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-jetbrains),"JetBrains Mono",monospace', fontSize: "0.4rem", color: col, letterSpacing: "0.18em", opacity: 0.95 }}>
                      {p.tag}
                    </span>
                  </motion.div>
                </AnimatePresence>

                {/* Hover → visit site */}
                <a
                  href={p.url} target="_blank" rel="noopener noreferrer"
                  aria-label={`Visit ${p.name}`}
                  style={{ position: "absolute", inset: 0, zIndex: 5, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", transition: "background 220ms" }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(0,0,0,0.5)";
                    (e.currentTarget.querySelector(".scta") as HTMLElement).style.opacity = "1";
                    (e.currentTarget.querySelector(".scta") as HTMLElement).style.transform = "scale(1)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                    (e.currentTarget.querySelector(".scta") as HTMLElement).style.opacity = "0";
                    (e.currentTarget.querySelector(".scta") as HTMLElement).style.transform = "scale(0.94)";
                  }}
                >
                  <span className="scta" style={{
                    opacity: 0, transform: "scale(0.94)",
                    transition: "opacity 220ms ease, transform 220ms ease",
                    fontFamily: 'var(--font-jetbrains),"JetBrains Mono",monospace',
                    fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase",
                    color: RED, border: `1px solid ${RED}`, padding: "0.55rem 1.4rem",
                    background: "rgba(0,0,0,0.65)", clipPath: ch(6),
                  }}>
                    VISIT SITE →
                  </span>
                </a>
              </div>

              {/* ── Bottom bezel ── */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0.45rem 1rem", borderTop: "1px solid var(--border)", gap: "1rem",
              }}>
                {/* Left: project counter */}
                <span style={{
                  fontFamily: 'var(--font-jetbrains),"JetBrains Mono",monospace',
                  fontSize: "0.38rem", color: "var(--fg-faint)", letterSpacing: "0.12em",
                  flexShrink: 0,
                }}>
                  {p.id}/{String(PROJECTS.length).padStart(2, "0")}
                  <span style={{ opacity: blink ? 1 : 0, marginLeft: "1px", color: RED }}>_</span>
                </span>

                {/* Center: nav dots */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  {PROJECTS.map((_, i) => (
                    <button
                      key={i} onClick={() => go(i)} aria-label={`Project ${i + 1}`}
                      style={{
                        width: i === active ? 28 : 6, height: 4,
                        background: i === active ? RED : "var(--border-strong)",
                        border: "none", cursor: "pointer", padding: 0,
                        transition: "width 320ms ease, background 200ms",
                        clipPath: ch(2),
                      }}
                    />
                  ))}
                </div>

                {/* Right: signal readout */}
                <span style={{
                  fontFamily: 'var(--font-jetbrains),"JetBrains Mono",monospace',
                  fontSize: "0.38rem", color: "var(--fg-faint)", letterSpacing: "0.1em",
                  flexShrink: 0,
                }}>
                  SIG:{sigBars * 20}%
                </span>
              </div>
            </motion.div>

            {/* Stand */}
            <div style={{ width: 72, height: 18, background: "var(--surface)", borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)", margin: "0 auto" }} />
            <div style={{ width: "min(200px, 40%)", height: 6, margin: "0 auto", background: "var(--surface)", clipPath: "polygon(8px 0,calc(100% - 8px) 0,100% 100%,0 100%)", borderTop: "1px solid var(--border-strong)" }} />
          </motion.div>

          {/* ── Project info ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.32 }}
            style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "2rem" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28 }}
                style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
              >
                {/* Counter */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontFamily: 'var(--font-jetbrains),"JetBrains Mono",monospace', fontSize: "0.62rem", color: RED, letterSpacing: "0.12em" }}>
                    {p.id} / {String(PROJECTS.length).padStart(2, "0")}
                  </span>
                  <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
                </div>

                {/* Tag */}
                <span style={{ fontFamily: 'var(--font-jetbrains),"JetBrains Mono",monospace', fontSize: "0.46rem", color: "var(--fg-faint)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  {p.tag}
                </span>

                {/* Name */}
                <h3 style={{ fontFamily: "var(--font-space-grotesk),'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem,3vw,2.8rem)", letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--fg)", margin: 0 }}>
                  {p.name}
                </h3>

                {/* Desc */}
                <p style={{ fontFamily: "var(--font-inter),Inter,sans-serif", fontSize: "0.92rem", color: "var(--fg-muted)", lineHeight: 1.7, maxWidth: 380, margin: 0 }}>
                  {p.desc}
                </p>

                {/* Tech */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {p.tech.map(t => <span key={t} className="chip">{t}</span>)}
                </div>

                {/* Visit link */}
                <a
                  href={p.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", fontFamily: 'var(--font-jetbrains),"JetBrains Mono",monospace', fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: RED, borderBottom: "1px solid rgba(255,42,42,0.3)", paddingBottom: "0.3rem", alignSelf: "flex-start", transition: "border-color 200ms, gap 200ms" }}
                  onMouseEnter={e => { e.currentTarget.style.borderBottomColor = RED; e.currentTarget.style.gap = "1rem"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderBottomColor = "rgba(255,42,42,0.3)"; e.currentTarget.style.gap = "0.6rem"; }}
                >
                  VISIT SITE →
                </a>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next */}
            <div style={{ display: "flex", gap: "0.6rem" }}>
              {[{ label: "←", fn: prev }, { label: "→", fn: next }].map(btn => (
                <button
                  key={btn.label} onClick={btn.fn}
                  style={{ width: 44, height: 44, background: "var(--surface)", border: "1px solid var(--border-strong)", color: "var(--fg-muted)", fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", clipPath: ch(6), transition: "background 180ms, color 180ms, border-color 180ms" }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.background = "rgba(255,42,42,0.08)"; el.style.color = RED; el.style.borderColor = RED; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = "var(--surface)"; el.style.color = "var(--fg-muted)"; el.style.borderColor = "var(--border-strong)"; }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Project selector tabs ──────────────────────── */}
        <div style={{ display: "flex", marginTop: "2.5rem", borderTop: "1px solid var(--border)" }}>
          {PROJECTS.map((proj, i) => (
            <button
              key={i} onClick={() => go(i)}
              style={{ flex: 1, padding: "0.85rem 0.5rem", background: "none", border: "none", borderBottom: `2px solid ${i === active ? RED : "transparent"}`, cursor: "pointer", fontFamily: 'var(--font-jetbrains),"JetBrains Mono",monospace', fontSize: "0.46rem", color: i === active ? RED : "var(--fg-faint)", letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "center", transition: "color 200ms, border-color 200ms" }}
            >
              <span style={{ display: "block", opacity: 0.55, marginBottom: "0.25rem", fontSize: "0.38rem" }}>{proj.id}</span>
              {proj.name}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
