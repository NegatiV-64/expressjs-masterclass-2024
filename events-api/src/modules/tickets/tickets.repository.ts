import { db } from "#/database/database";
import { NewTicket, TicketModel } from "./tickets.model";
import { v4 as uuidv4 } from "uuid";

export class TicketsRepository {
  static async create(ticketData: NewTicket): Promise<TicketModel[]> {
    const event = await db.execute(
      `
        SELECT event_id
        FROM events
        WHERE event_id = ?;
      `,
      [ticketData.eventId]
    );

    if (event.length === 0) {
      throw new Error("Event not found");
    }

    const id = uuidv4();

    const result = db.execute<TicketModel>(
      `
        INSERT INTO tickets (
          ticket_id, ticket_quantity, ticket_price, event_id
        ) VALUES (?, ?, ?, ?)
        RETURNING
          ticket_id as ticketId,
          ticket_quantity as ticketQuantity,
          ticket_price as ticketPrice,
          event_id as eventId`,
      [
        id,
        ticketData.ticketQuantity,
        ticketData.ticketPrice,
        ticketData.eventId,
      ]
    );

    return result;
  }

  static async getOne(ticketId: string): Promise<TicketModel[]> {
    const result = await db.execute<TicketModel>(
      `
        SELECT
          ticket_id as ticketId,
          ticket_quantity as ticketQuantity,
          ticket_price as ticketPrice,
          event_id as eventId
        FROM tickets
        WHERE ticket_id = ?`,
      [ticketId]
    );

    if (result.length === 0) throw new Error("Ticket not found");

    return result;
  }
}
