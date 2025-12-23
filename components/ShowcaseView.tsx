import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { PERSONAL_INFO, EXPERIENCE, SKILLS, EDUCATION } from '../constants';
import { ChevronDown, ExternalLink, Github, Linkedin, Mail, Zap, Server, Code2 } from 'lucide-react';

// --- Sub-components ---

const HeroParticles = () => {
  // Simple CSS-based particle field for performance + aesthetics
  const particles = useMemo(() => [...Array(20)], []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-500 blur-xl opacity-20"
          style={{
            width: Math.random() * 300 + 50,
            height: Math.random() * 300 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/50 to-[#030014]" />
    </div>
  );
};

const GlassCard = ({ children, className = "", hover = true }: { children: React.ReactNode, className?: string, hover?: boolean }) => (
  <motion.div
    whileHover={hover ? { scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" } : {}}
    className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl ${className}`}
  >
    {children}
  </motion.div>
);

const TimelineItem = ({ exp, index }: { exp: typeof EXPERIENCE[0], index: number }) => {
  const isEven = index % 2 === 0;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative flex items-center justify-between md:justify-center mb-16 w-full ${isEven ? 'flex-row-reverse' : ''}`}
    >
      {/* Center Line Dot */}
      <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_15px_#a855f7] z-10 -translate-x-1/2 border-2 border-[#030014]" />
      
      {/* Spacer for Desktop Layout */}
      <div className="hidden md:block w-5/12" />

      {/* Content Card */}
      <div className="w-full md:w-5/12 pl-12 md:pl-0">
         <GlassCard className="relative overflow-hidden group">
            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono mb-4 border border-purple-500/30">
                {exp.period}
              </span>
              <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
              <div className="text-lg text-blue-300 mb-4 font-medium">{exp.company}</div>
              <ul className="space-y-2 text-sm text-gray-400">
                {exp.description.slice(0, 3).map((d, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-purple-500 mt-1">▹</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
         </GlassCard>
      </div>
    </motion.div>
  );
};

const SkillPlanet = ({ skill, index, total }: { skill: string, index: number, total: number }) => {
  const angle = (index / total) * Math.PI * 2;
  const radius = 140; // Desktop radius
  
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 flex items-center justify-center"
      style={{ marginLeft: -30, marginTop: -30, width: 60, height: 60 }}
      animate={{
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      }}
    >
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-purple-900/50 rounded-full blur-md" />
        <div className="relative z-10 bg-[#0a0a0a] border border-purple-500/50 rounded-full w-12 h-12 flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]">
           {skill.substring(0, 4)}
        </div>
        {/* Label on Hover */}
        <div className="absolute top-full mt-2 text-xs text-purple-200 opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap bg-black/80 px-2 py-1 rounded border border-purple-500/20">
            {skill}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Galaxy = () => {
    const skills = [...SKILLS[0].items, ...SKILLS[1].items].slice(0, 8);
    
    return (
        <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center">
            {/* Core */}
            <div className="absolute w-24 h-24 bg-white rounded-full blur-2xl opacity-20 animate-pulse" />
            <div className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center z-20 shadow-[0_0_50px_rgba(255,255,255,0.5)]">
               <Zap className="text-black fill-black" />
            </div>
            
            {/* Orbits */}
            <div className="absolute border border-purple-500/20 rounded-full w-[280px] h-[280px] animate-[spin_60s_linear_infinite]" />
            <div className="absolute border border-blue-500/20 rounded-full w-[200px] h-[200px] animate-[spin_40s_linear_infinite_reverse]" />
            
            {/* Planets */}
            <div className="absolute inset-0 animate-[spin_100s_linear_infinite]">
                 {skills.map((s, i) => (
                     <SkillPlanet key={i} skill={s} index={i} total={skills.length} />
                 ))}
            </div>
        </div>
    )
}

// --- Main View ---

export const ShowcaseView = () => {
  const { config } = useTheme();
  const scrollRef = useRef(null);
  
  return (
    <div ref={scrollRef} className={`min-h-screen ${config.bg} ${config.fg} font-sans selection:bg-purple-500/30 selection:text-white overflow-x-hidden`}>
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-[#030014]/50 border-b border-white/5">
         <div className={`text-xl font-bold tracking-tighter flex items-center gap-2 ${config.fontDisplay}`}>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
            HARIPRASAD_C
         </div>
         <div className="flex gap-4">
            <a href={`mailto:${PERSONAL_INFO.contact.email}`} className="p-2 hover:bg-white/10 rounded-full transition-colors"><Mail size={18} /></a>
            <a href={`https://github.com/${PERSONAL_INFO.contact.github}`} className="p-2 hover:bg-white/10 rounded-full transition-colors"><Github size={18} /></a>
            <a href={`https://linkedin.com/in/${PERSONAL_INFO.contact.linkedin}`} className="p-2 hover:bg-white/10 rounded-full transition-colors"><Linkedin size={18} /></a>
         </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <HeroParticles />
        
        <div className="max-w-5xl w-full z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1 }}
            >
               <div className="inline-block px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-mono mb-6 backdrop-blur-md">
                  System Architecture & Backend Specialist
               </div>
               <h1 className={`text-5xl md:text-7xl font-bold leading-tight mb-6 ${config.fontDisplay}`}>
                  BUILDING <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">SCALABLE</span> <br />
                  FUTURE.
               </h1>
               <p className="text-lg text-gray-400 max-w-lg mb-8 leading-relaxed">
                  {PERSONAL_INFO.summary}
               </p>
               
               <div className="flex flex-wrap gap-4">
                   <button className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                      View Projects <ChevronDown size={18} />
                   </button>
                   <button className="px-8 py-4 border border-white/20 text-white font-bold rounded-lg hover:bg-white/5 transition-colors">
                      Contact Me
                   </button>
               </div>
            </motion.div>

            {/* Hero Visual: Galaxy */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1, delay: 0.2 }}
               className="hidden md:flex justify-center"
            >
                <Galaxy />
            </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 text-sm font-mono flex flex-col items-center gap-2"
        >
            SCROLL_TO_EXPLORE
            <ChevronDown size={16} />
        </motion.div>
      </section>

      {/* Tech Stack Marquee (Micro-interaction) */}
      <div className="w-full py-8 border-y border-white/5 bg-white/2 overflow-hidden flex items-center">
         <motion.div 
            className="flex gap-12 whitespace-nowrap text-2xl font-bold text-white/20 font-mono"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
         >
            {[...SKILLS[0].items, ...SKILLS[1].items, ...SKILLS[0].items, ...SKILLS[1].items].map((s, i) => (
                <span key={i} className="flex items-center gap-4">
                   <Zap size={16} className="text-purple-500" /> {s.toUpperCase()}
                </span>
            ))}
         </motion.div>
      </div>

      {/* Experience Timeline */}
      <section className="py-32 px-6 relative">
         <div className="max-w-5xl mx-auto">
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-24"
             >
                <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${config.fontDisplay}`}>CAREER <span className="text-purple-500">TIMELINE</span></h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
             </motion.div>

             <div className="relative">
                 {/* Vertical Line */}
                 <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-blue-500/20 to-transparent -translate-x-1/2" />
                 
                 {EXPERIENCE.map((exp, i) => (
                    <TimelineItem key={i} exp={exp} index={i} />
                 ))}
             </div>
         </div>
      </section>

      {/* Bento Grid Features (Misc Skills) */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-purple-900/10">
          <div className="max-w-6xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Card 1: Education */}
                 <GlassCard className="col-span-1 md:col-span-2 flex flex-col justify-between h-[300px]">
                     <div>
                        <div className="flex items-center gap-2 text-purple-400 mb-4">
                           <Server size={20} />
                           <span className="font-mono text-xs tracking-widest uppercase">Academic Core</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">{EDUCATION[0].institution}</h3>
                        <p className="text-gray-400">{EDUCATION[0].degree}</p>
                     </div>
                     <div className="flex justify-between items-end border-t border-white/10 pt-4">
                        <span className="text-sm font-mono text-gray-500">{EDUCATION[0].period}</span>
                        <span className="text-2xl font-bold text-white">{EDUCATION[0].grade}</span>
                     </div>
                 </GlassCard>
                 
                 {/* Card 2: Highlight */}
                 <GlassCard className="col-span-1 h-[300px] bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-purple-500/30">
                     <div className="h-full flex flex-col justify-center text-center">
                        <div className="text-5xl font-bold text-white mb-2">#1</div>
                        <div className="text-purple-200 uppercase tracking-widest text-xs mb-6">Ranked Developer</div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                           Top performer in a team of 21 developers at SOTI.
                        </p>
                     </div>
                 </GlassCard>

                 {/* Card 3: Tools */}
                 <GlassCard className="col-span-1 md:col-span-3">
                    <div className="flex items-center gap-2 text-blue-400 mb-6">
                           <Code2 size={20} />
                           <span className="font-mono text-xs tracking-widest uppercase">Technical Arsenal</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {SKILLS[2].items.map((item, i) => (
                           <span key={i} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-colors text-sm text-gray-300 cursor-default">
                              {item}
                           </span>
                        ))}
                    </div>
                 </GlassCard>
             </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="py-20 text-center border-t border-white/10 relative overflow-hidden">
         <div className="absolute inset-0 bg-purple-900/5 pointer-events-none" />
         <div className="relative z-10">
            <h2 className={`text-4xl md:text-6xl font-bold mb-8 ${config.fontDisplay}`}>READY TO <span className="text-purple-500">DEPLOY?</span></h2>
            <a href={`mailto:${PERSONAL_INFO.contact.email}`} className="inline-block px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
               Initiate Contact Sequence
            </a>
            <div className="mt-16 text-xs font-mono text-gray-600">
               SYSTEM_VERSION 3.0 // HARIPRASAD_C
            </div>
         </div>
      </footer>

    </div>
  );
};
