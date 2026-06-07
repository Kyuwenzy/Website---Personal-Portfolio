'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

const { projects } = portfolioData;

function MaskedReveal({
  children, inView, delay = 0,
}: {
  children: React.ReactNode; inView: boolean; delay?: number;
}) {
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

// Individual project spread — alternates left/right layout
function ProjectSpread({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[number];
  index: number;
  inView: boolean;
}) {
  // Even index → visual left, text right
  // Odd index  → visual right, text left
  const isFlipped = index % 2 !== 0;

  const Visual = (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '0px' }}
      transition={{ duration: 0.6 }}
      className="w-full lg:w-1/2 relative group"
    >
      <div
        className="relative aspect-[4/3] border border-[var(--border-strong)] overflow-hidden group/img"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        {/* Screenshot — uses project.screenshot from data */}
        <img
          src={project.screenshot}
          alt={`${project.title} screenshot`}
          className="absolute inset-0 w-full h-full object-cover object-top grayscale group-hover/img:grayscale-0 transition-all duration-700 group-hover/img:scale-105"
          style={{ scale: '1' }}
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const fallback = document.getElementById(`fallback-${project.id}`);
            if (fallback) fallback.style.display = 'flex';
          }}
        />

        {/* Fallback if screenshot is missing */}
        <div
          id={`fallback-${project.id}`}
          className="absolute inset-0 items-center justify-center"
          style={{ display: 'none', backgroundColor: 'var(--bg-secondary)' }}
        >
          <div className="absolute inset-6 border border-[var(--border-strong)] opacity-30" />
          <div
            className="w-[55%] aspect-square rounded-full border absolute opacity-20"
            style={{ borderColor: 'var(--accent)' }}
          />
          <div className="w-[1px] h-full bg-[var(--border-strong)] absolute left-1/3 opacity-25" />
          <div className="w-full h-[1px] bg-[var(--border-strong)] absolute top-1/3 opacity-25" />
          <div
            className="z-10 flex flex-col items-center justify-center px-8 py-6 border border-[var(--border-strong)]"
            style={{ backgroundColor: 'var(--bg-primary)' }}
          >
            <span className="font-display text-5xl font-light tracking-tighter text-[var(--text-primary)]">
              {project.metric}
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--text-muted)] uppercase mt-2">
              {project.metricSub}
            </span>
          </div>
        </div>

        {/* Corner marks — always on top */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-4 left-4 w-5 h-5 border-t border-l opacity-60"
            style={{ borderColor: 'var(--accent)' }} />
          <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r opacity-60"
            style={{ borderColor: 'var(--accent)' }} />
        </div>

        {/* Metric badge — pinned bottom-left */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute bottom-4 left-4 z-20 flex items-baseline gap-2 px-3 py-2 border"
          style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--accent)' }}
        >
          <span className="font-display text-2xl font-light tracking-tighter" style={{ color: 'var(--accent)' }}>
            {project.metric}
          </span>
          <span className="font-mono text-[8px] tracking-widest uppercase text-[var(--text-muted)]">
            {project.metricSub}
          </span>
        </motion.div>

        {/* Hover CTA overlay */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 z-30"
          style={{ backgroundColor: 'rgba(14,13,11,0.88)' }}
        >
          <div className="flex gap-6 items-center font-mono text-[10px] tracking-widest uppercase">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="pb-1 border-b border-transparent hover:border-[var(--accent)] transition-colors"
              style={{ color: 'var(--bg-primary)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--bg-primary)')}
            >
              Repository
            </a>
            <span className="w-1 h-1 rounded-full opacity-30" style={{ backgroundColor: 'var(--bg-primary)' }} />
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="pb-1 border-b border-transparent hover:border-[var(--accent)] transition-colors"
              style={{ color: 'var(--bg-primary)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--bg-primary)')}
            >
              Live Demo
            </a>
          </div>
        </div>
      </div>

      {/* Caption */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '0px' }}
        transition={{ delay: 0.7 }}
        className="mt-4 font-mono text-[9px] tracking-widest text-[var(--text-muted)] uppercase flex justify-between"
      >
        <span>{project.context}</span>
        <span>{project.period}</span>
      </motion.div>
    </motion.div>
  );

  const Narrative = (
    <div className={`w-full lg:w-1/2 flex flex-col ${isFlipped ? 'items-end text-right' : 'items-start text-left'}`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '0px' }}
        transition={{ delay: 0.2 }}
        className={`flex items-center gap-4 mb-6 ${isFlipped ? 'flex-row-reverse' : ''}`}
      >
        <span
          className="font-mono text-[10px] tracking-widest uppercase px-2 py-1 border"
          style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}
        >
          Case Study
        </span>
        <span className="font-mono text-[9px] text-[var(--text-muted)] tracking-widest">
          {project.id} / 0{projects.length}
        </span>
      </motion.div>

      {/* Title */}
      <div
        className="font-display font-light tracking-tighter text-[var(--text-primary)] uppercase leading-[0.9] mb-2"
        style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
      >
        <MaskedReveal inView={inView} delay={0.15}>{project.title}</MaskedReveal>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '0px' }}
        transition={{ delay: 0.3 }}
        className="font-mono text-[10px] uppercase tracking-widest mb-8"
        style={{ color: 'var(--accent)' }}
      >
        {project.subtitle}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px' }}
        transition={{ delay: 0.38, duration: 0.7 }}
        className="font-body text-base text-[var(--text-secondary)] leading-relaxed mb-8 text-justify"
      >
        {project.description}
      </motion.p>

      {/* Bullets */}
      <div className="w-full mb-10 space-y-3">
        {project.bullets.map((b, bi) => (
          <motion.div
            key={bi}
            initial={{ opacity: 0, x: isFlipped ? 14 : -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px' }}
            transition={{ delay: 0.44 + bi * 0.07, duration: 0.5 }}
            className={`flex items-start gap-4 text-sm text-[var(--text-muted)] ${isFlipped ? 'flex-row-reverse text-right' : ''}`}
          >
            <span
              className="font-mono text-[9px] mt-0.5 shrink-0"
              style={{ color: 'var(--accent)' }}
            >
              [{String(bi + 1).padStart(2, '0')}]
            </span>
            <span className="leading-relaxed">{b}</span>
          </motion.div>
        ))}
      </div>

      {/* Tech tags */}
      <div
        className={`w-full border-t border-[var(--border-strong)] pt-6 mb-10 flex flex-wrap gap-x-5 gap-y-3 ${isFlipped ? 'justify-end' : ''}`}
      >
        {project.tech.map((t, ti) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px' }}
            transition={{ delay: 0.5 + ti * 0.06 }}
            className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-2"
            style={{ color: 'var(--text-primary)' }}
          >
            <span style={{ color: 'var(--accent)' }}>•</span> {t}
          </motion.span>
        ))}
      </div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '0px' }}
        transition={{ delay: 0.7 }}
        className={`flex gap-4 ${isFlipped ? 'flex-row-reverse' : ''}`}
      >
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-4 border font-mono text-[10px] tracking-[0.2em] uppercase transition-colors flex items-center gap-2 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)]"
          style={{ borderColor: 'var(--text-primary)', color: 'var(--text-primary)' }}
        >
          Read Paper <ArrowUpRight size={13} />
        </a>
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-4 border font-mono text-[10px] tracking-[0.2em] uppercase transition-colors hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
          style={{ borderColor: 'var(--border-strong)', color: 'var(--text-secondary)' }}
        >
          View System
        </a>
      </motion.div>
    </div>
  );

  return (
    <div className="relative flex flex-col lg:flex-row items-start gap-16 lg:gap-20">
      {/* Ghost project number */}
      <span
        aria-hidden
        className="absolute top-0 font-display font-black text-[var(--text-primary)] select-none pointer-events-none leading-none"
        style={{
          fontSize: '20vw',
          opacity: 'var(--watermark-opacity)',
          left: isFlipped ? 'auto' : '-5vw',
          right: isFlipped ? '-5vw' : 'auto',
        }}
      >
        {project.id}
      </span>

      {isFlipped ? (
        <>{Narrative}{Visual}</>
      ) : (
        <>{Visual}{Narrative}</>
      )}
    </div>
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
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[var(--border)] hidden lg:block pointer-events-none opacity-25" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>

        {/* ─── Header ─── */}
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
            Systematic exploration of Machine Learning, Finance, and Automation.
          </motion.div>
        </div>

        {/* ─── Project spreads ─── */}
        <div className="space-y-48">
          {projects.map((project, i) => (
            <ProjectSpread
              key={project.id}
              project={project}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* ─── Addendum ─── */}
        <div className="mt-40 border-t-2 border-[var(--text-primary)] pt-12 flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-sm">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '0px' }}
              className="font-mono text-[9px] tracking-widest uppercase block mb-4"
              style={{ color: 'var(--accent)' }}
            >
              Addendum
            </motion.span>
            <h4 className="font-display text-4xl font-light uppercase tracking-tighter text-[var(--text-primary)] mb-4">
              In Development.
            </h4>
            <p className="text-sm text-[var(--text-secondary)] font-body leading-relaxed text-justify">
              Currently engineering new structural systems focused on Generative AI pipelines and automated testing architectures. Documentation pending.
            </p>
          </div>

          <div className="flex-1 w-full flex flex-col border-t border-[var(--border-strong)]">
            {[1, 2].map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px' }}
                transition={{ delay: idx * 0.1, duration: 0.55 }}
                className="w-full py-6 border-b border-[var(--border-strong)] flex items-center justify-between group hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors duration-300 px-4 cursor-default"
              >
                <div className="flex items-center gap-8">
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-40 group-hover:opacity-70">
                    0{projects.length + idx + 1}
                  </span>
                  <span className="font-display text-lg uppercase tracking-tight text-[var(--text-muted)] group-hover:text-[var(--bg-primary)] transition-colors">
                    Classified System
                  </span>
                </div>
                <div className="font-mono text-[9px] text-[var(--text-muted)] tracking-widest uppercase group-hover:text-[var(--bg-primary)]/70">
                  ETA 2026
                </div>
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
