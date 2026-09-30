export type SettingOption = 
  | 'Forest'
  | 'School'
  | 'Space'
  | 'City'
  | 'Beach'
  | 'Castle'
  | 'Village'
  | 'Custom';

export type ToneOption = 
  | 'Light-hearted'
  | 'Funny'
  | 'Dramatic'
  | 'Poetic'
  | 'Adventurous'
  | 'Mysterious'
  | 'Inspirational';

export type ArtStyleOption = 
  | 'Anime'
  | 'Comic Book'
  | 'Pixel Art'
  | 'Realistic'
  | 'Cartoon'
  | 'Watercolor'
  | 'Fantasy';

export interface ComicPanel {
  panel_number: number;
  title: string;
  scene_description: string;
  image_prompt: string;
  narration: string;
  dialogue: {
    speaker: string;
    text: string;
    type?: 'speech' | 'thought' | 'shout';
  }[];
  caption: string;
  image_url: string;
}

export interface ComicStory {
  id: string;
  title: string;
  prompt: string;
  character_name: string;
  setting: string;
  tone: ToneOption;
  art_style: ArtStyleOption;
  panels: ComicPanel[];
  created_at: string;
  is_demo?: boolean;
}

export interface ComicGenerationRequest {
  story_prompt: string;
  character_name: string;
  setting: string;
  custom_setting?: string;
  tone: ToneOption;
  art_style: ArtStyleOption;
  use_demo_mode?: boolean;
}

export interface GenerationProgressStep {
  step: number;
  total_steps: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
}
