'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

const { personal } = portfolioData;

function StampSeal() {
  const text = 'AVAILABLE FOR HIRE • CS GRADUATE 2026 • PH-BASED • ';
  const radius = 54;
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -25, scale: 0.8 }}
      animate={{ opacity: 1, rotate: -15, scale: 1 }}
      transition={{ duration: 1.6, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-20 left-6 z-30 w-32 h-32 hidden lg:block select-none"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="w-full h-full"
      >
        <svg viewBox="0 0 130 130" className="w-full h-full">
          <circle cx="65" cy="65" r="60" fill="none" stroke="currentColor"
            strokeWidth="0.6" className="text-[var(--text-primary)] opacity-20" />
          <circle cx="65" cy="65" r="54" fill="none" stroke="currentColor"
            strokeWidth="0.3" className="text-[var(--text-primary)] opacity-15" />
          <defs>
            <path id="sc-v5"
              d={`M 65 65 m -${radius} 0 a ${radius} ${radius} 0 1 1 ${radius * 2} 0 a ${radius} ${radius} 0 1 1 -${radius * 2} 0`}
            />
          </defs>
          <text fill="currentColor" fontSize="8" fontFamily="JetBrains Mono, monospace"
            letterSpacing="3.5" className="text-[var(--text-primary)] opacity-55">
            <textPath href="#sc-v5">{text}</textPath>
          </text>
          <circle cx="65" cy="65" r="3.5" fill="none" stroke="var(--accent)" strokeWidth="1" />
          <line x1="58" y1="65" x2="72" y2="65" stroke="var(--accent)" strokeWidth="0.75" />
          <line x1="65" y1="58" x2="65" y2="72" stroke="var(--accent)" strokeWidth="0.75" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// Character stagger — no overflow:hidden wrapper needed
function RevealText({
  text, className, delay = 0, style,
}: {
  text: string; className?: string; delay?: number; style?: React.CSSProperties;
}) {
  return (
    <span className={className} style={style} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: delay + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-[var(--bg-primary)] overflow-hidden flex flex-col justify-between"
      style={{ padding: '0 1.5rem 1.5rem' }}
    >

      {/* ── Background Q ── */}
      <div
        aria-hidden
        className="absolute right-[-8vw] bottom-[-5vh] z-0 pointer-events-none select-none"
        style={{
          fontSize: '52vw', fontFamily: 'var(--font-display)', fontWeight: 300,
          color: 'var(--text-primary)', opacity: 'var(--watermark-opacity)', lineHeight: 1,
        }}
      >Q</div>

      <div className="absolute top-0 right-0 w-[58%] h-full overflow-hidden z-10">

        <img
          src="/1.png"
          alt="Quenzzy Navelgas"
          className="absolute inset-0 w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-1000"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />

        {/* Initials fallback — shown only if file is missing */}
        <div
          className="absolute inset-0 bg-[var(--bg-secondary)] items-center justify-center"
          style={{ display: 'none' }}
        >
          <span
            className="font-display font-light text-[var(--text-muted)] select-none"
            style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', opacity: 0.15 }}
          >QN</span>
        </div>

        {/* Left-edge gradient — blends photo into paper */}
        <div
          className="absolute top-0 left-0 h-full w-48 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right, var(--bg-primary) 0%, transparent 100%)' }}
        />

        {/* Offset frame rule */}
        <div className="absolute inset-0 border-l border-t border-[var(--text-primary)] opacity-15 translate-x-10 translate-y-10 pointer-events-none" />
      </div>

      {/* ── Top metadata strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="relative z-20 pt-16 font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--text-muted)]"
      >
        {personal.location} // 2026
      </motion.div>

      {/* ── Name — dual-layer clip + char stagger ── */}
      <div className="relative z-20 flex flex-col justify-center flex-grow">
        <div className="relative" style={{ perspective: '800px' }}>

          {/* LAYER A — dark, left side (paper) */}
          <div
            className="font-display uppercase tracking-tighter leading-[0.78] pointer-events-none"
            style={{ fontSize: 'clamp(4rem, 12vw, 14rem)', clipPath: 'inset(0 54% 0 0)', color: 'var(--text-primary)' }}
          >
            <RevealText text="Quenzzy" delay={0.5} />
            <br />
            <RevealText text="Navelgas" delay={0.8} style={{ color: 'var(--accent)', fontStyle: 'italic' }} />
          </div>

          {/* LAYER B — white, right side (over photo) */}
          <div
            className="font-display uppercase tracking-tighter leading-[0.78] pointer-events-none absolute top-0 left-0 w-full"
            style={{ fontSize: 'clamp(4rem, 12vw, 14rem)', clipPath: 'inset(0 0 0 46%)', color: '#ffffff' }}
          >
            <RevealText text="Quenzzy" delay={0.5} />
            <br />
            <RevealText text="Navelgas" delay={0.8} style={{ color: 'var(--accent-light, #D4B060)', fontStyle: 'italic' }} />
          </div>
        </div>

        {/* Tagline — word cascade, no overflow wrapper */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-6 max-w-xs"
        >
          {['CS Student', '·', 'ML Developer', '·', 'Vibe Coder', '·', 'AI Scripter'].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6 + i * 0.07, duration: 0.35 }}
              className={`font-mono text-[9px] tracking-[0.25em] uppercase mr-2 ${
                word === '·' ? '' : 'text-[var(--text-muted)]'
              }`}
              style={{ color: word === '·' ? 'var(--accent)' : undefined }}
            >
              {word}
            </motion.span>
          ))}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] mt-4 origin-left"
            style={{ width: '2.5rem', backgroundColor: 'var(--accent)' }}
          />
        </motion.div>
      </div>

      <StampSeal />

      {/* ── Vertical role label ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute right-6 bottom-20 z-20 hidden lg:block"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        <span className="text-[10px] uppercase tracking-[0.5em] font-mono text-[var(--text-muted)]">
          Machine Learning &amp; QA Systems Architect
        </span>
      </motion.div>

      {/* ── Bottom folio strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="relative z-20 flex items-end justify-between pt-8"
      >
        <div className="flex items-center gap-8">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)]">// 01_INTRO</span>
          <div className="flex gap-5 font-mono text-[10px]" style={{ color: 'var(--text-primary)' }}>
            {[
              { label: 'GH', href: personal.github },
              { label: 'LI', href: personal.linkedin },
              { label: 'EM', href: `mailto:${personal.email}` },
            ].map(({ label, href }) => (
              <a key={label} href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] transition-colors tracking-widest"
              >{label}</a>
            ))}
          </div>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)]">01 / 07</span>
      </motion.div>
    </section>
  );
}
