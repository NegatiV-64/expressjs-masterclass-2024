import { z } from "zod";
import { dateFormatRegex } from "#/shared/constants";

export const eventsUpdateDtoSchema = z.object({
  event_name: z.string().min(3).max(255).optional(),
  event_description: z.string().min(3).max(255).optional(),
  event_location: z.string().min(3).max(255).optional(),
  event_date: z
    .string()
    .regex(dateFormatRegex, {
      message: "Invalid date format, expected 'YYYY-MM-DDTHH:mm:ss'",
    })
    .optional(),
});

export type EventsUpdateDto = z.infer<typeof eventsUpdateDtoSchema>;
