import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check, MessageSquareQuote, Sparkles, Volume2 } from 'lucide-react';
import { ComicPanel } from '../types/comic';

interface PanelCardProps {
  panel: ComicPanel;
  totalPanels?: number;
}

export const PanelCard: React.FC<PanelCardProps> = ({ panel, totalPanels = 5 }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(panel.image_prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="bg-gray-900 border-4 border-gray-950 rounded-3xl overflow-hidden comic-shadow-lg transition-transform hover:-translate-y-1">
      
      {/* Panel Top Header Banner */}
      <div className="bg-gray-950 px-5 py-3.5 border-b-3 border-gray-950 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-950 font-bangers text-sm sm:text-base px-3 py-1 rounded-xl border border-gray-950 comic-shadow-sm tracking-wide">
            PANEL {panel.panel_number} OF {totalPanels}
          </span>
          <h3 className="font-bangers text-xl sm:text-2xl text-white tracking-wide truncate max-w-[200px] sm:max-w-md">
            {panel.title}
          </h3>
        </div>

        <span className="text-xs font-comic text-purple-300 font-bold hidden sm:inline-block">
          AI ILLUSTRATED
        </span>
      </div>

      {/* Large Generated Comic Artwork */}
      <div className="relative bg-gray-950 aspect-[16/10] overflow-hidden border-b-3 border-gray-950 group">
        <img
          src={panel.image_url}
          alt={`Comic Panel ${panel.panel_number}: ${panel.title}`}
          className="w-full h-full object-cover select-none transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />

        {/* Comic Vignette Frame Inner Glow */}
        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10" />
      </div>

      {/* Comic Panel Content Area */}
      <div className="p-5 sm:p-6 space-y-4">
        
        {/* Scene Description (Italic styling) */}
        <div className="text-xs sm:text-sm font-comic italic text-slate-300 bg-gray-950/60 p-3 rounded-xl border border-purple-900/40">
          <span className="font-bold text-yellow-400 not-italic mr-1.5 font-bangers tracking-wide text-xs">
            SCENE:
          </span>
          {panel.scene_description}
        </div>

        {/* Caption / Narration Box (Classic comic yellow box) */}
        {(panel.narration || panel.caption) && (
          <div className="bg-yellow-200/95 border-2 border-yellow-500 rounded-2xl p-3.5 comic-shadow-sm">
            <div className="flex items-center gap-1.5 text-[11px] font-bangers text-yellow-900 uppercase tracking-wider mb-1">
              <Volume2 className="w-3.5 h-3.5" />
              NARRATION & CAPTION:
            </div>
            <p className="font-comic font-bold text-xs sm:text-sm text-gray-950 leading-relaxed">
              "{panel.narration || panel.caption}"
            </p>
          </div>
        )}

        {/* Character Dialogue inside Comic Speech Bubbles */}
        {panel.dialogue && panel.dialogue.length > 0 && (
          <div className="space-y-3 pt-1">
            {panel.dialogue.map((diag, idx) => {
              const isThought = diag.type === 'thought';
              const isShout = diag.type === 'shout';

              return (
                <div key={idx} className="relative">
                  {/* Speech Bubble Container */}
                  <div
                    className={`relative rounded-2xl p-3.5 sm:p-4 border-3 comic-shadow-sm ${
                      isShout
                        ? 'bg-red-50 border-red-600 text-gray-950 ring-2 ring-red-400'
                        : isThought
                        ? 'bg-purple-50 border-purple-600 text-gray-950 border-dashed'
                        : 'bg-white border-gray-950 text-gray-950'
                    }`}
                  >
                    {/* Speaker Header */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <MessageSquareQuote className={`w-3.5 h-3.5 ${isShout ? 'text-red-600' : 'text-purple-600'}`} />
                        <span className="font-bangers text-sm sm:text-base tracking-wide text-purple-900 uppercase">
                          {diag.speaker}
                        </span>
                      </div>
                      <span className="text-[10px] font-comic font-bold px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 uppercase">
                        {isThought ? '💭 THOUGHT' : isShout ? '💥 SHOUT' : '💬 SPEECH'}
                      </span>
                    </div>

                    {/* Dialogue Line */}
                    <p className={`font-comic font-bold text-sm sm:text-base leading-snug ${isShout ? 'uppercase tracking-wide text-red-950' : 'text-gray-900'}`}>
                      "{diag.text}"
                    </p>

                    {/* Comic Speech Bubble Tail */}
                    <div
                      className={`absolute -bottom-2.5 left-7 w-4 h-4 transform rotate-45 border-b-3 border-r-3 ${
                        isShout
                          ? 'bg-red-50 border-red-600'
                          : isThought
                          ? 'bg-purple-50 border-purple-600 border-dashed'
                          : 'bg-white border-gray-950'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Collapsible "Show AI Prompt" Section */}
        <div className="pt-2 border-t border-purple-900/40">
          <button
            type="button"
            onClick={() => setShowPrompt(!showPrompt)}
            className="w-full py-2 px-3 rounded-xl bg-gray-950 hover:bg-gray-800 text-gray-400 hover:text-slate-200 text-xs font-comic font-bold flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              {showPrompt ? 'Hide AI Prompt' : 'Show AI Image Prompt'}
            </span>
            {showPrompt ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {showPrompt && (
            <div className="mt-2.5 p-3 rounded-xl bg-gray-950 border border-purple-900/60 text-xs font-comic text-slate-300 relative">
              <div className="flex items-center justify-between mb-1.5 text-[11px] font-bold text-purple-400">
                <span>STABLE DIFFUSION / GEMINI PROMPT:</span>
                <button
                  onClick={handleCopyPrompt}
                  className="px-2 py-0.5 rounded bg-purple-900 hover:bg-purple-800 text-white flex items-center gap-1 transition-colors"
                  title="Copy prompt"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="font-mono text-[11px] text-slate-300 leading-relaxed select-all">
                {panel.image_prompt}
              </p>
            </div>
          )}
        </div>

      </div>

    </article>
  );
};
