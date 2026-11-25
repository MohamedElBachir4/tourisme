import { Suspense } from "react";
import { updateBookingStatus } from "@/app/actions/admin";
import { AdminFilters } from "@/components/admin/AdminFilters";
import { AdminPageTitle } from "@/components/admin/AdminPageTitle";
import { listBookingsAdmin } from "@/lib/admin-data";
import { pickLocalized } from "@/lib/i18n-content";
import type { BookingStatus } from "@prisma/client";

type PageProps = {
  searchParams: Promise<{ q?: string; page?: string; status?: string }>;
};

const statuses: BookingStatus[] = [
  "pending",
  "confirmed",
  "rejected",
  "cancelled",
  "completed",
];

export default function AdminBookingsPage({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<p className="text-sm text-charcoal/70">Loading…</p>}>
      <AdminBookingsContent searchParams={searchParams} />
    </Suspense>
  );
}

async function AdminBookingsContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page || 1));
  const query = params.q || "";
  const status = (params.status as BookingStatus | "all" | undefined) || "all";
  const { items, total, pageSize } = await listBookingsAdmin(status, query, page);

  return (
    <div className="space-y-8">
      <AdminPageTitle section="bookings" />
      <AdminFilters
        action="/admin/bookings"
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
        {items.map((booking) => (
          <article key={booking.id} className="rounded-2xl border border-forest/10 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-sm text-pine">{booking.reference}</p>
                <h3 className="mt-1 font-display text-xl">{booking.customerName}</h3>
                <p className="text-sm text-charcoal/70">
                  {booking.customerEmail} · {booking.customerPhone}
                </p>
              </div>
              <form action={updateBookingStatus} className="flex items-center gap-2">
                <input type="hidden" name="id" value={booking.id} />
                <select
                  name="status"
                  defaultValue={booking.status}
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
            <dl className="mt-4 grid gap-2 text-sm text-charcoal/75 sm:grid-cols-2">
              <div>
                Travelers: {booking.travelers} · Nights: {booking.nights}
              </div>
              <div>Date: {booking.travelDate.toISOString().slice(0, 10)}</div>
              <div>Total: {Number(booking.estimatedTotalDzd)} DZD</div>
              <div>
                Destination:{" "}
                {booking.destination
                  ? pickLocalized(booking.destination.name as never, "en")
                  : "—"}
              </div>
              <div>
                Trip: {booking.trip ? pickLocalized(booking.trip.name as never, "en") : "—"}
              </div>
              <div>
                Activities:{" "}
                {booking.activities
                  .map((row) => pickLocalized(row.activity.name as never, "en"))
                  .join(", ") || "—"}
              </div>
            </dl>
            {(() => {
              const payload = (booking.plannerPayload ?? {}) as Record<string, unknown>;
              const carbon = payload.carbon as
                | {
                    selectedKg?: number;
                    distanceKm?: number;
                    transportLabel?: string;
                    savingsPercent?: number | null;
                  }
                | null
                | undefined;
              if (!carbon?.selectedKg && carbon?.selectedKg !== 0) return null;
              return (
                <div className="mt-4 rounded-xl border border-pine/20 bg-sage/40 p-4 text-sm">
                  <p className="font-medium text-forest">Carbon estimate</p>
                  <p className="mt-2">
                    {carbon.transportLabel || "—"} · {carbon.distanceKm ?? "—"} km ·{" "}
                    {carbon.selectedKg} kg CO₂e
                    {carbon.savingsPercent
                      ? ` · savings ${carbon.savingsPercent}%`
                      : ""}
                  </p>
                </div>
              );
            })()}
            {booking.survey ? (
              <div className="mt-4 rounded-xl bg-beige/80 p-4 text-sm">
                <p className="font-medium text-forest">Survey</p>
                <p className="mt-2">Transport: {booking.survey.preferredTransport}</p>
                <p>Accommodation: {booking.survey.preferredAccommodation}</p>
                <p>
                  Eco activities: {booking.survey.interestEcoActivities ? "yes" : "no"} · Awareness:{" "}
                  {booking.survey.environmentalAwareness}
                </p>
              </div>
            ) : null}
            {booking.notes ? <p className="mt-3 text-sm text-charcoal/70">{booking.notes}</p> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
