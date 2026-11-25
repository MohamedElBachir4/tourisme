"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import {
  calculateEmissions,
  type CarbonComparison,
} from "@/app/actions/carbon";
import { FormField, fieldClassName } from "@/components/forms/FormField";
import { PageHero } from "@/components/pages/PageHero";
import { formatCount } from "@/i18n/format";
import { useI18n } from "@/i18n/LanguageProvider";
import { pageCopy } from "@/i18n/pages";
import {
  CARBON_STORAGE_KEY,
  pickPublicCarbonFactors,
  type StoredCarbonEstimate,
} from "@/lib/carbon";
import { pickLocalized } from "@/lib/i18n-content";
import type { EmissionFactorView } from "@/types/database";

type CarbonCalculatorProps = {
  factors: EmissionFactorView[];
};

export function CarbonCalculator({ factors }: CarbonCalculatorProps) {
  const { locale } = useI18n();
  const copy = pageCopy[locale];
  const publicFactors = useMemo(() => pickPublicCarbonFactors(factors), [factors]);
  const [code, setCode] = useState(publicFactors[0]?.code ?? "");
  const [distanceKm, setDistanceKm] = useState(450);
  const [passengers, setPassengers] = useState(2);
  const [pending, startTransition] = useTransition();
  const [selectedKg, setSelectedKg] = useState<number | null>(null);
  const [comparisons, setComparisons] = useState<CarbonComparison[]>([]);
  const [bestCode, setBestCode] = useState<string | null>(null);
  const [savings, setSavings] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const maxKg = useMemo(
    () => Math.max(...comparisons.map((item) => item.kg), 1),
    [comparisons],
  );

  const runCalculate = () => {
    if (!code) return;
    setError(null);
    startTransition(async () => {
      const result = await calculateEmissions({ code, distanceKm, passengers }, locale);
      if (!result.ok) {
        setError(copy.common.error);
        return;
      }
      setSelectedKg(result.selectedKg ?? null);
      setComparisons(result.comparisons ?? []);
      setBestCode(result.bestCode ?? null);
      setSavings(result.savingsVsReferencePercent ?? null);

      const payload: StoredCarbonEstimate = {
        code,
        distanceKm,
        passengers,
        selectedKg: result.selectedKg ?? 0,
        referenceCode: result.referenceCode ?? "gasoline-car",
        referenceKg: result.referenceKg ?? 0,
        savingsPercent: result.savingsVsReferencePercent ?? 0,
        updatedAt: new Date().toISOString(),
      };
      try {
        window.sessionStorage.setItem(CARBON_STORAGE_KEY, JSON.stringify(payload));
      } catch {
        // ignore storage failures
      }
    });
  };

  useEffect(() => {
    if (!publicFactors.some((factor) => factor.code === code) && publicFactors[0]) {
      setCode(publicFactors[0].code);
    }
  }, [code, publicFactors]);

  return (
    <>
      <PageHero
        eyebrow={copy.carbonPage.eyebrow}
        title={copy.carbonPage.title}
        description={copy.carbonPage.description}
      />
      <section className="bg-ivory px-5 py-16 sm:px-8">
        <div className="mx-auto mb-8 max-w-7xl">
          <p className="rounded-2xl border border-pine/20 bg-sage/40 px-4 py-3 text-sm text-forest">
            {copy.carbonPage.noLoginNeeded}
          </p>
        </div>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-forest/10 bg-white p-6 sm:p-8">
            <div className="grid gap-4">
              <FormField label={copy.carbonPage.transport}>
                <select
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  className={fieldClassName}
                >
                  {publicFactors.map((factor) => (
                    <option key={factor.id} value={factor.code}>
                      {pickLocalized(factor.name, locale)}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField label={copy.carbonPage.distance}>
                <input
                  type="number"
                  min={1}
                  max={20000}
                  value={distanceKm}
                  onChange={(event) => setDistanceKm(Number(event.target.value) || 1)}
                  className={fieldClassName}
                />
              </FormField>
              <FormField label={copy.carbonPage.travelers}>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={passengers}
                  onChange={(event) => setPassengers(Number(event.target.value) || 1)}
                  className={fieldClassName}
                />
              </FormField>
            </div>
            {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
            <button
              type="button"
              onClick={runCalculate}
              disabled={pending || !code}
              className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-pine px-6 text-sm font-medium text-ivory disabled:opacity-50"
            >
              {pending ? copy.common.loading : copy.carbonPage.calculate}
            </button>
            <p className="mt-5 text-sm leading-relaxed text-charcoal/70">{copy.carbonPage.education}</p>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{copy.carbonPage.estimateNote}</p>
          </div>

          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-forest/10 bg-beige p-6 sm:p-8">
              <h2 className="font-display text-2xl text-forest">{copy.carbonPage.result}</h2>
              {selectedKg == null ? (
                <p className="mt-4 text-sm text-charcoal/70">{copy.carbonPage.education}</p>
              ) : (
                <>
                  <p className="mt-4 font-display text-4xl text-pine">
                    {formatCount(locale, selectedKg)}{" "}
                    <span className="text-lg text-forest">{copy.carbonPage.unit}</span>
                  </p>
                  {savings != null ? (
                    <p className="mt-4 text-sm text-forest">
                      <span className="font-medium">{copy.carbonPage.savingsLabel}: </span>
                      {formatCount(locale, savings)}%
                      <span className="mt-1 block text-charcoal/65">{copy.carbonPage.savingsVs}</span>
                    </p>
                  ) : null}
                </>
              )}
            </div>

            {comparisons.length > 0 ? (
              <div className="rounded-[1.75rem] border border-forest/10 bg-white p-6 sm:p-8">
                <h2 className="font-display text-2xl text-forest">{copy.carbonPage.comparison}</h2>
                {bestCode ? (
                  <p className="mt-2 text-sm text-pine">
                    {copy.carbonPage.bestOption}:{" "}
                    {comparisons.find((item) => item.code === bestCode)?.name}
                  </p>
                ) : null}
                <ul className="mt-6 space-y-4">
                  {comparisons
                    .slice()
                    .sort((a, b) => a.kg - b.kg)
                    .map((item) => (
                      <li key={item.code}>
                        <div className="mb-1 flex flex-wrap justify-between gap-3 text-sm">
                          <span className="text-forest">{item.name}</span>
                          <span className="text-charcoal/70">
                            {formatCount(locale, item.kg)} {copy.carbonPage.unit}
                            {item.savingsVsReferencePercent > 0 ? (
                              <span className="ms-2 text-pine">
                                (−{formatCount(locale, item.savingsVsReferencePercent)}%)
                              </span>
                            ) : null}
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-sage">
                          <div
                            className={`h-full rounded-full ${
                              item.code === bestCode ? "bg-pine" : "bg-forest/40"
                            }`}
                            style={{ width: `${Math.max((item.kg / maxKg) * 100, 4)}%` }}
                          />
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-[1.75rem] border border-forest/10 bg-white p-6 sm:p-8">
              <h2 className="font-display text-2xl text-forest">{copy.carbonPage.tipsTitle}</h2>
              <ul className="mt-4 list-disc space-y-2 ps-5 text-sm text-charcoal/75">
                {copy.carbonPage.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
