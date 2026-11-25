"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";

export function SiteFooter() {
  return (
    <Suspense fallback={<Footer />}>
      <SiteFooterInner />
    </Suspense>
  );
}

function SiteFooterInner() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <Footer />;
}
