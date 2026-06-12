import Link from 'next/link';

const navItems = [
  ['Worlds', '/experience'],
  ['Projects', '/projects'],
  ['About', '/about'],
  ['Roadmap', '/roadmap'],
  ['Investors', '/investors'],
  ['Contact', '/contact']
] as const;

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-white/10 bg-brand-black/72 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10" aria-label="Primary">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl border border-brand-orange/50 bg-brand-orange text-lg font-black text-brand-black shadow-orange">N</span>
          <span className="leading-none">
            <span className="block text-sm font-black uppercase tracking-[0.28em] text-brand-white">NNGTW</span>
            <span className="block text-[0.62rem] font-bold uppercase tracking-[0.42em] text-brand-white/55">Studio</span>
          </span>
        </Link>
        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="text-xs font-black uppercase tracking-[0.2em] text-brand-white/58 transition hover:text-brand-orange">
              {label}
            </Link>
          ))}
        </div>
        <Link href="/admin" className="hidden rounded-full border border-brand-white/15 px-4 py-2 text-[0.65rem] font-black uppercase tracking-[0.22em] text-brand-white/70 transition hover:border-brand-orange hover:text-brand-orange sm:inline-flex">
          Studio OS
        </Link>
      </nav>
    </header>
  );
}
