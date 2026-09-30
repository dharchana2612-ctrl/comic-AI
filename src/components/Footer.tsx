import React from 'react';
import { Sparkles, Github, Code, BookOpen } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'create' | 'preview' | 'docs') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-950 border-t-3 border-purple-900/60 py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-bangers text-3xl text-white tracking-wider">
                COMICCRAFT
              </span>
              <span className="bg-yellow-400 text-gray-950 font-bangers text-xs px-2 py-0.5 rounded border border-gray-950">
                AI CREATOR
              </span>
            </div>
            <p className="font-bangers text-lg text-yellow-400 tracking-wide">
              "Turn Your Imagination Into a Comic."
            </p>
            <p className="text-xs sm:text-sm font-comic text-slate-400 max-w-md leading-relaxed">
              Create stories. Generate worlds. Bring your imagination to life with personalized 5-panel comic story generation, character dialogue, and instant PDF publishing.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-bangers text-base text-white tracking-wide uppercase">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm font-comic">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-yellow-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('create')}
                  className="hover:text-yellow-400 transition-colors"
                >
                  Create Comic
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    setTimeout(() => {
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-yellow-400 transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('docs')}
                  className="hover:text-yellow-400 transition-colors"
                >
                  Documentation / API
                </button>
              </li>
            </ul>
          </div>

          {/* Architecture / Tech Badge */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-bangers text-base text-white tracking-wide uppercase">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-comic">
              <span className="px-2 py-1 rounded bg-gray-900 border border-purple-800 text-purple-200">
                Google Gemini API
              </span>
              <span className="px-2 py-1 rounded bg-gray-900 border border-purple-800 text-purple-200">
                Stable Diffusion
              </span>
              <span className="px-2 py-1 rounded bg-gray-900 border border-purple-800 text-purple-200">
                React 19 & Vite
              </span>
              <span className="px-2 py-1 rounded bg-gray-900 border border-purple-800 text-purple-200">
                Express / FastAPI
              </span>
              <span className="px-2 py-1 rounded bg-gray-900 border border-purple-800 text-purple-200">
                jsPDF Exporter
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-purple-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-comic text-slate-500">
          <p>© 2026 ComicCraft. Built with AI and imagination.</p>
          <div className="flex items-center gap-4">
            <span className="text-yellow-400/80 font-bold">College Project Edition</span>
            <span>•</span>
            <button
              onClick={() => onNavigate('docs')}
              className="text-purple-400 hover:text-purple-300"
            >
              OpenAPI 3.0 /docs
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
