import { z } from "zod";

export const ticketsRouteParamsDtoSchema = z.object({
  id: z
    .string().uuid()
});

export type TicketsRouteParamsDto = z.infer<typeof ticketsRouteParamsDtoSchema>;
