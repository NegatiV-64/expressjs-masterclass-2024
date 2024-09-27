import { db } from "#/database/database";
import { EventModel } from "#/modules/events/events.model";
import { EventsCreateDto, EventsUpdateDto } from "./dto/requests";
import { v4 as uuid } from "uuid";
import { convertToSnakeCase } from "#/shared/utils";

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

    static createEvent(event: EventsCreateDto): Promise<EventModel[]> {
        const { eventName, eventDescription, eventLocation, eventDate } =
            event;
        const eventId = uuid();

        const result = db.execute<EventModel>(
            `
            INSERT INTO events
            (event_id, event_name, event_description, event_location, event_date)
            VALUES (?, ?, ?, ?, ?)
            RETURNING *
        `,
            [
                eventId,
                eventName,
                eventDescription,
                eventLocation,
                eventDate
            ]
        );

        return result;
    }

    static async getEvent(id: string): Promise<EventModel[]> {
        const result = db.execute<EventModel>(
            `
            SELECT ${this.aliases}
            FROM events
            WHERE event_id = ?
            `,
            [id]
        );

        return result;
    }

    static async updateEvent(
        eventId: string,
        event: EventsUpdateDto
    ): Promise<EventModel[]> {
        const result = await EventsRepository.getEvent(eventId);

        if (!result.length) {
            throw new Error("Event Not Found");
        }

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

        return updatedEvent;
    }

    static async deleteEvent(eventId: string): Promise<EventModel[]> {
        const deletedEvent = await EventsRepository.getEvent(eventId);

        if (!deletedEvent.length) {
            throw new Error("Event Not Found");
        }

        const query = `DELETE FROM events WHERE event_id = ? RETURNING *`;
        await db.execute<EventModel>(query, [eventId]);

        return deletedEvent;
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
