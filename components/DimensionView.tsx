import React, { useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { PERSONAL_INFO, EXPERIENCE, EDUCATION, SKILLS } from '../constants';
import { X, Globe, Trophy, Cpu, ChevronDown, Database, Shield, Zap, Layout } from 'lucide-react';

// --- Types ---
interface ExhibitData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tags?: string[];
  date?: string;
}

// --- Sub-Components ---

// 1. The Archway - Creates the sense of "Halls"
const HallwayArch = ({ z, label }: { z: number, label?: string }) => (
    <div 
      className="absolute left-1/2 top-1/2 preserve-3d pointer-events-none"
      style={{ transform: `translate3d(-50%, -50%, ${z}px)` }}
    >
        {/* Arch Structure */}
        <div className="w-[80vw] md:w-[600px] h-[60vh] md:h-[500px] border-x-2 border-t-2 border-emerald-500/20 rounded-t-full relative shadow-[0_0_50px_rgba(16,185,129,0.05)]">
            {/* Inner Glow */}
            <div className="absolute inset-0 border-x border-t border-emerald-400/10 rounded-t-full blur-md" />
            
            {/* Label Plate */}
            {label && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black border border-emerald-500/50 px-6 py-2 rounded-full">
                    <div className="text-emerald-400 font-[Orbitron] tracking-[0.3em] text-xs md:text-sm whitespace-nowrap uppercase shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                        {label}
                    </div>
                </div>
            )}
            
            {/* Floor Marker */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        </div>
    </div>
);

// 2. The Glass Case Exhibit
const ExhibitCase = ({ z, x, data, onClick }: { z: number, x: number, data: ExhibitData, onClick: () => void }) => {
    return (
        <div 
            className="absolute top-1/2 left-1/2 preserve-3d cursor-pointer group"
            style={{ transform: `translate3d(calc(-50% + ${x}px), -50%, ${z}px)` }}
            onClick={onClick}
        >
            {/* Pedestal Base */}
            <div className="absolute top-[150px] left-1/2 -translate-x-1/2 w-32 md:w-40 h-[400px] bg-gradient-to-b from-neutral-900 to-black border-x border-emerald-900/30" />
            
            {/* Floating Glass Case */}
            <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-64 md:w-72 h-80 preserve-3d hover:translate-y-[-10px] transition-transform duration-500 ease-out">
                {/* Back Plane */}
                <div className="absolute inset-0 bg-emerald-900/10 border border-emerald-500/20 backdrop-blur-sm" />
                
                {/* Holographic Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                    <div className="w-20 h-20 rounded-full border-2 border-emerald-500/30 flex items-center justify-center mb-6 bg-black/50 group-hover:border-emerald-400 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300">
                        <div className="text-emerald-300 group-hover:scale-110 transition-transform duration-300">
                            {data.icon}
                        </div>
                    </div>
                    <h3 className="text-white font-[Orbitron] text-lg mb-2">{data.title}</h3>
                    <div className="text-emerald-400/60 font-mono text-xs tracking-widest uppercase">{data.subtitle}</div>
                    
                    {/* Hover Detail */}
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded border border-emerald-500/30">
                            INSPECT ARTIFACT
                        </span>
                    </div>
                </div>

                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-500/50" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-500/50" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-500/50" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-500/50" />
            </div>

            {/* Floor Shadow */}
            <div className="absolute top-[200px] left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                style={{ transform: 'rotateX(90deg)' }} 
            />
        </div>
    );
};

