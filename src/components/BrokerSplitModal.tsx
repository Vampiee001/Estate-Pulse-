import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  DollarSign, 
  ShieldCheck, 
  UserCheck, 
  Building, 
  CheckCircle2, 
  FileText,
  Lock
} from 'lucide-react';
import { PropertyListing } from '../types/realestate';
import { Currency, formatPrice } from '../utils/helpers';

interface BrokerSplitModalProps {
  listing: PropertyListing | null;
  onClose: () => void;
  currency: Currency;
  onRegisterClient: (data: { clientName: string; clientPhone: string; brokerAgency: string }) => void;
}

export const BrokerSplitModal: React.FC<BrokerSplitModalProps> = ({
  listing,
  onClose,
  currency,
  onRegisterClient,
}) => {
  if (!listing) return null;

  const [totalCommissionPercent, setTotalCommissionPercent] = useState(listing.type === 'rent' ? 5.0 : 2.0);
  const [splitRatio, setSplitRatio] = useState(50); // 50/50 split
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [brokerAgency, setBrokerAgency] = useState('Apex Prime Realty');
  const [registered, setRegistered] = useState(false);

  // Commission Math
  const totalCommissionAED = (listing.priceAED * totalCommissionPercent) / 100;
  const externalBrokerShareAED = (totalCommissionAED * splitRatio) / 100;
  const listingAgencyShareAED = totalCommissionAED - externalBrokerShareAED;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;
    onRegisterClient({
      clientName,
      clientPhone,
      brokerAgency,
    });
    setRegistered(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div 
        className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl my-8 text-stone-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-stone-800 bg-stone-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Co-Broker Commission Split</h3>
              <p className="text-xs text-stone-400">50/50 Partner Agreement & Client Protection</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-5 text-xs">
          {/* Property Context */}
          <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
            <span className="text-stone-400 block text-[11px]">Selected Listing</span>
            <p className="text-sm font-bold text-white">{listing.title}</p>
            <div className="flex items-center justify-between mt-1 text-stone-300">
              <span>Price: <strong>{formatPrice(listing.priceAED, currency)}</strong></span>
              <span className="text-sky-400">{listing.displayUnit || 'High Floor Unit'}</span>
            </div>
          </div>

          {/* Calculator Sliders */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-stone-400 font-medium">Total Agency Commission Rate</label>
                <span className="text-amber-400 font-bold">{totalCommissionPercent}%</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="6.0"
                step="0.5"
                value={totalCommissionPercent}
                onChange={(e) => setTotalCommissionPercent(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500">
                <span>1% (Discounted)</span>
                <span>2% (Standard Sale)</span>
                <span>5% (Annual Rent)</span>
              </div>
            </div>

            {/* Commission Split Result Cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/60 text-sky-200">
                <span className="text-[11px] text-sky-400 block font-medium">Your Broker Commission (50%)</span>
                <p className="text-lg sm:text-xl font-bold text-sky-300 mt-1">
                  {formatPrice(externalBrokerShareAED, currency)}
                </p>
                <span className="text-[10px] text-stone-400">Guaranteed upon deal closing</span>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-300">
                <span className="text-[11px] text-stone-400 block font-medium">Listing Agency Share (50%)</span>
                <p className="text-lg sm:text-xl font-bold text-white mt-1">
                  {formatPrice(listingAgencyShareAED, currency)}
                </p>
                <span className="text-[10px] text-stone-500">EstatePulse AI Primary Office</span>
              </div>
            </div>
          </div>

          {/* Lock In Buyer Client Registration Form */}
          <div className="pt-3 border-t border-stone-800">
            <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              Lock-In Client Protection Registration
            </h4>

            {registered ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                <p className="font-semibold text-white">Client Successfully Registered!</p>
                <p className="text-[11px] text-stone-300">
                  Buyer "{clientName}" is timestamped to {brokerAgency} for 90 days. Commission split protected.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-stone-400 block mb-1">Prospective Buyer Name</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. David Vance"
                      className="w-full p-2 rounded bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-stone-400 block mb-1">Buyer Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+971 50 111 2222"
                      className="w-full p-2 rounded bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-stone-400 block mb-1">Your Brokerage Company</label>
                  <input
                    type="text"
                    required
                    value={brokerAgency}
                    onChange={(e) => setBrokerAgency(e.target.value)}
                    className="w-full p-2 rounded bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold transition-colors shadow-md shadow-sky-600/20"
                >
                  Register Client & Protect 50/50 Commission
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-stone-800 bg-stone-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  );
};
