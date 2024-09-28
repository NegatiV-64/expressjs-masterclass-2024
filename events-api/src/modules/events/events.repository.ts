import { db } from "#/database/database";
import { EventModel } from "#/modules/events/events.model";
import { randomUUID } from "crypto";
import {EventsCreateDto} from "#/modules/events/dto/requests/events-create.dto";
import {TicketModel} from "#/modules/tickets/tickets.model";
import {EventUpdateDto} from "#/modules/events/dto/requests/events-params.dto";
import { eventColumns } from "#/shared/util";
import { v4 } from "uuid";


export class EventsRepository {
    static async getAll(): Promise<EventModel[]> {
        const result = db.execute<EventModel>(`
            SELECT
                ${eventColumns}
            FROM
                events
        `);
        return result;
    }

    static async createEvent(data: EventsCreateDto): Promise<EventModel[]> {
        const eventId = v4()
        const result = db.execute<EventModel>(`
        INSERT INTO events(
            event_id, 
            event_name,
            event_description,
            event_location,
            event_date)
        VALUES (?, ?, ?, ?, ?)
        RETURNING ${eventColumns}
    `,[eventId ,data.eventName,data.eventDescription,data.eventLocation,data.eventDate]);
        return result;
    }

    static async getById(eventiId: string): Promise<EventModel[]> {
        const result = db.execute<EventModel>(`
        SELECT
            ${eventColumns}
        FROM
            events
        WHERE event_id = ?
    `,
            [eventiId],
        );

        return result;
    }

    static async updateEvent(data: EventUpdateDto, eventiId: string,): Promise<EventModel[]> {
        const columns: string[] = [];
        const queryArgs = Object.values(data);
        for (const property in data) {
            if (property) {
                columns.push(`${property} = ?`);
            }
        }
        const result = db.execute<EventModel>(`
        UPDATE events
        SET ${columns.join(", ")}
        WHERE event_id = ?
        RETURNING *
    `,
            [...queryArgs, eventiId],
        );

        return result;
    }

    static async deleteEvent(eventiId: string): Promise<EventModel[] | EventModel> {
        const res = await EventsRepository.getById(eventiId);

        if (res.length === 0) {
            return [];
        }

        await db.execute(`DELETE FROM tickets WHERE event_id = ?`, [eventiId]);
        const result = await db.execute<EventModel>(`
      SELECT
         ${eventColumns}
      FROM
          events
          WHERE event_id = ?
        `,[eventiId]);

    await db.execute<EventModel>(`DELETE FROM events WHERE event_id = ?`, [eventiId]);
    return result[0] as EventModel;
    }

    static async getAllTickets(eventiId: string): Promise<TicketModel[]> {
        const result = db.execute<TicketModel>(`
        SELECT
            ticket_id as ticketId,
            ticket_quantity as ticketQuantity,
            ticket_price as ticketPrice,
            event_id as eventId
        FROM
            tickets
        WHERE event_id = ?
    `,[eventiId],
        );

        return result;
    }
}

