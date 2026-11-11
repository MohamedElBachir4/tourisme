"use client";

import { destinations } from "@/content/catalog";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useI18n } from "@/i18n/LanguageProvider";

export function FeaturedDestinations() {
  const { t } = useI18n();

  return (
    <section id="destinations" className="scroll-mt-20 bg-beige px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="destinations-heading"
          eyebrow={t.destinations.eyebrow}
          title={t.destinations.title}
          description={t.destinations.description}
        />
        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          {destinations.map((place) => (
            <DestinationCard
              key={place.id}
              href={`/destinations/${place.id}`}
              image={place.image}
              position={place.position}
              className={place.className}
              copy={t.destinations.items[place.id]}
              exploreLabel={t.destinations.explore}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
