import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor,
  LayoutTemplate,
  Building2,
  Clock,
  Landmark
} from 'lucide-react';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { ShowcaseView } from './components/ShowcaseView';
import { WorkstationView } from './components/WorkstationView';
import { BlueprintView } from './components/BlueprintView';
import { TimeMachineView } from './components/TimeMachineView';
import { DimensionView } from './components/DimensionView';
import { ViewMode } from './types';

const ModeSwitcher = () => {
  const { viewMode, setViewMode } = useTheme();

  const modes: { id: ViewMode; icon: React.ReactNode; label: string }[] = [
    { id: 'showcase', icon: <LayoutTemplate size={20} />, label: 'Showcase' },
    { id: 'workstation', icon: <Monitor size={20} />, label: 'Cyberdeck' },
    { id: 'blueprint', icon: <Building2 size={20} />, label: 'City' },
    { id: 'timemachine', icon: <Clock size={20} />, label: 'Chrono' },
    { id: 'dimension', icon: <Landmark size={20} />, label: 'Museum' },
  ];

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] group">
      <div className="flex gap-2 p-2 bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl transition-all hover:scale-105 hover:bg-black">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setViewMode(m.id)}
            className={`
              relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300
              ${viewMode === m.id 
                ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                : 'text-white/40 hover:text-white hover:bg-white/10'
              }
            `}
          >
            {m.icon}
            {/* Tooltip */}
            <span className="absolute -top-10 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {m.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const Content = () => {
  const { viewMode } = useTheme();

  return (
    <div className="relative overflow-hidden">
      <ModeSwitcher />
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.5 }}
          className="w-full min-h-screen"
        >
          {viewMode === 'showcase' && <ShowcaseView />}
          {viewMode === 'workstation' && <WorkstationView />}
          {viewMode === 'blueprint' && <BlueprintView />}
          {viewMode === 'timemachine' && <TimeMachineView />}
          {viewMode === 'dimension' && <DimensionView />}
        </motion.div>
      </AnimatePresence>
      
      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Content />
    </ThemeProvider>
  );
};

export default App;
