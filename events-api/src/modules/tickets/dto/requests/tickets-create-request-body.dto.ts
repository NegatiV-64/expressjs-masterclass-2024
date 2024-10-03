import { z } from "zod";

export const ticketsCreateRequestBodyDtoSchema = z
  .object({
    ticketQuantity: z
      .number({ message: "Ticket quantity must be number" })
      .int({ message: "Ticket quantity must be integer" })
      .positive({ message: "Ticket quantity must be positive" }),
    ticketPrice: z
      .number({ message: "Ticket price must be number" })
      .positive({ message: "Ticket price must be positive" }),
    eventId: z.string().uuid({ message: "Event ID is not a valid uuid" }),
  })
  .strict({ message: "Invalid body" });

export type TicketsCreateRequestBodyDto = z.infer<
  typeof ticketsCreateRequestBodyDtoSchema
>;
