import { db } from "#/database/database";
import { TicketsModel } from "#/modules/tickets/tickets.model";
import { TicketsCreateDto } from "./dto/requests/tickets-create.dto";
import { v4 as uuid  } from "uuid";

export class TicketsRepository {
  static async getAllTickets(): Promise<TicketsModel[]> {
    const result = db.execute<TicketsModel>(`
      SELECT * FROM tickets
    `);

    return result;
  }

  static async getTicketById(id:string): Promise<TicketsModel | null> {

    const result = await db.execute<TicketsModel>(`
      SELECT * FROM tickets WHERE ticket_id = ?
    `, [id]);

    if (!result.length || result[0] == undefined) {
      return null;
    }

    return result[0]
  }

  static async createTicket(newTicket:TicketsCreateDto): Promise<TicketsModel[]> {
    const { ticketQuantity, ticketPrice, eventId } = newTicket
    const newTicketId = uuid();
    const result = db.execute<TicketsModel>(`
      INSERT INTO tickets (
        ticket_id,
        ticket_quantity,
        ticket_price,
        event_id,
      ) VALUES (?, ?, ?, ?)
      RETURNING *
    `, [newTicketId, ticketQuantity, ticketPrice, eventId])

    return result
  }
}
