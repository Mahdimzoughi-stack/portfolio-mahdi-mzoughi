import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  layer: 1 | 2 | 3; // depth layer
  alpha: number;     // base opacity
  pulsePhase: number;
  pulseSpeed: number;
}

interface Pulse {
  fromIdx: number;
  toIdx: number;
  t: number;        // 0 → 1 progress
  speed: number;
}

interface AmbientOrb {
  x: number;
  y: number;
  r: number;
  alpha: number;
  vx: number;
  vy: number;
  hue: number; // 190-220 (cyan/blue range)
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PARTICLE_CONFIG = {
  desktop: { count: 90, connectionDist: 155, maxConn: 4 },
  tablet:  { count: 55, connectionDist: 130, maxConn: 3 },
  mobile:  { count: 30, connectionDist: 100, maxConn: 2 },
};

const PULSE_MAX       = 6;
const PULSE_SPAWN_P   = 0.004; // probability per frame of spawning a pulse
const PULSE_RADIUS    = 2.5;
const LAYER_ALPHA     = { 1: 0.25, 2: 0.65, 3: 0.9 } as const;
const LAYER_SPEED     = { 1: 0.12, 2: 0.25, 3: 0.38 } as const;
const LAYER_SIZE      = { 1: [1, 1.8], 2: [1.2, 2.4], 3: [1.8, 3.2] } as const;
const ORBS            = 4;

// ─── Helper ──────────────────────────────────────────────────────────────────

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getConfig(width: number) {
  if (width < 640)  return PARTICLE_CONFIG.mobile;
  if (width < 1024) return PARTICLE_CONFIG.tablet;
  return PARTICLE_CONFIG.desktop;
}

function mkParticle(w: number, h: number): Particle {
  const layer = ([1, 1, 2, 2, 2, 3][Math.floor(Math.random() * 6)] ?? 2) as 1 | 2 | 3;
  const [sMin, sMax] = LAYER_SIZE[layer];
  return {
    x: rand(0, w),
    y: rand(0, h),
    vx: (Math.random() - 0.5) * LAYER_SPEED[layer],
    vy: (Math.random() - 0.5) * LAYER_SPEED[layer],
    radius: rand(sMin, sMax),
    layer,
    alpha: LAYER_ALPHA[layer],
    pulsePhase: rand(0, Math.PI * 2),
    pulseSpeed: rand(0.008, 0.02),
  };
}

function mkOrb(w: number, h: number): AmbientOrb {
  return {
    x: rand(0.1, 0.9) * w,
    y: rand(0.1, 0.9) * h,
    r: rand(120, 260),
    alpha: rand(0.04, 0.09),
    vx: (Math.random() - 0.5) * 0.08,
    vy: (Math.random() - 0.5) * 0.08,
    hue: rand(190, 220),
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

interface NeuralUniverseBackgroundProps {
  className?: string;
}

export default function NeuralUniverseBackground({ className = '' }: NeuralUniverseBackgroundProps) {
  const { theme } = useTheme();
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const stateRef   = useRef<{
    particles: Particle[];
    pulses: Pulse[];
    orbs: AmbientOrb[];
    mouse: { x: number; y: number; active: boolean };
    raf: number;
    width: number;
    height: number;
    isDark: boolean;
    reducedMotion: boolean;
    isMobile: boolean;
  }>({
    particles: [],
    pulses: [],
    orbs: [],
    mouse: { x: -9999, y: -9999, active: false },
    raf: 0,
    width: 0,
    height: 0,
    isDark: true,
    reducedMotion: false,
    isMobile: false,
  });

  // Keep theme in sync with the ref so the draw loop always has the latest value
  useEffect(() => {
    stateRef.current.isDark = theme === 'dark';
  }, [theme]);

  const init = useCallback((canvas: HTMLCanvasElement) => {
    const s     = stateRef.current;
    const dpr   = window.devicePixelRatio || 1;
    const rect  = canvas.getBoundingClientRect();
    const w     = rect.width;
    const h     = rect.height;

    canvas.width  = w * dpr;
    canvas.height = h * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    s.width  = w;
    s.height = h;
    s.isMobile = w < 640;

    const cfg   = getConfig(w);
    s.particles = Array.from({ length: cfg.count }, () => mkParticle(w, h));
    s.orbs      = Array.from({ length: ORBS },       () => mkOrb(w, h));
    s.pulses    = [];
  }, []);

  const draw = useCallback(() => {
    const s      = stateRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width: W, height: H, isDark, particles, pulses, orbs, mouse, isMobile } = s;
    const cfg = getConfig(W);

    // ── background ──────────────────────────────────────────────────────────
    ctx.clearRect(0, 0, W, H);

    // ── ambient orbs ────────────────────────────────────────────────────────
    for (const orb of orbs) {
      // drift
      orb.x += orb.vx;
      orb.y += orb.vy;
      if (orb.x < -orb.r) orb.x = W + orb.r;
      if (orb.x > W + orb.r) orb.x = -orb.r;
      if (orb.y < -orb.r) orb.y = H + orb.r;
      if (orb.y > H + orb.r) orb.y = -orb.r;

      const alpha = isDark ? orb.alpha : orb.alpha * 0.4;
      const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
      const c1 = `hsla(${orb.hue}, 85%, 60%, ${alpha})`;
      const c2 = `hsla(${orb.hue}, 85%, 60%, 0)`;
      gradient.addColorStop(0, c1);
      gradient.addColorStop(1, c2);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // ── update + draw particles ──────────────────────────────────────────────
    for (const p of particles) {
      // move
      if (!s.reducedMotion) {
        p.x += p.vx;
        p.y += p.vy;
        // soft boundary wrap with margin
        if (p.x < -20)     p.x = W + 20;
        if (p.x > W + 20)  p.x = -20;
        if (p.y < -20)     p.y = H + 20;
        if (p.y > H + 20)  p.y = -20;

        // subtle mouse repulsion on layer 2+3 (desktop only)
        if (!isMobile && mouse.active && p.layer >= 2) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = 90;
          if (dist < influence && dist > 0) {
            const force = (1 - dist / influence) * 0.3;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
            // dampen
            p.vx *= 0.92;
            p.vy *= 0.92;
          }
        }

        // clamp velocity
        const maxV = LAYER_SPEED[p.layer] * 2.5;
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > maxV) { p.vx = (p.vx / spd) * maxV; p.vy = (p.vy / spd) * maxV; }

        // pulse phase
        p.pulsePhase += p.pulseSpeed;
      }

      // opacity pulsation
      const pulse = Math.sin(p.pulsePhase) * 0.15 + 1;
      const baseAlpha = isDark ? p.alpha : p.alpha * 0.55;
      const finalAlpha = Math.min(1, baseAlpha * pulse);

      // colour
      const hue = p.layer === 1 ? 210 : p.layer === 3 ? 190 : 200;
      const sat = isDark ? 80 : 60;
      const lit = isDark ? 70 : 50;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

      // tiny glow for layer 2+3
      if (p.layer >= 2) {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.8);
        g.addColorStop(0, `hsla(${hue},${sat}%,${lit}%,${finalAlpha})`);
        g.addColorStop(1, `hsla(${hue},${sat}%,${lit}%,0)`);
        ctx.fillStyle = g;
        ctx.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2);
      } else {
        ctx.fillStyle = `hsla(${hue},${sat}%,${lit}%,${finalAlpha})`;
      }
      ctx.fill();
    }

    // ── connections ──────────────────────────────────────────────────────────
    const { connectionDist, maxConn } = cfg;
    const connDist2 = connectionDist * connectionDist;

    for (let i = 0; i < particles.length; i++) {
      const pi = particles[i];
      let connCount = 0;

      for (let j = i + 1; j < particles.length && connCount < maxConn; j++) {
        const pj = particles[j];
        const dx = pi.x - pj.x;
        const dy = pi.y - pj.y;
        const d2 = dx * dx + dy * dy;

        if (d2 < connDist2) {
          const dist   = Math.sqrt(d2);
          const ratio  = 1 - dist / connectionDist;
          // blend layer alphas
          const lAlpha = (LAYER_ALPHA[pi.layer] + LAYER_ALPHA[pj.layer]) * 0.5;
          const baseA  = isDark ? lAlpha * 0.55 : lAlpha * 0.22;
          const alpha  = ratio * ratio * baseA;

          const hue = 200;
          ctx.beginPath();
          ctx.moveTo(pi.x, pi.y);
          ctx.lineTo(pj.x, pj.y);
          ctx.strokeStyle = `hsla(${hue},85%,65%,${alpha})`;
          ctx.lineWidth   = 0.6 + ratio * 0.5;
          ctx.stroke();

          connCount++;
        }
      }

      // mouse proximity connection (desktop only)
      if (!isMobile && mouse.active && pi.layer >= 2) {
        const dx = pi.x - mouse.x;
        const dy = pi.y - mouse.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        const mouseConnDist = 110;
        if (d < mouseConnDist) {
          const ratio = 1 - d / mouseConnDist;
          const alpha = ratio * ratio * (isDark ? 0.5 : 0.22);
          ctx.beginPath();
          ctx.moveTo(pi.x, pi.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `hsla(190,90%,65%,${alpha})`;
          ctx.lineWidth   = 0.5 + ratio * 0.8;
          ctx.stroke();
        }
      }
    }

    // ── neural pulses ────────────────────────────────────────────────────────
    // spawn new pulses
    if (!s.reducedMotion && pulses.length < PULSE_MAX && Math.random() < PULSE_SPAWN_P) {
      const i = Math.floor(Math.random() * particles.length);
      const pi = particles[i];
      // find a connected neighbour
      let best = -1;
      let bestD = Infinity;
      for (let j = 0; j < particles.length; j++) {
        if (j === i) continue;
        const dx = pi.x - particles[j].x;
        const dy = pi.y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < connectionDist && d < bestD) { bestD = d; best = j; }
      }
      if (best >= 0) {
        pulses.push({ fromIdx: i, toIdx: best, t: 0, speed: rand(0.008, 0.018) });
      }
    }

    // draw + advance pulses
    for (let k = pulses.length - 1; k >= 0; k--) {
      const pulse = pulses[k];
      const pf = particles[pulse.fromIdx];
      const pt = particles[pulse.toIdx];
      if (!pf || !pt) { pulses.splice(k, 1); continue; }

      pulse.t += pulse.speed;
      if (pulse.t >= 1) { pulses.splice(k, 1); continue; }

      const x = pf.x + (pt.x - pf.x) * pulse.t;
      const y = pf.y + (pt.y - pf.y) * pulse.t;

      // fade in / out
      const fadeAlpha = Math.sin(pulse.t * Math.PI);
      const a = fadeAlpha * (isDark ? 0.85 : 0.5);

      const g2 = ctx.createRadialGradient(x, y, 0, x, y, PULSE_RADIUS * 2);
      g2.addColorStop(0, `hsla(185,100%,75%,${a})`);
      g2.addColorStop(1, `hsla(185,100%,75%,0)`);

      ctx.beginPath();
      ctx.arc(x, y, PULSE_RADIUS * 2, 0, Math.PI * 2);
      ctx.fillStyle = g2;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, PULSE_RADIUS * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(190,100%,90%,${a})`;
      ctx.fill();
    }

    s.raf = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const s = stateRef.current;
    s.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Init
    init(canvas);

    // Start loop
    s.raf = requestAnimationFrame(draw);

    // Resize
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(s.raf);
      init(canvas);
      s.raf = requestAnimationFrame(draw);
    });
    ro.observe(canvas.parentElement ?? canvas);

    // Mouse
    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      s.mouse.x = e.clientX - rect.left;
      s.mouse.y = e.clientY - rect.top;
      s.mouse.active = true;
    };
    const handleLeave = () => { s.mouse.active = false; };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMove, { passive: true });
      parent.addEventListener('mouseleave', handleLeave);
    }

    // Visibility pause
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(s.raf);
      } else {
        s.raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(s.raf);
      ro.disconnect();
      if (parent) {
        parent.removeEventListener('mousemove', handleMove);
        parent.removeEventListener('mouseleave', handleLeave);
      }
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [init, draw]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}

