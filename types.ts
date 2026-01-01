export interface RatioPreset {
  label: string;
  w: number;
  h: number;
  desc: string;
  contextLabel: string;
}

export interface ResolutionItem {
  width: number;
  height: number;
  label: string;
  description: string;
}

export interface ResolutionGroup {
  category: string;
  items: ResolutionItem[];
}

export interface RatioResult {
  w: number;
  h: number;
  string: string;
  decimal: number;
}