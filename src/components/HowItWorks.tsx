import React from 'react';
import { PenTool, Sparkles, FileDown, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '1',
      title: '1. Describe',
      tagline: 'Tell ComicCraft your story idea.',
      description: 'Enter your character name, choose a vibrant setting, select a tone, and pick from 7 distinct art styles.',
      icon: PenTool,
      color: 'from-purple-600 to-indigo-600',
      badgeColor: 'bg-purple-600 text-white'
    },
    {
      num: '2',
      title: '2. Generate',
      tagline: 'AI creates the story, dialogue, and illustrations.',
      description: 'Gemini Flash outlines a 5-panel story arc, Gemini Pro scripts the speech bubbles, and AI models render the scenes.',
      icon: Sparkles,
      color: 'from-pink-600 to-rose-600',
      badgeColor: 'bg-pink-600 text-white'
    },
    {
      num: '3',
      title: '3. Download',
      tagline: 'Download your finished comic as a PDF.',
      description: 'Review each panel, read the dialogue bubbles, inspect AI generation prompts, and export a ready-to-share PDF book.',
      icon: FileDown,
      color: 'from-yellow-500 to-amber-500',
      badgeColor: 'bg-yellow-400 text-gray-950'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-gray-950/60 border-t-2 border-purple-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-yellow-400 text-gray-950 font-bangers text-xs sm:text-sm px-3.5 py-1 rounded-full border border-gray-950 comic-shadow-sm uppercase tracking-wider inline-block mb-3">
            SIMPLE 3-STEP WORKFLOW
          </span>
          <h2 className="font-bangers text-3xl sm:text-5xl text-white tracking-wide">
            HOW COMICCRAFT WORKS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 font-comic">
            From a single sentence prompt to a complete 5-panel comic book in seconds.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-gray-900 border-4 border-gray-950 rounded-3xl p-6 sm:p-8 comic-shadow hover:comic-shadow-lg transition-all relative flex flex-col justify-between"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${s.color} p-1 comic-shadow-sm rotate-2`}>
                    <div className="w-full h-full bg-gray-950 rounded-[12px] flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <span className={`font-bangers text-xl px-3 py-1 rounded-xl border-2 border-gray-950 ${s.badgeColor} comic-shadow-sm`}>
                    STEP {s.num}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-bangers text-2xl text-white tracking-wide mb-1">
                    {s.title}
                  </h3>
                  <p className="font-bangers text-sm text-yellow-400 tracking-wide mb-3">
                    {s.tagline}
                  </p>
                  <p className="text-xs sm:text-sm font-comic text-slate-300 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                {/* Decorative bottom element */}
                <div className="mt-6 pt-4 border-t border-purple-900/40 flex items-center text-xs font-comic text-purple-300/80 gap-1.5">
                  <span>Fast AI Execution</span>
                  <ArrowRight className="w-3.5 h-3.5 text-pink-400" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
