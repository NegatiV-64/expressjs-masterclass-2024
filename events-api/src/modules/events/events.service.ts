import { EventModel, NewEvent } from "#/modules/events/events.model";
import { EventsRepository } from "#/modules/events/events.repository";
import { TicketModel } from "../tickets/tickets.model";

export class EventsService {
  static async getEvents(): Promise<EventModel[]> {
    const events = await EventsRepository.getAll();

    return events;
  }

  static async getOneEvent(eventId: string): Promise<EventModel[]> {
    const events = await EventsRepository.getOne(eventId);

    return events;
  }

  static async createEvent(eventData: NewEvent): Promise<EventModel[]> {
    const newEvent = await EventsRepository.create(eventData);

    return newEvent;
  }

  static async updateEvent(
    eventId: string,
    newData: Partial<NewEvent>
  ): Promise<EventModel> {
    const updatedEventEvent = await EventsRepository.update(eventId, newData);

    return updatedEventEvent;
  }

  static async deleteEvent(eventId: string): Promise<EventModel[]> {
    const deletedEvent = await EventsRepository.delete(eventId);

    return deletedEvent;
  }

  static async getTicketsOfEvent(eventId: string): Promise<TicketModel[]> {
    const tickets = await EventsRepository.getTickets(eventId);

    return tickets;
  }
}
