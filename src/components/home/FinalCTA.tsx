"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/i18n/LanguageProvider";

export function FinalCTA() {
  const { t } = useI18n();

  return (
    <section className="relative flex min-h-[78vh] items-end overflow-hidden bg-charcoal">
      <Image
        src="/images/hero.jpg"
        alt={t.finalCta.alt}
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "center 40%" }}
      />
      <div className="absolute inset-0 bg-charcoal/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/35 to-charcoal/25" />
      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 py-24 text-center sm:px-8 lg:py-32">
        <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.8rem)] font-medium leading-[1.08] tracking-tight text-ivory">
          <span className="block">{t.finalCta.titleLead}</span>
          <span className="mt-2 block text-sand">{t.finalCta.titleAccent}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ivory/85 sm:text-lg">
          {t.finalCta.description}
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/#destinations" variant="light">
            {t.finalCta.cta}
            <ArrowRight className="size-4 rtl:-scale-x-100" />
          </Button>
        </div>
      </div>
    </section>
  );
}
