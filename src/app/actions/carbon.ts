"use server";

import {
  CARBON_REFERENCE_CODE,
  pickPublicCarbonFactors,
  savingsPercent,
  tripEmissionsKg,
} from "@/lib/carbon";
import { getEmissionFactors } from "@/lib/data";
import { pickLocalized } from "@/lib/i18n-content";
import { carbonSchema } from "@/lib/validations";
import type { Locale } from "@/types";

export type CarbonComparison = {
  code: string;
  name: string;
  kg: number;
  savingsVsReferencePercent: number;
};

export type CarbonActionResult = {
  ok: boolean;
  message?: string;
  selectedKg?: number;
  comparisons?: CarbonComparison[];
  bestCode?: string;
  referenceCode?: string;
  referenceKg?: number;
  savingsVsReferencePercent?: number;
};

export async function calculateEmissions(
  raw: unknown,
  locale: Locale = "en",
): Promise<CarbonActionResult> {
  const parsed = carbonSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, message: "validation" };
  }

  const allFactors = await getEmissionFactors();
  const factors = pickPublicCarbonFactors(allFactors);
  if (!factors.length) {
    return { ok: false, message: "server" };
  }

  const selected = factors.find((item) => item.code === parsed.data.code);
  if (!selected) {
    return { ok: false, message: "validation" };
  }

  const referenceFactor =
    factors.find((item) => item.code === CARBON_REFERENCE_CODE) ??
    [...factors].sort(
      (a, b) =>
        tripEmissionsKg({
          code: b.code,
          distanceKm: parsed.data.distanceKm,
          passengers: parsed.data.passengers,
          kgPerKm: b.kg_per_km,
        }) -
        tripEmissionsKg({
          code: a.code,
          distanceKm: parsed.data.distanceKm,
          passengers: parsed.data.passengers,
          kgPerKm: a.kg_per_km,
        }),
    )[0];

  const referenceKg = tripEmissionsKg({
    code: referenceFactor.code,
    distanceKm: parsed.data.distanceKm,
    passengers: parsed.data.passengers,
    kgPerKm: referenceFactor.kg_per_km,
  });

  const comparisons = factors.map((factor) => {
    const kg = tripEmissionsKg({
      code: factor.code,
      distanceKm: parsed.data.distanceKm,
      passengers: parsed.data.passengers,
      kgPerKm: factor.kg_per_km,
    });

    return {
      code: factor.code,
      name: pickLocalized(factor.name, locale),
      kg,
      savingsVsReferencePercent: savingsPercent(kg, referenceKg),
    };
  });

  const best = [...comparisons].sort((a, b) => a.kg - b.kg)[0];
  const selectedRow = comparisons.find((item) => item.code === selected.code);

  return {
    ok: true,
    selectedKg: selectedRow?.kg ?? 0,
    comparisons,
    bestCode: best?.code,
    referenceCode: referenceFactor.code,
    referenceKg,
    savingsVsReferencePercent: selectedRow?.savingsVsReferencePercent ?? 0,
  };
}
