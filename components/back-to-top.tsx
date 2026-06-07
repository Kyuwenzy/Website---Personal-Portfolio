'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggle, { passive: true });
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover="hover"
          className="fixed bottom-8 right-6 z-50 group flex flex-col items-center gap-2"
          aria-label="Back to top"
        >
          {/* Animated vertical line that draws upward on hover */}
          <motion.div
            variants={{ hover: { scaleY: 1.6, originY: 1 } }}
            className="w-[1px] h-6 bg-[var(--accent)] origin-bottom transition-transform duration-300"
          />

          {/* Square button — no rounded corners, editorial */}
          <motion.div
            variants={{ hover: { backgroundColor: 'var(--accent)' } }}
            className="w-9 h-9 flex items-center justify-center border border-[var(--accent)] bg-[var(--bg-primary)] transition-colors duration-300"
          >
            {/* Up arrow made from CSS — no Lucide icon */}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M5 9V1M1 5L5 1L9 5"
                stroke="var(--accent)"
                strokeWidth="1"
                strokeLinecap="square"
              />
            </svg>
          </motion.div>

          {/* "TOP" label */}
          <span className="font-mono text-[7px] tracking-[0.3em] text-[var(--accent)] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            TOP
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
