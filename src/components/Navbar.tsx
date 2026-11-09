import React from 'react';
import { 
  Building2, 
  Sparkles, 
  Lock, 
  Inbox, 
  Smartphone, 
  Monitor, 
  ShieldCheck, 
  Eye, 
  ChevronDown,
  PlusCircle,
  FileText
} from 'lucide-react';
import { UserRole } from '../types/realestate';
import { Currency } from '../utils/helpers';

interface NavbarProps {
  currentTab: 'marketplace' | 'ai-studio' | 'vault' | 'leads';
  setCurrentTab: (tab: 'marketplace' | 'ai-studio' | 'vault' | 'leads') => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  isMobileShell: boolean;
  setIsMobileShell: (val: boolean) => void;
  openOffPlanModal: () => void;
  openQuickUploadModal: () => void;
  vaultAlertsCount: number;
  newLeadsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  setUserRole,
  currency,
  setCurrency,
  isMobileShell,
  setIsMobileShell,
  openOffPlanModal,
  openQuickUploadModal,
  vaultAlertsCount,
  newLeadsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900 border-b border-stone-800 text-stone-100">
      {/* Top Notification / Role Context Banner */}
      <div className="bg-stone-950 px-4 py-1.5 text-xs border-b border-stone-800/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 font-medium">
            {userRole === 'admin' && (
              <span className="flex items-center gap-1 text-amber-400">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Main Admin / Owner View (Full Access to Private CRM Vault & Unmasked Unit Numbers)
              </span>
            )}
            {userRole === 'broker' && (
              <span className="flex items-center gap-1 text-sky-400">
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                External Broker Mode (Sensitive Owner Contacts & Exact Unit Numbers Automatically Masked)
              </span>
            )}
            {userRole === 'public' && (
              <span className="flex items-center gap-1 text-stone-400">
                <Eye className="w-3.5 h-3.5 text-stone-400" />
                Public Visitor Perspective (Search listings, request viewings, instant WhatsApp triggers)
              </span>
            )}
          </span>
        </div>

