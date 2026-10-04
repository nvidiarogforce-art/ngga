'use client';

import React from 'react';
import { ShieldCheck, Clock, Award } from 'lucide-react';

interface ConfidenceThermometerProps {
  realityMatchScore: number;
  confidenceLevel: 'High' | 'Moderate' | 'Low';
  verifiedReceiptsCount: number;
  lastVerifiedMinutesAgo: number;
  compact?: boolean;
}

export const ConfidenceThermometer: React.FC<ConfidenceThermometerProps> = ({
  realityMatchScore,
  confidenceLevel,
  verifiedReceiptsCount,
  lastVerifiedMinutesAgo,
  compact = false
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return { bg: 'bg-emerald-500', text: 'text-emerald-700', border: 'border-emerald-200', bgLight: 'bg-emerald-50' };
    if (score >= 70) return { bg: 'bg-amber-500', text: 'text-amber-700', border: 'border-amber-200', bgLight: 'bg-amber-50' };
    return { bg: 'bg-rose-500', text: 'text-rose-700', border: 'border-rose-200', bgLight: 'bg-rose-50' };
  };

  const colors = getScoreColor(realityMatchScore);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${colors.bgLight} ${colors.text} border ${colors.border} flex items-center gap-1`}>
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{realityMatchScore}% Reality Match</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-neutral-500">
          <Clock className="w-3 h-3" />
          <span>{lastVerifiedMinutesAgo}m ago</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">Reality Match Score</span>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-black ${colors.text}`}>{realityMatchScore}%</span>
            <span className="text-xs text-neutral-600">
              {realityMatchScore >= 90 ? 'Pristine Ground Truth' : realityMatchScore >= 70 ? 'Minor Gaps Detected' : 'Severe Reality Discrepancy'}
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500">Verification Strength</span>
          <div className="flex items-center gap-1.5 justify-end">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
              <Award className="w-3 h-3" />
              {confidenceLevel} Confidence
            </span>
          </div>
        </div>
      </div>

      {/* Visual meter bar */}
      <div className="w-full bg-neutral-200 h-2.5 rounded-full overflow-hidden">
        <div
          className={`h-full ${colors.bg} transition-all duration-700 ease-out`}
          style={{ width: `${realityMatchScore}%` }}
        />
      </div>

      {/* Tri-dimensional breakdown footer */}
      <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-neutral-600 border-t border-neutral-200">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span><strong>{verifiedReceiptsCount}</strong> Soliq receipts verified</span>
        </div>
        <div className="flex items-center gap-1.5 justify-end">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>Updated <strong>{lastVerifiedMinutesAgo} min ago</strong></span>
        </div>
      </div>
    </div>
  );
};
