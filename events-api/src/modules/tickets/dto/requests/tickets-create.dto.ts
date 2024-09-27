import { z } from "zod";

export const ticketsCreateDtoSchema = z.object({
  ticketQuantity: z
    .number()
    .int()
    .min(0),
  ticketPrice: z
    .number()
    .min(0),
  eventId: z
    .string()
    .uuid(),
});

export type TicketsCreateDto = z.infer<typeof ticketsCreateDtoSchema>;
