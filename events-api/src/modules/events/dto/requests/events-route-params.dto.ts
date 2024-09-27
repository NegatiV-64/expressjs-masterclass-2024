import { z } from "zod";

export const eventsRouteParamsDtoSchema = z.object({
  id: z
    .string().uuid()
});

export type EventsRouteParamsDto = z.infer<typeof eventsRouteParamsDtoSchema>;
