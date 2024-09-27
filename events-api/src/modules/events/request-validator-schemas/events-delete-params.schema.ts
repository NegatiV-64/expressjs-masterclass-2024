import { z } from "zod";

export const eventsDeleteParamsDtoSchema = z.object({
  eventId: z.string().uuid({ message: "eventId should be uuid" }),
});

export type EventsDeleteParamsDto = z.infer<typeof eventsDeleteParamsDtoSchema>;
