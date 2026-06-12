import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  return { title: project ? project.title : 'Project' };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="pt-28">
      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="eyebrow">Project Detail</p>
            <h1 className="section-title">{project.title}</h1>
            <p className="section-copy">{project.story}</p>
          </div>
          <div className="cinematic-card p-6">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-orange">{project.status}</p>
            <dl className="mt-6 grid gap-4 text-sm">
              <div><dt className="text-brand-white/40">Genre</dt><dd className="font-bold">{project.genre}</dd></div>
              <div><dt className="text-brand-white/40">Platform</dt><dd className="font-bold">{project.platform.join(' / ')}</dd></div>
              <div><dt className="text-brand-white/40">Progress</dt><dd className="font-bold">{project.progress}%</dd></div>
            </dl>
          </div>
        </div>
      </section>
      <section className="section-shell py-10">
        <div className="cinematic-card aspect-video overflow-hidden">
          {project.trailerUrl ? <video src={project.trailerUrl} controls className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center bg-ember-radial text-center"><p className="text-2xl font-black uppercase tracking-[-0.04em]">Trailer module ready for Firestore media</p></div>}
        </div>
      </section>
      <section className="section-shell grid gap-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Features</p>
          <div className="grid gap-3">
            {project.features.map((feature) => <div key={feature} className="panel rounded-2xl p-5 text-brand-white/75">{feature}</div>)}
          </div>
        </div>
        <div>
          <p className="eyebrow">Roadmap</p>
          <div className="grid gap-3">
            {project.roadmap.map((item) => <div key={item.phase} className="panel rounded-2xl p-5"><p className="font-black uppercase text-brand-orange">{item.phase} · {item.status}</p><p className="mt-2 text-sm leading-7 text-brand-white/60">{item.detail}</p></div>)}
          </div>
        </div>
      </section>
      <section className="section-shell">
        <p className="eyebrow">Gallery</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[...project.screenshots, ...project.gallery].map((image) => <img key={image} src={image} alt={`${project.title} gallery`} className="aspect-video rounded-3xl border border-brand-white/10 object-cover" />)}
        </div>
      </section>
    </article>
  );
}
