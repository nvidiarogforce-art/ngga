'use client';

import React, { useState } from 'react';
import { Venue, Language, UserRole, SoliqReceipt } from '@/types';
import { INITIAL_VENUES } from '@/data/initialVenues';
import { TRANSLATIONS } from '@/lib/translations';
import { Navbar } from '@/components/Navbar';
import { KillerDemoGuide } from '@/components/KillerDemoGuide';
import { VenueCard } from '@/components/VenueCard';
import { VenueDetailModal } from '@/components/VenueDetailModal';
import { ReceiptScannerModal } from '@/components/ReceiptScannerModal';
import { RealityCheckFormModal } from '@/components/RealityCheckFormModal';
import { BusinessPortalModal } from '@/components/BusinessPortalModal';
import { DmoDashboardModal } from '@/components/DmoDashboardModal';
import { Search, Filter, ShieldCheck, Sparkles, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

export default function Home() {
  const [language, setLanguage] = useState<Language>('uz');
  const [selectedRegion, setSelectedRegion] = useState<'Sirdaryo' | 'Tashkent'>('Sirdaryo');
  const [userRole, setUserRole] = useState<UserRole>('visitor');
  const [venues, setVenues] = useState<Venue[]>(INITIAL_VENUES);
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'gap' | 'high_match' | 'recent'>('all');

  // Interactive Modals State
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isRealityCheckOpen, setIsRealityCheckOpen] = useState(false);
  const [isBusinessPortalOpen, setIsBusinessPortalOpen] = useState(false);
  const [isDmoOpen, setIsDmoOpen] = useState(false);
  const [verifiedReceipt, setVerifiedReceipt] = useState<SoliqReceipt | null>(null);
  const [activeVenueForScan, setActiveVenueForScan] = useState<Venue | null>(null);
  
  // Killer Demo Step State
  const [demoStep, setDemoStep] = useState<number>(0);
  const [highlightedVenueId, setHighlightedVenueId] = useState<string | null>(null);

  const t = TRANSLATIONS[language];

  // Handle Demo Sequence
  const handleTriggerDemoStep = (step: number) => {
    setDemoStep(step);
    if (step === 1) {
      // Step 1: Highlight Oasis Aqua Park and open its Reality Gap inspection
      const oasis = venues.find(v => v.id === 'oasis-aquapark-sirdaryo') || venues[0];
      setHighlightedVenueId(oasis.id);
      setSelectedVenue(oasis);
      setIsScannerOpen(false);
      setIsRealityCheckOpen(false);
      setIsBusinessPortalOpen(false);
      setIsDmoOpen(false);
    } else if (step === 2) {
      // Step 2: Open Soliq Receipt Scanner with Oasis Aqua Park pre-selected
      const oasis = venues.find(v => v.id === 'oasis-aquapark-sirdaryo') || venues[0];
      setSelectedVenue(null);
      setActiveVenueForScan(oasis);
      setIsScannerOpen(true);
    } else if (step === 3) {
      // Step 3: Open 15-second reality check form
      const oasis = venues.find(v => v.id === 'oasis-aquapark-sirdaryo') || venues[0];
      setIsScannerOpen(false);
      const sampleReceipt = {
        venueId: oasis.id,
        fiscalSign: '984102948172',
        receiptNumber: 'CHK-0004921',
        merchantName: 'OASIS AQUA SERVIS MCHJ',
        merchantInn: '308941203',
        terminalId: 'NKM-882194',
        dateTime: 'Bugun, 12:18',
        totalAmount: 220000,
        cashbackAmount: 2200,
        items: [{ name: 'Kattalar uchun kunlik chipta (Aqua Park)', qty: 1, price: 220000 }],
        rawQrPayload: 'https://soliq.uz/receipt?fs=984102948172'
      };
      setVerifiedReceipt(sampleReceipt);
      setActiveVenueForScan(oasis);
      setIsRealityCheckOpen(true);
    } else if (step === 4) {
      // Step 4: Open Business Owner Portal for Oasis
      const oasis = venues.find(v => v.id === 'oasis-aquapark-sirdaryo') || venues[0];
      setSelectedVenue(null);
      setIsScannerOpen(false);
      setIsRealityCheckOpen(false);
      setActiveVenueForScan(oasis);
      setIsBusinessPortalOpen(true);
    } else if (step === 5) {
      // Step 5: Open DMO Regional Tourism Board Dashboard
      setSelectedVenue(null);
      setIsScannerOpen(false);
      setIsRealityCheckOpen(false);
      setIsBusinessPortalOpen(false);
      setIsDmoOpen(true);
    }
  };

  // Handlers for Receipt Scan -> Reality Check
  const handleReceiptVerified = (receipt: SoliqReceipt) => {
    setVerifiedReceipt(receipt);
    setIsScannerOpen(false);
    const targetVenue = venues.find(v => v.id === receipt.venueId) || venues[0];
    setActiveVenueForScan(targetVenue);
    setIsRealityCheckOpen(true);
  };

  // Handler for Reality Check submission
  const handleSubmitRealityCheck = (data: {
    venueId: string;
    poolsOpen: number;
    pricePaidUZS: number;
    cleanliness: number;
    crowdLevel: 'low' | 'moderate' | 'packed';
  }) => {
    setVenues(prev =>
      prev.map(v => {
        if (v.id === data.venueId) {
          const newReceiptsCount = v.verifiedReceiptsCount + 1;
          const newScore = Math.max(30, Math.min(95, Math.round((data.poolsOpen / 5) * 60 + 20)));
          return {
            ...v,
            verifiedReceiptsCount: newReceiptsCount,
            lastVerifiedMinutesAgo: 1,
            realityMatchScore: newScore,
            aiSummary: {
              ...v.aiSummary,
              en: `Latest Soliq receipt confirmed ${data.poolsOpen} pools open and ${data.pricePaidUZS.toLocaleString()} UZS paid at cashier. Cleanliness rated ${data.cleanliness}/5 with ${data.crowdLevel} crowd density.`,
              uz: `Yangi Soliq cheki orqali ${data.poolsOpen} ta hovuz ochiqligi va kassada ${data.pricePaidUZS.toLocaleString()} so'm to'langani tasdiqlandi. Tozalik: ${data.cleanliness}/5.`,
              ru: `Свежий чек Soliq подтвердил ${data.poolsOpen} открытых бассейна и оплату ${data.pricePaidUZS.toLocaleString()} сум на кассе. Чистота: ${data.cleanliness}/5.`
            }
          };
        }
        return v;
      })
    );
  };

  // Handler for Business Official Response
  const handleUpdateOfficialResponse = (data: {
    venueId: string;
    title: string;
    explanation: string;
    estimatedFixDate: string;
  }) => {
    setVenues(prev =>
      prev.map(v => {
        if (v.id === data.venueId) {
          // Transparency bonus: boosts score by +15% and adds official update
          const boostedScore = Math.min(92, v.realityMatchScore + 15);
          return {
            ...v,
            realityMatchScore: boostedScore,
            officialUpdates: [
              {
                venueId: data.venueId,
                title: data.title,
                explanation: data.explanation,
                estimatedFixDate: data.estimatedFixDate,
                updatedAt: 'Hozirgina',
                status: 'in_progress'
              }
            ]
          };
        }
        return v;
      })
    );
  };

  // Filtered venues
  const filteredVenues = venues.filter(v => {
    const matchesRegion = v.region === selectedRegion;
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.nameUz.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.locationAddress.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || v.category === selectedCategory;

    let matchesFilter = true;
    if (filterMode === 'gap') matchesFilter = v.realityMatchScore < 75;
    if (filterMode === 'high_match') matchesFilter = v.realityMatchScore >= 85;
    if (filterMode === 'recent') matchesFilter = v.lastVerifiedMinutesAgo <= 20;

    return matchesRegion && matchesSearch && matchesCategory && matchesFilter;
  });

  return (
    <div
      className="min-h-screen bg-neutral-100/70 text-neutral-900 flex flex-col font-sans"
      suppressHydrationWarning
    >
      {/* 3-Minute Demo Pitch Guide Bar for Judges */}
      <KillerDemoGuide onTriggerStep={handleTriggerDemoStep} currentStep={demoStep} />

      {/* Main Navbar */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        currentRole={userRole}
        onRoleChange={setUserRole}
        onOpenScanner={() => {
          setActiveVenueForScan(venues[0]);
          setIsScannerOpen(true);
        }}
        onOpenDmo={() => setIsDmoOpen(true)}
        onOpenBusinessPortal={() => {
          setActiveVenueForScan(venues[0]);
          setIsBusinessPortalOpen(true);
        }}
      />

      {/* Hero Section */}
      <section className="bg-white border-b border-neutral-200 py-8 px-4">
        <div className="max-w-7xl mx-auto space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 mb-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>O&apos;zbekiston Soliq fiskal cheklari bilan himoyalangan</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight leading-tight">
                Haqiqatni Tekshirish Qatlami
              </h1>
              <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
                Soxta sharhlar va aldamchi narxlar davri tugadi. Hordiq maskanlarining real holati — tashrif buyuruvchilarning Soliq keshbek cheklari bilan 100% kriptografik tasdiqlangan.
              </p>
            </div>

            {/* Quick Metrics Badge */}
            <div className="flex items-center gap-3 bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200 shrink-0">
              <div className="text-right">
                <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                  {selectedRegion} Monitoringi
                </span>
                <span className="text-lg font-black text-neutral-900">
                  {venues.length} Maskan · 119 Chek Bugun
                </span>
              </div>
              <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-hidden transition"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-2 text-xs font-bold rounded-xl transition shrink-0 ${
                  filterMode === 'all'
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                Barchasi
              </button>
              <button
                onClick={() => setFilterMode('gap')}
                className={`px-3 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                  filterMode === 'gap'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Farq aniqlanganlar (Reality Gap)</span>
              </button>
              <button
                onClick={() => setFilterMode('high_match')}
                className={`px-3 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0 ${
                  filterMode === 'high_match'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>To&apos;liq mos (90%+)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-neutral-900">
              {selectedRegion === 'Sirdaryo' ? 'Sirdaryo viloyati hordiq maskanlari' : 'Toshkent maskanlari'}
            </h2>
            <span className="text-xs bg-neutral-200 px-2 py-0.5 rounded-full font-bold text-neutral-700">
              {filteredVenues.length}
            </span>
          </div>

          <div className="text-xs text-neutral-500 hidden sm:block">
            Har bir ma&apos;lumot Soliq fiskal QR-kodi orqali tasdiqlangan
          </div>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              language={language}
              isHighlighted={highlightedVenueId === venue.id}
              onSelectVenue={(v) => setSelectedVenue(v)}
              onScanReceipt={(v) => {
                setActiveVenueForScan(v);
                setIsScannerOpen(true);
              }}
            />
          ))}
        </div>

        {filteredVenues.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200 space-y-3">
            <Filter className="w-8 h-8 text-neutral-400 mx-auto" />
            <h3 className="font-bold text-base text-neutral-800">Maskanlar topilmadi</h3>
            <p className="text-xs text-neutral-500">
              Tanlangan filtrlar bo&apos;yicha ma&apos;lumot mavjud emas. Filtrlarni tozalab ko&apos;ring.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-6 px-4 text-xs text-neutral-500 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-neutral-800">TrueSpot V2</span>
            <span>· Case C: Trusted Recreation Information (Sirdaryo IT Case Competition)</span>
          </div>
          <div>
            Kriptografik Soliq cheklari &amp; Reality Gap Engine asosida ishlab chiqilgan
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Venue Detail Modal */}
      <VenueDetailModal
        venue={selectedVenue}
        language={language}
        onClose={() => setSelectedVenue(null)}
        onOpenScanner={(v) => {
          setActiveVenueForScan(v);
          setIsScannerOpen(true);
        }}
      />

      {/* 2. Soliq Receipt Scanner Modal */}
      <ReceiptScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        defaultVenueId={activeVenueForScan?.id}
        onReceiptVerified={handleReceiptVerified}
      />

      {/* 3. 15-Second Reality Check Form */}
      {activeVenueForScan && verifiedReceipt && (
        <RealityCheckFormModal
          isOpen={isRealityCheckOpen}
          onClose={() => setIsRealityCheckOpen(false)}
          venue={activeVenueForScan}
          receipt={verifiedReceipt}
          onSubmitCheck={handleSubmitRealityCheck}
        />
      )}

      {/* 4. Business Owner Portal */}
      {activeVenueForScan && (
        <BusinessPortalModal
          isOpen={isBusinessPortalOpen}
          onClose={() => setIsBusinessPortalOpen(false)}
          venue={activeVenueForScan}
          onUpdateOfficialResponse={handleUpdateOfficialResponse}
        />
      )}

      {/* 5. DMO Regional Tourism Board Dashboard */}
      <DmoDashboardModal
        isOpen={isDmoOpen}
        onClose={() => setIsDmoOpen(false)}
        venues={venues}
      />
    </div>
  );
}
