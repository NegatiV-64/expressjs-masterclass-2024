import { z } from "zod";

export const eventsRouteParamsDtoSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID" }),
});

export type EventRouteParamsDto = z.infer<typeof eventsRouteParamsDtoSchema>;
