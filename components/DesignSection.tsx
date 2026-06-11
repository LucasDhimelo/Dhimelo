"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import DesignItem from "./DesignItem";
import Lightbox from "./Lightbox";

const ITEMS = [
  { src: "/design/seven-2x.png", alt: "Punk Is Not Dead", title: "Punk Is Not Dead" },
  { src: "/design/re8-2x.png", alt: "Don't You Want", title: "Don't You Want" },
  { src: "/design/magazine.png", alt: "Karma", title: "Karma" },
  { src: "/design/little-dark-age.png", alt: "Little Dark Age", title: "Little Dark Age" },
  { src: "/design/1234-2x.png", alt: "Let Me Ruin You", title: "Let Me Ruin You" },
  { src: "/design/ce.png", alt: "Dhardosi", title: "Dhardosi" },
  { src: "/design/modelo-125x.png", alt: "Narcissist", title: "Narcissist" },
  { src: "/design/cha.png", alt: "Cha", title: "Cha" },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function DesignSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="design" className="section-pad bg-grid" style={{ backgroundColor: "#060608", borderTop: "1px solid #111" }}>
      <div className="container-inner">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
        >
          03 / Design
        </motion.p>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.06 }}
        >
          Graphic Design
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="design-grid"
          style={{ gap: "1px", background: "#FCF00A" }}
        >
          {ITEMS.map((d, i) => (
            <motion.div key={d.src} variants={item} style={{ backgroundColor: "#060608" }}>
              <DesignItem {...d} index={i} onClick={() => setLightboxIndex(i)} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={ITEMS}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + ITEMS.length) % ITEMS.length))}
            onNext={() => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % ITEMS.length))}
          />
        )}
      </AnimatePresence>
    </section>
  );
}



