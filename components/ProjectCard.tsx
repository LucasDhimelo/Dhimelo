"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  name: string;
  url: string;
  tech: string[];
  desc: string;
  image?: string;
}

export default function ProjectCard({ name, url, tech, desc, image }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        border: `1px solid ${hovered ? "#FCF00A" : "#1a1a22"}`,
        background: "#0e0e12",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "border-color 200ms ease, transform 200ms ease",
        overflow: "hidden",
      }}
      aria-label={`View project ${name}`}
    >
      {/* Preview */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16/9",
          background: "#0e0e14",
          overflow: "hidden",
        }}
      >
        {image ? (
          <Image
            src={image}
            alt={`Preview of ${name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#0e0e12",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                color: "#666677",
                letterSpacing: "0.1em",
              }}
            >
              {name.toLowerCase()}
            </span>
          </div>
        )}
        {/* Red overlay on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(204,34,34,0.06)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 200ms",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "1.25rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
            gap: "0.5rem",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#e8e8e8",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            {name}
          </h3>
          <span
            style={{
              color: "#FCF00A",
              fontSize: "1rem",
              lineHeight: 1,
              flexShrink: 0,
              marginTop: 2,
              transition: "transform 200ms",
              transform: hovered ? "translate(2px, -2px)" : "none",
            }}
          >
            ↗
          </span>
        </div>

        <p
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "0.82rem",
            color: "#c8c8d0",
            marginBottom: "1rem",
            lineHeight: 1.6,
          }}
        >
          {desc}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
          {tech.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                padding: "0.2rem 0.55rem",
                border: "1px solid #2e2e3a",
                color: "#c8c8d0",
                letterSpacing: "0.06em",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}




