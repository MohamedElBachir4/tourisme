type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <header className="border-b border-forest/10 bg-beige px-5 pb-14 pt-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-pine">
          <span className="h-px w-8 bg-pine" aria-hidden />
          {eyebrow}
        </p>
        <h1 className="max-w-3xl font-display text-4xl font-medium tracking-tight text-forest sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal/75">{description}</p>
      </div>
    </header>
  );
}
