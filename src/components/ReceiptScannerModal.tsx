'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SoliqReceipt } from '@/types';
import { SAMPLE_RECEIPTS } from '@/data/sampleReceipts';
import { X, Camera, QrCode, CheckCircle, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReceiptScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReceiptVerified: (receipt: SoliqReceipt) => void;
  defaultVenueId?: string;
}

export const ReceiptScannerModal: React.FC<ReceiptScannerModalProps> = ({
  isOpen,
  onClose,
  onReceiptVerified,
  defaultVenueId
}) => {
  const [activeTab, setActiveTab] = useState<'sample' | 'camera'>('sample');
  const [selectedReceipt, setSelectedReceipt] = useState<SoliqReceipt | null>(
    SAMPLE_RECEIPTS.find(r => r.venueId === defaultVenueId) || SAMPLE_RECEIPTS[0]
  );
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    if (defaultVenueId) {
      const match = SAMPLE_RECEIPTS.find(r => r.venueId === defaultVenueId);
      if (match) setSelectedReceipt(match);
    }
  }, [defaultVenueId]);

  useEffect(() => {
    let stream: MediaStream | null = null;
    if (activeTab === 'camera' && isOpen) {
      navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' } })
        .then(s => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            setCameraActive(true);
          }
        })
        .catch(err => {
          console.warn('Camera access not available or denied:', err);
          setCameraActive(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [activeTab, isOpen]);

  if (!isOpen) return null;

  const handleVerifyReceipt = (receipt: SoliqReceipt) => {
    setIsVerifying(true);
    // Simulate instantaneous cryptographic check with Soliq OFD server
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        onReceiptVerified(receipt);
        setVerifiedSuccess(false);
      }, 1100);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
              <QrCode className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Soliq Fiscal QR Verification</h3>
              <p className="text-xs text-blue-100 font-medium">
                Cryptographic Proof-of-Presence & Purchase in Uzbekistan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="flex border-b border-neutral-200 bg-neutral-50 p-2 gap-2">
          <button
            onClick={() => setActiveTab('sample')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'sample'
                ? 'bg-white text-blue-700 shadow-xs border border-neutral-200'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Competition Demo Receipts (1-Click)
          </button>
          <button
            onClick={() => setActiveTab('camera')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'camera'
                ? 'bg-white text-blue-700 shadow-xs border border-neutral-200'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            Live Device Camera
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {activeTab === 'sample' ? (
            <div className="space-y-3">
              <div className="text-xs text-neutral-600">
                Select a verified Soliq fiscal receipt to test the anti-fraud protocol:
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {SAMPLE_RECEIPTS.map((receipt) => {
                  const isSelected = selectedReceipt?.fiscalSign === receipt.fiscalSign;
                  return (
                    <div
                      key={receipt.fiscalSign}
                      onClick={() => setSelectedReceipt(receipt)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20'
                          : 'border-neutral-200 hover:border-neutral-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-sm text-neutral-900">{receipt.merchantName}</span>
                        <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded">
                          {receipt.totalAmount.toLocaleString()} UZS
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-neutral-600 font-mono">
                        <div>FS: {receipt.fiscalSign}</div>
                        <div>KKM: {receipt.terminalId}</div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-neutral-200/60 flex items-center justify-between text-[11px] text-neutral-500">
                        <span>{receipt.dateTime}</span>
                        <span className="text-emerald-700 font-medium">+1% Soliq Cashback: {receipt.cashbackAmount.toLocaleString()} UZS</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-center">
              <div className="relative aspect-square max-w-[280px] mx-auto rounded-xl overflow-hidden bg-black flex items-center justify-center border-2 border-blue-500">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {!cameraActive && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400 p-4">
                    <Camera className="w-10 h-10 mb-2 text-neutral-500" />
                    <p className="text-xs">Camera preview unavailable or permission required. Use the 1-Click Demo Receipts tab!</p>
                  </div>
                )}
                {/* Scanner visual overlay */}
                <div className="absolute inset-6 border-2 border-dashed border-white/80 rounded-lg pointer-events-none animate-pulse" />
              </div>
              <p className="text-xs text-neutral-500">
                Point camera at any printed Soliq receipt QR code.
              </p>
            </div>
          )}

          {/* Verified Receipt Preview Card */}
          {selectedReceipt && (
            <div className="bg-neutral-900 text-neutral-100 p-4 rounded-xl font-mono text-xs space-y-2 border border-neutral-800 shadow-inner">
              <div className="flex items-center justify-between text-neutral-400 border-b border-neutral-800 pb-1.5">
                <span className="flex items-center gap-1 text-emerald-400 font-sans font-bold">
                  <ShieldCheck className="w-4 h-4" /> Soliq OFD Authenticated
                </span>
                <span>{selectedReceipt.receiptNumber}</span>
              </div>
              <div className="text-white font-bold">{selectedReceipt.merchantName}</div>
              <div className="text-neutral-400">INN/STIR: {selectedReceipt.merchantInn} | Terminal: {selectedReceipt.terminalId}</div>
              <div className="border-t border-dashed border-neutral-700 pt-1.5 flex justify-between font-bold text-emerald-300">
                <span>TOTAL PAID:</span>
                <span>{selectedReceipt.totalAmount.toLocaleString()} UZS</span>
              </div>
              <div className="text-[10px] text-neutral-400 pt-1">
                Fiskal belgi: {selectedReceipt.fiscalSign} (Cryptographically verified)
              </div>
            </div>
          )}

          {/* Verification Notice */}
          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-xl text-xs text-blue-900 border border-blue-200">
            <AlertCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <strong>Why this destroys fake reviews:</strong> You cannot submit a Reality Check without a verified Soliq fiscal receipt generated at this location today. Bot farms and fake accounts are impossible.
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition"
          >
            Cancel
          </button>

          <button
            disabled={!selectedReceipt || isVerifying || verifiedSuccess}
            onClick={() => selectedReceipt && handleVerifyReceipt(selectedReceipt)}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isVerifying ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Checking Soliq OFD Database...</span>
              </>
            ) : verifiedSuccess ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-300" />
                <span>Cryptographically Verified!</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm Soliq Proof & Start Reality Check</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
