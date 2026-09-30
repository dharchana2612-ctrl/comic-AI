import React, { useState } from 'react';
import { Code, Terminal, Check, Copy, Play, ArrowLeft, Layers, Send } from 'lucide-react';

interface ApiDocsViewProps {
  onBack: () => void;
}

export const ApiDocsView: React.FC<ApiDocsViewProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'endpoints' | 'tester'>('endpoints');
  const [testPrompt, setTestPrompt] = useState('A brave fox exploring an enchanted forest.');
  const [testChar, setTestChar] = useState('Luna');
  const [testSetting, setTestSetting] = useState('Forest');
  const [testArtStyle, setTestArtStyle] = useState('Anime');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const runLiveTest = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/generate-comic/json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          story_prompt: testPrompt,
          character_name: testChar,
          setting: testSetting,
          tone: 'Dramatic',
          art_style: testArtStyle
        })
      });

      const data = await res.json();
      setTestResult(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setTestResult(JSON.stringify({ error: err.message || 'API request error' }, null, 2));
    } finally {
      setIsTesting(false);
    }
  };

  const curlExample = `curl -X POST "http://localhost:3000/api/generate-comic/json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "story_prompt": "A brave fox exploring an enchanted forest.",
    "character_name": "Luna",
    "setting": "Forest",
    "tone": "Dramatic",
    "art_style": "Anime"
  }'`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-slate-300 font-comic font-bold text-sm border-2 border-purple-900/60 comic-shadow-sm transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to App</span>
        </button>

        <div className="flex items-center bg-gray-900 p-1 rounded-xl border border-purple-900/60">
          <button
            onClick={() => setActiveTab('endpoints')}
            className={`px-4 py-1.5 rounded-lg text-xs font-comic font-bold transition-colors ${
              activeTab === 'endpoints' ? 'bg-purple-700 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            API Specifications
          </button>
          <button
            onClick={() => setActiveTab('tester')}
            className={`px-4 py-1.5 rounded-lg text-xs font-comic font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === 'tester' ? 'bg-purple-700 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Play className="w-3 h-3 text-emerald-400" />
            Interactive Tester
          </button>
        </div>
      </div>

      {/* Header Card */}
      <div className="bg-gray-900 border-4 border-gray-950 rounded-3xl p-6 sm:p-8 comic-shadow-lg mb-8">
        <div className="flex items-center gap-3 text-xs font-bangers text-yellow-400 uppercase tracking-wider mb-1">
          <Terminal className="w-4 h-4" />
          RESTful API & Swagger Compatible
        </div>
        <h1 className="font-bangers text-3xl sm:text-4xl text-white tracking-wide">
          COMICCRAFT AI DEVELOPER DOCUMENTATION
        </h1>
        <p className="mt-2 text-sm font-comic text-slate-300">
          Backend API endpoints designed for integration with FastAPI, Express, Google Gemini, and Stable Diffusion pipelines.
        </p>
      </div>

      {activeTab === 'endpoints' ? (
        <div className="space-y-8">
          
          {/* Endpoint 1 */}
          <div className="bg-gray-900 border-3 border-gray-950 rounded-2xl p-6 comic-shadow">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-emerald-600 text-white font-bangers text-sm px-3 py-1 rounded-lg">
                POST
              </span>
              <code className="text-yellow-400 font-mono text-base font-bold">
                /api/generate-comic/json
              </code>
            </div>
            <p className="text-sm font-comic text-slate-300 mb-4">
              Executes the full 5-panel comic generation workflow. Takes story prompt, character name, setting, tone, and art style, then orchestrates Gemini Flash for structure, Gemini Pro for dialogue/narration, and illustrations.
            </p>

            {/* Request Schema */}
            <h4 className="font-bangers text-base text-purple-300 tracking-wide mb-2">
              REQUEST JSON SCHEMA
            </h4>
            <div className="bg-gray-950 rounded-xl p-4 border border-purple-900/60 font-mono text-xs text-slate-300 mb-4 overflow-x-auto">
{`{
  "story_prompt": "string (required, max 1000 chars)",
  "character_name": "string (required, max 80 chars)",
  "setting": "string (required, e.g. Forest, Space, City)",
  "tone": "string (Dramatic, Adventurous, Funny, etc.)",
  "art_style": "string (Anime, Comic Book, Pixel Art, etc.)"
}`}
            </div>

            {/* Response Schema */}
            <h4 className="font-bangers text-base text-purple-300 tracking-wide mb-2">
              RESPONSE 200 OK
            </h4>
            <div className="bg-gray-950 rounded-xl p-4 border border-purple-900/60 font-mono text-xs text-slate-300 overflow-x-auto">
{`{
  "success": true,
  "comic": {
    "id": "comic-1718000000",
    "title": "Luna and the Enchanted Forest",
    "prompt": "A brave fox exploring an enchanted forest.",
    "character_name": "Luna",
    "setting": "Forest",
    "tone": "Dramatic",
    "art_style": "Anime",
    "panels": [
      {
        "panel_number": 1,
        "title": "Into the Emerald Unknown",
        "scene_description": "Luna enters the whispering woods...",
        "image_prompt": "Anime-style brave fox named Luna...",
        "narration": "Beyond the forgotten border stones...",
        "caption": "The Whispering Woods had turned away travelers...",
        "dialogue": [
          { "speaker": "Luna", "text": "One step.", "type": "thought" }
        ],
        "image_url": "data:image/svg+xml;utf8,..."
      }
      // ... panels 2, 3, 4, 5
    ]
  }
}`}
            </div>
          </div>

          {/* Endpoint 2 */}
          <div className="bg-gray-900 border-3 border-gray-950 rounded-2xl p-6 comic-shadow">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-emerald-600 text-white font-bangers text-sm px-3 py-1 rounded-lg">
                POST
              </span>
              <code className="text-yellow-400 font-mono text-base font-bold">
                /api/test-image
              </code>
            </div>
            <p className="text-sm font-comic text-slate-300 mb-4">
              Allows independent testing of the image generation pipeline and custom prompts without running the full 5-panel story generator.
            </p>
            <div className="bg-gray-950 rounded-xl p-4 border border-purple-900/60 font-mono text-xs text-slate-300 overflow-x-auto">
{`// Request
{
  "prompt": "Anime fox with blue scarf in glowing forest",
  "art_style": "Anime"
}

// Response
{
  "success": true,
  "prompt": "Anime fox with blue scarf...",
  "image_url": "data:image/svg+xml;utf8,..."
}`}
            </div>
          </div>

          {/* cURL Example */}
          <div className="bg-gray-900 border-3 border-gray-950 rounded-2xl p-6 comic-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bangers text-xl text-yellow-400 tracking-wide">
                CURL EXAMPLE REQUEST
              </h3>
              <button
                onClick={() => handleCopy(curlExample, 1)}
                className="px-3 py-1 rounded-lg bg-purple-900 hover:bg-purple-800 text-white font-comic text-xs flex items-center gap-1.5 transition-colors"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === 1 ? 'Copied' : 'Copy cURL'}</span>
              </button>
            </div>
            <pre className="bg-gray-950 rounded-xl p-4 border border-purple-900/60 font-mono text-xs text-emerald-300 overflow-x-auto">
              {curlExample}
            </pre>
          </div>

        </div>
      ) : (
        /* Interactive Tester */
        <div className="bg-gray-900 border-3 border-gray-950 rounded-2xl p-6 comic-shadow space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bangers text-2xl text-white tracking-wide">
                LIVE ENDPOINT TESTER
              </h3>
              <p className="text-xs font-comic text-slate-400">
                Execute a live request to <code>POST /api/generate-comic/json</code> directly from this browser.
              </p>
            </div>
            <button
              onClick={runLiveTest}
              disabled={isTesting}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-950 font-bangers text-lg tracking-wide border-2 border-gray-950 comic-shadow-sm flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4 text-gray-950" />
              <span>{isTesting ? 'Sending Request...' : 'Send Live Request'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-comic font-bold text-gray-300 mb-1">
                Story Prompt
              </label>
              <input
                type="text"
                value={testPrompt}
                onChange={(e) => setTestPrompt(e.target.value)}
                className="w-full bg-gray-950 border border-purple-900 rounded-xl p-2.5 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-comic font-bold text-gray-300 mb-1">
                Character Name
              </label>
              <input
                type="text"
                value={testChar}
                onChange={(e) => setTestChar(e.target.value)}
                className="w-full bg-gray-950 border border-purple-900 rounded-xl p-2.5 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-comic font-bold text-gray-300 mb-1">
                Setting
              </label>
              <input
                type="text"
                value={testSetting}
                onChange={(e) => setTestSetting(e.target.value)}
                className="w-full bg-gray-950 border border-purple-900 rounded-xl p-2.5 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-comic font-bold text-gray-300 mb-1">
                Art Style
              </label>
              <input
                type="text"
                value={testArtStyle}
                onChange={(e) => setTestArtStyle(e.target.value)}
                className="w-full bg-gray-950 border border-purple-900 rounded-xl p-2.5 text-xs text-white font-mono"
              />
            </div>
          </div>

          {/* Test Response Output */}
          {testResult && (
            <div>
              <h4 className="font-bangers text-base text-yellow-400 tracking-wide mb-2">
                SERVER RESPONSE JSON:
              </h4>
              <pre className="bg-gray-950 border border-purple-900/60 rounded-xl p-4 text-xs font-mono text-emerald-300 max-h-96 overflow-y-auto">
                {testResult}
              </pre>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
