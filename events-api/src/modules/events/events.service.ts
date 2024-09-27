import { EventModel } from "#/modules/events/events.model";
import { EventsRepository } from "#/modules/events/events.repository";
import { TicketModel } from "../tickets/tickets.model";
import { eventsCreateRequestBodyDto } from "./dto/requests/events-create-request-body.dto";
import { eventsUpdateRequestBodyDto } from "./dto/requests/events-update-request-body.dto";

export class EventsService {
  static async getEvents(): Promise<EventModel[]> {
    const events = await EventsRepository.getAll();

    return events;
  }

  static async createEvent(
    data: eventsCreateRequestBodyDto,
  ): Promise<EventModel[]> {
    const newEvent = await EventsRepository.createOne(data);

    return newEvent;
  }

  static async getEvent(id: string): Promise<EventModel[] | null> {
    const event = await EventsRepository.getOne(id);

    if (event.length === 0) {
      return null;
    }

    return event;
  }

  static async updateEvent(
    data: eventsUpdateRequestBodyDto,
    id: string,
  ): Promise<EventModel[] | null> {
    const updatedEvent = await EventsRepository.updateOne(data, id);

    if (updatedEvent.length === 0) {
      return null;
    }

    return updatedEvent;
  }

  static async deleteEvent(id: string): Promise<EventModel[] | null> {
    const deletedEvent = await EventsRepository.deleteOne(id);

    if (deletedEvent.length === 0) {
      return null;
    }

    return deletedEvent;
  }

  static async getTickets(eventId: string): Promise<TicketModel[] | null> {
    const event = await EventsRepository.getOne(eventId);

    if (event.length === 0) {
      return null;
    }

    const tickets = await EventsRepository.getAllTickets(eventId);

    return tickets;
  }
}
