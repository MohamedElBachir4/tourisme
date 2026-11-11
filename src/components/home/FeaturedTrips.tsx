"use client";

import { trips } from "@/content/catalog";
import { formatDays, formatPrice } from "@/i18n/format";
import { useI18n } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TripCard } from "@/components/ui/TripCard";

export function FeaturedTrips() {
  const { locale, t } = useI18n();

  return (
    <section id="journeys" className="bg-ivory px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            id="journeys-heading"
            eyebrow={t.trips.eyebrow}
            title={t.trips.title}
            description={t.trips.description}
          />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {trips.map((trip, index) => (
            <Reveal key={trip.id} delay={index * 80} className="h-full">
              <TripCard
                href={`/journeys/${trip.id}`}
                image={trip.image}
                position={trip.position}
                copy={t.trips.items[trip.id]}
                duration={formatDays(locale, t.trips.days, trip.days)}
                price={formatPrice(locale, trip.price, t.trips.from, t.trips.currency)}
                viewLabel={t.trips.view}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
