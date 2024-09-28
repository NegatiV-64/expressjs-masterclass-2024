import { EventModel } from "#/modules/events/events.model";
import { TicketModel } from "#/modules/tickets/tickets.model";
import { EventsRepository } from "#/modules/events/events.repository";
import { EventsCreateDto, EventsUpdateDto } from "./dto/requests";

export class EventsService {
    static getEvents(): Promise<EventModel[]> {
        return EventsRepository.getAllEvents();
    }

    static createEvent(event: EventsCreateDto): Promise<EventModel[]> {
        return EventsRepository.createEvent(event);
    }

    static updateEvent(
        eventId: string,
        event: EventsUpdateDto
    ): Promise<EventModel[]> {
        return EventsRepository.updateEvent(eventId, event);
    }

    static deleteEvent(eventId: string): Promise<EventModel[]> {
        return EventsRepository.deleteEvent(eventId);
    }

    static getEventTickets(eventId: string): Promise<TicketModel[]> {
        return EventsRepository.getEventTickets(eventId);
    }
}
