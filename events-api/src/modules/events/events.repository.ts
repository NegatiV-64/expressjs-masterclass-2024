import { db } from "#/database/database";
import { CreateEventModel, EventModel } from "#/modules/events/events.model";
import { TicketsModel } from "../tickets/tickets.model";
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
      `SELECT event_id as eventId FROM events WHERE event_id = ?`,
      [id]
    );

    if (res.length === 0) {
      return null;
    }

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
         RETURNING * 
        ;
      `,
      [eventId, eventName, eventDescription, eventLocation, eventDate]
    );
  }

  static async update(
    event: Partial<EventCreateDto>,
    id: string
  ): Promise<EventModel[] | null> {
    const res = await EventsRepository.findById(id);

    if (res === null) {
      return null;
    }

    const values = Object.values(event);
    values.push(id);
    const setClause = Object.keys(event)
      .map((key) => `${key} = ?`)
      .join(", ");

    const sql = `UPDATE events SET ${setClause} WHERE event_id = ? RETURNING *`;
    return await db.execute<EventModel>(sql, values);
  }

  static async delete(id: string): Promise<EventModel[] | null> {
    const res = await EventsRepository.findById(id);

    if (res === null) {
      return null;
    }

    const deletedEvent = await db.execute<EventModel>(
      `DELETE FROM events WHERE event_id = ? RETURNING *`,
      [id]
    );
    console.log(deletedEvent, "deletedEvent");
    return deletedEvent;
  }

  static async getAllTickets(id: string): Promise<TicketsModel[]> {
    const result = await db.execute<TicketsModel>(
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
