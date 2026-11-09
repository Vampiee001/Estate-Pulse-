import React, { useState } from 'react';
import { 
  Lock, 
  AlertTriangle, 
  Calendar, 
  Phone, 
  Mail, 
  Building, 
  DollarSign, 
  Sparkles, 
  Plus, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Share2, 
  Search,
  Filter,
  UserCheck,
  EyeOff,
  ArrowRight,
  TrendingUp,
  FileCheck,
  X
} from 'lucide-react';
import { OwnerCRMRecord, PropertyListing } from '../types/realestate';
import { Currency, formatPrice, calculateDaysRemaining, createWhatsAppUrl } from '../utils/helpers';

interface DirectToOwnerVaultProps {
  records: OwnerCRMRecord[];
  currency: Currency;
  onConvertToPublic: (recordId: string, listingType: 'buy' | 'rent') => Promise<void>;
  onAddNewRecord: (record: OwnerCRMRecord) => void;
  onSelectListing?: (listingId: string) => void;
}

export const DirectToOwnerVault: React.FC<DirectToOwnerVaultProps> = ({
  records,
  currency,
  onConvertToPublic,
  onAddNewRecord,
  onSelectListing,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'critical' | 'upcoming' | 'unlisted'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isConvertingId, setIsConvertingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Record Form State
  const [newOwnerName, setNewOwnerName] = useState('');
  const [newOwnerPhone, setNewOwnerPhone] = useState('');
  const [newOwnerEmail, setNewOwnerEmail] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCommunity, setNewCommunity] = useState('Downtown Dubai');
  const [newExactUnit, setNewExactUnit] = useState('');
  const [newSanitizedLocation, setNewSanitizedLocation] = useState('High Floor');
  const [newBeds, setNewBeds] = useState(2);
  const [newBaths, setNewBaths] = useState(2);
  const [newSqft, setNewSqft] = useState(1300);
  const [newSalePrice, setNewSalePrice] = useState(2800000);
  const [newRentPrice, setNewRentPrice] = useState(175000);
  const [newLeaseEndDate, setNewLeaseEndDate] = useState('2026-05-30');
  const [newTenantName, setNewTenantName] = useState('');
  const [newTenantPhone, setNewTenantPhone] = useState('');
  const [newTitleDeed, setNewTitleDeed] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // Process alert statuses
  const processedRecords = records.map((record) => {
    const daysRemaining = calculateDaysRemaining(record.leaseEndDate);
    let alertType: 'none' | 'critical' | 'upcoming' | 'expired' = 'none';

    if (daysRemaining <= 0) {
      alertType = 'expired';
    } else if (daysRemaining <= 30) {
      alertType = 'critical';
    } else if (daysRemaining <= 60) {
      alertType = 'upcoming';
    }

    return {
      ...record,
      daysRemaining,
      alertType,
    };
  });

  const criticalCount = processedRecords.filter((r) => r.alertType === 'critical' || r.alertType === 'expired').length;
  const upcomingCount = processedRecords.filter((r) => r.alertType === 'upcoming').length;
  const totalVaultValueAED = records.reduce((sum, r) => sum + (r.targetSalePriceAED || 0), 0);

  // Filtered records
  const filteredRecords = processedRecords.filter((rec) => {
    if (filterTab === 'critical') return rec.alertType === 'critical' || rec.alertType === 'expired';
    if (filterTab === 'upcoming') return rec.alertType === 'upcoming';
    if (filterTab === 'unlisted') return !rec.isPublishedToMarketplace;
    return true;
  }).filter((rec) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      rec.propertyTitle.toLowerCase().includes(q) ||
      rec.ownerName.toLowerCase().includes(q) ||
      rec.exactUnitNumber.toLowerCase().includes(q) ||
      rec.community.toLowerCase().includes(q)
    );
  });

  const handleConvertClick = async (recordId: string, listingType: 'buy' | 'rent') => {
    setIsConvertingId(recordId);
    try {
      await onConvertToPublic(recordId, listingType);
    } catch (err) {
      console.error(err);
    } finally {
      setIsConvertingId(null);
    }
  };

  const handleCreateNewRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const created: OwnerCRMRecord = {
      id: `crm-${Date.now()}`,
      ownerName: newOwnerName || 'Private Owner',
      ownerPhone: newOwnerPhone || '+971 50 000 0000',
      ownerEmail: newOwnerEmail || 'owner@estate.ae',
      propertyTitle: newTitle || 'Downtown Luxury Suite',
      community: newCommunity,
      exactUnitNumber: newExactUnit || 'Unit 2201',
      sanitizedLocation: `${newCommunity}, ${newSanitizedLocation}`,
      beds: newBeds,
      baths: newBaths,
      sqft: newSqft,
      propertyType: 'Apartment',
      targetSalePriceAED: newSalePrice,
      targetRentPriceAED: newRentPrice,
      currentRentAED: newRentPrice * 0.95,
      tenantName: newTenantName,
      tenantPhone: newTenantPhone,
      leaseStartDate: '2025-06-01',
      leaseEndDate: newLeaseEndDate,
      titleDeedNumber: newTitleDeed || `TD-DXB-${Math.floor(10000 + Math.random() * 90000)}-2024`,
      privateNotes: newNotes,
      status: 'Occupied',
      isPublishedToMarketplace: false,
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
      ],
      createdAt: new Date().toISOString(),
    };

    onAddNewRecord(created);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Vault Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 p-5 sm:p-7 rounded-2xl border border-stone-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Lock className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
                Encrypted Admin Vault · RBAC Protected
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Confidential Direct-to-Owner Database
            </h2>
            <p className="text-xs text-stone-400 mt-1 max-w-2xl leading-relaxed">
              Secure repository for high-net-worth owner contacts, exact unit numbers, title deeds, and automated rental contract expiration alerts. 
              Restricted strictly to Main Admin.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add Owner Record</span>
            </button>
          </div>
        </div>

        {/* Metric Counter Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-stone-800/80">
          <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800">
            <span className="text-[11px] text-stone-400 block">Total Owner Assets</span>
            <span className="text-xl font-bold text-white mt-0.5 block">{records.length} Units</span>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-800/40">
            <span className="text-[11px] text-rose-300 block flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-rose-400" />
              Critical (&lt;30d Expiry)
            </span>
            <span className="text-xl font-bold text-rose-400 mt-0.5 block">
              {criticalCount} Units
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40">
            <span className="text-[11px] text-amber-300 block flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              Upcoming (30-60d Expiry)
            </span>
            <span className="text-xl font-bold text-amber-400 mt-0.5 block">
              {upcomingCount} Units
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800">
            <span className="text-[11px] text-stone-400 block">Portfolio Vault Value</span>
            <span className="text-xl font-bold text-amber-400 mt-0.5 block">
              {formatPrice(totalVaultValueAED, currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Automated Expiration Alert Banner */}
      {criticalCount > 0 && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 flex items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <p className="font-semibold text-rose-300">
                Automated Rental Expiration Alert: {criticalCount} {criticalCount === 1 ? 'unit requires' : 'units require'} immediate action!
              </p>
              <p className="text-[11px] text-stone-300 mt-0.5">
                Lease contracts are expiring within 30 days. Contact tenant/owner for renewal or use <strong>1-Click Public Conversion</strong> to pre-market before vacancy.
              </p>
            </div>
          </div>
          <button
            onClick={() => setFilterTab('critical')}
            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs transition-colors shrink-0"
          >
            Review Critical Units
          </button>
        </div>
      )}

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
          <button
            onClick={() => setFilterTab('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filterTab === 'all'
                ? 'bg-stone-800 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            All Vault Records ({records.length})
          </button>
          <button
            onClick={() => setFilterTab('critical')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1 ${
              filterTab === 'critical'
                ? 'bg-rose-950 text-rose-300 border border-rose-800/50'
                : 'text-stone-400 hover:text-rose-300'
            }`}
          >
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            Critical &lt;30d ({criticalCount})
          </button>
          <button
            onClick={() => setFilterTab('upcoming')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1 ${
              filterTab === 'upcoming'
                ? 'bg-amber-950 text-amber-300 border border-amber-800/50'
                : 'text-stone-400 hover:text-amber-300'
            }`}
          >
            <Clock className="w-3 h-3 text-amber-400" />
            Upcoming 60d ({upcomingCount})
          </button>
          <button
            onClick={() => setFilterTab('unlisted')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filterTab === 'unlisted'
                ? 'bg-stone-800 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Unpublished / Private Only
          </button>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search owner, unit, building..."
            className="w-full sm:w-64 pl-9 pr-3 py-1.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* CRM Records Cards List */}
      <div className="space-y-4">
        {filteredRecords.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-stone-900/50 border border-stone-800">
            <Lock className="w-10 h-10 text-stone-600 mx-auto mb-2" />
            <h4 className="text-base font-semibold text-white">No owner records matching criteria</h4>
            <p className="text-xs text-stone-400 mt-1">Try clearing search filters or add a new confidential record.</p>
          </div>
        ) : (
          filteredRecords.map((record) => {
            const isCritical = record.alertType === 'critical';
            const isUpcoming = record.alertType === 'upcoming';
            const isExpired = record.alertType === 'expired';

            return (
              <div
                key={record.id}
                className={`p-5 rounded-2xl border transition-all bg-stone-900 ${
                  isCritical || isExpired
                    ? 'border-rose-500/50 shadow-lg shadow-rose-950/20'
                    : isUpcoming
                    ? 'border-amber-500/50'
                    : 'border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Left Column: Property & Confidential Owner Specs */}
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1">
                        <Lock className="w-3 h-3 text-amber-400" />
                        {record.exactUnitNumber}
                      </span>
                      <span className="text-sm font-bold text-white">
                        {record.propertyTitle}
                      </span>
                      <span className="text-xs text-stone-400">
                        ({record.sanitizedLocation})
                      </span>
                      {record.isPublishedToMarketplace ? (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/40 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Live on Public Marketplace
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-stone-800 text-stone-300">
                          Private CRM Vault Only
                        </span>
                      )}
                    </div>

                    {/* Confidential Owner Info Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-stone-950/80 border border-stone-800 text-xs">
                      <div>
                        <span className="text-stone-400 text-[11px] block">Owner Contact</span>
                        <span className="font-semibold text-white">{record.ownerName}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <a
                            href={`tel:${record.ownerPhone}`}
                            className="text-stone-300 hover:text-white flex items-center gap-1 text-[11px]"
                          >
                            <Phone className="w-3 h-3 text-amber-400" />
                            {record.ownerPhone}
                          </a>
                          <a
                            href={createWhatsAppUrl(record.ownerPhone, `Hi ${record.ownerName}, following up regarding your property ${record.exactUnitNumber} in ${record.community}.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:underline text-[11px]"
                          >
                            WhatsApp
                          </a>
                        </div>
                      </div>

                      <div>
                        <span className="text-stone-400 text-[11px] block">Current Tenant & Rent</span>
                        <span className="font-medium text-stone-200">
                          {record.tenantName || 'Vacant / Available'}
                        </span>
                        <span className="text-amber-400 font-semibold block text-[11px]">
                          Current: {formatPrice(record.currentRentAED || 0, currency)}/yr
                        </span>
                      </div>

                      <div>
                        <span className="text-stone-400 text-[11px] block">Target Valuations</span>
                        <span className="text-white font-semibold block">
                          Sale: {formatPrice(record.targetSalePriceAED || 0, currency)}
                        </span>
                        <span className="text-stone-300 text-[11px] block">
                          Rent: {formatPrice(record.targetRentPriceAED || 0, currency)}/yr
                        </span>
                      </div>
                    </div>

                    {/* Expiry Countdown & Alert Callout */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-stone-400">Lease Term:</span>
                      <span className="text-stone-200 font-medium">
                        {record.leaseStartDate || '2025-05-01'} → {record.leaseEndDate}
                      </span>
                      <span aria-hidden="true" className="text-stone-600">·</span>
                      
                      {isCritical && (
                        <span className="text-rose-400 font-bold flex items-center gap-1 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/50">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                          Lease expires in {record.daysRemaining} days (30d Critical Alert)
                        </span>
                      )}
                      {isUpcoming && (
                        <span className="text-amber-400 font-semibold flex items-center gap-1 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          Lease expires in {record.daysRemaining} days (60d Notice Due)
                        </span>
                      )}
                      {isExpired && (
                        <span className="text-rose-400 font-bold flex items-center gap-1 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                          Contract Expired - Ready for Relist
                        </span>
                      )}
                      {!isCritical && !isUpcoming && !isExpired && (
                        <span className="text-stone-400">
                          ({record.daysRemaining} days remaining)
                        </span>
                      )}
                    </div>

                    {record.privateNotes && (
                      <p className="text-[11px] text-stone-400 italic bg-stone-950/50 p-2 rounded border border-stone-800/60">
                        Admin Note: {record.privateNotes}
                      </p>
                    )}
                  </div>

                  {/* Right Column: 1-Click Public Conversion & Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-between gap-2.5 shrink-0 min-w-[220px]">
                    <div className="text-left lg:text-right">
                      <span className="text-[11px] text-stone-400 block">Title Deed</span>
                      <span className="text-xs font-mono text-stone-300 font-medium">
                        {record.titleDeedNumber || 'TD-DXB-98442'}
                      </span>
                    </div>

                    {/* 1-CLICK PUBLIC CONVERSION BUTTONS */}
                    {!record.isPublishedToMarketplace ? (
                      <div className="space-y-1.5 w-full">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 block text-left lg:text-right">
                          1-Click Public Conversion:
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleConvertClick(record.id, 'buy')}
                            disabled={isConvertingId === record.id}
                            className="flex-1 py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-bold text-xs transition-colors flex items-center justify-center gap-1 shadow-md shadow-amber-500/20"
                            title="Clones record, masks Unit # to floor level, strips owner contact, and writes public copy"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Publish For Sale</span>
                          </button>
                          <button
                            onClick={() => handleConvertClick(record.id, 'rent')}
                            disabled={isConvertingId === record.id}
                            className="flex-1 py-2 px-3 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-50 text-stone-100 font-medium text-xs transition-colors flex items-center justify-center gap-1 border border-stone-700"
                            title="Publishes as upcoming rental"
                          >
                            <span>Publish Rent</span>
                          </button>
                        </div>
                        <p className="text-[10px] text-stone-500 text-left lg:text-right">
                          Auto-masks {record.exactUnitNumber} → {record.sanitizedLocation}
                        </p>
                      </div>
                    ) : (
                      <div className="text-left lg:text-right">
                        <span className="text-xs text-emerald-400 font-semibold flex items-center lg:justify-end gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          Published to Public Portal
                        </span>
                        <p className="text-[11px] text-stone-400 mt-0.5">
                          Unit masked to "{record.sanitizedLocation}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ADD OWNER RECORD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
          <div 
            className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8 text-stone-100 max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-5 border-b border-stone-800 bg-stone-950 flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                Add Confidential Direct-to-Owner Asset
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewRecord} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-400 block mb-1">Owner Name</label>
                  <input
                    type="text"
                    required
                    value={newOwnerName}
                    onChange={(e) => setNewOwnerName(e.target.value)}
                    placeholder="e.g. Tariq Al Mansoori"
                    className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Owner Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={newOwnerPhone}
                    onChange={(e) => setNewOwnerPhone(e.target.value)}
                    placeholder="+971 50 123 4567"
                    className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Owner Email</label>
                  <input
                    type="email"
                    value={newOwnerEmail}
                    onChange={(e) => setNewOwnerEmail(e.target.value)}
                    placeholder="tariq@gulfcapital.ae"
                    className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Title Deed Reference</label>
                  <input
                    type="text"
                    value={newTitleDeed}
                    onChange={(e) => setNewTitleDeed(e.target.value)}
                    placeholder="TD-DXB-88129-2024"
                    className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-stone-800">
                <div className="sm:col-span-2">
                  <label className="text-stone-400 block mb-1">Property Building / Project</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Marina Gate Tower 2"
                    className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Exact Unit # (Confidential)</label>
                  <input
                    type="text"
                    required
                    value={newExactUnit}
                    onChange={(e) => setNewExactUnit(e.target.value)}
                    placeholder="e.g. Unit 2204"
                    className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-white font-bold text-amber-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Sanitized Display Unit (Public/Broker)</label>
                  <input
                    type="text"
                    value={newSanitizedLocation}
                    onChange={(e) => setNewSanitizedLocation(e.target.value)}
                    placeholder="e.g. Marina Gate, High Floor"
                    className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Target Sale Price (AED)</label>
                  <input
                    type="number"
                    value={newSalePrice}
                    onChange={(e) => setNewSalePrice(Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Target Rent Price (AED/yr)</label>
                  <input
                    type="number"
                    value={newRentPrice}
                    onChange={(e) => setNewRentPrice(Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-stone-800">
                <div>
                  <label className="text-stone-400 block mb-1">Lease Expiry Date</label>
                  <input
                    type="date"
                    required
                    value={newLeaseEndDate}
                    onChange={(e) => setNewLeaseEndDate(e.target.value)}
                    className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Current Tenant Name</label>
                  <input
                    type="text"
                    value={newTenantName}
                    onChange={(e) => setNewTenantName(e.target.value)}
                    placeholder="e.g. Julian Meyer"
                    className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Tenant Phone</label>
                  <input
                    type="tel"
                    value={newTenantPhone}
                    onChange={(e) => setNewTenantPhone(e.target.value)}
                    placeholder="+971 50 999 1111"
                    className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-400 block mb-1">Confidential Admin Notes</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Private negotiation terms, tenant plans, keycard location..."
                  className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
                >
                  Save to Encrypted Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
