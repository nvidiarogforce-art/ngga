import { SoliqReceipt } from '@/types';

export const SAMPLE_RECEIPTS: SoliqReceipt[] = [
  {
    venueId: 'oasis-aquapark-sirdaryo',
    fiscalSign: '984102948172',
    receiptNumber: 'CHK-0004921',
    merchantName: 'OASIS AQUA SERVIS MCHJ',
    merchantInn: '308941203',
    terminalId: 'NKM-882194',
    dateTime: 'Bugun, 12:18',
    totalAmount: 220000,
    cashbackAmount: 2200,
    items: [
      { name: 'Kattalar uchun kunlik chipta (Aqua Park)', qty: 1, price: 220000 }
    ],
    rawQrPayload: 'https://soliq.uz/receipt?fs=984102948172&t=NKM-882194&s=220000&d=202610041218'
  },
  {
    venueId: 'sardoba-eco-resort',
    fiscalSign: '772910482910',
    receiptNumber: 'CHK-0009182',
    merchantName: 'SARDOBA EKOTURIZM BAZASI',
    merchantInn: '307182940',
    terminalId: 'NKM-339102',
    dateTime: 'Bugun, 11:45',
    totalAmount: 80000,
    cashbackAmount: 800,
    items: [
      { name: 'Eko-hududga kirish va motorli qayiq sayohati', qty: 1, price: 80000 }
    ],
    rawQrPayload: 'https://soliq.uz/receipt?fs=772910482910&t=NKM-339102&s=80000&d=202610041145'
  },
  {
    venueId: 'yangiyer-sanatorium',
    fiscalSign: '661902847192',
    receiptNumber: 'CHK-0012094',
    merchantName: 'YANGIYER SIHAT MASKANI XK',
    merchantInn: '301948271',
    terminalId: 'NKM-110294',
    dateTime: 'Bugun, 10:20',
    totalAmount: 195000,
    cashbackAmount: 1950,
    items: [
      { name: 'Mineral vannalar kompleks seansi', qty: 1, price: 180000 },
      { name: 'Yakka tartibdagi sanitariya to\'plami', qty: 1, price: 15000 }
    ],
    rawQrPayload: 'https://soliq.uz/receipt?fs=661902847192&t=NKM-110294&s=195000&d=202610041020'
  },
  {
    venueId: 'guliston-family-park',
    fiscalSign: '551029481722',
    receiptNumber: 'CHK-0038192',
    merchantName: 'GULISTON MADANIYAT VA DAM BOG\'I',
    merchantInn: '200192849',
    terminalId: 'NKM-771920',
    dateTime: 'Bugun, 11:05',
    totalAmount: 15000,
    cashbackAmount: 150,
    items: [
      { name: 'Markaziy bog\' kirish kartasi', qty: 1, price: 15000 }
    ],
    rawQrPayload: 'https://soliq.uz/receipt?fs=551029481722&t=NKM-771920&s=15000&d=202610041105'
  }
];
