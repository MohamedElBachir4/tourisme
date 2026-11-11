"use client";

import { locales } from "@/i18n/config";
import { useI18n } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/cn";
import type { Locale } from "@/types";

const labels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  ar: "AR",
};

const buttonLang: Record<Locale, string> = {
  en: "en",
  fr: "fr",
  ar: "ar",
};

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={cn(
        "inline-flex flex-row items-center rounded-full border border-current/20 p-1 rtl:flex-row-reverse",
        className,
      )}
    >
      {locales.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            lang={buttonLang[code]}
            aria-pressed={active}
            onClick={() => setLocale(code)}
            className={cn(
              "h-8 min-w-9 rounded-full px-2.5 text-xs font-semibold tracking-wide transition-colors",
              active ? "bg-forest text-ivory" : "text-current hover:opacity-70",
            )}
          >
            {labels[code]}
          </button>
        );
      })}
    </div>
  );
}
