import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const SectionShutter: React.FC = () => {
  const isReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hasWiped, setHasWiped] = useState(false);

  useEffect(() => {
    if (isReduced) {
      setHasWiped(true);
      return;
    }

    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setHasWiped(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasWiped(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isReduced]);

  return (
    <div ref={ref} className="relative w-full h-[1px] bg-[#1f2e26] overflow-hidden" aria-hidden="true">
      {/* Sweeping Shutter Line */}
      <div
        className={`absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-[#c9a227] to-transparent ${
          hasWiped
            ? 'left-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]'
            : '-left-32'
        }`}
      />
    </div>
  );
};
