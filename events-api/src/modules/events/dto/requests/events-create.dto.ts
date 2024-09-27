import { z } from "zod";

export const eventsCreateBodyDtoSchema = z.object({
  eventName: z.string().min(1),
  eventDescription: z.string(),
  eventLocation: z.string().min(1),
  eventDate: z.string().refine((date) => {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(date);
  }, "Invalid date format"),
});

export type EventsCreateBodyDto = z.infer<typeof eventsCreateBodyDtoSchema>;
