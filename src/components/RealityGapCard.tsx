'use client';

import React from 'react';
import { AdvertisedClaim } from '@/types';
import { AlertTriangle, CheckCircle2, Info, Waves, DollarSign, Clock, Users, Sparkles } from 'lucide-react';

interface RealityGapCardProps {
  claim: AdvertisedClaim;
}

export const RealityGapCard: React.FC<RealityGapCardProps> = ({ claim }) => {
  const getCategoryIcon = (category: AdvertisedClaim['category']) => {
    switch (category) {
      case 'pools':
        return <Waves className="w-4 h-4 text-sky-600" />;
      case 'pricing':
        return <DollarSign className="w-4 h-4 text-emerald-600" />;
      case 'hours':
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'crowd':
        return <Users className="w-4 h-4 text-purple-600" />;
      case 'amenities':
      default:
        return <Sparkles className="w-4 h-4 text-indigo-600" />;
    }
  };

  const isCritical = claim.discrepancySeverity === 'critical';
  const isMinor = claim.discrepancySeverity === 'minor';
  const isVerifiedMatch = claim.discrepancySeverity === 'none';

  return (
    <div
      className={`rounded-xl border transition-all p-4 ${
        isCritical
          ? 'bg-rose-50/70 border-rose-200'
          : isMinor
          ? 'bg-amber-50/70 border-amber-200'
          : 'bg-emerald-50/60 border-emerald-200'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white rounded-lg shadow-xs border border-neutral-200">
            {getCategoryIcon(claim.category)}
          </div>
          <span className="font-semibold text-sm text-neutral-900">{claim.label}</span>
        </div>

        {isCritical && (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            Reality Gap Alert
          </span>
        )}
        {isMinor && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
            <Info className="w-3.5 h-3.5" />
            Minor Variance
          </span>
        )}
        {isVerifiedMatch && (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            100% Verified Match
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* Advertised side */}
        <div className="bg-white/80 rounded-lg p-3 border border-neutral-200/80">
          <div className="text-[11px] font-medium uppercase tracking-wider text-neutral-600 mb-1">
            Advertised / Website Claim
          </div>
          <div className="font-medium text-neutral-800 line-through text-neutral-600 decoration-rose-400">
            {claim.advertisedValue}
          </div>
        </div>

        {/* Actual verified ground truth side */}
        <div
          className={`rounded-lg p-3 border ${
            isCritical
              ? 'bg-rose-100/80 border-rose-300 text-rose-950'
              : isMinor
              ? 'bg-amber-100/80 border-amber-300 text-amber-950'
              : 'bg-emerald-100/80 border-emerald-300 text-emerald-950'
          }`}
        >
          <div className="text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Verified Ground Truth</span>
            <span className="font-normal text-[10px] opacity-75">{claim.lastVerifiedAt}</span>
          </div>
          <div className="font-bold text-sm">
            {claim.currentActualValue}
          </div>
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-neutral-200/60 flex items-center justify-between text-[11px] text-neutral-500">
        <span>Verified by <strong>{claim.verifiedCount}</strong> visitors with Soliq receipts</span>
        <span className="text-emerald-700 font-medium">Anti-Sybil Cryptographic Proof</span>
      </div>
    </div>
  );
};
