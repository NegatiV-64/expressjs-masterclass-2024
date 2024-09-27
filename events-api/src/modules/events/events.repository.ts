import { db } from "#/database/database";
import { EventModel, RequestEventModel } from "#/modules/events/events.model";
import { formatDateTime } from "#/shared/utils/format-datetime.util";
import { v4 as uuidv4 } from "uuid";
import { TicketModel } from "../tickets/tickets.model";

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

  static async getOne(eventId: string): Promise<EventModel[]> {
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
        WHERE event_id = ?`,
      [eventId]
    );

    return result;
  }

  static async create(eventData: RequestEventModel): Promise<EventModel[]> {
    const id = uuidv4();

    const result = db.execute<EventModel>(
      `
        INSERT INTO events (
          event_id, event_name, event_description, event_location, event_date
        ) VALUES (?, ?, ?, ?, ?)
        RETURNING
          event_id as eventId,
          event_name as eventName,
          event_description as eventDescription,
          event_location as eventLocation,
          event_date as eventDate,
          event_created_at as eventCreatedAt,
          event_updated_at as eventUpdatedAt`,
      [
        id,
        eventData.eventName,
        eventData.eventDescription,
        eventData.eventLocation,
        eventData.eventDate,
      ]
    );

    return result;
  }

  static async update(
    eventId: string,
    newData: Partial<RequestEventModel>
  ): Promise<EventModel> {
    const oldData = await db.execute<EventModel>(
      `
        SELECT
          event_id as eventId,
          event_name as eventName,
          event_description as eventDescription,
          event_location as eventLocation,
          event_date as eventDate
        FROM
          events
        WHERE
          event_id = ?`,
      [eventId]
    );

    if (oldData.length === 0) {
      throw new Error("Event not found");
    }

    const updatedData = {
      ...oldData[0],
      ...newData,
      eventUpdatedAt: formatDateTime(new Date()),
    };

    await db.execute(
      `
      UPDATE events SET
        event_name = ?,
        event_description = ?,
        event_location = ?,
        event_date = ?,
        event_updated_at = ?
      WHERE event_id = ?
    `,
      [
        updatedData.eventName,
        updatedData.eventDescription,
        updatedData.eventLocation,
        updatedData.eventDate,
        updatedData.eventUpdatedAt,
        eventId,
      ]
    );

    return updatedData as EventModel;
  }

  static async delete(eventId: string): Promise<EventModel[]> {
    const result = await db.execute<EventModel>(
      `
        DELETE FROM events
        WHERE event_id = ?
        RETURNING
          event_id as eventId,
          event_name as eventName,
          event_description as eventDescription,
          event_location as eventLocation,
          event_date as eventDate,
          event_created_at as eventCreatedAt,
          event_updated_at as eventUpdatedAt`,
      [eventId]
    );

    if (result.length === 0) throw new Error("Event not found");

    return result;
  }

  static async getTickets(eventId: string): Promise<TicketModel[]> {
    const event = await db.execute(
      `
        SELECT event_id
        FROM events
        WHERE event_id = ?;
      `,
      [eventId]
    );

    if (event.length === 0) {
      throw new Error("Event not found");
    }

    const result = await db.execute<TicketModel>(
      `
        SELECT
          ticket_id as ticketId,
          ticket_quantity as ticketQuantity,
          ticket_price as ticketPrice,
          event_id as eventId
        FROM
          tickets
        WHERE
          event_id = ?`,
      [eventId]
    );

    return result;
  }
}
