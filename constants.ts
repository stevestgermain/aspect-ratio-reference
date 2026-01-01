import { RatioPreset, ResolutionGroup } from './types';

export const PRESETS: RatioPreset[] = [
  { label: '16:9', w: 16, h: 9, desc: 'HD Video', contextLabel: 'Landscape video standard' },
  { label: '9:16', w: 9, h: 16, desc: 'Stories', contextLabel: 'Full-screen vertical (Stories/Reels)' },
  { label: '4:5', w: 4, h: 5, desc: 'Portrait', contextLabel: 'Feed-friendly portrait (high real estate)' },
  { label: '1:1', w: 1, h: 1, desc: 'Square', contextLabel: 'Square (safe default)' },
  { label: '4:3', w: 4, h: 3, desc: 'SD Video', contextLabel: 'Classic format (presentation / legacy)' },
];

export const STANDARD_FORMAT_GROUPS: ResolutionGroup[] = [
  {
    category: 'Social',
    items: [
      { width: 1080, height: 1350, label: 'Instagram Feed Portrait', description: 'Best balance for feeds (4:5)' },
      { width: 1080, height: 1080, label: 'Instagram Square', description: 'Safe default (1:1)' },
      { width: 1080, height: 1920, label: 'Stories / Reels / TikTok', description: 'Full-screen vertical (9:16)' },
    ]
  },
  {
    category: 'Video',
    items: [
      { width: 1920, height: 1080, label: 'YouTube / CTV', description: 'Landscape standard (16:9)' },
      { width: 1080, height: 1920, label: 'Shorts / Vertical Video', description: 'Vertical video format (9:16)' },
    ]
  }
];