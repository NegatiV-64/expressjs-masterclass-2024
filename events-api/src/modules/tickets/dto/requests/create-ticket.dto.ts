import { z } from "zod";

export const createTicketDtoSchema = z.object({
  ticketQuantity: z.number().int().positive(),
  ticketPrice: z.number().positive(),
  eventId: z.string().uuid(),
});

export type CreateTicketDto = z.infer<typeof createTicketDtoSchema>;
