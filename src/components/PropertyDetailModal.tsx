import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Calendar, 
  Building, 
  TrendingUp, 
  CheckCircle2, 
  FileDown, 
  MessageCircle, 
  Mail, 
  ShieldCheck, 
  Lock, 
  User, 
  Phone, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Calculator,
  Share2,
  Play,
  Pause,
  Video,
  Volume2,
  VolumeX,
  Shield,
  FileCheck2,
  Sparkles,
  Globe
} from 'lucide-react';
import { PropertyListing, UserRole, LeadInquiry } from '../types/realestate';
import { Currency, formatPrice, createWhatsAppUrl } from '../utils/helpers';

interface PropertyDetailModalProps {
  listing: PropertyListing | null;
  onClose: () => void;
  userRole: UserRole;
  currency: Currency;
  onLeadSubmit: (inquiry: Omit<LeadInquiry, 'id' | 'status' | 'createdAt'>) => Promise<void>;
  onOpenBrokerSplit?: (listing: PropertyListing) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  listing,
  onClose,
  userRole,
  currency,
  onLeadSubmit,
  onOpenBrokerSplit,
}) => {
  if (!listing) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mediaMode, setMediaMode] = useState<'photos' | 'video'>('photos');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'video' | 'payment-plan' | 'dld-escrow' | 'calculator' | 'inquire'>('overview');
  
  // Inquiry Form State
  const [inquirerType, setInquirerType] = useState<'buyer' | 'tenant' | 'broker'>('buyer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(
    listing.type === 'off-plan'
      ? `I would like to receive the official payment plan breakdown and floorplans for ${listing.title}.`
      : `I am interested in scheduling a private viewing for ${listing.title}.`
  );
  const [agencyName, setAgencyName] = useState('');
  const [brokerLicense, setBrokerLicense] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [brochureDownloaded, setBrochureDownloaded] = useState(false);

  // Mortgage Calculator State
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTermYears, setLoanTermYears] = useState(25);
  const [interestRate, setInterestRate] = useState(4.5);

  const images = listing.images.length > 0 ? listing.images : [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
  ];

  // Mortgage calculation
  const downPaymentAED = (listing.priceAED * downPaymentPercent) / 100;
  const loanAmountAED = listing.priceAED - downPaymentAED;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;
  const monthlyMortgageAED =
    listing.type !== 'rent' && loanAmountAED > 0
      ? (loanAmountAED * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : 0;

  const whatsappMsg = `Hi EstatePulse AI, I'm inquiring about "${listing.title}" (Ref: ${listing.id}) listed at ${formatPrice(listing.priceAED, 'AED')}. Could you provide the latest availability and schedule a viewing?`;

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setIsSubmitting(true);
    try {
      await onLeadSubmit({
        propertyId: listing.id,
        propertyTitle: listing.title,
        propertyType: listing.type,
        inquirerType,
        name,
        email,
        phone,
        companyOrAgency: inquirerType === 'broker' ? agencyName : undefined,
        brokerLicense: inquirerType === 'broker' ? brokerLicense : undefined,
        message,
        budgetAED: listing.priceAED,
      });
      setSubmittedSuccess(true);
    } catch (err) {
      console.error('Failed to submit inquiry:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div 
        className="relative bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl my-8 text-stone-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Title and Close Button */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-stone-800 bg-stone-950/80 sticky top-0 z-20 backdrop-blur-md">
          <div className="pr-4">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-stone-800 text-stone-200">
                {listing.type === 'buy' ? 'For Sale' : listing.type === 'rent' ? 'For Rent' : 'Off-Plan Project'}
              </span>
              {listing.badge && (
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500 text-stone-950">
                  {listing.badge}
                </span>
              )}
              {listing.developer && (
                <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
                  <Building className="w-3 h-3" />
                  {listing.developer}
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-white line-clamp-1">
              {listing.title}
            </h2>
            <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              {listing.community} {listing.subLocation && `· ${listing.subLocation}`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          {/* Main Media Carousel / Video Walkthrough Player */}
          <div className="relative rounded-xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-stone-950 border border-stone-800">
            {mediaMode === 'video' && listing.videoUrl ? (
              <div className="relative w-full h-full bg-black flex items-center justify-center">
                <video
                  src={listing.videoUrl}
                  poster={listing.videoPoster || images[0]}
                  controls
                  playsInline
                  autoPlay
                  loop
                  muted={isVideoMuted}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                  <span className="px-2.5 py-1 rounded bg-red-600/90 text-white text-[11px] font-semibold backdrop-blur-md flex items-center gap-1 shadow-md">
                    <Video className="w-3.5 h-3.5" />
                    4K Cinematic Walkthrough Tour
                  </span>
                  <button
                    onClick={() => setIsVideoMuted(!isVideoMuted)}
                    className="p-1.5 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md text-xs transition-colors"
                    title={isVideoMuted ? 'Unmute Audio' : 'Mute Audio'}
                  >
                    {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <img
                  src={images[activeImageIndex]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs text-stone-300">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === activeImageIndex ? 'bg-amber-400 w-4' : 'bg-stone-500'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-[11px] font-mono">{activeImageIndex + 1}/{images.length}</span>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Media Mode Switcher (Photos vs Video) */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-stone-950/80 backdrop-blur-md p-1 rounded-lg border border-stone-800 z-10">
              <button
                onClick={() => setMediaMode('photos')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  mediaMode === 'photos'
                    ? 'bg-amber-500 text-stone-950 font-semibold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Photos ({images.length})
              </button>
              {listing.videoUrl && (
                <button
                  onClick={() => setMediaMode('video')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors flex items-center gap-1 ${
                    mediaMode === 'video'
                      ? 'bg-red-600 text-white font-semibold'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>4K Video</span>
                </button>
              )}
            </div>

            {/* Price Badge Overlay */}
            <div className="absolute top-4 right-4 bg-stone-950/90 backdrop-blur-md px-4 py-2 rounded-xl border border-stone-800 text-right shadow-xl z-10">
              <span className="text-[11px] text-stone-400 block font-medium">Price</span>
              <span className="text-xl sm:text-2xl font-bold text-amber-400">
                {formatPrice(listing.priceAED, currency)}
                {listing.type === 'rent' && <span className="text-xs font-normal text-stone-300"> /yr</span>}
              </span>
              {currency !== 'AED' && (
                <span className="text-xs text-stone-400 block">
                  {formatPrice(listing.priceAED, 'AED')}
                </span>
              )}
            </div>
          </div>

          {/* Role-Based Privacy Box */}
          <div className="p-4 rounded-xl border transition-all text-xs">
            {userRole === 'admin' ? (
              <div className="bg-amber-500/10 border-amber-500/30 text-amber-200 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-amber-500/20">
                  <span className="font-semibold flex items-center gap-1.5 text-amber-300 text-sm">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    Admin CRM Vault (Confidential Direct-to-Owner Record)
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Unmasked
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-stone-400 block text-[11px]">Exact Unit Number</span>
                    <span className="font-semibold text-white">{listing.exactUnitNumber || listing.displayUnit || 'Unit 1804'}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">Owner Contact</span>
                    <span className="font-semibold text-white">{listing.ownerName || 'Rashid Al Nuaimi'}</span>
                    <span className="text-stone-300 block text-[11px]">{listing.ownerPhone || '+971 50 491 8823'}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">Title Deed / Contract</span>
                    <span className="font-semibold text-white">{listing.titleDeedNumber || 'TD-DXB-98442-2024'}</span>
                  </div>
                </div>
                {listing.privateNotes && (
                  <p className="mt-2 text-stone-300 text-xs italic bg-stone-950/60 p-2 rounded">
                    Notes: {listing.privateNotes}
                  </p>
                )}
              </div>
            ) : userRole === 'broker' ? (
              <div className="bg-sky-950/40 border-sky-800/60 text-sky-200 p-4 rounded-lg flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-sky-400 shrink-0" />
                  <div>
                    <p className="font-medium text-sky-300">
                      Co-Broker Verified Listing · Direct with Primary Agency
                    </p>
                    <p className="text-[11px] text-stone-400">
                      Exact unit number & owner contact masked for client security. Standard 50/50 broker commission split guaranteed upon client registration.
                    </p>
                  </div>
                </div>
                {onOpenBrokerSplit && (
                  <button
                    onClick={() => onOpenBrokerSplit(listing)}
                    className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs transition-colors shrink-0 flex items-center gap-1"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    Calculate Commission Split
                  </button>
                )}
              </div>
            ) : (
              <div className="bg-stone-950 border-stone-800 text-stone-400 p-3 rounded-lg flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-stone-400" />
                  Verified RERA Regulated Listing · Reference ID: {listing.id}
                </span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Direct Available
                </span>
              </div>
            )}
          </div>

          {/* Unboxed Primary Specs (Zero-Pill Discipline) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-stone-950/60 border border-stone-800/80">
            <div>
              <span className="text-[11px] text-stone-400 block">Bedrooms</span>
              <span className="text-base sm:text-lg font-semibold text-white flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-amber-400" />
                {listing.beds} {listing.beds === 1 ? 'Bedroom' : 'Bedrooms'}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-stone-400 block">Bathrooms</span>
              <span className="text-base sm:text-lg font-semibold text-white flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-amber-400" />
                {listing.baths} Bathrooms
              </span>
            </div>
            <div>
              <span className="text-[11px] text-stone-400 block">Built-Up Area</span>
              <span className="text-base sm:text-lg font-semibold text-white flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-amber-400" />
                {listing.sqft.toLocaleString()} sq.ft
              </span>
            </div>
            <div>
              <span className="text-[11px] text-stone-400 block">
                {listing.isOffPlan ? 'Expected Handover' : 'Gross Yield'}
              </span>
              <span className="text-base sm:text-lg font-semibold text-amber-400 flex items-center gap-1.5">
                {listing.isOffPlan ? (
                  <>
                    <Calendar className="w-4 h-4 text-amber-400" />
                    {listing.handoverDate || 'Q4 2027'}
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    {listing.rentalYieldPercent || 7.5}% ROI
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-1 border-b border-stone-800 text-xs overflow-x-auto pb-0.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2.5 px-3 font-medium transition-colors border-b-2 shrink-0 ${
                activeTab === 'overview'
                  ? 'border-amber-400 text-amber-400 font-semibold'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              Overview & Amenities
            </button>
            {listing.videoUrl && (
              <button
                onClick={() => {
                  setActiveTab('video');
                  setMediaMode('video');
                }}
                className={`pb-2.5 px-3 font-medium transition-colors border-b-2 shrink-0 flex items-center gap-1 ${
                  activeTab === 'video'
                    ? 'border-red-500 text-red-400 font-semibold'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <Play className="w-3 h-3 fill-current text-red-400" />
                <span>4K Video Tour</span>
              </button>
            )}
            {listing.isOffPlan && listing.paymentPlan && (
              <button
                onClick={() => setActiveTab('payment-plan')}
                className={`pb-2.5 px-3 font-medium transition-colors border-b-2 shrink-0 ${
                  activeTab === 'payment-plan'
                    ? 'border-amber-400 text-amber-400 font-semibold'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                Payment Schedule ({listing.paymentPlan.length} Milestones)
              </button>
            )}
            {listing.dldEscrowNumber && (
              <button
                onClick={() => setActiveTab('dld-escrow')}
                className={`pb-2.5 px-3 font-medium transition-colors border-b-2 shrink-0 flex items-center gap-1 ${
                  activeTab === 'dld-escrow'
                    ? 'border-emerald-400 text-emerald-400 font-semibold'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>DLD Escrow & Source</span>
              </button>
            )}
            {listing.type !== 'rent' && (
              <button
                onClick={() => setActiveTab('calculator')}
                className={`pb-2.5 px-3 font-medium transition-colors border-b-2 shrink-0 ${
                  activeTab === 'calculator'
                    ? 'border-amber-400 text-amber-400 font-semibold'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                Mortgage / Financing Estimator
              </button>
            )}
            <button
              onClick={() => setActiveTab('inquire')}
              className={`pb-2.5 px-3 font-medium transition-colors border-b-2 shrink-0 ${
                activeTab === 'inquire'
                  ? 'border-amber-400 text-amber-400 font-semibold'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              Inquire / Register
            </button>
          </div>

          {/* TAB 1: OVERVIEW & AMENITIES */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Property Description</h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </div>

              {/* Bullet Points */}
              {listing.bulletPoints && listing.bulletPoints.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Key Highlights</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                    {listing.bulletPoints.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Amenities List */}
              {listing.amenities && listing.amenities.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2.5">Signature Amenities</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {listing.amenities.map((amenity, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-stone-950/70 border border-stone-800 text-xs flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span className="text-stone-200">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Download Brochure Link for Off-Plan */}
              {listing.isOffPlan && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <FileDown className="w-4 h-4 text-amber-400" />
                      Official Off-Plan Project Factsheet & Brochure
                    </h5>
                    <p className="text-xs text-stone-400">
                      {listing.brochureName || 'Official_Brochure_Floorplans.pdf'} · High-Resolution PDF
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const fileName = listing.brochureName || `${listing.title.replace(/\s+/g, '_')}_Brochure.pdf`;
                      const dummyContent = `EstatePulse AI Official Project Brochure\n\nProject: ${listing.title}\nDeveloper: ${listing.developer || 'Master Developer'}\nStarting Price: ${formatPrice(listing.priceAED, 'AED')}\nCommunity: ${listing.community}\nCompletion: ${listing.handoverDate || 'Q4 2027'}\n\nDescription:\n${listing.description}`;
                      const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = fileName;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                      setBrochureDownloaded(true);
                      setTimeout(() => setBrochureDownloaded(false), 4000);
                    }}
                    className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <FileDown className="w-4 h-4" />
                    {brochureDownloaded ? 'Downloaded!' : 'Download PDF Brochure'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB: 4K VIDEO WALKTHROUGH TOUR */}
          {activeTab === 'video' && listing.videoUrl && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Video className="w-4 h-4 text-red-400" />
                    4K Cinematic Walkthrough & Drone Flyover Tour
                  </h4>
                  <p className="text-xs text-stone-400">
                    High-definition architectural walkthrough and master community aerial flythrough.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-semibold border border-red-500/30">
                  Ultra HD 4K
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden aspect-video bg-black border border-stone-800 shadow-2xl">
                <video
                  src={listing.videoUrl}
                  poster={listing.videoPoster || images[0]}
                  controls
                  playsInline
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <span className="text-stone-400 block font-medium">Drone Aerial Vantage</span>
                  <p className="text-stone-200">
                    Captures surrounding masterplan, coastal lagoon promenades, and skyline orientation.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <span className="text-stone-400 block font-medium">Bespoke Interior Finishes</span>
                  <p className="text-stone-200">
                    Showcases Italian marble flooring, European joinery, and triple-height panoramic glazing.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <span className="text-stone-400 block font-medium">Amenity Walkthrough</span>
                  <p className="text-stone-200">
                    Tour the infinity sky pool decks, wellness spa suites, and private resident lounges.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: DLD GOVERNMENT ESCROW & SOURCE VERIFICATION */}
          {activeTab === 'dld-escrow' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-emerald-400" />
                    Dubai Land Department (DLD) Mashrooi & Source Verification
                  </h4>
                  <p className="text-xs text-stone-400">
                    Regulatory escrow audit, official construction milestones, and cross-portal collation.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  RERA Regulated
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* DLD Mashrooi Tracker Card */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Government Escrow Account</span>
                  </div>
                  <div className="space-y-1.5 text-stone-300">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Escrow ID:</span>
                      <span className="font-mono font-bold text-white">{listing.dldEscrowNumber || 'DLD Escrow #28441-DXB'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Construction Status:</span>
                      <span className="font-medium text-emerald-400">{listing.constructionStatus || 'Superstructure in Progress (DLD Verified)'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">RERA Protection:</span>
                      <span className="text-stone-200">Law No. 8 of 2007 Trust Account</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Auditing Portal:</span>
                      <span className="text-stone-200">Dubai REST Mobile App / DLD Mashrooi</span>
                    </div>
                  </div>
                </div>

                {/* Collation Source Card */}
                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                    <Globe className="w-4 h-4 text-amber-400" />
                    <span>Collation & Brochure Origin</span>
                  </div>
                  <div className="space-y-1.5 text-stone-300">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Primary Source:</span>
                      <span className="font-medium text-white">{listing.sourcePortal || 'DXBOffPlan.com & Developer Factsheet'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Media Package:</span>
                      <span className="text-stone-200">Brochure PDF + 4K Walkthrough Video</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Developer Entity:</span>
                      <span className="font-semibold text-amber-400">{listing.developer || 'Master Developer'}</span>
                    </div>
                    {listing.sourceUrl && (
                      <div className="pt-1">
                        <a
                          href={listing.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
                        >
                          <span>Verify Original Portal Listing</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PAYMENT PLAN (Off-Plan) */}
          {activeTab === 'payment-plan' && listing.paymentPlan && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">Payment Milestones</h4>
                <span className="text-xs text-amber-400 font-medium">100% Construction-Linked</span>
              </div>

              {/* Progress Milestones Table */}
              <div className="border border-stone-800 rounded-xl overflow-hidden bg-stone-950">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-900 border-b border-stone-800 text-stone-400">
                    <tr>
                      <th className="p-3">Milestone Stage</th>
                      <th className="p-3">Payment (%)</th>
                      <th className="p-3">Amount ({currency})</th>
                      <th className="p-3">Due Timeline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-300">
                    {listing.paymentPlan.map((milestone, idx) => {
                      const amountAED = (listing.priceAED * milestone.percentage) / 100;
                      return (
                        <tr key={idx} className="hover:bg-stone-900/50">
                          <td className="p-3 font-medium text-white">
                            {milestone.stage}
                            {milestone.note && (
                              <span className="block text-[11px] text-stone-400 font-normal">
                                {milestone.note}
                              </span>
                            )}
                          </td>
                          <td className="p-3 font-semibold text-amber-400">
                            {milestone.percentage}%
                          </td>
                          <td className="p-3 font-medium text-stone-200">
                            {formatPrice(amountAED, currency)}
                          </td>
                          <td className="p-3 text-stone-400">
                            {milestone.dueDate}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: MORTGAGE / FINANCING ESTIMATOR */}
          {activeTab === 'calculator' && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white">Mortgage & Financing Calculator</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs">
                <div>
                  <label className="text-stone-400 block mb-1">Down Payment ({downPaymentPercent}%)</label>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <span className="text-white font-medium block mt-1">
                    {formatPrice(downPaymentAED, currency)}
                  </span>
                </div>

                <div>
                  <label className="text-stone-400 block mb-1">Loan Tenure ({loanTermYears} Years)</label>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={loanTermYears}
                    onChange={(e) => setLoanTermYears(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <span className="text-white font-medium block mt-1">
                    {loanTermYears} Years ({totalMonths} months)
                  </span>
                </div>

                <div>
                  <label className="text-stone-400 block mb-1">Interest Rate ({interestRate}%)</label>
                  <input
                    type="range"
                    min="2.5"
                    max="8.0"
                    step="0.25"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <span className="text-white font-medium block mt-1">
                    {interestRate}% Fixed / Variable
                  </span>
                </div>
              </div>

              {/* Monthly Repayment Callout */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400">Estimated Monthly Installment</span>
                  <p className="text-xl sm:text-2xl font-bold text-amber-400">
                    {formatPrice(monthlyMortgageAED, currency)} <span className="text-xs font-normal text-stone-300">/month</span>
                  </p>
                </div>
                <div className="text-right text-xs text-stone-400">
                  <span>Loan Amount:</span>
                  <span className="block font-semibold text-white">
                    {formatPrice(loanAmountAED, currency)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INQUIRE / REGISTER */}
          {activeTab === 'inquire' && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white">Submit Inquiry & Schedule Viewing</h4>
              {submittedSuccess ? (
                <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h5 className="text-base font-bold text-white">Inquiry Received Successfully!</h5>
                  <p className="text-xs text-stone-300 max-w-md mx-auto">
                    Your inquiry for "{listing.title}" has been registered in the system. Our dedicated luxury property advisor will contact you shortly.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setSubmittedSuccess(false)}
                      className="px-4 py-1.5 rounded-lg bg-stone-800 text-stone-200 text-xs hover:bg-stone-700"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs">
                  {/* Inquirer Type Selector */}
                  <div>
                    <label className="text-stone-400 block mb-1.5">I am registering as:</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setInquirerType('buyer')}
                        className={`py-2 px-3 rounded-lg border font-medium text-center transition-colors ${
                          inquirerType === 'buyer'
                            ? 'bg-amber-500 text-stone-950 border-amber-500 font-semibold'
                            : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        Individual Buyer
                      </button>
                      <button
                        type="button"
                        onClick={() => setInquirerType('tenant')}
                        className={`py-2 px-3 rounded-lg border font-medium text-center transition-colors ${
                          inquirerType === 'tenant'
                            ? 'bg-amber-500 text-stone-950 border-amber-500 font-semibold'
                            : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        Prospective Tenant
                      </button>
                      <button
                        type="button"
                        onClick={() => setInquirerType('broker')}
                        className={`py-2 px-3 rounded-lg border font-medium text-center transition-colors ${
                          inquirerType === 'broker'
                            ? 'bg-sky-600 text-white border-sky-600 font-semibold'
                            : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        Co-Broker Agent
                      </button>
                    </div>
                  </div>

                  {/* Broker Specific Fields */}
                  {inquirerType === 'broker' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg bg-sky-950/30 border border-sky-800/40">
                      <div>
                        <label className="text-stone-300 block mb-1">Brokerage / Agency Name</label>
                        <input
                          type="text"
                          required
                          value={agencyName}
                          onChange={(e) => setAgencyName(e.target.value)}
                          placeholder="e.g. Apex Prime Properties"
                          className="w-full p-2 rounded bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-sky-500"
                        />
                      </div>
                      <div>
                        <label className="text-stone-300 block mb-1">RERA BRN / License Number</label>
                        <input
                          type="text"
                          required
                          value={brokerLicense}
                          onChange={(e) => setBrokerLicense(e.target.value)}
                          placeholder="e.g. BRN-44281"
                          className="w-full p-2 rounded bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-sky-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-stone-400 block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alexander Lindqvist"
                        className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-stone-400 block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alexander@domain.com"
                        className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-stone-400 block mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+971 50 123 4567"
                        className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-stone-400 block mb-1">Message or Specific Requests</label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-bold transition-colors shadow-md shadow-amber-500/20"
                  >
                    {isSubmitting ? 'Registering...' : 'Submit Inquiry & Direct Routing'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 border-t border-stone-800 bg-stone-950 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400">Direct Agent Connect:</span>
            <span className="text-xs font-semibold text-white">+971 4 800 3782</span>
          </div>

          <div className="flex items-center gap-2">
            {/* 1-Tap WhatsApp Trigger */}
            <a
              href={createWhatsAppUrl('+971501234567', whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct Chat</span>
            </a>

            <button
              onClick={() => setActiveTab('inquire')}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>Inquire Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
