import type { Metadata, Viewport } from 'next';
import { spaceGrotesk, spaceMono } from '@/lib/fonts';
import SiteHeader from '@/components/SiteHeader';
import Crosshair from '@/components/Crosshair';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://atelierforma.example'),
  title: 'Atelier Forma — We draw in light',
  description:
    'Atelier Forma is an architecture studio in Zürich, est. 2009. Rigorous, poetic, silent. We work in section, in plan, in silence, until the room is inevitable.',
  keywords: ['architecture', 'studio', 'Zürich', 'concrete', 'minimal', 'Atelier Forma'],
  openGraph: {
    title: 'Atelier Forma — We draw in light',
    description: 'Architecture studio — Zürich, est. 2009.',
    type: 'website',
    locale: 'en_GB',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#F5F4F0',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body className="grain bg-concrete font-grotesk text-graphite antialiased">
        <SiteHeader />
        {children}
        <Crosshair />
      </body>
    </html>
  );
}
