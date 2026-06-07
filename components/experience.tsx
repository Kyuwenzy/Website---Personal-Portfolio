'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { portfolioData } from '@/data/portfolio';

const { experience } = portfolioData;

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

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const activeExp = experience[activeIndex];

  return (
    <section
      id="experience"
      className="relative py-40 px-6 overflow-hidden bg-[var(--bg-primary)] border-b border-[var(--border-strong)]"
    >
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>

        {/* Header */}
        <div className="w-full border-b-2 border-[var(--text-primary)] pb-6 mb-24 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block"
              style={{ color: 'var(--accent)' }}
            >
              04 // THE ARCHIVE
            </motion.span>
            <div
              className="font-display font-light tracking-tighter text-[var(--text-primary)] leading-none uppercase"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
            >
              <MaskedReveal inView={inView} delay={0.1}>Professional</MaskedReveal>
              <MaskedReveal inView={inView} delay={0.22}>
                <span className="italic font-serif lowercase pr-4" style={{ color: 'var(--accent)' }}>timeline.</span>
              </MaskedReveal>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="font-mono text-[9px] text-[var(--text-muted)] tracking-widest uppercase mt-8 md:mt-0 text-left md:text-right"
          >
            Verified Chronology<br />2023 — Present Day
          </motion.div>
        </div>

        {/* Split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-l border-[var(--border-strong)]">

          {/* Index panel */}
          <div className="lg:col-span-4 flex flex-col border-r border-[var(--border-strong)]">
            <div className="hidden lg:flex items-center justify-between text-[9px] font-mono tracking-widest text-[var(--text-primary)] uppercase border-b border-[var(--border-strong)] p-6 bg-[var(--bg-secondary)]">
              <span>Timeline Frame</span><span>Organization</span>
            </div>

            {experience.map((exp, i) => {
              const isActive = activeIndex === i;
              return (
                <motion.div
                  key={`${exp.company}-${i}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  onClick={() => setActiveIndex(i)}
                  className={`group cursor-pointer p-6 border-b border-[var(--border-strong)] transition-all duration-300 flex flex-col justify-between min-h-[140px] select-none relative ${
                    isActive
                      ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                      : 'bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--accent-muted)]'
                  }`}
                  style={{ overflow: 'visible' }}
                >
                  {/* Hover sweep */}
                  {!isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px]"
                      style={{ backgroundColor: 'var(--accent)' }}
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}

                  <div className="flex justify-between items-start w-full">
                    <span className={`font-mono text-[10px] tracking-widest uppercase ${isActive ? 'text-[var(--bg-primary)]/70' : ''}`}
                      style={{ color: isActive ? undefined : 'var(--accent)' }}>
                      {exp.period}
                    </span>
                    <span className={`font-mono text-[9px] tracking-widest uppercase ${isActive ? 'text-[var(--bg-primary)]/50' : 'text-[var(--text-muted)]'}`}>
                      No. 0{i + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl md:text-3xl tracking-tight uppercase leading-none mb-2">
                      {exp.company}
                    </h3>
                    <div className={`font-mono text-[10px] uppercase tracking-wider ${isActive ? 'text-[var(--bg-primary)]/90' : 'text-[var(--text-secondary)]'}`}>
                      {exp.role}
                    </div>
                  </div>

                  {isActive && (
                    <div className="absolute top-6 right-6">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: 'var(--accent)' }} />
                        <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'var(--accent)' }} />
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Dossier panel */}
          <div className="lg:col-span-8 relative bg-[var(--bg-primary)] min-h-[600px] flex flex-col border-r border-b border-[var(--border-strong)] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                animate={{ clipPath: 'inset(0 0 0% 0)' }}
                exit={{ clipPath: 'inset(100% 0 0 0)' }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="p-8 md:p-16 flex flex-col h-full"
              >
                <div
                  aria-hidden
                  className="absolute bottom-4 right-4 font-display font-black leading-none pointer-events-none select-none text-[var(--text-primary)]"
                  style={{ fontSize: 'clamp(6rem, 14vw, 14rem)', opacity: 'var(--watermark-opacity)' }}
                >
                  0{activeIndex + 1}
                </div>

                <div className="mb-10 relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-widest border px-3 py-1.5"
                      style={{ color: 'var(--text-primary)', borderColor: 'var(--text-primary)' }}>
                      {activeExp.type}
                    </span>
                    <span className="w-8 h-[1px]" style={{ backgroundColor: 'var(--border-strong)' }} />
                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
                      ID: {activeExp.company.slice(0, 3).toUpperCase()} // ENTRY
                    </span>
                  </div>

                  <h3 className="font-display font-light tracking-tighter text-[var(--text-primary)] uppercase leading-[0.9] mb-4"
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
                    {activeExp.role}
                  </h3>

                  <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                    {activeExp.company}
                  </div>
                </div>

                <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed mb-10 text-justify relative z-10">
                  {activeExp.description}
                </p>

                <div className="mb-10 relative z-10">
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-6 border-b pb-4"
                    style={{ color: 'var(--text-primary)', borderColor: 'var(--border-strong)' }}>
                    Key Responsibilities
                  </div>
                  <ul className="space-y-5">
                    {activeExp.bullets.map((b, bi) => (
                      <motion.li key={bi}
                        initial={{ opacity: 0, x: -18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: bi * 0.07, duration: 0.45 }}
                        className="flex items-start gap-5 text-sm text-[var(--text-secondary)]"
                      >
                        <span className="font-mono text-[9px] mt-1 uppercase tracking-widest shrink-0" style={{ color: 'var(--text-primary)' }}>
                          [{String(bi + 1).padStart(2, '0')}]
                        </span>
                        <span className="leading-relaxed">{b}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto relative z-10">
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase mb-5 border-b pb-4"
                    style={{ color: 'var(--text-primary)', borderColor: 'var(--border-strong)' }}>
                    Technical Index
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {activeExp.tags.map((tag, ti) => (
                      <motion.span key={tag}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: ti * 0.06 }}
                        className="text-[10px] uppercase font-mono text-[var(--text-secondary)] flex items-center gap-2"
                      >
                        <span style={{ color: 'var(--accent)' }}>•</span> {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="section-folio">
        <span>Quenzzy J. Navelgas — Portfolio 2026</span>
        <span>04 / 07</span>
      </div>
    </section>
  );
}