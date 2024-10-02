import { z } from "zod";

export const eventsIdDtoSchema = z.object({
    eventId: z.string().uuid({ message: "Invalid Id" })
});
