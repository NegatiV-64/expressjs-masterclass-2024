import { DateFormat } from "#/shared/constants/time.constant";
import { time } from "#/shared/libs";
import { z } from "zod";

export const createEventDtoSchema = z.object({
  eventName: z.string().min(3).max(255),
  eventDescription: z.string().min(3).max(255),
  eventLocation: z.string().min(3).max(255),
  eventDate: z.string().refine(
    (value) => {
      const parsedDate = time(value, DateFormat.DateTime, true);
      return parsedDate.isValid();
    },
    { message: `Invalid date format. Please use ${DateFormat.DateTime}` }
  ),
});

export type CreateEventDto = z.infer<typeof createEventDtoSchema>;
