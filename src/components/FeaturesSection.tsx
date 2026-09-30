import React from 'react';
import { BookOpen, Palette, UserCheck, Download, Smartphone, Sparkles, Layers, Shield } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'AI Storytelling',
      subtitle: 'Structured 5-Act Narratives',
      description: 'Gemini Flash crafts an engaging storyline following hook, rising action, confrontation, climax, and resolution.',
      icon: BookOpen,
      color: 'text-yellow-400 bg-yellow-950/60 border-yellow-500/50'
    },
    {
      title: 'AI Illustrations',
      subtitle: 'Atmospheric Comic Panels',
      description: 'Generate high-impact visuals with dynamic angles, halftones, lighting, and action sound bursts.',
      icon: Sparkles,
      color: 'text-pink-400 bg-pink-950/60 border-pink-500/50'
    },
    {
      title: 'Personalized Characters',
      subtitle: 'Consistent Identity & Dialogue',
      description: 'Keep your hero consistent in personality, appearance cues, and custom dialogue bubbles across all five panels.',
      icon: UserCheck,
      color: 'text-purple-400 bg-purple-950/60 border-purple-500/50'
    },
    {
      title: 'Multiple Art Styles',
      subtitle: 'Anime, Comic, Pixel & More',
      description: 'Switch freely between Anime, Comic Book, Pixel Art, Realistic, Cartoon, Watercolor, and Fantasy styles.',
      icon: Palette,
      color: 'text-blue-400 bg-blue-950/60 border-blue-500/50'
    },
    {
      title: 'One-Click PDF Export',
      subtitle: 'Print & Share Ready',
      description: 'Instant multi-page PDF generation featuring title covers, metadata, speech bubbles, and panel cards.',
      icon: Download,
      color: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/50'
    },
    {
      title: 'Mobile-First Experience',
      subtitle: 'Touch-Friendly & Responsive',
      description: 'Zero horizontal scrolling, fluid responsive images, and lightning-fast previews on smartphones and desktops.',
      icon: Smartphone,
      color: 'text-rose-400 bg-rose-950/60 border-rose-500/50'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-950 border-t-2 border-purple-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-pink-600 text-white font-bangers text-xs sm:text-sm px-3.5 py-1 rounded-full border border-gray-950 comic-shadow-sm uppercase tracking-wider inline-block mb-3">
            POWERFUL CAPABILITIES
          </span>
          <h2 className="font-bangers text-3xl sm:text-5xl text-white tracking-wide">
            DESIGNED FOR CREATIVE STORYTELLERS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 font-comic">
            Everything you need to turn a quick spark into a collectible digital comic book.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="bg-gray-900/90 border-3 border-gray-950 rounded-3xl p-6 comic-shadow hover:comic-shadow-purple transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center mb-4 ${f.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bangers text-2xl text-white tracking-wide">
                  {f.title}
                </h3>
                <p className="font-bangers text-xs text-yellow-400 tracking-wide mb-2">
                  {f.subtitle}
                </p>
                <p className="text-xs sm:text-sm font-comic text-slate-300 leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
