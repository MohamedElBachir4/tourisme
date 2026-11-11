import type { Direction, Locale } from "@/types";

export const locales = ["en", "fr", "ar"] as const;

export const defaultLocale: Locale = "en";

export const STORAGE_KEY = "azul-locale";

export function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "fr" || value === "ar";
}

export function localeDir(locale: Locale): Direction {
  return locale === "ar" ? "rtl" : "ltr";
}

export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  fr: "fr",
  ar: "ar",
};

export const numberLocale: Record<Locale, string> = {
  en: "en",
  fr: "fr",
  ar: "ar",
};

/** Runs before paint so Arabic layout direction is correct on the first frame. */
export const LOCALE_BOOT = `(function(){var d=document.documentElement;d.classList.add("js");var onScroll=function(){d.classList.toggle("is-scrolled",location.pathname!=="/"||window.scrollY>24);};onScroll();window.addEventListener("scroll",onScroll,{passive:true});try{var l=localStorage.getItem("${STORAGE_KEY}");if(l==="ar"||l==="fr"){d.setAttribute("data-pending-locale",l);d.lang=l;d.dir=l==="ar"?"rtl":"ltr";}}catch(e){}})();`;
