import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Mic, 
  Image as ImageIcon, 
  Check, 
  AlertCircle, 
  Bed, 
  Bath, 
  Maximize2, 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Plus, 
  Loader2,
  Volume2
} from 'lucide-react';
import { SAMPLE_QUICK_NOTES } from '../data/seedData';
import { PropertyListing, AIQuickUploadResult } from '../types/realestate';

interface AISecondaryQuickUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishListing: (newListing: PropertyListing) => void;
}

export const AISecondaryQuickUploadModal: React.FC<AISecondaryQuickUploadModalProps> = ({
  isOpen,
  onClose,
  onPublishListing,
}) => {
  if (!isOpen) return null;

  const [rawNotes, setRawNotes] = useState(SAMPLE_QUICK_NOTES[0].text);
  const [photoUrls, setPhotoUrls] = useState<string[]>([
    'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
  ]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [isFormatting, setIsFormatting] = useState(false);
  const [isSimulatingVoice, setIsSimulatingVoice] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Structured Result from Gemini
  const [formattedResult, setFormattedResult] = useState<AIQuickUploadResult | null>(null);

  // Form Fields for review/edit
  const [title, setTitle] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [priceAED, setPriceAED] = useState(2100000);
  const [beds, setBeds] = useState(2);
  const [baths, setBaths] = useState(2);
  const [sqft, setSqft] = useState(1200);
  const [community, setCommunity] = useState('Dubai Marina');
  const [displayUnit, setDisplayUnit] = useState('Marina Gate, High Floor (Unit Masked)');
  const [rentalYieldPercent, setRentalYieldPercent] = useState(7.9);
  const [category, setCategory] = useState<'Apartment' | 'Villa' | 'Penthouse' | 'Townhouse'>('Apartment');
  const [bulletPoints, setBulletPoints] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);

  const handleSimulateVoiceTranscription = () => {
    setIsSimulatingVoice(true);
    setRawNotes('');
    
    const voiceSnippet = `2 bed in Marina Gate 1, high floor, 1,200 sqft, owner wants 2.1M AED cash or mortgage. Upgraded real oak parquet floors, full sunset marina view, vacant on transfer, high ROI potential over 8%.`;
    let i = 0;
    const interval = setInterval(() => {
      setRawNotes((prev) => prev + voiceSnippet.charAt(i));
      i++;
      if (i >= voiceSnippet.length) {
        clearInterval(interval);
        setIsSimulatingVoice(false);
      }
    }, 25);
  };

  const handleFormatListing = async () => {
    if (!rawNotes.trim()) {
      setErrorMsg('Please input property notes or voice transcription.');
      return;
    }

    setIsFormatting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/ai/quick-upload-secondary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawNotes,
          photoUrls,
        }),
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.message || 'AI Formatting failed');
      }

      const data: AIQuickUploadResult = json.data;
      setFormattedResult(data);
      setTitle(data.title || 'Secondary Market Luxury Listing');
      setHeadline(data.headline || 'High-Yield Investment Residence');
      setDescription(data.description || 'Stunning upgraded property in prime location.');
      setPriceAED(data.priceAED || 2100000);
      setBeds(data.beds || 2);
      setBaths(data.baths || 2);
      setSqft(data.sqft || 1200);
      setCommunity(data.community || 'Dubai Marina');
      setDisplayUnit(data.displayUnit || `${data.community}, High Floor`);
      setRentalYieldPercent(data.rentalYieldPercent || 7.9);
      setCategory(
        data.category === 'Villa' || data.category === 'Penthouse' || data.category === 'Townhouse'
          ? data.category
          : 'Apartment'
      );
      setBulletPoints(data.bulletPoints || []);
      setAmenities(data.amenities || []);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || 'Failed to format listing');
    } finally {
      setIsFormatting(false);
    }
  };

  const handleAddPhoto = () => {
    if (newPhotoUrl.trim() && !photoUrls.includes(newPhotoUrl.trim())) {
      setPhotoUrls([...photoUrls, newPhotoUrl.trim()]);
      setNewPhotoUrl('');
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotoUrls(photoUrls.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    const newSecondaryListing: PropertyListing = {
      id: `prop-secondary-${Date.now()}`,
      title,
      headline,
      type: 'buy',
      category,
      community,
      displayUnit,
      exactUnitNumber: 'Unit 1804 (Masked)',
      priceAED,
      beds,
      baths,
      sqft,
      badge: 'Hot Deal',
      description,
      bulletPoints,
      amenities,
      images: photoUrls.length > 0 ? photoUrls : [
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80'
      ],
      isOffPlan: false,
      rentalYieldPercent,
      isPublishedPublic: true,
      createdAt: new Date().toISOString(),
    };

    onPublishListing(newSecondaryListing);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div 
        className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl my-8 text-stone-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-800 bg-stone-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Secondary Market Quick-Upload
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-normal border border-emerald-500/30">
                  Unstructured Note & Photos to Listing
                </span>
              </h3>
              <p className="text-xs text-stone-400">
                Paste a voice note transcript or quick broker memo. AI formats a polished public listing page in seconds.
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
          {!formattedResult ? (
            <div className="space-y-5">
              {/* Voice Memo or Quick Note Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-stone-300 flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-amber-400" />
                    Unstructured Note or Voice Transcription
                  </label>
                  <button
                    type="button"
                    onClick={handleSimulateVoiceTranscription}
                    disabled={isSimulatingVoice}
                    className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-amber-400/10 px-2 py-1 rounded border border-amber-400/20"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    {isSimulatingVoice ? 'Transcribing...' : 'Simulate Voice Memo Input'}
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={rawNotes}
                  onChange={(e) => setRawNotes(e.target.value)}
                  placeholder="e.g. 2 bed in Marina Gate, high floor, 1,200 sqft, owner wants 2.1M AED, full marina view, upgraded flooring, vacant on transfer..."
                  className="w-full p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white focus:outline-none focus:border-amber-400"
                />

                {/* Sample Presets */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
                  <span className="text-stone-500 text-[11px]">Load example:</span>
                  {SAMPLE_QUICK_NOTES.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => setRawNotes(sample.text)}
                      className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 hover:text-white text-[11px]"
                    >
                      {sample.label.split(' ')[0]} {sample.label.split(' ')[1]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photos Gallery Manager */}
              <div className="space-y-3">
                <label className="text-xs font-medium text-stone-300 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  Attached Property Photos ({photoUrls.length})
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {photoUrls.map((url, idx) => (
                    <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden group bg-stone-950 border border-stone-800">
                      <img src={url} alt={`Listing photo ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(idx)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-rose-400 hover:text-rose-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    placeholder="Paste image URL (https://...)..."
                    className="flex-1 p-2 rounded-lg bg-stone-950 border border-stone-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={handleAddPhoto}
                    className="px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Photo</span>
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Action Button */}
              <button
                type="button"
                onClick={handleFormatListing}
                disabled={isFormatting}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-stone-950 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                {isFormatting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Gemini AI formatting listing & calculating ROI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Polished Public Listing</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* REVIEW PARSED RESULT */
            <div className="space-y-6">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                <span className="text-emerald-300 font-medium flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  AI Listing Generated with Headline, Bullets, and Yield Estimates!
                </span>
                <button
                  onClick={() => setFormattedResult(null)}
                  className="text-stone-400 hover:text-white underline text-[11px]"
                >
                  Edit Raw Note
                </button>
              </div>

              {/* Primary Listing Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="sm:col-span-2">
                  <label className="text-stone-400 block mb-1">Listing Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white font-semibold focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Asking Price (AED)</label>
                  <input
                    type="number"
                    value={priceAED}
                    onChange={(e) => setPriceAED(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white font-bold text-amber-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Community</label>
                  <input
                    type="text"
                    value={community}
                    onChange={(e) => setCommunity(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Masked Unit Display</label>
                  <input
                    type="text"
                    value={displayUnit}
                    onChange={(e) => setDisplayUnit(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Estimated Yield (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={rentalYieldPercent}
                    onChange={(e) => setRentalYieldPercent(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-emerald-400 font-semibold focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Specs Counts */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-stone-400 block mb-1">Beds</label>
                  <input
                    type="number"
                    value={beds}
                    onChange={(e) => setBeds(Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Baths</label>
                  <input
                    type="number"
                    value={baths}
                    onChange={(e) => setBaths(Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Built-Up Area (sq.ft)</label>
                  <input
                    type="number"
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-stone-950 border border-stone-800 text-white"
                  />
                </div>
              </div>

              {/* Marketing Headline & Description */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-stone-400 block mb-1">Catchy Headline</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white font-medium focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-stone-400 block mb-1">Polished Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>
              </div>

              {/* Bullet Points */}
              <div className="space-y-1.5 text-xs">
                <label className="text-stone-400 font-medium block">Key Selling Points</label>
                <div className="space-y-1">
                  {bulletPoints.map((b, idx) => (
                    <div key={idx} className="p-2 rounded bg-stone-950 border border-stone-800 text-stone-300 flex items-center justify-between">
                      <span>• {b}</span>
                      <button
                        onClick={() => setBulletPoints(bulletPoints.filter((_, i) => i !== idx))}
                        className="text-stone-500 hover:text-rose-400 ml-2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-800 bg-stone-950 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-colors"
          >
            Cancel
          </button>
          {formattedResult && (
            <button
              onClick={handlePublish}
              className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
            >
              <Check className="w-4 h-4" />
              <span>Publish to Secondary Market</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
