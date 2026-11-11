import { CarbonCalculatorSection } from "@/components/home/CarbonCalculatorSection";
import { FeaturedDestinations } from "@/components/home/FeaturedDestinations";
import { FeaturedTrips } from "@/components/home/FeaturedTrips";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { Introduction } from "@/components/home/Introduction";
import { SustainabilityImpact } from "@/components/home/SustainabilityImpact";
import { TripPlannerSection } from "@/components/home/TripPlannerSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <FeaturedDestinations />
      <FeaturedTrips />
      <TripPlannerSection />
      <CarbonCalculatorSection />
      <SustainabilityImpact />
      <FinalCTA />
    </>
  );
}
