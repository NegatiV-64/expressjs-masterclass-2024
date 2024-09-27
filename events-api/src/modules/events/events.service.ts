import { EventModel } from "#/modules/events/events.model";
import { EventsRepository } from "#/modules/events/events.repository";
import { faker } from "@faker-js/faker";
import { EventsBodyDataDto } from "./dto/requests/events-body-data.dto";
import { EventsUpdateDto } from "./dto/requests/events-update-data.dto";

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
      eventDate: eventData.eventDate.toISOString(),
      eventCreatedAt: new Date().toISOString(),
      eventUpdatedAt: new Date().toISOString()
    }

    await EventsRepository.insert(newEvent);

    return newEvent;
  }

  static async updateEvent(eventId: string, requestBody: EventsUpdateDto): Promise<EventsUpdateDto> {
    const columnNameChanging: { [key: string]: string } = {
      eventName: 'event_name',
      eventDescription: 'event_description',
      eventLocation: 'event_location',
      eventDate: 'event_date',
    };
    const getColumnNames = Object.keys(requestBody).map(name => columnNameChanging[name] || name);;
    const values = Object.values(requestBody);

    await EventsRepository.update(eventId, getColumnNames, values);

    return requestBody;
  }

  static async deleteEvent(eventId: string){
    const event = (await this.getEvents()).filter(event => event.eventId === eventId);
    await EventsRepository.delete(eventId);
    console.log(event);
    
    return event;
  }
}
