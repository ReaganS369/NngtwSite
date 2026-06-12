import type { Metadata } from 'next';
import { Mail, MessageCircle, Linkedin } from 'lucide-react';
import { getStudioSettings } from '@/lib/content';

export const metadata: Metadata = { title: 'Contact' };

export default async function ContactPage() {
  const settings = await getStudioSettings();
  const contactItems = [
    { label: 'Email', value: settings.email, icon: Mail, href: settings.email ? `mailto:${settings.email}` : undefined },
    { label: 'LinkedIn', value: settings.linkedIn, icon: Linkedin, href: settings.linkedIn },
    { label: 'Discord', value: settings.discord, icon: MessageCircle, href: settings.discord }
  ];

  return (
    <section className="section-shell pt-36">
      <p className="eyebrow">Contact</p>
      <h1 className="section-title">Direct studio contact. No unnecessary forms.</h1>
      <p className="section-copy">Reach NNGTW Studio for investment, publishing, creative partnerships, and production conversations.</p>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {contactItems.map(({ label, value, icon: Icon, href }) => (
          <a key={label} href={href || '#'} className="cinematic-card p-7 transition hover:-translate-y-1 hover:border-brand-orange/40">
            <Icon className="size-8 text-brand-orange" />
            <p className="mt-6 text-xs font-black uppercase tracking-[0.25em] text-brand-white/45">{label}</p>
            <p className="mt-3 break-words text-lg font-bold text-brand-white">{value || 'Configured in Firestore settings'}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
