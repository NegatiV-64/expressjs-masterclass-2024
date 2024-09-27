import { db } from "#/database/database";
import { EventEntity, TicketEntity } from "./models";
import { eventFields } from "./utils";
import { TicketCreateDto } from "./modules/tickets/tickets.dto";
import { EventCreateDto } from "./modules/events/dto/requests/create.dto";
const { v4: uuidv4 } = require('uuid');

export class EventRepository {
  static async getAllEvents(): Promise<EventEntity[] | any> {
    const events = await db.execute<EventEntity>(`
      SELECT
        ${eventFields}
      FROM
        events;
    `);
    return events;
  }

  static async findEventById(eventId: string): Promise<EventEntity[] | any> {
    const event = await db.execute<EventEntity>(
      `SELECT ${eventFields} FROM events WHERE event_id = ?`,
      [eventId]
    );
    return event;
  }

  static async createEvent(payload: EventCreateDto): Promise<EventEntity[] | any> {
    const { eventName, eventDescription, eventLocation, eventDate } = payload;

    const newEventId = uuidv4();
    return await db.execute<EventEntity>(
      `
        INSERT INTO events (
          event_id,
          event_name,
          event_description,
          event_location,
          event_date
        ) VALUES (?, ?, ?, ?, ?)
        RETURNING ${eventFields};
      `,
      [newEventId, eventName, eventDescription, eventLocation, eventDate]
    );
  }

  static async updateEvent(
    partialEvent: Partial<EventCreateDto>,
    eventId: string
  ): Promise<EventEntity | []> {
    const existingEvent = await EventRepository.findEventById(eventId);

    if (existingEvent.length === 0) {
      return [];
    }

    const updatedValues = Object.values(partialEvent);
    updatedValues.push(eventId);
    const updateClause = Object.keys(partialEvent)
      .map((key) => `${key} = ?`)
      .join(", ");

    const updateQuery = `UPDATE events SET ${updateClause} WHERE event_id = ?`;
    await db.execute<EventEntity>(updateQuery, updatedValues);

    const updatedEvent = await db.execute<EventEntity>(
      `SELECT ${eventFields} FROM events WHERE event_id = ?`,
      [eventId]
    );

    return updatedEvent[0] as EventEntity;
  }

  static async deleteEvent(eventId: string): Promise<EventEntity | []> {
    const existingEvent = await EventRepository.findEventById(eventId);

    if (existingEvent.length === 0) {
      return [];
    }

    await db.execute(`DELETE FROM tickets WHERE event_id = ?`, [eventId]);
    const deletedEvent = await db.execute<EventEntity>(
      `SELECT ${eventFields} FROM events WHERE event_id = ?`,
      [eventId]
    );

    await db.execute(`DELETE FROM events WHERE event_id = ?`, [eventId]);
    return deletedEvent[0] as EventEntity;
  }

  static async getTicketsByEventId(eventId: string): Promise<TicketEntity[] | any> {
    const tickets = await db.execute<TicketEntity>(
      `
        SELECT
          ticket_id AS ticketId,
          ticket_quantity AS ticketQuantity,
          ticket_price AS ticketPrice
        FROM
          tickets
        WHERE event_id = ?;
      `,
      [eventId]
    );
    return tickets;
  }
}

export class TicketRepository {
  static async createTicket(payload: TicketCreateDto): Promise<TicketEntity> {
    const { eventId, ticketPrice, ticketQuantity } = payload;

    const result = await db.execute<TicketEntity>(
      `
        INSERT INTO tickets (ticket_id, ticket_quantity, ticket_price, event_id) 
        VALUES (?, ?, ?, ?)
        RETURNING ticket_id AS ticketId, ticket_quantity AS ticketQuantity, ticket_price AS ticketPrice;
      `,
      [uuidv4(), ticketQuantity, ticketPrice, eventId]
    );

    return result[0] as TicketEntity;
  }

  static async getTicketById(ticketId: string): Promise<TicketEntity | any> {
    const ticket = await db.execute<TicketEntity>(
      `
        SELECT
          ticket_id AS ticketId,
          ticket_quantity AS ticketQuantity,
          ticket_price AS ticketPrice
        FROM
          tickets
        WHERE ticket_id = ?;
      `,
      [ticketId]
    );

    return ticket.length > 0 ? ticket[0] : null;
  }

  static async getAllTickets(): Promise<TicketEntity[]> {
    const allTickets = await db.execute<TicketEntity>(
      `
        SELECT
          ticket_id AS ticketId,
          ticket_quantity AS ticketQuantity,
          ticket_price AS ticketPrice,
          event_id AS eventId
        FROM
          tickets;
      `
    );
    return allTickets;
  }
}