import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Quenzzy J. Navelgas — CS Student & Developer',
  description:
    'Portfolio of Quenzzy J. Navelgas — Computer Science student, ML developer, QA engineer, and AI-assisted content creator based in Dasmariñas, Cavite.',
  keywords: [
    'Quenzzy Navelgas',
    'Computer Science',
    'Machine Learning',
    'Web Developer',
    'QA Engineer',
    'Philippines',
    'Portfolio',
  ],
  authors: [{ name: 'Quenzzy J. Navelgas' }],
  creator: 'Quenzzy J. Navelgas',
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    url: 'https://quenzzy.dev',
    title: 'Quenzzy J. Navelgas — CS Student & Developer',
    description:
      'Portfolio of Quenzzy J. Navelgas — ML developer, QA engineer, and AI content creator.',
    siteName: 'Quenzzy Navelgas Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quenzzy J. Navelgas — CS Student & Developer',
    description: 'ML developer, QA engineer, and AI content creator based in the Philippines.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="noise">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
