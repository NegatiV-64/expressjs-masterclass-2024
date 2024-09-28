import { EventModel } from "#/modules/events/events.model";
import { EventsRepository } from "#/modules/events/events.repository";
import {TicketModel} from "#/modules/tickets/tickets.model";
import {EventsCreateDto} from "#/modules/events/dto/requests/events-create.dto";
import {notFoundError} from "#/shared/error";

export class EventsService {
  static async getEvents(): Promise<EventModel[]> {
    const events = await EventsRepository.getAll();
    return events;
  }
  static async createEvent(data: EventsCreateDto,): Promise<EventModel[]> {
    const newEvent = await EventsRepository.createEvent(data);

    return newEvent;
  }

  static async getEvent(eventId: string): Promise<EventModel[] | null> {
    const event = await EventsRepository.getById(eventId);

    if (event.length === 0) {
      return null;
    }

    return event;
  }

  static async updateEvent(
      data: EventsCreateDto,
      eventId: string,
  ): Promise<EventModel[] | null> {
    const updatedEvent = await EventsRepository.updateEvent(data, eventId);

    if (updatedEvent.length === 0) {
      throw new notFoundError(`Event not found with ID: ${eventId}`);
    }

    return updatedEvent;
  }

  static async deleteEvent(evevntId: string): Promise<EventModel | EventModel[]> {
    const deletedEvent = await EventsRepository.deleteEvent(evevntId);

    if (!deletedEvent) {
      throw new notFoundError("Not found with ID " + evevntId)
    }

    return deletedEvent;
  }

  static async getTickets(eventId: string): Promise<TicketModel[]> {
    return await EventsRepository.getAllTickets(eventId)
  }
}
