import Link from 'next/link';
import { Hero } from '@/components/home/Hero';
import { ProjectCard } from '@/components/shared/ProjectCard';
import { Reveal } from '@/components/shared/Reveal';
import { EmptyState } from '@/components/shared/EmptyState';
import { getMedia, getProjects, getRoadmap, getStudioSettings } from '@/lib/content';

export default async function HomePage() {
  const [settings, featuredProjects, media, roadmap] = await Promise.all([
    getStudioSettings(),
    getProjects({ featured: true, limitCount: 4 }),
    getMedia(6),
    getRoadmap()
  ]);

  return (
    <>
      <Hero settings={settings} />
      <section className="section-shell" id="worlds">
        <Reveal>
          <p className="eyebrow">Featured Worlds</p>
          <h2 className="section-title">Worlds built for games, animation, and long-form mythology.</h2>
          <p className="section-copy">NNGTW develops original universes as expandable entertainment IP: systems first, story rich, and designed for interactive exploration.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featuredProjects.length ? featuredProjects.slice(0, 3).map((project, index) => (
            <Reveal key={project.id} delay={index * 0.08} className="cinematic-card p-7">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-orange">{project.worldType}</p>
              <h3 className="mt-5 text-3xl font-black uppercase tracking-[-0.05em]">{project.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-white/58">{project.logline}</p>
            </Reveal>
          )) : <div className="md:col-span-3"><EmptyState title="Firestore content required" body="Connect Firebase and run the Firestore seed script to publish NNGTW worlds on the live site." /></div>}
        </div>
      </section>
      <section className="section-shell" id="projects">
        <Reveal>
          <p className="eyebrow">Featured Projects</p>
          <h2 className="section-title">A focused slate of playable worlds and cinematic concepts.</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredProjects.length ? featuredProjects.map((project, index) => <Reveal key={project.id} delay={index * 0.06}><ProjectCard project={project} /></Reveal>) : <div className="md:col-span-2 xl:col-span-4"><EmptyState title="No projects loaded" body="Project cards are rendered only from the Firestore projects collection." /></div>}
        </div>
      </section>
      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">Animation Showcase</p>
            <h2 className="section-title">Cinematic craft for characters, worlds, and story moments.</h2>
            <p className="section-copy">The studio’s animation direction supports the same IP pipeline as the games: character language, world mood, trailers, lore reveals, and interactive presentation.</p>
          </Reveal>
          <Reveal className="cinematic-card min-h-[28rem] p-5">
            <div className="grid h-full min-h-[25rem] place-items-center rounded-[1.4rem] bg-[linear-gradient(135deg,rgba(245,138,31,.28),rgba(12,12,12,.88)),radial-gradient(circle_at_30%_30%,rgba(242,239,231,.16),transparent_30%)] text-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-brand-orange">Motion Reel System</p>
                <p className="mt-5 text-5xl font-black uppercase tracking-[-0.08em]">Animation-first storytelling</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section-shell">
        <Reveal>
          <p className="eyebrow">Studio Vision</p>
          <h2 className="section-title">An independent creative studio for original interactive entertainment.</h2>
          <p className="section-copy">{settings.investorStatement || 'NNGTW Studio is building toward a scalable future where game systems, animation pipelines, and owned worlds compound into durable entertainment franchises.'}</p>
        </Reveal>
      </section>
      <section className="section-shell">
        <Reveal>
          <p className="eyebrow">Roadmap</p>
          <h2 className="section-title">Designed for disciplined creative growth.</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {roadmap.length ? roadmap.map((item) => (
            <div key={item.year} className="cinematic-card p-5">
              <p className="text-3xl font-black text-brand-orange">{item.year}</p>
              <p className="mt-4 font-black uppercase tracking-[-0.03em]">{item.title}</p>
              <p className="mt-3 text-sm leading-6 text-brand-white/55">{item.body}</p>
            </div>
          )) : <div className="md:col-span-5"><EmptyState title="Roadmap not published" body="Roadmap milestones are loaded from settings/roadmap in Firestore." /></div>}
        </div>
      </section>
      <section className="section-shell">
        <div className="cinematic-card bg-ember-radial p-8 sm:p-12 lg:p-16">
          <p className="eyebrow">Investor Call To Action</p>
          <h2 className="section-title">Partner with an original studio at the foundation stage.</h2>
          <p className="section-copy">NNGTW is focused on original IP, commercial releases, and a repeatable studio pipeline for games and animation.</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/investors" className="orange-button">Investor Overview</Link>
            <Link href="/contact" className="ghost-button">Contact Studio</Link>
          </div>
        </div>
      </section>
    </>
  );
}
