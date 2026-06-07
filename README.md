# Quenzzy J. Navelgas — Portfolio

A world-class personal portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🛠️ Tech Stack

- **Next.js 14** (App Router + Static Export)
- **TypeScript**
- **Tailwind CSS** — custom design system
- **Framer Motion** — premium animations
- **next-themes** — dark/light mode
- **Lucide React** — icons

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx       # Root layout with metadata & fonts
│   ├── page.tsx         # Main page assembly
│   └── globals.css      # Design tokens & global styles
├── components/
│   ├── navbar.tsx       # Sticky nav with active section highlight
│   ├── hero.tsx         # Animated hero with profile
│   ├── about.tsx        # Summary & highlight cards
│   ├── skills.tsx       # Categorized skills with proficiency bars
│   ├── projects.tsx     # Featured project cards
│   ├── experience.tsx   # Vertical timeline (accordion)
│   ├── education.tsx    # Education, awards, leadership
│   ├── certifications.tsx
│   ├── contact.tsx      # Contact links + static form UI
│   ├── footer.tsx
│   ├── theme-toggle.tsx
│   ├── scroll-progress.tsx
│   ├── back-to-top.tsx
│   └── cursor-glow.tsx
├── data/
│   └── portfolio.ts     # ← ALL content lives here
└── public/
    ├── profile.jpg      # Add your photo here
    └── resume.pdf       # Add your resume PDF here
```

## 🎨 Customization

All content is centralized in **`data/portfolio.ts`** — update any field there to reflect changes across the entire site.

To add your profile photo, replace `/public/profile.jpg` and uncomment the `<Image>` tag in `components/hero.tsx`.

## 🌐 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deployments.

## 🌙 Dark / Light Mode

Defaults to **dark mode**. Toggle via the button in the navbar — preference is persisted in localStorage via `next-themes`.

## ✨ Features

- Cursor glow effect (desktop)
- Scroll progress indicator
- Active nav section highlighting
- Staggered entrance animations
- Floating hero badges
- Expandable experience cards
- Expandable skill categories
- Responsive across all breakpoints
- SEO + Open Graph metadata
- Static export for zero-cost hosting
