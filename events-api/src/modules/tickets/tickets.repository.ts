import { prisma } from "#/prisma/prisma.service";
import { TicketCreateDto, TicketModel } from "./tickets.model";

export class TicketsRepostory {
  static async getOne(id: string): Promise<TicketModel | null> {
    const ticket = await prisma.tickets.findUnique({
      where: {
        ticket_id: id,
      },
    });

    if (!ticket) {
      return null;
    }
    return {
      id: ticket.ticket_id,
      ticketQuantity: ticket.ticket_quantity,
      ticketPrice: ticket.ticket_price,
      eventId: ticket.event_id,
    };
  }

  static async createTicket(ticket: TicketCreateDto): Promise<TicketModel> {
    const createdTicket = await prisma.tickets.create({
      data: {
        ticket_quantity: ticket.ticketQuantity,
        ticket_price: ticket.ticketPrice,
        event_id: ticket.eventId,
      },
    });
    return {
      id: createdTicket.ticket_id,
      ticketQuantity: createdTicket.ticket_quantity,
      ticketPrice: createdTicket.ticket_price,
      eventId: createdTicket.event_id,
    };
  }
}
