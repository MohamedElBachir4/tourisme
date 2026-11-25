import { hasDatabaseUrl, prisma } from "@/lib/prisma";
import type { BookingStatus, MessageStatus, Prisma } from "@prisma/client";

const PAGE_SIZE = 10;

export async function getAdminStats() {
  if (!hasDatabaseUrl()) {
    return {
      destinations: 0,
      trips: 0,
      bookings: 0,
      pendingBookings: 0,
      messages: 0,
      newMessages: 0,
    };
  }

  const [destinations, trips, bookings, pendingBookings, messages, newMessages] =
    await Promise.all([
      prisma.destination.count(),
      prisma.trip.count(),
      prisma.booking.count(),
      prisma.booking.count({ where: { status: "pending" } }),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { status: "new" } }),
    ]);

  return { destinations, trips, bookings, pendingBookings, messages, newMessages };
}

export async function listDestinationsAdmin(query = "", page = 1) {
  if (!hasDatabaseUrl()) return { items: [], total: 0, pageSize: PAGE_SIZE };
  const where: Prisma.DestinationWhereInput = query
    ? {
        OR: [
          { slug: { contains: query, mode: "insensitive" } },
          { wilaya: { contains: query, mode: "insensitive" } },
        ],
      }
    : {};
  const [items, total] = await Promise.all([
    prisma.destination.findMany({
      where,
      include: { images: { orderBy: { sortOrder: "asc" } } },
      orderBy: { sortOrder: "asc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.destination.count({ where }),
  ]);
  return { items, total, pageSize: PAGE_SIZE };
}

export async function listTripsAdmin(query = "", page = 1) {
  if (!hasDatabaseUrl()) return { items: [], total: 0, pageSize: PAGE_SIZE };
  const where: Prisma.TripWhereInput = query
    ? { slug: { contains: query, mode: "insensitive" } }
    : {};
  const [items, total] = await Promise.all([
    prisma.trip.findMany({
      where,
      include: { destination: true },
      orderBy: { sortOrder: "asc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.trip.count({ where }),
  ]);
  return { items, total, pageSize: PAGE_SIZE };
}

export async function listAccommodationsAdmin(query = "", page = 1) {
  if (!hasDatabaseUrl()) return { items: [], total: 0, pageSize: PAGE_SIZE };
  const where: Prisma.AccommodationWhereInput = query
    ? { code: { contains: query, mode: "insensitive" } }
    : {};
  const [items, total] = await Promise.all([
    prisma.accommodation.findMany({
      where,
      orderBy: { code: "asc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.accommodation.count({ where }),
  ]);
  return { items, total, pageSize: PAGE_SIZE };
}

export async function listActivitiesAdmin(query = "", page = 1) {
  if (!hasDatabaseUrl()) return { items: [], total: 0, pageSize: PAGE_SIZE };
  const where: Prisma.ActivityWhereInput = query
    ? { code: { contains: query, mode: "insensitive" } }
    : {};
  const [items, total] = await Promise.all([
    prisma.activity.findMany({
      where,
      orderBy: { code: "asc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.activity.count({ where }),
  ]);
  return { items, total, pageSize: PAGE_SIZE };
}

export async function listTransportsAdmin(query = "", page = 1) {
  if (!hasDatabaseUrl()) return { items: [], total: 0, pageSize: PAGE_SIZE };
  const where: Prisma.TransportWhereInput = query
    ? { code: { contains: query, mode: "insensitive" } }
    : {};
  const [items, total] = await Promise.all([
    prisma.transport.findMany({
      where,
      orderBy: { code: "asc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.transport.count({ where }),
  ]);
  return { items, total, pageSize: PAGE_SIZE };
}

export async function listEmissionFactorsAdmin(query = "", page = 1) {
  if (!hasDatabaseUrl()) return { items: [], total: 0, pageSize: PAGE_SIZE };
  const where: Prisma.EmissionFactorWhereInput = query
    ? { code: { contains: query, mode: "insensitive" } }
    : {};
  const [items, total] = await Promise.all([
    prisma.emissionFactor.findMany({
      where,
      orderBy: { sortOrder: "asc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.emissionFactor.count({ where }),
  ]);
  return { items, total, pageSize: PAGE_SIZE };
}

export async function listBookingsAdmin(
  status: BookingStatus | "all" = "all",
  query = "",
  page = 1,
) {
  if (!hasDatabaseUrl()) return { items: [], total: 0, pageSize: PAGE_SIZE };
  const where: Prisma.BookingWhereInput = {
    ...(status !== "all" ? { status } : {}),
    ...(query
      ? {
          OR: [
            { reference: { contains: query, mode: "insensitive" } },
            { customerEmail: { contains: query, mode: "insensitive" } },
            { customerName: { contains: query, mode: "insensitive" } },
          ],
        }
      : {}),
  };
  const [items, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      include: {
        survey: true,
        destination: true,
        trip: true,
        accommodation: true,
        transport: true,
        activities: { include: { activity: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.booking.count({ where }),
  ]);
  return { items, total, pageSize: PAGE_SIZE };
}

export async function listMessagesAdmin(
  status: MessageStatus | "all" = "all",
  query = "",
  page = 1,
) {
  if (!hasDatabaseUrl()) return { items: [], total: 0, pageSize: PAGE_SIZE };
  const where: Prisma.ContactMessageWhereInput = {
    ...(status !== "all" ? { status } : {}),
    ...(query
      ? {
          OR: [
            { email: { contains: query, mode: "insensitive" } },
            { fullName: { contains: query, mode: "insensitive" } },
          ],
        }
      : {}),
  };
  const [items, total] = await Promise.all([
    prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.contactMessage.count({ where }),
  ]);
  return { items, total, pageSize: PAGE_SIZE };
}

export async function listDestinationOptions() {
  if (!hasDatabaseUrl()) return [];
  return prisma.destination.findMany({
    select: { id: true, slug: true, name: true },
    orderBy: { sortOrder: "asc" },
  });
}
