import { Suspense } from "react";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { TripAdmin } from "@/components/admin/TripAdmin";
import { listDestinationOptions, listTripsAdmin } from "@/lib/admin-data";

type PageProps = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export default function AdminTripsPage({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<p className="text-sm text-charcoal/70">Loading…</p>}>
      <AdminTripsContent searchParams={searchParams} />
    </Suspense>
  );
}

async function AdminTripsContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page || 1));
  const query = params.q || "";
  const [{ items, total, pageSize }, destinations] = await Promise.all([
    listTripsAdmin(query, page),
    listDestinationOptions(),
  ]);

  return (
    <div className="space-y-6">
      <AdminPageTitle section="trips" />
      <AdminFilters action="/admin/trips" query={query} page={page} total={total} pageSize={pageSize} />
      <TripAdmin
        items={items.map((item) => ({
          ...item,
          basePriceDzd: Number(item.basePriceDzd),
        }))}
        destinations={destinations}
      />
    </div>
  );
}