// 3. The Skill Matrix Wall
const SkillInstallation = ({ z }: { z: number }) => (
    <div 
        className="absolute top-1/2 left-1/2 preserve-3d"
        style={{ transform: `translate3d(-50%, -50%, ${z}px)` }}
    >
        <div className="w-[90vw] md:w-[1000px] h-[600px] bg-black/80 border border-emerald-900/50 backdrop-blur-md grid grid-cols-2 md:grid-cols-4 gap-4 p-8 relative overflow-hidden">
             {/* Header */}
             <div className="col-span-full text-center border-b border-emerald-500/20 pb-6 mb-6">
                 <h2 className="text-3xl font-[Orbitron] text-white tracking-[0.2em]">NEURAL ARSENAL</h2>
                 <div className="text-emerald-500/50 font-mono text-xs mt-2">SYSTEM INTEGRITY: 100%</div>
             </div>

             {/* Skill Nodes */}
             {[...SKILLS[0].items, ...SKILLS[1].items, ...SKILLS[2].items].slice(0, 12).map((skill, i) => (
                 <div key={i} className="group relative border border-emerald-500/10 bg-emerald-950/10 p-4 flex flex-col items-center justify-center hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
                     <Cpu size={20} className="text-emerald-700 mb-3 group-hover:text-emerald-400 group-hover:animate-pulse" />
                     <span className="text-xs font-mono text-emerald-200/50 group-hover:text-white text-center">{skill}</span>
                     
                     {/* Hover Glow */}
                     <div className="absolute inset-0 bg-emerald-400/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
             ))}

             {/* Animated Scanline */}
             <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50 shadow-[0_0_20px_#10b981] animate-[scan_4s_linear_infinite]" />
        </div>
    </div>
);

// 4. Modal Detail View
const DetailModal = ({ data, onClose }: { data: ExhibitData, onClose: () => void }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
    >
        <button onClick={onClose} className="absolute top-6 right-6 text-emerald-500/50 hover:text-emerald-400 transition-colors">
            <X size={32} />
        </button>

        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            {/* Visual Side */}
            <div className="md:col-span-2 flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                    <div className="absolute inset-0 border-2 border-dashed border-emerald-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
                    <div className="absolute inset-4 border border-emerald-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                            {React.cloneElement(data.icon as React.ReactElement<any>, { size: 80 })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Side */}
            <div className="md:col-span-3 text-left">
                <div className="flex items-center gap-4 mb-4">
                     <span className="px-3 py-1 bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-xs font-mono rounded">
                         EXHIBIT_DATA
                     </span>
                     {data.date && <span className="text-emerald-700 font-mono text-xs">{data.date}</span>}
                </div>
                
                <h2 className="text-4xl md:text-5xl font-[Orbitron] text-white mb-2">{data.title}</h2>
                <h3 className="text-xl text-emerald-200/60 font-light italic mb-8">{data.subtitle}</h3>
                
                <p className="text-gray-300 leading-relaxed text-lg border-l-2 border-emerald-900 pl-6 mb-8">
                    {data.description}
                </p>

                {data.tags && (
                    <div>
                        <div className="text-xs text-emerald-800 uppercase tracking-widest mb-3">Associated Technologies</div>
                        <div className="flex flex-wrap gap-2">
                            {data.tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-xs text-gray-400 rounded hover:border-emerald-500/30 hover:text-emerald-300 transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </motion.div>
);

// --- Main View ---

export const DimensionView = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll({ container: containerRef });
    const [selectedExhibit, setSelectedExhibit] = useState<ExhibitData | null>(null);

    // Map scroll pixels to Z-depth
    // We scroll 0 -> 6000px
    // World moves 0 -> 5500px towards camera
    const worldZ = useTransform(scrollY, [0, 6000], [0, 5500]);
    const smoothZ = useSpring(worldZ, { stiffness: 60, damping: 20 });
    
    // Fade out intro text as we walk in
    const introOpacity = useTransform(scrollY, [0, 500], [1, 0]);
    const introScale = useTransform(scrollY, [0, 500], [1, 1.5]);

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden font-sans select-none perspective-[1000px]">
            
            {/* 1. Scroll Spacer (Invisible control) */}
            <div ref={containerRef} className="absolute inset-0 overflow-y-auto z-20 scrollbar-hide">
                <div style={{ height: '6000px' }} />
            </div>

            {/* 2. HUD Elements (Fixed) */}
            <div className="fixed top-0 left-0 w-full p-6 z-30 pointer-events-none flex justify-between mix-blend-difference">
                <div>
                    <h1 className="text-emerald-500 font-[Orbitron] tracking-widest text-lg">MUSEUM OF MASTERY</h1>
                    <div className="text-[10px] text-emerald-800 font-mono">ARCHITECT: HARIPRASAD C</div>
                </div>
                <motion.div 
                    style={{ opacity: introOpacity }}
                    className="flex items-center gap-2 text-emerald-500/50 text-xs font-mono"
                >
                    <ChevronDown size={14} className="animate-bounce" />
                    SCROLL TO ENTER
                </motion.div>
            </div>

            {/* 3. Intro Screen (Fades out) */}
            <motion.div 
                style={{ opacity: introOpacity, scale: introScale }}
                className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
            >
                 <div className="text-[15vw] font-[Orbitron] font-bold text-transparent bg-clip-text bg-gradient-to-b from-emerald-100/20 to-transparent leading-none">
                     LEGACY
                 </div>
                 <div className="text-xl md:text-3xl text-emerald-500 font-light tracking-[1em] uppercase mt-[-1vw]">
                     Archive_01
                 </div>
            </motion.div>

            {/* 4. The 3D World */}
            <div className="fixed inset-0 pointer-events-none">
                <motion.div 
                    className="absolute inset-0 preserve-3d"
                    style={{ translateZ: smoothZ }}
                >
                    {/* -- WORLD CONTENT -- */}
                    
                    {/* Floor Grid */}
                    <div 
                        className="absolute inset-[-200%] bg-[radial-gradient(circle_at_center,transparent_0%,#000_60%)] opacity-50"
                        style={{
                            transform: 'rotateX(90deg) translateZ(300px)',
                            backgroundSize: '100px 100px',
                            backgroundImage: 'linear-gradient(to right, rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.1) 1px, transparent 1px)'
                        }}
                    />

                    {/* Ceiling Lights */}
                    {[...Array(5)].map((_, i) => (
                        <div 
                            key={i}
                            className="absolute left-1/2 -translate-x-1/2 w-[200px] h-[20px] bg-emerald-500/30 blur-xl"
                            style={{ transform: `translate3d(-50%, -400px, -${i * 1200}px)` }}
                        />
                    ))}

                    {/* ZONE 1: ACADEMIA (Z: -800) */}
                    <HallwayArch z={-500} label="Origins" />
                    
                    <ExhibitCase 
                        z={-1000} 
                        x={0} 
                        data={{
                            id: 'edu',
                            title: EDUCATION[0].institution,
                            subtitle: EDUCATION[0].degree,
                            description: `Graduated with ${EDUCATION[0].grade} in ${EDUCATION[0].period}. Core focus on Computer Science fundamentals.`,
                            icon: <Globe />,
                            tags: ["CS Fundamentals", "Algorithms"],
                            date: "2017-2021"
                        }}
                        onClick={() => setSelectedExhibit({
                            id: 'edu',
                            title: EDUCATION[0].institution,
                            subtitle: EDUCATION[0].degree,
                            description: `Graduated with ${EDUCATION[0].grade} in ${EDUCATION[0].period}. Core focus on Computer Science fundamentals.`,
                            icon: <Globe />,
                            tags: ["CS Fundamentals", "Algorithms"],
                            date: "2017-2021"
                        })} 
                    />

                    {/* ZONE 2: PROFESSIONAL (Z: -1800 to -2800) */}
                    <HallwayArch z={-1600} label="Professional" />

                    <ExhibitCase 
                        z={-2000} 
                        x={-350} 
                        data={{
                            id: 'quest',
                            title: EXPERIENCE[1].company,
                            subtitle: EXPERIENCE[1].role,
                            description: EXPERIENCE[1].description[0],
                            icon: <Layout />,
                            tags: ["C#", "WPF", "Medical Imaging"],
                            date: EXPERIENCE[1].period
                        }}
                        onClick={() => setSelectedExhibit({
                            id: 'quest',
                            title: EXPERIENCE[1].company,
                            subtitle: EXPERIENCE[1].role,
                            description: EXPERIENCE[1].description.join(" "),
                            icon: <Layout />,
                            tags: ["C#", "WPF", "Medical Imaging"],
                            date: EXPERIENCE[1].period
                        })} 
                    />

                    <ExhibitCase 
                        z={-2800} 
                        x={350} 
                        data={{
                            id: 'soti',
                            title: EXPERIENCE[0].company,
                            subtitle: EXPERIENCE[0].role,
                            description: EXPERIENCE[0].description[0],
                            icon: <Trophy />,
                            tags: EXPERIENCE[0].technologies || [".NET", "Scalability"],
                            date: EXPERIENCE[0].period
                        }}
                        onClick={() => setSelectedExhibit({
                            id: 'soti',
                            title: EXPERIENCE[0].company,
                            subtitle: EXPERIENCE[0].role,
                            description: EXPERIENCE[0].description.join(" "),
                            icon: <Trophy />,
                            tags: EXPERIENCE[0].technologies || [".NET", "Scalability"],
                            date: EXPERIENCE[0].period
                        })} 
                    />

                    {/* ZONE 3: SKILLS (Z: -3800) */}
                    <HallwayArch z={-3500} label="Arsenal" />
                    
                    <SkillInstallation z={-4000} />

                    {/* END PORTAL */}
                    <div 
                        className="absolute left-1/2 top-1/2 w-[200px] h-[200px] bg-white rounded-full blur-[100px]"
                        style={{ transform: 'translate3d(-50%, -50%, -5000px)' }}
                    />

                </motion.div>
            </div>

            {/* 5. Modals (Outside 3D context) */}
            <AnimatePresence>
                {selectedExhibit && (
                    <DetailModal data={selectedExhibit} onClose={() => setSelectedExhibit(null)} />
                )}
            </AnimatePresence>

            {/* Styles */}
            <style>{`
                .preserve-3d { transform-style: preserve-3d; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                
                @keyframes scan {
                    0% { top: 0; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>
        </div>
    );
};