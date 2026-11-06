import { useState, useEffect, useRef } from 'react';

export function useMouseParallax() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const lastMoveTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced motion strictly
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setOffset({ x: 0, y: 0 });
      return;
    }

    let rafId: number;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: MouseEvent | PointerEvent | TouchEvent) => {
      let clientX: number;
      let clientY: number;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Normalized coordinates (-1 to 1)
      const nx = Math.max(-1, Math.min(1, (clientX - centerX) / (centerX || 1)));
      const ny = Math.max(-1, Math.min(1, (clientY - centerY) / (centerY || 1)));

      mousePosRef.current = {
        x: nx * 24, // Up to 24px horizontal tracking in SVG units
        y: ny * 14, // Up to 14px vertical tracking in SVG units
      };
      lastMoveTimeRef.current = Date.now();
    };

    const loop = () => {
      const now = Date.now();
      const timeSinceMove = now - lastMoveTimeRef.current;

      let targetX = 0;
      let targetY = 0;

      if (mousePosRef.current && timeSinceMove < 2500) {
        // Direct cursor tracking
        targetX = mousePosRef.current.x;
        targetY = mousePosRef.current.y;
      } else {
        // Observant Latverian scanning drift when idle or no cursor
        const t = now * 0.0018;
        targetX = Math.sin(t) * 12;
        targetY = Math.sin(t * 0.7) * 4;
      }

      // Smooth lerp (linear interpolation) for realistic eye saccade & tracking
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;

      setOffset({
        x: Math.round(currentX * 100) / 100,
        y: Math.round(currentY * 100) / 100,
      });

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return offset;
}
