'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

const { projects } = portfolioData;

function MaskedReveal({ children, inView, delay = 0 }: { children: React.ReactNode; inView: boolean; delay?: number }) {
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
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

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  return (
    <section
      id="projects"
      className="relative py-40 px-6 overflow-hidden bg-[var(--bg-primary)] border-b border-[var(--border-strong)]"
    >
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[var(--border)] hidden lg:block pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>

        {/* Header */}
        <div className="w-full border-b-2 border-[var(--text-primary)] pb-6 mb-32 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4 block"
              style={{ color: 'var(--accent)' }}
            >
              03 // THE FOLIO
            </motion.span>
            <div
              className="font-display font-light tracking-tighter text-[var(--text-primary)] leading-none uppercase"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
            >
              <MaskedReveal inView={inView} delay={0.1}>Selected </MaskedReveal>
              <MaskedReveal inView={inView} delay={0.22}>
                <span className="italic font-serif font-normal lowercase pr-4" style={{ color: 'var(--accent)' }}>
                  works.
                </span>
              </MaskedReveal>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="font-mono text-[9px] text-[var(--text-muted)] tracking-widest uppercase mt-8 md:mt-0 max-w-[220px] text-left md:text-right"
          >
            Systematic exploration of Machine Learning and Quality Automation.
          </motion.div>
        </div>

        {/* Project spread */}
        <div className="space-y-48">
          {projects.map((project) => (
            <div key={project.id} className="relative flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

              {/* Ghost number */}
              <span
                aria-hidden
                className="absolute top-0 left-[-6vw] font-display font-black text-[var(--text-primary)] select-none pointer-events-none leading-none"
                style={{ fontSize: '24vw', opacity: 'var(--watermark-opacity)' }}
              >
                {project.id}
              </span>

              {/* Visual block */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '0px' }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2 relative group"
              >
                <div className="relative aspect-[4/3] bg-[var(--bg-secondary)] border border-[var(--border-strong)] overflow-hidden flex items-center justify-center">

                  {/* Ink wipe */}
                  <motion.div
                    initial={{ x: '0%' }}
                    whileInView={{ x: '-100%' }}
                    viewport={{ once: true, margin: '0px' }}
                    transition={{ duration: 1, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute inset-0 z-20 pointer-events-none"
                    style={{ backgroundColor: 'var(--text-primary)' }}
                  />

                  <div className="absolute inset-6 border border-[var(--border-strong)] opacity-30" />
                  <div className="w-[55%] aspect-square rounded-full border absolute opacity-20" style={{ borderColor: 'var(--accent)' }} />
                  <div className="w-[1px] h-full bg-[var(--border-strong)] absolute left-1/3 opacity-25" />
                  <div className="w-full h-[1px] bg-[var(--border-strong)] absolute top-1/3 opacity-25" />

                  {/* Metric */}
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '0px' }}
                    transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.5 }}
                    className="z-10 flex flex-col items-center justify-center bg-[var(--bg-primary)] px-8 py-6 border border-[var(--border-strong)]"
                  >
                    <span className="font-display text-5xl font-light tracking-tighter text-[var(--text-primary)]">
                      {project.metric}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--text-muted)] uppercase mt-2">
                      {project.metricSub}
                    </span>
                  </motion.div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-30"
                    style={{ backgroundColor: 'var(--text-primary)' }}
                  >
                    <div className="flex gap-6 items-center font-mono text-[10px] tracking-widest uppercase">
                      <a href={project.github} className="hover:text-[var(--accent)] transition-colors pb-1 border-b border-transparent hover:border-[var(--accent)]"
                        style={{ color: 'var(--bg-primary)' }}>View Repository</a>
                      <span className="w-1 h-1 rounded-full opacity-30" style={{ backgroundColor: 'var(--bg-primary)' }} />
                      <a href={project.demo} className="hover:text-[var(--accent)] transition-colors pb-1 border-b border-transparent hover:border-[var(--accent)]"
                        style={{ color: 'var(--bg-primary)' }}>Examine Output</a>
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '0px' }}
                  transition={{ delay: 0.7 }}
                  className="mt-4 font-mono text-[9px] tracking-widest text-[var(--text-muted)] uppercase flex justify-between"
                >
                  <span>Subject: {project.context}</span>
                  <span>{project.period}</span>
                </motion.div>
              </motion.div>

              {/* Narrative block */}
              <div className="w-full lg:w-1/2 flex flex-col items-start">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '0px' }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-1 border"
                    style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>
                    Case Study
                  </span>
                  <span className="font-mono text-[9px] text-[var(--text-muted)] tracking-widest">
                    {project.id} / 03
                  </span>
                </motion.div>

                <div className="font-display font-light tracking-tighter text-[var(--text-primary)] uppercase leading-[0.9] mb-2"
                  style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)' }}
                >
                  <MaskedReveal inView={inView} delay={0.15}>{project.title}</MaskedReveal>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '0px' }}
                  transition={{ delay: 0.35 }}
                  className="font-mono text-[10px] uppercase tracking-widest mb-8"
                  style={{ color: 'var(--accent)' }}
                >
                  {project.subtitle}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px' }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                  className="font-body text-base text-[var(--text-secondary)] leading-relaxed mb-8 text-justify"
                >
                  {project.description}
                </motion.p>

                {/* Bullets */}
                <div className="w-full mb-10 space-y-3">
                  {project.bullets.map((b, bi) => (
                    <motion.div key={bi}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '0px' }}
                      transition={{ delay: 0.45 + bi * 0.08, duration: 0.5 }}
                      className="flex items-start gap-4 text-sm text-[var(--text-muted)]"
                    >
                      <span className="font-mono text-[9px] mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>
                        [{String(bi + 1).padStart(2, '0')}]
                      </span>
                      <span className="leading-relaxed">{b}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="w-full border-t border-[var(--border-strong)] pt-6 mb-10 flex flex-wrap gap-x-5 gap-y-3">
                  {project.tech.map((t, ti) => (
                    <motion.span key={t}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '0px' }}
                      transition={{ delay: 0.55 + ti * 0.07 }}
                      className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <span style={{ color: 'var(--accent)' }}>•</span> {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Addendum */}
        <div className="mt-40 border-t-2 border-[var(--text-primary)] pt-12 flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-sm">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '0px' }}
              className="font-mono text-[9px] tracking-widest uppercase block mb-4"
              style={{ color: 'var(--accent)' }}
            >Addendum</motion.span>
            <h4 className="font-display text-4xl font-light uppercase tracking-tighter text-[var(--text-primary)] mb-4">
              In Development.
            </h4>
            <p className="text-sm text-[var(--text-secondary)] font-body leading-relaxed text-justify">
              Currently engineering new structural systems focused on Generative AI pipelines and automated testing architectures.
            </p>
          </div>

          <div className="flex-1 w-full flex flex-col border-t border-[var(--border-strong)]">
            {[1, 2].map((_, idx) => (
              <motion.div key={idx}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px' }}
                transition={{ delay: idx * 0.1, duration: 0.55 }}
                className="w-full py-6 border-b border-[var(--border-strong)] flex items-center justify-between group hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors duration-300 px-4 cursor-default"
              >
                <div className="flex items-center gap-8">
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-40 group-hover:opacity-70">0{idx + 2}</span>
                  <span className="font-display text-lg uppercase tracking-tight text-[var(--text-muted)] group-hover:text-[var(--bg-primary)] transition-colors">Classified System</span>
                </div>
                <div className="font-mono text-[9px] text-[var(--text-muted)] tracking-widest uppercase group-hover:text-[var(--bg-primary)]/70">ETA 2026</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-folio">
        <span>Quenzzy J. Navelgas — Portfolio 2026</span>
        <span>03 / 07</span>
      </div>
    </section>
  );
}