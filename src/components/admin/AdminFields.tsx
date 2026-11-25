"use client";

import { useI18n } from "@/i18n/LanguageProvider";
import { adminFormCopy } from "@/i18n/admin-forms";
import type { LocalizedMap } from "@/lib/admin-form";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-forest">{label}</span>
      {children}
      {hint ? <span className="mt-1.5 block text-xs text-charcoal/60">{hint}</span> : null}
    </label>
  );
}

export const inputClassName =
  "w-full rounded-xl border border-forest/12 bg-beige/40 px-3.5 py-2.5 text-sm text-forest outline-none transition focus:border-pine focus:bg-white focus:ring-2 focus:ring-pine/15";

export function LocalizedTextFields({
  prefix,
  label,
  values,
  multiline = false,
  rows = 3,
  required = false,
}: {
  prefix: string;
  label: string;
  values?: Partial<LocalizedMap>;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
}) {
  const { locale } = useI18n();
  const copy = adminFormCopy[locale];
  const langs = [
    { key: "en" as const, label: copy.langEn },
    { key: "fr" as const, label: copy.langFr },
    { key: "ar" as const, label: copy.langAr },
  ];

  return (
    <fieldset className="rounded-2xl border border-forest/10 bg-beige/30 p-4">
      <legend className="px-1 text-sm font-medium text-forest">{label}</legend>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {langs.map((lang) => (
          <label key={lang.key} className="block text-sm">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-pine">
              {lang.label}
            </span>
            {multiline ? (
              <textarea
                name={`${prefix}_${lang.key}`}
                defaultValue={values?.[lang.key] || ""}
                rows={rows}
                required={required && lang.key === "en"}
                className={inputClassName}
                dir={lang.key === "ar" ? "rtl" : "ltr"}
              />
            ) : (
              <input
                name={`${prefix}_${lang.key}`}
                defaultValue={values?.[lang.key] || ""}
                required={required && lang.key === "en"}
                className={inputClassName}
                dir={lang.key === "ar" ? "rtl" : "ltr"}
              />
            )}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function LocalizedListFields({
  prefix,
  label,
  values,
}: {
  prefix: string;
  label: string;
  values?: Partial<LocalizedMap>;
}) {
  const { locale } = useI18n();
  const copy = adminFormCopy[locale];
  return (
    <div className="space-y-2">
      <LocalizedTextFields
        prefix={prefix}
        label={label}
        values={values}
        multiline
        rows={4}
      />
      <p className="text-xs text-charcoal/60">{copy.listHint}</p>
    </div>
  );
}

export function ToggleField({
  name,
  label,
  defaultChecked = false,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="inline-flex items-center gap-2.5 rounded-full border border-forest/10 bg-white px-4 py-2.5 text-sm text-forest">
      <input
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="size-4 rounded border-forest/30 text-pine accent-pine"
      />
      {label}
    </label>
  );
}

export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="inline-flex h-11 items-center justify-center rounded-full bg-pine px-5 text-sm font-medium text-ivory transition hover:bg-forest"
    >
      {children}
    </button>
  );
}

export function DeleteButton({
  action,
  id,
  label,
  confirmLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  label: string;
  confirmLabel: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(confirmLabel)) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center rounded-full border border-red-200 bg-white px-5 text-sm font-medium text-red-700 transition hover:bg-red-50"
      >
        {label}
      </button>
    </form>
  );
}

export function useAdminFormCopy() {
  const { locale } = useI18n();
  return adminFormCopy[locale];
}
