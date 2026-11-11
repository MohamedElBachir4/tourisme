"use client";

import { contact } from "@/content/catalog";
import { destinations } from "@/content/catalog";
import { Logo } from "@/components/layout/Logo";
import { useI18n } from "@/i18n/LanguageProvider";

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex size-10 items-center justify-center rounded-full border border-ivory/15 transition-colors hover:border-sage hover:text-sage">
      {children}
    </span>
  );
}

export function Footer() {
  const { t } = useI18n();

  const explore = [
    { href: "/#top", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/#destinations", label: t.nav.destinations },
  ];

  const prepare = [
    { href: "/plan", label: t.nav.plan },
    { href: "/carbon", label: t.nav.carbon },
    { href: "/#destinations", label: t.nav.explore },
  ];

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo name={t.brand.name} tagline={t.brand.tagline} />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/75">{t.footer.description}</p>
          <div className="mt-6 flex items-center gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label={t.footer.instagram}>
              <SocialIcon>
                <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="3.6" />
                  <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
                </svg>
              </SocialIcon>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label={t.footer.facebook}>
              <SocialIcon>
                <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="currentColor">
                  <path d="M14.2 8.5H16V6h-1.8C11.9 6 11 7.2 11 9.1V10H9.5v2.4H11V20h2.5v-7.6h1.8l.4-2.4h-2.2v-.7c0-.6.2-.8.7-.8Z" />
                </svg>
              </SocialIcon>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label={t.footer.youtube}>
              <SocialIcon>
                <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="currentColor">
                  <path d="M21 8.2a3 3 0 0 0-2.1-2.1C17.2 5.7 12 5.7 12 5.7s-5.2 0-6.9.4A3 3 0 0 0 3 8.2 31 31 0 0 0 2.6 12 31 31 0 0 0 3 15.8a3 3 0 0 0 2.1 2.1c1.7.4 6.9.4 6.9.4s5.2 0 6.9-.4a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-3.8 31 31 0 0 0-.4-3.8ZM10.6 14.8V9.2L15.2 12l-4.6 2.8Z" />
                </svg>
              </SocialIcon>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-sage">{t.footer.explore}</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-ivory/80">
              {explore.map((link) => (
                <li key={link.href + link.label}>
                  <a href={link.href} className="hover:text-ivory">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-sage">{t.footer.prepare}</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-ivory/80">
              {prepare.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-ivory">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-sage">{t.footer.places}</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-ivory/80">
              {destinations.map((place) => (
                <li key={place.id}>
                  <a href={`/destinations/${place.id}`} className="hover:text-ivory">
                    {t.destinations.items[place.id].name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-sage">{t.footer.contact}</h2>
          <ul className="mt-4 space-y-3 text-sm text-ivory/80">
            <li>
              <span className="block text-xs text-ivory/50">{t.footer.emailLabel}</span>
              <a dir="ltr" className="hover:text-ivory" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </li>
            <li>
              <span className="block text-xs text-ivory/50">{t.footer.phoneLabel}</span>
              <a dir="ltr" className="hover:text-ivory" href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                {contact.phone}
              </a>
            </li>
            <li>
              <span className="block text-xs text-ivory/50">{t.footer.addressLabel}</span>
              {t.footer.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-ivory/55 sm:px-8 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {contact.year} {t.brand.name}. {t.footer.rights}
          </p>
          <p className="max-w-xl sm:text-end">{t.footer.photos}</p>
        </div>
      </div>
    </footer>
  );
}
