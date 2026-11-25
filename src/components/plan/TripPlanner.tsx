"use client";

import { useEffect, useMemo, useState } from "react";
import { BookingForm } from "@/components/booking/BookingForm";
import { FormField, fieldClassName } from "@/components/forms/FormField";
import { PageHero } from "@/components/pages/PageHero";
import { formatCount, formatPrice } from "@/i18n/format";
import { useI18n } from "@/i18n/LanguageProvider";
import { pageCopy } from "@/i18n/pages";
import {
  CARBON_REFERENCE_CODE,
  CARBON_STORAGE_KEY,
  savingsPercent,
  tripEmissionsKg,
  type StoredCarbonEstimate,
} from "@/lib/carbon";
import { pickLocalized } from "@/lib/i18n-content";
import { calculatePlannerQuote } from "@/lib/pricing";
import type {
  Accommodation,
  Activity,
  Destination,
  EmissionFactorView,
  TransportOption,
} from "@/types/database";

const steps = [
  "destination",
  "accommodation",
  "activities",
  "transport",
  "details",
  "summary",
] as const;

type Step = (typeof steps)[number];

type TripPlannerProps = {
  destinations: Destination[];
  accommodations: Accommodation[];
  activities: Activity[];
  transports: TransportOption[];
  emissionFactors: EmissionFactorView[];
};

