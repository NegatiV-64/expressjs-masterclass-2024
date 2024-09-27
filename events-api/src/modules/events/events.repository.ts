import {
  EventCreateDto,
  EventModel,
  EventUpdateDto,
} from "#/modules/events/events.model";
import { prisma } from "#/prisma/prisma.service";
import { TicketModel } from "../tickets/tickets.model";

export class EventsRepository {
  static async getAll(): Promise<EventModel[]> {
    const event = await prisma.event.findMany();

    const result = event.map((event) => {
      return {
        eventId: event.event_id,
        eventName: event.event_name,
        eventDescription: event.event_description,
        eventLocation: event.event_location,
        eventDate: event.event_date.toISOString(),
        eventCreatedAt: event.event_created_at.toISOString(),
        eventUpdatedAt: event.event_updated_at.toISOString(),
      };
    });

    return result;
  }

  static async getEventTickets(eventId: string): Promise<TicketModel[]> {
    const tickets = await prisma.tickets.findMany({
      where: {
        event_id: eventId,
      },
    });

    return tickets.map((ticket) => {
      return {
        id: ticket.ticket_id,
        ticketQuantity: ticket.ticket_quantity,
        ticketPrice: ticket.ticket_price,
        eventId: ticket.event_id,
      };
    });
  }

  static async createEvent(event: EventCreateDto): Promise<EventModel> {
    const createdEvent = await prisma.event.create({
      data: {
        event_name: event.eventName,
        event_description: event.eventDescription,
        event_location: event.eventLocation,
        event_date: new Date(event.eventDate),
      },
    });

    return {
      eventId: createdEvent.event_id,
      eventName: createdEvent.event_name,
      eventDescription: createdEvent.event_description,
      eventLocation: createdEvent.event_location,
      eventDate: createdEvent.event_date.toISOString(),
      eventCreatedAt: createdEvent.event_created_at.toISOString(),
      eventUpdatedAt: createdEvent.event_updated_at.toISOString(),
    };
  }

  static async updateEvent(
    eventId: string,
    event: EventUpdateDto
  ): Promise<EventModel> {
    const updatedEvent = await prisma.event.update({
      where: {
        event_id: eventId,
      },
      data: {
        ...(event.eventName && { event_name: event.eventName }),
        ...(event.eventDescription && {
          event_description: event.eventDescription,
        }),
        ...(event.eventLocation && { event_location: event.eventLocation }),
        ...(event.eventDate && { event_date: new Date(event.eventDate) }),
      },
    });

    return {
      eventId: updatedEvent.event_id,
      eventName: updatedEvent.event_name,
      eventDescription: updatedEvent.event_description,
      eventLocation: updatedEvent.event_location,
      eventDate: updatedEvent.event_date.toISOString(),
      eventCreatedAt: updatedEvent.event_created_at.toISOString(),
      eventUpdatedAt: updatedEvent.event_updated_at.toISOString(),
    };
  }

  static async deleteEvent(eventId: string): Promise<void> {
    const event = await prisma.event.findUnique({
      where: {
        event_id: eventId,
      },
    });

    console.log("delete event mmmmm", event);

    await prisma.event.delete({
      where: {
        event_id: eventId,
      },
    });
  }
}
