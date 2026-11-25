import { Suspense } from "react";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { ActivityAdmin } from "@/components/admin/SimpleCatalogAdmin";
import { listActivitiesAdmin } from "@/lib/admin-data";

type PageProps = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export default function AdminActivitiesPage({ searchParams }: PageProps) {
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
  const { items, total, pageSize } = await listActivitiesAdmin(query, page);

  return (
    <div className="space-y-6">
      <AdminPageTitle section="activities" />
      <AdminFilters action="/admin/activities" query={query} page={page} total={total} pageSize={pageSize} />
      <ActivityAdmin
        items={items.map((item) => ({
          ...item,
          priceDzd: Number(item.priceDzd),
        }))}
      />
    </div>
  );
}
