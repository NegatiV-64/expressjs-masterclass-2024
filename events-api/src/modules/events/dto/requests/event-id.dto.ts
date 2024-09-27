import { z } from "zod";

export const eventsIdDtoSchema = z.object({
  eventId: z.string().uuid(),
});

export type EventsIdDto = z.infer<typeof eventsIdDtoSchema>;
