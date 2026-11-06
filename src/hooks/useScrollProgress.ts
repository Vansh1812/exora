import { useState, useEffect, RefObject } from 'react';

export function useScrollProgress(targetRef?: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        if (targetRef && targetRef.current) {
          const el = targetRef.current;
          const rect = el.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          // Calculate progress from when element enters bottom to when it leaves top
          const totalDistance = rect.height + windowHeight;
          const currentDistance = windowHeight - rect.top;
          const clamped = Math.max(0, Math.min(1, currentDistance / totalDistance));
          setProgress(clamped);
        } else {
          // Global window progress
          const scrollY = window.scrollY || window.pageYOffset;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const clamped = maxScroll > 0 ? Math.max(0, Math.min(1, scrollY / maxScroll)) : 0;
          setProgress(clamped);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [targetRef]);

  return progress;
}
