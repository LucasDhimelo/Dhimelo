"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  title?: string;
  index: number;
  onClick: () => void;
}

export default function DesignItem({ src, alt, title, index, onClick }: Props) {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Ver ${title} em tela cheia`}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        border: `1px solid ${hovered ? "var(--accent)" : "var(--border)"}`,
        background: "var(--surface)",
        overflow: "hidden",
        transition: "border-color 250ms ease",
        cursor: "none",
      }}
    >
      <div style={{ position: "relative", aspectRatio: "3/4" }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          quality={85}
          style={{
            objectFit: "cover",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />

        {/* Bottom gradient — always present, deepens on hover */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: hovered
              ? "linear-gradient(to top, rgba(5,5,8,0.95) 0%, rgba(5,5,8,0.4) 35%, transparent 65%)"
              : "linear-gradient(to top, rgba(5,5,8,0.85) 0%, rgba(5,5,8,0.2) 25%, transparent 50%)",
            transition: "background 300ms ease",
          }}
        />

        {/* Info — sits on top of the image */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "0.9rem 1rem",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <span
              style={{
                fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
                fontSize: "0.58rem",
                color: "#FF2A2A",
                letterSpacing: "0.12em",
                display: "block",
                marginBottom: "0.3rem",
              }}
            >
              {num}
            </span>
            <p
              style={{
                fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "0.88rem",
                color: "#e8e8e8",
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </p>
          </div>

          <span
            aria-hidden="true"
            style={{
              color: "#FF2A2A",
              fontSize: "1.1rem",
              lineHeight: 1,
              flexShrink: 0,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translate(0, 0)" : "translate(-6px, 6px)",
              transition: "opacity 250ms ease, transform 250ms ease",
            }}
          >
            ↗
          </span>
        </div>
      </div>
    </div>
  );
}
