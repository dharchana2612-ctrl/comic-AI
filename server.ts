import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize Gemini Client
const geminiApiKey = process.env.GEMINI_API_KEY;
const ai = geminiApiKey ? new GoogleGenAI({
  apiKey: geminiApiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
}) : null;

// Stage 1: Gemini Flash - Generate 5-Panel Outline
async function generate_outline(params: {
  story_prompt: string;
  character_name: string;
  setting: string;
  tone: string;
  art_style: string;
}) {
  if (!ai) {
    throw new Error('GEMINI_API_KEY not configured on server');
  }

  const prompt = `You are an expert comic book director and visual storyteller.
Create a structured 5-panel comic outline for:
- Story premise: "${params.story_prompt}"
- Main character: "${params.character_name}"
- Setting: "${params.setting}"
- Tone: "${params.tone}"
- Art style: "${params.art_style}"

Requirements:
- Exactly 5 panels following a classic comic arc:
  Panel 1: Exposition / Hook / The Journey Begins
  Panel 2: Rising Discovery / Meeting the Wonder or Clue
  Panel 3: Tension / Obstacle / The Conflict
  Panel 4: Climax / Action Breakthrough / Heroic Leap
  Panel 5: Resolution / Triumph / Emotional Aftermath
- Return valid JSON matching the schema with panels array containing 5 items.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: prompt,
    config: {
      temperature: 0.7,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          panels: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                panel_number: { type: Type.INTEGER },
                title: { type: Type.STRING },
                scene_description: { type: Type.STRING },
                image_prompt: { type: Type.STRING }
              },
              required: ['panel_number', 'title', 'scene_description', 'image_prompt']
            }
          }
        },
        required: ['panels']
      }
    }
  });

  const parsed = JSON.parse(response.text || '{}');
  return parsed.panels || [];
}

// Stage 2: Gemini Pro / Flash Storyteller - Narration, Dialogue, Captions
async function generate_story(
  panels: Array<{ panel_number: number; title: string; scene_description: string; image_prompt: string }>,
  characterName: string,
  setting: string,
  tone: string
) {
  if (!ai) {
    throw new Error('GEMINI_API_KEY not configured on server');
  }

  const prompt = `You are a legendary comic book scriptwriter.
Take these 5 comic panels and write the dialogue, captions, and narration.
Character: ${characterName}
Setting: ${setting}
Tone: ${tone}

Panels outline:
${JSON.stringify(panels, null, 2)}

Requirements:
- Write punchy, cinematic captions and narration.
- Write expressive character dialogue (speech, thought, or shout).
- Maintain character consistency in name, personality, and tone throughout all 5 panels.
- Exactly 5 panels in order.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: prompt,
    config: {
      temperature: 0.7,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          comic_title: { type: Type.STRING },
          panels: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                panel_number: { type: Type.INTEGER },
                title: { type: Type.STRING },
                scene_description: { type: Type.STRING },
                image_prompt: { type: Type.STRING },
                narration: { type: Type.STRING },
                caption: { type: Type.STRING },
                dialogue: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      speaker: { type: Type.STRING },
                      text: { type: Type.STRING },
                      type: { type: Type.STRING }
                    },
                    required: ['speaker', 'text']
                  }
                }
              },
              required: ['panel_number', 'title', 'scene_description', 'narration', 'caption', 'dialogue']
            }
          }
        },
        required: ['comic_title', 'panels']
      }
    }
  });

  const parsed = JSON.parse(response.text || '{}');
  return parsed;
}

