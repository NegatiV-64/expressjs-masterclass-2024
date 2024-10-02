import { z } from "zod";

export const ticketsIdDtoSchema = z.object({
    eventId: z.string().uuid({ message: "Invalid Id" })
});
