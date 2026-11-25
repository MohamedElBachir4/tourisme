"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import { pageCopy } from "@/i18n/pages";

type AdminFiltersProps = {
  action: string;
  query?: string;
  status?: string;
  statusOptions?: Array<{ value: string; label: string }>;
  page: number;
  total: number;
  pageSize: number;
};

export function AdminFilters({
  action,
  query = "",
  status,
  statusOptions,
  page,
  total,
  pageSize,
}: AdminFiltersProps) {
  const { locale } = useI18n();
  const common = pageCopy[locale].common;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const prev = Math.max(1, page - 1);
  const next = Math.min(totalPages, page + 1);
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (status && status !== "all") params.set("status", status);

  const hrefFor = (targetPage: number) => {
    const nextParams = new URLSearchParams(params);
    if (targetPage > 1) nextParams.set("page", String(targetPage));
    const qs = nextParams.toString();
    return qs ? `${action}?${qs}` : action;
  };

  return (
    <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-forest/10 bg-white/80 p-4 sm:flex-row sm:items-end sm:justify-between">
      <form className="flex flex-wrap items-end gap-3" method="get">
        <label className="min-w-[12rem] flex-1 text-sm">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-pine">
            {common.search}
          </span>
          <span className="relative block">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-forest/35" />
            <input
              name="q"
              defaultValue={query}
              className="w-full rounded-xl border border-forest/12 bg-beige/50 py-2.5 pe-3 ps-9 text-sm outline-none transition focus:border-pine focus:bg-white focus:ring-2 focus:ring-pine/20"
            />
          </span>
        </label>
        {statusOptions ? (
          <label className="text-sm">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-pine">
              {pageCopy[locale].admin.status}
            </span>
            <select
              name="status"
              defaultValue={status ?? "all"}
              className="rounded-xl border border-forest/12 bg-beige/50 px-3 py-2.5 text-sm outline-none transition focus:border-pine focus:bg-white focus:ring-2 focus:ring-pine/20"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <button
          type="submit"
          className="h-[42px] rounded-full bg-pine px-5 text-sm font-medium text-ivory transition hover:bg-forest"
        >
          {common.search}
        </button>
      </form>
      <div className="flex items-center gap-2 text-sm text-charcoal/70">
        <span className="me-1">
          {page}/{totalPages}
          <span className="text-forest/30"> · </span>
          {total}
        </span>
        <Link
          className="inline-flex size-9 items-center justify-center rounded-full border border-forest/12 bg-white transition hover:border-pine/40 hover:bg-sage/40"
          href={hrefFor(prev)}
          aria-label="Previous"
        >
          <ChevronLeft className="size-4 rtl:rotate-180" />
        </Link>
        <Link
          className="inline-flex size-9 items-center justify-center rounded-full border border-forest/12 bg-white transition hover:border-pine/40 hover:bg-sage/40"
          href={hrefFor(next)}
          aria-label="Next"
        >
          <ChevronRight className="size-4 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
}
