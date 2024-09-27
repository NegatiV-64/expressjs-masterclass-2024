import { db } from "#/database/database";
import { EventModel } from "#/modules/events/events.model";
import { eventColumns } from "#/shared/utils";
import { TicketModel } from "../tickets/tickets.model";
import { EventCreateDto } from "./dto/requests/events-create.dto";
import { v4 } from "uuid";

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

  static async findById(id: string): Promise<EventModel[]> {
    const res = await db.execute<EventModel>(
      `SELECT ${eventColumns} FROM events WHERE event_id = ?`,
      [id]
    );

    return res;
  }

  static async create(newEvent: EventCreateDto): Promise<EventModel[]> {
    const { eventName, eventDescription, eventLocation, eventDate } = newEvent;

    const eventId = v4();
    return await db.execute<EventModel>(
      `
        INSERT INTO events (
          event_id,
          event_name,
          event_description,
          event_location,
          event_date
        ) VALUES (?, ?, ?, ?, ?) 
         RETURNING ${eventColumns}
        ;
      `,
      [eventId, eventName, eventDescription, eventLocation, eventDate]
    );
  }

  static async update(
    event: Partial<EventCreateDto>,
    id: string
  ): Promise<EventModel | []> {
    const res = await EventsRepository.findById(id);

    if (res.length === 0) {
      return [];
    }

    const values = Object.values(event);
    values.push(id);
    const setClause = Object.keys(event)
      .map((key) => `${key} = ?`)
      .join(", ");

    const sql = `UPDATE events SET ${setClause} WHERE event_id = ?`;
    await db.execute<EventModel>(sql, values);

    const updatedEvent = await db.execute<EventModel>(
      `
        SELECT
          ${eventColumns}
      FROM events WHERE event_id = ?
      `,
      [id]
    );

    return updatedEvent[0] as EventModel;
  }

  static async delete(id: string): Promise<EventModel[] | EventModel> {
    const res = await EventsRepository.findById(id);

    if (res.length === 0) {
      return [];
    }

    await db.execute(`DELETE FROM tickets WHERE event_id = ?`, [id]);
    const result = await db.execute<EventModel>(
      `
      SELECT
         ${eventColumns}
      FROM
          events
          WHERE event_id = ?
  `,
      [id]
    );

    await db.execute<EventModel>(`DELETE FROM events WHERE event_id = ?`, [id]);
    return result[0] as EventModel;
  }

  static async getAllTickets(id: string): Promise<TicketModel[]> {
    const result = await db.execute<TicketModel>(
      `
        SELECT
            ticket_id as ticketId,
            ticket_quantity as ticketQuantity,
            ticket_price as ticketPrice
        FROM
            tickets
        WHERE event_id = ?
    `,
      [id]
    );

    return result;
  }
}
