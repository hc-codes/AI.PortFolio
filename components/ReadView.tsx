import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { PERSONAL_INFO, EXPERIENCE, EDUCATION, SKILLS, ACHIEVEMENTS } from '../constants';
import { ArrowDown } from 'lucide-react';

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <section className={`min-h-screen flex flex-col justify-center px-6 md:px-20 py-20 snap-start relative ${className}`}>
      {children}
    </section>
  );
};

const AnimatedText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        viewport={{ once: false, margin: "-10%" }}
      >
        {text}
      </motion.div>
    </div>
  );
};

export const ReadView = () => {
  const { config } = useTheme();
  
  return (
    <div className={`bg-white text-black selection:bg-black selection:text-white snap-y snap-mandatory h-screen overflow-y-auto scroll-smooth`}>
      
      {/* Intro Section */}
      <Section>
        <div className="max-w-6xl w-full">
          <motion.div 
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            transition={{ duration: 1.5, ease: "circOut" }}
            className="w-full h-1 bg-black mb-12 origin-left"
          />
          <h1 className={`${config.fontSerif} text-[12vw] leading-[0.8] tracking-tighter font-medium uppercase mix-blend-difference`}>
            {PERSONAL_INFO.name.split(' ')[0]}<br/>
            <span className="italic font-light ml-[10vw]">{PERSONAL_INFO.name.split(' ')[1]}</span>
          </h1>
          <div className="mt-12 flex justify-between items-end">
            <div className={`${config.fontMono} text-sm md:text-base max-w-sm`}>
              {PERSONAL_INFO.role}<br/>
              Based in India.<br/>
              Available for Global Remote Work.
            </div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown size={32} strokeWidth={1} />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Philosophy / Summary Section */}
      <Section className="bg-neutral-100">
        <div className="max-w-4xl">
           <h2 className={`${config.fontMono} text-xs uppercase tracking-[0.3em] mb-12`}>01 — The Approach</h2>
           <p className={`${config.fontSerif} text-3xl md:text-5xl leading-tight indent-20`}>
             "{PERSONAL_INFO.summary}"
           </p>
        </div>
      </Section>

      {/* Experience - Editorial Style */}
      <Section>
        <div className="w-full max-w-6xl">
          <h2 className={`${config.fontMono} text-xs uppercase tracking-[0.3em] mb-20 border-b border-black pb-4`}>02 — Selected Works</h2>
          
          <div className="space-y-32">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-12 group cursor-default">
                <div className="md:w-1/3">
                  <div className={`${config.fontMono} text-sm opacity-50 mb-2`}>{exp.period}</div>
                  <div className={`${config.fontSerif} text-4xl italic group-hover:translate-x-4 transition-transform duration-500`}>{exp.company}</div>
                </div>
                <div className="md:w-2/3 border-l border-neutral-300 pl-8 md:pl-16 pt-2">
                   <h3 className="text-2xl font-bold mb-6">{exp.role}</h3>
                   <ul className="space-y-4">
                     {exp.description.map((desc, j) => (
                       <li key={j} className="text-lg leading-relaxed opacity-70 hover:opacity-100 transition-opacity">
                         {desc}
                       </li>
                     ))}
                   </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Expertise & Skills - List Style */}
      <Section className="bg-black text-white">
        <div className="w-full max-w-6xl">
          <h2 className={`${config.fontMono} text-xs uppercase tracking-[0.3em] mb-20 border-b border-white/20 pb-4`}>03 — Arsenal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {SKILLS.map((cat, i) => (
               <div key={i}>
                 <h3 className={`${config.fontSerif} text-3xl italic mb-8 text-neutral-400`}>{cat.category}</h3>
                 <ul className={`${config.fontMono} space-y-4 text-lg`}>
                   {cat.items.map((skill, j) => (
                     <li key={j} className="border-b border-white/10 pb-2 hover:pl-4 transition-all duration-300">
                       {skill}
                     </li>
                   ))}
                 </ul>
               </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact / Footer */}
      <Section>
        <div className="text-center w-full">
          <div className={`${config.fontMono} text-xs uppercase tracking-[0.3em] mb-8`}>Initiate Sequence</div>
          <a href={`mailto:${PERSONAL_INFO.contact.email}`} className={`${config.fontSerif} text-6xl md:text-9xl hover:italic transition-all duration-500 block mb-8`}>
            Let's Talk.
          </a>
          <div className="flex justify-center gap-8 uppercase text-xs font-bold tracking-widest">
            <a href={`https://github.com/${PERSONAL_INFO.contact.github}`} className="hover:underline">Github</a>
            <a href={`https://linkedin.com/in/${PERSONAL_INFO.contact.linkedin}`} className="hover:underline">LinkedIn</a>
            <a href="#" className="hover:underline">Resume</a>
          </div>
        </div>
      </Section>

    </div>
  );
};
