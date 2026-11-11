import type { DestinationId, TripId } from "@/types";

/**
 * Local photographs of Algeria, saved from Wikimedia Commons.
 * Ghardaïa: Ksar Tafilelt in the M'Zab. Tassili, Djurdjura, Taghit, and Assekrem are labeled as such by their photographers.
 */
export const destinations: Array<{
  id: DestinationId;
  image: string;
  position: string;
  className: string;
}> = [
  {
    id: "ghardaia",
    image: "/images/ghardaia.jpg",
    position: "center",
    className: "lg:col-span-7 min-h-[28rem] lg:min-h-[36rem]",
  },
  {
    id: "tassili",
    image: "/images/tassili.jpg",
    position: "center",
    className: "lg:col-span-5 min-h-[28rem] lg:min-h-[36rem]",
  },
  {
    id: "djurdjura",
    image: "/images/djurdjura.jpg",
    position: "center",
    className: "lg:col-span-5 min-h-[26rem] lg:min-h-[32rem]",
  },
  {
    id: "taghit",
    image: "/images/taghit.jpg",
    position: "center 42%",
    className: "lg:col-span-7 min-h-[26rem] lg:min-h-[32rem]",
  },
];

export const trips: Array<{
  id: TripId;
  image: string;
  position: string;
  days: number;
  price: number;
}> = [
  {
    id: "mzab",
    image: "/images/lodge.jpg",
    position: "center",
    days: 5,
    price: 48500,
  },
  {
    id: "tassili",
    image: "/images/tassili.jpg",
    position: "center",
    days: 7,
    price: 96000,
  },
  {
    id: "djurdjura",
    image: "/images/djurdjura.jpg",
    position: "center",
    days: 4,
    price: 37200,
  },
];

export const impactImages = [
  { src: "/images/tassili.jpg", position: "center" },
  { src: "/images/lodge.jpg", position: "center" },
  { src: "/images/planner.jpg", position: "center" },
] as const;

export const contact = {
  email: "hello@azul.travel",
  phone: "+213 21 00 00 00",
  year: 2026,
};
