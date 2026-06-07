'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

const { certifications } = portfolioData;

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative py-40 px-6 overflow-hidden bg-[var(--bg-primary)] border-b border-[var(--border-strong)]"
    >
      <div className="max-w-7xl mx-auto relative z-10">

        {/* ─── Header ─── */}
        <div className="w-full border-b-2 border-[var(--text-primary)] pb-6 mb-24 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            {/* ← was text-violet-500 */}
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-4 block">
              06 // COMPLIANCE
            </span>
            <h2 className="font-display text-5xl sm:text-7xl lg:text-[90px] font-light tracking-tighter text-[var(--text-primary)] uppercase leading-none">
              Credential <br />
              {/* ← was text-violet-500 */}
              <span className="font-serif italic font-normal text-[var(--accent)] lowercase pr-4">
                ledger.
              </span>
            </h2>
          </div>
          <div className="font-mono text-[9px] text-[var(--text-muted)] tracking-widest uppercase mt-8 md:mt-0 max-w-[260px] text-left md:text-right">
            Official certifications and professional <br />
            standing. Verified entries.
          </div>
        </div>

        {/* ─── Registry grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--border-strong)]">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="border-r border-b border-[var(--border-strong)] p-8 flex flex-col justify-between group hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors duration-300 min-h-[260px]"
            >
              <div>
                <div className="flex justify-between items-start mb-12">
                  <span className="font-mono text-[9px] uppercase tracking-widest opacity-60">
                    No. 0{i + 1}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest border border-[var(--text-primary)] group-hover:border-[var(--bg-primary)] px-2 py-1 transition-colors">
                    {cert.year}
                  </span>
                </div>

                <h4 className="font-display text-2xl font-normal uppercase tracking-tight leading-tight mb-6">
                  {cert.name}
                </h4>
              </div>

              <div className="font-mono text-[10px] uppercase tracking-widest pt-8 border-t border-[var(--border-strong)] group-hover:border-[var(--bg-primary)]/20 transition-colors">
                <span className="opacity-60 block mb-1">Issuer</span>
                {cert.issuer}
              </div>
            </motion.div>
          ))}

          {/* Empty cells to complete the grid visually */}
          {certifications.length % 3 !== 0 &&
            Array.from({ length: 3 - (certifications.length % 3) }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="border-r border-b border-[var(--border-strong)] p-8 bg-[var(--bg-secondary)] hidden lg:block"
              />
            ))
          }
        </div>

        {/* ─── Footer metadata ─── */}
        <div className="mt-16 flex flex-col md:flex-row justify-between font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)] border-t border-[var(--border-strong)] pt-8">
          <span>End of Registry</span>
          <span className="mt-4 md:mt-0">All certifications are active and verified.</span>
        </div>
      </div>

      {/* ─── Folio strip ─── */}
      <div className="section-folio">
        <span>Quenzzy J. Navelgas — Portfolio 2026</span>
        <span>06 / 07</span>
      </div>
    </section>
  );
}
