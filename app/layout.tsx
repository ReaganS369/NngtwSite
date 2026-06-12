import type { Metadata } from 'next';
import './globals.css';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { getStudioSettings } from '@/lib/content';

export const metadata: Metadata = {
  metadataBase: new URL('https://nngtw.studio'),
  title: {
    default: 'NNGTW Studio — Imagine • Explore • Evolve',
    template: '%s | NNGTW Studio'
  },
  description: 'NNGTW Studio is an independent game and animation studio creating original worlds, games, stories, characters, and interactive experiences.',
  openGraph: {
    title: 'NNGTW Studio',
    description: 'Independent game and animation studio building original worlds and interactive experiences.',
    url: 'https://nngtw.studio',
    siteName: 'NNGTW Studio',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NNGTW Studio',
    description: 'Imagine • Explore • Evolve'
  }
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getStudioSettings();

  return (
    <html lang="en">
      <body>
        <div className="noise fixed inset-0 -z-10 opacity-[0.035]" />
        <Header />
        <main>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
