import { z } from "zod";

export const ticketIdDtoSchema = z.object({
  ticketId: z.string().uuid(),
});

export type TicketIdDto = z.infer<typeof ticketIdDtoSchema>;
