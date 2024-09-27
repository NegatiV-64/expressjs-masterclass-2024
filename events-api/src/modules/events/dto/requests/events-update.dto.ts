import { datetimeRegex } from '#/shared/constants/dto.constants';
import { z } from "zod";

export const eventUpdateDtoSchema = z.object({
  event_name: z
    .string()
    .min(3)
    .max(80)
    .optional(),
  event_description: z
    .string()
    .min(3)
    .max(255)
    .optional(),
  event_location: z
    .string()
    .optional(),
  event_date: z
    .string()
    .regex(datetimeRegex,
    'You must add datetime in this format: YYYY-MM-DDTHH:mm')
    .optional(),
});

export type EventUpdateDto = z.infer<typeof eventUpdateDtoSchema>;
