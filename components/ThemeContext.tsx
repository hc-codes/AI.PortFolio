import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ThemeType, ThemeConfig, ViewMode } from '../types';

const themes: Record<ThemeType, ThemeConfig> = {
  obsidian: {
    name: 'Obsidian',
    bg: 'bg-white',
    fg: 'text-black',
    accent: 'text-neutral-900',
    muted: 'text-neutral-500',
    border: 'border-black',
    fontMain: 'font-[Inter]',
    fontMono: 'font-[JetBrains Mono]',
    fontSerif: 'font-[Playfair Display]',
    fontDisplay: 'font-[Playfair Display]',
    cardBg: 'bg-white'
  },
  alabaster: {
    name: 'Alabaster',
    bg: 'bg-[#fafafa]',
    fg: 'text-neutral-900',
    accent: 'text-neutral-900',
    muted: 'text-neutral-500',
    border: 'border-neutral-200',
    fontMain: 'font-[Inter]',
    fontMono: 'font-[JetBrains Mono]',
    fontSerif: 'font-[Playfair Display]',
    fontDisplay: 'font-[Playfair Display]',
    cardBg: 'bg-white'
  },
  terminal: {
    name: 'Terminal',
    bg: 'bg-black',
    fg: 'text-cyan-400',
    accent: 'text-pink-500',
    muted: 'text-cyan-900',
    border: 'border-cyan-800',
    fontMain: 'font-[JetBrains Mono]',
    fontMono: 'font-[JetBrains Mono]',
    fontSerif: 'font-[JetBrains Mono]',
    fontDisplay: 'font-[JetBrains Mono]',
    cardBg: 'bg-black/90'
  },
  blueprint: {
    name: 'Cyber City',
    bg: 'bg-[#0b0c15]',
    fg: 'text-white',
    accent: 'text-yellow-400',
    muted: 'text-slate-500',
    border: 'border-yellow-400/20',
    fontMain: 'font-[Inter]',
    fontMono: 'font-[JetBrains Mono]',
    fontSerif: 'font-[Inter]',
    fontDisplay: 'font-[Orbitron]',
    cardBg: 'bg-[#151621]/90'
  },
  showcase: {
    name: 'Showcase',
    bg: 'bg-[#030014]',
    fg: 'text-white',
    accent: 'text-[#a855f7]', // Neon Purple
    muted: 'text-blue-200/50',
    border: 'border-white/10',
    fontMain: 'font-[Inter]',
    fontMono: 'font-[JetBrains Mono]',
    fontSerif: 'font-[Playfair Display]',
    fontDisplay: 'font-[Orbitron]',
    cardBg: 'bg-white/5'
  },
  temporal: {
    name: 'Time Machine',
    bg: 'bg-[#1a0f0a]', // Dark Bronze/Brown
    fg: 'text-amber-100',
    accent: 'text-amber-500',
    muted: 'text-amber-800',
    border: 'border-amber-500/30',
    fontMain: 'font-[Inter]',
    fontMono: 'font-[JetBrains Mono]',
    fontSerif: 'font-[Playfair Display]',
    fontDisplay: 'font-[Orbitron]', // Futuristic
    cardBg: 'bg-black/80'
  },
  dimension: {
    name: 'Museum of Mastery',
    bg: 'bg-[#050505]',
    fg: 'text-emerald-100',
    accent: 'text-emerald-400',
    muted: 'text-emerald-800',
    border: 'border-emerald-500/20',
    fontMain: 'font-[Inter]',
    fontMono: 'font-[JetBrains Mono]',
    fontSerif: 'font-[Playfair Display]',
    fontDisplay: 'font-[Orbitron]',
    cardBg: 'bg-emerald-950/30'
  }
};

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  config: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [viewMode, setViewModeState] = useState<ViewMode>('showcase');
  const [theme, setTheme] = useState<ThemeType>('showcase');

  // Auto-switch theme based on view mode for best aesthetics
  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    if (mode === 'showcase') setTheme('showcase');
    if (mode === 'workstation') setTheme('terminal');
    if (mode === 'blueprint') setTheme('blueprint');
    if (mode === 'timemachine') setTheme('temporal');
    if (mode === 'dimension') setTheme('dimension');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, viewMode, setViewMode, config: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
