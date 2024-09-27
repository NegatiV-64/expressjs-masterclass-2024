import { EventUpdateDto } from './dto/requests/events-update.dto';
import { db } from "#/database/database";
import { EventModel } from "#/modules/events/events.model";
import { EventCreateDto } from "./dto/requests/events-create.dto";
import { v4 as uuid  } from "uuid";

export class EventsRepository {
  static async getAllEvents(): Promise<EventModel[]> {
    const result = db.execute<EventModel>(`
      SELECT * FROM events
    `);

    return result;
  }

  static async getEventById(id:string): Promise<EventModel | null> {

    const result = await db.execute<EventModel>(`
      SELECT * FROM events WHERE event_id = ?
    `, [id]);

    if (!result.length || result[0] == undefined) {
      return null;
    }

    return result[0]
  }

  static async createEvent(newEvent:EventCreateDto): Promise<EventModel[]> {
    const { eventName, eventDescription, eventLocation, eventDate} = newEvent
    const newEventId = uuid();
    const result = db.execute<EventModel>(`
      INSERT INTO events (
        event_id,
        event_name,
        event_description,
        event_location,
        event_date
      ) VALUES (?, ?, ?, ?, ?)
      RETURNING *
    `, [newEventId, eventName, eventDescription, eventLocation, eventDate])

    return result
  }

  static async updateEventById(id:string, updates:EventUpdateDto): Promise<EventModel | null> {
    const oldEvent = await this.getEventById(id)
    if (!oldEvent) {
      return null
    }

    // let querySet = Object.entries(updates)
    //   .map(([key, value]) => `${key} = '${value}'`)
    //   .join(',');

    // let query = `UPDATE events SET ${querySet} WHERE id=${id} RETURNING *`

    // db.execute<EventModel>(query);

    ///////////////////////////////////////////////////////
    let querySet = Object.keys(updates)
      .map((upd) => `${upd} = ?`)
      .join(',');


    db.execute<EventModel>(`
      UPDATE events SET ${querySet} WHERE event_id = ? RETURNING *
    `, [...Object.values(updates), id]);

    return await this.getEventById(id)
  }

  static async deleteEventById(id:string): Promise<EventModel | null> {
    const event = await this.getEventById(id)

    if (event) {
      db.execute(`
        DELETE FROM events WHERE event_id = ?
      `, [id]);

      return event
    }

    return null
  }
}
