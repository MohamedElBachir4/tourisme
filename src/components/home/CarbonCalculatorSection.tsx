"use client";

import { ArrowRight, Bus, Car, Plane, TrainFront } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useI18n } from "@/i18n/LanguageProvider";

const icons = [Bus, TrainFront, Car, Plane];
const marks = ["32%", "40%", "62%", "88%"];

export function CarbonCalculatorSection() {
  const { t } = useI18n();

  return (
    <section id="carbon" className="scroll-mt-20 bg-forest px-5 py-24 text-ivory sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            id="carbon-heading"
            eyebrow={t.carbon.eyebrow}
            title={t.carbon.title}
            description={t.carbon.description}
            tone="light"
          />
          <div className="mt-8">
            <Button href="/carbon" variant="light">
              {t.carbon.cta}
              <ArrowRight className="size-4 rtl:-scale-x-100" />
            </Button>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-[1.75rem] border border-ivory/10 bg-charcoal/25 p-5 sm:p-7">
            <ul className="space-y-4">
              {t.carbon.modes.map((mode, index) => {
                const Icon = icons[index] ?? Bus;
                return (
                  <li key={mode.title} className="rounded-2xl bg-ivory/5 px-4 py-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <span>
                        <span className="block font-medium text-ivory">{mode.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-ivory/70">
                          {mode.description}
                        </span>
                      </span>
                    </div>
                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-ivory/10" aria-hidden>
                      <div className="h-full rounded-full bg-sage/80" style={{ width: marks[index] }} />
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-sage/90">{t.carbon.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
