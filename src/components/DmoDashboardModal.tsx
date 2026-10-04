'use client';

import React from 'react';
import { Venue } from '@/types';
import { X, Building, AlertTriangle, TrendingUp, CheckCircle, FileText } from 'lucide-react';

interface DmoDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  venues: Venue[];
}

export const DmoDashboardModal: React.FC<DmoDashboardModalProps> = ({
  isOpen,
  onClose,
  venues
}) => {
  if (!isOpen) return null;

  const totalReceipts = venues.reduce((acc, v) => acc + v.verifiedReceiptsCount, 0);
  const criticalGaps = venues.filter(v => v.realityMatchScore < 70).length;
  const averageMatch = Math.round(
    venues.reduce((acc, v) => acc + v.realityMatchScore, 0) / (venues.length || 1)
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
              <Building className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <div className="text-xs text-blue-200 font-bold uppercase tracking-wider">
                Tourism Committee & Regional Hokimiyat (DMO Dashboard)
              </div>
              <h3 className="font-bold text-lg leading-tight">
                Sirdaryo Region Recreation Intelligence
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Key macro KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl">
              <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wide">Monitored Venues</span>
              <div className="text-2xl font-black text-blue-950 mt-1">{venues.length}</div>
              <span className="text-[10px] text-blue-700">100% Soliq Fiscal Bound</span>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">Avg Reality Match</span>
              <div className="text-2xl font-black text-emerald-950 mt-1">{averageMatch}%</div>
              <span className="text-[10px] text-emerald-700 flex items-center gap-0.5 mt-0.5">
                <TrendingUp className="w-3 h-3" /> Region Quality Benchmark
              </span>
            </div>

            <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl">
              <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wide">Critical Gaps</span>
              <div className="text-2xl font-black text-rose-950 mt-1">{criticalGaps}</div>
              <span className="text-[10px] text-rose-700">Audit Alert Triggered</span>
            </div>

            <div className="bg-purple-50 border border-purple-200 p-3 rounded-xl">
              <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wide">Soliq Proofs</span>
              <div className="text-2xl font-black text-purple-950 mt-1">{totalReceipts}</div>
              <span className="text-[10px] text-purple-700">Today&apos;s Receipts</span>
            </div>
          </div>

          {/* Regional Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-800">
              <span>Ground Truth Ledger (Sirdaryo Region)</span>
              <span className="text-neutral-500 font-normal">Real-time Soliq telemetry</span>
            </div>

            <div className="border border-neutral-200 rounded-xl overflow-hidden divide-y divide-neutral-200 text-xs">
              {venues.map((venue) => {
                const isSevere = venue.realityMatchScore < 70;
                return (
                  <div key={venue.id} className="p-3 flex items-center justify-between hover:bg-neutral-50 transition">
                    <div>
                      <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                        {venue.name}
                        {venue.officialUpdates?.length ? (
                          <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-medium">
                            Acknowledged by Management
                          </span>
                        ) : null}
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-0.5">
                        {venue.locationAddress} · {venue.verifiedReceiptsCount} verified receipts today
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`font-black text-sm ${isSevere ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {venue.realityMatchScore}% Match
                      </div>
                      <div className="text-[10px] text-neutral-500">
                        {isSevere ? (
                          <span className="text-rose-600 font-semibold flex items-center gap-1 justify-end">
                            <AlertTriangle className="w-3 h-3" /> Audit Recommended
                          </span>
                        ) : (
                          <span className="text-emerald-700 font-medium flex items-center gap-1 justify-end">
                            <CheckCircle className="w-3 h-3" /> Compliant
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Value Prop for Tourism Board */}
          <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 text-xs text-neutral-700 space-y-1.5">
            <div className="font-bold text-neutral-900 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              Why the Sirdaryo Administration Benefits ($500/mo B2G Contract):
            </div>
            <p>
              1. <strong>Stops Tourist Price Gouging:</strong> Detects unannounced entrance fee hikes within 30 minutes of receipt submission.
            </p>
            <p>
              2. <strong>Direct Fiscal Oversight:</strong> Encourages venues to issue 100% compliant Soliq receipts to maintain their public trust score.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-xl transition shadow"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
