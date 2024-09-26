import { TicketsCreateDto } from "./dto/requests/tickets-create-dto";
import { db } from "#/database/database";
import { v4 } from "uuid";
import { TicketModel } from "./tickets.model";
import { NotFoundError } from "#/shared/errors/notFoundError";

export class TicketsRepository {
  static async create(newTicket: TicketsCreateDto): Promise<TicketModel[]> {
    const { eventId, ticketPrice, ticketQuantity } = newTicket;

    const res = await db.execute<TicketModel>(
      `
        INSERT INTO tickets (ticket_id, ticket_quantity, ticket_price, event_id) 
        VALUES (?, ?, ?, ?)
        RETURNING ticket_id as ticketId, ticket_quantity as ticketQuantity, ticket_price as ticketPrice
      `,
      [v4(), ticketQuantity, ticketPrice, eventId]
    );

    return res;
  }

  static async getTicketById(id: string): Promise<TicketModel> {
    const result = await db.execute<TicketModel>(
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

    if (result.length === 0) {
      throw new NotFoundError(`Ticket with ID ${id} not found`);
    }

    return result[0]!;
  }
}
