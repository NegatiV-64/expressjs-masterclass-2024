import { z } from "zod";

export const ticketsCreateBodyDtoSchema = z.object({
  ticketQuantity: z
    .string({ required_error: "'ticketQuantity' is required" })
    .transform((value) => Number(value))
    .pipe(z.number().int().positive()),
  ticketPrice: z
    .string({ required_error: "'ticketPrice' is required" })
    .transform((value) => Number(value))
    .pipe(z.number().int().min(0)),
  eventId: z.string({ required_error: "'eventId' is required" }).uuid(),
});

export type TicketsCreateBodyDto = z.infer<typeof ticketsCreateBodyDtoSchema>;
