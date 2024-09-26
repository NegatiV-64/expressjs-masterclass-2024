import { db } from "#/database/database";
import { EventModel } from "#/modules/events/events.model";

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

  static async insert(event: EventModel): Promise<void> {
    await db.execute(
      `INSERT INTO events (event_id, event_name, event_description, event_location, event_date, event_created_at, event_updated_at) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        event.eventId,
        event.eventName,
        event.eventDescription,
        event.eventLocation,
        event.eventDate,
        event.eventCreatedAt,
        event.eventUpdatedAt
      ]
    );
  }
}

