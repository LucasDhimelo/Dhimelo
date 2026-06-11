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
        border: `1px solid ${hovered ? "#FCF00A" : "#1a1a22"}`,
        background: "#0e0e12",
        overflow: "hidden",
        transition: "border-color 200ms ease",
        cursor: "none",
      }}
    >
      {/* Image box */}
      <div style={{ position: "relative", aspectRatio: "3/4" }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={85}
          style={{
            objectFit: "cover",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 500ms ease",
          }}
        />

        {/* Hover overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "0.5rem",
            opacity: hovered ? 1 : 0,
            transition: "opacity 260ms ease",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: "#FCF00A",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            View art
          </span>
          {title && (
            <p
              style={{
                fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "#e8e8e8",
                letterSpacing: "-0.02em",
                textAlign: "center",
                padding: "0 1rem",
                lineHeight: 1.2,
              }}
            >
              {title}
            </p>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.6rem 0.875rem",
          borderTop: "1px solid #1a1a1a",
          background: "#08080c",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
            fontSize: "0.62rem",
            color: "#FCF00A",
            letterSpacing: "0.08em",
          }}
        >
          {num}
        </span>
        <span
          style={{
            fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: "0.75rem",
            color: "#c8c8d0",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}


