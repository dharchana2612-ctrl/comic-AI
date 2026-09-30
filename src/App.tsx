import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ComicForm } from './components/ComicForm';
import { GenerationProgress } from './components/GenerationProgress';
import { ComicReader } from './components/ComicReader';
import { ExportSuccessModal } from './components/ExportSuccessModal';
import { HowItWorks } from './components/HowItWorks';
import { FeaturesSection } from './components/FeaturesSection';
import { ExampleShowcase } from './components/ExampleShowcase';
import { ApiDocsView } from './components/ApiDocsView';
import { Footer } from './components/Footer';
import { ComicGenerationRequest, ComicStory, GenerationProgressStep } from './types/comic';
import { generateComic } from './services/comicService';
import { DEMO_COMIC } from './services/demoData';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'create' | 'generating' | 'preview' | 'docs'>('home');
  const [currentComic, setCurrentComic] = useState<ComicStory | null>(DEMO_COMIC);
  const [currentStep, setCurrentStep] = useState<GenerationProgressStep | undefined>(undefined);
  const [activeRequest, setActiveRequest] = useState<ComicGenerationRequest | null>(null);
  const [exportModal, setExportModal] = useState<{ filename: string; pdfUrl: string } | null>(null);

  // Quick Demo: load Luna demo comic in reader
  const handleQuickDemo = () => {
    setCurrentComic(DEMO_COMIC);
    setCurrentView('preview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start Creating: scroll down or switch view
  const handleStartCreating = () => {
    setCurrentView('create');
    setTimeout(() => {
      document.getElementById('creator-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Submit comic generation
  const handleGenerateComic = async (request: ComicGenerationRequest) => {
    setActiveRequest(request);
    setCurrentView('generating');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const generated = await generateComic(request, (step) => {
        setCurrentStep(step);
      });

      setCurrentComic(generated);
      setCurrentView('preview');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Generation failed:', err);
      // Fallback to demo comic with user preferences applied
      setCurrentComic({
        ...DEMO_COMIC,
        character_name: request.character_name,
        prompt: request.story_prompt,
        art_style: request.art_style,
        tone: request.tone
      });
      setCurrentView('preview');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      
      {/* Top Sticky Navigation */}
      <Navbar
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentView={currentView}
        onQuickDemo={handleQuickDemo}
      />

      <main className="flex-1">
        {/* VIEW: GENERATING */}
        {currentView === 'generating' && (
          <GenerationProgress
            currentStep={currentStep}
            characterName={activeRequest?.character_name || 'Hero'}
            storyPrompt={activeRequest?.story_prompt || ''}
          />
        )}

        {/* VIEW: COMIC PREVIEW READER */}
        {currentView === 'preview' && currentComic && (
          <ComicReader
            comic={currentComic}
            onCreateAnother={() => {
              setCurrentView('create');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExportSuccess={(filename, pdfUrl) => {
              setExportModal({ filename, pdfUrl });
            }}
          />
        )}

        {/* VIEW: API DOCUMENTATION */}
        {currentView === 'docs' && (
          <ApiDocsView
            onBack={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW: HOME & CREATE */}
        {(currentView === 'home' || currentView === 'create') && (
          <>
            {/* Hero Section */}
            <Hero
              onStartCreating={handleStartCreating}
              onExploreDemo={handleQuickDemo}
            />

            {/* Comic Creation Form Section */}
            <section className="py-12 sm:py-20 relative">
              <ComicForm
                onSubmit={handleGenerateComic}
                isGenerating={false}
              />
            </section>

            {/* How It Works Section */}
            <HowItWorks />

            {/* Features Section */}
            <FeaturesSection />

            {/* Flagship Example Showcase */}
            <ExampleShowcase
              onLoadExample={() => {
                setCurrentView('create');
                setTimeout(() => {
                  document.getElementById('creator-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              onPreviewDemo={handleQuickDemo}
            />
          </>
        )}
      </main>

      {/* Export Success Modal */}
      {exportModal && (
        <ExportSuccessModal
          filename={exportModal.filename}
          pdfUrl={exportModal.pdfUrl}
          onClose={() => setExportModal(null)}
          onCreateAnother={() => {
            setExportModal(null);
            setCurrentView('create');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
