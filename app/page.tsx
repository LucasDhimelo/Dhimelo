import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CyberpunkSkillMap from "@/components/CyberpunkSkillMap";
import WebDevSection from "@/components/WebDevSection";
import DesignSection from "@/components/DesignSection";
import ContactSection from "@/components/ContactSection";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Marquee text="WEB DEVELOPER — GRAPHIC DESIGNER — BRANDING" />
      <AboutSection />
      <CyberpunkSkillMap />
      <WebDevSection />
      <DesignSection />
      <Marquee text="LET'S WORK TOGETHER" baseVelocity={-2.5} />
      <ContactSection />

      <footer
        style={{
          padding: "1.75rem 1.5rem",
          borderTop: "1px solid var(--border-soft)",
          background: "var(--bg-alt)",
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
              color: "var(--fg)",
            }}
          >
            DHIMELO
          </span>

          <span
            style={{
              fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace",
              fontSize: "0.58rem",
              color: "var(--fg-faint)",
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
              color: "var(--fg-faint)",
              letterSpacing: "0.08em",
            }}
          >
            © {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </main>
  );
}



