"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { pickLocalized } from "@/lib/i18n-content";
import { useI18n } from "@/i18n/LanguageProvider";
import { pageCopy } from "@/i18n/pages";
import type { Destination } from "@/types/database";

export function DestinationsBrowser({ destinations }: { destinations: Destination[] }) {
  const { locale } = useI18n();
  const copy = pageCopy[locale];
  const [query, setQuery] = useState("");
  const [wilaya, setWilaya] = useState("all");

  const wilayas = useMemo(
    () => Array.from(new Set(destinations.map((item) => item.wilaya))).sort(),
    [destinations],
  );

  const filtered = destinations.filter((item) => {
    const name = pickLocalized(item.name, locale).toLowerCase();
    const description = pickLocalized(item.description, locale).toLowerCase();
    const matchesQuery =
      !query ||
      name.includes(query.toLowerCase()) ||
      description.includes(query.toLowerCase()) ||
      item.wilaya.toLowerCase().includes(query.toLowerCase());
    const matchesWilaya = wilaya === "all" || item.wilaya === wilaya;
    return matchesQuery && matchesWilaya;
  });

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <label className="flex-1 text-sm text-charcoal/80">
          <span className="mb-2 block font-medium">{copy.common.search}</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-full border border-forest/15 bg-white px-4 py-3 outline-none ring-pine focus:ring-2"
          />
        </label>
        <label className="md:w-64 text-sm text-charcoal/80">
          <span className="mb-2 block font-medium">{copy.common.filterWilaya}</span>
          <select
            value={wilaya}
            onChange={(event) => setWilaya(event.target.value)}
            className="w-full rounded-full border border-forest/15 bg-white px-4 py-3 outline-none ring-pine focus:ring-2"
          >
            <option value="all">{copy.common.allWilayas}</option>
            {wilayas.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-charcoal/70">{copy.common.noResults}</p>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((destination) => (
            <Link
              key={destination.id}
              href={`/destinations/${destination.slug}`}
              className="group overflow-hidden rounded-[1.75rem] border border-forest/10 bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={destination.cover_image}
                  alt={pickLocalized(destination.name, locale)}
                  fill
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-pine">
                  {destination.wilaya}
                </p>
                <h2 className="mt-2 font-display text-2xl text-forest">
                  {pickLocalized(destination.name, locale)}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/75">
                  {pickLocalized(destination.description, locale)}
                </p>
                <p className="mt-5 text-sm font-medium text-pine">{copy.common.viewDetails}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
