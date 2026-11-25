import { TripsBrowser } from "@/components/trips/TripsBrowser";
import { getTrips } from "@/lib/data";

export const metadata = {
  title: "Eco-tours",
  description: "Browse sustainable eco-tours across Algeria with Sirius Trail.",
};

export default async function TripsPage() {
  const trips = await getTrips();
  return <TripsBrowser trips={trips} />;
}
