import { z } from "zod";
import { dateTimeRegex } from "#/shared/constants";

export const eventsUpdateDtoSchema = z.object({
    eventName: z.string().min(2).max(255).optional(),
    eventDescription: z.string().min(10).max(1000).optional(),
    eventLocation: z.string().min(5).max(255).optional(),
    eventDate: z
        .string()
        .regex(dateTimeRegex, { message: "Invalid Date Format" })
        .optional()
});

export type EventsUpdateDto = z.infer<typeof eventsUpdateDtoSchema>;
