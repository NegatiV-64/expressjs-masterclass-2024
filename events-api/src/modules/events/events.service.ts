import {
  EventCreateDto,
  EventModel,
  EventUpdateDto,
} from "#/modules/events/events.model";
import { EventsRepository } from "#/modules/events/events.repository";
import { TicketModel } from "../tickets/tickets.model";

export class EventsService {
  static async getEvents(): Promise<EventModel[]> {
    const events = await EventsRepository.getAll();

    return events;
  }

  static async getEventTickets(eventId: string): Promise<TicketModel[]> {
    const tickets = await EventsRepository.getEventTickets(eventId);

    return tickets;
  }

  static async createEvent(event: EventCreateDto): Promise<EventModel> {
    const createdEvent = await EventsRepository.createEvent(event);

    return createdEvent;
  }

  static async updateEvent(
    eventId: string,
    event: EventUpdateDto
  ): Promise<EventModel> {
    const updatedEvent = await EventsRepository.updateEvent(eventId, event);

    return updatedEvent;
  }

  static async deleteEvent(eventId: string): Promise<void> {
    await EventsRepository.deleteEvent(eventId);
  }
}
