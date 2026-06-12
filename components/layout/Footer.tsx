import Link from 'next/link';
import type { StudioSettings } from '@/lib/types';

export function Footer({ settings }: { settings: StudioSettings }) {
  return (
    <footer className="border-t border-brand-white/10 bg-black/35">
      <div className="section-shell grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="font-display text-4xl uppercase tracking-[-0.07em]">NNGTW Studio</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-brand-white/58">{settings.tagline || 'Imagine • Explore • Evolve'} — building original worlds, games, animation, characters, and interactive experiences.</p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm text-brand-white/60 sm:grid-cols-3">
          <Link href="/projects" className="hover:text-brand-orange">Projects</Link>
          <Link href="/experience" className="hover:text-brand-orange">Experience</Link>
          <Link href="/investors" className="hover:text-brand-orange">Investors</Link>
          <Link href="/about" className="hover:text-brand-orange">About</Link>
          <Link href="/contact" className="hover:text-brand-orange">Contact</Link>
          <Link href="/admin" className="hover:text-brand-orange">Admin</Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-brand-white/10 px-5 py-6 text-xs uppercase tracking-[0.2em] text-brand-white/38 sm:px-8 lg:px-10 md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} NNGTW Studio</span>
        <span>Original worlds in development</span>
      </div>
    </footer>
  );
}
