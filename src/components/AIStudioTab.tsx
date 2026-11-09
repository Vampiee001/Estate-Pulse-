import React, { useState } from 'react';
import { 
  Sparkles, 
  FileText, 
  Mic, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  FileDown, 
  TrendingUp, 
  Zap,
  Building2,
  Workflow,
  Globe,
  Video,
  ExternalLink,
  Search,
  Filter,
  Check,
  Building
} from 'lucide-react';
import { PORTAL_SOURCES } from '../data/seedData';

interface AIStudioTabProps {
  onOpenOffPlanModal: (portalId?: string) => void;
  onOpenQuickUploadModal: () => void;
}

export const AIStudioTab: React.FC<AIStudioTabProps> = ({
  onOpenOffPlanModal,
  onOpenQuickUploadModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchPortal, setSearchPortal] = useState<string>('');

  const categories = [
    'all',
    'Specialized Off-Plan Portals',
    'Major UAE Aggregators',
    'Official Developer Portals',
    'Regulatory & Government Portals'
  ];

  const filteredPortals = PORTAL_SOURCES.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = !searchPortal.trim() || 
      p.name.toLowerCase().includes(searchPortal.toLowerCase()) ||
      p.description.toLowerCase().includes(searchPortal.toLowerCase()) ||
      p.coverage.toLowerCase().includes(searchPortal.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Studio Hero Banner */}
      <div className="bg-stone-900 border border-stone-800 p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
              AI Multi-Portal Ingestion & Media Harvester
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Off-Plan Brochure & Media Collation Engine
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
            Directly collate off-plan brochures, 4K walkthrough videos, high-resolution photo galleries, construction-linked payment plans, and verified Dubai Land Department (DLD) escrow account numbers across UAE portals and master developers.
          </p>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-stone-800/80 text-xs">
            <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80">
              <span className="text-stone-400 block text-[11px]">Indexed Portals</span>
              <span className="text-lg font-bold text-amber-400 font-mono">14 UAE Platforms</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80">
              <span className="text-stone-400 block text-[11px]">Media Extractor</span>
              <span className="text-lg font-bold text-sky-400 font-mono">4K Video + Photos</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80">
              <span className="text-stone-400 block text-[11px]">DLD Escrow</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">100% Mashrooi Verified</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80">
              <span className="text-stone-400 block text-[11px]">Brochure Attachments</span>
              <span className="text-lg font-bold text-purple-400 font-mono">Auto PDF Linked</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: UAE PORTAL HARVESTER DIRECTORY */}
      <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-400" />
              Dubai & UAE Off-Plan Web Harvester
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Select any recognized UAE portal or developer to extract brochures, videos, photos, and project data with 1-click.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchPortal}
                onChange={(e) => setSearchPortal(e.target.value)}
                placeholder="Search portal or developer..."
                className="pl-8 pr-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-white focus:outline-none focus:border-amber-400 w-48 sm:w-56"
              />
            </div>
            <button
              onClick={() => onOpenOffPlanModal()}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Harvester</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg transition-colors shrink-0 text-xs font-medium ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                  : 'bg-stone-950 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              {cat === 'all' ? 'All 14 UAE Portals' : cat}
            </button>
          ))}
        </div>

        {/* Portals Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPortals.map((portal) => (
            <div
              key={portal.id}
              className="p-4 rounded-xl bg-stone-950 border border-stone-800/80 hover:border-amber-500/40 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      {portal.category.includes('Developer') ? (
                        <Building2 className="w-4 h-4" />
                      ) : portal.category.includes('Regulatory') ? (
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Globe className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                        {portal.name}
                      </h4>
                      <span className="text-[10px] text-stone-500">{portal.category}</span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium shrink-0">
                    {portal.badge}
                  </span>
                </div>

                <p className="text-[11px] text-stone-400 leading-relaxed">
                  {portal.description}
                </p>

                <div className="p-2 rounded bg-stone-900/60 border border-stone-800 text-[10px] text-stone-400 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 uppercase font-mono">Coverage:</span>
                    <span className="text-stone-300 font-medium">{portal.coverage}</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-500">
                    <span>Sample Feed:</span>
                    <a
                      href={portal.sampleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400/80 hover:text-amber-300 hover:underline flex items-center gap-0.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="truncate max-w-[140px] font-mono">{portal.sampleUrl.replace('https://', '')}</span>
                      <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-stone-900 flex items-center gap-2">
                <button
                  onClick={() => onOpenOffPlanModal(portal.id)}
                  className="w-full py-2 rounded-lg bg-stone-900 hover:bg-amber-500 text-stone-200 hover:text-stone-950 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border border-stone-800 hover:border-amber-500"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Harvest from {portal.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: THE TWO INGESTION WORKFLOW CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pipeline 1: Off-Plan PDF Auto-Lister */}
        <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all flex flex-col justify-between group shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-semibold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                Off-Plan Workflow
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                PDF Off-Plan Auto-Lister
              </h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Upload master developer brochures (Sobha, Emaar, DAMAC, Nakheel, Danube). The OCR & LLM extracts starting prices, completion dates, construction-linked payment plans, amenities, and attaches the downloadable brochure.
              </p>
            </div>

            {/* Pipeline Step Checklist */}
            <div className="space-y-2 pt-2 border-t border-stone-800/80 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Extracts Project Name, Developer, & Handover Date</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Structures milestone payment schedule (20% booking, milestone linked, 40% handover)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Attaches downloadable high-res PDF factsheet directly to live listing</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => onOpenOffPlanModal()}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
            >
              <span>Launch PDF Auto-Lister</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Pipeline 2: Secondary Market Quick-Upload */}
        <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Mic className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Secondary Market Workflow
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                Secondary Market Quick-Upload
              </h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Take photos on-site and dictate a 15-second voice memo. AI converts unstructured shorthand notes into a compelling, luxury property listing with ROI metrics.
              </p>
            </div>

            {/* Pipeline Step Checklist */}
            <div className="space-y-2 pt-2 border-t border-stone-800/80 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Parses raw text (e.g. "2 bed in Marina Gate, high floor, 1,200 sqft, owner wants 2.1M AED")</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Generates luxury headline & sales bullet points</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Applies automatic unit masking ("Unit 1804" → "High Floor, Tower 1")</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={onOpenQuickUploadModal}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
            >
              <span>Launch Quick-Upload Memo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 3: INGESTION & PRIVACY ARCHITECTURE */}
      <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <Workflow className="w-4 h-4 text-amber-400" />
          <span>Ingestion, Media Extraction & Privacy Architecture</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1">
            <span className="font-bold text-amber-400 block">1. Multi-Portal Crawler</span>
            <p className="text-stone-400">
              Direct ingestion pipelines for DXBOffPlan, Bayut, Property Finder, and official portals (Emaar, DAMAC, Danube, Binghatti).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1">
            <span className="font-bold text-sky-400 block">2. 4K Video & Photo Extraction</span>
            <p className="text-stone-400">
              Captures drone walkthrough streams, interior galleries, and factsheet specifications without losing media fidelity.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1">
            <span className="font-bold text-emerald-400 block">3. DLD Escrow & Milestones</span>
            <p className="text-stone-400">
              Validates project registration with DLD Mashrooi government tracker and normalizes construction-linked milestone percentages.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1">
            <span className="font-bold text-purple-400 block">4. RBAC Masking & 50/50 Split</span>
            <p className="text-stone-400">
              Private owner CRM details remain locked in the Admin Vault; brokers access verified listings with 50/50 commission split locks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
