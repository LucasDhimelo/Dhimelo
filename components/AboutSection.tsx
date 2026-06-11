"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
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
  return (
    <section id="sobre" className="section-pad bg-grid" style={{ backgroundColor: "#060608", borderTop: "1px solid #111" }}>
      <div className="container-inner">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
        >
          <div className="about-grid">
            {/* Photo */}
            <motion.div variants={fadeUp} style={{ position: "relative", width: "100%", maxWidth: 280 }}>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "3/4",
                  background: "#08080c",
                  overflow: "hidden",
                  border: "1px solid #1a1a1a",
                }}
              >
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
                {/* Red corner accent */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 28,
                    height: 28,
                    borderTop: "2px solid #FCF00A",
                    borderLeft: "2px solid #FCF00A",
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
                    borderBottom: "2px solid #FCF00A",
                    borderRight: "2px solid #FCF00A",
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
                  border: "1px solid #FCF00A",
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
                <span style={{ color: "#FCF00A" }}>Dhimelo</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
                  color: "#c8c8d0",
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
                  color: "#c8c8d0",
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
              background: "#FCF00A",
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
                style={{ padding: "2.5rem 1.75rem", background: "#060608", textAlign: "center" }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
                    letterSpacing: "-0.05em",
                    color: "#e8e8e8",
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
                    color: "#FCF00A",
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
                    color: "#999aab",
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







