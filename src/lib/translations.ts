import { Language } from '@/types';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  uz: {
    brandSubtitle: 'Haqiqatni Tekshirish Qatlami (Soliq integratsiyasi bilan)',
    tagline: 'Soxta sharhlar davri tugadi. O\'zbekistondagi hordiq maskanlarining real holati.',
    regionSirdaryo: 'Sirdaryo viloyati',
    regionTashkent: 'Toshkent shahri & viloyati',
    allCategories: 'Barcha toifalar',
    searchPlaceholder: 'Hordiq maskanlarini qidiring (Guliston, Sardoba, Yangiyer)...',
    filterHighMatch: 'Eng yuqori ishonchlilik (90%+)',
    filterRealityGap: 'Farq aniqlangan maskanlar',
    filterRecent: 'Oxirgi 1 soatda tasdiqlangan',
    
    realityMatch: 'Haqiqatga moslik',
    verifiedReceipts: 'ta Soliq cheki bilan tasdiqlangan',
    verifiedMinutesAgo: 'daqiqa oldin tekshirilgan',
    advertised: 'E\'lon qilingan',
    actualReality: 'Amaldagi holat',
    confidence: 'Ishonchlilik',
    freshness: 'Yangilangan vaqti',
    soliqProofBadge: 'Soliq 1% Keshbek Cheki Bilan Himoyalangan',
    
    viewDetails: 'Haqiqiy holatni ko\'rish',
    scanReceiptBtn: 'Soliq Chekini Skanerlash (Tasdiqlash)',
    submitRealityCheck: '15 soniyada haqiqatni yuborish',
    
    // Reality Gap labels
    severeGapAlert: 'Diqqat: Katta farq aniqlandi!',
    verifiedGenuine: 'To\'liq e\'longa mos keladi',
    moderateGap: 'Kichik farqlar mavjud',
    
    // Business portal
    businessOwnerAction: 'Muassasa rahbariyati uchun',
    acknowledgeIssue: 'Muammoni rasman tasdiqlash & izoh qoldirish',
    transparencyBonus: 'Shaffoflik kafolati: Rasmiy izoh ishonch reytingini tiklaydi',
    
    // DMO
    dmoTitle: 'Turizm Qo\'mitasi & Hokimlik Nazorati (DMO)',
    dmoSubtitle: 'Sirdaryo viloyati bo\'yicha real vaqt monitoringi',
    
    // Killer demo
    demoBarTitle: 'Hakamlar uchun 3 daqiqalik Jonli Demo ssenariysi',
    demoStep1: '1. Muammoni ko\'rsatish (Oasis Akvapark farqi)',
    demoStep2: '2. Soliq chekini skanerlash (Kriptografik dalil)',
    demoStep3: '3. Sun\'iy intellekt xulosasi yangilanishi',
    demoStep4: '4. Rahbariyatning shaffof izohi & Reyting tiklanishi',
  },
  ru: {
    brandSubtitle: 'Слой верификации реальности (Интеграция с чеками Soliq)',
    tagline: 'Эпоха заказных отзывов окончена. Достоверные данные о зонах отдыха Узбекистана.',
    regionSirdaryo: 'Сырдарьинская область',
    regionTashkent: 'г. Ташкент и область',
    allCategories: 'Все категории',
    searchPlaceholder: 'Поиск мест отдыха (Гулистан, Сардоба, Янгиер)...',
    filterHighMatch: 'Высокое соответствие (90%+)',
    filterRealityGap: 'Выявлены расхождения',
    filterRecent: 'Проверено за последний час',
    
    realityMatch: 'Соответствие реальности',
    verifiedReceipts: 'чеков Soliq подтвердили',
    verifiedMinutesAgo: 'мин. назад верифицировано',
    advertised: 'Заявлено бизнесом',
    actualReality: 'Фактическая реальность',
    confidence: 'Уровень доверия',
    freshness: 'Свежесть данных',
    soliqProofBadge: 'Защищено фискальным чеком Soliq (1% кэшбэк)',
    
    viewDetails: 'Смотреть реальную картину',
    scanReceiptBtn: 'Сканировать чек Soliq',
    submitRealityCheck: 'Оставить отчет за 15 секунд',
    
    severeGapAlert: 'Внимание: Обнаружено существенное несоответствие!',
    verifiedGenuine: 'Полное соответствие заявленному',
    moderateGap: 'Незначительные расхождения',
    
    businessOwnerAction: 'Кабинет владельца бизнеса',
    acknowledgeIssue: 'Официально признать проблему и дать комментарий',
    transparencyBonus: 'Бонус прозрачности: Официальный ответ восстанавливает статус доверия',
    
    dmoTitle: 'Мониторинг Комитета по Туризму (DMO)',
    dmoSubtitle: 'Реальная аналитика зон отдыха Сырдарьинской области',
    
    demoBarTitle: 'Интерактивный 3-минутный сценарий для жюри',
    demoStep1: '1. Проблема: Oasis Aqua Park (разрыв рекламы и факта)',
    demoStep2: '2. Скан фискального чека (Криптографическое доказательство)',
    demoStep3: '3. Мгновенное обновление AI-саммари',
    demoStep4: '4. Официальный ответ бизнеса и реабилитация',
  },
  en: {
    brandSubtitle: 'The Ground-Truth Verification Layer (Backed by Soliq Fiscal QR)',
    tagline: 'The era of fake reviews is over. Cryptographically verified conditions for Uzbekistan recreation.',
    regionSirdaryo: 'Sirdaryo Region',
    regionTashkent: 'Tashkent City & Region',
    allCategories: 'All Categories',
    searchPlaceholder: 'Search destinations (Guliston, Sardoba, Yangiyer)...',
    filterHighMatch: 'Pristine Accuracy (90%+)',
    filterRealityGap: 'Reality Gaps Detected',
    filterRecent: 'Verified in Past Hour',
    
    realityMatch: 'Reality Match Score',
    verifiedReceipts: 'Soliq fiscal receipts verified',
    verifiedMinutesAgo: 'min ago verified',
    advertised: 'Advertised Claim',
    actualReality: 'Ground Reality',
    confidence: 'Confidence',
    freshness: 'Freshness',
    soliqProofBadge: 'Protected by Soliq Fiscal Receipt QR (Proof of Purchase)',
    
    viewDetails: 'Inspect Ground Truth',
    scanReceiptBtn: 'Scan Soliq Receipt (Verify Presence)',
    submitRealityCheck: '15-Sec Reality Check',
    
    severeGapAlert: 'Critical Reality Gap Detected!',
    verifiedGenuine: 'Verified 100% Genuine',
    moderateGap: 'Minor Discrepancies Found',
    
    businessOwnerAction: 'Venue Management Portal',
    acknowledgeIssue: 'Officially Acknowledge & Explain Issue',
    transparencyBonus: 'Transparency Bonus: Official disclosure restores trust level',
    
    dmoTitle: 'Tourism Board & Regional Administration (DMO)',
    dmoSubtitle: 'Real-time infrastructure health across Sirdaryo region',
    
    demoBarTitle: 'Interactive 3-Minute Judge Demo Guide',
    demoStep1: '1. Show Problem: Oasis Aqua Park Reality Gap',
    demoStep2: '2. Scan Soliq Receipt (Proof-of-Presence)',
    demoStep3: '3. Instant Real-time AI Summary Update',
    demoStep4: '4. Business Transparency Response & Trust Rebound',
  }
};
