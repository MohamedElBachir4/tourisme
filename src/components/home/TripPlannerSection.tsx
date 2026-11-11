"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/LanguageProvider";

export function TripPlannerSection() {
  const { t } = useI18n();

  return (
    <section id="plan" className="scroll-mt-20 bg-sand">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[22rem] lg:min-h-[40rem]">
          <Image
            src="/images/planner.jpg"
            alt={t.planner.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex items-center px-5 py-16 sm:px-10 lg:px-16 lg:py-24">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-pine">
              <span className="h-px w-8 bg-pine" aria-hidden />
              {t.planner.eyebrow}
            </p>
            <h2 className="font-display text-4xl font-medium tracking-tight text-forest sm:text-5xl">
              {t.planner.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal/75 sm:text-lg">
              {t.planner.description}
            </p>
            <ol className="mt-8 space-y-4">
              {t.planner.steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="font-display text-lg text-pine" aria-hidden>
                    0{index + 1}
                  </span>
                  <span>
                    <span className="block font-medium text-forest">{step.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-charcoal/70">
                      {step.description}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <Button href="/plan">
                {t.planner.cta}
                <ArrowRight className="size-4 rtl:-scale-x-100" />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
