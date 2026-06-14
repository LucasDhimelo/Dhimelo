"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const PROJECTS = [
  {
    name: "UpwardBR",
    url: "https://www.upwardbr.com",
    tech: ["Next.js", "React", "CSS"],
    desc: "Institutional website for an American company — from layout to launch.",
    image: "/projects/upwardbr.png",
  },
  {
    name: "Oakridge",
    url: "https://oakridge-wheat.vercel.app/",
    tech: ["Next.js", "React", "Tailwind"],
    desc: "Full website built and deployed from scratch.",
    image: "/projects/oakridge.png",
  },
  {
    name: "Smart Floor Services",
    url: "https://www.smartfloorservices.com/en",
    tech: ["Web", "Design", "UI/UX"],
    desc: "Institutional website for a floor services company.",
    image: "/projects/smartfloor.png",
  },
  {
    name: "TitanFit",
    url: "https://titanfit-lilac.vercel.app/",
    tech: ["Next.js", "React", "Tailwind"],
    desc: "Fitness brand website built and deployed from scratch.",
    image: "/projects/titanfit.png",
  },
];

interface CardProps {
  project: (typeof PROJECTS)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function StackCard({ project, index, total, progress }: CardProps) {
  // Earlier cards shrink as the next one slides over them
  const targetScale = 1 - (total - 1 - index) * 0.045;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      style={{
        height: "100dvh",
        position: "sticky",
        top: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 0.25rem",
      }}
    >
      <motion.div
        className="stack-card-grid"
        style={{
          scale,
          top: `calc(-2vh + ${index * 22}px)`,
          position: "relative",
          width: "100%",
          maxWidth: 1100,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          overflow: "hidden",
          transformOrigin: "top",
          willChange: "transform",
        }}
      >
        {/* Preview */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View project ${project.name}`}
          className="stack-card-media"
          style={{ display: "block", overflow: "hidden", background: "var(--surface-deep)" }}
        >
          <Image
            src={project.image}
            alt={`Preview of ${project.name}`}
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            style={{ objectFit: "cover", transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          />
        </a>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.1rem",
            padding: "clamp(1.5rem, 3.5vw, 3rem)",
            borderTop: "1px solid var(--border)",
          }}
          className="stack-card-content"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span
              style={{
                fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
                fontSize: "0.62rem",
                color: "var(--accent-text)",
                letterSpacing: "0.12em",
              }}
            >
              {num} / {String(total).padStart(2, "0")}
            </span>
            <span aria-hidden="true" style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>

          <h3
            style={{
              fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "var(--fg)",
            }}
          >
            {project.name}
          </h3>

          <p
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: "0.92rem",
              color: "var(--fg-muted)",
              lineHeight: 1.7,
              maxWidth: 420,
            }}
          >
            {project.desc}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {project.tech.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              marginTop: "0.5rem",
              textDecoration: "none",
              fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent-text)",
              borderBottom: "1px solid var(--accent-soft)",
              paddingBottom: "0.35rem",
              alignSelf: "flex-start",
              transition: "border-color 200ms ease, gap 200ms ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderBottomColor = "var(--accent-text)"; e.currentTarget.style.gap = "1rem"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderBottomColor = "var(--accent-soft)"; e.currentTarget.style.gap = "0.6rem"; }}
          >
            Visit site <span aria-hidden="true">→</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default function WebDevSection() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="web" className="bg-grid" style={{ backgroundColor: "var(--bg-alt)", borderTop: "1px solid var(--border-soft)", padding: "6rem 1.5rem 0" }}>
      <div className="container-inner">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
        >
          02 / Web Dev
        </motion.p>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.06 }}
          style={{ marginBottom: 0 }}
        >
          Web
          <br />Development
        </motion.h2>

        {/* Stacking cards — each project pins and the next slides over it */}
        <div ref={container}>
          {PROJECTS.map((p, i) => (
            <StackCard
              key={p.name}
              project={p}
              index={i}
              total={PROJECTS.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
