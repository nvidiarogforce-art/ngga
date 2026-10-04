'use client';

import React from 'react';
import { Language, UserRole } from '@/types';
import { TRANSLATIONS } from '@/lib/translations';
import { ShieldCheck, QrCode, Building, BarChart3, Globe, MapPin } from 'lucide-react';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  selectedRegion: 'Sirdaryo' | 'Tashkent';
  onRegionChange: (region: 'Sirdaryo' | 'Tashkent') => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenScanner: () => void;
  onOpenDmo: () => void;
  onOpenBusinessPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  selectedRegion,
  onRegionChange,
  onOpenScanner,
  onOpenDmo,
  onOpenBusinessPortal
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-neutral-950">TrueSpot</span>
              <span className="text-[10px] uppercase tracking-wider font-extrabold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full border border-blue-200">
                V2 Reality Layer
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 hidden sm:block">
              {t.brandSubtitle}
            </p>
          </div>
        </div>

        {/* Region & Actions Bar */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Region Toggle */}
          <div className="flex items-center bg-neutral-100 p-1 rounded-xl border border-neutral-200 text-xs">
            <button
              onClick={() => onRegionChange('Sirdaryo')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1 ${
                selectedRegion === 'Sirdaryo'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Sirdaryo (Competition Pilot)</span>
            </button>
            <button
              onClick={() => onRegionChange('Tashkent')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1 ${
                selectedRegion === 'Tashkent'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              <span>Toshkent</span>
            </button>
          </div>

          {/* Soliq Scan Button */}
          <button
            onClick={onOpenScanner}
            className="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow transition flex items-center gap-1.5"
          >
            <QrCode className="w-4 h-4 text-blue-200" />
            <span>Soliq QR Skaner</span>
          </button>

          {/* Business Portal Button */}
          <button
            onClick={onOpenBusinessPortal}
            className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            title="Business Owner Management Portal"
          >
            <Building className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden md:inline">Business Portal</span>
          </button>

          {/* DMO Button */}
          <button
            onClick={onOpenDmo}
            className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            title="Tourism Board (DMO) Dashboard"
          >
            <BarChart3 className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden md:inline">DMO Analytics</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-neutral-100 p-1 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-600">
            <Globe className="w-3.5 h-3.5 mx-1 text-neutral-400" />
            {(['uz', 'ru', 'en'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`px-2 py-1 rounded-md transition uppercase text-[11px] ${
                  language === lang
                    ? 'bg-white text-blue-700 shadow-xs font-extrabold'
                    : 'hover:text-neutral-900'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
