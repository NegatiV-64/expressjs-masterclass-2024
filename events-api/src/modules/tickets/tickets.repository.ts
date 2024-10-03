import { db } from "#/database/database";
import { randomUUID } from "crypto";
import { TicketsCreateRequestBodyDto } from "./dto/requests/tickets-create-request-body.dto";
import { TicketModel } from "./tickets.model";
import { ticketColumns } from "#/shared/constants/ticketColumns";
import { eventColumns } from "#/shared/constants/eventColumns";

export class TicketsRepository {
  static async createOne(
    data: TicketsCreateRequestBodyDto,
  ): Promise<TicketModel[]> {
    const result = db.execute<TicketModel>(
      `
        INSERT INTO tickets
            (ticket_id,
            ticket_quantity,
            ticket_price,
            event_id)
        VALUES (?, ?, ?, ?)
        RETURNING ${ticketColumns}
    `,
      [randomUUID(), data.ticketQuantity, data.ticketPrice, data.eventId],
    );

    return result;
  }

  static async getOne(ticketId: string): Promise<TicketModel[]> {
    const result = db.execute<TicketModel>(
      `
        SELECT
            t.ticket_id as ticketId,
            t.ticket_quantity as ticketQuantity,
            t.ticket_price as ticketPrice,
            ${eventColumns}
        FROM tickets as t
        INNER JOIN events USING(event_id)
        WHERE t.ticket_id = ?
    `,
      [ticketId],
    );

    return result;
  }
}
