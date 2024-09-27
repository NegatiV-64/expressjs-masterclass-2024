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

  static async getOne(ticketId: string): Promise<TicketModel[]> {
    const result = db.execute<TicketModel>(
      `
        SELECT
            t.ticket_id as ticketId,
            t.ticket_quantity as ticketQuantity,
            t.ticket_price as ticketPrice,
            t.event_id as eventId,
            event_name as eventName,
            event_description as eventDescription,
            event_location as eventLocation,
            event_date as eventDate,
            event_created_at as eventCreatedAt,
            event_updated_at as eventUpdatedAt
        FROM tickets as t
        INNER JOIN events USING(event_id)
        WHERE t.ticket_id = ?
    `,
      [ticketId],
    );

    return result;
  }
}
