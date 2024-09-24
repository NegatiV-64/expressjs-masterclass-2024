import { EventModel } from "#/modules/events/events.model";
import { EventsRepository } from "#/modules/events/events.repository";
import { EventCreateDto } from "./dto/requests/events-create.dto";

export class EventsService {
  static async getEvents(): Promise<EventModel[]> {
    const events = await EventsRepository.getAll();

    return events;
  }

  static async createEvent(newEvent: EventCreateDto): Promise<void> {
    await EventsRepository.create(newEvent);
  }

  static async updateEvent(
    event: EventCreateDto,
    id: string
  ): Promise<null | unknown> {
    return await EventsRepository.update(event, id);
  }

  static async deleteEvent(id: string): Promise<null | unknown> {
    return await EventsRepository.delete(id);
  }
}
