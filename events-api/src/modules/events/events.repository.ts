import { db } from "#/database/database";
import { CreateEventModel, EventModel } from "#/modules/events/events.model";
import { EventCreateDto } from "./dto/requests/events-create.dto";
import { v4 } from "uuid";

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

  static async findById(id: string): Promise<EventModel[] | null> {
    const res = await db.execute<EventModel>(
      `SELECT event_id FROM events WHERE event_id = ?`,
      [id]
    );

    if (res.length === 0) {
      return null;
    }

    return res;
  }

  static async create(newEvent: EventCreateDto): Promise<void> {
    const { eventName, eventDescription, eventLocation, eventDate } = newEvent;

    const eventId = v4();
    await db.execute<CreateEventModel>(
      `
        INSERT INTO events (
          event_id,
          event_name,
          event_description,
          event_location,
          event_date
        ) VALUES (?, ?, ?, ?, ?);
      `,
      [eventId, eventName, eventDescription, eventLocation, eventDate]
    );
  }

  static async update(event: Partial<EventCreateDto>, id: string) {
    const res = await EventsRepository.findById(id);

    if (res === null) {
      return null;
    }

    const values = Object.values(event);
    values.push(id);
    const setClause = Object.keys(event)
      .map((key) => `${key} = ?`)
      .join(", ");

    const sql = `UPDATE events SET ${setClause} WHERE event_id = ?`;
    return await db.execute(sql, values);
  }

  static async delete(id: string) {
    const res = await EventsRepository.findById(id);

    if (res === null) {
      return null;
    }

    return await db.execute(`DELETE FROM events WHERE event_id = ?`, [id]);
  }
}
