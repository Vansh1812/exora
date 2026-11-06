import React, { useState, useEffect } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Cursor: React.FC = () => {
  const isReduced = useReducedMotion();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect touch-only device
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);
    if (touch || isReduced) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);

        // Check if cursor is over interactive control
        const target = e.target as HTMLElement | null;
        if (target) {
          const interactive = target.closest('a, button, input, textarea, select, [role="button"], [role="slider"]');
          setIsHovered(!!interactive);
        }
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isReduced, isVisible]);

  if (isTouchDevice || isReduced || !isVisible) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-50 select-none transition-transform duration-75 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-150 ${
          isHovered ? 'scale-125' : 'scale-100'
        }`}
      >
        {/* Outer Circular Reticle */}
        <div
          className={`rounded-full border transition-all duration-150 ${
            isHovered
              ? 'w-7 h-7 border-[#c9a227] bg-[#c9a227]/10'
              : 'w-5 h-5 border-[#2f4a3a] bg-transparent'
          }`}
        />
        {/* Center Point */}
        <div
          className={`absolute w-1 h-1 rounded-full transition-colors ${
            isHovered ? 'bg-[#c9a227]' : 'bg-[#4ade80]'
          }`}
        />
        {/* Crosshair ticks */}
        <div className="absolute w-3 h-[1px] bg-[#c9a227]/50" />
        <div className="absolute h-3 w-[1px] bg-[#c9a227]/50" />
      </div>
    </div>
  );
};
