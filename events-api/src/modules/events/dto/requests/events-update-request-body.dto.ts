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
    .regex(
      /^(19|20)\d\d-(0[1-9]|1[012])-([012]\d|3[01])T([01]\d|2[0-3]):([0-5]\d)?/,
      { message: "Date must match YYYY-MM-DDTHH:mm format" },
    )
    .optional(),
});

export type eventsUpdateRequestBodyDto = z.infer<
  typeof eventsUpdateRequestBodyDtoSchema
>;
