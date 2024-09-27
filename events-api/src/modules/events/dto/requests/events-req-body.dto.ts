import { z } from "zod";

export const eventsReqBodyDtoSchema = z.object({
  eventName: z.string().pipe(z.string().min(3).max(255)),
  eventDescription: z.string().pipe(z.string().min(3).max(255)),
  eventLocation: z.string().pipe(z.string().min(3).max(255)),
  eventDate: z.string().pipe(z.string()),
});

export type EventsReqBodyDto = z.infer<typeof eventsReqBodyDtoSchema>;
