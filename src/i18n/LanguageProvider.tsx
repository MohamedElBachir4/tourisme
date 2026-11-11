"use client";

import { createContext, useContext, useLayoutEffect, useMemo, useState } from "react";
import {
  defaultLocale,
  isLocale,
  localeDir,
  STORAGE_KEY,
} from "@/i18n/config";
import { translations } from "@/i18n/translations";
import type { Dictionary, Direction, Locale } from "@/types";

type LanguageContextValue = {
  locale: Locale;
  dir: Direction;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLocale(): Locale {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(value) ? value : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    setLocale(readStoredLocale());
    setReady(true);
  }, []);

  useLayoutEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.lang = locale;
    root.dir = localeDir(locale);
    root.dataset.localeReady = "true";
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale, ready]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      dir: localeDir(locale),
      t: translations[locale],
      setLocale,
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useI18n must be used within LanguageProvider");
  }
  return context;
}
