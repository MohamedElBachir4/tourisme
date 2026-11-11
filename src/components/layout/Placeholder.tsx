"use client";

import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/i18n/LanguageProvider";

export function Placeholder() {
  return (
    <Suspense fallback={<PlaceholderContent />}>
      <PlaceholderWithPathname />
    </Suspense>
  );
}

function PlaceholderWithPathname() {
  const pathname = usePathname();
  return <PlaceholderContent pathname={pathname} />;
}

type PlaceholderContentProps = {
  pathname?: string;
};

function PlaceholderContent({ pathname }: PlaceholderContentProps) {
  const { t } = useI18n();

  return (
    <section className="bg-ivory px-5 pb-24 pt-36 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <p className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-pine">
          <span className="h-px w-8 bg-pine" aria-hidden />
          {t.placeholder.eyebrow}
        </p>
        <h1 className="font-display text-4xl font-medium tracking-tight text-forest sm:text-5xl">
          {t.placeholder.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-charcoal/75">
          {t.placeholder.description}
        </p>
        {pathname ? (
          <p
            dir="ltr"
            className="mt-6 inline-flex rounded-full bg-sage px-3 py-1 font-mono text-xs text-forest"
          >
            {pathname}
          </p>
        ) : (
          <p
            aria-hidden
            className="mt-6 inline-flex h-6 min-w-24 rounded-full bg-sage px-3 py-1"
          />
        )}
        <div className="mt-8">
          <Button href="/#top">
            {t.placeholder.back}
            <ArrowRight className="size-4 rtl:-scale-x-100" />
          </Button>
        </div>
      </div>
    </section>
  );
}
