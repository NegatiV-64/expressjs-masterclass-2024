import { EventModel } from "#/modules/events/events.model";
import { EventsRepository } from "#/modules/events/events.repository";
import { NotFoundError } from "#/shared/errors/notFoundError";
import { TicketModel } from "../tickets/tickets.model";
import { EventCreateDto } from "./dto/requests/events-create.dto";

export class EventsService {
  static async getEvents(): Promise<EventModel[]> {
    const events = await EventsRepository.getAll();

    return events;
  }

  static async createEvent(newEvent: EventCreateDto): Promise<EventModel[]> {
    return await EventsRepository.create(newEvent);
  }

  static async updateEvent(
    event: EventCreateDto,
    id: string
  ): Promise<EventModel | []> {
    const res = await EventsRepository.update(event, id);

    if (Array.isArray(res) && res.length === 0) {
      throw new NotFoundError(`Event with ID ${id} not found`);
    }

    return res;
  }

  static async deleteEvent(id: string): Promise<EventModel | EventModel[]> {
    const res = await EventsRepository.delete(id);
    if (Array.isArray(res) && res.length === 0) {
      throw new NotFoundError(`Event with ID ${id} not found`);
    }
    return res;
  }

  static async getTicketsForEvent(id: string): Promise<TicketModel[]> {
    return await EventsRepository.getAllTickets(id);
  }
}
