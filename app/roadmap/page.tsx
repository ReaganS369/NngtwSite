import type { Metadata } from 'next';
import { EmptyState } from '@/components/shared/EmptyState';
import { getRoadmap } from '@/lib/content';

export const metadata: Metadata = { title: 'Roadmap' };

export default async function RoadmapPage() {
  const roadmap = await getRoadmap();
  return (
    <section className="section-shell pt-36">
      <p className="eyebrow">Roadmap</p>
      <h1 className="section-title">From foundation to independent studio growth.</h1>
      <div className="mt-14 space-y-5">
        {roadmap.length ? roadmap.map((item) => (
          <div key={item.year} className="cinematic-card grid gap-5 p-6 md:grid-cols-[12rem_1fr] md:items-center">
            <p className="font-display text-6xl tracking-[-0.08em] text-brand-orange">{item.year}</p>
            <div><h2 className="text-3xl font-black uppercase tracking-[-0.04em]">{item.title}</h2><p className="mt-2 leading-7 text-brand-white/60">{item.body}</p></div>
          </div>
        )) : <EmptyState title="Roadmap content not found" body="Roadmap milestones are managed in Firestore under settings/roadmap." />}
      </div>
    </section>
  );
}
