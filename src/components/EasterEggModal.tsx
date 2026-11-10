import React, { useEffect } from 'react';
import { X, Sparkles, Orbit } from 'lucide-react';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-[staticFlash_150ms_ease-out]">
      <div className="relative w-full max-w-lg bg-[#120a2e] border border-[#8b5cf6]/40 p-6 sm:p-8 rounded-3xl shadow-[0_0_60px_rgba(224,77,255,0.35)]">
        {/* Pulsing diamond sparkle top */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center justify-center w-7 h-7 rounded-full bg-[#120a2e] border border-[#ffc58a]/60 shadow-[0_0_12px_#ffc58a]">
          <Sparkles className="w-4 h-4 text-[#ffc58a] animate-pulse" />
        </div>

        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Orbit className="w-5 h-5 text-[#6ee7f9] animate-spin" style={{ animationDuration: '8s' }} />
            <span className="font-display text-xs text-[#ffc58a] tracking-[0.2em] uppercase">
              ORBITAL FREQUENCY // SIGNAL UNLOCKED
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#a99fcf] hover:text-[#f4f0ff] text-sm p-1 transition-colors"
            aria-label="Close transmission"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Celestial Transmitted Message */}
        <div className="space-y-4 text-xs sm:text-sm text-[#f4f0ff] leading-relaxed">
          <div className="p-4 bg-[#05030f]/80 border border-[#8b5cf6]/30 text-[#6ee7f9] rounded-2xl">
            <code className="text-xs text-[#e04dff] font-display tracking-widest">[SIGNAL VECTOR: 0xEXORA-ORBIT]</code>
            <p className="mt-2 text-[#f4f0ff] font-sans text-sm sm:text-base font-light leading-relaxed">
              &ldquo;You walk between worlds. Those who seek the hidden signal carry the spirit of true exploration. Step onto the line on November 28, 2026 at Thoughtworks Gurugram. Build without bounds.&rdquo;
            </p>
          </div>

          <div className="p-3 bg-[#0a051d] border border-white/5 rounded-xl text-[11px] text-[#a99fcf] space-y-1 font-sans">
            <div>COORDINATES: <span className="text-[#ffc58a] font-display">THOUGHTWORKS // GURUGRAM</span></div>
            <div>STATUS: <span className="text-[#6ee7f9]">FAST-TRACK MENTORSHIP NOMINATION UNLOCKED</span></div>
          </div>
        </div>

        {/* Action */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-primary-orbital"
          >
            Enter Orbit
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Hook to listen for "EXORA" or "ORBIT" keyboard sequence
 */
export function useOrbitalEasterEgg(onTrigger: () => void) {
  useEffect(() => {
    let keyBuffer = '';

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      keyBuffer = (keyBuffer + e.key.toUpperCase()).slice(-5);
      if (keyBuffer.includes('EXORA') || keyBuffer.slice(-4) === 'ORBIT') {
        onTrigger();
        keyBuffer = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onTrigger]);
}
