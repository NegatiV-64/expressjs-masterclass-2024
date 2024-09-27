import { z } from "zod";
import { datetimeRegex } from "#/shared/constants/dto.constants";

export const eventCreateDtoSchema = z.object({
  eventName: z
    .string()
    .min(3)
    .max(80),
  eventDescription: z
    .string()
    .min(3)
    .max(255),
  eventLocation: z
    .string(),
  eventDate: z
    .string()
    .regex(datetimeRegex,
    'You must add datetime in this format: YYYY-MM-DDTHH:mm'),
    // .datetime(),
});

export type EventCreateDto = z.infer<typeof eventCreateDtoSchema>;
