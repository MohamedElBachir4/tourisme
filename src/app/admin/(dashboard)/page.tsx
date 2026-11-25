import { Suspense } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Leaf,
  Mail,
  MapPinned,
  Route,
  Ticket,
} from "lucide-react";
import { getAdminStats } from "@/lib/admin-data";

export default function AdminOverviewPage() {
  return (
    <Suspense fallback={<p className="text-sm text-charcoal/70">Loading…</p>}>
      <AdminOverviewContent />
    </Suspense>
  );
}

async function AdminOverviewContent() {
  const stats = await getAdminStats();

  const cards = [
    {
      label: "Destinations",
      value: stats.destinations,
      href: "/admin/destinations",
      hint: "Published places",
      icon: MapPinned,
      tone: "from-pine/15 to-transparent",
    },
    {
      label: "Trips",
      value: stats.trips,
      href: "/admin/trips",
      hint: "Eco-tour catalog",
      icon: Route,
      tone: "from-forest/10 to-transparent",
    },
    {
      label: "Bookings",
      value: stats.bookings,
      href: "/admin/bookings",
      hint: "All requests",
      icon: Ticket,
      tone: "from-sand to-transparent",
    },
    {
      label: "Pending",
      value: stats.pendingBookings,
      href: "/admin/bookings?status=pending",
      hint: "Needs review",
      icon: Leaf,
      tone: "from-sage to-transparent",
    },
    {
      label: "Messages",
      value: stats.messages,
      href: "/admin/messages",
      hint: "Contact inbox",
      icon: Mail,
      tone: "from-pine/10 to-transparent",
    },
    {
      label: "New messages",
      value: stats.newMessages,
      href: "/admin/messages?status=new",
      hint: "Unread",
      icon: Mail,
      tone: "from-forest/8 to-transparent",
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-forest/8 pb-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-pine">Dashboard</p>
          <h2 className="mt-1 font-display text-3xl tracking-tight text-forest sm:text-4xl">
            Overview
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-charcoal/70">
            Monitor content, bookings, and messages for Sirius Trail.
          </p>
        </div>
        <Link
          href="/admin/bookings?status=pending"
          className="inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-medium text-ivory transition hover:bg-pine"
        >
          Review pending
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group relative overflow-hidden rounded-[1.35rem] border border-forest/10 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-pine/35 hover:shadow-md"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.tone} opacity-80`}
              />
              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-pine">
                    {card.label}
                  </p>
                  <p className="mt-3 font-display text-4xl tracking-tight text-forest">
                    {card.value}
                  </p>
                  <p className="mt-2 text-xs text-charcoal/60">{card.hint}</p>
                </div>
                <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-ivory text-pine ring-1 ring-forest/8 transition group-hover:bg-pine group-hover:text-ivory">
                  <Icon className="size-5" aria-hidden />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
