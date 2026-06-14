"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, useState } from "react";
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <polyline points="2,4 12,13 22,4"/>
  </svg>
);

const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

const IconLinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const IconUpwork = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
  </svg>
);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const headlineRef = useRef<HTMLDivElement>(null);
  // Headline lines slide in opposite directions as the section scrolls through
  const { scrollYProgress } = useScroll({
    target: headlineRef,
    offset: ["start end", "end start"],
  });
  const xLeft = useTransform(scrollYProgress, [0, 1], [-80, 40]);
  const xRight = useTransform(scrollYProgress, [0, 1], [80, -40]);

  return (
    <section id="contato" className="section-pad bg-grid" style={{ backgroundColor: "var(--bg-alt)", borderTop: "1px solid var(--border-soft)" }}>
      <div className="container-inner">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p variants={fadeUp} className="section-label">
            04 / Contact
          </motion.p>

          {/* Impact headline — lines drift horizontally with scroll */}
          <motion.div ref={headlineRef} variants={fadeUp} style={{ marginBottom: "3.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                fontWeight: 700,
                letterSpacing: "-0.055em",
                lineHeight: 0.92,
                userSelect: "none",
              }}
            >
              <motion.span
                style={{
                  x: xLeft,
                  display: "block",
                  fontSize: "clamp(3rem, 9vw, 7rem)",
                  color: "var(--fg)",
                  willChange: "transform",
                }}
              >
                LET'S
              </motion.span>
              <motion.span
                style={{
                  x: xRight,
                  display: "block",
                  fontSize: "clamp(3rem, 9vw, 7rem)",
                  color: "transparent",
                  WebkitTextStroke: "1.5px var(--accent-text)",
                  willChange: "transform",
                }}
              >
                BUILD
              </motion.span>
              <motion.span
                style={{
                  x: xLeft,
                  display: "block",
                  fontSize: "clamp(3rem, 9vw, 7rem)",
                  color: "var(--fg)",
                  willChange: "transform",
                }}
              >
                SOMETHING?
              </motion.span>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
                fontSize: "0.62rem",
                color: "var(--fg-muted)",
                letterSpacing: "0.12em",
                marginTop: "1.5rem",
                textTransform: "uppercase",
              }}
            >
              open to projects / freelance / collaborations
            </p>
          </motion.div>

          <div className="contact-grid">
            {/* Links */}
            <motion.div variants={fadeUp}>
              <p
                style={{
                  fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
                  fontSize: "0.58rem",
                  color: "var(--accent-text)",
                  letterSpacing: "0.14em",
                  marginBottom: "1.75rem",
                  textTransform: "uppercase",
                }}
              >
                Contacts
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  { label: "Email", value: "lucasdemeloferreira02@gmail.com", href: "mailto:lucasdemeloferreira02@gmail.com", icon: <IconMail /> },
                  { label: "Instagram", value: "@dhimelo", href: "https://www.instagram.com/dhimelo/", icon: <IconInstagram /> },
                  { label: "LinkedIn", value: "lucas-melo", href: "https://www.linkedin.com/in/lucas-melo-9139b221a/", icon: <IconLinkedIn /> },
                  { label: "Upwork", value: "dhimelo", href: "https://www.upwork.com/freelancers/~0138866a403e25eecc?mp_source=share", icon: <IconUpwork /> },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.25rem",
                      textDecoration: "none",
                      padding: "1.1rem 0",
                      borderBottom: "1px solid var(--border-soft)",
                      transition: "padding-left 200ms ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.paddingLeft = "0.5rem";
                      const lbl = e.currentTarget.querySelector<HTMLElement>(".lbl");
                      if (lbl) lbl.style.color = "var(--accent-text)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.paddingLeft = "0";
                      const lbl = e.currentTarget.querySelector<HTMLElement>(".lbl");
                      if (lbl) lbl.style.color = "var(--fg-muted)";
                    }}
                  >
                    <span
                      className="lbl"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "var(--fg-muted)",
                        minWidth: 110,
                        transition: "color 150ms ease",
                      }}
                    >
                      {c.icon}
                      <span style={{
                        fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
                        fontSize: "0.58rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}>
                        {c.label}
                      </span>
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                        fontWeight: 500,
                        fontSize: "0.9rem",
                        color: "var(--fg)",
                        letterSpacing: "-0.01em",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c.value}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div variants={fadeUp}>
              <p
                style={{
                  fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
                  fontSize: "0.58rem",
                  color: "var(--accent-text)",
                  letterSpacing: "0.14em",
                  marginBottom: "1.75rem",
                  textTransform: "uppercase",
                }}
              >
                Direct message
              </p>

              {sent ? (
                <div
                  style={{
                    padding: "2.5rem",
                    border: "1px solid var(--accent)",
                    textAlign: "center",
                    background: "color-mix(in srgb, var(--accent) 4%, transparent)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      color: "var(--fg)",
                      letterSpacing: "-0.02em",
                      fontSize: "1.1rem",
                    }}
                  >
                    Message sent.
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
                      fontSize: "0.62rem",
                      color: "var(--fg-faint)",
                      marginTop: "0.5rem",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Response within 48h.
                  </p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  <input type="text" name="name" placeholder="your name" required className="input-line" autoComplete="name" />
                  <input type="email" name="email" placeholder="your email" required className="input-line" autoComplete="email" />
                  <textarea name="message" placeholder="your message" required rows={4} className="input-line" style={{ minHeight: 90 }} />

                  <button
                    type="submit"
                    style={{
                      fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      letterSpacing: "0.08em",
                      color: "#060608",
                      background: "var(--accent)",
                      border: "none",
                      padding: "1rem 2.25rem",
                      textTransform: "uppercase",
                      alignSelf: "flex-start",
                      transition: "background 160ms ease, transform 100ms ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--fg)"; e.currentTarget.style.color = "var(--bg)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "#060608"; }}
                    onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.97)"; }}
                    onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    Send →
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}






