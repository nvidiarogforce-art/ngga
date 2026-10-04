'use client';

import React from 'react';
import { Venue, Language } from '@/types';
import { TRANSLATIONS } from '@/lib/translations';
import { ConfidenceThermometer } from './ConfidenceThermometer';
import { MapPin, ShieldCheck, Sparkles, AlertTriangle, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

interface VenueCardProps {
  venue: Venue;
  language: Language;
  onSelectVenue: (venue: Venue) => void;
  onScanReceipt: (venue: Venue) => void;
  isHighlighted?: boolean;
}

export const VenueCard: React.FC<VenueCardProps> = ({
  venue,
  language,
  onSelectVenue,
  onScanReceipt,
  isHighlighted = false
}) => {
  const t = TRANSLATIONS[language];
  const isSevere = venue.realityMatchScore < 70;
  const isPristine = venue.realityMatchScore >= 90;

  return (
    <div
      className={`bg-white rounded-2xl border overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col ${
        isHighlighted
          ? 'ring-4 ring-rose-500 shadow-xl border-rose-400 scale-[1.01]'
          : 'border-neutral-200 hover:border-neutral-300'
      }`}
    >
      {/* Image Banner */}
      <div className="relative aspect-16/9 overflow-hidden bg-neutral-900 group">
        <img
          src={venue.imageUrl}
          alt={venue.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="bg-black/70 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full border border-white/20">
            {venue.category}
          </span>

          <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-400/40">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
            <span>Soliq Fiscal Bound</span>
          </span>
        </div>

        {/* Bottom overlay: Discrepancy Alert */}
        <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white">
          <div className="flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-1 text-neutral-200 text-[11px]">
              <MapPin className="w-3 h-3 text-rose-400" />
              <span className="truncate max-w-[200px]">{venue.locationAddress}</span>
            </div>
            <div className="text-[11px] font-mono text-neutral-300">
              {venue.advertisedPriceUZS.toLocaleString()} UZS / day
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          {/* Title & Official status badge */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-extrabold text-base text-neutral-900 leading-tight">
              {language === 'uz' ? venue.nameUz : venue.name}
            </h3>
            {venue.officialUpdates?.length ? (
              <span className="shrink-0 bg-blue-50 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">
                Management Verified
              </span>
            ) : null}
          </div>

          {/* Tri-dimensional Trust Meter */}
          <div className="mt-2.5">
            <ConfidenceThermometer
              realityMatchScore={venue.realityMatchScore}
              confidenceLevel={venue.confidenceLevel}
              verifiedReceiptsCount={venue.verifiedReceiptsCount}
              lastVerifiedMinutesAgo={venue.lastVerifiedMinutesAgo}
            />
          </div>

          {/* Discrepancy Callout */}
          <div className="mt-3">
            {isSevere && (
              <div className="bg-rose-50 border border-rose-200 p-2.5 rounded-xl flex items-start gap-2 text-xs text-rose-900">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-rose-950">Ground Reality Gap Detected:</span>
                  <span>{venue.claims[0]?.currentActualValue || 'Discrepancy verified by Soliq visitors today.'}</span>
                </div>
              </div>
            )}
            {isPristine && (
              <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center gap-2 text-xs text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold">100% Honest Venue: All advertised amenities match.</span>
              </div>
            )}
          </div>

          {/* AI 2-Sentence Ground Truth Synthesis */}
          <div className="mt-3 bg-neutral-50/90 rounded-xl p-3 border border-neutral-200/80 text-xs text-neutral-700">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Ground Truth Summary (Gemini 2.5)</span>
            </div>
            <p className="line-clamp-3 leading-relaxed text-neutral-800">
              {venue.aiSummary[language] || venue.aiSummary.en}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-neutral-100 flex items-center gap-2">
          <button
            onClick={() => onSelectVenue(venue)}
            className="flex-1 py-2.5 px-3 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
          >
            <span>{t.viewDetails}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onScanReceipt(venue)}
            className="py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0"
            title="Scan your Soliq receipt for this venue"
          >
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Verify Visit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
