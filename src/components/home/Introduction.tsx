"use client";

import { Compass, Leaf, Users } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useI18n } from "@/i18n/LanguageProvider";

const icons = [Leaf, Users, Compass];

export function Introduction() {
  const { t } = useI18n();

  return (
    <section id="introduction" className="bg-ivory px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow={t.intro.eyebrow}
            title={t.intro.title}
            description={t.intro.description}
          />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {t.intro.features.map((feature, index) => {
            const Icon = icons[index] ?? Leaf;
            return (
              <Reveal key={feature.title} delay={index * 90}>
                <article className="flex h-full flex-col rounded-[1.75rem] border border-forest/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-pine/30">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-sage text-forest">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="font-display text-3xl text-sage" aria-hidden>
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-medium tracking-tight text-forest">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/75 sm:text-base">
                    {feature.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
