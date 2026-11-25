import { Suspense } from "react";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { TransportAdmin } from "@/components/admin/SimpleCatalogAdmin";
import { listTransportsAdmin } from "@/lib/admin-data";

type PageProps = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export default function AdminTransportPage({ searchParams }: PageProps) {
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
  const { items, total, pageSize } = await listTransportsAdmin(query, page);

  return (
    <div className="space-y-6">
      <AdminPageTitle section="transport" />
      <AdminFilters action="/admin/transport" query={query} page={page} total={total} pageSize={pageSize} />
      <TransportAdmin
        items={items.map((item) => ({
          ...item,
          priceDzd: Number(item.priceDzd),
          emissionKgPerKm: Number(item.emissionKgPerKm),
        }))}
      />
    </div>
  );
}
