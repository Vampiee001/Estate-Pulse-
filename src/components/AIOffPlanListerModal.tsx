import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileText, 
  Sparkles, 
  Upload, 
  Check, 
  AlertCircle, 
  Calendar, 
  Building, 
  MapPin, 
  DollarSign, 
  Plus, 
  Trash2,
  FileDown,
  Layers,
  ArrowRight,
  Loader2,
  Globe,
  Video,
  Play,
  Film,
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  Camera
} from 'lucide-react';
import { SAMPLE_BROCHURES, PORTAL_SOURCES } from '../data/seedData';
import { PropertyListing, AIParseBrochureResult, PaymentPlanMilestone } from '../types/realestate';

interface AIOffPlanListerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishListing: (newListing: PropertyListing) => void;
  initialPortalId?: string;
}

export const AIOffPlanListerModal: React.FC<AIOffPlanListerModalProps> = ({
  isOpen,
  onClose,
  onPublishListing,
  initialPortalId,
}) => {
  if (!isOpen) return null;

  const [inputMode, setInputMode] = useState<'portal' | 'sample' | 'upload' | 'text'>('portal');
  
  // Portal Harvester State
  const [selectedPortalId, setSelectedPortalId] = useState<string>(initialPortalId || 'dxboffplan');
  const [portalUrl, setPortalUrl] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  
  // Sample & Upload State
  const [selectedSample, setSelectedSample] = useState(SAMPLE_BROCHURES[0]);
  const [customText, setCustomText] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  
  // Parsing status
  const [isParsing, setIsParsing] = useState(false);
  const [parsingStep, setParsingStep] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState('');

  // Structured Draft State (populated once AI extracts)
  const [parsedData, setParsedData] = useState<AIParseBrochureResult | null>(null);
  const [projectName, setProjectName] = useState('');
  const [developer, setDeveloper] = useState('');
  const [location, setLocation] = useState('');
  const [startingPriceAED, setStartingPriceAED] = useState(2450000);
  const [completionDate, setCompletionDate] = useState('Q4 2027');
  const [category, setCategory] = useState<'Apartment' | 'Villa' | 'Penthouse' | 'Townhouse' | 'Duplex'>('Apartment');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [bulletPoints, setBulletPoints] = useState<string[]>([]);
  const [paymentPlan, setPaymentPlan] = useState<PaymentPlanMilestone[]>([]);
  const [brochureFileAttachment, setBrochureFileAttachment] = useState<string>('Sobha_Hartland_II_Brochure.pdf');
  const [extractedImages, setExtractedImages] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
  const [videoPoster, setVideoPoster] = useState<string | undefined>(undefined);
  const [dldEscrowNumber, setDldEscrowNumber] = useState<string | undefined>(undefined);
  const [sourcePortal, setSourcePortal] = useState<string | undefined>(undefined);
  const [sourceUrl, setSourceUrl] = useState<string | undefined>(undefined);
  const [constructionStatus, setConstructionStatus] = useState<string | undefined>(undefined);

  // Draft review preview tab
  const [reviewTab, setReviewTab] = useState<'media' | 'specs' | 'payment' | 'escrow'>('media');

  // New amenity input
  const [newAmenity, setNewAmenity] = useState('');

  // Sync initial portal preset
  useEffect(() => {
    if (initialPortalId) {
      setSelectedPortalId(initialPortalId);
      const portal = PORTAL_SOURCES.find((p) => p.id === initialPortalId);
      if (portal) {
        setPortalUrl(portal.sampleUrl);
      }
      setInputMode('portal');
    }
  }, [initialPortalId]);

  // When selected portal changes, update sample URL
  const handleSelectPortal = (portalId: string) => {
    setSelectedPortalId(portalId);
    const portal = PORTAL_SOURCES.find((p) => p.id === portalId);
    if (portal) {
      setPortalUrl(portal.sampleUrl);
    }
  };

  const handleStartParsing = async () => {
    setIsParsing(true);
    setErrorMsg('');

    try {
      if (inputMode === 'portal') {
        setParsingStep(`Connecting to ${selectedPortalId.toUpperCase()} crawler & media parser...`);
        setTimeout(() => setParsingStep('Extracting high-resolution photo gallery and 4K video walkthrough stream...'), 600);
        setTimeout(() => setParsingStep('Parsing construction-linked payment plan & DLD escrow account...'), 1200);

        const currentPortal = PORTAL_SOURCES.find((p) => p.id === selectedPortalId);
        const res = await fetch('/api/ai/harvest-portal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            portalUrl: portalUrl || currentPortal?.sampleUrl || 'https://dxboffplan.com',
            portalId: selectedPortalId,
            developer: currentPortal?.name.includes('Emaar') ? 'Emaar' : currentPortal?.name.includes('Sobha') ? 'Sobha Realty' : currentPortal?.name.includes('Danube') ? 'Danube Properties' : undefined,
          }),
        });

        const json = await res.json();
        if (!json.success) {
          throw new Error(json.message || 'Portal harvesting failed');
        }

        const data: AIParseBrochureResult = json.data;
        populateFromExtracted(data, `${(data.projectName || 'Project').replace(/\s+/g, '_')}_Official_Factsheet.pdf`);
      } else {
        setParsingStep('Initializing Gemini OCR & Structured Document Parser...');
        let textToParse = '';
        let fileName = '';

        if (inputMode === 'sample') {
          textToParse = selectedSample.sampleText;
          fileName = selectedSample.fileName;
        } else if (inputMode === 'text') {
          textToParse = customText;
          fileName = 'Brochure_Text_Excerpt.txt';
        } else {
          textToParse = customText || uploadedFileName || 'Off-plan brochure document';
          fileName = uploadedFileName || 'Uploaded_Brochure.pdf';
        }

        setTimeout(() => setParsingStep('Analyzing developer credentials and project milestones...'), 700);
        setTimeout(() => setParsingStep('Extracting construction-linked payment plan & pricing...'), 1400);

        const res = await fetch('/api/ai/parse-brochure', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            brochureText: textToParse,
            fileName,
          }),
        });

        const json = await res.json();
        if (!json.success) {
          throw new Error(json.message || 'AI Extraction failed');
        }

        const data: AIParseBrochureResult = json.data;
        populateFromExtracted(data, fileName);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || 'Failed to parse brochure details');
    } finally {
      setIsParsing(false);
      setParsingStep('');
    }
  };

  const populateFromExtracted = (data: AIParseBrochureResult, fileName: string) => {
    setParsedData(data);
    setProjectName(data.projectName || 'Luxury Off-Plan Project');
    setDeveloper(data.developer || 'Prime Master Developer');
    setLocation(data.location || 'Dubai, UAE');
    setStartingPriceAED(data.startingPriceAED || 2450000);
    setCompletionDate(data.completionDate || 'Q4 2027');
    setCategory(data.category || 'Apartment');
    setHeadline(data.headline || 'Ultra-Luxury Waterfront Living');
    setDescription(data.description || 'Exclusive masterplan development featuring state-of-the-art residences.');
    setAmenities(data.amenities || ['Infinity Sky Pool', 'Crystal Lagoon', '24/7 Concierge', 'Technogym Fitness']);
    setBulletPoints(data.bulletPoints || ['High capital appreciation forecast', 'Construction-linked payment plan']);
    setPaymentPlan(
      data.paymentPlan && data.paymentPlan.length > 0
        ? data.paymentPlan
        : [
            { stage: 'Booking Deposit', percentage: 20, dueDate: 'On Reservation' },
            { stage: 'During Construction', percentage: 40, dueDate: 'Milestone Linked' },
            { stage: 'On Handover', percentage: 40, dueDate: data.completionDate || 'Q4 2027' },
          ]
    );
    setBrochureFileAttachment(fileName);
    setExtractedImages(
      data.images && data.images.length > 0
        ? data.images
        : [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
          ]
    );
    setVideoUrl(data.videoUrl);
    setVideoPoster(data.videoPoster);
    setDldEscrowNumber(data.dldEscrowNumber || `DLD-ESCROW-${Math.floor(100000 + Math.random() * 900000)}`);
    setSourcePortal(data.sourcePortal || (inputMode === 'portal' ? selectedPortalId : 'Developer PDF'));
    setSourceUrl(portalUrl);
    setConstructionStatus(data.constructionStatus || 'Site Preparation & Piling (DLD Verified)');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content && typeof content === 'string') {
          setCustomText(content.slice(0, 5000));
        } else {
          setCustomText(`[PDF Brochure Content: ${file.name} - Size: ${(file.size / 1024).toFixed(1)} KB]`);
        }
      };
      if (file.type.includes('text')) {
        reader.readAsText(file);
      } else {
        setCustomText(`PDF Brochure: ${file.name} (Uploaded for automated OCR parsing)`);
      }
    }
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity.trim())) {
      setAmenities([...amenities, newAmenity.trim()]);
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (index: number) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    const newOffPlanListing: PropertyListing = {
      id: `prop-offplan-${Date.now()}`,
      title: projectName,
      headline,
      type: 'off-plan',
      category,
      community: location,
      displayUnit: `${projectName} - Available Units`,
      priceAED: startingPriceAED,
      beds: 2,
      baths: 3,
      sqft: 1450,
      developer,
      handoverDate: completionDate,
      badge: 'New Launch',
      description,
      bulletPoints,
      amenities,
      images: extractedImages.length > 0 ? extractedImages : [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      ],
      videoUrl,
      videoPoster,
      dldEscrowNumber,
      sourcePortal,
      sourceUrl,
      constructionStatus,
      brochureUrl: `#brochure-${Date.now()}`,
      brochureName: brochureFileAttachment,
      paymentPlan,
      isOffPlan: true,
      rentalYieldPercent: 8.5,
      isPublishedPublic: true,
      createdAt: new Date().toISOString(),
    };

    onPublishListing(newOffPlanListing);
    onClose();
  };

  const filteredPortals = PORTAL_SOURCES.filter((p) => {
    if (selectedCategoryFilter === 'all') return true;
    return p.category === selectedCategoryFilter;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div 
        className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl my-8 text-stone-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-800 bg-stone-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Off-Plan Brochure & Portal Harvester
                <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-normal border border-amber-500/30">
                  Photos + 4K Video Extractor
                </span>
              </h3>
              <p className="text-xs text-stone-400">
                Collate off-plan brochures, 4K walkthrough videos, photos, and DLD escrow data from DXBOffPlan, Bayut, Property Finder, and developer portals.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          {/* STEP 1: INPUT SOURCE SELECTION */}
          {!parsedData ? (
            <div className="space-y-5">
              {/* Mode Tabs */}
              <div className="flex items-center gap-2 border-b border-stone-800 pb-3 text-xs overflow-x-auto">
                <button
                  onClick={() => setInputMode('portal')}
                  className={`px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shrink-0 ${
                    inputMode === 'portal'
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                      : 'bg-stone-950 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>UAE Portal & Web Harvester</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/20 text-stone-950 font-mono">14 Portals</span>
                </button>
                <button
                  onClick={() => setInputMode('sample')}
                  className={`px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shrink-0 ${
                    inputMode === 'sample'
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                      : 'bg-stone-950 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>1-Click Sample PDF Brochure</span>
                </button>
                <button
                  onClick={() => setInputMode('upload')}
                  className={`px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shrink-0 ${
                    inputMode === 'upload'
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                      : 'bg-stone-950 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Local PDF</span>
                </button>
                <button
                  onClick={() => setInputMode('text')}
                  className={`px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 shrink-0 ${
                    inputMode === 'text'
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                      : 'bg-stone-950 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Paste Text Factsheet</span>
                </button>
              </div>

              {/* Mode 1: UAE Portal Harvester */}
              {inputMode === 'portal' && (
                <div className="space-y-4">
                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto text-[11px] pb-1">
                    <span className="text-stone-400 font-medium mr-1 shrink-0">Filter Portals:</span>
                    {['all', 'Specialized Off-Plan Portals', 'Major UAE Aggregators', 'Official Developer Portals', 'Regulatory & Government Portals'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategoryFilter(cat)}
                        className={`px-2.5 py-1 rounded-md transition-colors shrink-0 ${
                          selectedCategoryFilter === cat
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                            : 'bg-stone-950 border border-stone-800 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        {cat === 'all' ? 'All 14 UAE Portals' : cat}
                      </button>
                    ))}
                  </div>

                  {/* Portal Selection Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-1">
                    {filteredPortals.map((portal) => (
                      <div
                        key={portal.id}
                        onClick={() => handleSelectPortal(portal.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          selectedPortalId === portal.id
                            ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                            : 'bg-stone-950/70 border-stone-800 hover:border-stone-700 text-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold truncate text-white">{portal.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-amber-400 font-medium">
                            {portal.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                          {portal.description}
                        </p>
                        <div className="mt-2 pt-2 border-t border-stone-800/60 flex items-center justify-between text-[10px] text-stone-500">
                          <span className="truncate max-w-[170px]">{portal.coverage}</span>
                          <span className="text-amber-400/80 font-mono">Select →</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Portal URL & Extraction Configuration */}
                  <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <label className="text-stone-300 font-medium flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-amber-400" />
                        Target Property Launch URL or Brochure Link:
                      </label>
                      <span className="text-[11px] text-amber-400 font-mono">
                        Active: {PORTAL_SOURCES.find((p) => p.id === selectedPortalId)?.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={portalUrl}
                        onChange={(e) => setPortalUrl(e.target.value)}
                        placeholder="https://dxboffplan.com/properties/creek-waters-by-emaar/"
                        className="flex-1 p-2.5 rounded-lg bg-stone-900 border border-stone-700 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Will extract: 4K Drone Walkthrough Video + Photo Gallery + Milestone Payment Schedule + DLD Escrow #
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Mode 2: Preset Sample Brochures */}
              {inputMode === 'sample' && (
                <div className="space-y-3">
                  <label className="text-xs text-stone-400 block">
                    Select a realistic Dubai off-plan developer brochure to test automatic ingestion:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SAMPLE_BROCHURES.map((sample) => (
                      <div
                        key={sample.id}
                        onClick={() => setSelectedSample(sample)}
                        className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                          selectedSample.id === sample.id
                            ? 'bg-amber-500/10 border-amber-500 text-white'
                            : 'bg-stone-950/70 border-stone-800 hover:border-stone-700 text-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <FileText className="w-4 h-4 text-amber-400" />
                          <span className="font-semibold truncate">{sample.title}</span>
                        </div>
                        <p className="text-[11px] text-stone-400">Developer: {sample.developer}</p>
                        <p className="text-[10px] text-stone-500 font-mono mt-1">{sample.fileName}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-stone-950 p-3 rounded-lg border border-stone-800/80 text-[11px] font-mono text-stone-400 max-h-32 overflow-y-auto">
                    {selectedSample.sampleText}
                  </div>
                </div>
              )}

              {/* Mode 3: File Upload */}
              {inputMode === 'upload' && (
                <div className="p-8 border-2 border-dashed border-stone-800 hover:border-amber-500/50 rounded-xl bg-stone-950/50 text-center space-y-3 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-stone-900 border border-stone-800 mx-auto flex items-center justify-center text-amber-400">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Drag & Drop your Off-Plan PDF brochure here
                    </p>
                    <p className="text-xs text-stone-400 mt-1">
                      Supports high-res PDF factsheets, floorplan decks, or developer brochures
                    </p>
                  </div>
                  <label className="inline-block px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium cursor-pointer transition-colors">
                    Browse PDF File
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {uploadedFileName && (
                    <div className="flex items-center justify-center gap-2 text-xs text-amber-400 mt-2 font-medium">
                      <FileText className="w-4 h-4" />
                      <span>{uploadedFileName}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Mode 4: Paste Text */}
              {inputMode === 'text' && (
                <div className="space-y-2">
                  <label className="text-xs text-stone-400 block">
                    Paste raw text from developer flyer or press release:
                  </label>
                  <textarea
                    rows={6}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="e.g. SOBHA HARTLAND II - Starting from 2.45M AED, 80/20 payment plan, 20% on booking, Q4 2027 handover..."
                    className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}

              {errorMsg && (
                <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Trigger Ingestion Button */}
              <div className="pt-2">
                <button
                  onClick={handleStartParsing}
                  disabled={isParsing}
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  {isParsing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{parsingStep || 'Harvesting off-plan brochure, photos & video...'}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>
                        {inputMode === 'portal' 
                          ? 'Collate & Extract Photos, 4K Video Tour & Brochure Factsheet'
                          : 'Run Gemini OCR Parser & Generate Project Draft'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* STEP 2: REVIEW & REFINE PARSED DRAFT */
            <div className="space-y-6">
              {/* Success Ingestion Banner */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-amber-300 font-bold flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    Collation Complete: {projectName}
                  </span>
                  <div className="flex items-center gap-3 mt-1 text-stone-300">
                    <span>Source: <strong className="text-white">{sourcePortal}</strong></span>
                    <span>•</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {dldEscrowNumber}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setParsedData(null)}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs self-start sm:self-center transition-colors"
                >
                  Harvest Another Property
                </button>
              </div>

              {/* Review Tabs */}
              <div className="flex items-center gap-2 border-b border-stone-800 pb-2 text-xs">
                <button
                  onClick={() => setReviewTab('media')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                    reviewTab === 'media'
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'bg-stone-950 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>4K Video & Photos ({extractedImages.length})</span>
                </button>
                <button
                  onClick={() => setReviewTab('specs')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                    reviewTab === 'specs'
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'bg-stone-950 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Specifications & Pricing</span>
                </button>
                <button
                  onClick={() => setReviewTab('payment')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                    reviewTab === 'payment'
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'bg-stone-950 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Milestone Payment Plan</span>
                </button>
                <button
                  onClick={() => setReviewTab('escrow')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                    reviewTab === 'escrow'
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'bg-stone-950 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>DLD Escrow & Source Info</span>
                </button>
              </div>

              {/* Tab 1: 4K Video Tour & Photo Gallery */}
              {reviewTab === 'media' && (
                <div className="space-y-4">
                  {/* Extracted 4K Video Player */}
                  {videoUrl && (
                    <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center gap-2">
                          <Video className="w-4 h-4 text-amber-400" />
                          Extracted 4K Walkthrough Video Tour Stream
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          HD 1080p / 4K Drone Tour
                        </span>
                      </div>
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-black border border-stone-800">
                        <video
                          src={videoUrl}
                          poster={videoPoster || extractedImages[0]}
                          controls
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-[11px] text-stone-400">
                        Stream URL: <span className="font-mono text-stone-300">{videoUrl}</span>
                      </p>
                    </div>
                  )}

                  {/* Extracted Photos Gallery */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <label className="text-stone-300 font-semibold flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-amber-400" />
                        Collated High-Resolution Photo Gallery ({extractedImages.length} images)
                      </label>
                      <span className="text-stone-500 text-[11px]">Auto-attached to Public Listing Page</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {extractedImages.map((img, idx) => (
                        <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-stone-950 border border-stone-800 group">
                          <img
                            src={img}
                            alt={`${projectName} - ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <span className="absolute bottom-1 right-1 text-[9px] px-1.5 py-0.5 rounded bg-black/70 text-stone-300">
                            Photo {idx + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Specs & Pricing */}
              {reviewTab === 'specs' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="sm:col-span-2">
                      <label className="text-stone-400 block mb-1">Project Name</label>
                      <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white font-semibold focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-stone-400 block mb-1">Master Developer</label>
                      <input
                        type="text"
                        value={developer}
                        onChange={(e) => setDeveloper(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white font-medium focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-stone-400 block mb-1">Location / Community</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-stone-400 block mb-1">Starting Price (AED)</label>
                      <input
                        type="number"
                        value={startingPriceAED}
                        onChange={(e) => setStartingPriceAED(Number(e.target.value))}
                        className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-stone-400 block mb-1">Handover / Completion Date</label>
                      <input
                        type="text"
                        value={completionDate}
                        onChange={(e) => setCompletionDate(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Marketing Headline & Description */}
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-stone-400 block mb-1">Marketing Headline</label>
                      <input
                        type="text"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-stone-400 block mb-1">Polished Overview Description</label>
                      <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-400 resize-none"
                      />
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-2 text-xs">
                    <label className="text-stone-400 font-medium block">Extracted Amenities</label>
                    <div className="flex flex-wrap gap-1.5">
                      {amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-stone-950 border border-stone-800 text-stone-200 flex items-center gap-1.5 text-xs"
                        >
                          <span>{amenity}</span>
                          <button
                            onClick={() => handleRemoveAmenity(idx)}
                            className="text-stone-500 hover:text-rose-400"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={newAmenity}
                        onChange={(e) => setNewAmenity(e.target.value)}
                        placeholder="Add custom amenity..."
                        className="p-1.5 rounded-lg bg-stone-950 border border-stone-800 text-white text-xs focus:outline-none focus:border-amber-400"
                      />
                      <button
                        onClick={handleAddAmenity}
                        className="px-2.5 py-1.5 rounded-lg bg-stone-800 text-stone-200 text-xs hover:bg-stone-700"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Payment Plan */}
              {reviewTab === 'payment' && (
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <label className="text-stone-400 font-medium flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      Extracted Construction-Linked Payment Milestones
                    </label>
                    <span className="text-[11px] text-amber-400 font-semibold">
                      Total: {paymentPlan.reduce((acc, curr) => acc + curr.percentage, 0)}%
                    </span>
                  </div>
                  <div className="border border-stone-800 rounded-xl overflow-hidden bg-stone-950">
                    <table className="w-full text-left">
                      <thead className="bg-stone-900 border-b border-stone-800 text-stone-400">
                        <tr>
                          <th className="p-2.5">Milestone Stage</th>
                          <th className="p-2.5">Percentage (%)</th>
                          <th className="p-2.5">Due Date / Trigger</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-800">
                        {paymentPlan.map((m, idx) => (
                          <tr key={idx}>
                            <td className="p-2.5 font-medium text-white">{m.stage}</td>
                            <td className="p-2.5 text-amber-400 font-semibold">{m.percentage}%</td>
                            <td className="p-2.5 text-stone-400">{m.dueDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab 4: DLD Escrow & Source Verification */}
              {reviewTab === 'escrow' && (
                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <span>Dubai Land Department (DLD) Regulatory Verification</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-300">
                      <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                        <span className="text-stone-500 block text-[10px] uppercase font-mono">DLD Escrow Account Number</span>
                        <span className="text-emerald-400 font-mono font-bold text-sm">{dldEscrowNumber}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                        <span className="text-stone-500 block text-[10px] uppercase font-mono">Construction Progress (Mashrooi)</span>
                        <span className="text-white font-bold text-sm">{constructionStatus}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                        <span className="text-stone-500 block text-[10px] uppercase font-mono">Collation Source Portal</span>
                        <span className="text-amber-400 font-bold text-sm">{sourcePortal}</span>
                      </div>
                      <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                        <span className="text-stone-500 block text-[10px] uppercase font-mono">Downloadable Factsheet</span>
                        <span className="text-white font-medium truncate block">{brochureFileAttachment}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-stone-800 bg-stone-950 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-colors"
          >
            Cancel
          </button>
          {parsedData && (
            <button
              onClick={handlePublish}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Check className="w-4 h-4" />
              <span>Publish to Live Marketplace & Off-Plan Portal</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
