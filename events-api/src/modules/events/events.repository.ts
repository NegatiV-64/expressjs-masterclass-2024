import { db } from "#/database/database";
import { EventModel } from "#/modules/events/events.model";
import { EventsCreateDto } from "./dto/requests";
import { v4 as uuid } from "uuid";

export class EventsRepository {
    static getAll(): Promise<EventModel[]> {
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
}
