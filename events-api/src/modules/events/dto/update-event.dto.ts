import { CreateEventDto } from "./create-event.dto";

export interface UpdateEventDto extends Partial<CreateEventDto> { }