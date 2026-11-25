import { Suspense } from "react";
import { updateMessageStatus } from "@/app/actions/admin";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { listMessagesAdmin } from "@/lib/admin-data";
import type { MessageStatus } from "@prisma/client";

type PageProps = {
  searchParams: Promise<{ q?: string; page?: string; status?: string }>;
};

const statuses: MessageStatus[] = ["new", "read", "archived"];

export default function AdminMessagesPage({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<p className="text-sm text-charcoal/70">Loading…</p>}>
      <AdminMessagesContent searchParams={searchParams} />
    </Suspense>
  );
}

async function AdminMessagesContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page || 1));
  const query = params.q || "";
  const status = (params.status as MessageStatus | "all" | undefined) || "all";
  const { items, total, pageSize } = await listMessagesAdmin(status, query, page);

  return (
    <div className="space-y-8">
      <AdminPageTitle section="messages" />
      <AdminFilters
        action="/admin/messages"
        query={query}
        status={status}
        statusOptions={[
          { value: "all", label: "All" },
          ...statuses.map((value) => ({ value, label: value })),
        ]}
        page={page}
        total={total}
        pageSize={pageSize}
      />

      <div className="space-y-4">
        {items.map((message) => (
          <article key={message.id} className="rounded-2xl border border-forest/10 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-xl">{message.fullName}</h3>
                <p className="text-sm text-charcoal/70">
                  {message.email}
                  {message.phone ? ` · ${message.phone}` : ""}
                </p>
                <p className="mt-1 text-xs text-charcoal/50">
                  {message.createdAt.toISOString()}
                </p>
              </div>
              <form action={updateMessageStatus} className="flex items-center gap-2">
                <input type="hidden" name="id" value={message.id} />
                <select
                  name="status"
                  defaultValue={message.status}
                  className="rounded-xl border px-3 py-2 text-sm"
                >
                  {statuses.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <button type="submit" className="rounded-full bg-pine px-3 py-2 text-xs text-ivory">
                  Update
                </button>
              </form>
            </div>
            <p className="mt-4 whitespace-pre-wrap text-sm text-charcoal/80">{message.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
