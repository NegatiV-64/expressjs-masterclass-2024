import { z } from "zod";
export const eventsSearchParamsDtoSchema = z.object({
  page: z
    .string()
    .transform((value) => Number(value))
    .pipe(z.number().int().positive()),
  limit: z
    .string()
    .transform((value) => Number(value))
    .pipe(z.number().int().positive().max(1000)),
});
export const eventsCreatingSchema = z.object({
  eventName: z.string().min(1, {message: "Event name is Required."}),
  eventDescription: z.string().min(1, {message: "Event Desc is Required."}),
  eventLocation: z.string().min(1, {message: "Event Location is Required."}),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,{message: "Event Location is Required and must be in YYY-MM-DDTHH:mm format"}),
})
export const eventsUpdateSchema = z.object({
  eventName: z.string().optional(),
  eventDescription: z.string().optional(),
  eventLocation: z.string().optional(),
  eventDate: z.string().optional(),
})
export const eventsRouteSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID" }),
});

export type EventRouteDto = z.infer<typeof eventsRouteSchema>;
export type EventUpdateDto = z.infer<typeof eventsUpdateSchema>
export type EventCreatingDto = z.infer<typeof eventsSearchParamsDtoSchema>;
export type EventSearchDto = z.infer<typeof eventsSearchParamsDtoSchema>;
