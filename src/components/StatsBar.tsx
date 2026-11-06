import React from 'react';
import { EVENT_CONFIG } from '../eventConfig';
import { Users, Trophy, Clock, Cpu } from 'lucide-react';

const iconMap = [Users, Cpu, Trophy, Clock];

export const StatsBar: React.FC = () => {
  return (
    <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-16">
      <div className="border border-[#2f4a3a] bg-[#0c100e]/95 backdrop-blur-md rounded-sm p-4 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.8)] rivet-corner">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#1f2e26]">
          {EVENT_CONFIG.stats.map((stat, idx) => {
            const Icon = iconMap[idx] || Cpu;
            return (
              <div
                key={idx}
                className={`pt-3 sm:pt-0 ${idx !== 0 ? 'sm:pl-6' : ''} flex flex-col justify-between group`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#52635a] uppercase font-bold group-hover:text-[#c9a227] transition-colors">
                    {stat.label}
                  </span>
                  <Icon className="w-4 h-4 text-[#2f4a3a] group-hover:text-[#c9a227] transition-colors" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold text-[#e2e8e5] tabular-nums tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] font-mono text-[#8e9e96] mt-1">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
