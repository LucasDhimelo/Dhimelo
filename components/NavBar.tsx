"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const LINKS = [
  { label: "About", href: "#sobre" },
  { label: "Web Dev", href: "#web" },
  { label: "Design", href: "#design" },
  { label: "Contact", href: "#contato" },
];

export default function NavBar() {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < 80 || y < lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          key="nav"
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          exit={{ y: -80 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            background: "var(--nav-bg)",
            backdropFilter: "blur(14px)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              maxWidth: 1340,
              margin: "0 auto",
              padding: "1.1rem 1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Wordmark */}
            <a
              href="#"
              style={{
                fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "1.15rem",
                letterSpacing: "-0.05em",
                color: "var(--fg)",
                textDecoration: "none",
              }}
            >
              DHIMELO
            </a>

            {/* Desktop links */}
            <nav aria-label="Navegação" className="nav-desktop" style={{ gap: "2.25rem", alignItems: "center" }}>
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  style={{
                    fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
                    fontSize: "0.72rem",
                    color: "var(--fg-muted)",
                    textDecoration: "none",
                    letterSpacing: "0.06em",
                    transition: "color 150ms",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Mobile: theme toggle + hamburger */}
            <div className="nav-mobile-btn" style={{ alignItems: "center", gap: "1rem" }}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                style={{
                  background: "none",
                  border: "none",
                  padding: "4px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                {([0, 1, 2] as const).map((i) => (
                  <span
                    key={i}
                    style={{
                      display: "block",
                      width: 22,
                      height: 1,
                      background: "var(--fg)",
                      transition: "transform 200ms, opacity 150ms",
                      ...(menuOpen && i === 0 ? { transform: "rotate(45deg) translate(5px, 5px)" } : {}),
                      ...(menuOpen && i === 1 ? { opacity: 0 } : {}),
                      ...(menuOpen && i === 2 ? { transform: "rotate(-45deg) translate(5px, -5px)" } : {}),
                    }}
                  />
                ))}
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ overflow: "hidden", borderTop: "1px solid var(--border)" }}
              >
                <nav
                  aria-label="Navegação mobile"
                  style={{
                    padding: "1.25rem 1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                  }}
                >
                  {LINKS.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
                        fontSize: "0.875rem",
                        color: "var(--fg)",
                        textDecoration: "none",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {l.label}
                    </a>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}





