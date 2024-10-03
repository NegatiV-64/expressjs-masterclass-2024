import { EventModel } from "#/modules/events/events.model";
import { EventsRepository } from "#/modules/events/events.repository";
import { CustomError } from "#/shared/errors/custom-error";
import { TicketModel } from "../tickets/tickets.model";
import { EventsCreateRequestBodyDto } from "./dto/requests/events-create-request-body.dto";
import { EventsUpdateRequestBodyDto } from "./dto/requests/events-update-request-body.dto";

export class EventsService {
  static async getEvents(): Promise<EventModel[]> {
    const events = await EventsRepository.getAll();

    return events;
  }

  static async createEvent(
    data: EventsCreateRequestBodyDto,
  ): Promise<EventModel> {
    const [newEvent] = await EventsRepository.createOne(data);

    if (!newEvent) {
      throw new CustomError({
        message: "Bad Request",
        statusCode: 400,
      });
    }

    return newEvent;
  }

  static async getEvent(id: string): Promise<EventModel> {
    const [event] = await EventsRepository.getOne(id);

    if (!event) {
      throw new CustomError({
        message: "Event with that id does not exist",
        statusCode: 404,
      });
    }

    return event;
  }

  static async updateEvent(
    data: EventsUpdateRequestBodyDto,
    id: string,
  ): Promise<EventModel> {
    const [updatedEvent] = await EventsRepository.updateOne(data, id);

    if (!updatedEvent) {
      throw new CustomError({
        message: "Event with that id does not exist",
        statusCode: 404,
      });
    }

    return updatedEvent;
  }

  static async deleteEvent(id: string): Promise<EventModel> {
    const [deletedEvent] = await EventsRepository.deleteOne(id);

    if (!deletedEvent) {
      throw new CustomError({
        message: "Event with that id does not exist",
        statusCode: 404,
      });
    }

    return deletedEvent;
  }

  static async getTickets(eventId: string): Promise<TicketModel[]> {
    const tickets = await EventsRepository.getAllTickets(eventId);

    if (tickets.length === 0) {
      throw new CustomError({
        message: "Event with that id does not exist",
        statusCode: 404,
      });
    }

    return tickets;
  }
}
