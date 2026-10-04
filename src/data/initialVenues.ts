import { Venue } from '@/types';

export const INITIAL_VENUES: Venue[] = [
  {
    id: 'oasis-aquapark-sirdaryo',
    name: 'Oasis Aqua Park Sirdaryo',
    nameUz: 'Oasis Akvaparki Sirdaryo',
    category: 'Aqua Park & Pools',
    region: 'Sirdaryo',
    locationAddress: 'Guliston shahri, Sayxun ko\'chasi 42-uy',
    coordinates: {
      lat: 40.4897,
      lng: 68.7844
    },
    imageUrl: 'https://images.unsplash.com/photo-1582650625119-3a31f8418ab9?auto=format&fit=crop&w=900&q=80',
    isSoliqRegistered: true,
    advertisedPriceUZS: 150000,
    actualPriceUZS: 220000,
    advertisedHours: '09:00 - 22:00',
    actualHours: '10:00 - 20:00',
    realityMatchScore: 54, // Severe Reality Gap!
    confidenceLevel: 'High',
    verifiedReceiptsCount: 18,
    lastVerifiedMinutesAgo: 14,
    aiSummary: {
      en: 'Verified Soliq visitors confirm that 3 out of 5 pools are currently drained for filter repairs, and entry is 220,000 UZS (70,000 UZS above website rate). The children\'s wave pool is operating normally.',
      uz: 'Soliq cheki tasdiqlangan tashrif buyuruvchilar 5 ta hovuzdan 3 tasi ta\'mirlash uchun yopilganini va kirish narxi 220,000 so\'m (saytdagidan 70,000 so\'m qimmat) ekanligini tasdiqlashdi. Bolalar hovuzi ishlamoqda.',
      ru: 'Посетители с чеками Soliq подтверждают: 3 из 5 бассейнов закрыты на ремонт фильтров, вход 220 000 сум (на 70 000 сум выше заявленного). Детская зона работает штатно.',
      generatedAt: 'Bugun, 12:15'
    },
    claims: [
      {
        id: 'c1',
        category: 'pools',
        label: 'Operating Pools',
        advertisedValue: '5 Pools (Including Wave Pool & Olympic)',
        currentActualValue: '2 Pools Open (Wave Pool only)',
        discrepancySeverity: 'critical',
        lastVerifiedAt: '14 min ago',
        verifiedCount: 18
      },
      {
        id: 'c2',
        category: 'pricing',
        label: 'Adult Full-Day Admission',
        advertisedValue: '150,000 UZS / day',
        currentActualValue: '220,000 UZS (+47% surcharge at gate)',
        discrepancySeverity: 'critical',
        lastVerifiedAt: '14 min ago',
        verifiedCount: 18
      },
      {
        id: 'c3',
        category: 'amenities',
        label: 'Extreme Water Slides',
        advertisedValue: '8 Extreme Slides Operating',
        currentActualValue: 'Slides closed (pump pressure maintenance)',
        discrepancySeverity: 'critical',
        lastVerifiedAt: '14 min ago',
        verifiedCount: 14
      },
      {
        id: 'c4',
        category: 'hours',
        label: 'Closing Time',
        advertisedValue: 'Open until 22:00',
        currentActualValue: 'Cashier closes at 19:30, pools at 20:00',
        discrepancySeverity: 'minor',
        lastVerifiedAt: '25 min ago',
        verifiedCount: 12
      }
    ],
    officialUpdates: [
      {
        venueId: 'oasis-aquapark-sirdaryo',
        updatedAt: '11:30 AM',
        title: 'Emergency Pump Filter Maintenance',
        explanation: 'Due to severe mineral sediment in the river inlet pipeline, pools 2, 3 and 4 are undergoing deep cartridge flushing. Technicians expect full reopening by tomorrow 10:00 AM. We apologize for the inconvenience.',
        estimatedFixDate: 'Ertaga 10:00',
        status: 'in_progress'
      }
    ]
  },
  {
    id: 'sardoba-eco-resort',
    name: 'Sardoba Reservoir Eco-Resort',
    nameUz: 'Sardoba Suv Ombori Eko-Dam Olish Zonasi',
    category: 'Resort & Nature',
    region: 'Sirdaryo',
    locationAddress: 'Sardoba tumani, Suv ombori qirg\'og\'i, 1-sektor',
    coordinates: {
      lat: 40.3522,
      lng: 68.4231
    },
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    isSoliqRegistered: true,
    advertisedPriceUZS: 80000,
    actualPriceUZS: 80000,
    advertisedHours: '08:00 - 21:00',
    actualHours: '08:00 - 21:00',
    realityMatchScore: 98, // Pristine match!
    confidenceLevel: 'High',
    verifiedReceiptsCount: 34,
    lastVerifiedMinutesAgo: 6,
    aiSummary: {
      en: 'Outstanding transparency. 34 Soliq receipts from today confirm pricing matches advertised rates exactly (80,000 UZS). Motorboat tours and open-air fish barbecue pavilions are operating with zero delays.',
      uz: 'A\'lo darajadagi ishonchlilik. Bugungi 34 ta Soliq cheki kirish narxi to\'liq mosligini (80,000 so\'m) tasdiqlaydi. Qayiq sayohatlari va baliq xonasi to\'liq rejimda ishlamoqda.',
      ru: 'Выдающаяся прозрачность. 34 фискальных чека подтверждают заявленные цены (80 000 сум). Лодочные экскурсии и рыбный ресторан работают без задержек.',
      generatedAt: 'Bugun, 12:40'
    },
    claims: [
      {
        id: 's1',
        category: 'pricing',
        label: 'Resort Day Pass',
        advertisedValue: '80,000 UZS',
        currentActualValue: '80,000 UZS (Verified at checkout)',
        discrepancySeverity: 'none',
        lastVerifiedAt: '6 min ago',
        verifiedCount: 34
      },
      {
        id: 's2',
        category: 'amenities',
        label: 'Boat Tours & Fishing Gear',
        advertisedValue: '12 motorboats & tackle rental',
        currentActualValue: 'All boats active, life vests provided',
        discrepancySeverity: 'none',
        lastVerifiedAt: '12 min ago',
        verifiedCount: 22
      },
      {
        id: 's3',
        category: 'hours',
        label: 'Working Hours',
        advertisedValue: '08:00 - 21:00',
        currentActualValue: 'Accurate and strictly adhered to',
        discrepancySeverity: 'none',
        lastVerifiedAt: '6 min ago',
        verifiedCount: 34
      }
    ]
  },
  {
    id: 'yangiyer-sanatorium',
    name: 'Yangiyer Mineral Sanatorium',
    nameUz: 'Yangiyer Balneologik Sihatgohi',
    category: 'Sanatorium & Health',
    region: 'Sirdaryo',
    locationAddress: 'Yangiyer shahri, Tinchlik shoh ko\'chasi 15',
    coordinates: {
      lat: 40.2644,
      lng: 68.8189
    },
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
    isSoliqRegistered: true,
    advertisedPriceUZS: 180000,
    actualPriceUZS: 195000,
    advertisedHours: '07:30 - 19:00',
    actualHours: '08:00 - 18:30',
    realityMatchScore: 84,
    confidenceLevel: 'High',
    verifiedReceiptsCount: 41,
    lastVerifiedMinutesAgo: 22,
    aiSummary: {
      en: 'Mineral baths and medical staff are fully active. Minor price variance (+15,000 UZS for single-use sanitized towels). Afternoon wait times for sulfur hydro-massage average 25 minutes.',
      uz: 'Mineral vannalar va shifokorlar to\'liq tarkibda ishlamoqda. Kichik farq: gigiyenik sochiq to\'plami uchun +15,000 so\'m. Oltingugurtli vannalarga navbat 25 daqiqa.',
      ru: 'Минеральные ванны и медперсонал работают штатно. Небольшая доплата (+15 000 сум за индивидуальный гигиенический комплект). Очередь на гидромассаж ~25 минут.',
      generatedAt: 'Bugun, 11:55'
    },
    claims: [
      {
        id: 'y1',
        category: 'pricing',
        label: 'Day Treatment Session',
        advertisedValue: '180,000 UZS',
        currentActualValue: '195,000 UZS (+15k linen fee)',
        discrepancySeverity: 'minor',
        lastVerifiedAt: '22 min ago',
        verifiedCount: 41
      },
      {
        id: 'y2',
        category: 'amenities',
        label: 'Mineral Water Pool',
        advertisedValue: '37°C Natural Thermal Spring Pool',
        currentActualValue: 'Active and clean (measured 36.8°C)',
        discrepancySeverity: 'none',
        lastVerifiedAt: '30 min ago',
        verifiedCount: 38
      },
      {
        id: 'y3',
        category: 'crowd',
        label: 'Wait Time & Capacity',
        advertisedValue: 'No appointment needed, instant entry',
        currentActualValue: '25 min queue between 11:00 - 14:00',
        discrepancySeverity: 'minor',
        lastVerifiedAt: '22 min ago',
        verifiedCount: 29
      }
    ]
  },
  {
    id: 'guliston-family-park',
    name: 'Guliston Central Amusement Park',
    nameUz: 'Guliston Markaziy Istirohat Bog\'i',
    category: 'Amusement & Family',
    region: 'Sirdaryo',
    locationAddress: 'Guliston shahri, O\'zbekiston shoh ko\'chasi',
    coordinates: {
      lat: 40.4988,
      lng: 68.7725
    },
    imageUrl: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&w=900&q=80',
    isSoliqRegistered: true,
    advertisedPriceUZS: 15000,
    actualPriceUZS: 15000,
    advertisedHours: '10:00 - 23:00',
    actualHours: '10:00 - 23:00',
    realityMatchScore: 78,
    confidenceLevel: 'Moderate',
    verifiedReceiptsCount: 15,
    lastVerifiedMinutesAgo: 38,
    aiSummary: {
      en: 'Park entry ticket matches 15,000 UZS. The main 45-meter Ferris Wheel is temporarily halted for technical inspection, but 14 other family rides and the go-kart track are operating normally.',
      uz: 'Bog\'ga kirish narxi 15,000 so\'mga to\'liq mos keladi. 45 metrlik Charxpalak texnik ko\'rik sababli to\'xtatilgan, qolgan 14 ta attraksion va karting ishlamoqda.',
      ru: 'Входной билет 15 000 сум соответствует. Главное колесо обозрения закрыто на техосмотр, остальные 14 аттракционов и картинг работают.',
      generatedAt: 'Bugun, 10:45'
    },
    claims: [
      {
        id: 'g1',
        category: 'pricing',
        label: 'General Admission',
        advertisedValue: '15,000 UZS',
        currentActualValue: '15,000 UZS verified',
        discrepancySeverity: 'none',
        lastVerifiedAt: '38 min ago',
        verifiedCount: 15
      },
      {
        id: 'g2',
        category: 'amenities',
        label: 'Ferris Wheel (Charxpalak)',
        advertisedValue: 'Continuous operation until 23:00',
        currentActualValue: 'Halted for safety inspection',
        discrepancySeverity: 'critical',
        lastVerifiedAt: '38 min ago',
        verifiedCount: 15
      }
    ]
  },
  {
    id: 'baxt-koli-beach',
    name: 'Baxt Ko\'li Riverside Beach & Camping',
    nameUz: 'Baxt Ko\'li Sohil Dam Olish Markazi',
    category: 'Lakeside Recreation',
    region: 'Sirdaryo',
    locationAddress: 'Sirdaryo daryosi sohili, Sayxunobod yo\'nalishi',
    coordinates: {
      lat: 40.5421,
      lng: 68.8512
    },
    imageUrl: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=900&q=80',
    isSoliqRegistered: true,
    advertisedPriceUZS: 50000,
    actualPriceUZS: 75000,
    advertisedHours: '09:00 - 20:00',
    actualHours: '09:00 - 19:30',
    realityMatchScore: 66,
    confidenceLevel: 'Moderate',
    verifiedReceiptsCount: 11,
    lastVerifiedMinutesAgo: 45,
    aiSummary: {
      en: 'Sunbed and pavilion rental includes mandatory 25,000 UZS ecological sanitation fee not listed on banners. Strong river current advisory: swimming permitted only within safety buoys.',
      uz: 'Tapchan va soyabon ijarasiga bannerda ko\'rsatilmagan 25,000 so\'mlik eko-yig\'im qo\'shilmoqda. Daryo oqimi tezligi sababli faqat belgilangan xavfsiz hududda cho\'milish mumkin.',
      ru: 'К аренде топчанов добавляется обязательный сбор 25 000 сум за уборку. Из-за течения реки купание разрешено только в огороженной буйками зоне.',
      generatedAt: 'Bugun, 09:30'
    },
    claims: [
      {
        id: 'b1',
        category: 'pricing',
        label: 'Beach Entry & Sunbed',
        advertisedValue: '50,000 UZS',
        currentActualValue: '75,000 UZS (50k + 25k sanitation fee)',
        discrepancySeverity: 'critical',
        lastVerifiedAt: '45 min ago',
        verifiedCount: 11
      },
      {
        id: 'b2',
        category: 'amenities',
        label: 'River Water Safety',
        advertisedValue: 'Open swimming & jet ski rental',
        currentActualValue: 'Buoyed perimeter enforced by lifeguards',
        discrepancySeverity: 'minor',
        lastVerifiedAt: '45 min ago',
        verifiedCount: 9
      }
    ]
  }
];
