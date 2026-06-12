import type { Metadata } from 'next';
import Link from 'next/link';
import { getProjects, getRoadmap, getStudioSettings } from '@/lib/content';

export const metadata: Metadata = { title: 'Investors' };

export default async function InvestorsPage() {
  const [settings, projects, roadmap] = await Promise.all([getStudioSettings(), getProjects(), getRoadmap()]);
  return (
    <section className="section-shell pt-36">
      <p className="eyebrow">Investor Overview</p>
      <h1 className="section-title">A future-focused independent studio building original entertainment IP.</h1>
      <p className="section-copy">{settings.investorStatement || 'NNGTW combines games, animation, and interactive worlds into a studio model built for owned IP and disciplined commercial growth.'}</p>
      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {['Studio Overview', 'Market Opportunity', 'Growth Strategy'].map((title, index) => (
          <div key={title} className="cinematic-card p-7">
            <p className="text-5xl font-black text-brand-orange">0{index + 1}</p>
            <h2 className="mt-6 text-2xl font-black uppercase tracking-[-0.04em]">{title}</h2>
            <p className="mt-4 text-sm leading-7 text-brand-white/58">{index === 0 ? 'Founder-led studio with a defined slate, production direction, and original world strategy.' : index === 1 ? 'Audience demand continues expanding across premium games, animation, creator-led IP, and transmedia universes.' : 'Build focused prototypes, validate audience interest, grow production capacity, and move toward commercial releases.'}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="panel rounded-[2rem] p-8"><h2 className="text-3xl font-black uppercase">Pipeline</h2><p className="mt-3 text-brand-white/60">{projects.length} Firestore-managed projects in the current slate.</p></div>
        <div className="panel rounded-[2rem] p-8"><h2 className="text-3xl font-black uppercase">Roadmap</h2><p className="mt-3 text-brand-white/60">{roadmap.length} published milestones toward independent studio growth.</p></div>
      </div>
      <div className="mt-12 cinematic-card bg-ember-radial p-10">
        <h2 className="section-title">Start the conversation.</h2>
        <p className="section-copy">For strategic support, publishing, partnership, and investment conversations, contact the studio directly.</p>
        <Link href="/contact" className="orange-button mt-8">Contact NNGTW</Link>
      </div>
    </section>
  );
}
