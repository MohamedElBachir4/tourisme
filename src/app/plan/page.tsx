import { TripPlanner } from "@/components/plan/TripPlanner";
import {
  getAccommodations,
  getActivities,
  getDestinations,
  getEmissionFactors,
  getTransportOptions,
} from "@/lib/data";

export const instant = false;

export const metadata = {
  title: "Plan your trip",
  description: "Build a custom sustainable itinerary with live pricing in DZD.",
};

export default async function PlanPage() {
  const [destinations, accommodations, activities, transports, emissionFactors] =
    await Promise.all([
      getDestinations(),
      getAccommodations(),
      getActivities(),
      getTransportOptions("planner"),
      getEmissionFactors(),
    ]);

  return (
    <TripPlanner
      destinations={destinations}
      accommodations={accommodations}
      activities={activities}
      transports={transports}
      emissionFactors={emissionFactors}
    />
  );
}
