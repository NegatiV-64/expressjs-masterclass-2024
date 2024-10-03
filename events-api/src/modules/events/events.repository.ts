import { db } from "#/database/database";
import { EventModel } from "#/modules/events/events.model";
import { randomUUID } from "crypto";
import { EventsCreateRequestBodyDto } from "./dto/requests/events-create-request-body.dto";
import { EventsUpdateRequestBodyDto } from "./dto/requests/events-update-request-body.dto";
import { convertCamelToSnakeCase } from "#/shared/utils/convert-camel-to-snakecase";
import { TicketModel } from "../tickets/tickets.model";
import { eventColumns } from "#/shared/constants/eventColumns";
import { ticketColumns } from "#/shared/constants/ticketColumns";

export class EventsRepository {
  static async getAll(): Promise<EventModel[]> {
    const result = db.execute<EventModel>(`
        SELECT
            ${eventColumns}
        FROM
            events
    `);

    return result;
  }

  static async createOne(
    data: EventsCreateRequestBodyDto,
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
        RETURNING ${eventColumns}
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
            ${eventColumns}
        FROM
            events
        WHERE event_id = ?
    `,
      [id],
    );

    return result;
  }

  static async updateOne(
    data: EventsUpdateRequestBodyDto,
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
        RETURNING ${eventColumns}
    `,
      [...queryArgs, id],
    );

    return result;
  }

  static async deleteOne(id: string): Promise<EventModel[]> {
    const result = db.execute<EventModel>(
      `
        DELETE FROM
            events
        WHERE event_id = ?
        RETURNING ${eventColumns}
    `,
      [id],
    );

    return result;
  }

  static async getAllTickets(id: string): Promise<TicketModel[]> {
    const result = db.execute<TicketModel>(
      `
        SELECT
            ${ticketColumns}
        FROM
            tickets
        WHERE event_id = ?
    `,
      [id],
    );

    return result;
  }
}
