import { notFound } from "next/navigation";
import { DestinationDetail } from "@/components/destinations/DestinationDetail";
import {
  getDestinationBySlug,
  getDestinations,
  getTripsByDestination,
} from "@/lib/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const destinations = await getDestinations();
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) return { title: "Destination" };
  return {
    title: destination.name.en,
    description: destination.description.en,
  };
}

export default async function DestinationSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) notFound();

  const trips = await getTripsByDestination(destination.id);

  return <DestinationDetail destination={destination} trips={trips} />;
}
