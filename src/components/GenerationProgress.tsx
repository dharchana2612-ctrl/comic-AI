import React from 'react';
import { Sparkles, CheckCircle2, Circle, Loader2, BookOpen } from 'lucide-react';
import { GenerationProgressStep } from '../types/comic';

interface GenerationProgressProps {
  currentStep?: GenerationProgressStep;
  characterName: string;
  storyPrompt: string;
}

export const GenerationProgress: React.FC<GenerationProgressProps> = ({
  currentStep,
  characterName,
  storyPrompt
}) => {
  const activeStepNum = currentStep ? currentStep.step : 1;

  const stepsList = [
    {
      num: 1,
      label: 'Step 1/4 — Creating your story outline...',
      detail: 'Gemini Flash analyzing premise & structuring 5-act narrative arc'
    },
    {
      num: 2,
      label: 'Step 2/4 — Writing narration and dialogue...',
      detail: 'Gemini Pro crafting character speech bubbles, captions & sound FX'
    },
    {
      num: 3,
      label: 'Step 3/4 — Illustrating your comic panels...',
      detail: 'Generating 5 stylized comic illustrations with visual consistency'
    },
    {
      num: 4,
      label: 'Step 4/4 — Assembling your comic...',
      detail: 'Binding dialogue tags, visual frames & preparing PDF exporter'
    }
  ];

  const percentage = Math.min(100, Math.max(15, activeStepNum * 25));

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="bg-gray-900 border-4 border-gray-950 rounded-3xl p-8 sm:p-10 comic-shadow-lg relative overflow-hidden">
        
        {/* Animated Halftone Ambient Background */}
        <div className="absolute inset-0 comic-halftone opacity-40 pointer-events-none" />

        {/* Comic sound effect / spark burst */}
        <div className="relative inline-block mb-6">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-purple-600 via-pink-500 to-yellow-400 p-1 comic-shadow rotate-3 animate-pulse">
            <div className="w-full h-full bg-gray-950 rounded-[22px] flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
          </div>
          <span className="absolute -top-3 -right-6 bg-pink-600 text-white font-bangers text-sm px-3 py-1 rounded-lg border-2 border-gray-950 rotate-12 comic-shadow-sm">
            CRAFTING!
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-bangers text-3xl sm:text-4xl text-white tracking-wider mb-2">
          CREATING YOUR COMIC...
        </h2>
        <p className="text-sm font-comic text-purple-300 max-w-md mx-auto mb-6">
          Bringing <span className="text-yellow-300 font-bold">{characterName}</span>'s adventure to life across 5 custom illustrated panels.
        </p>

        {/* Story Snippet Card */}
        <div className="mb-8 p-3.5 rounded-2xl bg-gray-950/80 border-2 border-purple-900/60 text-left">
          <div className="flex items-center gap-2 text-xs font-bangers text-yellow-400 mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            STORY PREMISE:
          </div>
          <p className="text-xs font-comic text-slate-300 italic line-clamp-2">
            "{storyPrompt}"
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-xs font-comic font-bold text-gray-400 mb-2">
            <span className="text-yellow-400 font-bangers tracking-wider text-sm">
              PROGRESS
            </span>
            <span>{percentage}% COMPLETE</span>
          </div>
          <div className="h-4 bg-gray-950 rounded-full border-2 border-purple-900/80 p-0.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 rounded-full transition-all duration-500 relative"
              style={{ width: `${percentage}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Step List */}
        <div className="space-y-3.5 text-left">
          {stepsList.map((step) => {
            const isCompleted = activeStepNum > step.num;
            const isCurrent = activeStepNum === step.num;

            return (
              <div
                key={step.num}
                className={`p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${
                  isCurrent
                    ? 'bg-purple-950/90 border-yellow-400 comic-shadow-sm ring-1 ring-yellow-400/40'
                    : isCompleted
                    ? 'bg-gray-950/90 border-emerald-500/60'
                    : 'bg-gray-950/40 border-gray-800 opacity-60'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-950" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-600" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`font-bangers text-base tracking-wide ${
                      isCurrent
                        ? 'text-yellow-300'
                        : isCompleted
                        ? 'text-white'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs font-comic text-slate-400 mt-0.5">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-xs font-comic text-gray-500 italic">
          Tip: Each panel is generated with consistent characters, custom speech bubbles, and print-ready PDF styling.
        </p>

      </div>
    </div>
  );
};
