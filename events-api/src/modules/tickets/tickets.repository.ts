import { db } from "#/database/database";
import { TicketModel } from "./tickets.model";

export class TicketsRepository {
  static async getTicketsByEventId(eventId: string): Promise<TicketModel[]> {
    const result = db.execute<TicketModel>(`
        SELECT
          ticket_id as ticketId,
          ticket_quantity as ticketQuantity,
          ticket_price as ticketPrice,
          event_id as eventId
        FROM
          tickets
        WHERE 
          event_id = ?;`, [eventId]
    );

    return result;
  }

  static async insert(ticket: TicketModel): Promise<void> {
    await db.execute(
      `INSERT INTO tickets (ticket_id, ticket_quantity, ticket_price, event_id) VALUES (?, ?, ?, ?);`,
      [
        ticket.ticketId,
        ticket.ticketQuantity,
        ticket.ticketPrice,
        ticket.eventId
      ]
    );
  }
}

