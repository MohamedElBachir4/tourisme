import type { Prisma } from "@prisma/client";

export type LocalizedMap = {
  en: string;
  fr: string;
  ar: string;
};

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function codeify(value: string) {
  const ascii = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return ascii || `item-${Date.now().toString(36)}`;
}

export function readLocalized(formData: FormData, prefix: string): LocalizedMap {
  const en = String(formData.get(`${prefix}_en`) || "").trim();
  const fr = String(formData.get(`${prefix}_fr`) || "").trim();
  const ar = String(formData.get(`${prefix}_ar`) || "").trim();
  return {
    en: en || fr || ar,
    fr: fr || en || ar,
    ar: ar || en || fr,
  };
}

export function readLocalizedList(formData: FormData, prefix: string): LocalizedMap[] {
  const enLines = String(formData.get(`${prefix}_en`) || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const frLines = String(formData.get(`${prefix}_fr`) || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const arLines = String(formData.get(`${prefix}_ar`) || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const count = Math.max(enLines.length, frLines.length, arLines.length);
  const items: LocalizedMap[] = [];
  for (let index = 0; index < count; index += 1) {
    const en = enLines[index] || frLines[index] || arLines[index] || "";
    const fr = frLines[index] || enLines[index] || arLines[index] || "";
    const ar = arLines[index] || enLines[index] || frLines[index] || "";
    if (!en && !fr && !ar) continue;
    items.push({ en, fr, ar });
  }
  return items;
}

export function asJson(value: LocalizedMap | LocalizedMap[]): Prisma.InputJsonValue {
  return value as unknown as Prisma.InputJsonValue;
}

export function localizedValue(value: unknown): LocalizedMap {
  const record = (value ?? {}) as Partial<LocalizedMap>;
  return {
    en: record.en || "",
    fr: record.fr || "",
    ar: record.ar || "",
  };
}

export function localizedListToLines(value: unknown): LocalizedMap & { en: string; fr: string; ar: string } {
  const list = Array.isArray(value) ? (value as LocalizedMap[]) : [];
  return {
    en: list.map((item) => item?.en || "").filter(Boolean).join("\n"),
    fr: list.map((item) => item?.fr || "").filter(Boolean).join("\n"),
    ar: list.map((item) => item?.ar || "").filter(Boolean).join("\n"),
  };
}
