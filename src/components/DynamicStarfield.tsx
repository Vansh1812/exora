import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Star {
  x: number;
  y: number;
  z: number; // Depth factor (0.2 = far/slow, 1.0 = close/fast)
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  vx: number;
  vy: number;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  color: string;
  thickness: number;
}

const STAR_COLORS = [
  '#ffffff', // Diamond White
  '#ffc58a', // Celestial Peach
  '#6ee7f9', // Cyan Walker Glow
  '#e04dff', // Orbit Magenta
  '#c084fc', // Nebula Lavender
];

/**
 * Dynamic Living Cosmos Starfield
 * Features:
 * - Multi-layer drifting stars with parallax depth
 * - Independent twinkle frequencies and soft chromatic hues
 * - Periodic shooting stars / meteors streaking across the sky
 * - Subtle celestial reaction near cursor position
 * - High-DPI canvas scaling
 * - Automatic pause on hidden tab and static rendering under prefers-reduced-motion
 */
export const DynamicStarfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for subtle interactive cosmic gravity
    const mouse = { x: -1000, y: -1000, active: false };

    // Initialize 130–160 layered stars
    const count = Math.min(150, Math.floor((width * height) / 8000));
    const stars: Star[] = [];

    for (let i = 0; i < count; i++) {
      const z = Math.random() * 0.8 + 0.2;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        size: (Math.random() * 1.5 + 0.6) * z,
        baseAlpha: Math.random() * 0.5 + 0.35,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        // Slow drift upwards and slightly right (cosmic traversal feel)
        vx: (Math.random() * 0.08 - 0.02) * z,
        vy: -(Math.random() * 0.22 + 0.06) * z,
      });
    }

    // Dynamic Meteors (Shooting Stars) pool
    const meteors: Meteor[] = [];

    const spawnMeteor = () => {
      if (isReduced || meteors.length >= 2) return;
      const angle = (Math.PI / 4) + (Math.random() * 0.3 - 0.15); // ~45 degrees diagonal
      const startX = Math.random() * width * 1.2;
      const startY = Math.random() * (height * 0.4);
      meteors.push({
        x: startX,
        y: startY,
        length: Math.random() * 90 + 70,
        speed: Math.random() * 7 + 9,
        angle,
        opacity: 1,
        color: Math.random() > 0.5 ? '#6ee7f9' : '#ffc58a',
        thickness: Math.random() * 1.2 + 0.8,
      });
    };

    // Meteor trigger interval (every 4 to 8 seconds)
    let meteorTimer: NodeJS.Timeout;
    const scheduleNextMeteor = () => {
      const delay = Math.random() * 4000 + 3500;
      meteorTimer = setTimeout(() => {
        spawnMeteor();
        scheduleNextMeteor();
      }, delay);
    };

    if (!isReduced) {
      scheduleNextMeteor();
    }

    // Resize handler with devicePixelRatio support
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Mouse movement listener
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Static render for prefers-reduced-motion
    if (isReduced) {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        ctx.save();
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.baseAlpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    }

    // Animation Loop
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // 1. Update and Render Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Position update
        star.x += star.vx * (dt * 60);
        star.y += star.vy * (dt * 60);

        // Wrap around boundaries
        if (star.y < -10) {
          star.y = height + 10;
          star.x = Math.random() * width;
        } else if (star.y > height + 10) {
          star.y = -10;
        }
        if (star.x < -10) star.x = width + 10;
        else if (star.x > width + 10) star.x = -10;

        // Interactive mouse deflection
        if (mouse.active) {
          const dx = mouse.x - star.x;
          const dy = mouse.y - star.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120;
            star.x -= (dx / dist) * force * 1.5;
            star.y -= (dy / dist) * force * 1.5;
          }
        }

        // Twinkle calculation
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.35;
        const alpha = Math.max(0.15, Math.min(1, star.baseAlpha + twinkle));

        // Draw star with soft radial glow
        ctx.save();
        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = star.size > 1.2 ? 6 : 2;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Update and Render Meteors (Shooting Stars)
      for (let m = meteors.length - 1; m >= 0; m--) {
        const meteor = meteors[m];

        // Move meteor
        const dx = Math.cos(meteor.angle) * meteor.speed;
        const dy = Math.sin(meteor.angle) * meteor.speed;
        meteor.x += dx;
        meteor.y += dy;
        meteor.opacity -= 0.016; // Fade out gradually

        if (meteor.opacity <= 0 || meteor.x > width + 100 || meteor.y > height + 100) {
          meteors.splice(m, 1);
          continue;
        }

        // Tail coordinates
        const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
        const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;

        ctx.save();
        const grad = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.7, `${meteor.color}66`);
        grad.addColorStop(1, meteor.color);

        ctx.strokeStyle = grad;
        ctx.lineWidth = meteor.thickness;
        ctx.globalAlpha = meteor.opacity;
        ctx.shadowColor = meteor.color;
        ctx.shadowBlur = 8;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(meteor.x, meteor.y);
        ctx.stroke();

        // Glowing meteor head
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, meteor.thickness * 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Pause when tab is hidden to save energy
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(meteorTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isReduced]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] select-none"
      aria-hidden="true"
    />
  );
};
