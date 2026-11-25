"use server";

import type { Prisma } from "@prisma/client";
import { createBookingReference } from "@/lib/pricing";
import { hasDatabaseUrl, prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/validations";

export type BookingActionResult = {
  ok: boolean;
  reference?: string;
  message?: string;
};

export async function createBooking(raw: unknown): Promise<BookingActionResult> {
  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, message: "validation" };
  }

  if (!hasDatabaseUrl()) {
    return { ok: false, message: "database" };
  }

  const data = parsed.data;
  const travelDate = new Date(data.travelDate);
  if (Number.isNaN(travelDate.getTime())) {
    return { ok: false, message: "validation" };
  }

  try {
    if (data.destinationId) {
      const exists = await prisma.destination.findUnique({
        where: { id: data.destinationId },
        select: { id: true },
      });
      if (!exists) return { ok: false, message: "validation" };
    }
    if (data.tripId) {
      const exists = await prisma.trip.findUnique({
        where: { id: data.tripId },
        select: { id: true },
      });
      if (!exists) return { ok: false, message: "validation" };
    }
    if (data.activityIds.length) {
      const count = await prisma.activity.count({
        where: { id: { in: data.activityIds } },
      });
      if (count !== data.activityIds.length) {
        return { ok: false, message: "validation" };
      }
    }

    const reference = createBookingReference();
    const booking = await prisma.booking.create({
      data: {
        reference,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        destinationId: data.destinationId || null,
        tripId: data.tripId || null,
        accommodationId: data.accommodationId || null,
        transportId: data.transportId || null,
        travelers: data.travelers,
        nights: data.nights,
        travelDate,
        estimatedTotalDzd: data.estimatedTotalDzd,
        notes: data.notes || null,
        plannerPayload: data.plannerPayload as Prisma.InputJsonValue,
        activities: {
          create: data.activityIds.map((activityId) => ({ activityId })),
        },
        survey: {
          create: {
            preferredTransport: data.survey.preferredTransport,
            preferredAccommodation: data.survey.preferredAccommodation,
            interestEcoActivities: data.survey.interestEcoActivities,
            environmentalAwareness: data.survey.environmentalAwareness,
          },
        },
      },
    });

    return { ok: true, reference: booking.reference };
  } catch {
    return { ok: false, message: "server" };
  }
}
