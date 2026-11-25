import { PrismaClient, AccommodationType } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  seedAccommodations,
  seedActivities,
  seedDestinationImages,
  seedDestinations,
  seedTransport,
  seedTrips,
} from "../src/data/seed";

const prisma = new PrismaClient();

const emissionFactors = [
  {
    code: "shared-bus",
    name: { en: "Shared bus", fr: "Autocar partagé", ar: "حافلة مشتركة" },
    description: {
      en: "Coach or shared bus per passenger-kilometre.",
      fr: "Autocar ou bus partagé par passager-kilomètre.",
      ar: "حافلة أو نقل مشترك لكل راكب-كيلومتر.",
    },
    kgPerKm: 0.027,
    sortOrder: 1,
  },
  {
    code: "train",
    name: { en: "Train", fr: "Train", ar: "قطار" },
    description: {
      en: "Regional rail where available.",
      fr: "Train régional lorsqu'il est disponible.",
      ar: "قطار إقليمي حيث يتوفر.",
    },
    kgPerKm: 0.041,
    sortOrder: 2,
  },
  {
    code: "gasoline-car",
    name: { en: "Private gasoline car", fr: "Voiture essence", ar: "سيارة بنزين" },
    description: {
      en: "Average gasoline car before dividing by passengers.",
      fr: "Voiture essence moyenne avant division par passagers.",
      ar: "سيارة بنزين متوسطة قبل القسمة على الركاب.",
    },
    kgPerKm: 0.171,
    sortOrder: 3,
  },
  {
    code: "electric-car",
    name: { en: "Electric car", fr: "Voiture électrique", ar: "سيارة كهربائية" },
    description: {
      en: "Battery-electric car before dividing by passengers.",
      fr: "Voiture électrique avant division par passagers.",
      ar: "سيارة كهربائية قبل القسمة على الركاب.",
    },
    kgPerKm: 0.05,
    sortOrder: 4,
  },
  {
    code: "flight",
    name: { en: "Domestic flight", fr: "Vol intérieur", ar: "رحلة داخلية" },
    description: {
      en: "Short-haul flight per passenger-kilometre.",
      fr: "Vol court-courrier par passager-kilomètre.",
      ar: "رحلة قصيرة لكل راكب-كيلومتر.",
    },
    kgPerKm: 0.255,
    sortOrder: 5,
  },
];

async function main() {
  for (const destination of seedDestinations) {
    await prisma.destination.upsert({
      where: { slug: destination.slug },
      update: {
        wilaya: destination.wilaya,
        location: destination.location,
        name: destination.name,
        description: destination.description,
        longDescription: destination.long_description,
        activities: destination.activities,
        accommodations: destination.accommodations,
        coverImage: destination.cover_image,
        published: destination.published,
        sortOrder: destination.sort_order,
      },
      create: {
        id: destination.id,
        slug: destination.slug,
        wilaya: destination.wilaya,
        location: destination.location,
        name: destination.name,
        description: destination.description,
        longDescription: destination.long_description,
        activities: destination.activities,
        accommodations: destination.accommodations,
        coverImage: destination.cover_image,
        published: destination.published,
        sortOrder: destination.sort_order,
      },
    });
  }

  for (const image of seedDestinationImages) {
    await prisma.destinationImage.upsert({
      where: { id: image.id },
      update: {
        url: image.url,
        alt: image.alt,
        sortOrder: image.sort_order,
        destinationId: image.destination_id,
      },
      create: {
        id: image.id,
        destinationId: image.destination_id,
        url: image.url,
        alt: image.alt,
        sortOrder: image.sort_order,
      },
    });
  }

  for (const trip of seedTrips) {
    await prisma.trip.upsert({
      where: { slug: trip.slug },
      update: {
        destinationId: trip.destination_id,
        name: trip.name,
        description: trip.description,
        longDescription: trip.long_description,
        durationDays: trip.duration_days,
        basePriceDzd: trip.base_price_dzd,
        accommodationLabel: trip.accommodation_label,
        category: trip.category,
        imageUrl: trip.image_url,
        activities: trip.activities,
        itinerary: trip.activities,
        published: trip.published,
        sortOrder: trip.sort_order,
      },
      create: {
        id: trip.id,
        slug: trip.slug,
        destinationId: trip.destination_id,
        name: trip.name,
        description: trip.description,
        longDescription: trip.long_description,
        durationDays: trip.duration_days,
        basePriceDzd: trip.base_price_dzd,
        accommodationLabel: trip.accommodation_label,
        category: trip.category,
        imageUrl: trip.image_url,
        activities: trip.activities,
        itinerary: trip.activities,
        published: trip.published,
        sortOrder: trip.sort_order,
      },
    });
  }

  for (const item of seedAccommodations) {
    await prisma.accommodation.upsert({
      where: { code: item.code },
      update: {
        type: item.type as AccommodationType,
        name: item.name,
        description: item.description,
        pricePerNightDzd: item.price_per_night_dzd,
        destinationId: item.destination_id,
        active: item.active,
      },
      create: {
        id: item.id,
        code: item.code,
        type: item.type as AccommodationType,
        name: item.name,
        description: item.description,
        pricePerNightDzd: item.price_per_night_dzd,
        destinationId: item.destination_id,
        active: item.active,
      },
    });
  }

  for (const item of seedActivities) {
    await prisma.activity.upsert({
      where: { code: item.code },
      update: {
        name: item.name,
        description: item.description,
        priceDzd: item.price_dzd,
        active: item.active,
      },
      create: {
        id: item.id,
        code: item.code,
        name: item.name,
        description: item.description,
        priceDzd: item.price_dzd,
        active: item.active,
      },
    });
  }

  for (const item of seedTransport) {
    await prisma.transport.upsert({
      where: { code: item.code },
      update: {
        name: item.name,
        description: item.description,
        priceDzd: item.price_dzd,
        emissionKgPerKm: item.emission_kg_per_km,
        forPlanner: item.for_planner,
        forCarbon: item.for_carbon,
        active: item.active,
      },
      create: {
        id: item.id,
        code: item.code,
        name: item.name,
        description: item.description,
        priceDzd: item.price_dzd,
        emissionKgPerKm: item.emission_kg_per_km,
        forPlanner: item.for_planner,
        forCarbon: item.for_carbon,
        active: item.active,
      },
    });
  }

  for (const item of emissionFactors) {
    await prisma.emissionFactor.upsert({
      where: { code: item.code },
      update: {
        name: item.name,
        description: item.description,
        kgPerKm: item.kgPerKm,
        sortOrder: item.sortOrder,
        active: true,
      },
      create: {
        code: item.code,
        name: item.name,
        description: item.description,
        kgPerKm: item.kgPerKm,
        sortOrder: item.sortOrder,
        active: true,
      },
    });
  }

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.adminUser.upsert({
      where: { email },
      update: { passwordHash, name: "Platform Admin" },
      create: { email, passwordHash, name: "Platform Admin" },
    });
    console.log(`Admin ready: ${email}`);
  } else {
    console.log("Skipped admin seed (set ADMIN_EMAIL and ADMIN_PASSWORD).");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
