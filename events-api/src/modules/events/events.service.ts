import { EventModel } from "#/modules/events/events.model";
import { TicketModel } from "#/modules/tickets/tickets.model";
import { EventsRepository } from "#/modules/events/events.repository";
import { EventsCreateDto, EventsUpdateDto } from "./dto/requests";

export class EventsService {
    static getEvents(): Promise<EventModel[]> {
        return EventsRepository.getAllEvents();
    }

    static createEvent(event: EventsCreateDto): Promise<EventModel> {
        return EventsRepository.createEvent(event);
    }

    static async updateEvent(
        eventId: string,
        event: EventsUpdateDto
    ): Promise<EventModel> {
        await EventsRepository.getEvent(eventId);

        return EventsRepository.updateEvent(eventId, event);
    }

    static async deleteEvent(eventId: string): Promise<EventModel> {
        await EventsRepository.getEvent(eventId);

        return EventsRepository.deleteEvent(eventId);
    }

    static async getEventTickets(eventId: string): Promise<TicketModel[]> {
        await EventsRepository.getEvent(eventId);

        return EventsRepository.getEventTickets(eventId);
    }
}
