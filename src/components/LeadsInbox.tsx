import React, { useState } from 'react';
import { 
  Inbox, 
  MessageCircle, 
  Phone, 
  Mail, 
  User, 
  Building, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Search,
  Filter,
  DollarSign
} from 'lucide-react';
import { LeadInquiry } from '../types/realestate';
import { Currency, formatPrice, createWhatsAppUrl } from '../utils/helpers';

interface LeadsInboxProps {
  leads: LeadInquiry[];
  currency: Currency;
  onUpdateStatus: (leadId: string, status: LeadInquiry['status']) => void;
}

export const LeadsInbox: React.FC<LeadsInboxProps> = ({
  leads,
  currency,
  onUpdateStatus,
}) => {
  const [statusFilter, setStatusFilter] = useState<'All' | LeadInquiry['status']>('All');
  const [inquirerFilter, setInquirerFilter] = useState<'all' | 'buyer' | 'tenant' | 'broker'>('all');
  const [search, setSearch] = useState('');

  const filteredLeads = leads
    .filter((l) => (statusFilter === 'All' ? true : l.status === statusFilter))
    .filter((l) => (inquirerFilter === 'all' ? true : l.inquirerType === inquirerFilter))
    .filter((l) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.propertyTitle.toLowerCase().includes(q) ||
        (l.companyOrAgency && l.companyOrAgency.toLowerCase().includes(q))
      );
    });

  const statusColors: Record<LeadInquiry['status'], string> = {
    New: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    Contacted: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
    'Viewing Scheduled': 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    'Offer Submitted': 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    Closed: 'bg-stone-800 text-stone-400 border-stone-700',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 p-5 sm:p-7 rounded-2xl shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Inbox className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-semibold uppercase text-amber-400">
                CRM Leads & Inquiry Pipeline
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Inquiries, Buyer Registrations & Co-Broker Deals
            </h2>
            <p className="text-xs text-stone-400 mt-1 max-w-xl">
              Track incoming leads from the public portal and authenticated co-brokers. Route directly to WhatsApp or schedule VIP private viewings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold">
              {leads.filter((l) => l.status === 'New').length} New Uncontacted Leads
            </span>
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs flex-wrap">
          {(['All', 'New', 'Contacted', 'Viewing Scheduled', 'Offer Submitted', 'Closed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-stone-800 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Inquirer Type Dropdown & Search */}
        <div className="flex items-center gap-2">
          <select
            value={inquirerFilter}
            onChange={(e) => setInquirerFilter(e.target.value as any)}
            className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
          >
            <option value="all">All Inquirers</option>
            <option value="buyer">Buyers Only</option>
            <option value="tenant">Tenants Only</option>
            <option value="broker">Co-Brokers Only</option>
          </select>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, property, agency..."
            className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-3">
        {filteredLeads.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-stone-900/50 border border-stone-800 text-stone-400">
            <Inbox className="w-8 h-8 mx-auto mb-2 text-stone-600" />
            <p className="text-sm">No inquiries matching filter.</p>
          </div>
        ) : (
          filteredLeads.map((lead) => {
            const replyMsg = `Hi ${lead.name}, thank you for inquiring about "${lead.propertyTitle}" via EstatePulse AI. I'm pleased to share the requested details and arrange a viewing.`;

            return (
              <div
                key={lead.id}
                className="p-4 sm:p-5 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-white">{lead.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-stone-800 text-stone-300">
                      {lead.inquirerType === 'broker' ? 'Co-Broker Agent' : lead.inquirerType}
                    </span>
                    {lead.companyOrAgency && (
                      <span className="text-sky-400 font-medium text-[11px]">
                        ({lead.companyOrAgency} · {lead.brokerLicense || 'Reg'})
                      </span>
                    )}
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                        statusColors[lead.status]
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>

                  <p className="text-stone-300 font-medium">
                    Property: <strong className="text-amber-400">{lead.propertyTitle}</strong>
                  </p>

                  <p className="text-stone-300 bg-stone-950 p-2.5 rounded-lg border border-stone-800/80 italic">
                    "{lead.message}"
                  </p>

                  <div className="flex items-center gap-4 text-stone-400 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-stone-500" />
                      {lead.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-stone-500" />
                      {lead.phone}
                    </span>
                    {lead.budgetAED && (
                      <span className="text-stone-300">
                        Budget: {formatPrice(lead.budgetAED, currency)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Action Column */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <a
                      href={createWhatsAppUrl(lead.phone, replyMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Reply</span>
                    </a>
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={lead.status}
                    onChange={(e) => onUpdateStatus(lead.id, e.target.value as any)}
                    className="p-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-300 text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="New">Mark: New</option>
                    <option value="Contacted">Mark: Contacted</option>
                    <option value="Viewing Scheduled">Mark: Viewing Scheduled</option>
                    <option value="Offer Submitted">Mark: Offer Submitted</option>
                    <option value="Closed">Mark: Closed</option>
                  </select>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
