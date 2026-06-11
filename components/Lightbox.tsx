"use client";

import Image from "next/image";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Item {
  src: string;
  alt: string;
  title?: string;
}

interface Props {
  items: Item[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ items, index, onClose, onPrev, onNext }: Props) {
  const current = items[index];
  const num = `${String(index + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Visualizando: ${current.title}`}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.96)",
        zIndex: 9000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 1.5rem 3rem",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            color: "#FCF00A",
            letterSpacing: "0.1em",
          }}
        >
          {num}
        </span>

        {current.title && (
          <span
            style={{
              fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: "0.8rem",
              color: "#e8e8e8",
              letterSpacing: "-0.02em",
            }}
          >
            {current.title}
          </span>
        )}

        <button
          onClick={onClose}
          aria-label="Fechar"
          style={{
            background: "none",
            border: "1px solid #2a2a2a",
            color: "#888",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.75rem",
            letterSpacing: "0.02em",
            transition: "border-color 150ms, color 150ms",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#FCF00A";
            e.currentTarget.style.color = "#FCF00A";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#1a1a22";
            e.currentTarget.style.color = "#888";
          }}
        >
          ESC
        </button>
      </div>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            maxWidth: "min(92vw, 1080px)",
            maxHeight: "76vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={current.src}
            alt={current.alt}
            width={1400}
            height={1050}
            quality={90}
            priority
            style={{
              maxWidth: "100%",
              maxHeight: "76vh",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Nav arrows */}
      {[
        { side: "left" as const, label: "Anterior", action: onPrev, arrow: "←" },
        { side: "right" as const, label: "Próximo", action: onNext, arrow: "→" },
      ].map(({ side, label, action, arrow }) => (
        <button
          key={side}
          onClick={(e) => { e.stopPropagation(); action(); }}
          aria-label={label}
          style={{
            position: "absolute",
            [side]: "1.25rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "1px solid #2a2a2a",
            color: "#666",
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
            transition: "border-color 150ms, color 150ms",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#FCF00A";
            e.currentTarget.style.color = "#FCF00A";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#1a1a22";
            e.currentTarget.style.color = "#666";
          }}
        >
          {arrow}
        </button>
      ))}
    </motion.div>
  );
}

