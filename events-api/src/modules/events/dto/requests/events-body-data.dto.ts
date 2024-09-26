import { z } from "zod";

export const eventsBodyDataDtoSchema = z.object({
  eventName: z.string(),
  eventDescription: z.string(),
  eventLocation: z.string(),
  eventDate: z.coerce.date(),
});

export type EventsBodyDataDto = z.infer<typeof eventsBodyDataDtoSchema>;
