"use client";

import Image from "next/image";
import { impactImages } from "@/content/catalog";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useI18n } from "@/i18n/LanguageProvider";

export function SustainabilityImpact() {
  const { t } = useI18n();

  return (
    <section id="impact" className="bg-sand px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            id="impact-heading"
            eyebrow={t.impact.eyebrow}
            title={t.impact.title}
            description={t.impact.description}
          />
        </Reveal>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {t.impact.items.map((item, index) => {
            const photo = impactImages[index];
            return (
              <Reveal key={item.title} delay={index * 80}>
                <article className="h-full overflow-hidden rounded-[1.75rem] bg-ivory">
                  <div className="relative h-48">
                    <Image
                      src={photo?.src ?? "/images/planner.jpg"}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: photo?.position ?? "center" }}
                    />
                  </div>
                  <div className="p-7">
                    <p className="font-display text-sm tracking-[0.18em] text-pine" aria-hidden>
                      0{index + 1}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-forest">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal/75 sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