        {/* Quick Role Switcher Buttons */}
        <div className="flex items-center gap-1 bg-stone-900 rounded-md p-0.5 border border-stone-800 text-xs">
          <span className="text-stone-400 px-2 py-0.5 text-[11px] font-medium hidden sm:inline">Role:</span>
          <button
            onClick={() => setUserRole('admin')}
            className={`px-2.5 py-1 rounded transition-colors text-xs font-medium ${
              userRole === 'admin'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            Main Admin
          </button>
          <button
            onClick={() => {
              setUserRole('broker');
              if (currentTab === 'vault') setCurrentTab('marketplace');
            }}
            className={`px-2.5 py-1 rounded transition-colors text-xs font-medium ${
              userRole === 'broker'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            External Broker
          </button>
          <button
            onClick={() => {
              setUserRole('public');
              if (currentTab === 'vault') setCurrentTab('marketplace');
            }}
            className={`px-2.5 py-1 rounded transition-colors text-xs font-medium ${
              userRole === 'public'
                ? 'bg-stone-700 text-white shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            Public Visitor
          </button>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentTab('marketplace')} 
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 font-bold shadow-md shadow-amber-500/10">
                <Building2 className="w-5 h-5 text-stone-950" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  EstatePulse <span className="text-amber-400 text-xs px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">AI</span>
                </span>
                <p className="text-[11px] text-stone-400 font-normal">Luxury Real Estate & Ingestion Hub</p>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-950/60 p-1 rounded-lg border border-stone-800/80">
            <button
              onClick={() => setCurrentTab('marketplace')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                currentTab === 'marketplace'
                  ? 'bg-stone-800 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              Marketplace
            </button>

            <button
              onClick={() => setCurrentTab('ai-studio')}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                currentTab === 'ai-studio'
                  ? 'bg-stone-800 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              AI Ingestion Studio
            </button>

            {/* Direct-to-Owner Vault tab (Admin Only) */}
            {userRole === 'admin' ? (
              <button
                onClick={() => setCurrentTab('vault')}
                className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 relative ${
                  currentTab === 'vault'
                    ? 'bg-stone-800 text-white shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-900'
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Owner CRM Vault
                {vaultAlertsCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-rose-500 text-white rounded-full font-bold">
                    {vaultAlertsCount}
                  </span>
                )}
              </button>
            ) : (
              <span className="px-3 py-2 text-xs text-stone-500 flex items-center gap-1.5 cursor-not-allowed opacity-60" title="Confidential - Switch to Admin role to view">
                <Lock className="w-3.5 h-3.5 text-stone-500" />
                CRM Vault (Locked)
              </span>
            )}

            {/* Leads Inbox (Admin & Broker) */}
            {userRole !== 'public' && (
              <button
                onClick={() => setCurrentTab('leads')}
                className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 relative ${
                  currentTab === 'leads'
                    ? 'bg-stone-800 text-white shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-900'
                }`}
              >
                <Inbox className="w-3.5 h-3.5 text-amber-400" />
                Inquiries & Leads
                {newLeadsCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-amber-500 text-stone-950 rounded-full font-bold">
                    {newLeadsCount}
                  </span>
                )}
              </button>
            )}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Selector */}
            <div className="flex items-center bg-stone-950 border border-stone-800 rounded-md px-2 py-1 text-xs">
              <span className="text-stone-400 mr-1.5 font-medium">Curr:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="bg-transparent text-amber-400 font-semibold focus:outline-none cursor-pointer text-xs"
              >
                <option value="AED" className="bg-stone-900 text-stone-100">AED (د.إ)</option>
                <option value="USD" className="bg-stone-900 text-stone-100">USD ($)</option>
                <option value="EUR" className="bg-stone-900 text-stone-100">EUR (€)</option>
                <option value="GBP" className="bg-stone-900 text-stone-100">GBP (£)</option>
              </select>
            </div>

            {/* Mobile App Simulator Toggle */}
            <button
              onClick={() => setIsMobileShell(!isMobileShell)}
              className={`p-2 rounded-md border text-xs font-medium transition-colors flex items-center gap-1.5 ${
                isMobileShell
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-stone-950 text-stone-300 border-stone-800 hover:bg-stone-850'
              }`}
              title="Toggle Mobile App Shell (iOS/Android) Preview"
            >
              {isMobileShell ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
              <span className="hidden lg:inline text-xs">
                {isMobileShell ? 'Desktop View' : 'Mobile App Shell'}
              </span>
            </button>

            {/* Quick Actions (Admin Only) */}
            {userRole === 'admin' && (
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  onClick={openOffPlanModal}
                  className="px-3 py-1.5 rounded-md bg-amber-500 text-stone-950 text-xs font-semibold hover:bg-amber-400 transition-colors flex items-center gap-1 shadow-sm shadow-amber-500/20"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>PDF Auto-Lister</span>
                </button>
                <button
                  onClick={openQuickUploadModal}
                  className="px-3 py-1.5 rounded-md bg-stone-800 text-stone-100 text-xs font-medium hover:bg-stone-700 border border-stone-700 transition-colors flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Quick-Upload</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-stone-800 text-xs">
          <button
            onClick={() => setCurrentTab('marketplace')}
            className={`py-1 px-2 font-medium ${
              currentTab === 'marketplace' ? 'text-amber-400 font-semibold' : 'text-stone-400'
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => setCurrentTab('ai-studio')}
            className={`py-1 px-2 font-medium ${
              currentTab === 'ai-studio' ? 'text-amber-400 font-semibold' : 'text-stone-400'
            }`}
          >
            AI Ingest
          </button>
          {userRole === 'admin' && (
            <button
              onClick={() => setCurrentTab('vault')}
              className={`py-1 px-2 font-medium relative ${
                currentTab === 'vault' ? 'text-amber-400 font-semibold' : 'text-stone-400'
              }`}
            >
              Owner Vault
              {vaultAlertsCount > 0 && (
                <span className="ml-1 px-1 text-[9px] bg-rose-500 text-white rounded-full">
                  {vaultAlertsCount}
                </span>
              )}
            </button>
          )}
          {userRole !== 'public' && (
            <button
              onClick={() => setCurrentTab('leads')}
              className={`py-1 px-2 font-medium relative ${
                currentTab === 'leads' ? 'text-amber-400 font-semibold' : 'text-stone-400'
              }`}
            >
              Leads
              {newLeadsCount > 0 && (
                <span className="ml-1 px-1 text-[9px] bg-amber-400 text-stone-950 rounded-full">
                  {newLeadsCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
