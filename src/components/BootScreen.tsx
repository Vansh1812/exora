import React, { useState, useEffect } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { WalkerLine } from './WalkerLine';

interface BootScreenProps {
  onComplete: () => void;
}

/**
 * Ignition Loader
 * - Max 1.5s, skippable, once per session via sessionStorage in try/catch
 * - The Walker Line draws itself and the walker takes a few steps, then the page fades in
 */
export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const isReduced = useReducedMotion();
  const [walkerProgress, setWalkerProgress] = useState(0.05);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (isReduced) {
      onComplete();
      return;
    }

    try {
      if (typeof window !== 'undefined' && sessionStorage.getItem('exora_orbital_ignited') === 'true') {
        onComplete();
        return;
      }
    } catch {
      // Ignore storage access errors
    }

    // Animate walker taking a few steps along the drawn line
    const stepInterval = setInterval(() => {
      setWalkerProgress((prev) => {
        if (prev >= 0.45) {
          clearInterval(stepInterval);
          return 0.45;
        }
        return prev + 0.08;
      });
    }, 140);

    // Fade out and complete within 1.4s
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      try {
        sessionStorage.setItem('exora_orbital_ignited', 'true');
      } catch {
        // Ignore
      }
      setTimeout(() => {
        onComplete();
      }, 300);
    }, 1100);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(timer);
    };
  }, [isReduced, onComplete]);

  const handleSkip = () => {
    try {
      sessionStorage.setItem('exora_orbital_ignited', 'true');
    } catch {
      // Ignore
    }
    onComplete();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05030f] text-[#f4f0ff] p-6 transition-opacity duration-300 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Orbital Ignition Sequence"
      role="status"
    >
      {/* Background Soft Glow */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full blur-[100px] opacity-25 bg-[#e04dff] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center">
        {/* Walker Line Drawing Itself */}
        <div className="w-full mb-6">
          <WalkerLine progress={walkerProgress} showMoons={true} />
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl sm:text-3xl font-light tracking-[0.16em] uppercase text-[#f4f0ff] mb-2">
          EXORA <span className="text-[#6ee7f9]">2.0</span>
        </h2>

        {/* Status */}
        <div className="inline-flex items-center gap-2 text-xs font-display tracking-[0.2em] uppercase text-[#ffc58a]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffc58a] animate-pulse" />
          <span>INITIALIZING ORBITAL WALK...</span>
        </div>

        {/* Skip Button */}
        <button
          type="button"
          onClick={handleSkip}
          className="mt-8 text-[11px] font-display uppercase tracking-[0.2em] text-[#a99fcf] hover:text-[#f4f0ff] underline underline-offset-4 cursor-pointer focus:outline-none"
        >
          [ SKIP IGNITION ]
        </button>
      </div>
    </div>
  );
};
