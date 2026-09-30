import React, { useState } from 'react';
import { Download, Sparkles, Share2, Check, ArrowLeft, BookOpen, Layers } from 'lucide-react';
import { ComicStory } from '../types/comic';
import { PanelCard } from './PanelCard';
import { generateComicPdf } from '../services/pdfGenerator';

interface ComicReaderProps {
  comic: ComicStory;
  onCreateAnother: () => void;
  onExportSuccess: (filename: string, pdfUrl: string) => void;
}

export const ComicReader: React.FC<ComicReaderProps> = ({
  comic,
  onCreateAnother,
  onExportSuccess
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'strip'>('grid');

  const handleDownloadPdf = async () => {
    try {
      setIsExporting(true);
      const { filename, url } = await generateComicPdf(comic);

      // Trigger automatic file download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Trigger export success flow
      onExportSuccess(filename, url);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      alert('Could not export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: comic.title,
        text: `Check out my comic "${comic.title}" created with ComicCraft AI!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Top Navigation & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <button
          onClick={onCreateAnother}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-slate-300 font-comic font-bold text-sm border-2 border-purple-900/60 comic-shadow-sm transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Story Creator</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Toggle Layout Button (Desktop) */}
          <div className="hidden sm:flex items-center bg-gray-950 p-1 rounded-xl border border-purple-900/60">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-lg text-xs font-comic font-bold transition-colors flex items-center gap-1.5 ${
                viewMode === 'grid' ? 'bg-purple-700 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>2-Column Grid</span>
            </button>
            <button
              onClick={() => setViewMode('strip')}
              className={`px-3 py-1 rounded-lg text-xs font-comic font-bold transition-colors flex items-center gap-1.5 ${
                viewMode === 'strip' ? 'bg-purple-700 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Single Strip</span>
            </button>
          </div>

          <button
            onClick={handleShare}
            className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-purple-300 hover:text-white font-comic font-bold text-sm border-2 border-purple-900/60 comic-shadow-sm transition-all flex items-center gap-2 active:scale-95"
            title="Share comic"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Comic Header Card */}
      <div className="bg-gradient-to-r from-gray-950 via-purple-950/80 to-gray-950 border-4 border-gray-950 rounded-3xl p-6 sm:p-8 comic-shadow-lg mb-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-yellow-400 text-gray-950 font-bangers text-xs sm:text-sm px-3 py-0.5 rounded-full border border-gray-950 comic-shadow-sm">
                5-PANEL STORY
              </span>
              <span className="bg-pink-600 text-white font-comic font-bold text-xs px-2.5 py-0.5 rounded-full">
                {comic.art_style} Style
              </span>
              <span className="bg-indigo-900/80 text-indigo-200 font-comic font-bold text-xs px-2.5 py-0.5 rounded-full border border-indigo-700/60">
                {comic.tone} Tone
              </span>
              {comic.is_demo && (
                <span className="bg-amber-500/20 text-yellow-300 font-comic font-bold text-xs px-2.5 py-0.5 rounded-full border border-yellow-500/40">
                  Demo Edition
                </span>
              )}
            </div>

            <h1 className="font-bangers text-3xl sm:text-5xl text-white tracking-wide leading-tight">
              {comic.title}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300 font-comic max-w-2xl leading-relaxed">
              Hero: <span className="text-yellow-400 font-bold">{comic.character_name}</span> • Setting: <span className="text-purple-300 font-bold">{comic.setting}</span>
            </p>
            <p className="mt-1 text-xs text-slate-400 font-comic italic">
              Original Prompt: "{comic.prompt}"
            </p>
          </div>

          {/* Quick Header CTA */}
          <div className="shrink-0 flex sm:flex-col gap-3">
            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className={`px-6 py-3.5 rounded-2xl font-bangers text-lg sm:text-xl tracking-wider border-3 border-gray-950 comic-shadow hover:comic-shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer ${
                isExporting
                  ? 'bg-gray-700 text-gray-400'
                  : 'bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-950'
              }`}
            >
              <Download className="w-5 h-5 text-gray-950" />
              <span>{isExporting ? 'EXPORTING PDF...' : 'DOWNLOAD COMIC PDF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comic Panels Layout */}
      {/* Desktop: 2-column or single column based on viewMode; Mobile: single-column */}
      <div
        className={`gap-8 ${
          viewMode === 'grid'
            ? 'grid grid-cols-1 lg:grid-cols-2'
            : 'flex flex-col max-w-3xl mx-auto space-y-8'
        }`}
      >
        {comic.panels.map((panel, idx) => (
          <div
            key={panel.panel_number}
            className={viewMode === 'grid' && idx === 4 ? 'lg:col-span-2 max-w-3xl mx-auto w-full' : ''}
          >
            <PanelCard panel={panel} totalPanels={comic.panels.length} />
          </div>
        ))}
      </div>

      {/* Floating / Sticky Bottom Action Bar */}
      <div className="sticky bottom-6 z-40 mt-12 max-w-2xl mx-auto">
        <div className="bg-gray-950/95 backdrop-blur-md border-3 border-yellow-400/80 rounded-2xl p-3 sm:p-4 comic-shadow-lg flex items-center justify-between gap-3">
          <div className="hidden sm:block">
            <p className="font-bangers text-base text-yellow-300 tracking-wide">
              LIKE THIS STORY?
            </p>
            <p className="text-xs font-comic text-slate-400">
              Download your full 5-panel comic as a high-res PDF.
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onCreateAnother}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-slate-200 font-comic font-bold text-sm border-2 border-purple-800/80 transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>Create Another</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 text-gray-950 font-bangers text-base sm:text-lg tracking-wider border-2 border-gray-950 comic-shadow-sm hover:comic-shadow transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-gray-950" />
              <span>{isExporting ? 'EXPORTING...' : 'DOWNLOAD PDF'}</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
