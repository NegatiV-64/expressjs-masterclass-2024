import { db } from "#/database/database";
import { TicketModel } from "./tickets.model";

export class TicketsRepository {
  static async getAll(): Promise<TicketModel[]> {
    const result = db.execute<TicketModel>(`
        SELECT
            event_id as eventId,
        FROM
            tickets
    `);

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

