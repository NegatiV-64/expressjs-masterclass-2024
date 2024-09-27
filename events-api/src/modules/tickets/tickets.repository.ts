import { db } from "#/database/database";
import { faker } from "@faker-js/faker";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { TicketModel } from "./tickets.model";
import { EventsService } from "../events/events.service";

export class TicketsRepository {
    static async getByEventId(eventId: string): Promise<TicketModel[]> {
        try {
            const result = await db.execute<TicketModel>(`
            SELECT ticket_id as ticketId, ticket_quantity as ticketQuantity, ticket_price as ticketPrice, event_id as ticketEventId,
            ticket_created_at as ticketCreatedAt, ticket_updated_at as ticketUpdatedAt
            FROM tickets
            WHERE event_id = ?;`, [eventId]);

            return result;
        } catch (err) {
            console.error("TicketsRepositoryError: couldn't get all tickets: ", err);
            throw new Error();
        }
    }

    static async create(ticket: CreateTicketDto) {
        try {
            const result = await db.execute<TicketModel>(`
                INSERT INTO tickets (ticket_id, ticket_quantity, ticket_price, event_id)
                VALUES (?, ?, ?, ?)
                RETURNING ticket_id as ticketId, ticket_quantity as ticketQuantity, ticket_price as ticketPrice, event_id as ticketEventId,
                ticket_created_at as ticketCreatedAt, ticket_updated_at as ticketUpdatedAt;`,
                [
                    faker.string.uuid(),
                    ticket.ticketQuantity,
                    ticket.ticketPrice,
                    ticket.eventId
                ]);

            return result[0];

        } catch (err) {
            console.error("TicketsRepositoryError: couldn't create ticket: ", err);
            throw new Error();
        }
    }

    static async getById(ticketId: string) {
        try {
            const result = await db.execute<TicketModel>(`
            SELECT ticket_id as ticketId, ticket_quantity as ticketQuantity, ticket_price as ticketPrice, event_id as ticketEventId,
            ticket_created_at as ticketCreatedAt, ticket_updated_at as ticketUpdatedAt
            FROM tickets
            WHERE ticket_id = ?;`, [ticketId]);

            if (result.length === 0) {
                return undefined;
            }

            const ticketEventId = result[0]!.ticketEventId;

            const event = await EventsService.getEventById(ticketEventId);

            return {
                ticket: result[0],
                event: event
            };

        } catch (err) {
            console.error("TicketsRepositoryError: couldn't get ticket by id: ", err);
            throw new Error();
        }
    }
}