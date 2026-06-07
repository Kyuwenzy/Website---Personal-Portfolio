'use client';

/*
  CONTACT — Functional form
  ──────────────────────────
  Uses a Next.js API route (/api/contact) which calls Resend
  to send a real email to quenzzynavelgas123@gmail.com.

  Setup (one-time, takes 2 minutes):
  1. Sign up free at https://resend.com
  2. Get your API key from resend.com/api-keys
  3. Create .env.local in your project root:
       RESEND_API_KEY=re_xxxxxxxxxxxx
  4. npm install resend
  5. Create the API route (app/api/contact/route.ts) — see below

  The form handles: loading state, success, error, validation.
*/

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { portfolioData } from '@/data/portfolio';

const { personal } = portfolioData;

type FormState = 'idle' | 'loading' | 'success' | 'error';

const contactDetails = [
  { label: 'Correspondence', value: personal.email,   href: `mailto:${personal.email}` },
  { label: 'Network',        value: 'LinkedIn',       href: personal.linkedin },
  { label: 'Repository',     value: 'GitHub',         href: personal.github  },
  { label: 'Location',       value: 'Dasmariñas, PH', href: null             },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });

  const [formState, setFormState] = useState<FormState>('idle');
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<typeof fields>>({});

  const validate = () => {
    const e: Partial<typeof fields> = {};
    if (!fields.name.trim())    e.name    = 'Required';
    if (!fields.email.trim())   e.email   = 'Required';
    else if (!/\S+@\S+\.\S+/.test(fields.email)) e.email = 'Invalid email';
    if (!fields.message.trim()) e.message = 'Required';
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setFormState('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setFormState('success');
        setFields({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[var(--bg-primary)] border-b border-[var(--border-strong)]"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-0">
        <div className="w-full border-b-2 border-[var(--text-primary)] pb-6 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4 block"
              style={{ color: 'var(--accent)' }}
            >
              07 // BACK_COVER
            </motion.span>
            <h2
              className="font-display font-light tracking-tighter text-[var(--text-primary)] uppercase leading-[0.9]"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
            >
              Let&apos;s start{' '}
              <span className="italic font-serif font-normal lowercase pr-4" style={{ color: 'var(--accent)' }}>
                something.
              </span>
            </h2>
          </div>
          <div className="font-mono text-[9px] text-[var(--text-muted)] tracking-widest uppercase mt-8 md:mt-0 max-w-[260px] text-left md:text-right">
            Open for inquiries.<br />Engineering &amp; Design.
          </div>
        </div>
      </div>

      {/* Ink / paper split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]" ref={ref}>

        {/* LEFT: ink panel */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between p-12 md:p-16 lg:p-20 relative"
          style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}
        >
          {/* Ghost END watermark — currentColor inherits paper colour from container */}
          <div
            aria-hidden
            className="absolute bottom-0 left-0 font-display font-black leading-none pointer-events-none select-none text-current"
            style={{ fontSize: 'clamp(5rem, 14vw, 16rem)', opacity: 0.06, lineHeight: 1 }}
          >END</div>

          <div className="relative z-10">
            {/*
              FIX: Replaced all hardcoded rgba(247,245,240,...) with
              currentColor-based opacity classes. Since the ink panel sets
              color: var(--bg-primary) on the container, `currentColor`
              always resolves to the correct paper colour in both modes —
              light (bone #F7F5F0) and dark (platinum #F0EDE6).
            */}
            <div className="font-mono text-[10px] uppercase tracking-widest mb-12 pb-4 border-b border-current/20 text-current/50">
              [ DIRECTORY INDEX ]
            </div>

            <div className="flex flex-col border-t border-current/20">
              {contactDetails.map((item, i) => {
                const Tag = item.href ? 'a' : 'div';
                const props = item.href
                  ? { href: item.href, target: item.href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' }
                  : {};
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Tag
                      {...props as object}
                      className="group flex items-baseline justify-between py-6 border-b border-current/20"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-widest text-current/50 transition-colors">
                        {item.label}
                      </span>
                      <span className="font-display text-lg md:text-xl tracking-tight text-current transition-colors group-hover:text-[var(--accent)]">
                        {item.value}
                      </span>
                    </Tag>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 mt-12 font-mono text-[9px] uppercase tracking-widest text-current/40">
            Currently accepting global commissions<br />
            and collaborative engineering directives.
          </div>
        </motion.div>

        {/* RIGHT: paper form — FUNCTIONAL */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-col justify-center p-12 md:p-16 lg:p-20 border-l border-[var(--border-strong)]"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-10">
            [ TRANSMISSION_DOCKET ]
          </div>

          {/* Success state */}
          {formState === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-start gap-4"
            >
              <div className="w-10 h-[2px]" style={{ backgroundColor: 'var(--accent)' }} />
              <h3 className="font-display text-4xl font-light tracking-tighter text-[var(--text-primary)] uppercase">
                Transmission<br />
                <span className="italic font-serif lowercase" style={{ color: 'var(--accent)' }}>received.</span>
              </h3>
              <p className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest uppercase mt-2">
                I&apos;ll get back to you within 24–48 hours.
              </p>
              <button
                onClick={() => setFormState('idle')}
                className="mt-6 font-mono text-[10px] tracking-widest uppercase border-b pb-0.5 transition-colors hover:text-[var(--accent)] hover:border-[var(--accent)]"
                style={{ color: 'var(--text-muted)', borderColor: 'var(--border-strong)' }}
              >
                Send another →
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-8">

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {(['name', 'email'] as const).map((field) => (
                  <div key={field}>
                    <label className="font-mono text-[9px] uppercase tracking-widest block mb-3"
                      style={{ color: errors[field] ? 'var(--accent)' : 'var(--text-muted)' }}>
                      {errors[field] ?? field}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      value={fields[field]}
                      onChange={handleChange}
                      placeholder={field === 'name' ? 'Your name' : 'your@email.com'}
                      className="w-full bg-transparent pb-3 text-sm outline-none transition-colors font-body"
                      style={{
                        borderBottom: `1px solid ${errors[field] ? 'var(--accent)' : 'var(--border-strong)'}`,
                        color: 'var(--text-primary)',
                      }}
                      onFocus={(e) => e.currentTarget.style.borderBottomColor = 'var(--accent)'}
                      onBlur={(e) => e.currentTarget.style.borderBottomColor = errors[field] ? 'var(--accent)' : 'var(--border-strong)'}
                    />
                  </div>
                ))}
              </div>

              {/* Subject */}
              <div>
                <label className="font-mono text-[9px] uppercase tracking-widest block mb-3 text-[var(--text-muted)]">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={fields.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="w-full bg-transparent border-b pb-3 text-sm outline-none transition-colors font-body"
                  style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
                  onFocus={(e) => e.currentTarget.style.borderBottomColor = 'var(--accent)'}
                  onBlur={(e) => e.currentTarget.style.borderBottomColor = 'var(--border-strong)'}
                />
              </div>

              {/* Message */}
              <div>
                <label className="font-mono text-[9px] uppercase tracking-widest block mb-3"
                  style={{ color: errors.message ? 'var(--accent)' : 'var(--text-muted)' }}>
                  {errors.message ?? 'Manifest'}
                </label>
                <textarea
                  rows={5}
                  name="message"
                  value={fields.message}
                  onChange={handleChange}
                  placeholder="Describe your project or opportunity…"
                  className="w-full bg-transparent border-b pb-3 text-sm outline-none transition-colors resize-none font-body"
                  style={{
                    borderColor: errors.message ? 'var(--accent)' : 'var(--border-strong)',
                    color: 'var(--text-primary)',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderBottomColor = 'var(--accent)'}
                  onBlur={(e) => e.currentTarget.style.borderBottomColor = errors.message ? 'var(--accent)' : 'var(--border-strong)'}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={formState === 'loading'}
                whileHover={{ scale: formState === 'loading' ? 1 : 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 font-mono text-[10px] uppercase tracking-[0.3em] font-bold transition-colors duration-300 disabled:opacity-60"
                style={{
                  backgroundColor: formState === 'loading' ? 'var(--text-muted)' : 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                }}
              >
                {formState === 'loading' ? 'Dispatching…' : 'Dispatch'}
              </motion.button>

              {formState === 'error' && (
                <p className="font-mono text-[9px] uppercase tracking-widest text-center" style={{ color: 'var(--accent)' }}>
                  Transmission failed — please email directly at {personal.email}
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>

      <div className="section-folio">
        <span>Quenzzy J. Navelgas — Portfolio 2026</span>
        <span>07 / 07</span>
      </div>
    </section>
  );
}
