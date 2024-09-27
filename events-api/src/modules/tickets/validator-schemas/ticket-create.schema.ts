import { z } from "zod";

export const createTicketDtoSchema = z.object({
    ticketQuantity: z.number({ message: "Ticket quantity is required" }),
    ticketPrice: z.number({ message: "Ticket price is required" }),
    eventId: z.string({ message: "Event id is required" }).uuid("Event id should be uuid"),
});

export type TicketCreateSchemaDto = z.infer<typeof createTicketDtoSchema>;
