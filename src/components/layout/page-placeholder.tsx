type PagePlaceholderProps = {
  title: string;
  description: string;
  milestone?: string;
};

export function PagePlaceholder({
  title,
  description,
  milestone = "M3",
}: PagePlaceholderProps) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
        {milestone} — Coming soon
      </p>
      <h1 className="mt-3 text-3xl font-bold uppercase text-foreground sm:text-4xl">{title}</h1>
      <p className="mt-4 text-base leading-relaxed text-brand-cream-muted">{description}</p>
    </section>
  );
}
