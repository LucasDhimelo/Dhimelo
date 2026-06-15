"use client";

import { useEffect, useRef } from "react";

// Stripped-down character set — cleaner, more legible
const CHARS = "01アイウエカキクサシスセタチツ0123456789ABCDEF".split("");
const rndCh = () => CHARS[Math.floor(Math.random() * CHARS.length)];

interface Col {
  x:     number;
  head:  number;
  speed: number;
  trail: number;
  r: number; g: number; b: number;
}
interface Slice { y: number; h: number; dx: number; life: number; }

// Three shades of Matrix green
function colColor(rng: number): [number, number, number] {
  if (rng < 0.6) return [0,   255, 65];  // bright #00FF41
  if (rng < 0.85) return [0,  200, 50];  // mid
  return                 [57, 255, 20];   // neon #39FF14
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
    let raf: number;
    let frame = 0;
    let nextSlice = 180;

    const FS     = 16;   // larger font → fewer, more spaced columns
    const GAP    = 6;    // extra breathing room between columns
    const STRIDE = FS + GAP;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const spawn = () => {
      const isMobile = window.innerWidth < 768;
      // ~40% fewer columns via wider stride; cap at 90 for desktop
      const n = Math.min(Math.floor(canvas.width / STRIDE), isMobile ? 30 : 90);
      cols = Array.from({ length: n }, (_, i) => {
        const [r, g, b] = colColor(Math.random());
        return {
          x:     i * STRIDE,
          head:  -Math.random() * canvas.height * 2,   // staggered start
          speed: 1.2 + Math.random() * 2,              // calmer speed range
          trail: 5  + Math.floor(Math.random() * 12),  // shorter trail
          r, g, b,
        };
      });
    };

    const draw = () => {
      // Faster fade → cleaner, less smear
      ctx.fillStyle = "rgba(6, 6, 8, 0.22)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font      = `${FS}px "JetBrains Mono", monospace`;
      ctx.textAlign = "center";
      frame++;

      // ── Occasional glitch slice (subtle, infrequent) ──
      if (frame >= nextSlice) {
        const n = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < n; i++) {
          slices.push({
            y:    Math.floor(Math.random() * canvas.height),
            h:    1 + Math.floor(Math.random() * 8),
            dx:   (Math.random() > 0.5 ? 1 : -1) * (4 + Math.random() * 24),
            life: 1 + Math.floor(Math.random() * 3),
          });
        }
        nextSlice = frame + 120 + Math.floor(Math.random() * 180);
      }
      slices = slices.filter(s => {
        if (s.life <= 0) return false;
        try {
          const img = ctx.getImageData(0, s.y, canvas.width, s.h);
          ctx.fillStyle = "rgba(6,6,8,1)";
          ctx.fillRect(0, s.y, canvas.width, s.h);
          ctx.putImageData(img, s.dx, s.y);
        } catch { /* guard */ }
        s.life--;
        return true;
      });

      // ── Character rain ────────────────────────────────
      cols.forEach(col => {
        col.head += col.speed;
        if (col.head - col.trail * FS > canvas.height) {
          col.head  = -FS * (1 + Math.random() * 8);
          col.speed = 1.2 + Math.random() * 2;
          col.trail = 5 + Math.floor(Math.random() * 12);
        }

        for (let t = 0; t <= col.trail; t++) {
          const cy = col.head - t * FS;
          if (cy < -FS || cy > canvas.height + FS) continue;

          if (t === 0) {
            // Head: bright white
            ctx.fillStyle = "rgba(255,255,255,0.95)";
          } else {
            // Trail: steep exponential fade — bright near head, gone fast
            const ratio = t / col.trail;
            const a = Math.max(0, (1 - ratio * ratio) * 0.7);
            ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${a})`;
          }

          ctx.fillText(rndCh(), col.x + FS / 2, cy);
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
