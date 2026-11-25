import { DestinationsBrowser } from "@/components/destinations/DestinationsBrowser";
import { DestinationsPageShell } from "@/components/destinations/DestinationsPageShell";
import { getDestinations } from "@/lib/data";

export const instant = false;

export const metadata = {
  title: "Destinations",
  description: "Explore sustainable tourism destinations across Algeria.",
};

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <DestinationsPageShell>
      <DestinationsBrowser destinations={destinations} />
    </DestinationsPageShell>
  );
}
