import { z } from "zod";

export const ticketsCreateRequestBodyDtoSchema = z.object({
  ticketQuantity: z
    .number()
    .int({ message: "Ticket quantity must be integer" })
    .positive({ message: "Ticket quantity must be positive" }),
  ticketPrice: z
    .number()
    .positive({ message: "Ticket price must be positive" }),
  eventId: z.string().uuid({ message: "Event ID is not a valid uuid" }),
});

export type ticketsCreateRequestBodyDto = z.infer<
  typeof ticketsCreateRequestBodyDtoSchema
>;
