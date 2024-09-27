import { EventModel, RequestEventModel } from "#/modules/events/events.model";
import { EventsRepository } from "#/modules/events/events.repository";

export class EventsService {
  static async getEvents(): Promise<EventModel[]> {
    const events = await EventsRepository.getAll();

    return events;
  }

  static async createEvent(
    eventData: RequestEventModel
  ): Promise<EventModel[]> {
    const newEvent = await EventsRepository.create(eventData);
    return newEvent;
  }

  static async updateEvent(
    eventId: string,
    newData: Partial<RequestEventModel>
  ): Promise<EventModel> {
    const updatedEventEvent = await EventsRepository.update(eventId, newData);
    return updatedEventEvent;
  }

  static async deleteEvent(eventId: string): Promise<EventModel[]> {
    const deletedEvent = await EventsRepository.delete(eventId);
    return deletedEvent;
  }
}
