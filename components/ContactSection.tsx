"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const IconMail = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <polyline points="2,4 12,13 22,4"/>
  </svg>
);

const IconInstagram = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

const IconLinkedIn = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const IconUpwork = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
  </svg>
);

const CHANNELS = [
  {
    ch: "01",
    platform: "EMAIL",
    icon: (s: number) => <IconMail size={s} />,
    value: "lucasdemeloferreira02@gmail.com",
    cta: "SEND MESSAGE",
    href: "mailto:lucasdemeloferreira02@gmail.com",
    color: "#FF2A2A",
  },
  {
    ch: "02",
    platform: "INSTAGRAM",
    icon: (s: number) => <IconInstagram size={s} />,
    value: "@dhimelo",
    cta: "FOLLOW",
    href: "https://www.instagram.com/dhimelo/",
    color: "#FF0080",
  },
  {
    ch: "03",
    platform: "LINKEDIN",
    icon: (s: number) => <IconLinkedIn size={s} />,
    value: "lucas-melo",
    cta: "CONNECT",
    href: "https://www.linkedin.com/in/lucas-melo-9139b221a/",
    color: "#0088FF",
  },
  {
    ch: "04",
    platform: "UPWORK",
    icon: (s: number) => <IconUpwork size={s} />,
    value: "dhimelo",
    cta: "HIRE ME",
    href: "https://www.upwork.com/freelancers/~0138866a403e25eecc?mp_source=share",
    color: "#39FF14",
  },
];

const ch = (n: number) =>
  `polygon(0 ${n}px,${n}px 0,calc(100% - ${n}px) 0,100% ${n}px,100% calc(100% - ${n}px),calc(100% - ${n}px) 100%,${n}px 100%,0 calc(100% - ${n}px))`;

export default function ContactSection() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headlineRef,
    offset: ["start end", "end start"],
  });
  const xLeft  = useTransform(scrollYProgress, [0, 1], [-80, 40]);
  const xRight = useTransform(scrollYProgress, [0, 1], [80, -40]);

  return (
    <section
      id="contato"
      className="section-pad bg-grid"
      style={{ backgroundColor: "var(--bg-alt)", borderTop: "1px solid var(--border-soft)" }}
    >
      <div className="container-inner">

        {/* Label */}
        <motion.p
          className="section-label"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
        >
          04 / Contact
        </motion.p>

        {/* Headline */}
        <div ref={headlineRef} style={{ marginBottom: "4.5rem" }}>
          <h2 style={{
            fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
            fontWeight: 700,
            letterSpacing: "-0.055em",
            lineHeight: 0.92,
            userSelect: "none",
          }}>
            <motion.span style={{ x: xLeft, display: "block", fontSize: "clamp(3rem, 9vw, 7rem)", color: "var(--fg)", willChange: "transform" }}>
              LET'S
            </motion.span>
            <motion.span style={{ x: xRight, display: "block", fontSize: "clamp(3rem, 9vw, 7rem)", color: "transparent", WebkitTextStroke: "1.5px var(--accent-text)", willChange: "transform" }}>
              BUILD
            </motion.span>
            <motion.span style={{ x: xLeft, display: "block", fontSize: "clamp(3rem, 9vw, 7rem)", color: "var(--fg)", willChange: "transform" }}>
              SOMETHING?
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
              fontSize: "0.62rem",
              color: "var(--fg-faint)",
              letterSpacing: "0.14em",
              marginTop: "1.75rem",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <span style={{ display: "inline-block", width: 4, height: 4, borderRadius: "50%", background: "#FF2A2A", flexShrink: 0 }} />
            OPEN TO PROJECTS · FREELANCE · COLLABORATIONS
          </motion.p>
        </div>

        {/* Channel cards */}
        <div className="channel-grid">
          {CHANNELS.map((c, i) => (
            <motion.a
              key={c.ch}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -7 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.4rem",
                padding: "1.75rem 1.5rem",
                background: "var(--surface)",
                border: `1px solid ${c.color}30`,
                clipPath: ch(8),
                textDecoration: "none",
                position: "relative",
                overflow: "hidden",
                boxShadow: `0 0 20px ${c.color}08`,
                transition: "border-color 240ms ease, box-shadow 240ms ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${c.color}70`;
                e.currentTarget.style.boxShadow = `0 0 48px ${c.color}22, 0 0 8px ${c.color}10`;
                const cta = e.currentTarget.querySelector<HTMLElement>(".ch-cta");
                if (cta) { cta.style.color = c.color; cta.style.letterSpacing = "0.2em"; }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${c.color}30`;
                e.currentTarget.style.boxShadow = `0 0 20px ${c.color}08`;
                const cta = e.currentTarget.querySelector<HTMLElement>(".ch-cta");
                if (cta) { cta.style.color = `${c.color}80`; cta.style.letterSpacing = "0.14em"; }
              }}
            >
              {/* Radial background glow */}
              <div aria-hidden="true" style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: `radial-gradient(ellipse at top left, ${c.color}14 0%, transparent 65%)`,
              }} />

              {/* Top accent bar */}
              <div aria-hidden="true" style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: c.color,
                boxShadow: `0 0 14px ${c.color}, 0 0 28px ${c.color}60`,
              }} />

              {/* Channel header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
                <span style={{
                  fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
                  fontSize: "0.44rem", letterSpacing: "0.18em",
                  color: c.color, opacity: 0.8,
                }}>
                  CH/ {c.ch}
                </span>
                <span style={{
                  fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
                  fontSize: "0.42rem", letterSpacing: "0.14em",
                  color: c.color, opacity: 0.5, textTransform: "uppercase",
                }}>
                  {c.platform}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: `${c.color}25`, position: "relative" }} />

              {/* Icon chip + value */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", position: "relative" }}>
                {/* Colored icon chip */}
                <div style={{
                  width: 44, height: 44, flexShrink: 0,
                  background: `${c.color}15`,
                  border: `1px solid ${c.color}35`,
                  clipPath: ch(6),
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: c.color,
                }}>
                  {c.icon(20)}
                </div>

                <span style={{
                  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(0.78rem, 1.2vw, 0.95rem)",
                  color: "var(--fg)",
                  letterSpacing: "-0.01em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>
                  {c.value}
                </span>
              </div>

              {/* CTA */}
              <div
                className="ch-cta"
                style={{
                  fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
                  fontSize: "0.48rem",
                  letterSpacing: "0.14em",
                  color: `${c.color}80`,
                  textTransform: "uppercase",
                  position: "relative",
                  marginTop: "auto",
                  transition: "color 220ms ease, letter-spacing 220ms ease",
                }}
              >
                {c.cta} →
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
