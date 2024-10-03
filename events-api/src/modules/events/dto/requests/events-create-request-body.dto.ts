import { eventDateRegex } from "#/shared/constants/eventDateRegex";
import { z } from "zod";

export const eventsCreateRequestBodyDtoSchema = z.object({
  eventName: z
    .string()
    .min(1, { message: "Name is required" })
    .max(70, { message: "Max length is 70" }),
  eventDescription: z
    .string()
    .min(1, { message: "Description is required" })
    .max(1000, { message: "Max length is 1000" }),
  eventLocation: z
    .string()
    .min(1, { message: "Location is required" })
    .max(70, { message: "Max length is 70" }),
  eventDate: z
    .string()
    .min(1, { message: "Date is required" })
    .regex(eventDateRegex, {
      message: "Date must match YYYY-MM-DDTHH:mm format",
    }),
});

export type EventsCreateRequestBodyDto = z.infer<
  typeof eventsCreateRequestBodyDtoSchema
>;
