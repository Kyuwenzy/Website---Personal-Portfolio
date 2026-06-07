'use client';

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Rocket, BrainCircuit, Youtube, Award } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

const { personal, highlights } = portfolioData;
const iconMap: Record<string, React.ElementType> = { Rocket, BrainCircuit, Youtube, Award };

function MaskedReveal({
  children, inView, delay = 0,
}: {
  children: React.ReactNode; inView: boolean; delay?: number;
}) {
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

function MagneticCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [4, -4]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-4, 4]), { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  // margin: '0px' — triggers as soon as ANY part enters viewport
  const inView = useInView(ref, { once: true, margin: '0px' });

  return (
    <section
      id="about"
      className="relative py-36 px-6 overflow-hidden bg-[var(--bg-primary)] border-b border-[var(--border-strong)]"
    >
      {/* Watermark */}
      <div
        aria-hidden
        className="absolute top-10 right-4 pointer-events-none select-none z-0 hidden lg:block overflow-hidden w-full text-right"
        style={{ opacity: 'var(--watermark-opacity)' }}
      >
        <h1 className="font-display text-[18vw] font-black tracking-tighter text-[var(--text-primary)] uppercase leading-none">
          PROFILE
        </h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>

        {/* Section header */}
        <div className="w-full border-b-2 border-[var(--text-primary)] pb-6 mb-16 flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4 block"
              style={{ color: 'var(--accent)' }}
            >
              01 // THE PROFILE
            </motion.span>

            {/* ← inView passed as prop, no overflow:hidden conflict */}
            <div className="font-display text-5xl sm:text-6xl font-light tracking-tighter text-[var(--text-primary)] uppercase leading-none">
              <MaskedReveal inView={inView} delay={0.1}>Featured</MaskedReveal>
              <MaskedReveal inView={inView} delay={0.22}>
                <span className="font-serif italic font-normal lowercase tracking-normal" style={{ color: 'var(--accent)' }}>
                  subject.
                </span>
              </MaskedReveal>
            </div>
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="font-mono text-[9px] text-[var(--text-muted)] tracking-widest uppercase"
          >
            ISSUE NO. 2026 // PUBLISHED IN PH
          </motion.span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: metadata */}
          <div className="lg:col-span-4 flex flex-col lg:sticky lg:top-32">
            <div className="flex flex-col border-t border-[var(--border-strong)]">
              {[
                { label: 'Location',     value: 'Dasmariñas, Cavite' },
                { label: 'Languages',    value: 'English, Filipino'  },
                { label: 'Demographics', value: '21 Y.O · Female'    },
              ].map(({ label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="py-4 border-b border-[var(--border-strong)] flex justify-between items-center group"
                >
                  <span className="font-mono text-[9px] tracking-widest text-[var(--text-muted)] uppercase">{label}</span>
                  <span className="font-display text-sm font-medium text-[var(--text-primary)] uppercase tracking-tight group-hover:text-[var(--accent)] transition-colors">
                    {value}
                  </span>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 w-16 h-[2px] origin-left"
              style={{ backgroundColor: 'var(--accent)' }}
            />
          </div>

          {/* Right: narrative */}
          <div className="lg:col-span-8">

            {/* Headline — inView controlled */}
            <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[var(--text-primary)] leading-[0.95] mb-12">
              <MaskedReveal inView={inView} delay={0.2}>Crafting digital systems</MaskedReveal>
              <MaskedReveal inView={inView} delay={0.35}>
                with pure{' '}
                <span className="font-serif italic font-normal text-[var(--text-secondary)]">purpose &amp; flow.</span>
              </MaskedReveal>
            </div>

            {/* Body copy */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="prose-columns text-[var(--text-secondary)] font-body text-base sm:text-lg leading-relaxed border-t border-[var(--border-strong)] pt-8 mb-20 text-justify">
                <p>{personal.summary}</p>
              </div>
            </motion.div>

            {/* Stat cards — magnetic hover */}
            <div className="grid grid-cols-1 sm:grid-cols-2 border-l border-t border-[var(--border-strong)]">
              {highlights.map((h, i) => {
                const Icon = iconMap[h.icon] || Award;
                return (
                  <MagneticCard
                    key={h.label}
                    className="border-r border-b border-[var(--border-strong)] p-8 flex flex-col justify-between group min-h-[220px] cursor-default hover:bg-[var(--accent-muted)] transition-colors"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-center justify-between w-full mb-8"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                        FIG. 0{i + 1}
                      </span>
                      <Icon size={18} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                    </motion.div>
                    <div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 120 }}
                        className="font-display text-5xl sm:text-6xl font-light text-[var(--text-primary)] tracking-tighter mb-2"
                      >
                        {h.value}
                      </motion.div>
                      <div className="text-[10px] text-[var(--text-secondary)] font-mono tracking-widest uppercase">
                        {h.label}
                      </div>
                    </div>
                  </MagneticCard>
                );
              })}
            </div>

            {/* Soft skills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-20 border-t-2 border-[var(--text-primary)] pt-8"
            >
              <div className="w-full flex justify-between items-baseline mb-8 font-mono">
                <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-primary)]">
                  INDEX // CAPABILITIES &amp; DISCIPLINES
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
                {[
                  'Communication', 'Detail-Oriented', 'Time Management', 'Fast Learner',
                  'Leadership', 'Adaptable', 'Team Player', 'Problem Solving',
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.85 + index * 0.06 }}
                    whileHover={{ x: 6 }}
                    className="flex justify-between items-end border-b border-dashed pb-2 group cursor-default"
                    style={{ borderColor: 'var(--border-strong)' }}
                  >
                    <span className="font-display text-sm uppercase tracking-wider text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                      {skill}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-muted)]">0{index + 1}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="section-folio">
        <span>Quenzzy J. Navelgas — Portfolio 2026</span>
        <span>01 / 07</span>
      </div>
    </section>
  );
}