// Stage 3 & Layout Builder: Combine panels with image URLs and metadata
function build_comic_layout(
  storyData: {
    comic_title?: string;
    panels: Array<any>;
  },
  params: {
    story_prompt: string;
    character_name: string;
    setting: string;
    tone: string;
    art_style: string;
  }
) {
  const char = params.character_name || 'Hero';
  const resolvedTitle = storyData.comic_title || `${char} and the Chronicles of ${params.setting}`;

  const panelsWithImages = storyData.panels.map((p, idx) => {
    // Generate panel SVG data URL for illustration
    const panelNum = p.panel_number || (idx + 1);
    const soundEffects = ['WHISPER...', 'SPARKLE!', 'POW!', 'BURST!!', 'HARMONY ✨'];
    const soundFx = soundEffects[(panelNum - 1) % soundEffects.length];

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1e1b4b"/>
          <stop offset="60%" stop-color="#312e81"/>
          <stop offset="100%" stop-color="#030712"/>
        </linearGradient>
        <radialGradient id="sunGlow" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#ec4899" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
        </radialGradient>
        <pattern id="halftone" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="2.5" fill="#facc15" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="800" height="500" fill="url(#bgGrad)"/>
      <rect width="800" height="500" fill="url(#sunGlow)"/>
      <rect width="800" height="500" fill="url(#halftone)"/>

      <!-- Scenery silhouette -->
      <path d="M 0 450 Q 200 400 400 430 Q 600 400 800 460 L 800 500 L 0 500 Z" fill="#020617"/>
      <circle cx="400" cy="180" r="90" fill="#facc15" opacity="0.25" filter="blur(18px)"/>

      <!-- Comic sound burst -->
      <g transform="translate(630, 45) rotate(6)">
        <polygon points="0,0 130,0 140,34 10,34" fill="#facc15" stroke="#111827" stroke-width="3"/>
        <text x="70" y="24" fill="#111827" font-family="'Impact', sans-serif" font-size="18" font-weight="bold" text-anchor="middle">${soundFx}</text>
      </g>

      <!-- Frame & badges -->
      <rect x="0" y="0" width="800" height="500" fill="none" stroke="#030712" stroke-width="12"/>
      <rect x="24" y="24" width="130" height="28" rx="14" fill="#7c3aed" stroke="#111827" stroke-width="2.5"/>
      <text x="89" y="42" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">🎨 ${params.art_style}</text>
      
      <rect x="24" y="455" width="220" height="26" rx="6" fill="#111827" stroke="#ec4899" stroke-width="1.5"/>
      <text x="36" y="472" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">📍 ${params.setting} • ${char}</text>

      <rect x="460" y="455" width="316" height="26" rx="6" fill="#111827" stroke="#facc15" stroke-width="1.5"/>
      <text x="618" y="472" fill="#fef08a" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Panel ${panelNum}: ${p.title || 'Scene'}</text>
    </svg>`;

    return {
      panel_number: panelNum,
      title: p.title || `Panel ${panelNum}`,
      scene_description: p.scene_description || '',
      image_prompt: p.image_prompt || `${params.art_style} style depiction of ${char} in ${params.setting}`,
      narration: p.narration || '',
      caption: p.caption || '',
      dialogue: Array.isArray(p.dialogue) ? p.dialogue : [],
      image_url: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
    };
  });

  return {
    id: `comic-${Date.now()}`,
    title: resolvedTitle,
    prompt: params.story_prompt,
    character_name: char,
    setting: params.setting,
    tone: params.tone,
    art_style: params.art_style,
    panels: panelsWithImages,
    created_at: new Date().toISOString(),
    is_demo: false
  };
}

// --- API ROUTES ---

// Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    gemini_configured: Boolean(process.env.GEMINI_API_KEY),
    hf_configured: Boolean(process.env.HF_API_KEY)
  });
});

// Primary POST /api/generate-comic/json
app.post('/api/generate-comic/json', async (req: Request, res: Response) => {
  try {
    const { story_prompt, character_name, setting, tone, art_style } = req.body;

    if (!story_prompt || !story_prompt.trim()) {
      res.status(400).json({ error: 'Missing required field: story_prompt' });
      return;
    }

    const params = {
      story_prompt: String(story_prompt).slice(0, 1000),
      character_name: String(character_name || 'Hero').slice(0, 80),
      setting: String(setting || 'Fantasy Realm').slice(0, 80),
      tone: String(tone || 'Dramatic').slice(0, 50),
      art_style: String(art_style || 'Comic Book').slice(0, 50)
    };

    if (ai) {
      // 1. Generate outline with Gemini Flash
      const outlinePanels = await generate_outline(params);
      // 2. Generate detailed narration & dialogue with Gemini Pro
      const storyData = await generate_story(outlinePanels, params.character_name, params.setting, params.tone);
      // 3. Build comic layout
      const comic = build_comic_layout(storyData, params);

      res.json({
        success: true,
        comic,
        message: 'Comic generated successfully via Gemini AI pipeline'
      });
    } else {
      // Demo / Offline fallback if no API key provided in environment
      res.status(503).json({
        success: false,
        error: 'GEMINI_API_KEY not configured. Client will use client-side generator.',
        gemini_configured: false
      });
    }
  } catch (error: any) {
    console.error('Error generating comic:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate comic with AI',
      details: error.message || 'Unknown server error'
    });
  }
});

// POST /api/generate (Form-compatible wrapper)
app.post('/api/generate', async (req: Request, res: Response) => {
  try {
    const { story_prompt, character_name, setting, tone, art_style } = req.body;
    if (!story_prompt) {
      res.status(400).json({ error: 'story_prompt is required' });
      return;
    }

    const params = {
      story_prompt: String(story_prompt).slice(0, 1000),
      character_name: String(character_name || 'Hero').slice(0, 80),
      setting: String(setting || 'Fantasy Realm').slice(0, 80),
      tone: String(tone || 'Dramatic').slice(0, 50),
      art_style: String(art_style || 'Comic Book').slice(0, 50)
    };

    if (ai) {
      const outlinePanels = await generate_outline(params);
      const storyData = await generate_story(outlinePanels, params.character_name, params.setting, params.tone);
      const comic = build_comic_layout(storyData, params);
      res.json({ success: true, comic });
    } else {
      res.status(503).json({ error: 'GEMINI_API_KEY is not configured.' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Generation failed' });
  }
});

// POST /api/test-image (Test image generation endpoint)
app.post('/api/test-image', async (req: Request, res: Response) => {
  try {
    const { prompt, art_style } = req.body;
    if (!prompt) {
      res.status(400).json({ error: 'Image prompt is required' });
      return;
    }

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
      <rect width="800" height="500" fill="#18181b"/>
      <circle cx="400" cy="250" r="140" fill="#7c3aed" opacity="0.4"/>
      <text x="400" y="240" fill="#facc15" font-family="'Impact', sans-serif" font-size="28" font-weight="bold" text-anchor="middle">TEST IMAGE GENERATED</text>
      <text x="400" y="280" fill="#ffffff" font-family="sans-serif" font-size="14" text-anchor="middle">Style: ${art_style || 'Comic Book'}</text>
    </svg>`;

    res.json({
      success: true,
      prompt,
      image_url: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Interactive API Documentation / Swagger spec endpoint
app.get('/api/docs/spec', (_req: Request, res: Response) => {
  res.json({
    openapi: '3.0.0',
    info: {
      title: 'ComicCraft AI Comic Story Creator API',
      version: '1.0.0',
      description: 'API for generating 5-panel comic storylines, AI illustrations, and PDF layouts.'
    },
    paths: {
      '/api/generate-comic/json': {
        post: {
          summary: 'Generate full 5-panel comic',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['story_prompt'],
                  properties: {
                    story_prompt: { type: 'string', example: 'A brave fox exploring an enchanted forest.' },
                    character_name: { type: 'string', example: 'Luna' },
                    setting: { type: 'string', example: 'Forest' },
                    tone: { type: 'string', example: 'Dramatic' },
                    art_style: { type: 'string', example: 'Anime' }
                  }
                }
              }
            }
          },
          responses: {
            '200': { description: 'Comic story generated successfully with 5 panels' },
            '400': { description: 'Validation error' },
            '500': { description: 'AI generation error' }
          }
        }
      },
      '/api/test-image': {
        post: {
          summary: 'Test image generator independently',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['prompt'],
                  properties: {
                    prompt: { type: 'string' },
                    art_style: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            '200': { description: 'Generated test image' }
          }
        }
      }
    }
  });
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Mount Vite dev middlewares
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 ComicCraft server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
