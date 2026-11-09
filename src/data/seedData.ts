import type { PropertyListing, OwnerCRMRecord, LeadInquiry } from '../types/realestate.ts';

export interface PortalSourceInfo {
  id: string;
  name: string;
  category: 'Specialized Off-Plan Portals' | 'Major UAE Aggregators' | 'Official Developer Portals' | 'Regulatory & Government Portals';
  url: string;
  badge: string;
  description: string;
  coverage: string;
  sampleUrl: string;
  iconName: string;
}

export const PORTAL_SOURCES: PortalSourceInfo[] = [
  // 1. Specialized Off-Plan Portals
  {
    id: 'dxboffplan',
    name: 'DXBOffPlan.com',
    category: 'Specialized Off-Plan Portals',
    url: 'https://dxboffplan.com',
    badge: 'Pure Off-Plan DB',
    description: 'Extensive database purely dedicated to new launches, payment plans, brochures, floor plans, and construction timelines in Dubai.',
    coverage: 'Dubai Launches, Floorplans, Developer Price Sheets',
    sampleUrl: 'https://dxboffplan.com/properties/creek-waters-by-emaar/',
    iconName: 'Building'
  },
  {
    id: 'offplan-dubai',
    name: 'OffPlan-Dubai.com',
    category: 'Specialized Off-Plan Portals',
    url: 'https://offplan-dubai.com',
    badge: 'Under-Construction Hub',
    description: 'Dedicated portal offering comprehensive updates on under-construction apartments, townhouses, and luxury villas.',
    coverage: 'Developer filter, Handover year, Masterplan budgets',
    sampleUrl: 'https://offplan-dubai.com/damac-lagoons-costa-brava/',
    iconName: 'Layers'
  },
  {
    id: 'off-planproperties',
    name: 'Off-PlanProperties.ae',
    category: 'Specialized Off-Plan Portals',
    url: 'https://off-planproperties.ae',
    badge: 'Investment Analysis',
    description: 'Focuses on community overviews, area guides, floor plans, and investment yield analysis for new master developments.',
    coverage: 'Community Masterplans, Yield & ROI Projections',
    sampleUrl: 'https://off-planproperties.ae/sobha-hartland-ii/',
    iconName: 'TrendingUp'
  },
  {
    id: 'uae-offplan',
    name: 'UAE-OffPlan.com',
    category: 'Specialized Off-Plan Portals',
    url: 'https://uae-offplan.com',
    badge: 'Multi-Emirate',
    description: 'Covers off-plan developments across Dubai, Abu Dhabi (Yas/Saadiyat), Sharjah, and Ras Al Khaimah (Al Marjan).',
    coverage: 'Dubai, Abu Dhabi, Sharjah, RAK Wynn Casino Hub',
    sampleUrl: 'https://uae-offplan.com/al-marjan-island-villas/',
    iconName: 'Globe'
  },

  // 2. Major UAE Real Estate Aggregators
  {
    id: 'propertyfinder',
    name: 'Property Finder (propertyfinder.ae)',
    category: 'Major UAE Aggregators',
    url: 'https://www.propertyfinder.ae',
    badge: 'New Projects Hub',
    description: 'Largest UAE property portal with dedicated New Projects engine, verified developer pricing, and interactive master plans.',
    coverage: 'Verified Price Book, Developer Rankings, 3D Masterplans',
    sampleUrl: 'https://www.propertyfinder.ae/new-projects/emaar/creek-waters',
    iconName: 'Search'
  },
  {
    id: 'bayut',
    name: 'Bayut (bayut.com)',
    category: 'Major UAE Aggregators',
    url: 'https://www.bayut.com',
    badge: 'Search 2.0 & 3D Plans',
    description: 'Features Search 2.0 tool, 2D/3D floorplans, area price trends, and developer track records across the UAE.',
    coverage: 'TruCheck Verified, 3D Interactive Floorplans, DLD Trends',
    sampleUrl: 'https://www.bayut.com/new-projects/palm-jebel-ali/',
    iconName: 'Maximize2'
  },
  {
    id: 'dubizzle',
    name: 'Dubizzle (dubizzle.com)',
    category: 'Major UAE Aggregators',
    url: 'https://dubizzle.com',
    badge: 'Direct & Assignments',
    description: 'Provides both developer-direct off-plan launches and secondary market off-plan seller assignments.',
    coverage: 'Developer Direct + Off-Plan Resale Assignments',
    sampleUrl: 'https://dubizzle.com/property/bayz-101-danube/',
    iconName: 'Tag'
  },

  // 3. Official Developer Portals
  {
    id: 'emaar',
    name: 'Emaar Properties (emaar.com)',
    category: 'Official Developer Portals',
    url: 'https://properties.emaar.com',
    badge: 'Master Developer',
    description: 'Global master developer behind Downtown Dubai, Dubai Creek Harbour, Dubai Hills Estate, and The Oasis.',
    coverage: 'Downtown, Creek Harbour, Dubai Hills, Emaar South',
    sampleUrl: 'https://properties.emaar.com/en/our-communities/dubai-creek-harbour/creek-waters/',
    iconName: 'Building2'
  },
  {
    id: 'damac',
    name: 'DAMAC Properties (damacproperties.com)',
    category: 'Official Developer Portals',
    url: 'https://www.damacproperties.com',
    badge: 'Luxury Masterplans',
    description: 'Pioneer of branded real estate and water-inspired master communities including DAMAC Lagoons, Hills, and Islands.',
    coverage: 'DAMAC Lagoons, Cavalli Couture, DAMAC Islands',
    sampleUrl: 'https://www.damacproperties.com/en/projects/damac-lagoons-costa-brava/',
    iconName: 'Sparkles'
  },
  {
    id: 'sobharealty',
    name: 'Sobha Realty (sobharealty.com)',
    category: 'Official Developer Portals',
    url: 'https://sobharealty.com',
    badge: 'Backward Integrated',
    description: 'Renowned for in-house backward integration and unmatched craftsmanship in Sobha Hartland and MBR City.',
    coverage: 'Sobha Hartland II, Sobha Orbis, Sky Mansions',
    sampleUrl: 'https://sobharealty.com/dubai/sobha-hartland-ii/',
    iconName: 'ShieldCheck'
  },
  {
    id: 'nakheel',
    name: 'Nakheel / Dubai Holding (nakheel.com)',
    category: 'Official Developer Portals',
    url: 'https://www.nakheel.com',
    badge: 'Waterfront Icons',
    description: 'Master developer of global waterfront icons including Palm Jumeirah, Palm Jebel Ali, and Dubai Islands.',
    coverage: 'Palm Jebel Ali Frond Mansions, Dubai Islands',
    sampleUrl: 'https://www.nakheel.com/en/palm-jebel-ali/',
    iconName: 'Anchor'
  },
  {
    id: 'danube',
    name: 'Danube Properties (danubeproperties.ae)',
    category: 'Official Developer Portals',
    url: 'https://danubeproperties.ae',
    badge: '1% Monthly Plan',
    description: 'Pioneer of the 1% monthly payment plan, delivering high-yield furnished towers with 40+ resort amenities.',
    coverage: 'Bayz 101, Diamondz JLT, 1% Payment Plans',
    sampleUrl: 'https://danubeproperties.ae/project/bayz-101/',
    iconName: 'DollarSign'
  },
  {
    id: 'binghatti',
    name: 'Binghatti Developers (binghatti.com)',
    category: 'Official Developer Portals',
    url: 'https://www.binghatti.com',
    badge: 'Hyper-Tower Branded',
    description: 'Creators of architectural hyper-towers partnered with luxury brands Mercedes-Benz, Bugatti, and Jacob & Co.',
    coverage: 'Mercedes-Benz Places, Bugatti Residences, Downtown',
    sampleUrl: 'https://www.binghatti.com/mercedes-benz-places/',
    iconName: 'Zap'
  },
  {
    id: 'aldar',
    name: 'Aldar Properties (aldar.com)',
    category: 'Official Developer Portals',
    url: 'https://www.aldar.com',
    badge: 'Abu Dhabi & Dubai',
    description: 'Premier Abu Dhabi developer expanding into Dubai with nature and wellness master communities Haven and Athlon.',
    coverage: 'Haven Dubailand, Athlon Dubai, Saadiyat Cultural District',
    sampleUrl: 'https://www.aldar.com/en/explore-aldar/haven-by-aldar',
    iconName: 'Compass'
  },
  {
    id: 'arada',
    name: 'Arada (arada.com)',
    category: 'Official Developer Portals',
    url: 'https://arada.com',
    badge: 'Eco & Branded',
    description: 'Fastest-growing master developer behind Armani Beach Residences at Palm Jumeirah and Masaar forest community.',
    coverage: 'Armani Beach Residences, Masaar Forest, Aljada',
    sampleUrl: 'https://arada.com/en/residential/dubai/armani-beach-residences/',
    iconName: 'Feather'
  },

  // 4. Regulatory & Government Verification Portals
  {
    id: 'dld-mashrooi',
    name: 'Dubai Land Department / Mashrooi (dubailand.gov.ae)',
    category: 'Regulatory & Government Portals',
    url: 'https://dubailand.gov.ae',
    badge: 'Official DLD Escrow & Tracker',
    description: 'Official government portal and Dubai REST mobile app tracking registered escrow accounts, RERA developer licenses, and real-time construction site photo audits.',
    coverage: 'DLD Mashrooi Tracker, Escrow Account Validation, RERA Licensing',
    sampleUrl: 'https://dubailand.gov.ae/en/eservices/mashrooi-project-status/',
    iconName: 'CheckCircle'
  },
  {
    id: 'adrec',
    name: 'Abu Dhabi Real Estate Centre (adrec.gov.ae)',
    category: 'Regulatory & Government Portals',
    url: 'https://adrec.gov.ae',
    badge: 'Abu Dhabi Escrow',
    description: 'Official Abu Dhabi government regulatory body tracking registered off-plan developments, escrow compliance, and title guarantees.',
    coverage: 'ADREC Escrow Verification, Abu Dhabi Project Compliance',
    sampleUrl: 'https://adrec.gov.ae/en/services/project-inquiry',
    iconName: 'FileCheck'
  }
];

