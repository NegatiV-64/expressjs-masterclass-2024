import { EventModel } from "#/modules/events/events.model";
import { EventsRepository } from "#/modules/events/events.repository";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

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

  static async updateEventById(
    eventIdId: string, updatedEvent: UpdateEventDto) {
    try {
      const result = await EventsRepository.update(eventIdId, updatedEvent);
      return result;
    } catch (err) {
      console.error("EventsServiceError: couldn't update event!");
      throw new Error();
    }
  }
  static async deleteEventById(eventId: string) {
    try {
      await EventsRepository.deleteById(eventId);
      return "Event deleted successfully!";
    } catch (err) {
      console.error("EventsServiceError: ", err);
      throw new Error();
    }
  }

  static async getEventById(eventId: string): Promise<EventModel | undefined> {
    try {
      const result = await EventsRepository.getById(eventId);
      return result;
    } catch (err) {
      console.error("EventsServiceError: couldn't get event!");
      throw new Error();
    }
  }
}
