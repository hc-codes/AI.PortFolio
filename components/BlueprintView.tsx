import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO, EXPERIENCE, SKILLS, EDUCATION } from '../constants';
import { X, Building2, Zap, Database, Globe, ChevronRight } from 'lucide-react';
import { useTheme } from './ThemeContext';

// --- Types ---
interface BuildingProps {
  x: number;
  y: number;
  width: number;
  depth: number;
  height: number;
  color: string;
  glowColor: string;
  label?: string;
  icon?: React.ReactNode;
  delay?: number;
  onClick?: () => void;
  selected?: boolean;
}

// --- 3D Building Component (CSS) ---
const Building = ({ x, y, width, depth, height, color, glowColor, label, icon, delay = 0, onClick, selected }: BuildingProps) => {
  // Random window pattern generation
  const windows = useMemo(() => Math.floor(Math.random() * 5) + 1, []);

  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ duration: 1, delay: delay + 1.5, type: "spring" }}
      className={`absolute preserve-3d group cursor-pointer ${selected ? 'z-50' : ''}`}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        width: width,
        height: depth,
        transformOrigin: "bottom center",
        transform: `translate3d(-50%, -50%, 0)`
      }}
      onClick={(e) => { e.stopPropagation(); onClick?.(); }}
    >
      {/* Roof */}
      <div 
        className="absolute inset-0 border border-white/10 flex items-center justify-center transition-colors duration-300"
        style={{ 
          background: color,
          transform: `translateZ(${height}px)`,
          boxShadow: selected ? `0 0 50px ${glowColor}, inset 0 0 20px ${glowColor}` : `0 0 10px ${glowColor}`
        }}
      >
        {/* Holographic Logo on Roof */}
        {icon && (
           <motion.div 
             className="text-white mix-blend-overlay"
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           >
              {icon}
           </motion.div>
        )}
      </div>

      {/* Front Face (South) */}
      <div 
        className="absolute top-full left-0 w-full origin-top border-x border-b border-white/5 overflow-hidden flex flex-col justify-end p-2 transition-all duration-300"
        style={{ 
          height: height, 
          background: `linear-gradient(to bottom, ${color} 0%, #000 100%)`,
          transform: `rotateX(-90deg)`,
          opacity: 0.8
        }}
      >
        {/* Windows */}
        <div className="absolute inset-2 grid grid-cols-2 gap-1 opacity-50">
           {[...Array(windows * 4)].map((_, i) => (
              <motion.div 
                key={i} 
                className="bg-white/20 w-full h-1 rounded-[1px]" 
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
              />
           ))}
        </div>
      </div>

      {/* Right Face (East) */}
      <div 
        className="absolute top-0 left-full h-full origin-left border-y border-r border-white/5 overflow-hidden transition-all duration-300"
        style={{ 
          width: height, 
          background: `linear-gradient(to right, ${color} 0%, #000 100%)`,
          transform: `rotateY(90deg)`,
          opacity: 0.6
        }}
      >
         {/* Animated Billboards/Texture */}
         <div className="absolute bottom-2 left-2 right-2 h-full flex flex-col-reverse gap-1">
             <div className="h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.05)_2px,rgba(255,255,255,0.05)_4px)]" />
         </div>
      </div>

      {/* Left Face (West) - only visible if rotated, but good for completeness */}
      <div 
        className="absolute top-0 right-full h-full origin-right bg-black/80 border border-white/5"
        style={{ width: height, transform: `rotateY(-90deg)` }}
      />
      
      {/* Back Face (North) */}
      <div 
        className="absolute bottom-full left-0 w-full origin-bottom bg-black/80 border border-white/5"
        style={{ height: height, transform: `rotateX(90deg)` }}
      />

      {/* Label (Floating) */}
      {label && (
        <motion.div 
          className={`absolute left-1/2 -translate-x-1/2 -translate-y-full px-3 py-1 bg-black/80 border border-white/20 rounded text-[10px] text-white whitespace-nowrap pointer-events-none transition-opacity duration-300 ${selected ? 'opacity-0' : 'opacity-100'}`}
          style={{ top: 0, transform: `translateZ(${height + 20}px)` }}
        >
           {label}
        </motion.div>
      )}

      {/* Selection Beam */}
      {selected && (
         <motion.div 
           initial={{ opacity: 0, height: 0 }}
           animate={{ opacity: 1, height: 1000 }}
           className="absolute bottom-0 left-1/2 w-1 -translate-x-1/2 bg-white/50 blur-sm pointer-events-none"
           style={{ transform: `translateZ(${height}px)` }}
         />
      )}
    </motion.div>
  );
};

