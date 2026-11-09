import React from 'react';
import { 
  Building2, 
  Sparkles, 
  Lock, 
  Inbox, 
  Wifi, 
  Battery, 
  Signal, 
  X,
  Search
} from 'lucide-react';
import { UserRole } from '../types/realestate';

interface MobileShellProps {
  children: React.ReactNode;
  onClose: () => void;
  currentTab: 'marketplace' | 'ai-studio' | 'vault' | 'leads';
  setCurrentTab: (tab: 'marketplace' | 'ai-studio' | 'vault' | 'leads') => void;
  userRole: UserRole;
  vaultAlertsCount: number;
}

export const MobileShell: React.FC<MobileShellProps> = ({
  children,
  onClose,
  currentTab,
  setCurrentTab,
  userRole,
  vaultAlertsCount,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      {/* Outer Phone Device Frame */}
      <div className="relative w-full max-w-[420px] h-[860px] max-h-[96vh] bg-stone-950 border-[10px] border-stone-800 rounded-[50px] shadow-2xl overflow-hidden flex flex-col ring-1 ring-stone-700">
        {/* Device Top Speaker Notch / Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50 flex items-center justify-end px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800 mr-1" />
          <div className="w-2.5 h-2.5 rounded-full bg-sky-950/80 border border-sky-800/40" />
        </div>

        {/* Exit Simulator Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-1.5 rounded-full bg-stone-900/80 text-stone-400 hover:text-white"
          title="Exit Mobile Shell Mode"
        >
          <X className="w-4 h-4" />
        </button>

        {/* iOS Native Status Bar */}
        <div className="pt-3 px-6 pb-1 bg-stone-950 text-stone-300 flex items-center justify-between text-[11px] font-semibold shrink-0 z-40 select-none">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 text-stone-300">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Mobile Viewport Scroll Container */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-stone-950 text-stone-100 pb-16">
          {children}
        </div>

        {/* Mobile Bottom Navigation Bar (iOS Tab Bar) */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-stone-900/95 backdrop-blur-lg border-t border-stone-800/80 px-4 flex items-center justify-around z-40 select-none">
          <button
            onClick={() => setCurrentTab('marketplace')}
            className={`flex flex-col items-center justify-center gap-1 py-1 transition-colors ${
              currentTab === 'marketplace' ? 'text-amber-400' : 'text-stone-400'
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span className="text-[10px] font-medium">Browse</span>
          </button>

          <button
            onClick={() => setCurrentTab('ai-studio')}
            className={`flex flex-col items-center justify-center gap-1 py-1 transition-colors ${
              currentTab === 'ai-studio' ? 'text-amber-400' : 'text-stone-400'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px] font-medium">AI Ingest</span>
          </button>

          {userRole === 'admin' && (
            <button
              onClick={() => setCurrentTab('vault')}
              className={`flex flex-col items-center justify-center gap-1 py-1 transition-colors relative ${
                currentTab === 'vault' ? 'text-amber-400' : 'text-stone-400'
              }`}
            >
              <Lock className="w-5 h-5" />
              <span className="text-[10px] font-medium">CRM Vault</span>
              {vaultAlertsCount > 0 && (
                <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-rose-500" />
              )}
            </button>
          )}

          {userRole !== 'public' && (
            <button
              onClick={() => setCurrentTab('leads')}
              className={`flex flex-col items-center justify-center gap-1 py-1 transition-colors ${
                currentTab === 'leads' ? 'text-amber-400' : 'text-stone-400'
              }`}
            >
              <Inbox className="w-5 h-5" />
              <span className="text-[10px] font-medium">Leads</span>
            </button>
          )}
        </div>

        {/* Home Indicator Bar */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-stone-600 rounded-full z-50 pointer-events-none" />
      </div>
    </div>
  );
};
