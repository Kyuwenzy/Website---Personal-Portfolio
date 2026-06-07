'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Globe, BrainCircuit, TestTube, Sparkles, BarChart3, GitBranch, Network, Users } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

const { skills } = portfolioData;
const iconMap: Record<string, React.ElementType> = {
  Globe, BrainCircuit, TestTube, Sparkles, BarChart3, GitBranch, Network, Users,
};
const proficiencyMap: Record<string, number> = {
  'Web Development': 82, 'Machine Learning': 78, 'Testing & QA': 75,
  'AI Tools': 90, 'Data & Analytics': 60, 'DevOps & Version Control': 72,
  'IT & Networking': 65, 'Collaboration': 88,
};
const romanIndex = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

function MaskedReveal({ children, inView, delay = 0 }: { children: React.ReactNode; inView: boolean; delay?: number }) {
  return (
    <span style={{ display: 'block', overflow: 'hidden', lineHeight: '1.1' }}>
      <motion.span
        style={{ display: 'block' }}
        initial={{ y: '105%' }}
        animate={inView ? { y: '0%' } : { y: '105%' }}
        transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const tickerItems = Array(8).fill(
    "WEB DEVELOPMENT • MACHINE LEARNING • FULL STACK ENGINEERING • SYSTEM DESIGN • API DEVELOPMENT • UI/UX IMPLEMENTATION • DATABASES • AUTOMATION TESTING"
  );

  return (
    <section
      id="skills"
      className="relative py-40 overflow-hidden bg-[var(--bg-primary)] border-b border-[var(--border-strong)]"
    >
      <div className="max-w-7xl mx-auto px-6 mb-20" ref={ref}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="font-mono text-[10px] tracking-[0.4em] uppercase mb-6 block"
          style={{ color: 'var(--accent)' }}
        >
          02 // THE COMPETENCY MATRIX
        </motion.span>

        <div
          className="font-display font-light tracking-tighter leading-[0.9] text-[var(--text-primary)] uppercase"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
        >
          <MaskedReveal inView={inView} delay={0.1}>Technical</MaskedReveal>
          <MaskedReveal inView={inView} delay={0.22}>
            <span className="italic font-serif font-normal lowercase pr-4" style={{ color: 'var(--accent)' }}>
              capabilities.
            </span>
          </MaskedReveal>
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="w-full border-y-2 border-[var(--text-primary)] py-4 bg-[var(--bg-secondary)] flex overflow-hidden select-none mb-24">
        <motion.div
          className="flex whitespace-nowrap gap-4 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--text-primary)] font-bold shrink-0"
          animate={{ x: [0, -1200] }}
          transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
        >
          {tickerItems.map((text, idx) => (
            <span key={idx} className="flex items-center gap-4">
              {text}<span style={{ color: 'var(--accent)' }}>■</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Asymmetric grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 border-t border-l border-[var(--border-strong)]">
          {skills.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Globe;
            const pct = proficiencyMap[cat.category] || 70;
            const isActive = activeCategory === cat.category;
            const isInverted = i === 1 || i === 6;
            const gridSpans = [
              'md:col-span-8','md:col-span-4','md:col-span-5','md:col-span-7',
              'md:col-span-6','md:col-span-6','md:col-span-4','md:col-span-8',
            ];

            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '0px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                onClick={() => setActiveCategory(isActive ? null : cat.category)}
                className={`${gridSpans[i % gridSpans.length]} relative p-8 border-r border-b border-[var(--border-strong)] cursor-pointer transition-all duration-300 flex flex-col justify-between select-none group ${
                  isInverted
                    ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                    : 'bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--accent-muted)]'
                }`}
              >
                {/* Ghost Roman numeral */}
                <div
                  aria-hidden
                  className="absolute bottom-2 right-3 font-display font-black leading-none pointer-events-none select-none"
                  style={{
                    fontSize: 'clamp(4rem, 8vw, 8rem)',
                    opacity: isInverted ? 0.055 : 'var(--watermark-opacity)',
                    color: isInverted ? '#fff' : 'var(--text-primary)',
                  }}
                >
                  {romanIndex[i]}
                </div>

                {/* Hover sweep line */}
                {!isInverted && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px]"
                    style={{ backgroundColor: 'var(--accent)' }}
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}

                <div>
                  <div className="flex items-start justify-between w-full mb-10">
                    <div>
                      <span className={`font-mono text-[9px] tracking-widest block mb-1 ${
                        isInverted ? 'text-[var(--bg-primary)]/60' : ''
                      }`}
                      style={{ color: isInverted ? undefined : 'var(--accent)' }}
                      >
                        CATALOGUE NO. 0{i + 1}
                      </span>
                      <h3 className="font-display text-2xl lg:text-3xl font-light tracking-tight uppercase mt-1">
                        {cat.category}
                      </h3>
                    </div>
                    <div className={`w-8 h-8 border flex items-center justify-center transition-transform duration-500 group-hover:rotate-90 ${
                      isInverted ? 'border-[var(--bg-primary)]/20 text-[var(--bg-primary)]' : 'border-[var(--border-strong)]'
                    }`}
                    style={{ color: isInverted ? undefined : 'var(--accent)' }}
                    >
                      <Icon size={13} />
                    </div>
                  </div>

                  {/* Proficiency bar */}
                  <div className="mb-8 font-mono">
                    <div className="flex justify-between items-baseline text-[10px] tracking-widest uppercase mb-2 opacity-70">
                      <span>Index Evaluation</span>
                      <span className="font-bold">{pct}%</span>
                    </div>
                    <div className={`w-full h-[1px] relative ${isInverted ? 'bg-[var(--bg-primary)]/15' : 'bg-[var(--border-strong)]'}`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true, margin: '0px' }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                        className="absolute top-0 bottom-0 left-0 h-[2px]"
                        style={{ backgroundColor: 'var(--accent)' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  <AnimatePresence initial={false}>
                    {cat.items.slice(0, isActive ? cat.items.length : 4).map((item) => (
                      <span key={item}
                        className={`text-[11px] font-mono tracking-tight flex items-center gap-1.5 ${
                          isInverted ? 'text-[var(--bg-primary)]/75' : 'text-[var(--text-secondary)]'
                        }`}
                      >
                        <span style={{ color: 'var(--accent)' }}>•</span>{item}
                      </span>
                    ))}
                  </AnimatePresence>
                  {!isActive && cat.items.length > 4 && (
                    <span className="text-[10px] font-mono tracking-wider uppercase underline underline-offset-4 decoration-dotted font-medium"
                      style={{ color: isInverted ? 'var(--bg-primary)' : 'var(--accent)' }}
                    >
                      Expand [{cat.items.length - 4}]
                    </span>
                  )}
                </div>

                <div
                  className="absolute top-0 bottom-0 right-0 w-[2px] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 flex flex-col md:flex-row justify-between gap-4 font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-widest border-t border-[var(--border-strong)] pt-6">
        <span>* DATASET REFLECTS 2026 BENCHMARK VERIFICATION</span>
        <span>CLICK CARD TO EXPAND ALL SKILLS</span>
      </div>

      <div className="section-folio">
        <span>Quenzzy J. Navelgas — Portfolio 2026</span>
        <span>02 / 07</span>
      </div>
    </section>
  );
}