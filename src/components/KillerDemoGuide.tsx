'use client';

import React from 'react';
import { Play, Sparkles, QrCode, CheckCircle2, Building2, BarChart3 } from 'lucide-react';

interface KillerDemoGuideProps {
  onTriggerStep: (stepNumber: number) => void;
  currentStep: number;
}

export const KillerDemoGuide: React.FC<KillerDemoGuideProps> = ({
  onTriggerStep,
  currentStep
}) => {
  return (
    <div
      className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white border-b border-indigo-700/50 shadow-md"
      suppressHydrationWarning
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-400 text-neutral-950 rounded-lg font-black text-xs flex items-center gap-1 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PITCH DEMO</span>
          </div>
          <span className="text-xs font-bold text-blue-100 hidden sm:inline">
            3-Minute Competition Sequence:
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          <button
            onClick={() => onTriggerStep(1)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              currentStep === 1
                ? 'bg-rose-500 text-white shadow-sm ring-2 ring-rose-300'
                : 'bg-white/10 hover:bg-white/20 text-blue-100'
            }`}
          >
            <Play className="w-3 h-3" />
            <span>1. Reality Gap (Oasis)</span>
          </button>

          <button
            onClick={() => onTriggerStep(2)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              currentStep === 2
                ? 'bg-blue-500 text-white shadow-sm ring-2 ring-blue-300'
                : 'bg-white/10 hover:bg-white/20 text-blue-100'
            }`}
          >
            <QrCode className="w-3 h-3" />
            <span>2. Scan Soliq Receipt</span>
          </button>

          <button
            onClick={() => onTriggerStep(3)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              currentStep === 3
                ? 'bg-emerald-500 text-white shadow-sm ring-2 ring-emerald-300'
                : 'bg-white/10 hover:bg-white/20 text-blue-100'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>3. 15-Sec Reality Check</span>
          </button>

          <button
            onClick={() => onTriggerStep(4)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              currentStep === 4
                ? 'bg-amber-500 text-neutral-950 shadow-sm ring-2 ring-amber-300'
                : 'bg-white/10 hover:bg-white/20 text-blue-100'
            }`}
          >
            <Building2 className="w-3 h-3" />
            <span>4. Business Response</span>
          </button>

          <button
            onClick={() => onTriggerStep(5)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
              currentStep === 5
                ? 'bg-purple-500 text-white shadow-sm ring-2 ring-purple-300'
                : 'bg-white/10 hover:bg-white/20 text-blue-100'
            }`}
          >
            <BarChart3 className="w-3 h-3" />
            <span>5. Tourism Board (DMO)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
