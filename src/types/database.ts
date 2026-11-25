import type { LocalizedString } from "@/lib/i18n-content";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "rejected"
  | "cancelled"
  | "completed";

export type AccommodationType = "guesthouse" | "eco_camp" | "green_hotel";

export type Destination = {
  id: string;
  slug: string;
  wilaya: string;
  location: LocalizedString;
  name: LocalizedString;
  description: LocalizedString;
  long_description: LocalizedString;
  activities: LocalizedString[];
  accommodations: LocalizedString[];
  cover_image: string;
  published: boolean;
  sort_order: number;
  images?: DestinationImage[];
};

export type DestinationImage = {
  id: string;
  destination_id: string;
  url: string;
  alt: LocalizedString;
  sort_order: number;
};

export type Trip = {
  id: string;
  slug: string;
  destination_id: string;
  name: LocalizedString;
  description: LocalizedString;
  long_description: LocalizedString;
  duration_days: number;
  base_price_dzd: number;
  accommodation_label: LocalizedString;
  category: LocalizedString;
  image_url: string;
  activities: LocalizedString[];
  itinerary?: LocalizedString[];
  published: boolean;
  sort_order: number;
  destination?: Destination | null;
};

export type EmissionFactorView = {
  id: string;
  code: string;
  name: LocalizedString;
  description: LocalizedString;
  kg_per_km: number;
  active: boolean;
  sort_order: number;
};

export type Accommodation = {
  id: string;
  code: string;
  type: AccommodationType;
  name: LocalizedString;
  description: LocalizedString;
  price_per_night_dzd: number;
  destination_id: string | null;
  active: boolean;
};

export type Activity = {
  id: string;
  code: string;
  name: LocalizedString;
  description: LocalizedString;
  price_dzd: number;
  active: boolean;
};

export type TransportOption = {
  id: string;
  code: string;
  name: LocalizedString;
  description: LocalizedString;
  price_dzd: number;
  emission_kg_per_km: number;
  for_planner: boolean;
  for_carbon: boolean;
  active: boolean;
};

export type Booking = {
  id: string;
  reference: string;
  status: BookingStatus;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  trip_id: string | null;
  destination_id: string | null;
  planner_payload: Record<string, unknown>;
  travelers: number;
  nights: number;
  travel_date: string;
  estimated_total_dzd: number;
  notes: string | null;
  created_at: string;
  survey?: SurveyResponse | null;
};

export type SurveyResponse = {
  id: string;
  booking_id: string;
  preferred_transport: string;
  preferred_accommodation: string;
  interest_eco_activities: boolean;
  environmental_awareness: number;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  message: string;
  status: "new" | "read" | "archived";
  created_at: string;
};

export type PlannerPayload = {
  destinationId: string;
  destinationSlug: string;
  accommodationCode: string;
  activityCodes: string[];
  transportCode: string;
  travelers: number;
  nights: number;
  travelDate: string;
  quote: {
    accommodationTotal: number;
    activitiesTotal: number;
    transportTotal: number;
    total: number;
  };
};
