export type Language = 'uz' | 'ru' | 'en';

export type UserRole = 'visitor' | 'business' | 'dmo' | 'demo';

export interface AdvertisedClaim {
  id: string;
  category: 'pools' | 'pricing' | 'hours' | 'crowd' | 'amenities';
  label: string;
  advertisedValue: string;
  currentActualValue: string;
  discrepancySeverity: 'none' | 'minor' | 'critical'; // critical shows red alert
  lastVerifiedAt: string;
  verifiedCount: number;
}

export interface SoliqReceipt {
  fiscalSign: string;
  receiptNumber: string;
  merchantName: string;
  merchantInn: string;
  terminalId: string;
  dateTime: string;
  totalAmount: number;
  cashbackAmount: number;
  items: Array<{
    name: string;
    qty: number;
    price: number;
  }>;
  venueId: string;
  rawQrPayload: string;
}

export interface RealityCheckSubmission {
  id: string;
  venueId: string;
  receiptFiscalSign: string;
  userId: string;
  userName: string;
  submittedAt: string;
  claimsFeedback: {
    poolsStatus?: string;
    entryFeeActual?: number;
    cleanlinessRating?: number; // 1-5
    crowdLevel?: 'low' | 'moderate' | 'packed';
    facilityNotes?: string;
  };
  verifiedStatus: 'verified_soliq';
}

export interface BusinessOfficialUpdate {
  venueId: string;
  updatedAt: string;
  title: string;
  explanation: string;
  estimatedFixDate?: string;
  status: 'acknowledged' | 'in_progress' | 'resolved';
}

export interface Venue {
  id: string;
  name: string;
  nameUz: string;
  category: 'Aqua Park & Pools' | 'Sanatorium & Health' | 'Resort & Nature' | 'Amusement & Family' | 'Lakeside Recreation';
  region: 'Sirdaryo' | 'Tashkent';
  locationAddress: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
  isSoliqRegistered: boolean;
  advertisedPriceUZS: number;
  actualPriceUZS: number;
  advertisedHours: string;
  actualHours: string;
  
  // Tri-dimensional Trust Architecture
  realityMatchScore: number; // 0 - 100% (how close reality matches advertised)
  confidenceLevel: 'High' | 'Moderate' | 'Low';
  verifiedReceiptsCount: number;
  lastVerifiedMinutesAgo: number;

  // AI synthesized 2-sentence ground truth summary
  aiSummary: {
    en: string;
    uz: string;
    ru: string;
    generatedAt: string;
  };

  claims: AdvertisedClaim[];
  officialUpdates?: BusinessOfficialUpdate[];
}

export interface RegionalMetric {
  totalVenues: number;
  soliqVerifiedRate: number; // percentage
  averageRealityGap: number; // percentage
  activeDiscrepancies: number;
  flaggedGapsResolved: number;
}
