import React, { useState } from 'react';
import { Sparkles, Wand2, Compass, Smile, Palette, User, AlertCircle, Zap } from 'lucide-react';
import { ArtStyleOption, ComicGenerationRequest, SettingOption, ToneOption } from '../types/comic';
import { SAMPLE_PRESETS } from '../services/demoData';

interface ComicFormProps {
  onSubmit: (request: ComicGenerationRequest) => void;
  isGenerating: boolean;
}

const SETTING_OPTIONS: { id: SettingOption; label: string; icon: string }[] = [
  { id: 'Forest', label: 'Forest', icon: '🌲' },
  { id: 'School', label: 'School', icon: '🏫' },
  { id: 'Space', label: 'Space', icon: '🚀' },
  { id: 'City', label: 'City', icon: '🏙️' },
  { id: 'Beach', label: 'Beach', icon: '🏖️' },
  { id: 'Castle', label: 'Castle', icon: '🏰' },
  { id: 'Village', label: 'Village', icon: '🏡' },
  { id: 'Custom', label: 'Custom...', icon: '✨' }
];

const TONE_OPTIONS: { id: ToneOption; label: string; mood: string; color: string }[] = [
  { id: 'Dramatic', label: 'Dramatic', mood: 'Intense & Cinematic', color: 'border-red-500 bg-red-950/30 text-red-200' },
  { id: 'Adventurous', label: 'Adventurous', mood: 'Thrilling & Bold', color: 'border-amber-500 bg-amber-950/30 text-amber-200' },
  { id: 'Funny', label: 'Funny', mood: 'Humorous & Playful', color: 'border-yellow-400 bg-yellow-950/30 text-yellow-200' },
  { id: 'Light-hearted', label: 'Light-hearted', mood: 'Gentle & Uplifting', color: 'border-emerald-500 bg-emerald-950/30 text-emerald-200' },
  { id: 'Mysterious', label: 'Mysterious', mood: 'Enigmatic & Cryptic', color: 'border-purple-500 bg-purple-950/30 text-purple-200' },
  { id: 'Poetic', label: 'Poetic', mood: 'Lyrical & Dreamy', color: 'border-pink-500 bg-pink-950/30 text-pink-200' },
  { id: 'Inspirational', label: 'Inspirational', mood: 'Heroic & Moving', color: 'border-blue-500 bg-blue-950/30 text-blue-200' }
];

const ART_STYLE_OPTIONS: { id: ArtStyleOption; label: string; emoji: string; previewDesc: string }[] = [
  { id: 'Anime', label: 'Anime', emoji: '🎌', previewDesc: 'Cel-shaded, expressive eyes, vibrant Japanese aesthetic' },
  { id: 'Comic Book', label: 'Comic Book', emoji: '💥', previewDesc: 'Halftone dots, bold black inks, vintage superhero style' },
  { id: 'Pixel Art', label: 'Pixel Art', emoji: '👾', previewDesc: 'Retro 16-bit arcade vibes, nostalgic chunky sprites' },
  { id: 'Realistic', label: 'Realistic', emoji: '🎬', previewDesc: 'Cinematic lighting, rich textures and atmospheric shadows' },
  { id: 'Cartoon', label: 'Cartoon', emoji: '🎨', previewDesc: 'Playful curves, vibrant pop colors and animation energy' },
  { id: 'Watercolor', label: 'Watercolor', emoji: '🖌️', previewDesc: 'Soft flowing pigments, dreamy wash and artistic paper grain' },
  { id: 'Fantasy', label: 'Fantasy', emoji: '🧙‍♂️', previewDesc: 'Magical glows, ethereal particle lights and mythical grandeur' }
];

