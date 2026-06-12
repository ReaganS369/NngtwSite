import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About' };

const values = ['Original worlds first', 'Interactive storytelling', 'Cinematic craft', 'Disciplined production', 'Long-term IP ownership'];

export default function AboutPage() {
  return (
    <section className="section-shell pt-36">
      <p className="eyebrow">About NNGTW</p>
      <h1 className="section-title">An independent game and animation studio founded by Reagan Sagolsem.</h1>
      <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="cinematic-card p-8">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-brand-orange">Founder</p>
          <h2 className="mt-5 text-4xl font-black uppercase tracking-[-0.06em]">Reagan Sagolsem</h2>
          <ul className="mt-6 space-y-3 text-brand-white/65">
            <li>3D Designer</li>
            <li>Animator</li>
            <li>Game Developer</li>
            <li>Studio Founder</li>
          </ul>
        </aside>
        <div className="grid gap-5">
          <div className="panel rounded-[2rem] p-8"><h3 className="text-2xl font-black uppercase">Mission</h3><p className="mt-3 leading-8 text-brand-white/62">Create original games, animated stories, characters, and interactive experiences that invite audiences to imagine, explore, and evolve.</p></div>
          <div className="panel rounded-[2rem] p-8"><h3 className="text-2xl font-black uppercase">Vision</h3><p className="mt-3 leading-8 text-brand-white/62">Grow NNGTW into a full creative studio where playable systems, cinematic presentation, and owned worlds become enduring entertainment franchises.</p></div>
        </div>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-5">
        {values.map((value) => <div key={value} className="cinematic-card p-5 text-sm font-black uppercase tracking-[0.1em] text-brand-white/80">{value}</div>)}
      </div>
      <div className="mt-12 cinematic-card p-8">
        <p className="eyebrow">Studio Journey</p>
        <p className="max-w-4xl text-xl leading-9 text-brand-white/70">NNGTW is developing from founder-led creation into a structured studio pipeline: concept development, playable prototypes, animation language, production discipline, publishing readiness, and long-term growth.</p>
      </div>
    </section>
  );
}
