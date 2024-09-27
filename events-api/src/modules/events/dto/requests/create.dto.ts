import { z } from "zod";

export const dateFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;

export const eventsCreateDtoSchema = z.object({
  eventName: z.string().min(3).max(255),
  eventDescription: z.string().min(3).max(255),
  eventLocation: z.string().min(3).max(255),
  eventDate: z.string().regex(dateFormatRegex, {
    message: "Invalid date format, expected 'YYYY-MM-DDTHH:mm:ss'",
  }),
});

export type EventCreateDto = z.infer<typeof eventsCreateDtoSchema>;