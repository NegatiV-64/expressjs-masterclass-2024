import { string, z } from "zod";

export const eventsUpdateDtoSchema = z.object({
  eventName: z.string().optional(),
  eventDescription: z.string().optional(),
  eventLocation: z.string().optional(),
  eventDate: z.coerce.date().pipe(string()).optional(),
});

export type EventsUpdateDto = z.infer<typeof eventsUpdateDtoSchema>;

export const eventIDSchema = z.string().uuid();