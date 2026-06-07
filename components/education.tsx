'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { portfolioData } from '@/data/portfolio';

const { education, awards, leadership } = portfolioData;

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="education"
      className="relative py-40 px-6 overflow-hidden bg-[var(--bg-primary)] border-b border-[var(--border-strong)]"
    >
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>

        {/* ─── Header ─── */}
        <div className="w-full border-b-2 border-[var(--text-primary)] pb-6 mb-24 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            {/* ← was text-violet-500 */}
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-4 block">
              05 // ACADEMIA
            </span>
            {/* Normalised: now matches all other h2s at text-[90px] */}
            <h2 className="font-display text-5xl sm:text-7xl lg:text-[90px] font-light tracking-tighter text-[var(--text-primary)] uppercase leading-none">
              Intellectual <br />
              <span className="font-serif italic font-normal text-[var(--accent)] lowercase pr-4">
                foundations.
              </span>
            </h2>
          </div>
          <div className="font-mono text-[9px] text-[var(--text-muted)] tracking-widest uppercase mt-8 md:mt-0 max-w-[260px] text-left md:text-right">
            Archival record of institutional <br />
            credentials and distinctions.
          </div>
        </div>

        {/* ─── Main grid: education (8 cols) + awards (4 cols) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-l border-[var(--border-strong)] mb-24">

          {/* Education panel */}
          <div className="lg:col-span-8 flex flex-col border-r border-b border-[var(--border-strong)] p-8 md:p-16 relative bg-[var(--bg-primary)]">

            {/* Ghost watermark — uses CSS var so dark mode gets higher opacity */}
            <div
              aria-hidden
              className="absolute bottom-4 right-4 font-display font-black leading-none pointer-events-none select-none text-[var(--text-primary)] uppercase"
              style={{ fontSize: 'clamp(5rem, 12vw, 12rem)', opacity: 'var(--watermark-opacity)' }}
            >
              EAC
            </div>

            <div className="font-mono text-[10px] text-[var(--text-primary)] uppercase tracking-widest mb-16 border border-[var(--text-primary)] px-3 py-1.5 w-fit">
              Registry of Degrees
            </div>

            <div className="flex flex-col gap-16 relative z-10">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                  className="group relative flex flex-col"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 mb-4">
                    <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter text-[var(--text-primary)] uppercase leading-[0.9]">
                      {edu.degree}
                    </h3>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between md:items-end border-b border-[var(--border-strong)] pb-8">
                    <div>
                      <p className="font-serif text-xl md:text-2xl text-[var(--text-secondary)] italic mb-2">
                        {edu.school}
                      </p>
                      <p className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
                        {edu.location}
                      </p>
                    </div>
                    {/* ← was text-violet-500 */}
                    <div className="mt-6 md:mt-0 font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] text-left md:text-right">
                      {edu.period} <br />
                      <span className="text-[var(--text-muted)] block mt-1">Status: {edu.status}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Awards panel — ink block */}
          <div className="lg:col-span-4 bg-[var(--text-primary)] text-[var(--bg-primary)] border-b border-r border-[var(--text-primary)] p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--bg-primary)]/70 mb-12 border-b border-[var(--bg-primary)]/20 pb-4">
                Distinctions
              </div>

              <div className="flex flex-col">
                {awards.map((award, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="border-b border-[var(--bg-primary)]/20 py-5 last:border-0 group flex items-start gap-6"
                  >
                    <span className="font-mono text-[10px] text-[var(--bg-primary)]/40 mt-1 shrink-0">
                      0{i + 1}
                    </span>
                    <p className="font-display text-lg md:text-xl tracking-tight uppercase leading-none hover:text-[var(--accent)] transition-colors cursor-default">
                      {award.title}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-16 font-mono text-[9px] uppercase tracking-wider text-[var(--bg-primary)]/40 text-justify">
              Criteria established via high academic thresholds. Verified institutional standing required.
            </div>
          </div>
        </div>

        {/* ─── Leadership table ─── */}
        <div className="mt-32 w-full">
          <div className="flex items-end justify-between border-b-2 border-[var(--text-primary)] pb-4 mb-8">
            <h3 className="font-display text-3xl md:text-4xl uppercase tracking-tighter text-[var(--text-primary)]">
              Leadership Index
            </h3>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)] hidden md:block">
              Affiliations &amp; Extracurriculars
            </span>
          </div>

          <div className="flex flex-col border-t border-[var(--border-strong)]">
            {leadership.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="w-full group grid grid-cols-1 md:grid-cols-12 py-6 border-b border-[var(--border-strong)] items-baseline hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors duration-300 px-4 cursor-default"
              >
                {/* Period */}
                <div className="md:col-span-2 font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] group-hover:text-[var(--bg-primary)]/70 mb-2 md:mb-0">
                  {item.period}
                </div>

                {/* Role */}
                <div className="md:col-span-5 pr-4 mb-2 md:mb-0">
                  <h4 className="font-display text-xl md:text-2xl font-normal uppercase tracking-tight leading-none">
                    {item.role}
                  </h4>
                </div>

                {/* Organisation */}
                <div className="md:col-span-5 font-mono text-[10px] md:text-xs uppercase tracking-widest group-hover:text-[var(--bg-primary)]/90 text-left md:text-right flex items-center md:justify-end gap-2 before:content-['—'] before:text-[var(--accent)] group-hover:before:text-[var(--bg-primary)] md:before:hidden">
                  {item.org}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Folio strip ─── */}
      <div className="section-folio">
        <span>Quenzzy J. Navelgas — Portfolio 2026</span>
        <span>05 / 07</span>
      </div>
    </section>
  );
}
