import { CarbonCalculator } from "@/components/carbon/CarbonCalculator";
import { getEmissionFactors } from "@/lib/data";

export const instant = false;

export const metadata = {
  title: "Carbon calculator",
  description: "Compare journey emissions using editable emission factors.",
};

export default async function CarbonPage() {
  const factors = await getEmissionFactors();
  return <CarbonCalculator factors={factors} />;
}
