export interface Skill {
  id: string;
  name: string;
  category: "Core Development" | "Frontend" | "Design" | "Workflow";
  x: number; // % from left (0–100)
  y: number; // % from top  (0–100)
  neon: string;
  desc: string;
}

export type ConnectionWeight = "primary" | "secondary";

export const SKILLS: Skill[] = [
  // ── Workflow (far left, tidy triangle) ───────────────
  { id: "git",             name: "Git",             category: "Workflow",         x: 4,  y: 34, neon: "#39FF14", desc: "Controle de versão e histórico do projeto." },
  { id: "github",          name: "GitHub",          category: "Workflow",         x: 11, y: 52, neon: "#39FF14", desc: "Colaboração, deploy e gestão de código." },
  { id: "vscode",          name: "VS Code",         category: "Workflow",         x: 4,  y: 70, neon: "#39FF14", desc: "Ambiente de desenvolvimento e produtividade." },
  // ── Core Development (compact diamond) ───────────────
  { id: "typescript",      name: "TypeScript",      category: "Core Development", x: 22, y: 13, neon: "#FF3B30", desc: "Código mais seguro, organizado e previsível." },
  { id: "react",           name: "React",           category: "Core Development", x: 13, y: 33, neon: "#FF3B30", desc: "Interfaces dinâmicas e componentizadas." },
  { id: "javascript",      name: "JavaScript",      category: "Core Development", x: 31, y: 33, neon: "#FF3B30", desc: "Interatividade, comportamento e experiência." },
  { id: "nextjs",          name: "Next.js",         category: "Core Development", x: 22, y: 54, neon: "#FF3B30", desc: "Aplicações modernas, rápidas e escaláveis." },
  { id: "nodejs",          name: "Node.js",         category: "Core Development", x: 22, y: 75, neon: "#FF3B30", desc: "Base para lógica, APIs e integrações." },
  // ── Frontend / Interface (center) ────────────────────
  { id: "html",            name: "HTML",            category: "Frontend",         x: 44, y: 13, neon: "#00D4FF", desc: "Estrutura semântica e precisão visual." },
  { id: "framermotion",    name: "Framer Motion",   category: "Frontend",         x: 43, y: 31, neon: "#00D4FF", desc: "Movimento como parte da experiência digital." },
  { id: "css",             name: "CSS",             category: "Frontend",         x: 46, y: 50, neon: "#00D4FF", desc: "Estilo, layout e identidade visual na web." },
  { id: "tailwind",        name: "Tailwind",        category: "Frontend",         x: 49, y: 69, neon: "#00D4FF", desc: "Estilização rápida com consistência visual." },
  { id: "responsivedesign",name: "Responsive",      category: "Frontend",         x: 59, y: 51, neon: "#00D4FF", desc: "Interfaces adaptadas a qualquer dispositivo." },
  // ── Design (right) ───────────────────────────────────
  { id: "uidesign",        name: "UI Design",       category: "Design",           x: 67, y: 15, neon: "#FF2D55", desc: "Interfaces com clareza, intenção e detalhe." },
  { id: "figma",           name: "Figma",           category: "Design",           x: 75, y: 28, neon: "#FF2D55", desc: "Prototipação, UI e direção visual." },
  { id: "webdesign",       name: "Web Design",      category: "Design",           x: 68, y: 50, neon: "#FF2D55", desc: "Design orientado à web, conversão e identidade." },
  { id: "branding",        name: "Branding",        category: "Design",           x: 73, y: 68, neon: "#FF2D55", desc: "Identidade visual com intenção e personalidade." },
  // ── Adobe / Visual tools (far right) ─────────────────
  { id: "photoshop",       name: "Photoshop",       category: "Design",           x: 88, y: 15, neon: "#FF2D55", desc: "Tratamento, composição e manipulação visual." },
  { id: "illustrator",     name: "Illustrator",     category: "Design",           x: 89, y: 44, neon: "#FF2D55", desc: "Vetores, marcas e elementos gráficos." },
  { id: "canva",           name: "Canva",           category: "Design",           x: 86, y: 68, neon: "#FF2D55", desc: "Criação visual rápida e acessível." },
];

// [a, b, weight] — no duplicates
export const CONNECTIONS: [string, string, ConnectionWeight][] = [
  // ── Primary — main backbone ───────────────────────────
  // Workflow triangle
  ["git",         "github",           "primary"],
  ["github",      "vscode",           "primary"],
  ["git",         "vscode",           "primary"],
  // Core Dev diamond
  ["typescript",  "react",            "primary"],
  ["typescript",  "javascript",       "primary"],
  ["react",       "javascript",       "primary"],
  ["react",       "nextjs",           "primary"],
  ["javascript",  "nextjs",           "primary"],
  ["nextjs",      "nodejs",           "primary"],
  // Frontend chain
  ["html",        "css",              "primary"],
  ["css",         "tailwind",         "primary"],
  // Core → Frontend
  ["react",       "framermotion",     "primary"],
  // Design hub (Figma)
  ["figma",       "uidesign",         "primary"],
  ["figma",       "webdesign",        "primary"],
  ["figma",       "branding",         "primary"],
  // Adobe pair
  ["photoshop",   "illustrator",      "primary"],

  // ── Secondary — supporting connections ────────────────
  // Workflow → Core Dev bridges
  ["github",      "react",            "secondary"],
  ["vscode",      "nextjs",           "secondary"],
  // Core Dev internal
  ["javascript",  "nodejs",           "secondary"],
  // Core Dev → Frontend bridges
  ["javascript",  "framermotion",     "secondary"],
  ["javascript",  "html",             "secondary"],
  // Frontend internal
  ["css",         "responsivedesign", "secondary"],
  ["tailwind",    "responsivedesign", "secondary"],
  // Frontend → Design bridges
  ["responsivedesign", "webdesign",   "secondary"],
  ["responsivedesign", "uidesign",    "secondary"],
  // Design internal
  ["uidesign",    "webdesign",        "secondary"],
  ["webdesign",   "branding",         "secondary"],
  ["photoshop",   "figma",            "secondary"],
  ["illustrator", "canva",            "secondary"],
  ["illustrator", "branding",         "secondary"],
  ["canva",       "branding",         "secondary"],
];
