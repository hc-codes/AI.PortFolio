import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PERSONAL_INFO, EXPERIENCE, SKILLS } from '../constants';
import { Cpu, Wifi, Battery, Activity, Shield, Terminal, Globe, Lock } from 'lucide-react';

// --- HUD Components ---

const GlitchText = ({ text }: { text: string }) => {
  return (
    <div className="relative inline-block group">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-pink-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 select-none">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 select-none">
        {text}
      </span>
    </div>
  );
}

const StatBar = ({ label, value, color = "bg-cyan-500" }: any) => (
  <div className="flex items-center gap-2 mb-1">
    <div className="text-[10px] font-mono text-cyan-300 w-12 text-right">{label}</div>
    <div className="flex-1 h-1.5 bg-cyan-900/50 rounded-sm overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, delay: 0.5 }}
        className={`h-full ${color} shadow-[0_0_10px_currentColor]`} 
      />
    </div>
  </div>
);

// --- Main Hologram ---

export const WorkstationView = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  
  // Parallax Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [20, -20]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-20, 20]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      x.set((mouseX / width) - 0.5);
      y.set((mouseY / height) - 0.5);
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center perspective-[1500px] font-mono select-none"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1a2e35_0%,_#000000_100%)] opacity-40 pointer-events-none" />
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      
      {/* Moving Grid Floor */}
      <div className="absolute bottom-0 left-[-50%] w-[200%] h-[50vh] bg-[linear-gradient(transparent_0%,_rgba(0,255,255,0.1)_1px,_transparent_1px),linear-gradient(90deg,transparent_0%,_rgba(0,255,255,0.1)_1px,_transparent_1px)] bg-[length:40px_40px] [transform:perspective(500px)_rotateX(60deg)] animate-[grid-move_20s_linear_infinite] opacity-30" />

      {/* Main Holographic Container */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-[90vw] max-w-[1000px] h-[70vh] min-h-[600px]"
      >
        {/* Layer 1: Backplane (Glow) */}
        <div 
          className="absolute inset-0 border border-cyan-500/30 bg-black/60 backdrop-blur-md rounded-lg shadow-[0_0_50px_rgba(6,182,212,0.15)]"
          style={{ transform: "translateZ(-50px)" }}
        />

        {/* Layer 2: Decorative Frame Elements */}
        <div className="absolute -top-10 -left-10 text-cyan-800/50 text-xs font-bold rotate-90 origin-bottom-left">SYSTEM_OVERRIDE_ACTIVE</div>
        <div className="absolute top-0 left-0 w-full h-full border-x border-cyan-500/20 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-cyan-500/10" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-cyan-500/10" />

        {/* Layer 3: Main Content (Floating) */}
        <div 
          className="absolute inset-4 border border-cyan-500/50 rounded bg-black/40 flex flex-col overflow-hidden"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Header Bar */}
          <div className="h-12 border-b border-cyan-500/50 flex items-center justify-between px-4 bg-cyan-950/20">
            <div className="flex items-center gap-3 text-cyan-400">
               <Cpu size={16} className="animate-pulse" />
               <span className="font-bold tracking-widest text-sm">HARIPRASAD_C.EXE</span>
            </div>
            <div className="flex gap-4 text-xs text-cyan-600 font-bold">
              <span className="flex items-center gap-1"><Wifi size={12} /> NET_CONNECTED</span>
              <span className="flex items-center gap-1"><Battery size={12} /> PWR_100%</span>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-16 md:w-48 border-r border-cyan-500/30 flex flex-col py-4 bg-black/20">
              {[
                { icon: <Terminal size={18} />, label: "DASHBOARD" },
                { icon: <Activity size={18} />, label: "EXPERIENCE" },
                { icon: <Shield size={18} />, label: "SKILLS" },
                { icon: <Globe size={18} />, label: "NETWORK" },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`
                    relative group flex items-center gap-3 px-4 py-3 text-sm transition-all
                    ${activeTab === idx ? 'text-cyan-400 bg-cyan-500/10' : 'text-cyan-800 hover:text-cyan-600'}
                  `}
                >
                  {activeTab === idx && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-cyan-400 shadow-[0_0_10px_cyan]" />}
                  {item.icon}
                  <span className="hidden md:block font-bold tracking-wider group-hover:tracking-widest transition-all">{item.label}</span>
                </button>
              ))}
              
              <div className="mt-auto px-4 pb-4 opacity-50">
                 <div className="w-full h-32 border border-cyan-900/50 relative overflow-hidden">
                    {/* Fake Waveform */}
                    <div className="absolute inset-0 flex items-center justify-center gap-0.5">
                       {[...Array(20)].map((_,i) => (
                         <motion.div 
                           key={i}
                           animate={{ height: [5, 20, 5] }}
                           transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                           className="w-1 bg-cyan-800"
                         />
                       ))}
                    </div>
                 </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar relative">
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20" />
              
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {activeTab === 0 && (
                  <div className="space-y-8">
                     <div className="border border-cyan-500/30 p-6 bg-cyan-950/10 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-2 text-[10px] text-cyan-700">ID: #8492-A</div>
                       <h2 className="text-3xl text-white font-bold mb-2 glitch-text"><GlitchText text={PERSONAL_INFO.name} /></h2>
                       <p className="text-cyan-400 mb-4">> {PERSONAL_INFO.role}</p>
                       <p className="text-cyan-200/70 text-sm leading-relaxed max-w-lg">
                         {PERSONAL_INFO.summary}
                       </p>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="border border-cyan-500/30 p-4">
                           <div className="text-xs text-cyan-600 mb-2">PROJECTS_COMPLETED</div>
                           <div className="text-2xl text-white font-bold">25+</div>
                        </div>
                        <div className="border border-cyan-500/30 p-4">
                           <div className="text-xs text-cyan-600 mb-2">SYSTEM_UPTIME</div>
                           <div className="text-2xl text-white font-bold">99.9%</div>
                        </div>
                     </div>
                  </div>
                )}

                {activeTab === 1 && (
                  <div className="space-y-6">
                    {EXPERIENCE.map((exp, i) => (
                      <div key={i} className="relative pl-6 border-l border-cyan-800/50 pb-8 last:pb-0">
                        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-black border border-cyan-500 rounded-full" />
                        <div className="flex justify-between items-start">
                           <h3 className="text-xl text-white font-bold">{exp.role}</h3>
                           <span className="text-xs text-cyan-500 border border-cyan-500/30 px-2 py-1">{exp.period}</span>
                        </div>
                        <div className="text-cyan-400 text-sm mb-2">{exp.company}</div>
                        <div className="text-cyan-200/60 text-xs space-y-2">
                           {exp.description.map((d,j) => <div key={j}>> {d}</div>)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 2 && (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {SKILLS.map((cat, i) => (
                        <div key={i}>
                          <h4 className="text-cyan-500 font-bold mb-4 border-b border-cyan-900 pb-1">{cat.category}</h4>
                          <div className="space-y-2">
                             {cat.items.map((skill, j) => (
                               <StatBar key={j} label={skill.substring(0,4)} value={Math.random() * 30 + 70} color={i === 0 ? 'bg-cyan-500' : i === 1 ? 'bg-pink-500' : 'bg-yellow-500'} />
                             ))}
                          </div>
                        </div>
                      ))}
                   </div>
                )}

                {activeTab === 3 && (
                   <div className="flex flex-col items-center justify-center h-full pt-10">
                      <div className="w-32 h-32 border-2 border-dashed border-cyan-500/30 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                         <Globe size={40} className="text-cyan-500" />
                      </div>
                      <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                         <a href="#" className="border border-cyan-500/30 p-4 text-center hover:bg-cyan-500/10 transition-colors text-cyan-300">GITHUB_LINK</a>
                         <a href="#" className="border border-cyan-500/30 p-4 text-center hover:bg-cyan-500/10 transition-colors text-cyan-300">LINKEDIN_UPLINK</a>
                         <a href="#" className="border border-cyan-500/30 p-4 text-center hover:bg-cyan-500/10 transition-colors text-cyan-300 col-span-2">MAIL_ENCRYPTED</a>
                      </div>
                   </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Floating Elements in 3D Space */}
        <motion.div 
           className="absolute -right-20 top-20 w-40 p-4 border border-pink-500/30 bg-black/80 text-pink-500 text-xs font-mono"
           style={{ transform: "translateZ(80px)" }}
           animate={{ y: [0, -10, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex justify-between mb-2">
            <span>CORE_TEMP</span>
            <span>42°C</span>
          </div>
          <div className="w-full bg-pink-900/30 h-1">
             <div className="w-[70%] bg-pink-500 h-full shadow-[0_0_5px_pink]" />
          </div>
        </motion.div>

        <motion.div 
           className="absolute -left-10 bottom-20 w-32 p-3 border border-yellow-500/30 bg-black/80 text-yellow-500 text-xs font-mono"
           style={{ transform: "translateZ(60px)" }}
           animate={{ y: [0, 10, 0] }}
           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
           <Lock size={12} className="mb-2" />
           <div>SECURITY LEVEL: MAX</div>
        </motion.div>

      </motion.div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #06b6d4; }
      `}</style>
    </div>
  );
};
