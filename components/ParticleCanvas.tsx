"use client";

import { useEffect, useRef } from "react";

// ── Characters used in the rain ────────────────────────────
const CHARS = "0123456789ABCDEF>[]{}|/\\!=?@#$%^&*アイウエカキクサシスセ░▒▓█▄▀".split("");
const rndCh = () => CHARS[Math.floor(Math.random() * CHARS.length)];

// ── Types ────────────────────────────────────────────────
interface Col {
  x:        number;
  head:     number;   // y of leading character (px)
  speed:    number;   // px per frame
  trail:    number;   // number of visible characters
  r: number; g: number; b: number; // column neon color
}
interface Slice { y: number; h: number; dx: number; life: number; }
interface Block  { x: number; y: number; w: number; h: number; color: string; life: number; }

// Hue distribution: cyan 48% | red 37% | green 15%
function colColor(rng: number): [number, number, number] {
  if (rng < 0.48) return [0,   212, 255]; // cyan
  if (rng < 0.85) return [255, 42,  42 ]; // red
  return               [57,  255, 20 ];   // green
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols:   Col[]   = [];
    let slices: Slice[] = [];
    let blocks: Block[] = [];
    let raf: number;
    let frame = 0;
    let nextSlice  = 90;
    let nextBlock  = 45;

    const isMobile = () => window.innerWidth < 768;

    const resize = () => {
      const p = canvas.parentElement;
      canvas.width  = p?.offsetWidth  ?? window.innerWidth;
      canvas.height = p?.offsetHeight ?? window.innerHeight;
    };

    const FONT_SIZE = 13;

    const spawn = () => {
      const n = Math.min(Math.floor(canvas.width / FONT_SIZE), 210);
      cols = Array.from({ length: n }, (_, i) => {
        const [r, g, b] = colColor(Math.random());
        return {
          x:     i * FONT_SIZE,
          head:  -Math.random() * canvas.height * 1.8,
          speed: 0.8 + Math.random() * 2.8,
          trail: 6  + Math.floor(Math.random() * 22),
          r, g, b,
        };
      });
    };

    const draw = () => {
      // Fade instead of clear — creates the neon persistence glow trail
      ctx.fillStyle = "rgba(6, 6, 8, 0.14)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font      = `${FONT_SIZE}px "JetBrains Mono", monospace`;
      ctx.textAlign = "center";
      frame++;

      // ── Glitch slices ────────────────────────────────
      if (frame >= nextSlice) {
        const n = 2 + Math.floor(Math.random() * 6);
        for (let i = 0; i < n; i++) {
          slices.push({
            y:    Math.floor(Math.random() * canvas.height),
            h:    2 + Math.floor(Math.random() * 18),
            dx:   (Math.random() > 0.5 ? 1 : -1) * (6 + Math.random() * 48),
            life: 2 + Math.floor(Math.random() * 4),
          });
        }
        nextSlice = frame + 50 + Math.floor(Math.random() * 100);
      }
      slices = slices.filter(s => {
        if (s.life <= 0) return false;
        try {
          const img = ctx.getImageData(0, s.y, canvas.width, s.h);
          ctx.fillStyle = "rgba(6,6,8,1)";
          ctx.fillRect(0, s.y, canvas.width, s.h);
          ctx.putImageData(img, s.dx, s.y);
        } catch { /* cross-origin guard */ }
        s.life--;
        return true;
      });

      // ── Corruption blocks ─────────────────────────────
      if (frame >= nextBlock) {
        const n = isMobile() ? 3 : 6 + Math.floor(Math.random() * 7);
        for (let i = 0; i < n; i++) {
          blocks.push({
            x:     Math.random() * canvas.width,
            y:     Math.random() * canvas.height,
            w:     3 + Math.random() * 35,
            h:     1 + Math.random() * 9,
            color: Math.random() > 0.5 ? "#FF2A2A" : "#00D4FF",
            life:  1 + Math.floor(Math.random() * 3),
          });
        }
        nextBlock = frame + 20 + Math.floor(Math.random() * 55);
      }
      blocks = blocks.filter(b => {
        ctx.globalAlpha = b.life * 0.28;
        ctx.fillStyle   = b.color;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.globalAlpha = 1;
        b.life--;
        return b.life > 0;
      });

      // ── Character rain ────────────────────────────────
      cols.forEach(col => {
        col.head += col.speed;
        if (col.head - col.trail * FONT_SIZE > canvas.height) {
          col.head  = -FONT_SIZE * (1 + Math.random() * 10);
          col.speed = 0.8 + Math.random() * 2.8;
          col.trail = 6 + Math.floor(Math.random() * 22);
        }

        for (let t = 0; t <= col.trail; t++) {
          const cy = col.head - t * FONT_SIZE;
          if (cy < -FONT_SIZE || cy > canvas.height + FONT_SIZE) continue;

          if (t === 0) {
            // Head: blazing white
            ctx.fillStyle = "rgba(255,255,255,0.96)";
          } else if (t === 1) {
            // Sub-head: near-white tint of column color
            const a = 0.85;
            ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${a})`;
          } else {
            const a = Math.max(0, (1 - t / col.trail) * 0.75);
            ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${a})`;
          }

          ctx.fillText(rndCh(), col.x + FONT_SIZE / 2, cy);
        }
      });

      raf = requestAnimationFrame(draw);
    };

    const onResize = () => { resize(); spawn(); };
    resize();
    spawn();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}
