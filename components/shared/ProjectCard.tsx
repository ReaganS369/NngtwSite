import Link from 'next/link';
import type { Project } from '@/lib/types';
import { titleCase } from '@/lib/format';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="cinematic-card group block overflow-hidden">
      <div className="aspect-[16/10] overflow-hidden bg-brand-ember">
        {project.coverImage ? <img src={project.coverImage} alt={`${project.title} cover artwork`} className="h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100" /> : <div className="grid h-full place-items-center bg-ember-radial text-4xl font-black text-brand-orange">{project.title.slice(0, 1)}</div>}
      </div>
      <div className="p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-brand-orange/15 px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-brand-orange">{titleCase(project.status)}</span>
          <span className="rounded-full border border-brand-white/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-brand-white/54">{project.genre}</span>
        </div>
        <h3 className="text-2xl font-black uppercase tracking-[-0.04em] text-brand-white">{project.title}</h3>
        <p className="mt-3 min-h-14 text-sm leading-7 text-brand-white/58">{project.description}</p>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-brand-white/10">
          <div className="h-full bg-brand-orange" style={{ width: `${Math.max(0, Math.min(project.progress, 100))}%` }} />
        </div>
        <p className="mt-3 text-xs uppercase tracking-[0.18em] text-brand-white/42">{project.progress}% development signal · {project.platform.join(' / ')}</p>
      </div>
    </Link>
  );
}
