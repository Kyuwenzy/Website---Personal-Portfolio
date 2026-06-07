'use client';

import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import Experience from '@/components/experience';
import Education from '@/components/education';
import Certifications from '@/components/certifications';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import ScrollProgress from '@/components/scroll-progress';
import BackToTop from '@/components/back-to-top';
import CursorGlow from '@/components/cursor-glow';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
