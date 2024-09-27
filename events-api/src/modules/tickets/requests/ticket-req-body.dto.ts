import { z } from "zod";

export const ticketReqBodyDtoSchema = z.object({
  ticketQuantity: z.number().int().positive(),
  ticketPrice: z.number().positive(),
  eventId: z.string().pipe(z.string().min(3).max(255)),
});

export type TicketReqBodyDto = z.infer<typeof ticketReqBodyDtoSchema>;
