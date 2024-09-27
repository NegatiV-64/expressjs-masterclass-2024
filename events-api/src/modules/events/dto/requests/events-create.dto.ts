import { z } from "zod";

export const eventsCreateBodyDtoSchema = z.object({
  eventName: z.string({ required_error: "'eventName' is required" }).min(1),
  eventDescription: z.string({
    required_error: "'eventDescription' is required",
  }),
  eventLocation: z
    .string({ required_error: "'eventLocation' is required" })
    .min(1),
  eventDate: z
    .string({ required_error: "'eventDate' is required" })
    .refine((date) => {
      return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(date);
    }, "Invalid date format"),
});

export type EventsCreateBodyDto = z.infer<typeof eventsCreateBodyDtoSchema>;
