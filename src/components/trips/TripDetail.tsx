"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { BookingForm } from "@/components/booking/BookingForm";
import { FormField, fieldClassName } from "@/components/forms/FormField";
import { PageHero } from "@/components/pages/PageHero";
import { formatDays, formatPrice } from "@/i18n/format";
import { useI18n } from "@/i18n/LanguageProvider";
import { pageCopy } from "@/i18n/pages";
import { pickLocalized, pickLocalizedList } from "@/lib/i18n-content";
import type {
  Accommodation,
  TransportOption,
  Trip,
} from "@/types/database";

type TripDetailProps = {
  trip: Trip;
  accommodations: Accommodation[];
  transports: TransportOption[];
};

export function TripDetail({ trip, accommodations, transports }: TripDetailProps) {
  const { locale, t } = useI18n();
  const copy = pageCopy[locale];
  const [travelers, setTravelers] = useState(2);
  const [travelDate, setTravelDate] = useState("");

  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    setTravelDate(date.toISOString().slice(0, 10));
  }, []);

  const nights = Math.max(trip.duration_days - 1, 1);
  const estimatedTotal = useMemo(
    () => trip.base_price_dzd * travelers,
    [travelers, trip.base_price_dzd],
  );

  const itinerary = trip.itinerary?.length ? trip.itinerary : trip.activities;

  return (
    <>
      <PageHero
        eyebrow={copy.toursPage.eyebrow}
        title={pickLocalized(trip.name, locale)}
        description={pickLocalized(trip.long_description, locale)}
      />
      <section className="bg-ivory px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem]">
              <Image
                src={trip.image_url}
                alt={pickLocalized(trip.name, locale)}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-forest/10 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-pine">{copy.toursPage.duration}</p>
                <p className="mt-2 font-medium text-forest">
                  {formatDays(locale, t.trips.days, trip.duration_days)}
                </p>
              </div>
              <div className="rounded-2xl border border-forest/10 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-pine">{copy.toursPage.destination}</p>
                <p className="mt-2 font-medium text-forest">
                  {trip.destination
                    ? pickLocalized(trip.destination.name, locale)
                    : "—"}
                </p>
              </div>
              <div className="rounded-2xl border border-forest/10 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-pine">{copy.common.from}</p>
                <p className="mt-2 font-medium text-forest">
                  {formatPrice(locale, trip.base_price_dzd, "", t.trips.currency)}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-2xl text-forest">{copy.toursPage.includes}</h2>
              <ul className="mt-4 space-y-2 text-sm text-charcoal/75">
                <li>• {pickLocalized(trip.accommodation_label, locale)}</li>
                {pickLocalizedList(trip.activities, locale).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-2xl text-forest">Itinerary</h2>
              <ol className="mt-4 space-y-3 text-sm text-charcoal/75">
                {pickLocalizedList(itinerary, locale).map((item, index) => (
                  <li key={`${item}-${index}`} className="rounded-2xl border border-forest/10 bg-white px-4 py-3">
                    <span className="font-medium text-pine">Day {index + 1}.</span> {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[1.75rem] border border-forest/10 bg-beige p-6">
              <h2 className="font-display text-2xl text-forest">{copy.common.continueBooking}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <FormField label={copy.common.travelers}>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={travelers}
                    onChange={(event) => setTravelers(Number(event.target.value) || 1)}
                    className={fieldClassName}
                  />
                </FormField>
                <FormField label={copy.plannerPage.travelDate}>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(event) => setTravelDate(event.target.value)}
                    className={fieldClassName}
                  />
                </FormField>
              </div>
              <p className="mt-4 text-sm font-medium text-forest">
                {copy.common.total}:{" "}
                {formatPrice(locale, estimatedTotal, "", t.trips.currency)}
              </p>
            </div>
            <BookingForm
              estimatedTotalDzd={estimatedTotal}
              travelers={travelers}
              nights={nights}
              travelDate={travelDate}
              tripId={trip.id}
              destinationId={trip.destination_id}
              accommodations={accommodations}
              transports={transports}
              tripSummaryLines={[
                pickLocalized(trip.name, locale),
                trip.destination
                  ? pickLocalized(trip.destination.name, locale)
                  : "",
                `${formatDays(locale, t.trips.days, trip.duration_days)} · ${travelers} ${copy.common.travelers}`,
                travelDate,
              ].filter(Boolean)}
              plannerPayload={{
                source: "trip-detail",
                tripSlug: trip.slug,
                travelers,
                nights,
                travelDate,
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
