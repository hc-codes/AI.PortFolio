import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { PERSONAL_INFO, EXPERIENCE, EDUCATION, SKILLS } from '../constants';
import { Clock, RotateCw, Power, Radio, ChevronRight, Cpu } from 'lucide-react';

// --- Assets ---

const WarpTunnel = ({ isWarping }: { isWarping: boolean }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none perspective-[500px]">
        {/* Star Streaks */}
        <div className={`absolute inset-0 bg-black transition-opacity duration-1000 ${isWarping ? 'opacity-50' : 'opacity-90'}`} />
        
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full preserve-3d">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute left-1/2 top-1/2 border border-amber-500/30 rounded-full"
                    style={{
                         width: '100vw',
                         height: '100vw',
                         x: '-50%',
                         y: '-50%',
                    }}
                    animate={{
                        scale: isWarping ? [0, 5] : 1,
                        opacity: isWarping ? [0, 1, 0] : 0.1,
                        rotate: isWarping ? [0, 90] : 0
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "linear"
                    }}
                />
            ))}
            
            {/* Speed Lines */}
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={`line-${i}`}
                    className="absolute left-1/2 top-1/2 w-1 bg-cyan-400/50 origin-bottom"
                    style={{
                        height: '50vh',
                        x: '-50%',
                        y: '-50%',
                        rotate: (360 / 30) * i
                    }}
                    animate={{
                        scaleY: isWarping ? [0, 1.5] : 0,
                        opacity: isWarping ? [0, 1, 0] : 0,
                        translateY: isWarping ? [0, 500] : 0
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: Math.random() * 0.5
                    }}
                />
            ))}
        </div>
    </div>
  )
}

// --- Data Eras ---
const ERAS = [
    {
        year: 2017,
        title: "THE FOUNDATION",
        subtitle: "Academic Genesis",
        color: "text-blue-400",
        borderColor: "border-blue-500",
        data: EDUCATION[0],
        type: 'education',
        description: "Initial download of core computer science knowledge. Systems initialized: Algorithms, Data Structures, and basic Engineering principles."
    },
    {
        year: 2021,
        title: "FIRST CONTACT",
        subtitle: "Quest Global",
        color: "text-green-400",
        borderColor: "border-green-500",
        data: EXPERIENCE[1],
        type: 'experience',
        description: "First professional deployment. Calibration of medical imaging software and real-world C# application."
    },
    {
        year: 2022,
        title: "SYSTEM SCALING",
        subtitle: "SOTI Inc.",
        color: "text-amber-400",
        borderColor: "border-amber-500",
        data: EXPERIENCE[0],
        type: 'experience',
        description: "Major system upgrade. Managing 50,000+ devices. Architecture scaling and security protocol implementation."
    },
    {
        year: 2025,
        title: "THE HORIZON",
        subtitle: "Future Ready",
        color: "text-purple-400",
        borderColor: "border-purple-500",
        data: null,
        type: 'future',
        description: "Temporal destination: Unknown. Ready for new mission parameters. Available for deployment."
    }
];

// --- Sub-Components ---