export const INITIAL_LISTINGS: PropertyListing[] = [
  {
    id: 'prop-offplan-1',
    title: 'Sobha Hartland II - Waterfront Sky Mansions',
    headline: 'Ultra-Luxury Waterfront Living with Private Swimmable Lagoon Access',
    type: 'off-plan',
    category: 'Apartment',
    community: 'Sobha Hartland II, MBR City',
    subLocation: 'Lagoon District',
    displayUnit: 'Panoramic Mid & High Floors Available',
    priceAED: 2450000,
    beds: 2,
    baths: 3,
    sqft: 1420,
    developer: 'Sobha Realty',
    handoverDate: 'Q4 2027',
    badge: 'Hot Deal',
    description: 'Sobha Hartland II represents the pinnacle of waterfront masterplan communities in Mohammed Bin Rashid Al Maktoum City. Featuring crystal swimmable lagoons, lush private parks, and uninterrupted views of the Downtown Dubai skyline. Each residence features bespoke Italian finishes, floor-to-ceiling soundproof acoustic glass, and integrated smart home automation.',
    bulletPoints: [
      'Direct access to 1 million sqft crystal lagoon and private boardwalk',
      'Exclusive 80/20 payment plan with zero post-handover interest',
      'Floor-to-ceiling acoustic triple-glazed windows with Burj Khalifa views',
      'High-yield potential with forecasted 8.4% gross ROI at completion',
      '5 minutes from Downtown Dubai and Ras Al Khor Wildlife Sanctuary'
    ],
    amenities: [
      'Crystal Swimmable Lagoon',
      'Infinity Sky Pool',
      'Valet Concierge 24/7',
      'State-of-the-Art Technogym Fitness',
      'Private Cinema & Screening Room',
      'Yoga & Wellness Pavilion',
      'Children Aqua Park',
      'EV Supercharging Bays'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-top-aerial-shot-of-seashore-with-turquoise-water-43302-large.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    brochureUrl: '#sobha-hartland-brochure',
    brochureName: 'Sobha_Hartland_II_Official_Factsheet_2026.pdf',
    paymentPlan: [
      { stage: 'Booking / Down Payment', percentage: 20, dueDate: 'On Reservation', note: 'Immediate registration with DLD fee waiver' },
      { stage: 'Construction Milestone 1', percentage: 10, dueDate: 'April 2026', note: 'Ground substructure completion' },
      { stage: 'Construction Milestone 2', percentage: 10, dueDate: 'October 2026', note: 'Superstructure 30%' },
      { stage: 'Construction Milestone 3', percentage: 10, dueDate: 'April 2027', note: 'Façade installation' },
      { stage: 'Construction Milestone 4', percentage: 10, dueDate: 'August 2027', note: 'Internal fit-out' },
      { stage: 'On Handover & Key Handover', percentage: 40, dueDate: 'December 2027', note: 'Final inspection & title deed issuance' }
    ],
    isOffPlan: true,
    rentalYieldPercent: 8.4,
    views: 'Crystal Lagoon & Burj Khalifa Skyline',
    serviceChargesAED: 18,
    dldEscrowNumber: 'DLD Escrow #28441-DXB',
    sourcePortal: 'DXBOffPlan.com & Sobha Official',
    sourceUrl: 'https://dxboffplan.com/properties/sobha-hartland-ii/',
    constructionStatus: 'Under Construction (34% Completed - DLD Mashrooi Verified)',
    isPublishedPublic: true,
    createdAt: '2026-03-12T10:00:00Z'
  },
  {
    id: 'prop-offplan-2',
    title: 'Mercedes-Benz Places by Binghatti',
    headline: 'Hyper-Tower Architectural Masterpiece with Private Cantilevered Sky Pools',
    type: 'off-plan',
    category: 'Penthouse',
    community: 'Downtown Dubai',
    subLocation: 'Burj Khalifa District',
    displayUnit: 'Upper Tier Sky Suites',
    priceAED: 8900000,
    beds: 3,
    baths: 4,
    sqft: 2850,
    developer: 'Binghatti Developers & Mercedes-Benz',
    handoverDate: 'Q4 2026',
    badge: 'Active Promo',
    description: 'A revolutionary branded hyper-tower rising 341 meters above Downtown Dubai. Designed in collaboration between Mercedes-Benz design philosophy and Binghatti architecture. Features aerodynamic sensuous curves, acoustic insulation inspired by Mercedes-Maybach automotive engineering, and private cantilevered infinity pools for every upper residence.',
    bulletPoints: [
      'First residential project worldwide by Mercedes-Benz',
      'Every sky penthouse features private cantilevered heated plunge pool',
      'Integrated Mercedes-Benz smart living OS and automated valet',
      '70/30 Payment Plan with 2 years post-handover waiver offer',
      'Direct panoramic line-of-sight to Burj Khalifa and Dubai Opera'
    ],
    amenities: [
      'Private Cantilevered Sky Pools',
      'Helipad Access',
      'Mercedes-Benz Car Simulators',
      'Private Butler & Sommelier Bar',
      'Hydrotherapy Spa Chambers',
      'Acoustic Music Lounge'
    ],
    images: [
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-skyscrapers-in-a-financial-district-41490-large.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80',
    brochureUrl: '#mercedes-benz-brochure',
    brochureName: 'Mercedes_Benz_Places_Dubai_Brochure.pdf',
    paymentPlan: [
      { stage: 'Down Payment', percentage: 20, dueDate: 'On Booking' },
      { stage: 'During Construction', percentage: 50, dueDate: 'Linked to Milestones (5 x 10%)' },
      { stage: 'On Handover', percentage: 30, dueDate: 'Q4 2026' }
    ],
    isOffPlan: true,
    rentalYieldPercent: 9.1,
    views: 'Burj Khalifa & Downtown Skyline',
    serviceChargesAED: 24,
    dldEscrowNumber: 'DLD Escrow #31994-DXB',
    sourcePortal: 'Binghatti Official & Property Finder',
    sourceUrl: 'https://www.binghatti.com/mercedes-benz-places/',
    constructionStatus: 'Superstructure Active (48% Completed - DLD Verified)',
    isPublishedPublic: true,
    createdAt: '2026-03-25T11:20:00Z'
  },
  {
    id: 'prop-offplan-3',
    title: 'Creek Waters by Emaar - Dubai Creek Harbour',
    headline: 'Glamorous Waterfront Residences with Unobstructed Views of Creek Marina',
    type: 'off-plan',
    category: 'Apartment',
    community: 'Dubai Creek Harbour',
    subLocation: 'Island District Promenade',
    displayUnit: 'Creek Waters Tower 1 & 2',
    priceAED: 2150000,
    beds: 2,
    baths: 2,
    sqft: 1180,
    developer: 'Emaar Properties',
    handoverDate: 'Q3 2027',
    badge: 'New Launch',
    description: 'Emaar Creek Waters represents the pinnacle of modern architectural luxury in Dubai Creek Harbour. Set against the serene backdrop of the historic creek and the futuristic skyline of Downtown Dubai. Direct access to waterfront promenade, yacht club, and pristine parklands.',
    bulletPoints: [
      'Master development by Emaar PJSC with proven capital appreciation',
      'Direct walking distance to Creek Marina and Harbour promenade',
      'Attractive 90/10 milestone construction-linked payment plan',
      'Floor-to-ceiling glass balconies framing sunset skyline views'
    ],
    amenities: [
      'Infinity Pool Deck Facing Marina',
      'Direct Boardwalk Promenade',
      'Technogym Fitness Pavilion',
      'Kids Interactive Splash Area',
      'Yacht Club Berthing Privileges',
      'Zen Garden and BBQ Pavilions'
    ],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-at-night-41584-large.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    brochureUrl: '#emaar-creek-waters',
    brochureName: 'Emaar_Creek_Waters_Official_Factsheet.pdf',
    paymentPlan: [
      { stage: 'Down Payment', percentage: 10, dueDate: 'On Booking' },
      { stage: '1st Installment', percentage: 10, dueDate: 'August 2026' },
      { stage: '2nd Installment', percentage: 10, dueDate: 'February 2027' },
      { stage: '3rd Installment', percentage: 10, dueDate: 'June 2027' },
      { stage: 'On Handover', percentage: 60, dueDate: 'September 2027' }
    ],
    isOffPlan: true,
    rentalYieldPercent: 8.6,
    views: 'Creek Marina & Downtown Sunset',
    serviceChargesAED: 19,
    dldEscrowNumber: 'DLD Escrow #44102-DXB',
    sourcePortal: 'Emaar.com & Bayut Search 2.0',
    sourceUrl: 'https://properties.emaar.com/creek-waters',
    constructionStatus: 'Substructure Completed (25% Completed - DLD Verified)',
    isPublishedPublic: true,
    createdAt: '2026-04-01T10:00:00Z'
  },
  {
    id: 'prop-offplan-4',
    title: 'Bayz 101 by Danube - 101-Storey Hyper Tower',
    headline: '1% Monthly Payment Plan in Business Bay with Over 40 Luxury Resort Amenities',
    type: 'off-plan',
    category: 'Apartment',
    community: 'Business Bay',
    subLocation: 'Burj Khalifa District',
    displayUnit: 'Panoramic Mid & Upper Tiers',
    priceAED: 1650000,
    beds: 1,
    baths: 2,
    sqft: 790,
    developer: 'Danube Properties',
    handoverDate: 'Q2 2028',
    badge: 'Active Promo',
    description: 'Bayz 101 by Danube is an architectural marvel rising 101 levels into the Dubai skyline, standing as one of the tallest residential towers in the world. Located in prime Business Bay just minutes from Burj Khalifa. Famous for Danube’s game-changing 1% per month payment structure.',
    bulletPoints: [
      'Iconic 101-storey residential skyscraper in central Business Bay',
      'Trademark 1% per month payment plan over 80 months',
      'Over 40 world-class amenities including sky observatory and rooftop running track',
      'Fully furnished designer apartments with convertible smart home modules'
    ],
    amenities: [
      'Sky Observatory Level 100',
      'Rooftop Sky Running Track',
      'Aqua Gym & Infinity Sky Pool',
      'Direct Business Bay Metro Access',
      'Doctor on Call & Daycare Centre',
      'Snooker, Bowling & Gaming Arcades'
    ],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-with-living-room-and-kitchen-41484-large.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    brochureUrl: '#danube-bayz101',
    brochureName: 'Danube_Bayz_101_Official_Brochure.pdf',
    paymentPlan: [
      { stage: 'Down Payment', percentage: 10, dueDate: 'On Booking' },
      { stage: 'Monthly Installments (40 Months)', percentage: 40, dueDate: '1% Monthly during construction' },
      { stage: 'On Handover', percentage: 20, dueDate: 'Q2 2028' },
      { stage: 'Post-Handover (30 Months)', percentage: 30, dueDate: '1% Monthly post-handover' }
    ],
    isOffPlan: true,
    rentalYieldPercent: 9.4,
    views: 'Burj Khalifa & Dubai Canal',
    serviceChargesAED: 17,
    dldEscrowNumber: 'DLD Escrow #55019-DXB',
    sourcePortal: 'Danube Official & DXBOffPlan.com',
    sourceUrl: 'https://danubeproperties.ae/project/bayz-101/',
    constructionStatus: 'Piling & Foundation Work Underway (DLD Mashrooi Audited)',
    isPublishedPublic: true,
    createdAt: '2026-04-05T12:00:00Z'
  },
  {
    id: 'prop-offplan-5',
    title: 'Palm Jebel Ali - Beach Collection Waterfront Villas',
    headline: 'Ultra-Luxury Frond Living on Dubai\'s Largest Futuristic Island Masterplan',
    type: 'off-plan',
    category: 'Villa',
    community: 'Palm Jebel Ali',
    subLocation: 'Frond M - Exclusive Beach Collection',
    displayUnit: 'Coral & Beach Collection Mansions',
    priceAED: 18500000,
    beds: 5,
    baths: 6,
    sqft: 7600,
    developer: 'Nakheel / Dubai Holding',
    handoverDate: 'Q4 2027',
    badge: 'Hot Deal',
    description: 'Palm Jebel Ali by Nakheel is an engineering and master-planning triumph, offering twice the area of Palm Jumeirah. The Beach Collection features 5 and 6-bedroom bespoke standalone estates directly on private white sand beaches with sunset ocean views.',
    bulletPoints: [
      'Twice the size of Palm Jumeirah with 110 kilometers of brand new coastline',
      'Direct private beach access with swimmable azure waters and yacht mooring',
      'Architectural masterpiece designed by world-renowned international architects',
      'Zero commission booking with official government-backed escrow guarantee'
    ],
    amenities: [
      'Private Beachfront Frontage',
      'Private Heated Infinity Pool',
      'Private Yacht Mooring Jetty',
      'Smart Home Automation System',
      'Staff Quarters & Driver Rooms',
      'World-Class Island Beach Clubs'
    ],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-drone-shot-of-a-luxury-mansion-with-a-pool-42878-large.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    brochureUrl: '#palm-jebel-ali-brochure',
    brochureName: 'Palm_Jebel_Ali_Beach_Collection_Factsheet.pdf',
    paymentPlan: [
      { stage: 'Down Payment', percentage: 20, dueDate: 'On Booking' },
      { stage: 'During Construction', percentage: 60, dueDate: 'Construction Milestones (6 x 10%)' },
      { stage: 'On Handover', percentage: 20, dueDate: 'Q4 2027 Handover' }
    ],
    isOffPlan: true,
    rentalYieldPercent: 7.9,
    views: 'Panoramic Arabian Gulf Ocean & Island Skyline',
    serviceChargesAED: 14,
    dldEscrowNumber: 'DLD Escrow #11092-DXB',
    sourcePortal: 'Nakheel Official & OffPlan-Dubai.com',
    sourceUrl: 'https://www.nakheel.com/palm-jebel-ali',
    constructionStatus: 'Coastal Infrastructure & Frond Shaping 45% Complete',
    isPublishedPublic: true,
    createdAt: '2026-04-10T14:00:00Z'
  },
  {
    id: 'prop-offplan-6',
    title: 'DAMAC Lagoons - Costa Brava & Ibiza Cluster',
    headline: 'Spanish-Inspired Mediterranean Waterfront Townhouses with Crystal Lagoons',
    type: 'off-plan',
    category: 'Townhouse',
    community: 'DAMAC Lagoons, Dubailand',
    subLocation: 'Costa Brava Hub',
    displayUnit: '4 & 5 Bedroom Mediterranean Cluster',
    priceAED: 3100000,
    beds: 4,
    baths: 4,
    sqft: 2450,
    developer: 'DAMAC Properties',
    handoverDate: 'Q3 2026',
    badge: 'Active Promo',
    description: 'Costa Brava at DAMAC Lagoons brings the artistic vibrancy of Catalonia to Dubai. Built around sparkling turquoise swimmable lagoons with white sandy beaches, water falls, floating cinema, and sensory botanical gardens. 100% DLD fee waiver on select units.',
    bulletPoints: [
      'Direct swimmable azure lagoon with water cinema and zipline',
      'Spanish tapas lounge, rock climbing wall, and floating amphitheatre',
      '70/30 Payment Plan with 100% DLD registration fee waiver',
      'High rental yield demand from families and European expats'
    ],
    amenities: [
      'Crystal Swimmable Lagoon',
      'Floating Water Cinema',
      'Wave Pool & Water Surfing',
      'Zipline & Adventure Park',
      'Clubhouse with Mediterranean Dining',
      'Paddle Tennis Courts'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-top-aerial-shot-of-seashore-with-turquoise-water-43302-large.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    brochureUrl: '#damac-costa-brava',
    brochureName: 'DAMAC_Lagoons_Costa_Brava_Factsheet.pdf',
    paymentPlan: [
      { stage: 'Down Payment', percentage: 20, dueDate: 'Immediate' },
      { stage: 'During Construction', percentage: 50, dueDate: '5 x 10% milestones' },
      { stage: 'On Handover', percentage: 30, dueDate: 'September 2026' }
    ],
    isOffPlan: true,
    rentalYieldPercent: 8.8,
    views: 'Crystal Azure Lagoon & Spanish Gardens',
    serviceChargesAED: 11,
    dldEscrowNumber: 'DLD Escrow #38291-DXB',
    sourcePortal: 'DAMAC Properties & Property Finder',
    sourceUrl: 'https://www.damacproperties.com/damac-lagoons',
    constructionStatus: 'Façade & MEP 62% Completed (DLD Mashrooi Verified)',
    isPublishedPublic: true,
    createdAt: '2026-04-12T09:00:00Z'
  },

  // Secondary Market Listings
  {
    id: 'prop-secondary-1',
    title: 'Marina Gate Tower 1 - High Floor 2-Bedroom',
    headline: 'Upgraded Marina View Residence in Dubai Marina Prime Hub',
    type: 'buy',
    category: 'Apartment',
    community: 'Dubai Marina',
    subLocation: 'Marina Gate 1',
    exactUnitNumber: 'Unit 1804', // RESTRICTED FIELD
    displayUnit: 'Marina Gate 1, High Floor (Unit Masked)',
    priceAED: 2650000,
    originalPriceAED: 2750000,
    beds: 2,
    baths: 3,
    sqft: 1285,
    developer: 'Select Group',
    badge: 'Hot Deal',
    description: 'Immaculately maintained high-floor 2-bedroom residence inside Marina Gate Tower 1. Features an expansive open-concept living area, imported European oak parquet floors, upgraded chef kitchen with Miele built-ins, and a generous terrace offering panoramic sunset views across the Marina yacht berths.',
    bulletPoints: [
      'High-floor position with unobstructed panoramic yacht marina vistas',
      'Vacant on transfer - immediate move-in or premium rental yield',
      'Dual-aspect floorplan with separate laundry room and powder room',
      'Select Group signature finishings with 50-meter infinity pool access'
    ],
    amenities: [
      '50m Infinity Marina Pool',
      'Dual-Level Gym with Squash Court',
      'Direct Marina Walk Boardwalk Access',
      'Steam & Sauna Suites',
      'Covered Parking Space',
      '24/7 Concierge and Keycard Lift Security'
    ],
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-home-interior-with-modern-furniture-41486-large.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
    isOffPlan: false,
    rentalYieldPercent: 7.8,
    views: 'Full Marina & Yacht Harbour',
    serviceChargesAED: 16,
    ownerId: 'own-001',
    ownerName: 'Rashid Al Nuaimi', // RESTRICTED
    ownerPhone: '+971 50 491 8823', // RESTRICTED
    ownerEmail: 'rashid.nuaimi@holding.ae', // RESTRICTED
    titleDeedNumber: 'TD-DXB-98442-2024',
    isPublishedPublic: true,
    createdAt: '2026-03-20T14:30:00Z'
  },
  {
    id: 'prop-secondary-2',
    title: 'Downtown Views II - Tower 3 Luxury 1-Bed',
    headline: 'Walk-to-Dubai-Mall Turnkey Investment with Burj Views',
    type: 'rent',
    category: 'Apartment',
    community: 'Downtown Dubai',
    subLocation: 'Downtown Views II',
    exactUnitNumber: 'Unit 2908', // RESTRICTED FIELD
    displayUnit: 'Downtown Views II, High Floor',
    priceAED: 145000, // Annual Rent
    beds: 1,
    baths: 2,
    sqft: 790,
    developer: 'Emaar Properties',
    badge: 'Ready to Move',
    description: 'Turnkey fully-furnished 1-bedroom sanctuary directly connected via air-conditioned pedestrian link to The Dubai Mall and Za\'abeel expansion. Boasting designer contemporary furnishings, floor-to-ceiling windows, and generous open balcony overlooking the Downtown skyline.',
    bulletPoints: [
      'Direct climate-controlled airbridge into Dubai Mall fashion avenue',
      'Chic Scandinavian designer furniture package included',
      'Corner layout maximizing ambient light with open skyline vistas',
      'Emaar master-managed community with immaculate upkeep'
    ],
    amenities: [
      'Direct Dubai Mall Footbridge Link',
      'Resort Style Pool Deck',
      'Barbecue & Social Lounges',
      'Multi-purpose Resident Hall',
      'Kids Play Area & Nursery'
    ],
    images: [
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502005229762-ee152d82994e?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-with-living-room-and-kitchen-41484-large.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
    isOffPlan: false,
    rentalYieldPercent: 7.2,
    views: 'Downtown Skyline & Za\'abeel',
    serviceChargesAED: 21,
    ownerId: 'own-002',
    ownerName: 'Elena Rostova',
    ownerPhone: '+971 52 839 1104',
    ownerEmail: 'elena.rostova@monaco-invest.mc',
    titleDeedNumber: 'TD-DXB-44129-2023',
    isPublishedPublic: true,
    createdAt: '2026-03-22T08:15:00Z'
  },
  {
    id: 'prop-secondary-3',
    title: 'Palm Views East - Waterfront Studio on The Palm',
    headline: 'High-Yield Waterfront Pied-à-Terre on Palm Jumeirah Trunk',
    type: 'buy',
    category: 'Apartment',
    community: 'Palm Jumeirah',
    subLocation: 'Palm Views East',
    exactUnitNumber: 'Unit 312',
    displayUnit: 'Palm Views East, Mid Floor',
    priceAED: 1850000,
    beds: 1,
    baths: 1,
    sqft: 610,
    developer: 'Nakheel',
    badge: 'High ROI',
    description: 'Prime turnkey Palm Jumeirah investment property boasting direct boardwalk access and private club swimming pool. Consistent short-term vacation rental performer generating upwards of 9.2% net yield via holiday homes licenses.',
    bulletPoints: [
      'Palm Jumeirah prime entry ticket under 2M AED',
      'Direct access to marina moorings and club restaurant promenade',
      'Sold fully furnished with active holiday home permit',
      'High seasonal demand with 90%+ winter occupancy'
    ],
    amenities: [
      'Private Resident Club Pool',
      'Boardwalk Cafes & Fine Dining',
      'Water Taxi Access to Marina',
      'Fully Equipped Health Club'
    ],
    images: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-top-aerial-shot-of-seashore-with-turquoise-water-43302-large.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
    isOffPlan: false,
    rentalYieldPercent: 9.2,
    views: 'Marina Yacht Basin & Palm Lagoon',
    serviceChargesAED: 15,
    ownerId: 'own-003',
    ownerName: 'Tariq Mansoor',
    ownerPhone: '+971 55 918 3344',
    ownerEmail: 'tariq.mansoor@gulfcapital.com',
    titleDeedNumber: 'TD-DXB-77192-2022',
    isPublishedPublic: true,
    createdAt: '2026-03-28T16:00:00Z'
  }
];

export const INITIAL_OWNER_VAULT: OwnerCRMRecord[] = [
  {
    id: 'crm-001',
    ownerName: 'H.E. Tariq Al Marzouqi',
    ownerPhone: '+971 50 882 1944',
    ownerEmail: 't.marzouqi@almarzouqi-holdings.ae',
    propertyTitle: 'Address Sky View - Tower 1 Luxury 3-Bed',
    community: 'Downtown Dubai',
    exactUnitNumber: 'Unit 3802',
    sanitizedLocation: 'Address Sky View, High Floor',
    beds: 3,
    baths: 4,
    sqft: 2050,
    propertyType: 'Apartment',
    targetSalePriceAED: 7200000,
    targetRentPriceAED: 380000,
    currentRentAED: 360000,
    tenantName: 'Julian Meyer (C-Suite Logistics)',
    tenantPhone: '+971 58 291 0019',
    leaseStartDate: '2025-05-15',
    leaseEndDate: '2026-05-14', // EXPIRES IN ~28 DAYS! -> CRITICAL 30-DAY ALERT
    titleDeedNumber: 'TD-DXB-99120-2023',
    privateNotes: 'Owner prefers high-profile tenant or full cash sale at 7M minimum. Julian indicated he is relocating to Zurich in May. Start pre-marketing quietly right now.',
    status: 'Occupied',
    isPublishedToMarketplace: false,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    createdAt: '2026-01-10T11:00:00Z'
  },
  {
    id: 'crm-002',
    ownerName: 'Fatima Al Zaabi',
    ownerPhone: '+971 52 391 8871',
    ownerEmail: 'fatima.zaabi@dubaiinvest.com',
    propertyTitle: 'Marina Gate 2 - Duplex Penthouse',
    community: 'Dubai Marina',
    exactUnitNumber: 'Penthouse 4801',
    sanitizedLocation: 'Marina Gate 2, Penthouse Level',
    beds: 4,
    baths: 5,
    sqft: 3890,
    propertyType: 'Penthouse',
    targetSalePriceAED: 9800000,
    targetRentPriceAED: 520000,
    currentRentAED: 490000,
    tenantName: 'Maximilian Sterling',
    tenantPhone: '+971 54 991 2234',
    leaseStartDate: '2025-06-10',
    leaseEndDate: '2026-06-09', // EXPIRES IN ~54 DAYS! -> 60-DAY RENEWAL ALERT
    titleDeedNumber: 'TD-DXB-11883-2021',
    privateNotes: 'Owner open to 2-cheque tenant or 50/50 broker split for buyers. Key in safety deposit box with building concierge.',
    status: 'Renewal Pending',
    isPublishedToMarketplace: false,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80'
    ],
    createdAt: '2026-02-14T09:30:00Z'
  },
  {
    id: 'crm-003',
    ownerName: 'Rashid Al Nuaimi',
    ownerPhone: '+971 50 491 8823',
    ownerEmail: 'rashid.nuaimi@holding.ae',
    propertyTitle: 'Marina Gate Tower 1 - High Floor 2-Bedroom',
    community: 'Dubai Marina',
    exactUnitNumber: 'Unit 1804',
    sanitizedLocation: 'Marina Gate 1, High Floor',
    beds: 2,
    baths: 3,
    sqft: 1285,
    propertyType: 'Apartment',
    targetSalePriceAED: 2650000,
    targetRentPriceAED: 180000,
    currentRentAED: 170000,
    leaseStartDate: '2025-11-01',
    leaseEndDate: '2026-10-31', // >6 months away
    titleDeedNumber: 'TD-DXB-98442-2024',
    privateNotes: 'Published to marketplace as secondary listing. Do not disclose Unit 1804 to external brokers without registration form.',
    status: 'Listed',
    isPublishedToMarketplace: true,
    marketplaceListingId: 'prop-secondary-1',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    createdAt: '2026-03-01T15:00:00Z'
  },
  {
    id: 'crm-004',
    ownerName: 'Oliver Chesterfield',
    ownerPhone: '+44 7700 900142',
    ownerEmail: 'oliver@chesterfield-asset.co.uk',
    propertyTitle: 'Dubai Hills Estate - Maple 3 Corner Villa',
    community: 'Dubai Hills Estate',
    exactUnitNumber: 'Villa 142 Street 9',
    sanitizedLocation: 'Maple 3, Green Belt Corner',
    beds: 4,
    baths: 4,
    sqft: 2460,
    propertyType: 'Villa',
    targetSalePriceAED: 4400000,
    targetRentPriceAED: 260000,
    currentRentAED: 240000,
    tenantName: 'Dr. Sarah & James Lee',
    tenantPhone: '+971 50 338 9912',
    leaseStartDate: '2025-04-20',
    leaseEndDate: '2026-04-19', // EXPIRES IN ~3 DAYS! -> IMMEDIATE EXPIRATION ALERT
    titleDeedNumber: 'TD-DXB-66201-2020',
    privateNotes: 'Tenant moving out this week. Paint touchups ordered. Ready for 1-click conversion to public rental listing or sale listing!',
    status: 'Occupied',
    isPublishedToMarketplace: false,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    createdAt: '2026-02-28T10:00:00Z'
  }
];

export const INITIAL_LEADS: LeadInquiry[] = [
  {
    id: 'lead-101',
    propertyId: 'prop-offplan-1',
    propertyTitle: 'Sobha Hartland II - Waterfront Sky Mansions',
    propertyType: 'off-plan',
    inquirerType: 'buyer',
    name: 'Alexander Lindqvist',
    email: 'alexander@nordic-ventures.se',
    phone: '+46 70 821 9901',
    message: 'Interested in the 80/20 payment plan for a 2-bedroom with direct lagoon views. Please send payment schedule details and unit floor plans on WhatsApp.',
    budgetAED: 2600000,
    preferredTimeframe: 'Immediate - within 7 days',
    status: 'New',
    createdAt: '2026-10-15T18:45:00Z'
  },
  {
    id: 'lead-102',
    propertyId: 'prop-secondary-1',
    propertyTitle: 'Marina Gate Tower 1 - High Floor 2-Bedroom',
    propertyType: 'buy',
    inquirerType: 'broker',
    name: 'Karim Mansoor',
    email: 'karim@apexprimeproperties.ae',
    phone: '+971 56 123 7890',
    companyOrAgency: 'Apex Prime Properties RERA #24119',
    brokerLicense: 'BRN-44281',
    message: 'I have a pre-approved cash buyer looking specifically for high floor Marina Gate 2-bed. Can we schedule viewing this Thursday? Agreeable to 50/50 commission split.',
    budgetAED: 2650000,
    preferredTimeframe: 'Viewing within 48h',
    status: 'Viewing Scheduled',
    createdAt: '2026-10-14T11:20:00Z'
  },
  {
    id: 'lead-103',
    propertyId: 'prop-secondary-2',
    propertyTitle: 'Downtown Views II - Tower 3 Luxury 1-Bed',
    propertyType: 'rent',
    inquirerType: 'tenant',
    name: 'Sophia Chen',
    email: 'sophia.chen@techcorp.sg',
    phone: '+65 9123 4567',
    message: 'Relocating to DIFC next month. Is the rent payable in 1 or 2 cheques? Are utilities included or separate?',
    budgetAED: 150000,
    preferredTimeframe: 'Move-in 1st November',
    status: 'Contacted',
    createdAt: '2026-10-13T09:10:00Z'
  }
];

// Sample brochures for 1-click test parsing and portal harvester
export const SAMPLE_BROCHURES = [
  {
    id: 'brochure-sobha',
    title: 'Sobha Hartland II - Waterfront Sky Mansions',
    developer: 'Sobha Realty',
    portal: 'DXBOffPlan.com & Sobha Official',
    fileName: 'Sobha_Hartland_II_Brochure.pdf',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-top-aerial-shot-of-seashore-with-turquoise-water-43302-large.mp4',
    dldEscrow: 'DLD Escrow #28441-DXB (Mashrooi 34% Complete)',
    sampleText: `SOBHA HARTLAND II - WATERFRONT SKY MANSIONS
Master Developer: Sobha Realty
Source Portal: DXBOffPlan.com / SobhaRealty.com
Government Verification: DLD Escrow #28441-DXB (RERA Project #2104)
Location: Mohammed Bin Rashid Al Maktoum City (MBR City), Dubai, UAE
Starting Price: AED 2,450,000
Handover Date: Q4 2027 (December 2027)
Project Overview:
Sobha Hartland II is an 8 million sq. ft. waterfront sanctuary surrounded by over 1 million sq. ft. of crystal swimmable lagoons and lush green forest reserves. 
Units available: 1, 2, and 3 Bedroom Luxury Sky Residences with panoramic views of Downtown Dubai and the Ras Al Khor wildlife haven.
Media Assets: 4K Drone Walkthrough Video & Architectural Render Pack Included.
Payment Plan:
- 20% on Booking / Reservation
- 10% April 2026 (Substructure completion)
- 10% October 2026 (Superstructure 30%)
- 10% April 2027 (Façade & MEP)
- 10% August 2027 (Interior finishes)
- 40% on Handover & Key Handover (December 2027)
Key Amenities:
- Crystal swimmable lagoons with white sand beach promenades
- Infinity sky pool overlooking Burj Khalifa
- 24/7 dedicated concierge and valet services
- Technogym wellness and acoustic yoga pavilion
- Private screening room and children's interactive aqua playground
- Fast EV charging bays on all basement parking tiers`
  },
  {
    id: 'brochure-emaar-creek',
    title: 'Creek Waters by Emaar - Dubai Creek Harbour',
    developer: 'Emaar Properties',
    portal: 'Emaar.com & Bayut Search 2.0',
    fileName: 'Emaar_Creek_Waters_Factsheet.pdf',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-at-night-41584-large.mp4',
    dldEscrow: 'DLD Escrow #44102-DXB (Mashrooi Verified)',
    sampleText: `CREEK WATERS BY EMAAR
Developer: Emaar Properties PJSC
Source Portal: Emaar.com / Bayut Search 2.0
Government Verification: DLD Escrow Account #44102-DXB
Location: Island District, Dubai Creek Harbour, Dubai
Starting Price: AED 2,150,000
Completion Date: Q3 2027
Residential Specs: 1 to 4 Bedroom luxury waterfront residences ranging from 780 to 2,400 sq.ft.
Overlooking the historic Dubai Creek and vibrant Creek Marina yacht club.
Media: Cinematic Walkthrough Video Tour Available.
Payment Plan Structure:
- 10% Down Payment on booking
- 10% 2nd Installment (July 2026)
- 10% 3rd Installment (December 2026)
- 20% 4th Installment (March 2027)
- 50% on Handover and Key Delivery (June 2027)
Signature Amenities:
- Direct boardwalk access to Creek Marina and Harbour Promenade
- Observation deck with 360-degree views of Burj Khalifa and Creek Tower
- Resort style swimming pool with sunken cabanas
- Fully equipped gymnasium, sauna and temperature-controlled steam rooms
- Dedicated kids play area and nursery facilities
- Pet-friendly community parks with agility zones`
  },
  {
    id: 'brochure-damac-lagoons',
    title: 'DAMAC Lagoons - Costa Brava & Ibiza Cluster',
    developer: 'DAMAC Properties',
    portal: 'Property Finder & DAMAC Official',
    fileName: 'DAMAC_Costa_Brava_Villas.pdf',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-top-aerial-shot-of-seashore-with-turquoise-water-43302-large.mp4',
    dldEscrow: 'DLD Escrow #38291-DXB (Mashrooi 62% Complete)',
    sampleText: `DAMAC LAGOONS - COSTA BRAVA CLUSTER
Developer: DAMAC Properties
Source Portal: PropertyFinder.ae / DAMACProperties.com
Government Verification: DLD Escrow Account #38291-DXB
Location: DAMAC Lagoons, Hessa Street, Dubailand, Dubai
Starting Price: AED 3,100,000
Completion Date: Q3 2026
Unit Types: 4 & 5 Bedroom Mediterranean Townhouses and Luxury Standalone Waterfront Villas (2,300 - 4,200 sq.ft)
Media: 4K Drone Lagoon Video & Virtual 3D Tour Included.
Payment Plan:
- 20% Down Payment
- 50% During Construction in easy quarterly milestones
- 30% on Handover (September 2026)
Special Promotion: 100% DLD Fee Waiver on select 4-Bedroom Townhouses!
Amenities:
- Direct swimmable Azure Lagoon with water cinema & zipline
- Rock climbing wall and sensory garden
- Spanish tapas lounge and floating amphitheatre
- Kayaking and paddleboard rental dock
- Dedicated clubhouse and paddle tennis courts`
  },
  {
    id: 'brochure-danube-bayz101',
    title: 'Bayz 101 by Danube - 101 Storey Hyper-Tower',
    developer: 'Danube Properties',
    portal: 'DanubeProperties.ae & DXBOffPlan.com',
    fileName: 'Danube_Bayz101_Brochure.pdf',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-with-living-room-and-kitchen-41484-large.mp4',
    dldEscrow: 'DLD Escrow #55019-DXB (DLD Registered)',
    sampleText: `BAYZ 101 BY DANUBE PROPERTIES
Developer: Danube Properties
Source Portal: DanubeProperties.ae / DXBOffPlan.com
Government Verification: DLD Escrow #55019-DXB
Location: Business Bay, Dubai (Direct Canal & Burj View)
Starting Price: AED 1,650,000
Completion Date: Q2 2028
Master Specs: 101-Storey Landmark Skyscraper. Studios, 1, 2, 3 & 4 Bedroom fully furnished luxury apartments.
Media: Interior Walkthrough Video Tour & Penthouse Sky Level 100 Views.
Payment Plan:
- 10% Down Payment on Booking
- 40% During Construction (1% Monthly for 40 Months)
- 20% on Handover
- 30% Post-Handover (1% Monthly for 30 Months)
Signature Amenities:
- Sky Observatory and Infinity Pool at Level 100
- Over 40 Resort and Wellness Amenities
- Convertible Smart Home Furniture Package
- Rooftop Jogging Track overlooking Burj Khalifa`
  },
  {
    id: 'brochure-nakheel-palm-jebel-ali',
    title: 'Palm Jebel Ali - Beach Collection Villas',
    developer: 'Nakheel / Dubai Holding',
    portal: 'Nakheel.com & OffPlan-Dubai.com',
    fileName: 'Nakheel_Palm_Jebel_Ali_Factsheet.pdf',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-drone-shot-of-a-luxury-mansion-with-a-pool-42878-large.mp4',
    dldEscrow: 'DLD Escrow #11092-DXB (Government Island Infrastructure)',
    sampleText: `PALM JEBEL ALI - BEACH COLLECTION BY NAKHEEL
Developer: Nakheel PJSC / Dubai Holding
Source Portal: Nakheel.com / OffPlan-Dubai.com / Bayut
Government Escrow: DLD Escrow Account #11092-DXB
Location: Palm Jebel Ali, Dubai Waterfront
Starting Price: AED 18,500,000
Completion Date: Q4 2027
Specs: 5 and 6 Bedroom Signature Beachfront Standalone Villas (7,600 - 12,000 sq.ft) with private beach access.
Media: Drone Ocean Video Tour & Frond Architectural Flythrough.
Payment Plan:
- 20% on Booking
- 60% During Construction (6 x 10% milestone payments)
- 20% on Handover
Amenities:
- Private Private Beach Frontage with Swimmable Waters
- Private Infinity Pool and Jacuzzi
- Private Yacht Mooring Berth
- 24/7 Island Concierge & Helipad Facilities`
  },
  {
    id: 'brochure-binghatti-mercedes',
    title: 'Mercedes-Benz Places by Binghatti',
    developer: 'Binghatti Developers',
    portal: 'Binghatti.com & Property Finder',
    fileName: 'Binghatti_Mercedes_Benz_Places.pdf',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-skyscrapers-in-a-financial-district-41490-large.mp4',
    dldEscrow: 'DLD Escrow #31994-DXB (Mashrooi 48% Complete)',
    sampleText: `MERCEDES-BENZ PLACES BY BINGHATTI
Developer: Binghatti Developers & Mercedes-Benz
Source Portal: Binghatti.com / PropertyFinder.ae
Government Escrow: DLD Escrow Account #31994-DXB
Location: Downtown Dubai, Burj Khalifa District
Starting Price: AED 8,900,000
Completion Date: Q4 2026
Specs: Ultra-Luxury 2, 3, 4 & 5 Bedroom Sky Penthouses with private cantilevered swimming pools.
Media: Hyper-Tower Architectural Teaser Video & Penthouse Virtual Walkthrough.
Payment Plan:
- 20% Down Payment
- 50% During Construction
- 30% on Handover (Q4 2026)
Amenities:
- Private Heated Cantilevered Sky Pools
- Mercedes-Benz Smart Living OS
- Automotive Concierge & Maybach Courtesy Chauffeurs
- 360-Degree Burj Khalifa Skyline Views`
  }
];

// Sample raw notes for Secondary Market quick-upload test
export const SAMPLE_QUICK_NOTES = [
  {
    id: 'note-1',
    label: 'Dubai Marina 2-Bed Note (Voice memo transcript)',
    text: `2 bed in Marina Gate 1, high floor around level 25, 1,280 sqft, owner Rashid wants 2.65M AED. Fully upgraded European oak wooden floors, open plan Italian kitchen with Miele appliances. Amazing full marina and yacht club view. Vacant on transfer, ready to move in. High ROI for investors, easily rents for 180k+ AED.`
  },
  {
    id: 'note-2',
    label: 'Downtown Dubai 1-Bed Walk-to-Mall Note',
    text: `1 bedroom in Downtown Views 2, mid to high floor, 790 square feet, asking rent 145,000 AED per year. Air-conditioned footbridge connected directly to Dubai Mall. Modern Scandinavian furniture, balcony with Burj Khalifa and Zabeel view. Available from next month. Emaar building with great infinity pool.`
  },
  {
    id: 'note-3',
    label: 'Palm Jumeirah Studio Investment Note',
    text: `Studio apartment in Palm Views East, Palm Jumeirah trunk, 610 sqft, owner wants 1.85M AED cash or mortgage. Has active holiday home DTCM license, generates over 9% net rental yield on Airbnb. Overlooking the private marina and lagoon, club pool and gym access.`
  }
];
