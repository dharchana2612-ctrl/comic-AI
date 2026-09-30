import { ArtStyleOption } from '../types/comic';

interface ArtConfig {
  characterName: string;
  setting: string;
  panelNumber: number;
  artStyle: ArtStyleOption;
  sceneTitle: string;
  mood: string;
}

// Generates an SVG Data URI representing the comic panel scene
export function generateComicPanelArtwork(config: ArtConfig): string {
  const { characterName, setting, panelNumber, artStyle, sceneTitle } = config;

  // Style color palettes and themes
  const styleThemes: Record<ArtStyleOption, {
    bg1: string;
    bg2: string;
    accent: string;
    detail: string;
    filter: string;
    badgeBg: string;
    badgeText: string;
  }> = {
    'Anime': {
      bg1: '#1e1b4b',
      bg2: '#4338ca',
      accent: '#f43f5e',
      detail: '#38bdf8',
      filter: 'url(#animeGlow)',
      badgeBg: '#4f46e5',
      badgeText: '#ffffff'
    },
    'Comic Book': {
      bg1: '#18181b',
      bg2: '#b91c1c',
      accent: '#facc15',
      detail: '#ffffff',
      filter: 'url(#halftoneDots)',
      badgeBg: '#dc2626',
      badgeText: '#fef08a'
    },
    'Pixel Art': {
      bg1: '#0f172a',
      bg2: '#065f46',
      accent: '#10b981',
      detail: '#a7f3d0',
      filter: 'url(#pixelate)',
      badgeBg: '#059669',
      badgeText: '#ecfdf5'
    },
    'Realistic': {
      bg1: '#090d16',
      bg2: '#1e293b',
      accent: '#e2e8f0',
      detail: '#94a3b8',
      filter: 'url(#cinematicLighting)',
      badgeBg: '#334155',
      badgeText: '#f8fafc'
    },
    'Cartoon': {
      bg1: '#0284c7',
      bg2: '#f59e0b',
      accent: '#ec4899',
      detail: '#fef08a',
      filter: 'none',
      badgeBg: '#e11d48',
      badgeText: '#ffffff'
    },
    'Watercolor': {
      bg1: '#312e81',
      bg2: '#701a75',
      accent: '#f472b6',
      detail: '#fed7aa',
      filter: 'url(#watercolorWash)',
      badgeBg: '#9d174d',
      badgeText: '#fce7f3'
    },
    'Fantasy': {
      bg1: '#2e1065',
      bg2: '#581c87',
      accent: '#c084fc',
      detail: '#fbbf24',
      filter: 'url(#magicAura)',
      badgeBg: '#7e22ce',
      badgeText: '#fae8ff'
    }
  };

  const theme = styleThemes[artStyle] || styleThemes['Comic Book'];

  // Setting visual accents
  const lowerSetting = (setting || '').toLowerCase();
  let backdropElements = '';
  let foregroundElements = '';

  if (lowerSetting.includes('forest')) {
    backdropElements = `
      <!-- Enchanted Trees & Canopy -->
      <path d="M 60 500 L 90 280 L 120 500 Z" fill="#064e3b" opacity="0.8"/>
      <path d="M 140 500 L 180 220 L 220 500 Z" fill="#047857" opacity="0.9"/>
      <path d="M 520 500 L 580 200 L 640 500 Z" fill="#064e3b" opacity="0.8"/>
      <path d="M 620 500 L 670 260 L 720 500 Z" fill="#047857" opacity="0.9"/>
      <!-- Glowing Flora -->
      <circle cx="150" cy="380" r="18" fill="#34d399" opacity="0.6" filter="blur(6px)"/>
      <circle cx="580" cy="360" r="22" fill="#a7f3d0" opacity="0.5" filter="blur(8px)"/>
      <circle cx="280" cy="420" r="12" fill="#6ee7b7" opacity="0.7"/>
      <circle cx="490" cy="440" r="10" fill="#fcd34d" opacity="0.8"/>
    `;
    foregroundElements = `
      <!-- Foliage Vignette -->
      <path d="M 0 500 Q 150 420 300 480 Q 500 440 800 500 L 800 500 L 0 500 Z" fill="#022c22"/>
    `;
  } else if (lowerSetting.includes('space')) {
    backdropElements = `
      <!-- Distant Nebula and Rings -->
      <ellipse cx="600" cy="180" rx="140" ry="80" fill="#a855f7" opacity="0.3" filter="blur(25px)"/>
      <ellipse cx="200" cy="280" rx="180" ry="90" fill="#3b82f6" opacity="0.25" filter="blur(30px)"/>
      <!-- Planets -->
      <circle cx="620" cy="150" r="45" fill="#f97316"/>
      <ellipse cx="620" cy="150" rx="80" ry="16" fill="none" stroke="#fed7aa" stroke-width="6" opacity="0.8"/>
      <circle cx="160" cy="120" r="24" fill="#06b6d4" opacity="0.8"/>
    `;
    foregroundElements = `
      <!-- Asteroid or Deck -->
      <path d="M 0 460 Q 200 430 400 450 Q 600 430 800 470 L 800 500 L 0 500 Z" fill="#1e1b4b"/>
    `;
  } else if (lowerSetting.includes('city') || lowerSetting.includes('school')) {
    backdropElements = `
      <!-- Skyline / Architecture -->
      <rect x="80" y="160" width="110" height="340" fill="#1e293b" opacity="0.85"/>
      <rect x="220" y="110" width="130" height="390" fill="#0f172a" opacity="0.95"/>
      <rect x="450" y="130" width="140" height="370" fill="#1e293b" opacity="0.9"/>
      <rect x="610" y="180" width="120" height="320" fill="#334155" opacity="0.8"/>
      <!-- Window Lights -->
      <rect x="100" y="200" width="12" height="18" fill="#fef08a" opacity="0.8"/>
      <rect x="130" y="240" width="12" height="18" fill="#fef08a" opacity="0.8"/>
      <rect x="250" y="160" width="16" height="22" fill="#38bdf8" opacity="0.9"/>
      <rect x="290" y="220" width="16" height="22" fill="#fef08a" opacity="0.7"/>
      <rect x="480" y="180" width="15" height="20" fill="#f43f5e" opacity="0.8"/>
      <rect x="530" y="250" width="15" height="20" fill="#fef08a" opacity="0.85"/>
    `;
    foregroundElements = `
      <rect x="0" y="470" width="800" height="30" fill="#020617"/>
      <line x1="0" y1="475" x2="800" y2="475" stroke="#facc15" stroke-dasharray="24, 20" stroke-width="3"/>
    `;
  } else if (lowerSetting.includes('beach')) {
    backdropElements = `
      <!-- Ocean and Sunset Glow -->
      <ellipse cx="400" cy="300" rx="350" ry="120" fill="#0284c7" opacity="0.4" filter="blur(20px)"/>
      <path d="M 0 350 Q 200 330 400 350 Q 600 330 800 350 L 800 440 L 0 440 Z" fill="#0369a1"/>
      <path d="M 0 390 Q 200 375 400 390 Q 600 375 800 390 L 800 450 L 0 450 Z" fill="#0284c7" opacity="0.7"/>
    `;
    foregroundElements = `
      <path d="M 0 440 Q 250 410 500 430 Q 700 410 800 440 L 800 500 L 0 500 Z" fill="#ca8a04"/>
    `;
  } else {
    // Castle / Village / Fantasy default
    backdropElements = `
      <!-- Ancient Citadel Towers & Peaks -->
      <path d="M 120 500 L 160 190 L 200 190 L 240 500 Z" fill="#312e81" opacity="0.85"/>
      <path d="M 150 190 L 180 130 L 210 190 Z" fill="#4338ca"/>
      <path d="M 540 500 L 590 170 L 650 170 L 700 500 Z" fill="#312e81" opacity="0.85"/>
      <path d="M 580 170 L 620 110 L 660 170 Z" fill="#4338ca"/>
      <circle cx="400" cy="180" r="70" fill="#fbbf24" opacity="0.2" filter="blur(20px)"/>
    `;
    foregroundElements = `
      <path d="M 0 460 Q 400 430 800 460 L 800 500 L 0 500 Z" fill="#0f172a"/>
    `;
  }

  // Character Silhouettes & Action Stances based on panel number
  let characterPose = '';
  if (panelNumber === 1) {
    // Discovery / Entering scene pose (walking forward)
    characterPose = `
      <!-- Character: Walking into the unknown -->
      <g transform="translate(360, 270)">
        <!-- Aura glow -->
        <circle cx="40" cy="70" r="55" fill="${theme.accent}" opacity="0.25" filter="blur(16px)"/>
        <!-- Cape / Scarf / Tail flutter -->
        <path d="M 20 60 Q -25 70 -40 100 Q -10 90 25 75 Z" fill="${theme.accent}"/>
        <!-- Body / Torso -->
        <rect x="25" y="45" width="30" height="50" rx="10" fill="#ffffff" stroke="#111827" stroke-width="4"/>
        <!-- Head -->
        <circle cx="40" cy="30" r="22" fill="#ffffff" stroke="#111827" stroke-width="4"/>
        <!-- Fox/Animal Ears or Hair tufts -->
        <polygon points="26,14 18,-4 36,10" fill="${theme.accent}" stroke="#111827" stroke-width="3"/>
        <polygon points="44,10 62,-4 54,14" fill="${theme.accent}" stroke="#111827" stroke-width="3"/>
        <!-- Expressive Eyes -->
        <circle cx="34" cy="28" r="4" fill="#111827"/>
        <circle cx="46" cy="28" r="4" fill="#111827"/>
        <circle cx="35" cy="26" r="1.5" fill="#ffffff"/>
        <circle cx="47" cy="26" r="1.5" fill="#ffffff"/>
        <!-- Smile -->
        <path d="M 36 37 Q 40 41 44 37" fill="none" stroke="#111827" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Legs in motion -->
        <line x1="32" y1="95" x2="22" y2="140" stroke="#111827" stroke-width="6" stroke-linecap="round"/>
        <line x1="48" y1="95" x2="60" y2="135" stroke="#111827" stroke-width="6" stroke-linecap="round"/>
      </g>
    `;
  } else if (panelNumber === 2) {
    // Investigation / Looking at wonder
    characterPose = `
      <g transform="translate(340, 260)">
        <circle cx="40" cy="70" r="60" fill="${theme.detail}" opacity="0.3" filter="blur(18px)"/>
        <!-- Wonder item/Orb glowing in front -->
        <circle cx="140" cy="60" r="20" fill="${theme.accent}" filter="blur(4px)"/>
        <circle cx="140" cy="60" r="12" fill="#ffffff"/>
        <!-- Light rays from discovery -->
        <line x1="140" y1="60" x2="190" y2="20" stroke="${theme.accent}" stroke-width="3" stroke-dasharray="6,4" opacity="0.8"/>
        <line x1="140" y1="60" x2="200" y2="90" stroke="${theme.accent}" stroke-width="3" stroke-dasharray="6,4" opacity="0.8"/>
        <!-- Character crouching in awe -->
        <path d="M 20 60 Q -20 80 -30 110 Q 0 95 25 75 Z" fill="${theme.accent}"/>
        <rect x="25" y="55" width="34" height="42" rx="10" fill="#ffffff" stroke="#111827" stroke-width="4"/>
        <circle cx="42" cy="38" r="22" fill="#ffffff" stroke="#111827" stroke-width="4"/>
        <!-- Ears -->
        <polygon points="28,22 20,4 38,18" fill="${theme.accent}" stroke="#111827" stroke-width="3"/>
        <polygon points="46,18 64,4 56,22" fill="${theme.accent}" stroke="#111827" stroke-width="3"/>
        <!-- Wide awe eyes -->
        <circle cx="38" cy="36" r="6" fill="#111827"/>
        <circle cx="50" cy="36" r="6" fill="#111827"/>
        <circle cx="39" cy="34" r="2.5" fill="#ffffff"/>
        <circle cx="51" cy="34" r="2.5" fill="#ffffff"/>
        <!-- Open mouth awe -->
        <ellipse cx="44" cy="48" rx="4" ry="5" fill="#111827"/>
        <!-- Hand reaching forward -->
        <line x1="55" y1="70" x2="105" y2="65" stroke="#111827" stroke-width="6" stroke-linecap="round"/>
        <!-- Legs crouched -->
        <path d="M 28 97 L 16 135 L 36 138" fill="none" stroke="#111827" stroke-width="6" stroke-linecap="round"/>
        <path d="M 46 97 L 54 135 L 70 138" fill="none" stroke="#111827" stroke-width="6" stroke-linecap="round"/>
      </g>
    `;
  } else if (panelNumber === 3) {
    // Action / Rising conflict / Drama
    characterPose = `
      <g transform="translate(320, 240)">
        <!-- Comic Action Burst Lines -->
        <g stroke="${theme.accent}" stroke-width="4" opacity="0.6">
          <line x1="-80" y1="-20" x2="30" y2="40"/>
          <line x1="160" y1="-30" x2="70" y2="40"/>
          <line x1="-60" y1="130" x2="20" y2="80"/>
          <line x1="170" y1="120" x2="80" y2="80"/>
        </g>
        <!-- Shadowy opponent/obstacle looming -->
        <path d="M 120 180 Q 150 40 190 20 Q 230 40 260 180 Z" fill="#030712" opacity="0.75"/>
        <circle cx="170" cy="70" r="4" fill="#ef4444"/>
        <circle cx="210" cy="70" r="4" fill="#ef4444"/>
        <!-- Character in defiant stance -->
        <path d="M 15 50 Q -35 55 -60 75 Q -25 75 15 65 Z" fill="${theme.accent}"/>
        <rect x="15" y="45" width="34" height="48" rx="8" fill="#ffffff" stroke="#111827" stroke-width="4" transform="rotate(-8 32 69)"/>
        <circle cx="34" cy="24" r="22" fill="#ffffff" stroke="#111827" stroke-width="4"/>
        <polygon points="18,12 8,-4 28,6" fill="${theme.accent}" stroke="#111827" stroke-width="3"/>
        <polygon points="38,6 58,-4 48,12" fill="${theme.accent}" stroke="#111827" stroke-width="3"/>
        <!-- Focused determined brow -->
        <line x1="24" y1="18" x2="33" y2="24" stroke="#111827" stroke-width="3" stroke-linecap="round"/>
        <line x1="44" y1="24" x2="35" y2="18" stroke="#111827" stroke-width="3" stroke-linecap="round"/>
        <circle cx="28" cy="25" r="4" fill="#111827"/>
        <circle cx="40" cy="25" r="4" fill="#111827"/>
        <!-- Grit smile / determined -->
        <line x1="30" y1="35" x2="38" y2="35" stroke="#111827" stroke-width="3" stroke-linecap="round"/>
        <!-- Strong braced legs -->
        <line x1="20" y1="92" x2="-8" y2="148" stroke="#111827" stroke-width="7" stroke-linecap="round"/>
        <line x1="42" y1="92" x2="68" y2="148" stroke="#111827" stroke-width="7" stroke-linecap="round"/>
      </g>
    `;
  } else if (panelNumber === 4) {
    // Climax / Breakthrough / Power
    characterPose = `
      <g transform="translate(350, 230)">
        <!-- Giant Star Burst / Energy -->
        <polygon points="50,-30 65,15 110,25 75,55 85,100 45,75 5,100 15,55 -20,25 25,15" fill="${theme.accent}" opacity="0.35" transform="scale(1.5) translate(-15, -20)"/>
        <circle cx="50" cy="60" r="50" fill="${theme.detail}" opacity="0.4" filter="blur(16px)"/>
        <!-- Character jumping / soaring forward -->
        <path d="M 35 45 Q 0 45 -40 20 Q -10 60 30 65 Z" fill="${theme.accent}"/>
        <rect x="30" y="35" width="34" height="46" rx="8" fill="#ffffff" stroke="#111827" stroke-width="4" transform="rotate(15 47 58)"/>
        <circle cx="58" cy="20" r="22" fill="#ffffff" stroke="#111827" stroke-width="4"/>
        <polygon points="45,8 40,-8 58,2" fill="${theme.accent}" stroke="#111827" stroke-width="3"/>
        <polygon points="65,2 80,-8 75,8" fill="${theme.accent}" stroke="#111827" stroke-width="3"/>
        <!-- Heroic energetic eyes -->
        <circle cx="54" cy="18" r="5" fill="#111827"/>
        <circle cx="66" cy="18" r="5" fill="#111827"/>
        <circle cx="55" cy="16" r="2" fill="#ffffff"/>
        <circle cx="67" cy="16" r="2" fill="#ffffff"/>
        <!-- Open shout of triumph -->
        <path d="M 54 26 Q 60 34 66 26 Z" fill="#ef4444" stroke="#111827" stroke-width="2"/>
        <!-- Raised fist of victory -->
        <line x1="60" y1="45" x2="95" y2="10" stroke="#111827" stroke-width="6" stroke-linecap="round"/>
        <circle cx="98" cy="8" r="7" fill="#ffffff" stroke="#111827" stroke-width="3"/>
        <!-- Legs in leaping pose -->
        <line x1="38" y1="80" x2="10" y2="120" stroke="#111827" stroke-width="6" stroke-linecap="round"/>
        <line x1="50" y1="80" x2="35" y2="135" stroke="#111827" stroke-width="6" stroke-linecap="round"/>
      </g>
    `;
  } else {
    // Resolution / Harmony / Joy
    characterPose = `
      <g transform="translate(360, 260)">
        <!-- Warm ambient sun or moonlight glow -->
        <circle cx="40" cy="60" r="70" fill="#facc15" opacity="0.3" filter="blur(22px)"/>
        <!-- Character resting / smiling proudly -->
        <path d="M 20 60 Q -20 80 -35 70 Q -10 95 25 75 Z" fill="${theme.accent}"/>
        <rect x="24" y="45" width="34" height="48" rx="10" fill="#ffffff" stroke="#111827" stroke-width="4"/>
        <circle cx="41" cy="26" r="22" fill="#ffffff" stroke="#111827" stroke-width="4"/>
        <polygon points="27,10 18,-6 36,6" fill="${theme.accent}" stroke="#111827" stroke-width="3"/>
        <polygon points="45,6 63,-6 55,10" fill="${theme.accent}" stroke="#111827" stroke-width="3"/>
        <!-- Happy closed curve eyes (anime style) -->
        <path d="M 30 24 Q 35 18 40 24" fill="none" stroke="#111827" stroke-width="3" stroke-linecap="round"/>
        <path d="M 44 24 Q 49 18 54 24" fill="none" stroke="#111827" stroke-width="3" stroke-linecap="round"/>
        <!-- Blush cheeks -->
        <ellipse cx="28" cy="30" rx="4" ry="2" fill="#f43f5e" opacity="0.7"/>
        <ellipse cx="56" cy="30" rx="4" ry="2" fill="#f43f5e" opacity="0.7"/>
        <!-- Warm wide smile -->
        <path d="M 35 34 Q 42 42 49 34 Z" fill="#ef4444" stroke="#111827" stroke-width="2"/>
        <!-- Peaceful stance -->
        <line x1="32" y1="92" x2="30" y2="140" stroke="#111827" stroke-width="6" stroke-linecap="round"/>
        <line x1="48" y1="92" x2="52" y2="140" stroke="#111827" stroke-width="6" stroke-linecap="round"/>
      </g>
    `;
  }

  // Comic sound effect tag or burst watermark
  const soundEffects = ['WHISPER...', 'SPARKLE!', 'POW!', 'BURST!!', 'HARMONY ✨'];
  const soundFx = soundEffects[panelNumber - 1] || 'BOOM!';

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${theme.bg1}"/>
        <stop offset="60%" stop-color="${theme.bg2}"/>
        <stop offset="100%" stop-color="#030712"/>
      </linearGradient>
      <radialGradient id="sunGlow" cx="50%" cy="30%" r="50%">
        <stop offset="0%" stop-color="${theme.accent}" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="${theme.accent}" stop-opacity="0"/>
      </radialGradient>
      <!-- Halftone Comic Pattern -->
      <pattern id="halftoneDots" width="14" height="14" patternUnits="userSpaceOnUse">
        <circle cx="7" cy="7" r="2.5" fill="#facc15" opacity="0.16"/>
      </pattern>
      <!-- Speed lines for comic punch -->
      <pattern id="speedLines" width="20" height="20" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="20" stroke="#ffffff" stroke-width="1.5" opacity="0.08"/>
      </pattern>
    </defs>

    <!-- Base Canvas Background -->
    <rect width="800" height="500" fill="url(#bgGrad)"/>
    <rect width="800" height="500" fill="url(#sunGlow)"/>
    <rect width="800" height="500" fill="url(#halftoneDots)"/>
    <rect width="800" height="500" fill="url(#speedLines)"/>

    <!-- Setting Scenery -->
    ${backdropElements}

    <!-- Character in Action -->
    ${characterPose}

    <!-- Setting Foreground Grounding -->
    ${foregroundElements}

    <!-- Comic Vignette Border Frame -->
    <rect x="0" y="0" width="800" height="500" fill="none" stroke="#030712" stroke-width="12"/>

    <!-- Comic Action FX Tag -->
    <g transform="translate(620, 45) rotate(${panelNumber % 2 === 0 ? '-6' : '6'})">
      <path d="M 0 0 L 140 0 L 150 35 L 10 35 Z" fill="#facc15" stroke="#111827" stroke-width="3"/>
      <text x="75" y="24" fill="#111827" font-family="'Bangers', 'Impact', sans-serif" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="1.5">${soundFx}</text>
    </g>

    <!-- Style Badge Overlay -->
    <g transform="translate(24, 24)">
      <rect width="130" height="28" rx="14" fill="${theme.badgeBg}" stroke="#111827" stroke-width="2.5" opacity="0.95"/>
      <text x="65" y="18" fill="${theme.badgeText}" font-family="'Comic Neue', sans-serif" font-size="12" font-weight="bold" text-anchor="middle">🎨 ${artStyle}</text>
    </g>

    <!-- Character Name & Setting Tag -->
    <g transform="translate(24, 455)">
      <rect width="210" height="26" rx="6" fill="#111827" stroke="${theme.accent}" stroke-width="1.5" opacity="0.9"/>
      <text x="12" y="17" fill="#ffffff" font-family="'Comic Neue', sans-serif" font-size="11" font-weight="bold">📍 ${setting} • ${characterName}</text>
    </g>

    <!-- Panel Title Tag -->
    <g transform="translate(460, 455)">
      <rect width="316" height="26" rx="6" fill="#111827" stroke="#facc15" stroke-width="1.5" opacity="0.9"/>
      <text x="158" y="17" fill="#fef08a" font-family="'Comic Neue', sans-serif" font-size="11" font-weight="bold" text-anchor="middle">Panel ${panelNumber}: ${sceneTitle}</text>
    </g>
  </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
