import type { Metadata } from "next";
import { Placeholder } from "@/components/layout/Placeholder";

export const metadata: Metadata = {
  title: "Coming soon",
  description: "This section of Azul will be designed in a later release.",
  robots: { index: false, follow: false },
};

export default function FuturePage() {
  return <Placeholder />;
}
