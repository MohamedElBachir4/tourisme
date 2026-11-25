import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Compass } from "lucide-react";
import { signInAction } from "@/app/actions/auth";
import { auth } from "@/auth";
import "@/app/admin/admin.css";

type PageProps = {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
};

export default function AdminLoginPage({ searchParams }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="admin-surface flex min-h-screen items-center justify-center px-5 py-16 text-forest">
          Loading…
        </div>
      }
    >
      <AdminLoginInner searchParams={searchParams} />
    </Suspense>
  );
}

async function AdminLoginInner({ searchParams }: PageProps) {
  const session = await auth();
  if (session?.user) redirect("/admin");

  const params = await searchParams;

  return (
    <div className="admin-surface flex min-h-screen items-center justify-center px-5 py-16">
      <form
        action={signInAction}
        className="w-full max-w-md space-y-5 rounded-[1.75rem] border border-forest/10 bg-ivory/90 p-8 shadow-sm backdrop-blur-sm"
      >
        <div className="flex items-start gap-3">
          <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-forest text-ivory">
            <Compass className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-pine">
              Sirius Trail
            </p>
            <h1 className="mt-1 font-display text-3xl tracking-tight text-forest">
              Admin login
            </h1>
            <p className="mt-1.5 text-sm text-charcoal/65">
              Sign in to manage destinations, trips, and bookings.
            </p>
          </div>
        </div>
        <input type="hidden" name="callbackUrl" value={params.callbackUrl || "/admin"} />
        <label className="block text-sm">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-pine">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-forest/12 bg-white px-3.5 py-3 outline-none transition focus:border-pine focus:ring-2 focus:ring-pine/20"
            dir="ltr"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-pine">
            Password
          </span>
          <input
            name="password"
            type="password"
            required
            className="w-full rounded-xl border border-forest/12 bg-white px-3.5 py-3 outline-none transition focus:border-pine focus:ring-2 focus:ring-pine/20"
            dir="ltr"
          />
        </label>
        {params.error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            Invalid email or password.
          </p>
        ) : null}
        <button
          type="submit"
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-pine text-sm font-medium text-ivory transition hover:bg-forest"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
