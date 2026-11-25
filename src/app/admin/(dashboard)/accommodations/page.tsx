import { Suspense } from "react";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { AccommodationAdmin } from "@/components/admin/SimpleCatalogAdmin";
import { listAccommodationsAdmin, listDestinationOptions } from "@/lib/admin-data";

type PageProps = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export default function AdminAccommodationsPage({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<p className="text-sm text-charcoal/70">Loading…</p>}>
      <Content searchParams={searchParams} />
    </Suspense>
  );
}

async function Content({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page || 1));
  const query = params.q || "";
  const [{ items, total, pageSize }, destinations] = await Promise.all([
    listAccommodationsAdmin(query, page),
    listDestinationOptions(),
  ]);

  return (
    <div className="space-y-6">
      <AdminPageTitle section="accommodations" />
      <AdminFilters
        action="/admin/accommodations"
        query={query}
        page={page}
        total={total}
        pageSize={pageSize}
      />
      <AccommodationAdmin
        items={items.map((item) => ({
          ...item,
          pricePerNightDzd: Number(item.pricePerNightDzd),
        }))}
        destinations={destinations}
      />
    </div>
  );
}
