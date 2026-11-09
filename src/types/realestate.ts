export type UserRole = 'admin' | 'broker' | 'public';

export type ListingType = 'buy' | 'rent' | 'off-plan';

export interface PaymentPlanMilestone {
  stage: string;
  percentage: number;
  dueDate: string;
  note?: string;
}

export interface PropertyListing {
  id: string;
  title: string;
  headline?: string;
  type: ListingType;
  category: 'Apartment' | 'Villa' | 'Penthouse' | 'Townhouse' | 'Duplex';
  community: string;
  subLocation?: string;
  exactUnitNumber?: string; // RESTRICTED: admin only
  displayUnit?: string; // Public/Broker sanitized e.g. "Marina Gate, High Floor"
  priceAED: number;
  originalPriceAED?: number;
  beds: number;
  baths: number;
  sqft: number;
  developer?: string;
  handoverDate?: string;
  badge?: 'Hot Deal' | 'Active Promo' | 'High ROI' | 'New Launch' | 'Ready to Move';
  description: string;
  bulletPoints: string[];
  amenities: string[];
  images: string[];
  videoUrl?: string;
  videoPoster?: string;
  brochureUrl?: string;
  brochureName?: string;
  paymentPlan?: PaymentPlanMilestone[];
  isOffPlan: boolean;
  rentalYieldPercent?: number;
  views?: string;
  serviceChargesAED?: number;
  dldEscrowNumber?: string; // DLD Mashrooi government verification
  sourcePortal?: string; // e.g. DXBOffPlan, Emaar.com, Bayut
  sourceUrl?: string;
  constructionStatus?: string; // e.g. 35% Completed (DLD Verified)
  
  // RESTRICTED: Owner CRM Vault Data (Admin Only)
  ownerId?: string;
  ownerName?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  leaseStartDate?: string;
  leaseEndDate?: string;
  currentRentAED?: number;
  titleDeedNumber?: string;
  privateNotes?: string;
  isPublishedPublic: boolean;
  createdAt: string;
}

export interface OwnerCRMRecord {
  id: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  propertyTitle: string;
  community: string;
  exactUnitNumber: string;
  sanitizedLocation: string; // e.g. "High Floor, Tower 2"
  beds: number;
  baths: number;
  sqft: number;
  propertyType: 'Apartment' | 'Villa' | 'Penthouse' | 'Townhouse';
  targetSalePriceAED?: number;
  targetRentPriceAED?: number;
  currentRentAED?: number;
  tenantName?: string;
  tenantPhone?: string;
  leaseStartDate?: string;
  leaseEndDate: string; // YYYY-MM-DD
  titleDeedNumber?: string;
  privateNotes?: string;
  status: 'Occupied' | 'Vacant' | 'Renewal Pending' | 'Listed';
  isPublishedToMarketplace: boolean;
  marketplaceListingId?: string;
  images: string[];
  createdAt: string;
}

export interface LeadInquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyType: ListingType;
  inquirerType: 'buyer' | 'tenant' | 'broker';
  name: string;
  email: string;
  phone: string;
  companyOrAgency?: string;
  brokerLicense?: string;
  message: string;
  budgetAED?: number;
  preferredTimeframe?: string;
  status: 'New' | 'Contacted' | 'Viewing Scheduled' | 'Offer Submitted' | 'Closed';
  createdAt: string;
}

export interface AIParseBrochureResult {
  projectName: string;
  developer: string;
  location: string;
  startingPriceAED: number;
  completionDate: string;
  category: 'Apartment' | 'Villa' | 'Penthouse' | 'Townhouse' | 'Duplex';
  bedsRange: string;
  sqftRange: string;
  headline: string;
  description: string;
  paymentPlan: PaymentPlanMilestone[];
  amenities: string[];
  bulletPoints: string[];
  suggestedBadge?: 'Hot Deal' | 'Active Promo' | 'High ROI' | 'New Launch';
  architecturalHighlights?: string;
  videoUrl?: string;
  videoPoster?: string;
  dldEscrowNumber?: string;
  sourcePortal?: string;
  constructionStatus?: string;
  images?: string[];
}

export interface AIQuickUploadResult {
  title: string;
  headline: string;
  description: string;
  priceAED: number;
  beds: number;
  baths: number;
  sqft: number;
  community: string;
  displayUnit: string;
  category: 'Apartment' | 'Villa' | 'Penthouse' | 'Townhouse';
  bulletPoints: string[];
  amenities: string[];
  rentalYieldPercent: number;
  badge?: 'Hot Deal' | 'Active Promo' | 'High ROI' | 'Ready to Move';
  views?: string;
}
