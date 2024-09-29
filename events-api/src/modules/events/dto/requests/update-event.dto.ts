import { DateFormat } from "#/shared/constants";
import { time } from "#/shared/libs";
import { z } from "zod";

export const updateEventSchema = z
  .object({
    eventName: z.string().min(3).max(255).optional(),
    eventDescription: z.string().min(3).max(255).optional(),
    eventLocation: z.string().min(3).max(255).optional(),
    eventDate: z
      .string()
      .refine(
        (value) => {
          const parsedDate = time(value, DateFormat.DateTime, true);
          return parsedDate.isValid();
        },
        { message: `Invalid date format. Please use ${DateFormat.DateTime}` }
      )
      .optional(),
  })
  .refine(
    (value) => {
      return Object.keys(value).length > 0;
    },
    {
      message: "At least one field is required to update an event",
    }
  );

export type UpdateEventDto = z.infer<typeof updateEventSchema>;
