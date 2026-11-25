"use server";

import { revalidatePath } from "next/cache";
import {
  AccommodationType,
  BookingStatus,
  MessageStatus,
} from "@prisma/client";
import { z } from "zod";
import { auth } from "@/auth";
import {
  asJson,
  codeify,
  readLocalized,
  readLocalizedList,
  slugify,
} from "@/lib/admin-form";
import { hasDatabaseUrl, prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  if (!hasDatabaseUrl()) throw new Error("Database unavailable");
  return session;
}

function localizedSchema() {
  return z.object({
    en: z.string().min(1),
    fr: z.string().optional(),
    ar: z.string().optional(),
  });
}

export async function upsertDestination(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const name = readLocalized(formData, "name");
  const slug =
    String(formData.get("slug") || "").trim() || slugify(name.en || name.fr || name.ar);
  const data = {
    slug,
    wilaya: String(formData.get("wilaya") || "").trim(),
    location: asJson(readLocalized(formData, "location")),
    name: asJson(name),
    description: asJson(readLocalized(formData, "description")),
    longDescription: asJson(readLocalized(formData, "longDescription")),
    activities: asJson(readLocalizedList(formData, "activities")),
    accommodations: asJson(readLocalizedList(formData, "accommodations")),
    coverImage: String(formData.get("coverImage") || "").trim(),
    published: formData.get("published") === "on",
    sortOrder: Number(formData.get("sortOrder") || 0),
  };

  z.object({
    slug: z.string().min(1),
    wilaya: z.string().min(1),
    location: localizedSchema(),
    name: localizedSchema(),
    description: localizedSchema(),
    longDescription: localizedSchema(),
    coverImage: z.string().min(1),
  }).parse({
    ...data,
    location: readLocalized(formData, "location"),
    name,
    description: readLocalized(formData, "description"),
    longDescription: readLocalized(formData, "longDescription"),
  });

  if (id) {
    await prisma.destination.update({ where: { id }, data });
  } else {
    await prisma.destination.create({ data });
  }
  revalidatePath("/admin/destinations");
  revalidatePath("/destinations");
}

export async function deleteDestination(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await prisma.destination.delete({ where: { id } });
  revalidatePath("/admin/destinations");
}

