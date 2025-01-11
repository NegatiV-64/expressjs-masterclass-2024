import { db } from "#/database/database";
import { EventModel } from "#/modules/events/events.model";
import { DateFormat } from "#/shared/constants";
import { DatabaseException } from "#/shared/exceptions";
import { time } from "#/shared/libs";
import { fromCamelToSnakeCase } from "#/shared/utils/casing.util";

export class EventsRepository {
  private static eventSelectFields = `
    event_id as eventId,
    event_name as eventName,
    event_description as eventDescription,
    event_location as eventLocation,
    event_date as eventDate,
    event_created_at as eventCreatedAt,
    event_updated_at as eventUpdatedAt
  `;

  static async create(
    event: Omit<EventModel, "eventCreatedAt" | "eventUpdatedAt">
  ): Promise<EventModel> {
    const result = await db.execute<EventModel>(
      `
        INSERT INTO events (
            event_id,
            event_name,
            event_description,
            event_location,
            event_date
        ) VALUES (
            ?, ?, ?, ?, ?
        )
        RETURNING ${EventsRepository.eventSelectFields}
    `,
      [
        event.eventId,
        event.eventName,
        event.eventDescription,
        event.eventLocation,
        time(event.eventDate, DateFormat.DateTime).format(DateFormat.Timestamp),
      ]
    );

    const [createdEvent] = result;

    if (!createdEvent) {
      throw new DatabaseException("Failed to create event");
    }

    return createdEvent;
  }

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

  static async getById(eventId: string): Promise<EventModel | null> {
    const result = await db.execute<EventModel>(
      `
        SELECT ${EventsRepository.eventSelectFields}
        FROM events
        WHERE event_id = ?
    `,
      [eventId]
    );

    const [event] = result;

    if (!event) {
      return null;
    }

    return event;
  }

  static async update(
    eventId: string,
    event: Partial<Omit<EventModel, "eventId">>
  ): Promise<EventModel> {
    const updateFields = Object.entries(event).map(([key]) => {
      const mappedKey = fromCamelToSnakeCase(key);
      return `${mappedKey} = ?`;
    });
    const updateValues = Object.values(event);

    const query = `
        UPDATE events
        SET ${updateFields.join(", ")},
          event_updated_at = CURRENT_TIMESTAMP
        WHERE event_id = ?
        RETURNING ${EventsRepository.eventSelectFields}
    `;

    const result = await db.execute<EventModel>(query, [
      ...updateValues,
      eventId,
    ]);

    const [updatedEvent] = result;

    if (!updatedEvent) {
      throw new DatabaseException("Failed to update event");
    }

    return updatedEvent;
  }

  static async delete(eventId: string): Promise<EventModel> {
    const result = await db.execute<EventModel>(
      `
        DELETE FROM events
        WHERE event_id = ?
        RETURNING ${EventsRepository.eventSelectFields}
    `,
      [eventId]
    );

    const [deletedEvent] = result;

    if (!deletedEvent) {
      throw new DatabaseException("Failed to delete event");
    }

    return deletedEvent;
  }
}
