'use client';

import React, { useState } from 'react';
import { Venue, SoliqReceipt } from '@/types';
import { X, CheckCircle2, ShieldCheck, Waves, Users, DollarSign, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RealityCheckFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  venue: Venue;
  receipt: SoliqReceipt;
  onSubmitCheck: (data: {
    venueId: string;
    poolsOpen: number;
    pricePaidUZS: number;
    cleanliness: number;
    crowdLevel: 'low' | 'moderate' | 'packed';
  }) => void;
}

export const RealityCheckFormModal: React.FC<RealityCheckFormModalProps> = ({
  isOpen,
  onClose,
  venue,
  receipt,
  onSubmitCheck
}) => {
  const [poolsOpen, setPoolsOpen] = useState<number>(2);
  const [cleanliness, setCleanliness] = useState<number>(4);
  const [crowdLevel, setCrowdLevel] = useState<'low' | 'moderate' | 'packed'>('packed');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
      onSubmitCheck({
        venueId: venue.id,
        poolsOpen,
        pricePaidUZS: receipt.totalAmount,
        cleanliness,
        crowdLevel
      });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
              <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-100 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Receipt Verified: {receipt.merchantName}
              </div>
              <h3 className="font-bold text-lg leading-tight">15-Second Reality Check</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Receipt Proof Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-emerald-900">Verified Fiscal Sign:</span>
              <span className="font-mono text-emerald-700 ml-1.5">{receipt.fiscalSign}</span>
            </div>
            <div className="font-bold text-emerald-800">
              {receipt.totalAmount.toLocaleString()} UZS Paid
            </div>
          </div>

          {/* Question 1: Operating Pools / Attractions */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-800 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-sky-600" />
                How many pools/slides are actually operating right now?
              </span>
              <span className="text-neutral-600 font-normal">Advertised: 5</span>
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setPoolsOpen(num)}
                  className={`py-2.5 rounded-xl font-bold text-sm transition border ${
                    poolsOpen === num
                      ? num <= 2
                        ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                        : 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {num} {num === 5 ? 'All' : ''}
                </button>
              ))}
            </div>
            {poolsOpen <= 2 && (
              <p className="text-[11px] text-rose-600 font-medium">
                Will register as a Reality Discrepancy (3 pools closed).
              </p>
            )}
          </div>

          {/* Question 2: Price Paid (Auto-locked from Soliq receipt) */}
          <div className="space-y-1.5 bg-neutral-50 p-3 rounded-xl border border-neutral-200">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-800 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                Admission Fee Paid (Fiscal Proof)
              </span>
              <span className="text-[11px] text-neutral-600">Advertised: 150,000 UZS</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-neutral-900 font-mono">
                {receipt.totalAmount.toLocaleString()} UZS
              </span>
              <span className="text-xs text-rose-600 font-semibold">
                (+{(receipt.totalAmount - venue.advertisedPriceUZS).toLocaleString()} UZS above advertised rate)
              </span>
            </div>
            <p className="text-[11px] text-neutral-600">
              Extracted directly from State Tax Committee fiscal receipt data.
            </p>
          </div>

          {/* Question 3: Crowd Level */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-600" />
              Current Crowd Density & Wait Times
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'moderate', 'packed'] as const).map((level) => (
                <button
                  type="button"
                  key={level}
                  onClick={() => setCrowdLevel(level)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition border ${
                    crowdLevel === level
                      ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {level === 'low' ? 'Low (Free)' : level === 'moderate' ? 'Moderate' : 'Packed (Busy)'}
                </button>
              ))}
            </div>
          </div>

          {/* Question 4: Cleanliness Rating */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Facility & Water Cleanliness (1 to 5)
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setCleanliness(star)}
                  className={`flex-1 py-2 rounded-lg font-bold text-xs border transition ${
                    cleanliness >= star
                      ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-xs'
                      : 'bg-neutral-100 text-neutral-400 border-neutral-200'
                  }`}
                >
                  {star} ★
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Updating Ground Truth Layer...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Verified Reality Check</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
