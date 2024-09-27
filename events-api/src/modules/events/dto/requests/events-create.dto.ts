import { z } from "zod";
import { dateTimeRegex } from "#/shared/constants";

export const eventsCreateDtoSchema = z.object({
    eventName: z.string().min(2).max(255),
    eventDescription: z.string().min(10).max(1000),
    eventLocation: z.string().min(5).max(255),
    eventDate: z
        .string()
        .regex(dateTimeRegex, { message: "Invalid Date Format" })
});

export type EventsCreateDto = z.infer<typeof eventsCreateDtoSchema>;
