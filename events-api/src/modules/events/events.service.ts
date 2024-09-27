import { EventModel } from "#/modules/events/events.model";
import { EventsRepository } from "#/modules/events/events.repository";
import { EventsCreateDto } from "./dto/requests";

export class EventsService {
    static getEvents(): Promise<EventModel[]> {
        return EventsRepository.getAll();
    }

    static createEvent(event: EventsCreateDto): Promise<EventModel[]> {
        return EventsRepository.createEvent(event);
    }
}