export const ComicForm: React.FC<ComicFormProps> = ({ onSubmit, isGenerating }) => {
  const [prompt, setPrompt] = useState('A brave fox exploring an enchanted forest.');
  const [characterName, setCharacterName] = useState('Luna');
  const [setting, setSetting] = useState<SettingOption>('Forest');
  const [customSetting, setCustomSetting] = useState('');
  const [tone, setTone] = useState<ToneOption>('Dramatic');
  const [artStyle, setArtStyle] = useState<ArtStyleOption>('Anime');
  const [useDemoMode, setUseDemoMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApplyPreset = (preset: typeof SAMPLE_PRESETS[0]) => {
    setPrompt(preset.prompt);
    setCharacterName(preset.character);
    setSetting(preset.setting as SettingOption);
    setTone(preset.tone);
    setArtStyle(preset.art_style);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      setError('Please enter a story prompt describing what your comic is about.');
      return;
    }

    if (prompt.trim().length < 5) {
      setError('Your story prompt should be at least 5 characters long.');
      return;
    }

    if (!characterName.trim()) {
      setError('Please provide a name for your main character.');
      return;
    }

    if (setting === 'Custom' && !customSetting.trim()) {
      setError('Please specify your custom setting name.');
      return;
    }

    setError(null);
    onSubmit({
      story_prompt: prompt.trim(),
      character_name: characterName.trim(),
      setting,
      custom_setting: customSetting.trim(),
      tone,
      art_style: artStyle,
      use_demo_mode: useDemoMode
    });
  };

  return (
    <div id="creator-section" className="max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Preset Quick-Fill Bar */}
      <div className="mb-6 p-4 rounded-2xl bg-purple-950/60 border-2 border-purple-800/60 comic-shadow-sm">
        <div className="flex items-center gap-2 mb-2.5">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="font-bangers text-sm sm:text-base text-yellow-300 tracking-wide">
            TRY AN EXAMPLE STORY PRESET:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(p)}
              className="px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 border border-purple-600/50 hover:border-yellow-400 text-xs sm:text-sm font-comic font-bold text-slate-200 hover:text-yellow-300 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span>{p.title}</span>
              <span className="bg-purple-900 text-purple-200 text-[10px] px-1.5 py-0.5 rounded font-bangers">
                {p.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-gray-900/95 border-4 border-gray-950 rounded-3xl p-6 sm:p-10 comic-shadow-lg relative overflow-hidden">
        
        {/* Top Comic Burst Tag */}
        <div className="flex items-center justify-between border-b-2 border-purple-900/60 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bangers uppercase tracking-wider text-pink-400 mb-1">
              <Wand2 className="w-4 h-4" />
              Creative Studio
            </div>
            <h2 className="font-bangers text-3xl sm:text-4xl text-white tracking-wide">
              CREATE YOUR COMIC
            </h2>
          </div>
          <div className="hidden sm:block">
            <span className="bg-yellow-400 text-gray-950 font-bangers text-sm px-3 py-1.5 rounded-xl border-2 border-gray-950 comic-shadow-sm rotate-2 inline-block">
              5 PANELS READY
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-950/80 border-2 border-red-500 text-red-200 font-comic flex items-start gap-3 comic-shadow-sm">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Action Needed</p>
              <p className="text-xs text-red-300">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 1. Story Prompt */}
          <div>
            <label className="block font-bangers text-xl text-yellow-400 mb-1 tracking-wide flex items-center gap-2">
              <span>What should your comic be about?</span>
              <span className="text-red-400 text-sm">*</span>
            </label>
            <p className="text-xs text-slate-400 font-comic mb-2.5">
              Describe your story idea, adventure, characters, or anything you want to imagine.
            </p>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                placeholder="Example: A brave fox exploring an enchanted forest."
                className="w-full bg-gray-950 border-3 border-purple-900/80 focus:border-yellow-400 rounded-2xl p-4 text-white font-comic text-base placeholder:text-gray-500 focus:outline-none transition-colors comic-shadow-sm resize-none"
                maxLength={600}
                required
              />
              <span className="absolute bottom-3 right-4 text-xs font-comic text-gray-500">
                {prompt.length}/600
              </span>
            </div>
          </div>

          {/* 2. Main Character Name */}
          <div>
            <label className="block font-bangers text-xl text-yellow-400 mb-1 tracking-wide flex items-center gap-2">
              <User className="w-5 h-5 text-pink-400" />
              <span>Main Character</span>
              <span className="text-red-400 text-sm">*</span>
            </label>
            <input
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              placeholder="Example: Luna"
              className="w-full bg-gray-950 border-3 border-purple-900/80 focus:border-yellow-400 rounded-2xl px-4 py-3 text-white font-comic text-base placeholder:text-gray-500 focus:outline-none transition-colors comic-shadow-sm"
              maxLength={40}
              required
            />
          </div>

          {/* 3. Choose a Setting */}
          <div>
            <label className="block font-bangers text-xl text-yellow-400 mb-1 tracking-wide flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-400" />
              <span>Choose a Setting</span>
            </label>
            <p className="text-xs text-slate-400 font-comic mb-3">
              Where does this chapter take place?
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {SETTING_OPTIONS.map((opt) => {
                const isSelected = setting === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSetting(opt.id)}
                    className={`p-3 rounded-2xl border-2 font-comic font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer ${
                      isSelected
                        ? 'bg-purple-700 border-yellow-400 text-white comic-shadow-sm'
                        : 'bg-gray-950 border-purple-900/60 text-slate-300 hover:border-purple-600 hover:bg-gray-900'
                    }`}
                  >
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {setting === 'Custom' && (
              <div className="mt-3">
                <input
                  type="text"
                  value={customSetting}
                  onChange={(e) => setCustomSetting(e.target.value)}
                  placeholder="Enter custom setting (e.g. Floating Crystal Archipelago)"
                  className="w-full bg-gray-950 border-3 border-yellow-400 rounded-2xl px-4 py-2.5 text-white font-comic text-sm placeholder:text-gray-500 focus:outline-none transition-colors"
                  maxLength={50}
                />
              </div>
            )}
          </div>

          {/* 4. Choose the Tone */}
          <div>
            <label className="block font-bangers text-xl text-yellow-400 mb-1 tracking-wide flex items-center gap-2">
              <Smile className="w-5 h-5 text-emerald-400" />
              <span>Choose the Tone</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {TONE_OPTIONS.map((t) => {
                const isSelected = tone === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTone(t.id)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all active:scale-95 cursor-pointer ${
                      isSelected
                        ? 'border-yellow-400 bg-purple-900/90 text-white comic-shadow-sm ring-2 ring-yellow-400/50'
                        : 'border-purple-900/60 bg-gray-950 text-slate-300 hover:border-purple-600 hover:bg-gray-900'
                    }`}
                  >
                    <div className="font-bangers text-base tracking-wide flex items-center justify-between">
                      <span>{t.label}</span>
                      {isSelected && <span className="text-yellow-400">✓</span>}
                    </div>
                    <div className="text-[11px] font-comic text-slate-400 mt-0.5 line-clamp-1">
                      {t.mood}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Choose Your Art Style */}
          <div>
            <label className="block font-bangers text-xl text-yellow-400 mb-1 tracking-wide flex items-center gap-2">
              <Palette className="w-5 h-5 text-pink-400" />
              <span>Choose Your Art Style</span>
            </label>
            <p className="text-xs text-slate-400 font-comic mb-3">
              Each style defines colors, outlines, panel atmosphere, and aesthetic.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ART_STYLE_OPTIONS.map((s) => {
                const isSelected = artStyle === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setArtStyle(s.id)}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all active:scale-95 cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'border-yellow-400 bg-gradient-to-r from-purple-900 to-indigo-900 text-white comic-shadow-sm ring-2 ring-yellow-400/50'
                        : 'border-purple-900/60 bg-gray-950 text-slate-300 hover:border-purple-600 hover:bg-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bangers text-lg tracking-wide">
                      <span className="text-xl">{s.emoji}</span>
                      <span className={isSelected ? 'text-yellow-300' : 'text-white'}>
                        {s.label}
                      </span>
                    </div>
                    <p className="text-xs font-comic text-slate-400 mt-1 leading-snug">
                      {s.previewDesc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Demo Mode Toggle */}
          <div className="p-4 rounded-2xl bg-gray-950 border-2 border-purple-900/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-900/80 flex items-center justify-center text-yellow-400 font-bangers text-lg">
                🦊
              </div>
              <div>
                <p className="font-bangers text-sm sm:text-base text-white tracking-wide">
                  Instant Demo Mode (Luna and the Enchanted Forest)
                </p>
                <p className="text-xs font-comic text-gray-400">
                  Instantly populates and presents the five-panel flagship demonstration comic.
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={useDemoMode}
                onChange={(e) => setUseDemoMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
            </label>
          </div>

          {/* Primary Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isGenerating}
              className={`w-full py-5 rounded-2xl font-bangers text-2xl sm:text-3xl tracking-wider border-4 border-gray-950 comic-shadow hover:comic-shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer ${
                isGenerating
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-300 hover:to-purple-500 text-gray-950 active:scale-98'
              }`}
            >
              <Sparkles className="w-7 h-7 text-gray-950 fill-gray-950 animate-bounce" />
              <span>✨ CREATE MY COMIC</span>
            </button>
            <p className="mt-3 text-center text-xs text-slate-400 font-comic">
              Generates 5 full story panels with narration, character dialogue, custom illustrations, and PDF export.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};
