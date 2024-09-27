import { db } from "#/database/database";
import { EventModel } from "#/modules/events/events.model";
import { randomUUID } from "crypto";
import { eventsCreateRequestBodyDto } from "./dto/requests/events-create-request-body.dto";
import { eventsUpdateRequestBodyDto } from "./dto/requests/events-update-request-body.dto";
import { convertCamelToSnakeCase } from "#/shared/utils/convertCamelToSnakeCase";

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

  static async createOne(
    data: eventsCreateRequestBodyDto,
  ): Promise<EventModel[]> {
    const result = db.execute<EventModel>(
      `
        INSERT INTO events
            (event_id, 
            event_name,
            event_description,
            event_location,
            event_date)
        VALUES (?, ?, ?, ?, ?)
        RETURNING *
    `,
      [
        randomUUID(),
        data.eventName,
        data.eventDescription,
        data.eventLocation,
        data.eventDate,
      ],
    );

    return result;
  }

  static async getOne(id: string): Promise<EventModel[]> {
    const result = db.execute<EventModel>(
      `
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
        WHERE event_id = ?
    `,
      [id],
    );

    return result;
  }

  static async updateOne(
    data: eventsUpdateRequestBodyDto,
    id: string,
  ): Promise<EventModel[]> {
    const columns: string[] = [];
    const queryArgs = Object.values(data);

    for (const property in data) {
      if (property) {
        columns.push(`${convertCamelToSnakeCase(property)} = ?`);
      }
    }

    const result = db.execute<EventModel>(
      `
        UPDATE events
        SET ${columns.join(", ")}
        WHERE event_id = ?
        RETURNING *
    `,
      [...queryArgs, id],
    );

    return result;
  }
}
