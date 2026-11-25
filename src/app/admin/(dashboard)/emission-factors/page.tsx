import { Suspense } from "react";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { EmissionFactorAdmin } from "@/components/admin/SimpleCatalogAdmin";
import { listEmissionFactorsAdmin } from "@/lib/admin-data";

type PageProps = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export default function AdminEmissionFactorsPage({ searchParams }: PageProps) {
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
  const { items, total, pageSize } = await listEmissionFactorsAdmin(query, page);

  return (
    <div className="space-y-6">
      <AdminPageTitle section="emissionFactors" />
      <AdminFilters
        action="/admin/emission-factors"
        query={query}
        page={page}
        total={total}
        pageSize={pageSize}
      />
      <EmissionFactorAdmin
        items={items.map((item) => ({
          ...item,
          kgPerKm: Number(item.kgPerKm),
        }))}
      />
    </div>
  );
}
