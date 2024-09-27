import { z } from "zod";

export const ticketsCreateDtoSchema = z.object({
  ticketQuantity: z.number().int().positive(),
  ticketPrice: z.number().positive(),
  eventId: z.string().uuid(),
});

export type TicketsCreateDto = z.infer<typeof ticketsCreateDtoSchema>;
