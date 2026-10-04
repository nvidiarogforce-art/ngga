'use client';

import React from 'react';
import { Venue, Language } from '@/types';
import { RealityGapCard } from './RealityGapCard';
import { ConfidenceThermometer } from './ConfidenceThermometer';
import { X, ShieldCheck, MapPin, Sparkles, Building2, QrCode, MessageCircle } from 'lucide-react';

interface VenueDetailModalProps {
  venue: Venue | null;
  language: Language;
  onClose: () => void;
  onOpenScanner: (venue: Venue) => void;
}

export const VenueDetailModal: React.FC<VenueDetailModalProps> = ({
  venue,
  language,
  onClose,
  onOpenScanner
}) => {
  if (!venue) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="relative aspect-21/9 bg-neutral-900 shrink-0">
          <img
            src={venue.imageUrl}
            alt={venue.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-between p-5 text-white">
            <div className="flex items-center justify-between">
              <span className="bg-blue-600/90 text-white text-xs font-bold px-3 py-1 rounded-full border border-blue-400/40">
                {venue.category} · {venue.region}
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-black/50 hover:bg-black text-white/80 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-emerald-500/90 text-emerald-950 font-bold text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Soliq Fiscal Bound
                </span>
                <span className="text-xs text-neutral-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  {venue.locationAddress}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white leading-tight">
                {language === 'uz' ? venue.nameUz : venue.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Tri-dimensional Trust Meter */}
          <div>
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
              Tri-Dimensional Trust Vector
            </h4>
            <ConfidenceThermometer
              realityMatchScore={venue.realityMatchScore}
              confidenceLevel={venue.confidenceLevel}
              verifiedReceiptsCount={venue.verifiedReceiptsCount}
              lastVerifiedMinutesAgo={venue.lastVerifiedMinutesAgo}
            />
          </div>

          {/* AI Ground Truth Summary */}
          <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-purple-50/80 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>AI Ground Truth Synthesis (Gemini API)</span>
              </div>
              <span className="text-[11px] text-indigo-700/80 font-medium">
                {venue.aiSummary.generatedAt}
              </span>
            </div>
            <p className="text-xs text-indigo-950 leading-relaxed font-medium">
              {venue.aiSummary[language] || venue.aiSummary.en}
            </p>
          </div>

          {/* Reality Gap Engine: Claims */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-neutral-900">
                  Reality Gap Engine (Advertised vs. Actual)
                </h4>
                <p className="text-xs text-neutral-500">
                  Side-by-side comparison verified by physical fiscal receipts
                </p>
              </div>
              <span className="text-xs font-bold bg-neutral-100 px-2.5 py-1 rounded-lg text-neutral-700 border border-neutral-200">
                {venue.claims.length} Claims Tracked
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {venue.claims.map((claim) => (
                <RealityGapCard key={claim.id} claim={claim} />
              ))}
            </div>
          </div>

          {/* Official Management Disclosures */}
          {venue.officialUpdates && venue.officialUpdates.length > 0 && (
            <div className="space-y-2.5 bg-neutral-900 text-neutral-100 p-4 rounded-2xl border border-neutral-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Building2 className="w-4 h-4" />
                  <span>Official Venue Management Response</span>
                </div>
                <span className="text-[11px] text-neutral-400">
                  {venue.officialUpdates[0].updatedAt}
                </span>
              </div>
              <h5 className="font-bold text-sm text-white">
                {venue.officialUpdates[0].title}
              </h5>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {venue.officialUpdates[0].explanation}
              </p>
              {venue.officialUpdates[0].estimatedFixDate && (
                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400">Estimated Resolution:</span>
                  <span className="text-emerald-400 font-bold">
                    {venue.officialUpdates[0].estimatedFixDate}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-neutral-600 hidden sm:block">
            Visited this venue today? Scan your Soliq receipt for 1% cashback and verify the ground truth.
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenScanner(venue);
            }}
            className="w-full sm:w-auto py-3 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            <QrCode className="w-4 h-4 text-blue-200" />
            <span>Verify Visit with Soliq QR</span>
          </button>
        </div>
      </div>
    </div>
  );
};
