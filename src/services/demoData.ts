import { ComicStory } from '../types/comic';
import { generateComicPanelArtwork } from './artworkGenerator';

export const DEMO_COMIC: ComicStory = {
  id: 'comic-demo-luna-enchanted-forest',
  title: 'Luna and the Enchanted Forest',
  prompt: 'A brave fox exploring an enchanted forest.',
  character_name: 'Luna',
  setting: 'Forest',
  tone: 'Dramatic',
  art_style: 'Anime',
  is_demo: true,
  created_at: new Date().toISOString(),
  panels: [
    {
      panel_number: 1,
      title: 'Into the Emerald Unknown',
      scene_description: 'Luna, a sleek russet fox wearing a frayed azure scarf, steps past the boundary stones into the ancient, mist-shrouded Whispering Woods.',
      image_prompt: 'Anime-style brave fox named Luna with glowing amber eyes and a blue scarf, entering a mysterious misty enchanted forest at twilight, bioluminescent moss on giant roots, cinematic angle, cel-shaded anime art.',
      narration: 'Beyond the forgotten border stones, ancient rumors spoke of spirits trapped in amber branches. Luna had promised herself she would find the truth.',
      caption: 'The Whispering Woods had turned away travelers for a century, but Luna never turned back.',
      dialogue: [
        {
          speaker: 'Luna',
          text: 'One step. That is all it takes to leave the ordinary world behind.',
          type: 'thought'
        }
      ],
      image_url: generateComicPanelArtwork({
        characterName: 'Luna',
        setting: 'Forest',
        panelNumber: 1,
        artStyle: 'Anime',
        sceneTitle: 'Into the Emerald Unknown',
        mood: 'Dramatic'
      })
    },
    {
      panel_number: 2,
      title: 'The Starlight Grove',
      scene_description: 'Deep within the thicket, Luna discovers a clearing where azure will-o-wisps dance around a suspended crystal core glowing with celestial energy.',
      image_prompt: 'Anime illustration of Luna the fox gazing up in awe at a floating glowing star crystal orb in a grove of bioluminescent silver birch trees, particles floating in air, vibrant purple and teal lighting.',
      narration: 'The air hummed with a forgotten melody. In the heart of the grove rested the Heartwood Star, pulsing like a slumbering sun.',
      caption: 'The legend was real. But slumbering powers never stay undisturbed for long.',
      dialogue: [
        {
          speaker: 'Luna',
          text: 'It really exists... the Heartwood Star! It’s warmer than the morning sun.',
          type: 'speech'
        },
        {
          speaker: 'Whispering Spirit',
          text: 'Who awakens the heart of the forest after a thousand winters?',
          type: 'speech'
        }
      ],
      image_url: generateComicPanelArtwork({
        characterName: 'Luna',
        setting: 'Forest',
        panelNumber: 2,
        artStyle: 'Anime',
        sceneTitle: 'The Starlight Grove',
        mood: 'Dramatic'
      })
    },
    {
      panel_number: 3,
      title: 'Shadows of the Canopy',
      scene_description: 'The shadows twist and surge as a corrupted gloom-serpent emerges from the hollow canopy, seeking to devour the crystal light.',
      image_prompt: 'High-tension anime comic panel, Luna the fox bracing in a fierce combat stance with scarf billowing, facing a massive shadowy silhouette serpent with glowing red eyes among thorny brambles, dramatic contrast.',
      narration: 'A chilling gust silenced the grove. Darkness, drawn by the crystal’s awakening, coiled hungrily from the canopy.',
      caption: 'When shadows hunger for starlight, only courageous hearts can stand the line.',
      dialogue: [
        {
          speaker: 'Luna',
          text: 'Back off! This light belongs to the forest, not your abyss!',
          type: 'shout'
        },
        {
          speaker: 'Gloom Serpent',
          text: 'HISSSS! Tiny creature, you cannot withstand the creeping night!',
          type: 'speech'
        }
      ],
      image_url: generateComicPanelArtwork({
        characterName: 'Luna',
        setting: 'Forest',
        panelNumber: 3,
        artStyle: 'Anime',
        sceneTitle: 'Shadows of the Canopy',
        mood: 'Dramatic'
      })
    },
    {
      panel_number: 4,
      title: 'The Spark of Resolve',
      scene_description: 'Luna leaps fearlessly onto the high mossy boulder, channeling the crystal’s radiant burst through her sapphire scarf to banish the encroaching gloom.',
      image_prompt: 'Dynamic heroic anime panel, Luna leaping into mid-air, surrounded by blinding golden and azure light beams bursting outward, shattering the shadows like glass, dynamic motion lines, epic climax.',
      narration: 'She remembered her grandmother’s words: courage is not the absence of fear, but the decision that something else is worth standing for.',
      caption: 'With a deafening crackle of dawn-light, Luna released the star’s dormant brilliance.',
      dialogue: [
        {
          speaker: 'Luna',
          text: 'Light doesn’t cower from darkness — it shatters it!',
          type: 'shout'
        }
      ],
      image_url: generateComicPanelArtwork({
        characterName: 'Luna',
        setting: 'Forest',
        panelNumber: 4,
        artStyle: 'Anime',
        sceneTitle: 'The Spark of Resolve',
        mood: 'Dramatic'
      })
    },
    {
      panel_number: 5,
      title: 'A New Guardian Dawns',
      scene_description: 'Dawn breaks over the rejuvenated forest. The corrupted thorns bloom into vibrant luminescent orchids. Luna watches the sunrise as the forest whispers in gratitude.',
      image_prompt: 'Serene emotional anime panel, golden morning sun rays breaking through lush green forest canopy, Luna the fox standing peacefully on a floral bluff overlooking the glowing valley, peaceful warm sunrise.',
      narration: 'The forest exhaled. Where poison had withered the boughs, crystalline petals blossomed toward the golden dawn. Luna stood no longer as an intruder, but as their guardian.',
      caption: 'Every legend begins with a single brave heart willing to walk into the dark.',
      dialogue: [
        {
          speaker: 'Forest Spirits',
          text: 'Thank you, little guardian. The grove will never forget your name.',
          type: 'speech'
        },
        {
          speaker: 'Luna',
          text: 'This is only the first adventure. The world is full of forgotten places.',
          type: 'thought'
        }
      ],
      image_url: generateComicPanelArtwork({
        characterName: 'Luna',
        setting: 'Forest',
        panelNumber: 5,
        artStyle: 'Anime',
        sceneTitle: 'A New Guardian Dawns',
        mood: 'Dramatic'
      })
    }
  ]
};

