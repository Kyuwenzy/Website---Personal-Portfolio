'use client';

/*
  FOOTER — Magazine Back Cover / Colophon
  ─────────────────────────────────────────
  Real editorial magazines end with a colophon — a dense,
  typographically rich block that states publication details,
  credits, and contact. Think: the last page of GQ or Vogue.

  Structure:
  1. Full-width masthead banner — oversized "QJN" logotype
  2. Three-column colophon — contact / stack credits / status
  3. Legal strip — copyright, tagline
*/

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

const { personal } = portfolioData;

const year = new Date().getFullYear();

const colophonCols = [
  {
    heading: 'Correspondence',
    lines: [
      personal.email,
      personal.phone,
      personal.location,
    ],
  },
  {
    heading: 'Publication Stack',
    lines: [
      'Next.js 14 · TypeScript',
      'Tailwind CSS · Framer Motion',
      'Cormorant Garamond · DM Sans',
      'JetBrains Mono',
    ],
  },
  {
    heading: 'Current Status',
    lines: [
      'Open to opportunities',
      'Available for freelance',
      'BS Computer Science',
      'Emilio Aguinaldo College',
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[var(--bg-primary)] border-t-2 border-[var(--text-primary)] overflow-hidden">

      {/* ── 1. Oversized logotype banner ──────────────────── */}
      <div className="relative overflow-hidden border-b border-[var(--border)]">
        {/* Ghost Q watermark behind the name */}
        <div
          aria-hidden
          className="absolute right-[-4vw] top-[-2vw] font-display font-black leading-none pointer-events-none select-none text-[var(--text-primary)]"
          style={{ fontSize: '28vw', opacity: 'var(--watermark-opacity)' }}
        >
          Q
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Issue tag */}
            <div className="font-mono text-[9px] tracking-[0.4em] text-[var(--accent)] uppercase mb-6">
              End Matter — Vol. 2026 · Issue 01
            </div>

            {/* Masthead name — massive, editorial */}
            <h2
              className="font-display font-light tracking-tighter text-[var(--text-primary)] uppercase leading-[0.85]"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 12rem)' }}
            >
              Quenzzy
              <br />
              <span className="italic font-light" style={{ color: 'var(--accent)' }}>
                Navelgas
              </span>
            </h2>

            {/* Tagline beneath the name */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
              <p className="font-mono text-[9px] tracking-[0.3em] text-[var(--text-muted)] uppercase">
                Computer Science · Machine Learning · Full-Stack Development
              </p>
              <div className="hidden sm:block w-8 h-[1px] bg-[var(--border)]" />
              <div className="flex gap-6">
                {[
                  { label: 'GitHub',   href: personal.github   },
                  { label: 'LinkedIn', href: personal.linkedin  },
                  { label: 'Email',    href: `mailto:${personal.email}` },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200 border-b border-transparent hover:border-[var(--accent)]"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 2. Three-column colophon ───────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 border-b border-[var(--border)]">
        {colophonCols.map((col, i) => (
          <motion.div
            key={col.heading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`py-8 sm:py-0 ${i > 0 ? 'sm:border-l border-t sm:border-t-0 border-[var(--border)] sm:pl-10' : ''}`}
          >
            <div className="font-mono text-[8px] tracking-[0.35em] text-[var(--accent)] uppercase mb-5">
              {col.heading}
            </div>
            <div className="flex flex-col gap-2">
              {col.lines.map((line, j) => (
                <span key={j} className="font-body text-sm text-[var(--text-secondary)] leading-snug">
                  {line}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── 3. Legal / copyright strip ────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <span className="font-mono text-[8px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
          © {year} Quenzzy J. Navelgas · All Rights Reserved
        </span>
        <span className="font-mono text-[8px] tracking-[0.2em] text-[var(--text-muted)] uppercase">
          Dasmariñas, Cavite · PH
        </span>
      </div>
    </footer>
  );
}
