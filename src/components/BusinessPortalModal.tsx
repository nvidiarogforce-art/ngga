'use client';

import React, { useState } from 'react';
import { Venue } from '@/types';
import { X, Building2, CheckCircle, ShieldAlert, Award, MessageSquare, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BusinessPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  venue: Venue;
  onUpdateOfficialResponse: (data: {
    venueId: string;
    title: string;
    explanation: string;
    estimatedFixDate: string;
  }) => void;
}

export const BusinessPortalModal: React.FC<BusinessPortalModalProps> = ({
  isOpen,
  onClose,
  venue,
  onUpdateOfficialResponse
}) => {
  const [title, setTitle] = useState(
    venue.officialUpdates?.[0]?.title || 'Scheduled Filter Replacement & Reopening Notice'
  );
  const [explanation, setExplanation] = useState(
    venue.officialUpdates?.[0]?.explanation ||
      'We acknowledge the temporary closure of pools 2, 3 and 4 due to pump sediment replacement. Technicians are on-site and all 5 pools will resume normal operation tomorrow by 10:00 AM.'
  );
  const [estimatedFixDate, setEstimatedFixDate] = useState('Tomorrow 10:00 AM');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateOfficialResponse({
      venueId: venue.id,
      title,
      explanation,
      estimatedFixDate
    });
    setIsSaved(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
              <Building2 className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
                <Award className="w-3.5 h-3.5" />
                Verified Business Owner Portal ($20/mo Tier)
              </div>
              <h3 className="font-bold text-lg leading-tight">{venue.name}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSave} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Active Discrepancy Banner */}
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-rose-900 block font-bold">Active Reality Gap Flagged by 18 Soliq Visitors:</strong>
              <span className="text-rose-700">
                Visitors have verified that 3 pools are closed and admission fee at the gate is 220,000 UZS.
              </span>
            </div>
          </div>

          {/* Value proposition card */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-xs text-amber-900">
            <span className="font-bold block mb-1">Why Transparent Businesses Win:</span>
            On Google Maps, negative reviews stick for 3 years. On TrueSpot, officially acknowledging an issue and providing an ETA awards your venue the <strong>&quot;Transparent Management&quot;</strong> badge and immediately restores trust.
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              Official Response Headline
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs font-medium p-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-800">
              Detailed Explanation for Visitors & Tourism Board
            </label>
            <textarea
              rows={4}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="w-full text-xs font-medium p-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-800">
              Estimated Resolution Date / Time
            </label>
            <input
              type="text"
              value={estimatedFixDate}
              onChange={(e) => setEstimatedFixDate(e.target.value)}
              className="w-full text-xs font-medium p-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaved}
              className="w-full py-3.5 bg-gradient-to-r from-neutral-900 to-neutral-800 hover:from-black hover:to-neutral-900 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isSaved ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Official Disclosure Published!</span>
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                  <span>Publish Transparency Disclosure & Restore Trust</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
