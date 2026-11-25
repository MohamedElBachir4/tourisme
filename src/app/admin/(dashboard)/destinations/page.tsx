import { Suspense } from "react";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { DestinationAdmin } from "@/components/admin/DestinationAdmin";
import { listDestinationsAdmin } from "@/lib/admin-data";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";

type PageProps = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export default function AdminDestinationsPage({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<p className="text-sm text-charcoal/70">Loading…</p>}>
      <AdminDestinationsContent searchParams={searchParams} />
    </Suspense>
  );
}

async function AdminDestinationsContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page || 1));
  const query = params.q || "";
  const { items, total, pageSize } = await listDestinationsAdmin(query, page);

  return (
    <div className="space-y-6">
      <AdminPageTitle section="destinations" />
      <AdminFilters action="/admin/destinations" query={query} page={page} total={total} pageSize={pageSize} />
      <DestinationAdmin items={items} />
    </div>
  );
}
