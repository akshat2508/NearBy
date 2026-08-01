import { z } from "zod";

export const updateLocationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  isDiscoverable: z.boolean().optional(),
});

export const nearbyQuerySchema = z.object({
  radiusKm: z.coerce.number().min(0.1).max(100).default(5),
});

export const visibilitySchema = z.object({
  isDiscoverable: z.boolean(),
});
