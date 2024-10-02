import { db } from "#/database/database";
import { NotFoundError } from "#/shared/errors";
import { TicketsCreateDto } from "./dto/requests";
import { TicketModel } from "./tickets.model";
import { v4 as uuid } from "uuid";

export class TicketsRepository {
    static async createTicket(
        ticket: TicketsCreateDto
    ): Promise<TicketModel> {
        const { ticketQuantity, ticketPrice, eventId } = ticket;
        const ticketId = uuid();

        const result = await db.execute<TicketModel>(
            `
            INSERT INTO tickets (
                ticket_id,
                ticket_quantity,
                ticket_price,
                event_id
            )
            VALUES (?, ?, ?, ?)
            RETURNING ${this.aliases}
            `,
            [ticketId, ticketQuantity, ticketPrice, eventId]
        );

        if (!result[0]) {
            throw new NotFoundError("Interal Server Error");
        }

        return result[0];
    }

    static async getTicket(ticketId: string): Promise<TicketModel> {
        const result = await db.execute<TicketModel>(
            `
            SELECT
                ticket_id as ticketId,
                ticket_quantity as ticketQuantity,
                ticket_price as ticketPrice,
                tickets.event_id as eventId,
                event_name as eventName,
                event_description as eventDescription,
                event_location as eventLocation,
                event_date as eventDate,
                event_created_at as eventCreatedAt,
                event_updated_at as eventUpdatedAt
            FROM tickets
            INNER JOIN events
            ON tickets.event_id = events.event_id
            WHERE ticket_id = ?
            `,
            [ticketId]
        );

        if (!result[0]) {
            throw new NotFoundError("Ticket does not exist");
        }

        return result[0];
    }

    static aliases = `
        ticket_id as ticketId,
        ticket_quantity as ticketQuantity,
        ticket_price as ticketPrice,
        event_id as eventId
    `;
}
