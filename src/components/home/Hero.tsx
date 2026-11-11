"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/i18n/LanguageProvider";

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" className="relative flex min-h-svh items-end overflow-hidden bg-charcoal">
      <Image
        src="/images/dunes.jpg"
        alt={t.hero.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "center 58%" }}
      />
      <div className="absolute inset-0 bg-charcoal/25" />
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-charcoal/90 via-charcoal/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/25 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-32 sm:px-8 lg:pb-32">
        <div className="hero-rise max-w-4xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-sand">
            <span className="h-px w-8 bg-sand" aria-hidden />
            {t.hero.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(2.8rem,7vw,6.1rem)] font-medium leading-[1.02] tracking-tight text-ivory">
            <span className="block">{t.hero.titleLead}</span>
            <span className="mt-1 block font-normal text-sand">{t.hero.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/88 sm:text-lg">
            {t.hero.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/#destinations" variant="light">
              {t.hero.primaryCta}
              <ArrowRight className="size-4 rtl:-scale-x-100" />
            </Button>
            <Button href="/#plan" variant="ghost">
              {t.hero.secondaryCta}
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#introduction"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-ivory/80"
      >
        <span>{t.hero.scroll}</span>
        <span className="relative h-10 w-6 rounded-full border border-ivory/50" aria-hidden>
          <span className="scroll-cue absolute inset-x-0 top-2 mx-auto size-1.5 rounded-full bg-ivory" />
        </span>
      </a>
    </section>
  );
}
