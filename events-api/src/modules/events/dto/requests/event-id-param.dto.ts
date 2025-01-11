import { z } from "zod";

export const eventIdParamDtoSchema = z.object({
  eventId: z.string().uuid(),
});

export type EventIdParamDto = z.infer<typeof eventIdParamDtoSchema>;
