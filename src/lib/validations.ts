import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(4000),
});

export const bookingSurveySchema = z.object({
  preferredTransport: z.string().trim().min(1).max(80),
  preferredAccommodation: z.string().trim().min(1).max(80),
  interestEcoActivities: z.boolean(),
  environmentalAwareness: z.number().int().min(1).max(5),
});

export const bookingSchema = z.object({
  customerName: z.string().trim().min(2).max(120),
  customerPhone: z.string().trim().min(6).max(40),
  customerEmail: z.string().trim().email().max(160),
  destinationId: z.string().trim().min(1).optional().nullable(),
  tripId: z.string().trim().min(1).optional().nullable(),
  accommodationId: z.string().trim().min(1).optional().nullable(),
  transportId: z.string().trim().min(1).optional().nullable(),
  activityIds: z.array(z.string().trim().min(1)).default([]),
  travelers: z.number().int().min(1).max(40),
  nights: z.number().int().min(1).max(60),
  travelDate: z.string().trim().min(8),
  estimatedTotalDzd: z.number().min(0),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  plannerPayload: z.record(z.string(), z.unknown()).default({}),
  survey: bookingSurveySchema,
});

export const carbonSchema = z.object({
  code: z.string().trim().min(1),
  distanceKm: z.number().positive().max(20000),
  passengers: z.number().int().min(1).max(100),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type CarbonInput = z.infer<typeof carbonSchema>;
