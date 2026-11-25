import { calculateCarbonKg } from "@/lib/pricing";
import type { EmissionFactorView } from "@/types/database";

/** Modes highlighted on the public carbon calculator. */
export const PUBLIC_CARBON_CODES = [
  "shared-bus",
  "gasoline-car",
  "electric-car",
] as const;

/** Baseline used for “savings vs reference” percentage. */
export const CARBON_REFERENCE_CODE = "gasoline-car";

export function isCarEmissionCode(code: string) {
  return code.includes("car");
}

export function pickPublicCarbonFactors(factors: EmissionFactorView[]) {
  const preferred = PUBLIC_CARBON_CODES.map((code) =>
    factors.find((factor) => factor.code === code),
  ).filter(Boolean) as EmissionFactorView[];

  return preferred.length >= 2 ? preferred : factors;
}

export function tripEmissionsKg(params: {
  code: string;
  distanceKm: number;
  passengers: number;
  kgPerKm: number;
}) {
  // Cars: factor is per vehicle-km → one shared car for the party.
  // Bus/train/flight: factor is per passenger-km → scale by travelers.
  const kg = isCarEmissionCode(params.code)
    ? calculateCarbonKg({
        km: params.distanceKm,
        travelers: 1,
        emissionKgPerKm: params.kgPerKm,
      })
    : calculateCarbonKg({
        km: params.distanceKm,
        travelers: params.passengers,
        emissionKgPerKm: params.kgPerKm,
      });

  return Number(kg.toFixed(2));
}

export function savingsPercent(selectedKg: number, referenceKg: number) {
  if (referenceKg <= 0) return 0;
  const value = ((referenceKg - selectedKg) / referenceKg) * 100;
  return Number(value.toFixed(1));
}

export const CARBON_STORAGE_KEY = "sirius-trail-carbon-estimate";

export type StoredCarbonEstimate = {
  code: string;
  distanceKm: number;
  passengers: number;
  selectedKg: number;
  referenceCode: string;
  referenceKg: number;
  savingsPercent: number;
  updatedAt: string;
};
