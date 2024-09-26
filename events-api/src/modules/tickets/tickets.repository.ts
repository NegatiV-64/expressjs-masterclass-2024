import { TicketsCreateDto } from "./dto/requests/tickets-create-dto";
import { db } from "#/database/database";
import { v4 } from "uuid";
import { TicketsModel } from "./tickets.model";

export class TicketsRepository {
  static async create(newTicket: TicketsCreateDto): Promise<TicketsModel[]> {
    const { eventId, ticketPrice, ticketQuantity } = newTicket;

    const res = await db.execute<TicketsModel>(
      `
        INSERT INTO tickets (ticket_id, ticket_quantity, ticket_price, event_id) 
        VALUES (?, ?, ?, ?)
        RETURNING *
      `,
      [v4(), ticketQuantity, ticketPrice, eventId]
    );

    return res;
  }

  static async getTicketById(id: string): Promise<TicketsModel[]> {
    const result = await db.execute<TicketsModel>(
      `
        SELECT
            ticket_id as ticketId,
            ticket_quantity as ticketQuantity,
            ticket_price as ticketPrice
        FROM
            tickets
        WHERE ticket_id = ?
    `,
      [id]
    );

    return result;
  }
}
