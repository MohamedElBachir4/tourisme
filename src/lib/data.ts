import {
  seedAccommodations,
  seedActivities,
  seedDestinationImages,
  seedDestinations,
  seedTransport,
  seedTrips,
} from "@/data/seed";
import {
  mapAccommodation,
  mapActivity,
  mapDestination,
  mapEmissionFactor,
  mapTransport,
  mapTrip,
} from "@/lib/mappers";
import { hasDatabaseUrl, prisma } from "@/lib/prisma";
import type {
  Accommodation,
  Activity,
  Destination,
  EmissionFactorView,
  TransportOption,
  Trip,
} from "@/types/database";

function withImages(destination: Destination): Destination {
  return {
    ...destination,
    images: seedDestinationImages
      .filter((image) => image.destination_id === destination.id)
      .sort((a, b) => a.sort_order - b.sort_order),
  };
}

function withDestination(trip: Trip): Trip {
  return {
    ...trip,
    destination: seedDestinations.find((item) => item.id === trip.destination_id) ?? null,
  };
}

export async function getDestinations(): Promise<Destination[]> {
  if (!hasDatabaseUrl()) {
    return seedDestinations.map(withImages);
  }

  try {
    const rows = await prisma.destination.findMany({
      where: { published: true },
      include: { images: { orderBy: { sortOrder: "asc" } } },
      orderBy: { sortOrder: "asc" },
    });
    return rows.map(mapDestination);
  } catch {
    return seedDestinations.map(withImages);
  }
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  if (!hasDatabaseUrl()) {
    const destination = seedDestinations.find((item) => item.slug === slug);
    return destination ? withImages(destination) : null;
  }

  try {
    const row = await prisma.destination.findFirst({
      where: { slug, published: true },
      include: { images: { orderBy: { sortOrder: "asc" } } },
    });
    return row ? mapDestination(row) : null;
  } catch {
    const destination = seedDestinations.find((item) => item.slug === slug);
    return destination ? withImages(destination) : null;
  }
}

export async function getTrips(): Promise<Trip[]> {
  if (!hasDatabaseUrl()) {
    return seedTrips.map(withDestination);
  }

  try {
    const rows = await prisma.trip.findMany({
      where: { published: true },
      include: { destination: true },
      orderBy: { sortOrder: "asc" },
    });
    return rows.map(mapTrip);
  } catch {
    return seedTrips.map(withDestination);
  }
}

export async function getTripBySlug(slug: string): Promise<Trip | null> {
  if (!hasDatabaseUrl()) {
    const trip = seedTrips.find((item) => item.slug === slug);
    return trip ? withDestination(trip) : null;
  }

  try {
    const row = await prisma.trip.findFirst({
      where: { slug, published: true },
      include: { destination: true },
    });
    return row ? mapTrip(row) : null;
  } catch {
    const trip = seedTrips.find((item) => item.slug === slug);
    return trip ? withDestination(trip) : null;
  }
}

export async function getTripsByDestination(destinationId: string): Promise<Trip[]> {
  const trips = await getTrips();
  return trips.filter((trip) => trip.destination_id === destinationId);
}

export async function getAccommodations(): Promise<Accommodation[]> {
  if (!hasDatabaseUrl()) return seedAccommodations;

  try {
    const rows = await prisma.accommodation.findMany({
      where: { active: true },
      orderBy: { pricePerNightDzd: "asc" },
    });
    return rows.map(mapAccommodation);
  } catch {
    return seedAccommodations;
  }
}

export async function getActivities(): Promise<Activity[]> {
  if (!hasDatabaseUrl()) return seedActivities;

  try {
    const rows = await prisma.activity.findMany({
      where: { active: true },
      orderBy: { priceDzd: "asc" },
    });
    return rows.map(mapActivity);
  } catch {
    return seedActivities;
  }
}

export async function getTransportOptions(
  scope?: "planner" | "carbon",
): Promise<TransportOption[]> {
  if (!hasDatabaseUrl()) {
    return seedTransport.filter((item) => {
      if (scope === "planner") return item.for_planner;
      if (scope === "carbon") return item.for_carbon;
      return true;
    });
  }

  try {
    const rows = await prisma.transport.findMany({
      where: {
        active: true,
        ...(scope === "planner" ? { forPlanner: true } : {}),
        ...(scope === "carbon" ? { forCarbon: true } : {}),
      },
      orderBy: { priceDzd: "asc" },
    });
    return rows.map(mapTransport);
  } catch {
    return seedTransport.filter((item) => {
      if (scope === "planner") return item.for_planner;
      if (scope === "carbon") return item.for_carbon;
      return true;
    });
  }
}

export async function getEmissionFactors(): Promise<EmissionFactorView[]> {
  if (!hasDatabaseUrl()) {
    return seedTransport
      .filter((item) => item.for_carbon)
      .map((item, index) => ({
        id: item.id,
        code: item.code,
        name: item.name,
        description: item.description,
        kg_per_km: item.emission_kg_per_km,
        active: true,
        sort_order: index + 1,
      }));
  }

  try {
    const rows = await prisma.emissionFactor.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
    return rows.map(mapEmissionFactor);
  } catch {
    return seedTransport
      .filter((item) => item.for_carbon)
      .map((item, index) => ({
        id: item.id,
        code: item.code,
        name: item.name,
        description: item.description,
        kg_per_km: item.emission_kg_per_km,
        active: true,
        sort_order: index + 1,
      }));
  }
}
