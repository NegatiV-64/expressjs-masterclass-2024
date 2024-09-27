import { z } from "zod";

export const eventsEventIdDtoSchema = z.object({
    eventId: z
        .string()
        .uuid({ message: "eventId should be uuid" })
});

export type EventsEventIdDto = z.infer<typeof eventsEventIdDtoSchema>;
