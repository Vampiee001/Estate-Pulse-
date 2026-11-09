/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Sparkles, 
  Lock, 
  Search, 
  Filter, 
  Plus, 
  ArrowRight, 
  TrendingUp, 
  FileText, 
  ShieldCheck, 
  Eye, 
  CheckCircle2,
  SlidersHorizontal,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { UserRole, ListingType, PropertyListing, OwnerCRMRecord, LeadInquiry } from './types/realestate';
import { Currency, formatPrice, calculateDaysRemaining } from './utils/helpers';
import { INITIAL_LISTINGS, INITIAL_OWNER_VAULT, INITIAL_LEADS } from './data/seedData';
import { Navbar } from './components/Navbar';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { AIOffPlanListerModal } from './components/AIOffPlanListerModal';
import { AISecondaryQuickUploadModal } from './components/AISecondaryQuickUploadModal';
import { DirectToOwnerVault } from './components/DirectToOwnerVault';
import { LeadsInbox } from './components/LeadsInbox';
import { AIStudioTab } from './components/AIStudioTab';
import { BrokerSplitModal } from './components/BrokerSplitModal';
import { MobileShell } from './components/MobileShell';

export default function App() {
  // Navigation & Role State
  const [currentTab, setCurrentTab] = useState<'marketplace' | 'ai-studio' | 'vault' | 'leads'>('marketplace');
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [currency, setCurrency] = useState<Currency>('AED');
  const [isMobileShell, setIsMobileShell] = useState<boolean>(false);

  // Data Stores
  const [listings, setListings] = useState<PropertyListing[]>(INITIAL_LISTINGS);
  const [vaultRecords, setVaultRecords] = useState<OwnerCRMRecord[]>(INITIAL_OWNER_VAULT);
  const [leads, setLeads] = useState<LeadInquiry[]>(INITIAL_LEADS);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Modals State
  const [selectedListing, setSelectedListing] = useState<PropertyListing | null>(null);
  const [isOffPlanModalOpen, setIsOffPlanModalOpen] = useState<boolean>(false);
  const [selectedHarvestPortalId, setSelectedHarvestPortalId] = useState<string | undefined>(undefined);
  const [isQuickUploadModalOpen, setIsQuickUploadModalOpen] = useState<boolean>(false);
  const [brokerSplitListing, setBrokerSplitListing] = useState<PropertyListing | null>(null);

  // Marketplace Filters
  const [typeFilter, setTypeFilter] = useState<'all' | ListingType>('all');
  const [communityFilter, setCommunityFilter] = useState<string>('all');
  const [bedsFilter, setBedsFilter] = useState<string>('all');
  const [badgeFilter, setBadgeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPriceAED, setMaxPriceAED] = useState<number>(15000000);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  // Fetch listings and vault on mount or when userRole changes (to test RBAC masking)
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch Listings with role masking
      const listRes = await fetch(`/api/listings?role=${userRole}`);
      if (listRes.ok) {
        const listJson = await listRes.json();
        if (listJson.data) setListings(listJson.data);
      }

      // 2. Fetch Vault (Admin only)
      if (userRole === 'admin') {
        const vaultRes = await fetch(`/api/crm/owners?role=${userRole}`);
        if (vaultRes.ok) {
          const vaultJson = await vaultRes.json();
          if (vaultJson.data) setVaultRecords(vaultJson.data);
        }
      }

      // 3. Fetch Leads
      if (userRole !== 'public') {
        const leadsRes = await fetch(`/api/leads?role=${userRole}`);
        if (leadsRes.ok) {
          const leadsJson = await leadsRes.json();
          if (leadsJson.data) setLeads(leadsJson.data);
        }
      }
    } catch (err) {
      console.warn('Using client state fallback:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userRole]);

  // Compute Vault Alerts count
  const vaultAlertsCount = vaultRecords.filter((rec) => {
    const days = calculateDaysRemaining(rec.leaseEndDate);
    return days <= 60;
  }).length;

  const newLeadsCount = leads.filter((l) => l.status === 'New').length;

  // Handlers for Publishing new AI generated listings
  const handlePublishListing = async (newListing: PropertyListing) => {
    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newListing),
      });
      if (res.ok) {
        const json = await res.json();
        setListings([json.data, ...listings]);
      } else {
        setListings([newListing, ...listings]);
      }
    } catch {
      setListings([newListing, ...listings]);
    }
    setCurrentTab('marketplace');
    setSelectedListing(newListing);
  };

  // 1-Click Public Conversion from Private Owner Vault
  const handleConvertToPublic = async (crmId: string, listingType: 'buy' | 'rent') => {
    try {
      const res = await fetch('/api/crm/convert-to-public', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crmId, listingType }),
      });

      if (res.ok) {
        const json = await res.json();
        const publishedListing: PropertyListing = json.data;
        setListings([publishedListing, ...listings]);

        // Update local vault record status
        setVaultRecords(
          vaultRecords.map((r) =>
            r.id === crmId
              ? {
                  ...r,
                  isPublishedToMarketplace: true,
                  marketplaceListingId: publishedListing.id,
                  status: 'Listed',
                }
              : r
          )
        );

        setSelectedListing(publishedListing);
      }
    } catch (err) {
      console.error('Error during conversion:', err);
    }
  };

  // Add new owner CRM record
  const handleAddNewVaultRecord = async (record: OwnerCRMRecord) => {
    try {
      const res = await fetch('/api/crm/owners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      if (res.ok) {
        const json = await res.json();
        setVaultRecords([json.data, ...vaultRecords]);
      } else {
        setVaultRecords([record, ...vaultRecords]);
      }
    } catch {
      setVaultRecords([record, ...vaultRecords]);
    }
  };

  // Lead Submission
  const handleLeadSubmit = async (inquiryData: Omit<LeadInquiry, 'id' | 'status' | 'createdAt'>) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData),
      });
      if (res.ok) {
        const json = await res.json();
        setLeads([json.data, ...leads]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateLeadStatus = async (leadId: string, status: LeadInquiry['status']) => {
    try {
      await fetch(`/api/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      setLeads(leads.map((l) => (l.id === leadId ? { ...l, status } : l)));
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered Listings for Marketplace
  const communities = Array.from(new Set(listings.map((l) => l.community)));

  const filteredListings = listings.filter((l) => {
    if (typeFilter !== 'all' && l.type !== typeFilter) return false;
    if (communityFilter !== 'all' && l.community !== communityFilter) return false;
    if (bedsFilter !== 'all') {
      const targetBeds = Number(bedsFilter);
      if (bedsFilter === '4+' ? l.beds < 4 : l.beds !== targetBeds) return false;
    }
    if (badgeFilter !== 'all' && l.badge !== badgeFilter) return false;
    if (l.priceAED > maxPriceAED) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = l.title.toLowerCase().includes(q);
      const matchCommunity = l.community.toLowerCase().includes(q);
      const matchDesc = l.description.toLowerCase().includes(q);
      const matchDev = l.developer ? l.developer.toLowerCase().includes(q) : false;
      if (!matchTitle && !matchCommunity && !matchDesc && !matchDev) return false;
    }
    return true;
  });

  // Main Core View Render
  const renderMainContent = () => {
    if (currentTab === 'ai-studio') {
      return (
        <AIStudioTab
          onOpenOffPlanModal={(portalId) => {
            setSelectedHarvestPortalId(portalId);
            setIsOffPlanModalOpen(true);
          }}
          onOpenQuickUploadModal={() => setIsQuickUploadModalOpen(true)}
        />
      );
    }

    if (currentTab === 'vault') {
      if (userRole !== 'admin') {
        return (
          <div className="p-12 text-center rounded-2xl bg-stone-900 border border-stone-800 text-stone-400 max-w-lg mx-auto">
            <Lock className="w-12 h-12 text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">Access Restricted: Admin Vault</h3>
            <p className="text-xs text-stone-400 mt-1 mb-4 leading-relaxed">
              The confidential Direct-to-Owner database contains sensitive owner contacts, private lease contracts, and exact unit numbers.
            </p>
            <button
              onClick={() => setUserRole('admin')}
              className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs"
            >
              Switch to Main Admin Role
            </button>
          </div>
        );
      }

      return (
        <DirectToOwnerVault
          records={vaultRecords}
          currency={currency}
          onConvertToPublic={handleConvertToPublic}
          onAddNewRecord={handleAddNewVaultRecord}
          onSelectListing={(id) => {
            const found = listings.find((l) => l.id === id);
            if (found) setSelectedListing(found);
          }}
        />
      );
    }

    if (currentTab === 'leads') {
      return (
        <LeadsInbox
          leads={leads}
          currency={currency}
          onUpdateStatus={handleUpdateLeadStatus}
        />
      );
    }

    // Default: Marketplace View
    return (
      <div className="space-y-6">
        {/* Marketplace Hero & Discovery Header */}
        <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 p-6 sm:p-8 rounded-2xl border border-stone-800 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
              <Building2 className="w-4 h-4 text-amber-400" />
              Verified Dubai & International Properties
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Curated Prime Living & High-ROI Off-Plan Launches
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
              Explore secondary market resales and off-plan master developments parsed via AI with construction-linked payment plans. 
              {userRole === 'broker' && (
                <strong className="text-sky-300 block mt-1">
                  🤝 Co-Broker Mode Active: 50/50 Commission Split protected on all verified listings.
                </strong>
              )}
            </p>
          </div>

          {/* Quick AI Ingestion CTA Banner for Admin */}
          {userRole === 'admin' && (
            <div className="mt-6 pt-5 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-stone-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Have an off-plan PDF brochure or quick voice memo? Let Gemini AI build the listing:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOffPlanModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Parse PDF Brochure</span>
                </button>
                <button
                  onClick={() => setIsQuickUploadModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-100 font-medium border border-stone-700 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>Quick-Upload Note</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 shadow-md space-y-3">
          {/* Top Row: Type Tabs & Search Input */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Type Segmented Control */}
            <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
              <button
                onClick={() => setTypeFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  typeFilter === 'all'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                All Listings ({listings.length})
              </button>
              <button
                onClick={() => setTypeFilter('buy')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  typeFilter === 'buy'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Buy (Secondary)
              </button>
              <button
                onClick={() => setTypeFilter('rent')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  typeFilter === 'rent'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Rent (Upcoming)
              </button>
              <button
                onClick={() => setTypeFilter('off-plan')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  typeFilter === 'off-plan'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Off-Plan Launches
              </button>
            </div>

            {/* Search Input & Advanced Toggle */}
            <div className="flex items-center gap-2 flex-1 md:max-w-md">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search community, building, developer..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`p-2 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0 ${
                  showAdvancedFilters
                    ? 'bg-stone-800 text-white border-stone-700'
                    : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-white'
                }`}
                title="Toggle Filters"
              >
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>

          {/* Secondary Filter Row (Expandable or always visible) */}
          {showAdvancedFilters && (
            <div className="pt-3 border-t border-stone-800/80 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              {/* Community Filter */}
              <div>
                <label className="text-stone-400 block mb-1">Community</label>
                <select
                  value={communityFilter}
                  onChange={(e) => setCommunityFilter(e.target.value)}
                  className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="all">All Locations</option>
                  {communities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Beds Filter */}
              <div>
                <label className="text-stone-400 block mb-1">Bedrooms</label>
                <select
                  value={bedsFilter}
                  onChange={(e) => setBedsFilter(e.target.value)}
                  className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="all">Any Bedrooms</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4+">4+ Bedrooms / Penthouses</option>
                </select>
              </div>

              {/* Badges Filter */}
              <div>
                <label className="text-stone-400 block mb-1">Special Tags</label>
                <select
                  value={badgeFilter}
                  onChange={(e) => setBadgeFilter(e.target.value)}
                  className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="all">All Properties</option>
                  <option value="Hot Deal">Hot Deals Only</option>
                  <option value="High ROI">High Yield &gt;8%</option>
                  <option value="Active Promo">Active Promos & DLD Waivers</option>
                  <option value="Ready to Move">Ready to Move-In</option>
                </select>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex items-center justify-between mb-1 text-stone-400">
                  <span>Max Price:</span>
                  <span className="text-amber-400 font-semibold">{formatPrice(maxPriceAED, currency)}</span>
                </div>
                <input
                  type="range"
                  min="500000"
                  max="15000000"
                  step="250000"
                  value={maxPriceAED}
                  onChange={(e) => setMaxPriceAED(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Listings Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Showing <strong>{filteredListings.length}</strong> available listings</span>
            <span className="text-stone-500">Live Updated AED / Multi-Currency Sync</span>
          </div>

          {filteredListings.length === 0 ? (
            <div className="p-16 text-center rounded-2xl bg-stone-900/40 border border-stone-800 space-y-2">
              <Building2 className="w-10 h-10 text-stone-600 mx-auto" />
              <h3 className="text-base font-semibold text-white">No properties matched current filters</h3>
              <p className="text-xs text-stone-400">Try loosening your search terms or price filter.</p>
              <button
                onClick={() => {
                  setTypeFilter('all');
                  setCommunityFilter('all');
                  setBedsFilter('all');
                  setBadgeFilter('all');
                  setMaxPriceAED(15000000);
                  setSearchQuery('');
                }}
                className="mt-2 px-3 py-1.5 rounded-lg bg-stone-800 text-stone-200 text-xs hover:bg-stone-700"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <PropertyCard
                  key={listing.id}
                  listing={listing}
                  userRole={userRole}
                  currency={currency}
                  onSelect={(item) => setSelectedListing(item)}
                  onOpenBrokerSplit={(item) => setBrokerSplitListing(item)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userRole={userRole}
        setUserRole={setUserRole}
        currency={currency}
        setCurrency={setCurrency}
        isMobileShell={isMobileShell}
        setIsMobileShell={setIsMobileShell}
        openOffPlanModal={() => setIsOffPlanModalOpen(true)}
        openQuickUploadModal={() => setIsQuickUploadModalOpen(true)}
        vaultAlertsCount={vaultAlertsCount}
        newLeadsCount={newLeadsCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {renderMainContent()}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800/80 bg-stone-950 text-stone-500 text-xs py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-amber-500 flex items-center justify-center text-stone-950 font-bold text-[10px]">
              EP
            </div>
            <span className="text-stone-400 font-medium">EstatePulse AI</span>
            <span>· Automated Real Estate Ingestion & Private Vault Platform</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>RERA Registered Brokerage</span>
            <span aria-hidden="true">·</span>
            <span>Direct Owner CRM Vault</span>
            <span aria-hidden="true">·</span>
            <span>Gemini OCR Powered</span>
          </div>
        </div>
      </footer>

      {/* MODAL 1: Property Detail Page / Modal */}
      <PropertyDetailModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
        userRole={userRole}
        currency={currency}
        onLeadSubmit={handleLeadSubmit}
        onOpenBrokerSplit={(listing) => {
          setSelectedListing(null);
          setBrokerSplitListing(listing);
        }}
      />

      {/* MODAL 2: AI Off-Plan PDF Auto-Lister & Portal Harvester Modal */}
      <AIOffPlanListerModal
        isOpen={isOffPlanModalOpen}
        onClose={() => {
          setIsOffPlanModalOpen(false);
          setSelectedHarvestPortalId(undefined);
        }}
        onPublishListing={handlePublishListing}
        initialPortalId={selectedHarvestPortalId}
      />

      {/* MODAL 3: Secondary Market Quick-Upload Modal */}
      <AISecondaryQuickUploadModal
        isOpen={isQuickUploadModalOpen}
        onClose={() => setIsQuickUploadModalOpen(false)}
        onPublishListing={handlePublishListing}
      />

      {/* MODAL 4: Co-Broker Split Calculator Modal */}
      <BrokerSplitModal
        listing={brokerSplitListing}
        onClose={() => setBrokerSplitListing(null)}
        currency={currency}
        onRegisterClient={(clientData) => {
          if (brokerSplitListing) {
            handleLeadSubmit({
              propertyId: brokerSplitListing.id,
              propertyTitle: brokerSplitListing.title,
              propertyType: brokerSplitListing.type,
              inquirerType: 'broker',
              name: clientData.clientName,
              email: `${clientData.clientName.toLowerCase().replace(/\s+/g, '')}@client.ae`,
              phone: clientData.clientPhone,
              companyOrAgency: clientData.brokerAgency,
              message: `Locked-in client registration by ${clientData.brokerAgency} under 50/50 broker split terms.`,
              budgetAED: brokerSplitListing.priceAED,
            });
          }
        }}
      />

      {/* SIMULATOR MODAL: Mobile App Shell Simulator */}
      {isMobileShell && (
        <MobileShell
          onClose={() => setIsMobileShell(false)}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          userRole={userRole}
          vaultAlertsCount={vaultAlertsCount}
        >
          <div className="p-3 space-y-4">
            <div className="p-3 bg-stone-900 border border-stone-800 rounded-xl">
              <span className="text-[10px] text-amber-400 font-mono font-bold block mb-1">
                EstatePulse Mobile
              </span>
              <h3 className="text-sm font-bold text-white">Luxury Real Estate iOS / Android App</h3>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Active role: <strong className="text-amber-400 uppercase">{userRole}</strong>
              </p>
            </div>
            {renderMainContent()}
          </div>
        </MobileShell>
      )}
    </div>
  );
}
