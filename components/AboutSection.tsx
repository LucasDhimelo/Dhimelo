"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import CountUp from "./CountUp";

const SKILLS = [
  "React", "Next.js", "TypeScript", "Node.js",
  "Figma", "Photoshop", "Illustrator",
  "Branding", "Motion Design", "HTML / CSS",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  // Photo drifts slower than the page — subtle depth as the section scrolls by
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [48, -48]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={sectionRef} id="sobre" className="section-pad bg-grid" style={{ backgroundColor: "var(--bg)", borderTop: "1px solid var(--border-soft)" }}>
      <div className="container-inner">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
        >
          <div className="about-grid">
            {/* Photo — parallax against the scroll */}
            <motion.div variants={fadeUp} style={{ y: photoY, position: "relative", width: "100%", maxWidth: 280 }}>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "3/4",
                  background: "var(--surface-deep)",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                }}
              >
                <motion.div style={{ y: imageY, position: "absolute", inset: "-8% 0", willChange: "transform" }}>
                  <Image
                    src="/eu.png"
                    alt="Photo of Dhimelo"
                    fill
                    sizes="(max-width: 768px) 80vw, 280px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center top",
                      filter: "grayscale(15%) contrast(1.05)",
                    }}
                    priority
                  />
                </motion.div>
                {/* Red corner accent */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 28,
                    height: 28,
                    borderTop: "2px solid var(--accent)",
                    borderLeft: "2px solid var(--accent)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 28,
                    height: 28,
                    borderBottom: "2px solid var(--accent)",
                    borderRight: "2px solid var(--accent)",
                    pointerEvents: "none",
                  }}
                />
              </div>
              {/* Offset red frame */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: -8,
                  right: -8,
                  width: "100%",
                  height: "100%",
                  border: "1px solid var(--accent)",
                  opacity: 0.35,
                  pointerEvents: "none",
                  zIndex: -1,
                }}
              />
            </motion.div>

            {/* Text */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <motion.p variants={fadeUp} className="section-label">
                01 / About
              </motion.p>

              <motion.h2 variants={fadeUp} className="section-title" style={{ marginBottom: "2rem" }}>
                Who is
                <br />
                <span style={{ color: "var(--accent-text)" }}>Dhimelo</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
                  color: "var(--fg-muted)",
                  lineHeight: 1.85,
                  marginBottom: "1.1rem",
                  maxWidth: 500,
                }}
              >
                Web developer and graphic designer based in Brazil. I work at the intersection of code and aesthetics — turning brands into a real market presence.
              </motion.p>

              <motion.p
                variants={fadeUp}
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
                  color: "var(--fg-muted)",
                  lineHeight: 1.85,
                  marginBottom: "2.5rem",
                  maxWidth: 500,
                }}
              >
                Dou visibilidade a empresários que têm um negócio sério mas ainda
                não são levados a sério. Sites que convertem, identidades que ficam
                na cabeça, design que faz o negócio ser visto.
              </motion.p>

              <motion.div
                variants={fadeUp}
                style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}
              >
                {SKILLS.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Stats — red separator lines */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1px",
              background: "var(--accent)",
              marginTop: "5rem",
            }}
          >
            {[
              { value: 4, suffix: "+", sub: "years", label: "of experience" },
              { value: 30, suffix: "+", sub: "projects", label: "delivered" },
              { value: 3, suffix: "", sub: "countries", label: "served" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{ padding: "2.5rem 1.75rem", background: "var(--bg)", textAlign: "center" }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
                    letterSpacing: "-0.05em",
                    color: "var(--fg)",
                    lineHeight: 1,
                    marginBottom: "0.2rem",
                  }}
                >
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    color: "var(--accent-text)",
                    letterSpacing: "0.08em",
                    marginBottom: "0.15rem",
                  }}
                >
                  {stat.sub}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
                    fontSize: "0.58rem",
                    color: "var(--fg-faint)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}







