"use client";

import { useI18n } from "@/i18n/LanguageProvider";
import { pageCopy } from "@/i18n/pages";

export function AdminPageTitle({
  section,
}: {
  section:
    | "destinations"
    | "trips"
    | "accommodations"
    | "activities"
    | "transport"
    | "emissionFactors"
    | "bookings"
    | "messages"
    | "overview";
}) {
  const { locale } = useI18n();
  const copy = pageCopy[locale].admin;

  return (
    <div className="border-b border-forest/8 pb-5">
      <h2 className="font-display text-3xl tracking-tight text-forest">{copy[section]}</h2>
    </div>
  );
}
