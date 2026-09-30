import React from 'react';
import { Sparkles, BookOpen, Layers, Code, Zap } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: 'home' | 'create' | 'preview' | 'docs') => void;
  currentView: string;
  onQuickDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView, onQuickDemo }) => {
  return (
    <header className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-md border-b-2 border-purple-900/60 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-3 group text-left transition-transform active:scale-95"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-700 via-pink-600 to-yellow-400 p-[3px] comic-shadow-sm group-hover:rotate-3 transition-transform">
            <div className="w-full h-full bg-gray-900 rounded-[9px] flex items-center justify-center">
              <span className="font-bangers text-2xl text-yellow-400 tracking-wider">CC</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bangers text-2xl sm:text-3xl text-white tracking-wider group-hover:text-yellow-400 transition-colors">
                COMICCRAFT
              </span>
              <span className="bg-yellow-400 text-gray-950 font-bangers text-xs px-2 py-0.5 rounded-full border border-gray-950 comic-shadow-sm uppercase">
                AI STUDIO
              </span>
            </div>
            <p className="text-xs text-purple-300/80 font-comic tracking-wide hidden sm:block">
              Turn Your Imagination Into a Comic
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-2 rounded-lg font-comic font-bold text-sm transition-colors ${
              currentView === 'home' ? 'text-yellow-400 bg-purple-950/60' : 'text-gray-300 hover:text-white hover:bg-gray-900'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('create')}
            className={`px-3 py-2 rounded-lg font-comic font-bold text-sm transition-colors flex items-center gap-1.5 ${
              currentView === 'create' ? 'text-yellow-400 bg-purple-950/60' : 'text-gray-300 hover:text-white hover:bg-gray-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-pink-400" />
            Create Comic
          </button>
          <button
            onClick={() => {
              onNavigate('home');
              setTimeout(() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="px-3 py-2 rounded-lg font-comic font-bold text-sm text-gray-300 hover:text-white hover:bg-gray-900 transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4 text-purple-400" />
            How It Works
          </button>
          <button
            onClick={() => {
              onNavigate('home');
              setTimeout(() => {
                document.getElementById('example-showcase')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="px-3 py-2 rounded-lg font-comic font-bold text-sm text-gray-300 hover:text-white hover:bg-gray-900 transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            Example Comic
          </button>
          <button
            onClick={() => onNavigate('docs')}
            className={`px-3 py-2 rounded-lg font-comic font-bold text-sm transition-colors flex items-center gap-1.5 ${
              currentView === 'docs' ? 'text-yellow-400 bg-purple-950/60' : 'text-gray-300 hover:text-white hover:bg-gray-900'
            }`}
          >
            <Code className="w-4 h-4 text-blue-400" />
            API / Docs
          </button>
        </nav>

        {/* Action Button: Quick Demo & Create */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onQuickDemo}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-yellow-300 border-2 border-yellow-400/70 font-bangers text-sm sm:text-base tracking-wide comic-shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
            title="Load sample Luna & Enchanted Forest comic"
          >
            <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span className="hidden xs:inline">Sample</span> Demo
          </button>

          <button
            onClick={() => onNavigate('create')}
            className="px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-bangers text-base sm:text-lg tracking-wider border-2 border-white comic-shadow-sm hover:comic-shadow transition-all active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            Create
          </button>
        </div>

      </div>
    </header>
  );
};
