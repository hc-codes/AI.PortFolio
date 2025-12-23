export type ThemeType = 'obsidian' | 'alabaster' | 'terminal' | 'blueprint' | 'showcase' | 'temporal' | 'dimension';

export type ViewMode = 'showcase' | 'workstation' | 'blueprint' | 'timemachine' | 'dimension';

export interface ThemeConfig {
  name: string;
  bg: string;
  fg: string;
  accent: string;
  muted: string;
  border: string;
  fontMain: string;
  fontMono: string;
  fontSerif: string;
  fontDisplay: string;
  cardBg: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  grade: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Achievement {
  title: string;
  description: string;
}