// --- Road & Traffic ---
const Road = ({ x, y, width, depth, rotate = 0 }: any) => (
  <div 
    className="absolute bg-[#1a1b26] border border-white/5 overflow-hidden"
    style={{
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
      width, height: depth,
      transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
      transformStyle: 'preserve-3d'
    }}
  >
     {/* Lane Markings */}
     <div className="absolute top-1/2 left-0 w-full h-0 border-t border-dashed border-white/20" />
     
     {/* Traffic Particles */}
     <motion.div 
       className="absolute top-1/2 left-0 w-2 h-1 bg-yellow-400 blur-[1px] shadow-[0_0_5px_yellow]"
       animate={{ left: ["-10%", "110%"] }}
       transition={{ duration: width / 50, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
     />
     <motion.div 
       className="absolute top-[40%] left-0 w-2 h-1 bg-red-500 blur-[1px] shadow-[0_0_5px_red]"
       animate={{ left: ["110%", "-10%"] }}
       transition={{ duration: width / 60, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
     />
  </div>
);

// --- Detail Modal ---
const BuildingDetail = ({ data, onClose }: { data: any, onClose: () => void }) => {
    const { config } = useTheme();
    return (
        <motion.div
           initial={{ x: "100%" }}
           animate={{ x: 0 }}
           exit={{ x: "100%" }}
           transition={{ type: "spring", damping: 20 }}
           className={`fixed right-0 top-0 bottom-0 w-full md:w-[450px] ${config.cardBg} border-l border-yellow-500/20 backdrop-blur-xl p-8 z-[100] shadow-2xl overflow-y-auto`}
        >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full">
                <X className="text-white" />
            </button>
            
            <div className="mt-8">
               <div className="text-yellow-400 text-xs font-mono tracking-widest mb-2 uppercase">District: {data.type}</div>
               <h2 className="text-4xl font-bold text-white mb-2 font-[Orbitron]">{data.title}</h2>
               {data.subtitle && <div className="text-white/60 font-mono text-sm mb-6">{data.subtitle}</div>}
               
               <div className="w-full h-px bg-gradient-to-r from-yellow-500/50 to-transparent mb-6" />
               
               {data.content && (
                   <div className="space-y-4">
                       {data.content.map((item: string, i: number) => (
                           <div key={i} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                               <ChevronRight size={14} className="text-yellow-500 mt-1 flex-shrink-0" />
                               {item}
                           </div>
                       ))}
                   </div>
               )}
               
               {data.technologies && (
                   <div className="mt-8">
                       <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                           <Zap size={16} className="text-yellow-500" /> 
                           INFRASTRUCTURE
                       </h3>
                       <div className="flex flex-wrap gap-2">
                           {data.technologies.map((tech: string, i: number) => (
                               <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-xs text-gray-400 rounded">
                                   {tech}
                               </span>
                           ))}
                       </div>
                   </div>
               )}
            </div>
        </motion.div>
    );
};


// --- Main View ---

export const BlueprintView = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Camera Controls
  const cameraX = useMotionValue(0);
  const cameraY = useMotionValue(0);
  const zoom = useSpring(1, { stiffness: 100, damping: 20 });
  
  // Intro Animation
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    // Cinematic Fly-in
    const timer = setTimeout(() => {
        setIntroFinished(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    if (selectedId) return;
    const newZoom = zoom.get() - e.deltaY * 0.001;
    zoom.set(Math.min(Math.max(newZoom, 0.5), 2));
  };

  // --- City Layout Data ---
  const buildings = [
      // Central Tower (Profile)
      {
          id: 'profile',
          x: 0, y: 0, w: 100, d: 100, h: 300,
          color: '#1e293b', glowColor: '#fbbf24',
          label: 'HQ: Hariprasad C',
          icon: <Globe size={40} />,
          type: 'Headquarters',
          title: PERSONAL_INFO.name,
          subtitle: PERSONAL_INFO.role,
          content: [PERSONAL_INFO.summary, `Location: India`, `Availability: Remote`],
          technologies: null
      },
      // Experience District (West)
      {
          id: 'exp-1',
          x: -250, y: 50, w: 120, d: 80, h: 220,
          color: '#0f172a', glowColor: '#3b82f6',
          label: EXPERIENCE[0].company,
          icon: <Building2 size={30} />,
          type: 'Enterprise District',
          title: EXPERIENCE[0].company,
          subtitle: EXPERIENCE[0].period + " | " + EXPERIENCE[0].role,
          content: EXPERIENCE[0].description,
          technologies: EXPERIENCE[0].technologies
      },
      {
          id: 'exp-2',
          x: -350, y: -100, w: 100, d: 80, h: 160,
          color: '#0f172a', glowColor: '#60a5fa',
          label: EXPERIENCE[1].company,
          icon: <Building2 size={30} />,
          type: 'Industrial District',
          title: EXPERIENCE[1].company,
          subtitle: EXPERIENCE[1].period + " | " + EXPERIENCE[1].role,
          content: EXPERIENCE[1].description,
          technologies: EXPERIENCE[1].technologies
      },
      // Backend Power Plant (North)
      {
          id: 'skill-backend',
          x: 100, y: -250, w: 140, d: 140, h: 100,
          color: '#1e1b4b', glowColor: '#8b5cf6',
          label: 'Backend Grid',
          icon: <Database size={40} />,
          type: 'Power Station',
          title: 'Backend Systems',
          subtitle: 'Core Infrastructure',
          content: ['Robust scalable architectures', 'High-performance APIs'],
          technologies: SKILLS[0].items
      },
      // Frontend Plaza (South)
      {
          id: 'skill-frontend',
          x: 150, y: 150, w: 120, d: 120, h: 140,
          color: '#1e1b4b', glowColor: '#ec4899',
          label: 'Frontend Hub',
          icon: <Zap size={40} />,
          type: 'Innovation Center',
          title: 'User Interfaces',
          subtitle: 'Client-Side Logic',
          content: ['Responsive Design', 'Interactive Dashboards'],
          technologies: SKILLS[1].items
      },
      // Education Center (East)
      {
          id: 'edu',
          x: 300, y: -50, w: 90, d: 90, h: 120,
          color: '#064e3b', glowColor: '#10b981',
          label: 'Education Center',
          icon: <Building2 size={30} />,
          type: 'Academic Zone',
          title: EDUCATION[0].institution,
          subtitle: EDUCATION[0].degree,
          content: [`Grade: ${EDUCATION[0].grade}`, EDUCATION[0].period],
          technologies: []
      }
  ];

  const selectedData = buildings.find(b => b.id === selectedId);

  return (
    <div className="w-full h-screen bg-[#050508] overflow-hidden relative font-sans select-none">
       {/* Ambient Fog */}
       <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent z-20 pointer-events-none" />
       
       {/* HUD */}
       <div className="fixed top-6 left-6 z-50 pointer-events-none">
          <div className="text-yellow-400 font-[Orbitron] text-xl font-bold tracking-widest">NEO_CITY OS</div>
          <div className="text-white/50 text-xs font-mono mt-1">
             CAM_X: {Math.round(cameraX.get())} | CAM_Y: {Math.round(cameraY.get())} | ZOOM: 1.0
          </div>
          <div className="mt-4 flex items-center gap-2 text-white/70 text-xs font-mono bg-black/50 p-2 border border-white/10 w-fit backdrop-blur-md">
             <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
             SYSTEM ONLINE. DRAG TO NAVIGATE.
          </div>
       </div>

       {/* Main 3D Container */}
       <motion.div 
         ref={containerRef}
         className="w-full h-full cursor-move perspective-[2000px]"
         onWheel={handleWheel}
         drag
         dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
         style={{ x: cameraX, y: cameraY }}
       >
          <motion.div 
             className="w-full h-full preserve-3d"
             initial={{ rotateX: 0, rotateZ: 0, scale: 3 }}
             animate={{ 
                 rotateX: 60, 
                 rotateZ: -45, 
                 scale: introFinished ? (selectedId ? 1.5 : 1) : 2, // Zoom out after intro, zoom in on select
                 x: selectedId ? -buildings.find(b => b.id === selectedId)!.x : 0,
                 y: selectedId ? -buildings.find(b => b.id === selectedId)!.y : 0,
             }}
             transition={{ duration: 1.5, ease: "easeInOut" }}
          >
             {/* Ground Grid */}
             <div 
               className="absolute inset-[-200%] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:50px_50px]" 
               style={{ transform: 'translateZ(-1px)' }}
             />

             {/* Roads connecting districts */}
             <Road x={0} y={100} width={800} depth={40} rotate={0} />
             <Road x={0} y={-100} width={800} depth={40} rotate={0} />
             <Road x={-150} y={0} width={600} depth={40} rotate={90} />
             <Road x={150} y={0} width={600} depth={40} rotate={90} />

             {/* Render Buildings */}
             {buildings.map((b, i) => (
                <Building
                   key={b.id}
                   x={b.x} y={b.y}
                   width={b.w} depth={b.d} height={b.h}
                   color={b.color} glowColor={b.glowColor}
                   label={b.label} icon={b.icon}
                   delay={i * 0.1}
                   onClick={() => setSelectedId(b.id)}
                   selected={selectedId === b.id}
                />
             ))}

          </motion.div>
       </motion.div>

       {/* Detail Modal */}
       <AnimatePresence>
           {selectedId && selectedData && (
               <BuildingDetail data={selectedData} onClose={() => setSelectedId(null)} />
           )}
       </AnimatePresence>
       
       <style>{`
         .preserve-3d { transform-style: preserve-3d; }
       `}</style>
    </div>
  );
};
