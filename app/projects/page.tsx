import type { Metadata } from 'next';
import { ProjectCard } from '@/components/shared/ProjectCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { getProjects } from '@/lib/content';

export const metadata: Metadata = { title: 'Projects' };

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="section-shell pt-36">
      <p className="eyebrow">Project Slate</p>
      <h1 className="section-title">Original games and worlds in the NNGTW pipeline.</h1>
      <p className="section-copy">Each project card is powered by Firestore and tracks status, genre, platform direction, and development progress.</p>
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {projects.length ? projects.map((project) => <ProjectCard key={project.id} project={project} />) : <div className="md:col-span-2 xl:col-span-4"><EmptyState title="No Firestore projects found" body="Run the seed script or create projects from the protected admin panel." /></div>}
      </div>
    </section>
  );
}
