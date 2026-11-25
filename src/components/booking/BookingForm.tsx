"use client";

import { useState, useTransition } from "react";
import { createBooking } from "@/app/actions/booking";
import { FormField, fieldClassName } from "@/components/forms/FormField";
import { formatCount, formatPrice } from "@/i18n/format";
import { useI18n } from "@/i18n/LanguageProvider";
import { pageCopy } from "@/i18n/pages";
import { pickLocalized } from "@/lib/i18n-content";
import type { Accommodation, TransportOption } from "@/types/database";

export type BookingCarbonSummary = {
  selectedKg: number;
  distanceKm: number;
  passengers: number;
  transportLabel: string;
  savingsPercent?: number;
};

type BookingFormProps = {
  estimatedTotalDzd: number;
  travelers: number;
  nights: number;
  travelDate: string;
  destinationId?: string | null;
  tripId?: string | null;
  accommodationId?: string | null;
  transportId?: string | null;
  activityIds?: string[];
  plannerPayload?: Record<string, unknown>;
  accommodations: Accommodation[];
  transports: TransportOption[];
  tripSummaryLines?: string[];
  carbonSummary?: BookingCarbonSummary | null;
};

export function BookingForm({
  estimatedTotalDzd,
  travelers,
  nights,
  travelDate,
  destinationId,
  tripId,
  accommodationId,
  transportId,
  activityIds = [],
  plannerPayload = {},
  accommodations,
  transports,
  tripSummaryLines = [],
  carbonSummary = null,
}: BookingFormProps) {
  const { locale, t } = useI18n();
  const copy = pageCopy[locale];
  const [pending, startTransition] = useTransition();
  const [reference, setReference] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError(null);

    startTransition(async () => {
      const result = await createBooking({
        customerName: String(form.get("customerName") || ""),
        customerPhone: String(form.get("customerPhone") || ""),
        customerEmail: String(form.get("customerEmail") || ""),
        notes: String(form.get("notes") || ""),
        destinationId: destinationId || null,
        tripId: tripId || null,
        accommodationId: accommodationId || null,
        transportId: transportId || null,
        activityIds,
        travelers,
        nights,
        travelDate,
        estimatedTotalDzd,
        plannerPayload: {
          ...plannerPayload,
          carbon: carbonSummary
            ? {
                selectedKg: carbonSummary.selectedKg,
                distanceKm: carbonSummary.distanceKm,
                passengers: carbonSummary.passengers,
                transportLabel: carbonSummary.transportLabel,
                savingsPercent: carbonSummary.savingsPercent ?? null,
              }
            : null,
        },
        survey: {
          preferredTransport: String(form.get("preferredTransport") || ""),
          preferredAccommodation: String(form.get("preferredAccommodation") || ""),
          interestEcoActivities: form.get("interestEcoActivities") === "yes",
          environmentalAwareness: Number(form.get("environmentalAwareness") || 3),
        },
      });

      if (!result.ok) {
        setError(copy.common.error);
        return;
      }
      setReference(result.reference ?? null);
    });
  };

  if (reference) {
    return (
      <div className="rounded-[1.75rem] border border-pine/20 bg-sage/40 p-8">
        <h3 className="font-display text-2xl text-forest">{copy.bookingPage.confirmationTitle}</h3>
        <p className="mt-3 text-charcoal/75">{copy.bookingPage.confirmationBody}</p>
        <p className="mt-5 text-sm font-medium text-pine">
          {copy.bookingPage.reference}: <span dir="ltr">{reference}</span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-[1.75rem] border border-forest/10 bg-white p-6 sm:p-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-pine">
          {copy.bookingPage.eyebrow}
        </p>
        <h3 className="mt-2 font-display text-2xl text-forest">{copy.bookingPage.title}</h3>
        <p className="mt-2 text-sm text-charcoal/70">{copy.bookingPage.description}</p>
      </div>

      {tripSummaryLines.length > 0 ? (
        <div className="rounded-2xl border border-forest/10 bg-beige/60 p-4">
          <h4 className="font-display text-lg text-forest">{copy.bookingPage.tripSummary}</h4>
          <ul className="mt-3 space-y-1.5 text-sm text-charcoal/75">
            {tripSummaryLines.map((line) => (
              <li key={line}>• {line}</li>
            ))}
            <li>
              • {copy.common.total}:{" "}
              {formatPrice(locale, estimatedTotalDzd, "", t.trips.currency)}
            </li>
          </ul>
        </div>
      ) : null}

      {carbonSummary ? (
        <div className="rounded-2xl border border-pine/20 bg-sage/30 p-4">
          <h4 className="font-display text-lg text-forest">{copy.bookingPage.carbonResult}</h4>
          <p className="mt-2 text-sm text-charcoal/80">
            {carbonSummary.transportLabel} · {formatCount(locale, carbonSummary.distanceKm)} km ·{" "}
            {formatCount(locale, carbonSummary.passengers)} {copy.common.travelers}
          </p>
          <p className="mt-2 font-display text-2xl text-pine">
            {formatCount(locale, carbonSummary.selectedKg)} {copy.carbonPage.unit}
          </p>
          {carbonSummary.savingsPercent != null && carbonSummary.savingsPercent > 0 ? (
            <p className="mt-1 text-sm text-forest">
              {copy.carbonPage.savingsLabel}: {formatCount(locale, carbonSummary.savingsPercent)}%
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label={copy.bookingPage.fullName}>
          <input name="customerName" required className={fieldClassName} />
        </FormField>
        <FormField label={copy.bookingPage.phone}>
          <input name="customerPhone" required className={fieldClassName} dir="ltr" />
        </FormField>
        <FormField label={copy.bookingPage.email} className="sm:col-span-2">
          <input name="customerEmail" type="email" required className={fieldClassName} dir="ltr" />
        </FormField>
        <FormField label={copy.bookingPage.notes} className="sm:col-span-2">
          <textarea name="notes" rows={3} className={fieldClassName} />
        </FormField>
      </div>

      <div className="border-t border-forest/10 pt-5">
        <h4 className="font-display text-xl text-forest">{copy.bookingPage.surveyTitle}</h4>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <FormField label={copy.bookingPage.preferredTransport}>
            <select name="preferredTransport" required className={fieldClassName} defaultValue="">
              <option value="" disabled>
                —
              </option>
              {transports.map((item) => (
                <option key={item.id} value={item.code}>
                  {pickLocalized(item.name, locale)}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label={copy.bookingPage.preferredAccommodation}>
            <select name="preferredAccommodation" required className={fieldClassName} defaultValue="">
              <option value="" disabled>
                —
              </option>
              {accommodations.map((item) => (
                <option key={item.id} value={item.code}>
                  {pickLocalized(item.name, locale)}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label={copy.bookingPage.interestEco}>
            <select name="interestEcoActivities" className={fieldClassName} defaultValue="yes">
              <option value="yes">{copy.bookingPage.yes}</option>
              <option value="no">{copy.bookingPage.no}</option>
            </select>
          </FormField>
          <FormField label={copy.bookingPage.awareness}>
            <select name="environmentalAwareness" className={fieldClassName} defaultValue="3">
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      </div>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={pending || !travelDate}
        className="inline-flex h-12 items-center justify-center rounded-full bg-pine px-6 text-sm font-medium text-ivory transition-colors hover:bg-forest disabled:opacity-60"
      >
        {pending ? copy.common.sending : copy.plannerPage.confirmBooking}
      </button>
    </form>
  );
}
