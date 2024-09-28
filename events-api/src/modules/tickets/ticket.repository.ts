import { db } from '#/database/database';
import {CreateTicketDto} from "#/modules/tickets/dto/create-ticket-params.dto";
import {TicketModel} from "#/modules/tickets/tickets.model";
import {v4} from "uuid"
export class TicketsRepository {
    static async createTicket(ticketData: CreateTicketDto): Promise<TicketModel> {
        const { eventId, ticketQuantity, ticketPrice } = ticketData;

        const result = await db.execute<TicketModel>(`
            INSERT INTO tickets (ticked_id,ticket_quantity, ticket_price, event_id)
            VALUES (?, ?, ?, ?)
            RETURNING ticket_id AS ticketId,
                      ticket_quantity AS ticketQuantity,
                      ticket_price AS ticketPrice,
        `, [v4(),ticketQuantity, ticketPrice, eventId]);

        return result[0] as TicketModel;
    }

    // static async getTicketsByEventId(eventId: string): Promise<TicketModel | null> {
    //     const result = await db.execute<TicketModel>(`
    //         SELECT ticket_id AS ticketId,
    //                ticket_quantity AS ticketQuantity,
    //                ticket_price AS ticketPrice,
    //                event_id AS eventId
    //         FROM tickets
    //         WHERE event_id = ?
    //     `, [eventId]);
    //     if(result.length > 0){
    //         return result[0] as TicketModel;
    //     }
    //     return null;
    // }

    static async getTicketById(ticketId: string): Promise<TicketModel | null> {
        const result = await db.execute<TicketModel>(`
            SELECT ticket_id AS ticketId,
                   ticket_quantity AS ticketQuantity,
                   ticket_price AS ticketPrice,
            FROM tickets
            WHERE ticket_id = ?
        `, [ticketId]);

        if(result.length > 0){
            return result[0] as TicketModel;
        }
        return null;
    }

    static async getAllTickets(): Promise<TicketModel[]> {
        const result = await db.execute<TicketModel>(
          `
            SELECT
                ticket_id as ticketId,
                ticket_quantity as ticketQuantity,
                ticket_price as ticketPrice,
                event_id as eventId
            FROM
                tickets
          `
        );
        return result; 
    }
}