import { z } from "zod";

export const eventsUpdateDtoSchema = z.object({
  event_name: z.string().min(3).max(255).optional(),
  event_description: z.string().min(3).max(255).optional(),
  event_location: z.string().min(3).max(255).optional(),
  event_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
    .optional(),
});

export type EventsUpdateDto = z.infer<typeof eventsUpdateDtoSchema>;
