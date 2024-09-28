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
        .regex(
            /^(19|20)\d\d-(0[1-9]|1[012])-([012]\d|3[01])T([01]\d|2[0-3]):([0-5]\d)?/,
            { message: "Date must match YYYY-MM-DDTHH:mm format" },
        ),
});

export type EventsCreateDto = z.infer<
    typeof eventsCreateRequestBodyDtoSchema
>;