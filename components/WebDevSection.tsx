"use client";

import { motion, type Variants } from "framer-motion";
import ProjectCard from "./ProjectCard";

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

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function WebDevSection() {
  return (
    <section id="web" className="section-pad bg-grid" style={{ backgroundColor: "#050508", borderTop: "1px solid #111" }}>
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
        >
          Web
          <br />Development
        </motion.h2>

        {/* Red 1px grid lines between cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "1px",
            background: "#FCF00A",
          }}
        >
          {PROJECTS.map((p) => (
            <motion.div key={p.name + p.url} variants={item} style={{ backgroundColor: "#050508" }}>
              <ProjectCard {...p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}




