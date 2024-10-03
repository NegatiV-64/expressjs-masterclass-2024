import { eventDateRegex } from "#/shared/constants/eventDateRegex";
import { z } from "zod";

export const eventsCreateRequestBodyDtoSchema = z
  .object({
    eventName: z
      .string({ message: "Name is required" })
      .min(1, { message: "Name is required" })
      .max(70, { message: "Max length is 70" }),
    eventDescription: z
      .string({ message: "Description is required" })
      .min(1, { message: "Description is required" })
      .max(1000, { message: "Max length is 1000" }),
    eventLocation: z
      .string({ message: "Location is required" })
      .min(1, { message: "Location is required" })
      .max(70, { message: "Max length is 70" }),
    eventDate: z
      .string({ message: "Date is required" })
      .min(1, { message: "Date is required" })
      .regex(eventDateRegex, {
        message: "Date must match YYYY-MM-DDTHH:mm format",
      }),
  })
  .strict({ message: "Invalid body" });

export type EventsCreateRequestBodyDto = z.infer<
  typeof eventsCreateRequestBodyDtoSchema
>;
