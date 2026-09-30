import React from 'react';
import { BookOpen, Sparkles, ArrowRight, Eye } from 'lucide-react';
import { DEMO_COMIC } from '../services/demoData';

interface ExampleShowcaseProps {
  onLoadExample: () => void;
  onPreviewDemo: () => void;
}

export const ExampleShowcase: React.FC<ExampleShowcaseProps> = ({
  onLoadExample,
  onPreviewDemo
}) => {
  return (
    <section id="example-showcase" className="py-16 sm:py-24 bg-purple-950/30 border-t-2 border-purple-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="bg-yellow-400 text-gray-950 font-bangers text-xs sm:text-sm px-3.5 py-1 rounded-full border border-gray-950 comic-shadow-sm uppercase tracking-wider inline-block mb-3">
              FLAGSHIP DEMONSTRATION
            </span>
            <h2 className="font-bangers text-3xl sm:text-5xl text-white tracking-wide">
              "LUNA AND THE ENCHANTED FOREST"
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 font-comic max-w-xl">
              An example 5-panel comic generated using the prompt: <span className="text-yellow-300 italic">"A brave fox exploring an enchanted forest."</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onPreviewDemo}
              className="px-5 py-2.5 rounded-xl bg-purple-800 hover:bg-purple-700 text-white font-bangers text-lg tracking-wide border-2 border-purple-400 comic-shadow-sm transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Eye className="w-5 h-5 text-yellow-300" />
              <span>Full Reader Preview</span>
            </button>
            <button
              onClick={onLoadExample}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 text-gray-950 font-bangers text-lg tracking-wide border-2 border-gray-950 comic-shadow-sm transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-gray-950" />
              <span>Use This Prompt</span>
            </button>
          </div>
        </div>

        {/* 5-Panel Horizontal Scroll / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {DEMO_COMIC.panels.map((panel) => (
            <div
              key={panel.panel_number}
              className="bg-gray-900 border-3 border-gray-950 rounded-2xl overflow-hidden comic-shadow flex flex-col justify-between hover:-translate-y-1 transition-transform"
            >
              <div>
                {/* Panel Header */}
                <div className="bg-gray-950 px-3 py-2 border-b-2 border-gray-950 flex items-center justify-between">
                  <span className="font-bangers text-xs text-yellow-400">
                    PANEL {panel.panel_number}
                  </span>
                  <span className="text-[10px] font-comic font-bold text-gray-400 truncate max-w-[110px]">
                    {panel.title}
                  </span>
                </div>

                {/* Panel Image Thumbnail */}
                <div className="aspect-[16/10] bg-gray-950 overflow-hidden relative">
                  <img
                    src={panel.image_url}
                    alt={panel.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-1 right-1 bg-yellow-400 text-gray-950 font-bangers text-[10px] px-1.5 py-0.5 rounded border border-gray-950">
                    ANIME
                  </div>
                </div>

                {/* Panel Scene */}
                <div className="p-3">
                  <p className="text-[11px] font-comic italic text-slate-300 line-clamp-2 mb-2">
                    {panel.scene_description}
                  </p>

                  {/* Speech Bubble Preview */}
                  {panel.dialogue && panel.dialogue[0] && (
                    <div className="bg-white border-2 border-gray-950 rounded-xl p-2 comic-shadow-sm relative">
                      <p className="font-bangers text-[10px] text-purple-900 uppercase">
                        {panel.dialogue[0].speaker}:
                      </p>
                      <p className="font-comic font-bold text-[10px] text-gray-950 line-clamp-2 leading-tight">
                        "{panel.dialogue[0].text}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom strip */}
              <div className="p-3 pt-0">
                <div className="bg-yellow-200/90 border border-yellow-500 rounded-lg p-1.5">
                  <p className="text-[10px] font-comic font-bold text-gray-950 line-clamp-2">
                    CAPTION: "{panel.caption || panel.narration}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
