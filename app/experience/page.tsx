import type { Metadata } from 'next';
import { EmptyState } from '@/components/shared/EmptyState';
import { getProjects } from '@/lib/content';

export const metadata: Metadata = { title: 'Experience' };

export default async function ExperiencePage() {
  const projects = await getProjects();
  return (
    <section className="section-shell min-h-screen pt-36">
      <p className="eyebrow">Interactive Experience</p>
      <h1 className="section-title">Portal system for world exploration.</h1>
      <p className="section-copy">This page is structured for future WebGL support while currently rendering accessible, mobile-first interactive world cards from Firestore.</p>
      <div className="mt-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="cinematic-card min-h-[30rem] p-6">
          <div className="grid h-full place-items-center rounded-[1.4rem] bg-[radial-gradient(circle,rgba(245,138,31,.42),transparent_34%),conic-gradient(from_90deg,rgba(245,138,31,.22),rgba(242,239,231,.08),rgba(245,138,31,.22))]">
            <div className="size-48 rounded-full border border-brand-orange/50 shadow-orange" />
          </div>
        </div>
        <div className="grid gap-4">
          {projects.length ? projects.map((project) => (
            <article key={project.id} className="panel rounded-[1.6rem] p-6 transition hover:border-brand-orange/40">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-orange">Portal · {project.worldType}</p>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.05em]">{project.title}</h2>
              <p className="mt-2 text-sm leading-7 text-brand-white/58">{project.logline}</p>
            </article>
          )) : <EmptyState title="No worlds available" body="World selection is powered by the Firestore projects collection." />}
        </div>
      </div>
    </section>
  );
}
