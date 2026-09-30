import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Star, ShieldCheck, Palette, FileDown } from 'lucide-react';

interface HeroProps {
  onStartCreating: () => void;
  onExploreDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartCreating, onExploreDemo }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 bg-gradient-to-b from-gray-950 via-purple-950/40 to-gray-950 comic-halftone">
      
      {/* Decorative comic pop bursts in background */}
      <div className="absolute top-10 left-8 hidden lg:block opacity-30 transform -rotate-12 pointer-events-none">
        <div className="font-bangers text-6xl text-yellow-400 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
          POW!
        </div>
      </div>
      <div className="absolute top-24 right-10 hidden lg:block opacity-30 transform rotate-12 pointer-events-none">
        <div className="font-bangers text-6xl text-pink-500 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
          WOW!
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/70 border-2 border-purple-500/80 text-purple-200 text-xs sm:text-sm font-comic font-bold mb-6 comic-shadow-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>AI-Powered 5-Panel Comic Engine</span>
              <span className="bg-pink-600 text-white px-2 py-0.5 rounded-md text-[10px] uppercase font-bangers">NEW</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-bangers text-4xl sm:text-6xl md:text-7xl text-white tracking-wide leading-[1.05] drop-shadow-md">
              TURN YOUR IMAGINATION <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                INTO A COMIC.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg sm:text-xl text-slate-300 font-comic max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Create a personalized <span className="text-yellow-300 font-bold">5-panel comic</span> with AI-powered storytelling, dialogue, and illustrations.
            </p>

            {/* Supporting tagline */}
            <p className="mt-2 text-sm sm:text-base text-purple-300/80 font-comic italic">
              "Create stories. Generate worlds. Bring your imagination to life."
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onStartCreating}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-gray-950 font-bangers text-2xl tracking-wider border-4 border-gray-950 comic-shadow hover:comic-shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
              >
                <Sparkles className="w-6 h-6 text-purple-950 fill-purple-950" />
                CREATE MY COMIC
                <ArrowRight className="w-6 h-6 text-purple-950" />
              </button>

              <button
                onClick={onExploreDemo}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gray-900/90 hover:bg-gray-800 text-slate-200 font-comic font-bold text-base border-2 border-purple-500/60 comic-shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5 text-pink-400" />
                View Demo Comic
              </button>
            </div>

            {/* Secondary reassurance text */}
            <p className="mt-4 text-xs sm:text-sm text-slate-400 font-comic flex items-center justify-center lg:justify-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>No drawing skills required. Just bring your idea.</span>
            </p>

            {/* Quick feature pill markers */}
            <div className="mt-8 pt-6 border-t border-purple-900/40 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-comic text-slate-300">
              <div className="flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-pink-400" />
                <span>7 Art Styles</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-700" />
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Character Consistency</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-700" />
              <div className="flex items-center gap-1.5">
                <FileDown className="w-4 h-4 text-indigo-400" />
                <span>One-Click PDF Export</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Comic Preview Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative comic action burst behind card */}
              <div className="absolute -top-6 -right-6 w-28 h-28 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />

              {/* Main Comic Book Cover Frame */}
              <div className="bg-gray-900 border-4 border-gray-950 rounded-3xl p-4 sm:p-5 comic-shadow-lg relative overflow-hidden transform hover:-rotate-1 transition-transform">
                
                {/* Top comic book strip */}
                <div className="flex items-center justify-between border-b-2 border-purple-900/60 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-400 text-gray-950 font-bangers text-xs px-2 py-0.5 rounded border border-gray-950">
                      VOL. 1
                    </span>
                    <span className="font-comic font-bold text-xs text-purple-300">
                      STORY SHOWCASE
                    </span>
                  </div>
                  <span className="text-pink-400 text-xs font-comic font-bold">
                    ANIME STYLE
                  </span>
                </div>

                {/* Hero comic artwork presentation */}
                <div className="relative rounded-2xl overflow-hidden border-3 border-gray-950 bg-purple-950 aspect-[16/11]">
                  <img
                    src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20550%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%232e1065%22%2F%3E%3Cstop%20offset%3D%2260%25%22%20stop-color%3D%22%234c1d95%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230f172a%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22800%22%20height%3D%22550%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22400%22%20cy%3D%22200%22%20r%3D%22120%22%20fill%3D%22%23facc15%22%20opacity%3D%220.25%22%20filter%3D%22blur(30px)%22%2F%3E%3Cpath%20d%3D%22M%20100%20550%20L%20160%20220%20L%20220%20550%20Z%22%20fill%3D%22%23065f46%22%20opacity%3D%220.8%22%2F%3E%3Cpath%20d%3D%22M%20580%20550%20L%20640%20200%20L%20700%20550%20Z%22%20fill%3D%22%23065f46%22%20opacity%3D%220.8%22%2F%3E%3Cg%20transform%3D%22translate(350%2C%20260)%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2270%22%20r%3D%2260%22%20fill%3D%22%2338bdf8%22%20opacity%3D%220.4%22%20filter%3D%22blur(15px)%22%2F%3E%3Cpath%20d%3D%22M%2030%2060%20Q%20-20%2070%20-35%20100%20Q%200%2090%2035%2075%20Z%22%20fill%3D%22%2338bdf8%22%2F%3E%3Crect%20x%3D%2235%22%20y%3D%2245%22%20width%3D%2234%22%20height%3D%2250%22%20rx%3D%2210%22%20fill%3D%22%23ffffff%22%20stroke%3D%22%23111827%22%20stroke-width%3D%224%22%2F%3E%3Ccircle%20cx%3D%2252%22%20cy%3D%2230%22%20r%3D%2224%22%20fill%3D%22%23ffffff%22%20stroke%3D%22%23111827%22%20stroke-width%3D%224%22%2F%3E%3Cpolygon%20points%3D%2236%2C12%2026%2C-8%2048%2C8%22%20fill%3D%22%23f97316%22%20stroke%3D%22%23111827%22%20stroke-width%3D%223%22%2F%3E%3Cpolygon%20points%3D%2256%2C8%2078%2C-8%2068%2C12%22%20fill%3D%22%23f97316%22%20stroke%3D%22%23111827%22%20stroke-width%3D%223%22%2F%3E%3Ccircle%20cx%3D%2245%22%20cy%3D%2228%22%20r%3D%224.5%22%20fill%3D%22%23111827%22%2F%3E%3Ccircle%20cx%3D%2259%22%20cy%3D%2228%22%20r%3D%224.5%22%20fill%3D%22%23111827%22%2F%3E%3Cline%20x1%3D%2242%22%20y1%3D%2295%22%20x2%3D%2232%22%20y2%3D%22140%22%20stroke%3D%22%23111827%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%2F%3E%3Cline%20x1%3D%2262%22%20y1%3D%2295%22%20x2%3D%2272%22%20y2%3D%22135%22%20stroke%3D%22%23111827%22%20stroke-width%3D%226%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fg%3E%3Ctext%20x%3D%22400%22%20y%3D%22500%22%20fill%3D%22%23facc15%22%20font-family%3D%22sans-serif%22%20font-size%3D%2224%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%3ELuna%20in%20the%20Enchanted%20Forest%3C%2Ftext%3E%3C%2Fsvg%3E"
                    alt="ComicCraft Hero Preview"
                    className="w-full h-full object-cover"
                  />

                  {/* Speech Bubble floating in hero preview */}
                  <div className="absolute top-4 left-4 bg-white border-2 border-gray-950 rounded-2xl px-3 py-1.5 comic-shadow-sm max-w-[210px]">
                    <p className="font-comic font-bold text-xs text-gray-950">
                      "I will uncover the secrets of the Whispering Woods!"
                    </p>
                    {/* Tail */}
                    <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-b-2 border-r-2 border-gray-950 transform rotate-45" />
                  </div>

                  {/* Comic sound badge */}
                  <div className="absolute bottom-3 right-3 bg-yellow-400 text-gray-950 font-bangers text-lg px-3 py-0.5 rounded-lg border-2 border-gray-950 comic-shadow-sm rotate-6">
                    SPARKLE!
                  </div>
                </div>

                {/* Comic Card Details */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bangers text-xl text-yellow-400">
                      Luna and the Enchanted Forest
                    </h3>
                    <span className="text-xs font-comic text-gray-400">
                      5 Panels Generated
                    </span>
                  </div>

                  {/* Narration caption strip */}
                  <div className="bg-yellow-200/95 border-2 border-yellow-500 rounded-xl p-2.5">
                    <p className="text-xs font-comic font-bold text-gray-900 leading-snug">
                      CAPTION: "Beyond the forgotten border stones, ancient rumors spoke of spirits trapped in amber branches..."
                    </p>
                  </div>
                </div>

              </div>

              {/* Floating mini badge */}
              <div className="absolute -bottom-4 -right-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bangers text-sm px-4 py-2 rounded-xl border-2 border-white comic-shadow rotate-3">
                📄 PDF READY
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
