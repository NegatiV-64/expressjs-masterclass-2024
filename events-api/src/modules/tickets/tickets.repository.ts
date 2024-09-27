import { db } from "#/database/database";
import { randomUUID } from "crypto";
import { ticketsCreateRequestBodyDto } from "./dto/requests/tickets-create-request-body.dto";
import { TicketModel } from "./tickets.model";

export class TicketsRepository {
  static async createOne(
    data: ticketsCreateRequestBodyDto,
  ): Promise<TicketModel[]> {
    const result = db.execute<TicketModel>(
      `
        INSERT INTO tickets
            (ticket_id,
            ticket_quantity,
            ticket_price,
            event_id)
        VALUES (?, ?, ?, ?)
        RETURNING *
    `,
      [randomUUID(), data.ticketQuantity, data.ticketPrice, data.eventId],
    );

    return result;
  }
}
