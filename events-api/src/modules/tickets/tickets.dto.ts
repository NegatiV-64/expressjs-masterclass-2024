import { z } from "zod";

export const ticketsCreateDtoSchema = z.object({
    eventId: z.string().uuid(),
    ticketQuantity: z.number().int().positive(),
    ticketPrice: z.number().positive(),
});

export type TicketCreateDto = z.infer<typeof ticketsCreateDtoSchema>;