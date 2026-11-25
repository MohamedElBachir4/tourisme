"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/pages/PageHero";
import { formatDays, formatPrice } from "@/i18n/format";
import { useI18n } from "@/i18n/LanguageProvider";
import { pageCopy } from "@/i18n/pages";
import { pickLocalized, pickLocalizedList } from "@/lib/i18n-content";
import type { Destination, Trip } from "@/types/database";

type DestinationDetailProps = {
  destination: Destination;
  trips: Trip[];
};

export function DestinationDetail({ destination, trips }: DestinationDetailProps) {
  const { locale, t } = useI18n();
  const copy = pageCopy[locale];
  const images = destination.images?.length
    ? destination.images
    : [{ id: "cover", url: destination.cover_image, alt: destination.name, sort_order: 0, destination_id: destination.id }];

  return (
    <>
      <PageHero
        eyebrow={destination.wilaya}
        title={pickLocalized(destination.name, locale)}
        description={pickLocalized(destination.long_description, locale)}
      />
      <section className="bg-ivory px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {images.map((image) => (
              <div key={image.id} className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={image.url}
                  alt={pickLocalized(image.alt, locale)}
                  fill
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl text-forest">{copy.destinationsPage.activities}</h2>
              <ul className="mt-4 space-y-2 text-sm text-charcoal/75">
                {pickLocalizedList(destination.activities, locale).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl text-forest">{copy.destinationsPage.lodging}</h2>
              <ul className="mt-4 space-y-2 text-sm text-charcoal/75">
                {pickLocalizedList(destination.accommodations, locale).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-3xl text-forest">{copy.destinationsPage.relatedTrips}</h2>
            {trips.length === 0 ? (
              <p className="mt-4 text-charcoal/70">{copy.common.noResults}</p>
            ) : (
              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {trips.map((trip) => (
                  <Link
                    key={trip.id}
                    href={`/trips/${trip.slug}`}
                    className="rounded-[1.5rem] border border-forest/10 bg-white p-6 transition hover:border-pine/40"
                  >
                    <h3 className="font-display text-xl text-forest">
                      {pickLocalized(trip.name, locale)}
                    </h3>
                    <p className="mt-2 text-sm text-charcoal/70">
                      {formatDays(locale, t.trips.days, trip.duration_days)} ·{" "}
                      {formatPrice(locale, trip.base_price_dzd, copy.common.from, t.trips.currency)}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
