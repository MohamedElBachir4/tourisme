"use client";

import { PageHero } from "@/components/pages/PageHero";
import { useI18n } from "@/i18n/LanguageProvider";
import { pageCopy } from "@/i18n/pages";

export function DestinationsPageShell({ children }: { children: React.ReactNode }) {
  const { locale } = useI18n();
  const copy = pageCopy[locale].destinationsPage;

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <section className="bg-ivory">{children}</section>
    </>
  );
}
