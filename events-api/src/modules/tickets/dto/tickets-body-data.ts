import { z } from "zod";

export const ticketsBodyDataDtoSchema = z.object({
    ticketQuantity: z.number().int().positive(),
    ticketPrice: z.number().positive(),
    eventId: z.string().uuid()
});

export type TicketsBodyDataDto = z.infer<typeof ticketsBodyDataDtoSchema>;
