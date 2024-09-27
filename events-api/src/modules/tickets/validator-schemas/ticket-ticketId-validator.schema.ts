import { z } from "zod";

export const validateTicketIdDtoSchema = z.object({
    ticketId: z.string({ message: "ticketId is required" })
        .uuid("ticketId should be uuid"),
});

export type ValidateTicketIdDto = z.infer<typeof validateTicketIdDtoSchema>;
