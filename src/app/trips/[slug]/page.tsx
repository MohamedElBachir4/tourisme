import { notFound } from "next/navigation";
import { TripDetail } from "@/components/trips/TripDetail";
import {
  getAccommodations,
  getTransportOptions,
  getTripBySlug,
  getTrips,
} from "@/lib/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const trips = await getTrips();
  return trips.map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const trip = await getTripBySlug(slug);
  if (!trip) return { title: "Eco-tour" };
  return {
    title: trip.name.en,
    description: trip.description.en,
  };
}

export default async function TripSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const trip = await getTripBySlug(slug);
  if (!trip) notFound();

  const [accommodations, transports] = await Promise.all([
    getAccommodations(),
    getTransportOptions("planner"),
  ]);

  return (
    <TripDetail trip={trip} accommodations={accommodations} transports={transports} />
  );
}
