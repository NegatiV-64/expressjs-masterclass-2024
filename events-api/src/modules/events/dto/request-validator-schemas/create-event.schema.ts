import { z } from "zod";

export const createEventDtoSchema = z.object({
  eventName: z.string({ message: "Event name is required" }),
  eventDescription: z.string({ message: "Event description is required" }),
  eventLocation: z.string({ message: "Event location is required" }),
  eventDate: z.string({ message: "Event date is required" }),
});

export type EventsCreateSchemaDto = z.infer<typeof createEventDtoSchema>;
