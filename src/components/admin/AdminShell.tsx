"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import {
  Activity,
  BedDouble,
  Bus,
  Compass,
  LayoutDashboard,
  Leaf,
  LogOut,
  Mail,
  MapPinned,
  Route,
  Ticket,
} from "lucide-react";
import { signOutAction } from "@/app/actions/auth";
import { useI18n } from "@/i18n/LanguageProvider";
import { pageCopy } from "@/i18n/pages";
import { cn } from "@/lib/cn";
import "@/app/admin/admin.css";

const links = [
  { href: "/admin", key: "overview" as const, icon: LayoutDashboard },
  { href: "/admin/destinations", key: "destinations" as const, icon: MapPinned },
  { href: "/admin/trips", key: "trips" as const, icon: Route },
  { href: "/admin/accommodations", key: "accommodations" as const, icon: BedDouble },
  { href: "/admin/activities", key: "activities" as const, icon: Activity },
  { href: "/admin/transport", key: "transport" as const, icon: Bus },
  { href: "/admin/emission-factors", key: "emissionFactors" as const, icon: Leaf },
  { href: "/admin/bookings", key: "bookings" as const, icon: Ticket },
  { href: "/admin/messages", key: "messages" as const, icon: Mail },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<AdminChrome />}>
      <AdminShellInner>{children}</AdminShellInner>
    </Suspense>
  );
}

function AdminShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <AdminChrome pathname={pathname}>{children}</AdminChrome>;
}

function AdminChrome({
  children,
  pathname,
}: {
  children?: React.ReactNode;
  pathname?: string | null;
}) {
  const { locale } = useI18n();
  const copy = pageCopy[locale].admin;
  const activeLink =
    links.find((link) =>
      link.href === "/admin"
        ? pathname === "/admin"
        : Boolean(pathname?.startsWith(link.href)),
    ) ?? links[0];

  return (
    <div className="admin-surface min-h-screen text-forest">
      <header className="sticky top-0 z-40 border-b border-forest/10 bg-ivory/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-forest text-ivory shadow-sm">
              <Compass className="size-5" aria-hidden />
            </span>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-pine">
                Sirius Trail
              </p>
              <h1 className="font-display text-lg leading-tight sm:text-xl">
                Admin
                <span className="mx-2 text-forest/25">/</span>
                <span className="text-pine">{copy[activeLink.key]}</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden rounded-full border border-forest/12 bg-white/70 px-3.5 py-2 text-xs font-medium text-forest transition hover:border-pine/40 hover:bg-white sm:inline-flex"
            >
              View site
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full border border-forest/12 bg-white px-3.5 py-2 text-xs font-medium text-forest transition hover:border-forest/30 hover:bg-sage/40"
              >
                <LogOut className="size-3.5" aria-hidden />
                {copy.signOut}
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[90rem] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[16.5rem_1fr] lg:gap-8 lg:px-8 lg:py-8">
        <aside className="lg:sticky lg:top-[4.75rem] lg:self-start">
          <nav
            aria-label="Admin"
            className="flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:rounded-[1.5rem] lg:border lg:border-forest/10 lg:bg-ivory/80 lg:p-2.5 lg:shadow-sm lg:backdrop-blur-sm"
          >
            {links.map((link) => {
              const active =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : Boolean(pathname?.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-pine text-ivory shadow-sm"
                      : "bg-white/70 text-forest/80 hover:bg-white hover:text-forest lg:bg-transparent",
                  )}
                >
                  <Icon className="size-4 shrink-0 opacity-90" aria-hidden />
                  <span className="whitespace-nowrap">{copy[link.key]}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="admin-panel min-w-0 rounded-[1.75rem] border border-forest/10 bg-ivory/75 p-5 shadow-sm backdrop-blur-sm sm:p-7">
          {children}
        </main>
      </div>
    </div>
  );
}
