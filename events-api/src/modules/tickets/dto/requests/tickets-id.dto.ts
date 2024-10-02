import { z } from "zod";

export const ticketsIdDtoSchema = z.object({
    ticketId: z.string().uuid({ message: "Invalid Id" })
});
