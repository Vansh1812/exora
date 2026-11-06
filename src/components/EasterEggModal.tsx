import React, { useState, useEffect } from 'react';
import { X, ShieldAlert } from 'lucide-react';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-[staticFlash_150ms_ease-out]">
      <div className="relative w-full max-w-lg bg-[#0c100e] border-2 border-[#c9a227] p-6 sm:p-8 rounded-2xl shadow-[0_0_60px_rgba(201,162,39,0.35)] rivet-corner">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#2f4a3a]">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#c9a227] animate-pulse" />
            <span className="font-mono text-xs font-bold text-[#c9a227] tracking-widest uppercase">
              TOP SECRET // DOOM ROOT OVERRIDE
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8e9e96] hover:text-[#e2e8e5] text-sm font-mono p-1"
            aria-label="Close override"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Secret Transmitted Message */}
        <div className="space-y-4 font-mono text-xs sm:text-sm text-[#e2e8e5] leading-relaxed">
          <div className="p-4 bg-[#141e18] border border-[#2f4a3a] text-[#4ade80] rounded">
            <code>[TRANSMISSION CIPHER: 0xDEADBEEF-DOOM]</code>
            <p className="mt-2 text-white font-display text-base font-semibold">
              “None surpass Doom in will or vision. You who deciphered this sequence have proven you possess discerning intellect. Step into the arena on November 28, 2026. Deploy sovereign code. Accept nothing less than perfection.”
            </p>
          </div>

          <div className="p-3 bg-[#080b09] border border-[#1b2b22] text-[11px] text-[#8e9e96] space-y-1">
            <div>CLEARANCE CODE: <span className="text-[#c9a227] font-bold">LATVERIA-ROOT-2026</span></div>
            <div>STATUS: <span className="text-[#4ade80]">FAST-TRACK INTERVIEW NOMINATION UNLOCKED</span></div>
          </div>
        </div>

        {/* Action */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#0b0d0c] bg-[#c9a227] hover:bg-[#ddb435] transition-all"
          >
            Acknowledge Sovereign Decree
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Hook to listen for "DOOM" keyboard sequence
 */
export function useDoomEasterEgg(onTrigger: () => void) {
  useEffect(() => {
    let keyBuffer = '';

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing inside an input or textarea
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      keyBuffer = (keyBuffer + e.key.toUpperCase()).slice(-4);
      if (keyBuffer === 'DOOM') {
        onTrigger();
        keyBuffer = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onTrigger]);
}