export async function upsertDestinationImage(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const alt = readLocalized(formData, "alt");
  const data = {
    destinationId: String(formData.get("destinationId") || ""),
    url: String(formData.get("url") || "").trim(),
    alt: asJson(alt),
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
  z.object({
    destinationId: z.string().min(1),
    url: z.string().min(1),
    alt: localizedSchema(),
  }).parse({ ...data, alt });

  if (id) {
    await prisma.destinationImage.update({ where: { id }, data });
  } else {
    await prisma.destinationImage.create({ data });
  }
  revalidatePath("/admin/destinations");
}

export async function deleteDestinationImage(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await prisma.destinationImage.delete({ where: { id } });
  revalidatePath("/admin/destinations");
}

export async function upsertTrip(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const name = readLocalized(formData, "name");
  const slug =
    String(formData.get("slug") || "").trim() || slugify(name.en || name.fr || name.ar);
  const data = {
    slug,
    destinationId: String(formData.get("destinationId") || ""),
    name: asJson(name),
    description: asJson(readLocalized(formData, "description")),
    longDescription: asJson(readLocalized(formData, "longDescription")),
    durationDays: Number(formData.get("durationDays") || 1),
    basePriceDzd: Number(formData.get("basePriceDzd") || 0),
    accommodationLabel: asJson(readLocalized(formData, "accommodationLabel")),
    category: asJson(readLocalized(formData, "category")),
    imageUrl: String(formData.get("imageUrl") || "").trim(),
    activities: asJson(readLocalizedList(formData, "activities")),
    itinerary: asJson(readLocalizedList(formData, "itinerary")),
    published: formData.get("published") === "on",
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
  z.object({
    slug: z.string().min(1),
    destinationId: z.string().min(1),
    name: localizedSchema(),
    description: localizedSchema(),
    longDescription: localizedSchema(),
    accommodationLabel: localizedSchema(),
    category: localizedSchema(),
    imageUrl: z.string().min(1),
  }).parse({
    ...data,
    name,
    description: readLocalized(formData, "description"),
    longDescription: readLocalized(formData, "longDescription"),
    accommodationLabel: readLocalized(formData, "accommodationLabel"),
    category: readLocalized(formData, "category"),
  });

  if (id) {
    await prisma.trip.update({ where: { id }, data });
  } else {
    await prisma.trip.create({ data });
  }
  revalidatePath("/admin/trips");
  revalidatePath("/trips");
}

export async function deleteTrip(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await prisma.trip.delete({ where: { id } });
  revalidatePath("/admin/trips");
}

export async function upsertAccommodation(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const name = readLocalized(formData, "name");
  const destinationId = String(formData.get("destinationId") || "").trim();
  const code =
    String(formData.get("code") || "").trim() || codeify(name.en || name.fr || name.ar);
  const data = {
    code,
    type: String(formData.get("type") || "guesthouse") as AccommodationType,
    name: asJson(name),
    description: asJson(readLocalized(formData, "description")),
    pricePerNightDzd: Number(formData.get("pricePerNightDzd") || 0),
    destinationId: destinationId || null,
    active: formData.get("active") === "on",
  };
  z.object({
    code: z.string().min(1),
    type: z.nativeEnum(AccommodationType),
    name: localizedSchema(),
    description: localizedSchema(),
  }).parse({
    ...data,
    name,
    description: readLocalized(formData, "description"),
  });

  if (id) {
    await prisma.accommodation.update({ where: { id }, data });
  } else {
    await prisma.accommodation.create({ data });
  }
  revalidatePath("/admin/accommodations");
}

export async function deleteAccommodation(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await prisma.accommodation.delete({ where: { id } });
  revalidatePath("/admin/accommodations");
}

export async function upsertActivity(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const name = readLocalized(formData, "name");
  const code =
    String(formData.get("code") || "").trim() || codeify(name.en || name.fr || name.ar);
  const data = {
    code,
    name: asJson(name),
    description: asJson(readLocalized(formData, "description")),
    priceDzd: Number(formData.get("priceDzd") || 0),
    active: formData.get("active") === "on",
  };
  z.object({
    code: z.string().min(1),
    name: localizedSchema(),
    description: localizedSchema(),
  }).parse({
    ...data,
    name,
    description: readLocalized(formData, "description"),
  });

  if (id) {
    await prisma.activity.update({ where: { id }, data });
  } else {
    await prisma.activity.create({ data });
  }
  revalidatePath("/admin/activities");
}

export async function deleteActivity(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await prisma.activity.delete({ where: { id } });
  revalidatePath("/admin/activities");
}

export async function upsertTransport(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const name = readLocalized(formData, "name");
  const code =
    String(formData.get("code") || "").trim() || codeify(name.en || name.fr || name.ar);
  const data = {
    code,
    name: asJson(name),
    description: asJson(readLocalized(formData, "description")),
    priceDzd: Number(formData.get("priceDzd") || 0),
    emissionKgPerKm: Number(formData.get("emissionKgPerKm") || 0),
    forPlanner: formData.get("forPlanner") === "on",
    forCarbon: formData.get("forCarbon") === "on",
    active: formData.get("active") === "on",
  };
  z.object({
    code: z.string().min(1),
    name: localizedSchema(),
    description: localizedSchema(),
  }).parse({
    ...data,
    name,
    description: readLocalized(formData, "description"),
  });

  if (id) {
    await prisma.transport.update({ where: { id }, data });
  } else {
    await prisma.transport.create({ data });
  }
  revalidatePath("/admin/transport");
}

export async function deleteTransport(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await prisma.transport.delete({ where: { id } });
  revalidatePath("/admin/transport");
}

export async function upsertEmissionFactor(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const name = readLocalized(formData, "name");
  const code =
    String(formData.get("code") || "").trim() || codeify(name.en || name.fr || name.ar);
  const data = {
    code,
    name: asJson(name),
    description: asJson(readLocalized(formData, "description")),
    kgPerKm: Number(formData.get("kgPerKm") || 0),
    active: formData.get("active") === "on",
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
  z.object({
    code: z.string().min(1),
    name: localizedSchema(),
    description: localizedSchema(),
  }).parse({
    ...data,
    name,
    description: readLocalized(formData, "description"),
  });

  if (id) {
    await prisma.emissionFactor.update({ where: { id }, data });
  } else {
    await prisma.emissionFactor.create({ data });
  }
  revalidatePath("/admin/emission-factors");
  revalidatePath("/carbon");
}

export async function deleteEmissionFactor(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  await prisma.emissionFactor.delete({ where: { id } });
  revalidatePath("/admin/emission-factors");
}

export async function updateBookingStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "") as BookingStatus;
  z.nativeEnum(BookingStatus).parse(status);
  await prisma.booking.update({ where: { id }, data: { status } });
  revalidatePath("/admin/bookings");
}

export async function updateMessageStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "") as MessageStatus;
  z.nativeEnum(MessageStatus).parse(status);
  await prisma.contactMessage.update({ where: { id }, data: { status } });
  revalidatePath("/admin/messages");
}
