import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import NavBar from "@/components/NavBar";
import SmoothScroll from "@/components/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dhimelo — Web Developer & Graphic Designer",
  description:
    "Portfólio de Dhimelo — Web Developer e Graphic Designer baseado no Brasil. Especializado em e-commerce, interfaces web e design gráfico.",
  keywords: ["web developer", "graphic designer", "next.js", "shopify", "brasil", "dhimelo"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SmoothScroll />
        <div className="noise-overlay" aria-hidden="true" />
        <Cursor />
        <ScrollProgress />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
