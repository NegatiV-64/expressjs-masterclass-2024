import { db } from "#/database/database";
import { TicketModel } from "#/modules/tickets/tickets.model";
import { DatabaseException } from "#/shared/exceptions";

export class TicketsRepository {
  static async validateEventId(eventId: string) {
    const result = await db.execute("SELECT * FROM events WHERE event_id = ?", [
      eventId,
    ]);

    const [event] = result;

    if (!event) {
      return false;
    }

    return true;
  }

  private static ticketSelectFields = `
    ticket_id as ticketId,
    ticket_quantity as ticketQuantity,
    ticket_price as ticketPrice,
    event_id as eventId
  `;

  static async create(ticket: TicketModel) {
    const query = `
        INSERT INTO tickets (
            ticket_id,
            ticket_quantity,
            ticket_price,
            event_id
        ) VALUES (
            ?, ?, ?, ?
        )
        RETURNING ${TicketsRepository.ticketSelectFields}
    `;

    const result = await db.execute<TicketModel>(query, [
      ticket.ticketId,
      ticket.ticketQuantity,
      ticket.ticketPrice,
      ticket.eventId,
    ]);

    const [createdTicket] = result;

    if (!createdTicket) {
      throw new DatabaseException("Failed to create ticket");
    }

    return createdTicket;
  }

  static async getById(ticketId: string) {
    const result = await db.execute<TicketModel>(
      `
        SELECT ${TicketsRepository.ticketSelectFields}
        FROM tickets
        WHERE ticket_id = ?
    `,
      [ticketId]
    );

    const [ticket] = result;

    if (!ticket) {
      return null;
    }

    return ticket;
  }
}
