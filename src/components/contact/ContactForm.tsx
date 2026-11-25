"use client";

import { useState, useTransition } from "react";
import { createContactMessage } from "@/app/actions/contact";
import { FormField, fieldClassName } from "@/components/forms/FormField";
import { PageHero } from "@/components/pages/PageHero";
import { useI18n } from "@/i18n/LanguageProvider";
import { pageCopy } from "@/i18n/pages";

export function ContactForm() {
  const { locale } = useI18n();
  const copy = pageCopy[locale];
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setError(null);

    startTransition(async () => {
      const result = await createContactMessage({
        fullName: String(form.get("fullName") || ""),
        email: String(form.get("email") || ""),
        phone: String(form.get("phone") || ""),
        message: String(form.get("message") || ""),
      });

      if (!result.ok) {
        setError(
          result.message === "database"
            ? "Database is not configured yet."
            : copy.common.error,
        );
        return;
      }
      setDone(true);
      formElement.reset();
    });
  };

  return (
    <>
      <PageHero
        eyebrow={copy.contactPage.eyebrow}
        title={copy.contactPage.title}
        description={copy.contactPage.description}
      />
      <section className="bg-ivory px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-2xl rounded-[1.75rem] border border-forest/10 bg-white p-6 sm:p-8">
          {done ? (
            <p className="text-base text-pine">{copy.contactPage.successMessage}</p>
          ) : null}
          <form onSubmit={onSubmit} className="mt-4 grid gap-4">
            <FormField label={copy.contactPage.name}>
              <input name="fullName" required className={fieldClassName} />
            </FormField>
            <FormField label={copy.contactPage.email}>
              <input name="email" type="email" required className={fieldClassName} dir="ltr" />
            </FormField>
            <FormField label={copy.contactPage.phone}>
              <input name="phone" className={fieldClassName} dir="ltr" />
            </FormField>
            <FormField label={copy.contactPage.message}>
              <textarea name="message" required rows={6} className={fieldClassName} />
            </FormField>
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-12 items-center justify-center rounded-full bg-pine px-6 text-sm font-medium text-ivory disabled:opacity-60"
            >
              {pending ? copy.common.sending : copy.common.submit}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
