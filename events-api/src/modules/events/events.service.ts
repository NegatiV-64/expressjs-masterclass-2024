import { EventModel } from "#/modules/events/events.model";
import { EventsRepository } from "#/modules/events/events.repository";
import { eventsCreateRequestBodyDto } from "./dto/requests/events-create-request-body.dto";

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
}
