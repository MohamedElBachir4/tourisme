import { numberLocale } from "@/i18n/config";
import type { Locale } from "@/types";

export function formatCount(locale: Locale, count: number) {
  return new Intl.NumberFormat(numberLocale[locale]).format(count);
}

export function formatDays(locale: Locale, template: string, count: number) {
  return template.replace("{count}", formatCount(locale, count));
}

export function formatPrice(
  locale: Locale,
  amount: number,
  from: string,
  currency: string,
) {
  const value = new Intl.NumberFormat(numberLocale[locale]).format(amount);
  return `${from} ${value} ${currency}`;
}
