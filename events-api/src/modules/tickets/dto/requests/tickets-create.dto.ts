import { z } from "zod";

export const ticketsCreateDtoSchema = z.object({
    ticketQuantity: z.number().int().positive(),
    ticketPrice: z.number().positive(),
    eventId: z.string().uuid({ message: "Invalid Event Id" })
});

export type TicketsCreateDto = z.infer<typeof ticketsCreateDtoSchema>;
