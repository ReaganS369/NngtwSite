export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="cinematic-card p-8 text-center">
      <p className="text-lg font-black uppercase tracking-[0.18em] text-brand-white">{title}</p>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-brand-white/55">{body}</p>
    </div>
  );
}
