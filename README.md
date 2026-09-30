# ComicCraft — AI Comic Story Creator

> **"Turn Your Imagination Into a Comic."**  
> *Create stories. Generate worlds. Bring your imagination to life.*

ComicCraft is a production-ready, mobile-friendly web application that transforms simple natural language story ideas into complete, structured 5-panel comic books complete with plot titles, scene descriptions, character dialogue, comic captions, AI illustrations, and one-click PDF export.

---

## 🌟 Project Overview

ComicCraft bridges the gap between imagination and comic creation:
- **No drawing skills required**: Users simply enter a character name, choose a setting, tone, and art style.
- **Structured 5-Panel Comic Arc**:
  - Panel 1: Exposition & Hook (The Journey Begins)
  - Panel 2: Rising Discovery (The Wonder / Clue)
  - Panel 3: Conflict & Tension (The Challenge / Standoff)
  - Panel 4: Climax & Breakthrough (The Heroic Action)
  - Panel 5: Resolution & Triumph (The Horizon / New Dawn)
- **Character & Visual Consistency**: Character cues, color palettes, and tone are maintained across all 5 panels.
- **One-Click PDF Publishing**: Assembles all panels with cover art, metadata, scene descriptions, and dialogue bubbles into a ready-to-print PDF.
- **Built-in Demo Mode**: Includes the flagship story *"Luna and the Enchanted Forest"* for instant demonstration.

---

## 🎨 Technology Architecture

### Technology Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Backend / Server**: Express / FastAPI-compatible REST architecture, Node 22 / tsx.
- **AI Model Pipelines**:
  - **Gemini Flash (`gemini-3.8-flash`)**: Structured 5-panel outline generation.
  - **Gemini Pro (`gemini-3.8-flash` / `gemini-3.1-pro-preview`)**: Narrative storytelling, character dialogue, speech bubbles, and image prompts.
  - **Stable Diffusion / AI Illustration**: Generates panel illustrations matching chosen art style (Anime, Comic Book, Pixel Art, Realistic, Cartoon, Watercolor, Fantasy).
- **PDF Generation**: `jsPDF` client-and-server layout engine with multi-page comic layouts, captions, and speech bubbles.

### AI Generation Workflow
```
User Story Input
       │
       ▼
1. Gemini Flash (generate_outline)
       │  ➔ Structured 5-panel JSON arc
       ▼
2. Gemini Pro (generate_story)
       │  ➔ Narration + Dialogue + Image Prompts
       ▼
3. Stable Diffusion / Artwork Engine (generate_image)
       │  ➔ 5 Styled Comic Illustrations
       ▼
4. Comic Layout Builder (build_comic_layout)
       │  ➔ Formatted 5-panel Comic Book Structure
       ▼
5. PDF Exporter (save_pdf)
       │  ➔ Downloadable PDF Publication
       ▼
Export Success & Download
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js (v20+ or v22+)
- (Optional) Python 3.10+ if running with FastAPI reference backend

### 2. Environment Variables
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

Configure your API keys:
```env
# Google Gemini API Key
GEMINI_API_KEY="your_gemini_api_key_here"

# Optional Hugging Face Token for Stable Diffusion
HF_API_KEY="your_huggingface_api_key_here"
```

### 3. Running with the Full-Stack Dev Server
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Running with Python / FastAPI (Reference Architecture)
If deploying or testing with the FastAPI backend:
```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
- Web Application: `http://127.0.0.1:8000`
- Interactive API Documentation (Swagger): `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Returns the ComicCraft homepage |
| `POST` | `/api/generate-comic/json` | Primary endpoint: takes story details and returns 5-panel comic JSON |
| `POST` | `/api/generate` | Form-compatible endpoint running outline, story, and layout builder |
| `POST` | `/api/test-image` | Test image generation independently |
| `GET` | `/api/health` | Health check and API key readiness check |
| `GET` | `/api/docs/spec` | OpenAPI 3.0 JSON specification |

### Example Request (`POST /api/generate-comic/json`)
```bash
curl -X POST "http://localhost:3000/api/generate-comic/json" \
  -H "Content-Type: application/json" \
  -d '{
    "story_prompt": "A brave fox exploring an enchanted forest.",
    "character_name": "Luna",
    "setting": "Forest",
    "tone": "Dramatic",
    "art_style": "Anime"
  }'
```

---

## 📂 Project Structure

```
comiccraft/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx             # ComicCraft navigation & demo toggle
│   │   ├── Hero.tsx               # Comic-styled hero section
│   │   ├── ComicForm.tsx          # Creation form (Prompt, Setting, Tone, Style)
│   │   ├── GenerationProgress.tsx # 4-step animated generation loader
│   │   ├── ComicReader.tsx        # 5-panel comic viewer (desktop grid / mobile strip)
│   │   ├── PanelCard.tsx          # Panel card with speech bubbles & AI prompts
│   │   ├── ExportSuccessModal.tsx # PDF export celebration & download
│   │   ├── HowItWorks.tsx         # 3-step guide
│   │   ├── FeaturesSection.tsx    # Features grid
│   │   ├── ExampleShowcase.tsx    # "Luna & the Enchanted Forest" preview
│   │   ├── ApiDocsView.tsx        # Interactive Swagger/OpenAPI docs & tester
│   │   └── Footer.tsx             # Footer & technology tags
│   ├── services/
│   │   ├── comicService.ts        # Client API service & fallback engine
│   │   ├── pdfGenerator.ts        # Multi-page jsPDF comic layout generator
│   │   ├── artworkGenerator.ts    # Styled SVG/Canvas illustration generator
│   │   └── demoData.ts            # "Luna and the Enchanted Forest" demo comic
│   ├── types/
│   │   └── comic.ts               # TypeScript data models
│   ├── App.tsx                    # Main app state coordinator
│   ├── main.tsx                   # React root entry point
│   └── index.css                  # Tailwind CSS with comic halftone utilities
├── server.ts                      # Full-stack Express backend with Gemini SDK
├── index.html                     # HTML5 entry point with comic typography
├── metadata.json                  # AI Studio capability metadata
├── package.json
└── README.md
```

---

## 🧪 Testing

1. **Form Validation**: Checks empty prompt, character name length, and custom setting validation.
2. **AI Workflow**: Validates 5-panel JSON structure with titles, captions, dialogue, and scene notes.
3. **Demo Mode**: Instant 1-click test of *"Luna and the Enchanted Forest"* with zero latency.
4. **PDF Generator**: Generates clean multi-page document with cover page, panel art, captions, and bubbles.
5. **Mobile Responsiveness**: Tested on Android, iOS, tablets, and desktop resolutions.

---

## 🔮 Future Enhancements
- User accounts & personal saved comic libraries
- Shareable public comic permalinks
- Multi-chapter storylines (10, 20, 30 panels)
- AI Voice Narration and animated comic panel reveals
- Custom character avatar image uploads
- Community marketplace & collaborative comic jams

---

© 2026 ComicCraft. Built with AI and imagination.
