import { z } from 'zod';

export const CreateTicketDtoSchema = z.object({
    ticketQuantity: z.number().int().positive().nonnegative().min(1,"Should be at least one."),
    ticketPrice: z.number().positive("Positive number"),
    eventId: z.string().uuid('Invalid event ID format')
});

export type CreateTicketDto = z.infer<typeof CreateTicketDtoSchema>;
