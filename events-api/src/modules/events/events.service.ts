import { EventModel } from "#/modules/events/events.model";
import { EventsRepository } from "#/modules/events/events.repository";
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

  static async getEvent(id: string): Promise<EventModel[]> {
    const event = await EventsRepository.getOne(id);

    return event;
  }

  static async updateEvent(
    data: eventsUpdateRequestBodyDto,
    id: string,
  ): Promise<EventModel[]> {
    const updatedEvent = await EventsRepository.updateOne(data, id);

    return updatedEvent;
  }

  static async deleteEvent(id: string): Promise<EventModel[]> {
    const deletedEvent = await EventsRepository.deleteOne(id);

    return deletedEvent;
  }
}
