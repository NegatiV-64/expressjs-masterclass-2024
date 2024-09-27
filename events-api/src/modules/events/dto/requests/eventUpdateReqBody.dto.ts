import { z } from "zod";

export const eventsUpdateReqBodyDtoSchema = z.object({
  eventName: z.string().min(3).max(255).nullable().optional(),
  eventDescription: z.string().min(3).max(255).nullable().optional(),
  eventLocation: z.string().min(3).max(255).nullable().optional(),
  eventDate: z.string().nullable().optional(),
});

export type EventsUpdateReqBodyDto = z.infer<
  typeof eventsUpdateReqBodyDtoSchema
>;
