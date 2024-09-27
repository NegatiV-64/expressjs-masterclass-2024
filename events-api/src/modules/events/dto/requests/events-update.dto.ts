import { z } from "zod";

export const eventsUpdateBodyDtoSchema = z.object({
  eventName: z.string().min(1).optional(),
  eventDescription: z.string().optional(),
  eventLocation: z.string().min(1).optional(),
  eventDate: z
    .string()
    .refine((date) => {
      return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(date);
    }, "Invalid date format")
    .optional(),
});

export type EventsUpdateBodyDto = z.infer<typeof eventsUpdateBodyDtoSchema>;
