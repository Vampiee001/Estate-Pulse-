import React from 'react';
import { 
  Bed, 
  Bath, 
  Maximize2, 
  Calendar, 
  Building, 
  MessageCircle, 
  Shield, 
  Lock, 
  FileText,
  DollarSign,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Play,
  Video,
  FileCheck2
} from 'lucide-react';
import { PropertyListing, UserRole } from '../types/realestate';
import { Currency, formatPrice, formatCurrencyShort, createWhatsAppUrl } from '../utils/helpers';

interface PropertyCardProps {
  listing: PropertyListing;
  userRole: UserRole;
  currency: Currency;
  onSelect: (listing: PropertyListing) => void;
  onOpenBrokerSplit?: (listing: PropertyListing) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  listing,
  userRole,
  currency,
  onSelect,
  onOpenBrokerSplit,
}) => {
  const isOffPlan = listing.type === 'off-plan';
  const whatsappMsg = `Hi EstatePulse AI, I'm inquiring about "${listing.title}" (Ref: ${listing.id}) listed at ${formatPrice(listing.priceAED, 'AED')}. Could you provide the latest availability and schedule a viewing?`;

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden hover:border-stone-700 transition-all duration-200 flex flex-col group shadow-lg shadow-black/20">
      {/* Property Thumbnail with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
        <img
          src={listing.images[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider bg-stone-950/85 backdrop-blur-md text-stone-200 border border-stone-700/60">
            {listing.type === 'buy' ? 'For Sale' : listing.type === 'rent' ? 'For Rent' : 'Off-Plan Launch'}
          </span>
          {listing.badge && (
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/90 text-stone-950 shadow-sm">
              {listing.badge}
            </span>
          )}
          {listing.videoUrl && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(listing);
              }}
              className="px-2 py-0.5 rounded text-[11px] font-semibold bg-red-600/90 hover:bg-red-500 text-white backdrop-blur-md flex items-center gap-1 shadow-sm transition-colors"
            >
              <Play className="w-2.5 h-2.5 fill-current" />
              <span>4K Video</span>
            </button>
          )}
        </div>

        {/* Top Right: Off-Plan Developer or Secondary ROI */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
          {isOffPlan && listing.developer && (
            <span className="px-2.5 py-1 rounded text-[11px] font-medium bg-black/75 backdrop-blur-md text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <Building className="w-3 h-3 text-amber-400" />
              {listing.developer}
            </span>
          )}
          {!isOffPlan && listing.rentalYieldPercent && (
            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              {listing.rentalYieldPercent}% Est. Yield
            </span>
          )}
          {listing.dldEscrowNumber && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-950/80 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <FileCheck2 className="w-3 h-3 text-emerald-400" />
              DLD Escrow Verified
            </span>
          )}
        </div>

        {/* Bottom Price in selected currency */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <p className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">
              {formatPrice(listing.priceAED, currency)}
              {listing.type === 'rent' && <span className="text-xs font-normal text-stone-300"> /year</span>}
            </p>
            {currency !== 'AED' && (
              <p className="text-[11px] text-stone-300 drop-shadow">
                {formatPrice(listing.priceAED, 'AED')}
              </p>
            )}
          </div>

          {/* Off-Plan Handover date */}
          {isOffPlan && listing.handoverDate && (
            <div className="text-right">
              <span className="text-[11px] text-stone-300 block">Handover</span>
              <span className="text-xs font-semibold text-amber-400 flex items-center justify-end gap-1">
                <Calendar className="w-3 h-3" />
                {listing.handoverDate}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Sanitized / Exact Unit Display */}
          <div className="flex items-center gap-1 text-xs text-stone-400 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{listing.community}</span>
          </div>

          <h3 
            onClick={() => onSelect(listing)} 
            className="text-base sm:text-lg font-semibold text-white group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-1 mb-1"
          >
            {listing.title}
          </h3>

          {/* Headline Kicker */}
          {listing.headline && (
            <p className="text-xs text-stone-400 line-clamp-1 italic mb-3">
              "{listing.headline}"
            </p>
          )}

          {/* Data Masking & RBAC Privacy Indicator */}
          <div className="p-2 rounded-lg bg-stone-950/80 border border-stone-800 text-xs mb-3.5">
            {userRole === 'admin' ? (
              <div className="flex items-center justify-between text-amber-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  Admin Unmasked: {listing.exactUnitNumber || listing.displayUnit || 'Unit 1804'}
                </span>
                {listing.ownerName && (
                  <span className="text-[11px] text-stone-400 truncate max-w-[120px]">
                    Owner: {listing.ownerName.split(' ')[0]}
                  </span>
                )}
              </div>
            ) : userRole === 'broker' ? (
              <div className="flex items-center justify-between text-sky-300">
                <span className="flex items-center gap-1.5 font-medium truncate">
                  <Lock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  {listing.displayUnit || 'High Floor Unit (Masked)'}
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40 shrink-0">
                  50/50 Split
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-stone-400 text-xs truncate">
                <Building className="w-3.5 h-3.5 text-stone-500" />
                <span>{listing.displayUnit || `${listing.community} Residences`}</span>
              </div>
            )}
          </div>

          {/* Unboxed Specs Typography (Zero-Pill Discipline) */}
          <div className="flex items-center gap-2 text-xs text-stone-300 mb-3 pb-3 border-b border-stone-800/80">
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-amber-400" />
              {listing.beds} {listing.beds === 1 ? 'Bed' : 'Beds'}
            </span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-amber-400" />
              {listing.baths} {listing.baths === 1 ? 'Bath' : 'Baths'}
            </span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
              {listing.sqft.toLocaleString()} sq.ft
            </span>
          </div>

          {/* Key Highlight / Payment Plan Snippet */}
          {isOffPlan && listing.paymentPlan && listing.paymentPlan.length > 0 ? (
            <div className="text-xs text-stone-400 mb-3 bg-stone-950/40 p-2 rounded">
              <span className="text-amber-300 font-medium block mb-1">Payment Schedule:</span>
              <p className="line-clamp-1 text-[11px]">
                {listing.paymentPlan[0].percentage}% Booking · {100 - listing.paymentPlan[0].percentage - (listing.paymentPlan[listing.paymentPlan.length - 1]?.percentage || 0)}% Milestones · {listing.paymentPlan[listing.paymentPlan.length - 1]?.percentage || 40}% Handover
              </p>
            </div>
          ) : (
            <p className="text-xs text-stone-400 line-clamp-2 mb-3">
              {listing.description}
            </p>
          )}
        </div>

        {/* Action Buttons Row */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={() => onSelect(listing)}
            className="flex-1 py-2 px-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-100 text-xs font-medium transition-colors text-center"
          >
            View Details
          </button>

          {/* 1-Tap WhatsApp Trigger */}
          <a
            href={createWhatsAppUrl('+971501234567', whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center shrink-0"
            title="Instant WhatsApp Inquire"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          {/* Co-Broker Commission Split Tool */}
          {userRole === 'broker' && onOpenBrokerSplit && (
            <button
              onClick={() => onOpenBrokerSplit(listing)}
              className="px-2.5 py-2 rounded-lg bg-sky-950 hover:bg-sky-900 text-sky-300 border border-sky-800/60 text-xs font-medium transition-colors flex items-center gap-1"
              title="Calculate 50/50 broker commission split"
            >
              <DollarSign className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Split</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
