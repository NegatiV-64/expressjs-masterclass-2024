import { EventModel } from "#/modules/events/events.model";
import { EventsRepository } from "#/modules/events/events.repository";
import { faker } from "@faker-js/faker";
import { EventsBodyDataDto } from "./dto/requests/events-body-data.dto";

export class EventsService {
  static async getEvents(): Promise<EventModel[]> {
    const events = await EventsRepository.getAll();

    return events;
  }

  static async newEvent(eventData: EventsBodyDataDto): Promise<EventModel> {
    const newEvent: EventModel = {
      eventId: faker.string.uuid(),
      eventName: eventData.eventName,
      eventDescription: eventData.eventDescription,
      eventLocation: eventData.eventLocation,
      eventDate: eventData.eventDate,
      eventCreatedAt: new Date().toISOString(),
      eventUpdatedAt: new Date().toISOString()
    }

    await EventsRepository.insert(newEvent);

    return newEvent;
  }
}