const Artifact = ({ label, index }: { label: string, index: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className="relative group cursor-pointer"
    >
        <div className="w-16 h-16 border border-amber-500/30 bg-black/50 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_cyan] transition-all duration-300">
             <Cpu className="text-amber-500/50 group-hover:text-cyan-400 transition-colors" />
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-amber-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {label}
        </div>
    </motion.div>
)

const HolographicCard = ({ children, className = "", color = "border-amber-500" }: any) => (
    <div className={`relative bg-black/60 border ${color} p-8 backdrop-blur-md rounded-sm overflow-hidden ${className}`}>
        {/* Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] pointer-events-none z-10 opacity-50" />
        
        {/* Hologram Flicker */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent animate-pulse pointer-events-none" />
        
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-current opacity-50" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-current opacity-50" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-current opacity-50" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-current opacity-50" />

        <div className="relative z-20">
            {children}
        </div>
    </div>
);

// --- Main Component ---

export const TimeMachineView = () => {
    const [eraIndex, setEraIndex] = useState(0);
    const [isWarping, setIsWarping] = useState(false);
    const [poweredOn, setPoweredOn] = useState(false);

    // Initial Power Up
    useEffect(() => {
        setTimeout(() => setPoweredOn(true), 1000);
    }, []);

    const handleDialChange = (direction: 'next' | 'prev') => {
        if (isWarping) return;
        
        const newIndex = direction === 'next' 
            ? Math.min(eraIndex + 1, ERAS.length - 1)
            : Math.max(eraIndex - 1, 0);
            
        if (newIndex !== eraIndex) {
            setIsWarping(true);
            setTimeout(() => {
                setEraIndex(newIndex);
            }, 1000); // Wait for warp to peak
            setTimeout(() => {
                setIsWarping(false);
            }, 2000); // Cooldown
        }
    };

    const currentEra = ERAS[eraIndex];

    return (
        <div className="w-full h-screen bg-[#050404] text-amber-50 font-sans overflow-hidden relative">
            
            {/* 1. Background Environment */}
            <WarpTunnel isWarping={isWarping} />
            
            {/* Ambient Dust */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />

            {/* 2. Intro Sequence overlay */}
            <AnimatePresence>
                {!poweredOn && (
                    <motion.div 
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
                    >
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-24 h-24 border-4 border-t-amber-500 border-r-amber-500 border-b-transparent border-l-transparent rounded-full animate-spin"
                        />
                        <div className="mt-4 font-[Orbitron] text-amber-500 tracking-widest text-sm animate-pulse">
                            INITIALIZING CHRONO_SYSTEM...
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3. Main Viewport (Content) */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pb-32 px-6">
                <AnimatePresence mode="wait">
                    {!isWarping && poweredOn && (
                        <motion.div
                            key={eraIndex}
                            initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
                            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                            exit={{ scale: 1.2, opacity: 0, filter: 'blur(10px)' }}
                            transition={{ duration: 0.5 }}
                            className="w-full max-w-4xl"
                        >
                             <div className="flex justify-between items-end mb-6">
                                 <div>
                                     <div className={`text-6xl md:text-8xl font-[Orbitron] font-bold ${currentEra.color} drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]`}>
                                         {currentEra.year}
                                     </div>
                                     <div className="text-xl font-mono text-amber-200/70 tracking-[0.5em] uppercase">
                                         {currentEra.title}
                                     </div>
                                 </div>
                                 <div className="hidden md:block text-right">
                                     <div className="text-xs text-amber-500/50 font-mono">TEMPORAL COORDINATES LOCKED</div>
                                     <div className="text-xs text-amber-500/50 font-mono">SECTOR: {eraIndex + 1}/{ERAS.length}</div>
                                 </div>
                             </div>

                             <HolographicCard color={currentEra.borderColor} className="min-h-[400px]">
                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
                                     {/* Left: Details */}
                                     <div className="md:col-span-2">
                                         <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                                            {currentEra.type === 'future' ? <Radio className="animate-pulse" /> : <Power />}
                                            {currentEra.subtitle}
                                         </h2>
                                         
                                         {currentEra.data && 'role' in currentEra.data && (
                                             <div className="text-lg text-cyan-400 font-mono mb-4">
                                                 {currentEra.data.role}
                                             </div>
                                         )}
                                         
                                         <p className="text-amber-100/80 leading-relaxed text-lg mb-8 font-light border-l-2 border-amber-500/30 pl-4">
                                            {currentEra.description}
                                         </p>

                                         {/* Specific Data Rendering */}
                                         {currentEra.data && 'description' in currentEra.data && (
                                             <ul className="space-y-2 mb-6">
                                                 {(currentEra.data as any).description.slice(0, 3).map((desc: string, i: number) => (
                                                     <li key={i} className="flex gap-2 text-sm text-gray-400">
                                                         <ChevronRight size={14} className={`mt-1 flex-shrink-0 ${currentEra.color}`} />
                                                         {desc}
                                                     </li>
                                                 ))}
                                             </ul>
                                         )}

                                         {currentEra.type === 'future' && (
                                             <div className="mt-8">
                                                 <a href={`mailto:${PERSONAL_INFO.contact.email}`} className="px-6 py-3 bg-cyan-900/30 border border-cyan-500/50 hover:bg-cyan-500/20 text-cyan-400 font-mono transition-all">
                                                     ESTABLISH_COMMS_LINK
                                                 </a>
                                             </div>
                                         )}
                                     </div>

                                     {/* Right: Artifacts/Visuals */}
                                     <div className="border-l border-white/5 pl-8 flex flex-col justify-center">
                                         <div className="text-xs font-mono text-amber-500/50 mb-4 tracking-widest uppercase">
                                             Recovered Artifacts
                                         </div>
                                         <div className="grid grid-cols-2 gap-4">
                                             {currentEra.type === 'education' && (
                                                <>
                                                  <Artifact label="C++" index={0} />
                                                  <Artifact label="Java" index={1} />
                                                  <Artifact label="SQL" index={2} />
                                                  <Artifact label="DSA" index={3} />
                                                </>
                                             )}
                                             {currentEra.type === 'experience' && currentEra.data && 'technologies' in currentEra.data && (
                                                 (currentEra.data as any).technologies?.slice(0, 4).map((tech: string, i: number) => (
                                                     <Artifact key={i} label={tech} index={i} />
                                                 ))
                                             )}
                                             {currentEra.type === 'future' && (
                                                 <div className="col-span-2 text-center text-sm text-gray-500 italic">
                                                     [Data Corrupted... Future Unwritten]
                                                 </div>
                                             )}
                                         </div>
                                     </div>
                                 </div>
                             </HolographicCard>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* 4. The Console (Footer Controls) */}
            <div className="fixed bottom-0 left-0 right-0 h-28 bg-[#0a0503] border-t-4 border-[#3d2b1f] z-50 shadow-[0_-10px_50px_rgba(0,0,0,0.8)] flex items-center justify-center px-4">
                 {/* Decorative Gears */}
                 <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden md:block">
                     <Clock className={`w-16 h-16 text-[#3d2b1f] ${isWarping ? 'animate-spin' : ''}`} />
                 </div>
                 <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden md:block">
                     <RotateCw className={`w-16 h-16 text-[#3d2b1f] ${isWarping ? 'animate-spin' : ''}`} style={{ animationDirection: 'reverse' }} />
                 </div>

                 {/* Main Controls */}
                 <div className="flex items-center gap-8">
                     <button 
                         onClick={() => handleDialChange('prev')}
                         disabled={eraIndex === 0 || isWarping}
                         className="p-4 rounded-full bg-[#1a0f0a] border border-[#5c4033] text-amber-500 hover:text-amber-200 hover:border-amber-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)]"
                     >
                         <ChevronRight className="rotate-180" size={24} />
                     </button>
                     
                     {/* The Dial Display */}
                     <div className="relative w-40 h-24 bg-black rounded-lg border-4 border-[#3d2b1f] flex items-center justify-center overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.9)]">
                         <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#000_3px)] opacity-50 pointer-events-none" />
                         <AnimatePresence mode="wait">
                             <motion.div 
                                key={eraIndex}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="text-4xl font-[Orbitron] text-amber-500 font-bold"
                             >
                                 {ERAS[eraIndex].year}
                             </motion.div>
                         </AnimatePresence>
                     </div>

                     <button 
                         onClick={() => handleDialChange('next')}
                         disabled={eraIndex === ERAS.length - 1 || isWarping}
                         className="p-4 rounded-full bg-[#1a0f0a] border border-[#5c4033] text-amber-500 hover:text-amber-200 hover:border-amber-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)]"
                     >
                         <ChevronRight size={24} />
                     </button>
                 </div>

                 {/* Status Lights */}
                 <div className="absolute top-2 right-1/4 flex gap-2">
                     <div className={`w-2 h-2 rounded-full ${isWarping ? 'bg-red-500 animate-ping' : 'bg-green-500'}`} />
                     <div className="w-2 h-2 rounded-full bg-amber-500 opacity-50" />
                 </div>
            </div>

        </div>
    );
};
