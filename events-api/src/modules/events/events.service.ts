import { EventModel } from "#/modules/events/events.model";
import { EventsRepository } from "#/modules/events/events.repository";
import { CreateEventDto } from "./dto/create-event.dto";

export class EventsService {
  static async getEvents(): Promise<EventModel[]> {
    const events = await EventsRepository.getAll();

    return events;
  }

  static async createEvent(event: CreateEventDto): Promise<EventModel> {
    try {
      const result = await EventsRepository.create(event);
      return result;
    } catch (err) {
      console.error("EventsServiceError: couldn't create event!");
      throw new Error();
    }
  }
}
