"use client";

import { PageHero } from "@/components/pages/PageHero";
import { useI18n } from "@/i18n/LanguageProvider";
import { pageCopy } from "@/i18n/pages";

export default function AboutPage() {
  const { locale } = useI18n();
  const copy = pageCopy[locale].about;

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} description={copy.intro} />
      <section className="bg-ivory px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <article>
            <h2 className="font-display text-3xl font-medium text-forest">{copy.missionTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal/75">{copy.mission}</p>
          </article>
          <article>
            <h2 className="font-display text-3xl font-medium text-forest">{copy.visionTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal/75">{copy.vision}</p>
          </article>
        </div>
        <div className="mx-auto mt-16 max-w-7xl">
          <h2 className="font-display text-3xl font-medium text-forest">{copy.valuesTitle}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {copy.values.map((value) => (
              <article key={value.title} className="rounded-[1.5rem] border border-forest/10 bg-white p-6">
                <h3 className="font-display text-xl text-forest">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/75">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
