import { db } from "#/database/database";
import { EventModel } from "#/modules/events/events.model";
import { faker } from "@faker-js/faker";
import { CreateEventDto } from "./dto/create-event.dto";

export class EventsRepository {
  static async getAll(): Promise<EventModel[]> {
    const result = db.execute<EventModel>(`
        SELECT
            event_id as eventId,
            event_name as eventName,
            event_description as eventDescription,
            event_location as eventLocation,
            event_date as eventDate,
            event_created_at as eventCreatedAt,
            event_updated_at as eventUpdatedAt
        FROM
            events
    `);

    return result;
  }

  static async create(event: CreateEventDto): Promise<EventModel> {
    try {
      const result: EventModel[] = await db.execute<EventModel>(
        `INSERT INTO events (event_id, event_name, event_description, event_location, event_date)
         VALUES (?, ?, ?, ?, ?)
         RETURNING event_id as eventId,event_name as eventName, event_description as eventDescription,
         event_location as eventLocation,event_date as eventDate,event_created_at as eventCreatedAt, event_updated_at as eventUpdatedAt;`,
        [
          faker.string.uuid(),
          event.eventName,
          event.eventDescription,
          event.eventLocation,
          new Date(event.eventDate)
            .toISOString()
            .replace("T", " ")
            .replace("Z", ""),
          ,
        ],
      );

      console.log("Insert new event result: ", result);
      return result[0]!;
    } catch (err) {
      console.error("EventRepositoryError: couldn't create event!", err);
      throw new Error();
    }
  }

  static async deleteById(eventId: string) {
    try {
      const result = await db.execute<EventModel>(
        `DELETE FROM events
        WHERE event_id=?;`,
        [eventId],
      );
      console.log("Delete event by id result: ", result);
      return result;
    } catch (err) {
      console.error("EventRepositoryError: couldn't delete event by id: ", err);
      throw new Error();
    }
  }
}
