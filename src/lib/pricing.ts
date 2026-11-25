import type { Accommodation, Activity, TransportOption } from "@/types/database";

export type PlannerQuoteInput = {
  nights: number;
  travelers: number;
  accommodation: Accommodation;
  activities: Activity[];
  transport: TransportOption;
};

export type PlannerQuote = {
  accommodationTotal: number;
  activitiesTotal: number;
  transportTotal: number;
  total: number;
};

export function calculatePlannerQuote(input: PlannerQuoteInput): PlannerQuote {
  const accommodationTotal =
    Number(input.accommodation.price_per_night_dzd) * input.nights * input.travelers;
  const activitiesTotal =
    input.activities.reduce((sum, activity) => sum + Number(activity.price_dzd), 0) *
    input.travelers;
  const transportTotal = Number(input.transport.price_dzd) * input.travelers;

  return {
    accommodationTotal,
    activitiesTotal,
    transportTotal,
    total: accommodationTotal + activitiesTotal + transportTotal,
  };
}

export function calculateCarbonKg(params: {
  km: number;
  travelers: number;
  emissionKgPerKm: number;
}) {
  return params.km * params.emissionKgPerKm * params.travelers;
}

export function createBookingReference() {
  const stamp = Date.now().toString(36).toUpperCase();
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ST-${stamp}-${suffix}`;
}