export function TripPlanner({
  destinations,
  accommodations,
  activities,
  transports,
  emissionFactors,
}: TripPlannerProps) {
  const { locale, t } = useI18n();
  const copy = pageCopy[locale];
  const [step, setStep] = useState<Step>("destination");
  const [destinationId, setDestinationId] = useState(destinations[0]?.id ?? "");
  const [accommodationId, setAccommodationId] = useState(accommodations[0]?.id ?? "");
  const [activityIds, setActivityIds] = useState<string[]>([]);
  const [transportId, setTransportId] = useState(transports[0]?.id ?? "");
  const [travelers, setTravelers] = useState(2);
  const [nights, setNights] = useState(3);
  const [travelDate, setTravelDate] = useState("");
  const [distanceKm, setDistanceKm] = useState(450);

  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 21);
    setTravelDate(date.toISOString().slice(0, 10));
  }, []);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(CARBON_STORAGE_KEY);
      if (!raw) return;
      const stored = JSON.parse(raw) as StoredCarbonEstimate;
      if (stored.distanceKm > 0) setDistanceKm(stored.distanceKm);
      if (stored.passengers > 0) setTravelers(stored.passengers);
      const matchedTransport = transports.find((item) => item.code === stored.code);
      if (matchedTransport) setTransportId(matchedTransport.id);
    } catch {
      // ignore
    }
  }, [transports]);

  const destination = destinations.find((item) => item.id === destinationId) ?? null;
  const accommodation = accommodations.find((item) => item.id === accommodationId) ?? null;
  const selectedActivities = activities.filter((item) => activityIds.includes(item.id));
  const transport = transports.find((item) => item.id === transportId) ?? null;

  const quote = useMemo(() => {
    if (!accommodation || !transport) {
      return { accommodationTotal: 0, activitiesTotal: 0, transportTotal: 0, total: 0 };
    }
    return calculatePlannerQuote({
      nights,
      travelers,
      accommodation,
      activities: selectedActivities,
      transport,
    });
  }, [accommodation, nights, selectedActivities, transport, travelers]);

  const carbonSummary = useMemo(() => {
    if (!transport || distanceKm <= 0) return null;
    const factorKg =
      emissionFactors.find((item) => item.code === transport.code)?.kg_per_km ??
      transport.emission_kg_per_km;

    const selectedKg = tripEmissionsKg({
      code: transport.code,
      distanceKm,
      passengers: travelers,
      kgPerKm: factorKg,
    });

    const referenceKgPerKm =
      emissionFactors.find((item) => item.code === CARBON_REFERENCE_CODE)?.kg_per_km ??
      transports.find((item) => item.code === CARBON_REFERENCE_CODE)?.emission_kg_per_km ??
      factorKg;

    const referenceKg = tripEmissionsKg({
      code: CARBON_REFERENCE_CODE,
      distanceKm,
      passengers: travelers,
      kgPerKm: referenceKgPerKm,
    });

    return {
      selectedKg,
      distanceKm,
      passengers: travelers,
      transportLabel: pickLocalized(transport.name, locale),
      savingsPercent: savingsPercent(selectedKg, referenceKg),
    };
  }, [distanceKm, emissionFactors, locale, transport, travelers, transports]);

  const stepIndex = steps.indexOf(step);
  const stepLabels: Record<Step, string> = {
    destination: copy.plannerPage.stepDestination,
    accommodation: copy.plannerPage.stepAccommodation,
    activities: copy.plannerPage.stepActivities,
    transport: copy.plannerPage.stepTransport,
    details: copy.plannerPage.stepDetails,
    summary: copy.plannerPage.stepSummary,
  };

  const canNext =
    (step === "destination" && Boolean(destinationId)) ||
    (step === "accommodation" && Boolean(accommodationId)) ||
    step === "activities" ||
    (step === "transport" && Boolean(transportId)) ||
    (step === "details" && travelers > 0 && nights > 0 && Boolean(travelDate)) ||
    step === "summary";

  const goNext = () => {
    if (stepIndex < steps.length - 1) setStep(steps[stepIndex + 1]);
  };
  const goBack = () => {
    if (stepIndex > 0) setStep(steps[stepIndex - 1]);
  };

  const toggleActivity = (id: string) => {
    setActivityIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <>
      <PageHero
        eyebrow={copy.plannerPage.eyebrow}
        title={copy.plannerPage.title}
        description={copy.plannerPage.description}
      />
      <section className="bg-ivory px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.75rem] border border-forest/10 bg-white p-6 sm:p-8">
            <ol className="mb-8 flex flex-wrap gap-2">
              {steps.map((item, index) => (
                <li
                  key={item}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    index === stepIndex
                      ? "bg-pine text-ivory"
                      : index < stepIndex
                        ? "bg-sage text-forest"
                        : "bg-beige text-charcoal/60"
                  }`}
                >
                  {index + 1}. {stepLabels[item]}
                </li>
              ))}
            </ol>

            {step === "destination" ? (
              <div className="grid gap-3">
                <p className="text-sm font-medium text-forest">{copy.plannerPage.selectDestination}</p>
                {destinations.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDestinationId(item.id)}
                    className={`rounded-2xl border px-4 py-4 text-start transition ${
                      destinationId === item.id
                        ? "border-pine bg-sage/50"
                        : "border-forest/10 hover:border-pine/40"
                    }`}
                  >
                    <span className="font-display text-xl text-forest">
                      {pickLocalized(item.name, locale)}
                    </span>
                    <span className="mt-1 block text-sm text-charcoal/70">
                      {pickLocalized(item.location, locale)} · {item.wilaya}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}

            {step === "accommodation" ? (
              <div className="grid gap-3">
                <p className="text-sm font-medium text-forest">{copy.plannerPage.selectAccommodation}</p>
                {accommodations.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAccommodationId(item.id)}
                    className={`rounded-2xl border px-4 py-4 text-start transition ${
                      accommodationId === item.id
                        ? "border-pine bg-sage/50"
                        : "border-forest/10 hover:border-pine/40"
                    }`}
                  >
                    <span className="font-display text-xl text-forest">
                      {pickLocalized(item.name, locale)}
                    </span>
                    <span className="mt-1 block text-sm text-charcoal/70">
                      {pickLocalized(item.description, locale)}
                    </span>
                    <span className="mt-2 block text-sm font-medium text-pine">
                      {formatPrice(locale, item.price_per_night_dzd, "", t.trips.currency)} /{" "}
                      {copy.common.nights}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}

            {step === "activities" ? (
              <div className="grid gap-3">
                <p className="text-sm font-medium text-forest">{copy.plannerPage.selectActivities}</p>
                {activities.map((item) => {
                  const active = activityIds.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleActivity(item.id)}
                      className={`rounded-2xl border px-4 py-4 text-start transition ${
                        active ? "border-pine bg-sage/50" : "border-forest/10 hover:border-pine/40"
                      }`}
                    >
                      <span className="font-display text-xl text-forest">
                        {pickLocalized(item.name, locale)}
                      </span>
                      <span className="mt-1 block text-sm text-charcoal/70">
                        {pickLocalized(item.description, locale)}
                      </span>
                      <span className="mt-2 block text-sm font-medium text-pine">
                        {formatPrice(locale, item.price_dzd, "", t.trips.currency)}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : null}

            {step === "transport" ? (
              <div className="grid gap-3">
                <p className="text-sm font-medium text-forest">{copy.plannerPage.selectTransport}</p>
                {transports.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTransportId(item.id)}
                    className={`rounded-2xl border px-4 py-4 text-start transition ${
                      transportId === item.id
                        ? "border-pine bg-sage/50"
                        : "border-forest/10 hover:border-pine/40"
                    }`}
                  >
                    <span className="font-display text-xl text-forest">
                      {pickLocalized(item.name, locale)}
                    </span>
                    <span className="mt-1 block text-sm text-charcoal/70">
                      {pickLocalized(item.description, locale)}
                    </span>
                    <span className="mt-2 block text-sm font-medium text-pine">
                      {formatPrice(locale, item.price_dzd, "", t.trips.currency)}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}

            {step === "details" ? (
              <div className="grid gap-4 sm:grid-cols-2">
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
                <FormField label={copy.common.nights}>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={nights}
                    onChange={(event) => setNights(Number(event.target.value) || 1)}
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
                <FormField label={copy.plannerPage.travelDistance}>
                  <input
                    type="number"
                    min={1}
                    max={20000}
                    value={distanceKm}
                    onChange={(event) => setDistanceKm(Number(event.target.value) || 1)}
                    className={fieldClassName}
                  />
                </FormField>
              </div>
            ) : null}

            {step === "summary" ? (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-2xl text-forest">{copy.plannerPage.summaryTitle}</h2>
                  <ul className="mt-4 space-y-2 text-sm text-charcoal/75">
                    <li>
                      {copy.plannerPage.stepDestination}:{" "}
                      {destination ? pickLocalized(destination.name, locale) : "—"}
                    </li>
                    <li>
                      {copy.plannerPage.stepAccommodation}:{" "}
                      {accommodation ? pickLocalized(accommodation.name, locale) : "—"}
                    </li>
                    <li>
                      {copy.plannerPage.stepActivities}:{" "}
                      {selectedActivities.length
                        ? selectedActivities
                            .map((item) => pickLocalized(item.name, locale))
                            .join(", ")
                        : "—"}
                    </li>
                    <li>
                      {copy.plannerPage.stepTransport}:{" "}
                      {transport ? pickLocalized(transport.name, locale) : "—"}
                    </li>
                    <li>
                      {copy.common.travelers}: {travelers} · {copy.common.nights}: {nights} ·{" "}
                      {travelDate}
                    </li>
                    <li>
                      {copy.plannerPage.travelDistance}: {formatCount(locale, distanceKm)} km
                    </li>
                    {carbonSummary ? (
                      <li>
                        {copy.plannerPage.carbonEstimate}:{" "}
                        {formatCount(locale, carbonSummary.selectedKg)} {copy.carbonPage.unit}
                        {carbonSummary.savingsPercent > 0
                          ? ` (−${formatCount(locale, carbonSummary.savingsPercent)}%)`
                          : ""}
                      </li>
                    ) : null}
                  </ul>
                </div>
                {destination && accommodation && transport ? (
                  <BookingForm
                    estimatedTotalDzd={quote.total}
                    travelers={travelers}
                    nights={nights}
                    travelDate={travelDate}
                    destinationId={destination.id}
                    accommodationId={accommodation.id}
                    transportId={transport.id}
                    activityIds={activityIds}
                    accommodations={accommodations}
                    transports={transports}
                    carbonSummary={carbonSummary}
                    tripSummaryLines={[
                      `${copy.plannerPage.stepDestination}: ${pickLocalized(destination.name, locale)}`,
                      `${copy.plannerPage.stepAccommodation}: ${pickLocalized(accommodation.name, locale)}`,
                      `${copy.plannerPage.stepActivities}: ${
                        selectedActivities.length
                          ? selectedActivities
                              .map((item) => pickLocalized(item.name, locale))
                              .join(", ")
                          : "—"
                      }`,
                      `${copy.plannerPage.stepTransport}: ${pickLocalized(transport.name, locale)}`,
                      `${copy.common.travelers}: ${travelers} · ${copy.common.nights}: ${nights} · ${travelDate}`,
                      `${copy.plannerPage.travelDistance}: ${distanceKm} km`,
                    ]}
                    plannerPayload={{
                      destinationId: destination.id,
                      destinationSlug: destination.slug,
                      accommodationCode: accommodation.code,
                      activityCodes: selectedActivities.map((item) => item.code),
                      transportCode: transport.code,
                      travelers,
                      nights,
                      travelDate,
                      distanceKm,
                      quote,
                    }}
                  />
                ) : null}
              </div>
            ) : null}

            {step !== "summary" ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {stepIndex > 0 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-forest/15 px-6 text-sm font-medium text-forest"
                  >
                    {copy.common.back}
                  </button>
                ) : null}
                <button
                  type="button"
                  disabled={!canNext}
                  onClick={goNext}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-pine px-6 text-sm font-medium text-ivory disabled:opacity-50"
                >
                  {copy.common.next}
                </button>
              </div>
            ) : (
              <div className="mt-8">
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-forest/15 px-6 text-sm font-medium text-forest"
                >
                  {copy.common.back}
                </button>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-[1.75rem] border border-forest/10 bg-beige p-6 sm:p-8 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl text-forest">{copy.plannerPage.priceBreakdown}</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt>{copy.plannerPage.accommodationCost}</dt>
                <dd>{formatPrice(locale, quote.accommodationTotal, "", t.trips.currency)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>{copy.plannerPage.activitiesCost}</dt>
                <dd>{formatPrice(locale, quote.activitiesTotal, "", t.trips.currency)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>{copy.plannerPage.transportCost}</dt>
                <dd>{formatPrice(locale, quote.transportTotal, "", t.trips.currency)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-forest/10 pt-3 text-base font-medium text-forest">
                <dt>{copy.common.total}</dt>
                <dd>{formatPrice(locale, quote.total, "", t.trips.currency)}</dd>
              </div>
              {carbonSummary ? (
                <div className="border-t border-forest/10 pt-3 text-sm text-charcoal/80">
                  <p className="font-medium text-forest">{copy.plannerPage.carbonEstimate}</p>
                  <p className="mt-1">
                    {formatCount(locale, carbonSummary.selectedKg)} {copy.carbonPage.unit}
                  </p>
                </div>
              ) : null}
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
