import { datetimeRegex } from '#/shared/constants/dto.constants';
import { z } from "zod";

export const eventUpdateDtoSchema = z.object({
  eventName: z
    .string()
    .min(3)
    .max(80)
    .optional(),
  eventDescription: z
    .string()
    .min(3)
    .max(255)
    .optional(),
  eventLocation: z
    .string()
    .optional(),
  eventDate: z
    .string()
    .regex(datetimeRegex,
    'You must add datetime in this format: YYYY-MM-DDTHH:mm')
    .optional(),
});

export type EventUpdateDto = z.infer<typeof eventUpdateDtoSchema>;
