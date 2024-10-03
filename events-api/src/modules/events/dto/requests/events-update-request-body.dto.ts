import { eventDateRegex } from "#/shared/constants/eventDateRegex";
import { z } from "zod";

export const eventsUpdateRequestBodyDtoSchema = z.object({
  eventName: z.string().max(70, { message: "Max length is 70" }).optional(),
  eventDescription: z
    .string()
    .max(1000, { message: "Max length is 1000" })
    .optional(),
  eventLocation: z.string().max(70, { message: "Max length is 70" }).optional(),
  eventDate: z
    .string()
    .regex(eventDateRegex, {
      message: "Date must match YYYY-MM-DDTHH:mm format",
    })
    .optional(),
});

export type EventsUpdateRequestBodyDto = z.infer<
  typeof eventsUpdateRequestBodyDtoSchema
>;
