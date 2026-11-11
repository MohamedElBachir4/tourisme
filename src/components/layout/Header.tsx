"use client";

import { Suspense, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Logo } from "@/components/layout/Logo";
import { useI18n } from "@/i18n/LanguageProvider";

export function Header() {
  return (
    <Suspense fallback={<HeaderChrome />}>
      <HeaderWithPathname />
    </Suspense>
  );
}

function HeaderWithPathname() {
  const pathname = usePathname();
  return <HeaderChrome pathname={pathname} />;
}

type HeaderChromeProps = {
  pathname?: string;
};

function HeaderChrome({ pathname }: HeaderChromeProps) {
  const { t } = useI18n();
  const isHome = pathname == null ? true : pathname === "/";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      root.classList.toggle("menu-open", open);
      root.classList.toggle("is-scrolled", !isHome || open || window.scrollY > 24);
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => {
      root.classList.remove("menu-open");
      window.removeEventListener("scroll", sync);
    };
  }, [open, isHome]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: "/#top", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/#destinations", label: t.nav.destinations },
    { href: "/#plan", label: t.nav.plan },
    { href: "/#carbon", label: t.nav.carbon },
  ];

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-colors duration-300">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ivory focus:px-4 focus:py-2 focus:text-sm focus:text-forest"
      >
        {t.nav.skip}
      </a>
      <div className="mx-auto grid h-20 w-full max-w-[96rem] grid-cols-[auto_1fr_auto] items-center gap-3 px-5 sm:px-8">
        <a href="/#top" className="shrink-0" onClick={close}>
          <Logo name={t.brand.name} tagline={t.brand.tagline} />
        </a>

        <nav aria-label={t.nav.primary} className="hidden items-center justify-center gap-x-5 xl:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-[13px] font-medium tracking-wide opacity-90 transition-opacity hover:opacity-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="col-start-3 flex items-center justify-end gap-2 sm:gap-3">
          <LanguageSwitcher />
          <div className="hidden xl:block">
            <Button href="/#destinations" className="px-5">
              {t.nav.explore}
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-current/20 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{open ? t.nav.closeMenu : t.nav.openMenu}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-navigation"
          className="max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-forest/10 bg-ivory text-forest xl:hidden"
        >
          <nav
            aria-label={t.nav.primary}
            className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="rounded-2xl px-3 py-3 text-lg font-medium text-forest hover:bg-sage"
              >
                {link.label}
              </a>
            ))}
            <Button href="/#destinations" className="mt-3 w-full" onClick={close}>
              {t.nav.explore}
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
