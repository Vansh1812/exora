import React, { useState } from 'react';
import { EVENT_CONFIG } from '../eventConfig';

export const CustomizationGuideDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const snippet = `// In src/eventConfig.ts, replace these placeholders:
export const EVENT_CONFIG = {
  eventName: "${EVENT_CONFIG.eventName}",
  collegeName: "${EVENT_CONFIG.collegeName}",
  dateDisplay: "${EVENT_CONFIG.dateDisplay}",
  timeDisplay: "${EVENT_CONFIG.timeDisplay}",
  targetDate: "${EVENT_CONFIG.targetDate}",
  venue: "${EVENT_CONFIG.venue}",
  registrationUrl: "${EVENT_CONFIG.registrationUrl}",
  // ... customized schedule & impact points
};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Tactical Guide Trigger in bottom-right corner */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#0c100e] border border-[#2f4a3a] hover:border-[#c9a227] text-[#c9a227] text-xs font-mono tracking-wider uppercase rounded-sm shadow-xl transition-all active:scale-95"
          aria-label="Open Customisation Dossier"
        >
          <span className="w-2 h-2 rounded-full bg-[#c9a227]" />
          <span>Edit Event Config</span>
        </button>
      </div>

      {/* Guide Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#0c100e] border border-[#2f4a3a] p-6 sm:p-8 rounded-sm shadow-2xl rivet-corner max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1f2e26]">
              <div>
                <span className="text-[10px] font-mono text-[#c9a227] uppercase tracking-widest block">
                  DEPLOYMENT DIRECTIVE
                </span>
                <h3 className="font-display text-xl font-bold text-[#e2e8e5]">
                  Dossier Customisation Checklist
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[#8e9e96] hover:text-[#e2e8e5] text-lg font-mono p-1"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Quick instructions */}
            <div className="space-y-4 text-xs font-mono text-[#8e9e96] leading-relaxed mb-6">
              <p>
                All event variables are centralized in a single configuration file:{' '}
                <code className="text-[#c9a227] bg-[#121915] px-1.5 py-0.5 rounded">
                  /src/eventConfig.ts
                </code>
              </p>

              <div className="p-3 bg-[#080b09] border border-[#1b2b22] space-y-2">
                <div className="text-[#e2e8e5] font-semibold">4-Step Customisation Protocol:</div>
                <ul className="list-disc list-inside space-y-1 text-[#8e9e96]">
                  <li>
                    <strong className="text-[#c9a227]">Event Name & College:</strong> Edit{' '}
                    <code className="text-white">eventName</code> and{' '}
                    <code className="text-white">collegeName</code>.
                  </li>
                  <li>
                    <strong className="text-[#c9a227]">Date & Doom Clock:</strong> Set{' '}
                    <code className="text-white">targetDate</code> (ISO format) for live countdown.
                  </li>
                  <li>
                    <strong className="text-[#c9a227]">Registration Form:</strong> Update{' '}
                    <code className="text-white">registrationUrl</code> with your Google Form / Tally link.
                  </li>
                  <li>
                    <strong className="text-[#c9a227]">Schedule & Impact:</strong> Modify{' '}
                    <code className="text-white">schedule</code> array and{' '}
                    <code className="text-white">impactPoints</code> array.
                  </li>
                </ul>
              </div>

              {/* Code snippet block */}
              <div className="relative">
                <div className="flex items-center justify-between pb-1 text-[11px] text-[#52635a]">
                  <span>/src/eventConfig.ts PREVIEW</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-[#c9a227] hover:underline"
                  >
                    {copied ? 'COPIED TO CLIPBOARD' : 'COPY CONFIG TEMPLATE'}
                  </button>
                </div>
                <pre className="p-4 bg-[#050706] border border-[#1b2b22] text-[#8e9e96] text-[11px] overflow-x-auto rounded-sm">
                  {snippet}
                </pre>
              </div>
            </div>

            {/* Close action */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 bg-[#c9a227] hover:bg-[#ddb435] text-[#0b0d0c] font-mono text-xs font-bold uppercase rounded-sm"
              >
                Close Directive
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
