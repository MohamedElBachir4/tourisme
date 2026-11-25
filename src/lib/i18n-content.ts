import type { Locale } from "@/types";

export type LocalizedString = Partial<Record<Locale, string>> & { en: string };

export function pickLocalized(
  value: LocalizedString | Record<string, string> | null | undefined,
  locale: Locale,
  fallback = "",
): string {
  if (!value) return fallback;
  return value[locale] || value.en || fallback;
}

export function pickLocalizedList(
  value: Array<LocalizedString | Record<string, string>> | null | undefined,
  locale: Locale,
): string[] {
  if (!value?.length) return [];
  return value.map((item) => pickLocalized(item, locale));
}
