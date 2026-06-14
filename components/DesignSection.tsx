"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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

const COLS = 4;

export default function DesignSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Each column drifts at a different speed while the gallery scrolls through
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });
  const y0 = useTransform(scrollYProgress, [0, 1], [40, -60]);
  const y1 = useTransform(scrollYProgress, [0, 1], [-30, 70]);
  const y2 = useTransform(scrollYProgress, [0, 1], [60, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const columnY = [y0, y1, y2, y3];

  const columns = Array.from({ length: COLS }, (_, c) =>
    ITEMS.map((item, i) => ({ ...item, i })).filter((item) => item.i % COLS === c)
  );

  return (
    <section id="design" className="section-pad bg-grid" style={{ backgroundColor: "var(--bg)", borderTop: "1px solid var(--border-soft)" }}>
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

        <div ref={galleryRef} className="design-cols">
          {columns.map((col, c) => (
            <motion.div
              key={c}
              style={{
                y: columnY[c],
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                paddingTop: c % 2 === 1 ? "3.5rem" : 0,
                willChange: "transform",
              }}
            >
              {col.map((d) => (
                <motion.div
                  key={d.src}
                  initial={{ opacity: 0, y: 48, clipPath: "inset(10% 0% 10% 0%)" }}
                  whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                  <DesignItem
                    src={d.src}
                    alt={d.alt}
                    title={d.title}
                    index={d.i}
                    onClick={() => setLightboxIndex(d.i)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
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