export const SAMPLE_PRESETS = [
  {
    title: 'Luna and the Enchanted Forest',
    prompt: 'A brave fox exploring an enchanted forest.',
    character: 'Luna',
    setting: 'Forest',
    tone: 'Dramatic' as const,
    art_style: 'Anime' as const,
    badge: 'Popular Demo'
  },
  {
    title: 'Captain Cosmo in Asteroid City',
    prompt: 'A quirky astronaut racing against time to save a neon planetary fuel station.',
    character: 'Captain Cosmo',
    setting: 'Space',
    tone: 'Adventurous' as const,
    art_style: 'Comic Book' as const,
    badge: 'Sci-Fi Action'
  },
  {
    title: 'Detective Whiskers: The Case of the Missing Yarn',
    prompt: 'A grumpy cat detective solving a hilarious midnight heist in a cozy bakery.',
    character: 'Inspector Whiskers',
    setting: 'City',
    tone: 'Funny' as const,
    art_style: 'Cartoon' as const,
    badge: 'Comedy Mystery'
  },
  {
    title: 'Aria and the Sky Citadel',
    prompt: 'A winged courier soaring through floating cloud castles to deliver a sacred peace decree.',
    character: 'Aria',
    setting: 'Castle',
    tone: 'Inspirational' as const,
    art_style: 'Fantasy' as const,
    badge: 'Epic Fantasy'
  }
];
