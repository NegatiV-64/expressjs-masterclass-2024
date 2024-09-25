import { TicketsCreateDto } from "./dto/requests/tickets-create-dto";
import { db } from "#/database/database";
import { v4 } from "uuid";
import { TicketsModel } from "./tickets.model";

export class TicketsRepository {
  static async create(newTicket: TicketsCreateDto): Promise<void> {
    const { eventId, ticketPrice, ticketQuantity } = newTicket;

    await db.execute<TicketsModel>(
      `
        INSERT INTO tickets (ticket_id, ticket_quantity, ticket_price, event_id) 
        VALUES (?, ?, ?, ?)
      `,
      [v4(), ticketQuantity, ticketPrice, eventId]
    );
  }

  static async getAllByTicket(id: string): Promise<TicketsModel[]> {
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
