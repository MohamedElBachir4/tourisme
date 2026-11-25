"use client";

import { PageHero } from "@/components/pages/PageHero";
import { TripCard } from "@/components/ui/TripCard";
import { formatDays, formatPrice } from "@/i18n/format";
import { useI18n } from "@/i18n/LanguageProvider";
import { pageCopy } from "@/i18n/pages";
import { pickLocalized } from "@/lib/i18n-content";
import type { Trip } from "@/types/database";

export function TripsBrowser({ trips }: { trips: Trip[] }) {
  const { locale, t } = useI18n();
  const copy = pageCopy[locale];

  return (
    <>
      <PageHero
        eyebrow={copy.toursPage.eyebrow}
        title={copy.toursPage.title}
        description={copy.toursPage.description}
      />
      <section className="bg-ivory px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              href={`/trips/${trip.slug}`}
              image={trip.image_url}
              position="center"
              copy={{
                title: pickLocalized(trip.name, locale),
                category: pickLocalized(trip.category, locale),
                accommodation: pickLocalized(trip.accommodation_label, locale),
                alt: pickLocalized(trip.name, locale),
              }}
              duration={formatDays(locale, t.trips.days, trip.duration_days)}
              price={formatPrice(locale, trip.base_price_dzd, copy.common.from, t.trips.currency)}
              viewLabel={copy.common.viewDetails}
            />
          ))}
        </div>
      </section>
    </>
  );
}
