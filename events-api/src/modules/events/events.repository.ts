import { db } from "#/database/database";
import { EventModel } from "#/modules/events/events.model";
import { TicketModel } from "#/modules/tickets/tickets.model";
import { EventsCreateDto, EventsUpdateDto } from "./dto/requests";
import { v4 as uuid } from "uuid";
import { convertToSnakeCase } from "#/shared/utils";
import { NotFoundError } from "#/shared/errors";

export class EventsRepository {
    static getAllEvents(): Promise<EventModel[]> {
        const result = db.execute<EventModel>(`
        SELECT
            event_id as eventId,
            event_name as eventName,
            event_description as eventDescription,
            event_location as eventLocation,
            event_date as eventDate,
            event_created_at as eventCreatedAt,
            event_updated_at as eventUpdatedAt
        FROM
            events
    `);

        return result;
    }

    static async createEvent(event: EventsCreateDto): Promise<EventModel> {
        const { eventName, eventDescription, eventLocation, eventDate } =
            event;
        const eventId = uuid();

        const result = await db.execute<EventModel>(
            `
            INSERT INTO events
           (event_id, event_name, event_description, event_location, event_date)
            VALUES (?, ?, ?, ?, ?)
            RETURNING ${this.aliases}
        `,
            [
                eventId,
                eventName,
                eventDescription,
                eventLocation,
                eventDate
            ]
        );

        if (!result[0]) {
            throw new Error("Internal Server Error");
        }

        return result[0];
    }

    static async getEvent(id: string): Promise<EventModel> {
        const result = await db.execute<EventModel>(
            `
            SELECT ${this.aliases}
            FROM events
            WHERE event_id = ?
            `,
            [id]
        );

        if (!result[0]) {
            throw new NotFoundError("Event does not exist");
        }

        return result[0];
    }

    static async updateEvent(
        eventId: string,
        event: EventsUpdateDto
    ): Promise<EventModel> {
        const values = Object.values(event);
        values.push(eventId);

        const colsWithPlaceholders = Object.keys(event)
            .reduce((acc: string[], curr) => {
                acc.push(`${convertToSnakeCase(curr)} = ?`);
                return acc;
            }, [])
            .join(", ");

        const query = `UPDATE events SET ${colsWithPlaceholders} WHERE event_id = ?`;
        await db.execute<EventModel>(query, values);

        const updatedEvent = await db.execute<EventModel>(
            `
            SELECT *
            FROM events 
            WHERE event_id = ?
            `,
            [eventId]
        );

        if (!updatedEvent[0]) {
            throw new NotFoundError("Event does not exist");
        }

        return updatedEvent[0];
    }

    static async deleteEvent(eventId: string): Promise<EventModel> {
        const deletedEvent = await db.execute<EventModel>(
            `
            DELETE FROM events 
            WHERE event_id = ? 
            RETURNING ${this.aliases}
            `,
            [eventId]
        );

        if (!deletedEvent[0]) {
            throw new NotFoundError("Event does not exist");
        }

        return deletedEvent[0];
    }

    static async getEventTickets(eventId: string): Promise<TicketModel[]> {
        const result = await db.execute<TicketModel>(
            `
            SELECT
                ticket_id as ticketId,
                ticket_quantity as ticketQuantity,
                ticket_price as ticketPrice,
                event_id as eventId
            FROM tickets
            WHERE event_id = ?
            `,
            [eventId]
        );

        return result;
    }

    static aliases = `
        event_id as eventId,
        event_name as eventName,
        event_description as eventDescription,
        event_location as eventLocation,
        event_date as eventDate,
        event_created_at as eventCreatedAt,
        event_updated_at as eventUpdatedAt
    `;
}
