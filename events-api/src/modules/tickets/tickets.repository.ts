import { TicketsCreateDto } from "./dto/requests/tickets-create-dto";
import { db } from "#/database/database";
import { v4 } from "uuid";
import { TicketModel } from "./tickets.model";
import { NotFoundError } from "#/shared/errors/notFoundError";

export class TicketsRepository {
  static async create(newTicket: TicketsCreateDto): Promise<TicketModel> {
    const { eventId, ticketPrice, ticketQuantity } = newTicket;

    const res = await db.execute<TicketModel>(
      `
        INSERT INTO tickets (ticket_id, ticket_quantity, ticket_price, event_id) 
        VALUES (?, ?, ?, ?)
        RETURNING ticket_id as ticketId, ticket_quantity as ticketQuantity, ticket_price as ticketPrice
      `,
      [v4(), ticketQuantity, ticketPrice, eventId]
    );

    return res[0] as TicketModel;
  }

  static async getTicketById(id: string): Promise<TicketModel | TicketModel[]> {
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

    if (result.length > 0) {
      return result[0] as TicketModel;
    }

    return result;
  }
}
