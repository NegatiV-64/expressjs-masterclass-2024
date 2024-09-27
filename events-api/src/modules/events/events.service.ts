import { EventModel } from "#/modules/events/events.model";
import { EventsRepository } from "#/modules/events/events.repository";
import { EventCreateDto } from "./dto/requests/events-create.dto";
import { EventUpdateDto } from "./dto/requests/events-update.dto";

export class EventsService {
  static async getEvents(): Promise<EventModel[]> {
    const events = await EventsRepository.getAllEvents();

    return events;
  }

  static async getEventById(id:string): Promise<EventModel | null> {
    const event = await EventsRepository.getEventById(id);

    return event;
  }

  static async createEvent(newEvent:EventCreateDto): Promise<EventModel[]> {
    const event = await EventsRepository.createEvent(newEvent);

    return event;
  }

  static async updateEventById(id:string, updatingEvent:EventUpdateDto): Promise<EventModel | null> {
    const event = await EventsRepository.updateEventById(id, updatingEvent);

    return event;
  }

  static async deleteEventById(id:string): Promise<EventModel | null> {
    const event = await EventsRepository.deleteEventById(id);

    return event;
  }
}
