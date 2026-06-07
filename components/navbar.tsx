'use client';

/*
  EDITORIAL NAVBAR — GQ/Vogue approach
  ──────────────────────────────────────
  • Hero mode (top of page): A pure editorial masthead bar — just
    the logo mark left, issue date right, and a thin gold rule beneath.
    No nav links. Does NOT overlap the hero metadata strip because it
    sits at the very top as its own element with no background conflict.

  • Scrolled mode: Transforms into a compact sticky bar with
    nav links revealed + a sliding "chapter" indicator that shows
    which section you're in — more interesting than simple active dots.

  • Mobile: A full-screen editorial "drawer" that slides in from the
    right with oversized section names — no cramped menu, feels like
    opening the magazine's index page.
*/

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ThemeToggle from './theme-toggle';

const navLinks = [
  { label: 'About',      number: '01', href: '#about'      },
  { label: 'Skills',     number: '02', href: '#skills'     },
  { label: 'Projects',   number: '03', href: '#projects'   },
  { label: 'Experience', number: '04', href: '#experience' },
  { label: 'Education',  number: '05', href: '#education'  },
  { label: 'Contact',    number: '07', href: '#contact'    },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState('');
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);

      const sections = navLinks.map(l => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActive(id);
          return;
        }
      }
      setActive('');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section label for the chapter indicator
  const activeLink = navLinks.find(l => l.href.slice(1) === active);

  return (
    <>
      {/* ═══════════════════════════════════════════════
          MASTHEAD BAR — always present
          In hero (top): thin, transparent, editorial.
          Scrolled: compact + opaque + links revealed.
      ═══════════════════════════════════════════════ */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--bg-primary)]/95 backdrop-blur-sm border-b border-[var(--border)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-12">

          {/* ── Logo / Masthead mark ── */}
          <a
            href="#"
            className="flex items-baseline gap-1 group"
            aria-label="Back to top"
          >
            <span className="font-display text-base font-semibold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300">
              QJN
            </span>
            <span
              className="font-mono text-[8px] tracking-[0.3em] text-[var(--accent)] uppercase"
              style={{ lineHeight: 1 }}
            >
              .portfolio
            </span>
          </a>

          {/* ── Centre: nav links (hidden until scrolled) ── */}
          <motion.div
            initial={false}
            animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : -6 }}
            transition={{ duration: 0.35 }}
            className="hidden lg:flex items-center gap-8 pointer-events-none"
            style={{ pointerEvents: scrolled ? 'auto' : 'none' }}
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`font-mono text-[8.5px] tracking-[0.28em] uppercase transition-colors duration-200 ${
                  active === link.href.slice(1)
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* ── Right controls ── */}
          <div className="flex items-center gap-4">
            {/* Chapter indicator — replaces "Download CV" button in scrolled state */}
            <AnimatePresence mode="wait">
              {scrolled && activeLink ? (
                <motion.div
                  key={activeLink.label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="hidden md:flex items-center gap-2"
                >
                  <span className="font-mono text-[8px] text-[var(--text-muted)] tracking-widest">
                    {activeLink.number}
                  </span>
                  <span className="w-8 h-[1px] bg-[var(--accent)]" />
                  <span className="font-mono text-[8px] text-[var(--accent)] tracking-[0.2em] uppercase">
                    {activeLink.label}
                  </span>
                </motion.div>
              ) : !scrolled ? (
                <motion.div
                  key="issue"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hidden md:block font-mono text-[8px] tracking-[0.28em] text-[var(--text-muted)] uppercase"
                >
                  Vol. 2026 · Issue 01
                </motion.div>
              ) : null}
            </AnimatePresence>

            <ThemeToggle />

            {/* Hamburger — editorial style: two lines not three */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex flex-col gap-[5px] justify-center items-end w-7 h-7 group"
              aria-label="Open menu"
            >
              <span className="block h-[1px] bg-[var(--text-primary)] transition-all duration-300 group-hover:bg-[var(--accent)] w-full" />
              <span className="block h-[1px] bg-[var(--text-primary)] transition-all duration-300 group-hover:bg-[var(--accent)] w-3/4" />
            </button>
          </div>
        </div>

        {/* ── Thin gold rule — only when scrolled ── */}
        <motion.div
          animate={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="h-[1px] bg-[var(--accent)] origin-left"
        />
      </motion.header>

      {/* ═══════════════════════════════════════════════
          FULL-SCREEN EDITORIAL DRAWER
          Right-side slide-in. Magazine index aesthetic.
          Works on both desktop and mobile.
      ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-[var(--text-primary)]/30 backdrop-blur-[2px]"
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-full sm:w-[420px] bg-[var(--bg-primary)] border-l border-[var(--border-strong)] flex flex-col overflow-hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-[var(--border)]">
                <div>
                  <span className="font-mono text-[8px] tracking-[0.3em] text-[var(--accent)] uppercase block">
                    QJN.portfolio
                  </span>
                  <span className="font-mono text-[7px] tracking-[0.25em] text-[var(--text-muted)] uppercase mt-0.5 block">
                    Index — Vol. 2026
                  </span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                  aria-label="Close menu"
                >
                  <X size={13} />
                </button>
              </div>

              {/* Nav links — oversized editorial index */}
              <nav className="flex-1 flex flex-col justify-center px-8 py-12">
                <div className="font-mono text-[7.5px] tracking-[0.35em] text-[var(--text-muted)] uppercase mb-10">
                  — Contents
                </div>

                <div className="flex flex-col">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className={`group flex items-baseline justify-between py-5 border-b border-[var(--border)] transition-all duration-300 hover:pl-3 ${
                        active === link.href.slice(1) ? 'pl-3' : ''
                      }`}
                    >
                      <div className="flex items-baseline gap-5">
                        <span className="font-mono text-[8px] tracking-widest text-[var(--accent)] w-6">
                          {link.number}
                        </span>
                        <span
                          className={`font-display uppercase tracking-tight leading-none transition-colors duration-200 ${
                            active === link.href.slice(1)
                              ? 'text-[var(--accent)]'
                              : 'text-[var(--text-primary)] group-hover:text-[var(--accent)]'
                          }`}
                          style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)' }}
                        >
                          {link.label}
                        </span>
                      </div>
                      <span className="font-mono text-[8px] text-[var(--text-muted)] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                    </motion.a>
                  ))}
                </div>
              </nav>

              {/* Drawer footer */}
              <div className="px-8 py-6 border-t border-[var(--border)] flex items-center justify-between">
                <a
                  href="/resume.pdf"
                  download
                  className="btn-primary text-[8px]"
                >
                  Download CV
                </a>
                <span className="font-mono text-[7px] text-[var(--text-muted)] tracking-widest uppercase">
                  Quenzzy J. Navelgas
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
