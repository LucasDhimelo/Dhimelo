import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WebDevSection from "@/components/WebDevSection";
import DesignSection from "@/components/DesignSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <WebDevSection />
      <DesignSection />
      <ContactSection />

      <footer
        style={{
          padding: "1.75rem 1.5rem",
          borderTop: "1px solid #111",
          background: "#050508",
        }}
      >
        <div
          className="footer-grid container-inner"
          style={{ maxWidth: 1280, margin: "0 auto" }}
        >
          <span
            style={{
              fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              letterSpacing: "-0.04em",
              color: "#e8e8e8",
            }}
          >
            DHIMELO
          </span>

          <span
            style={{
              fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
              fontSize: "0.58rem",
              color: "#555566",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            made with obsession
          </span>

          <span
            style={{
              fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
              fontSize: "0.58rem",
              color: "#555566",
              letterSpacing: "0.08em",
            }}
          >
            © 2025
          </span>
        </div>
      </footer>
    </main>
  );
}



