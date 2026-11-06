import React, { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const isReduced = useReducedMotion();
  const [displayedText, setDisplayedText] = useState('');
  const [isFadingOut, setIsFadingOut] = useState(false);

  const fullText = `> SIGNAL INTERCEPTED... DECRYPTING FILE ${EVENT_CONFIG.eventName}`;

  useEffect(() => {
    // If reduced motion is requested, complete immediately
    if (isReduced) {
      onComplete();
      return;
    }

    // Check sessionStorage for repeat visits in the same session
    try {
      if (typeof window !== 'undefined' && sessionStorage.getItem('latveria_booted') === 'true') {
        onComplete();
        return;
      }
    } catch {
      // Ignore storage access errors
    }

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      charIndex += 1;
      setDisplayedText(fullText.slice(0, charIndex));

      if (charIndex >= fullText.length) {
        clearInterval(typeInterval);
        // Begin sweep and fade out within the 2s ceiling
        setTimeout(() => {
          setIsFadingOut(true);
          try {
            sessionStorage.setItem('latveria_booted', 'true');
          } catch {
            // Ignore
          }
          setTimeout(() => {
            onComplete();
          }, 350);
        }, 500);
      }
    }, 28);

    return () => clearInterval(typeInterval);
  }, [fullText, isReduced, onComplete]);

  const handleSkip = () => {
    try {
      sessionStorage.setItem('latveria_booted', 'true');
    } catch {
      // Ignore
    }
    onComplete();
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0b0d0c] flex flex-col items-center justify-center p-6 text-center transition-opacity duration-300 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-live="polite"
    >
      {/* Sweeping Green Scan Line */}
      <div
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#4ade80] to-transparent shadow-[0_0_12px_#4ade80] pointer-events-none animate-[scanlineSweep_1.8s_cubic-bezier(0.16,1,0.3,1)_infinite]"
        style={{
          animation: 'scanlineSweep 1.6s linear infinite',
        }}
      />

      <style>{`
        @keyframes scanlineSweep {
          0% { top: 0%; opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      {/* Terminal Typing Line */}
      <div className="max-w-xl w-full">
        <div className="font-mono text-sm sm:text-base text-[#4ade80] flex items-center justify-center gap-1">
          <span>{displayedText}</span>
          <span className="w-2 h-4 bg-[#c9a227] animate-pulse inline-block" />
        </div>
        <div className="mt-3 text-[10px] font-mono tracking-widest text-[#52635a] uppercase">
          SECURE PROTOCOL // LATVERIA SOVEREIGN SUITE
        </div>
      </div>

      {/* Skip Button */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute bottom-8 px-3 py-1 text-[11px] font-mono text-[#8e9e96] hover:text-[#c9a227] border border-[#1f2e26] hover:border-[#c9a227] rounded transition-colors uppercase tracking-wider"
      >
        [Skip Sequence ↷]
      </button>
    </div>
  );
};
