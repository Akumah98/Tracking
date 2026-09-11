import { z } from "zod";

export const trackingSearchSchema = z.object({
  query: z
    .string()
    .min(3, "Tracking number must be at least 3 characters")
    .max(50, "Tracking number too long"),
  autoDetect: z.boolean().default(true),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const locationOverrideSchema = z.object({
  shipmentId: z.string().min(1),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  city: z.string().min(2),
});

export const statusResetSchema = z.object({
  shipmentId: z.string().min(1),
  status: z.string().min(1),
  notes: z.string().min(5),
});
