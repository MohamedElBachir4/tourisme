import type {
  Accommodation as PrismaAccommodation,
  Activity as PrismaActivity,
  Destination as PrismaDestination,
  DestinationImage as PrismaDestinationImage,
  EmissionFactor as PrismaEmissionFactor,
  Transport as PrismaTransport,
  Trip as PrismaTrip,
} from "@prisma/client";
import type { LocalizedString } from "@/lib/i18n-content";
import type {
  Accommodation,
  Activity,
  Destination,
  DestinationImage,
  EmissionFactorView,
  TransportOption,
  Trip,
} from "@/types/database";

function asLocalized(value: unknown): LocalizedString {
  return value as LocalizedString;
}

function asLocalizedList(value: unknown): LocalizedString[] {
  return (value as LocalizedString[]) ?? [];
}

export function mapDestination(
  destination: PrismaDestination & { images?: PrismaDestinationImage[] },
): Destination {
  return {
    id: destination.id,
    slug: destination.slug,
    wilaya: destination.wilaya,
    location: asLocalized(destination.location),
    name: asLocalized(destination.name),
    description: asLocalized(destination.description),
    long_description: asLocalized(destination.longDescription),
    activities: asLocalizedList(destination.activities),
    accommodations: asLocalizedList(destination.accommodations),
    cover_image: destination.coverImage,
    published: destination.published,
    sort_order: destination.sortOrder,
    images: destination.images?.map(mapDestinationImage),
  };
}

export function mapDestinationImage(image: PrismaDestinationImage): DestinationImage {
  return {
    id: image.id,
    destination_id: image.destinationId,
    url: image.url,
    alt: asLocalized(image.alt),
    sort_order: image.sortOrder,
  };
}

export function mapTrip(
  trip: PrismaTrip & { destination?: PrismaDestination | null },
): Trip {
  return {
    id: trip.id,
    slug: trip.slug,
    destination_id: trip.destinationId,
    name: asLocalized(trip.name),
    description: asLocalized(trip.description),
    long_description: asLocalized(trip.longDescription),
    duration_days: trip.durationDays,
    base_price_dzd: Number(trip.basePriceDzd),
    accommodation_label: asLocalized(trip.accommodationLabel),
    category: asLocalized(trip.category),
    image_url: trip.imageUrl,
    activities: asLocalizedList(trip.activities),
    itinerary: asLocalizedList(trip.itinerary),
    published: trip.published,
    sort_order: trip.sortOrder,
    destination: trip.destination ? mapDestination(trip.destination) : null,
  };
}

export function mapAccommodation(item: PrismaAccommodation): Accommodation {
  return {
    id: item.id,
    code: item.code,
    type: item.type,
    name: asLocalized(item.name),
    description: asLocalized(item.description),
    price_per_night_dzd: Number(item.pricePerNightDzd),
    destination_id: item.destinationId,
    active: item.active,
  };
}

export function mapActivity(item: PrismaActivity): Activity {
  return {
    id: item.id,
    code: item.code,
    name: asLocalized(item.name),
    description: asLocalized(item.description),
    price_dzd: Number(item.priceDzd),
    active: item.active,
  };
}

export function mapTransport(item: PrismaTransport): TransportOption {
  return {
    id: item.id,
    code: item.code,
    name: asLocalized(item.name),
    description: asLocalized(item.description),
    price_dzd: Number(item.priceDzd),
    emission_kg_per_km: Number(item.emissionKgPerKm),
    for_planner: item.forPlanner,
    for_carbon: item.forCarbon,
    active: item.active,
  };
}

export function mapEmissionFactor(item: PrismaEmissionFactor): EmissionFactorView {
  return {
    id: item.id,
    code: item.code,
    name: asLocalized(item.name),
    description: asLocalized(item.description),
    kg_per_km: Number(item.kgPerKm),
    active: item.active,
    sort_order: item.sortOrder,
  };
}
