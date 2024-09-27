import { z } from "zod";
import { dateFormatRegex } from "#/shared/constants";

export const eventsCreateDtoSchema = z.object({
  eventName: z.string().min(3).max(255),
  eventDescription: z.string().min(3).max(255),
  eventLocation: z.string().min(3).max(255),
  eventDate: z.string().regex(dateFormatRegex, {
    message: "Invalid date format, expected 'YYYY-MM-DDTHH:mm:ss'",
  }),
});

export type EventCreateDto = z.infer<typeof eventsCreateDtoSchema>;
