import { db } from "#/database/database";
import { TicketModel } from "./tickets.model";

export class TicketsRepository {
    static async getAll(): Promise<TicketModel[]> {
        try {
            const result = await db.execute<TicketModel>(`
            SELECT ticket_id as ticketId, ticket_quantity as ticketQuantity, ticket_price as ticketPrice, event_id as ticketEventId,
            ticket_created_at as ticketCreatedAt, ticket_updated_at as ticketUpdatedAt
            FROM tickets;`);

            return result;
        } catch (err) {
            console.error("TicketsRepositoryError: couldn't get all tickets: ", err);
            throw new Error();
        }
    }
}