'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { StudioSettings } from '@/lib/types';

export function Hero({ settings }: { settings: StudioSettings }) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden pt-28">
      <div className="absolute inset-0 -z-10 bg-studio-grid bg-[length:72px_72px] opacity-[0.12]" />
      <motion.div aria-hidden className="absolute left-1/2 top-24 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-brand-orange/20 blur-[120px]" animate={{ scale: [1, 1.16, 1], opacity: [0.35, 0.62, 0.35] }} transition={{ duration: 6, repeat: Infinity }} />
      <div className="section-shell flex min-h-[calc(100vh-7rem)] items-center">
        <div className="grid w-full items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">{settings.tagline || 'Imagine • Explore • Evolve'}</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-[clamp(4.6rem,18vw,14rem)] uppercase leading-[0.72] tracking-[-0.11em] text-brand-white">
              NNGTW
              <span className="block text-brand-orange">Studio</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="mt-8 max-w-2xl text-xl leading-9 text-brand-white/70">
              {settings.heroStatement || 'Independent game and animation studio building original worlds, cinematic stories, characters, and interactive experiences.'}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/projects" className="orange-button">Explore Projects</Link>
              <Link href="/investors" className="ghost-button">Studio Vision</Link>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, duration: 0.9 }} className="cinematic-card min-h-[34rem] p-5">
            <div className="relative h-full min-h-[31rem] overflow-hidden rounded-[1.5rem] bg-[radial-gradient(circle_at_50%_10%,rgba(245,138,31,.48),transparent_28%),linear-gradient(145deg,#241207,#0c0c0c_58%)]">
              <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-brand-white/10 bg-black/42 p-5 backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[0.32em] text-brand-orange">World Engine</p>
                <p className="mt-2 text-3xl font-black uppercase tracking-[-0.05em]">Original IP Pipeline</p>
                <p className="mt-3 text-sm leading-6 text-brand-white/58">Games, animation, lore, and interactive systems designed as one connected creative studio platform.</p>
              </div>
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-orange/50 shadow-orange" />
              <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-white/10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
