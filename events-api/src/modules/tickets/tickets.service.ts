import { EventsRepository } from "../events/events.repository";
import { ticketsCreateRequestBodyDto } from "./dto/requests/tickets-create-request-body.dto";
import { TicketModel } from "./tickets.model";
import { TicketsRepository } from "./tickets.repository";

export class TicketsService {
  static async createTicket(
    data: ticketsCreateRequestBodyDto,
  ): Promise<TicketModel[] | null> {
    const event = await EventsRepository.getOne(data.eventId);

    if (event.length === 0) {
      return null;
    }

    const newTicket = await TicketsRepository.createOne(data);

    return newTicket;
  }

  static async getTicket(ticketId: string): Promise<TicketModel[] | null> {
    const ticket = await TicketsRepository.getOne(ticketId);

    if (ticket.length === 0) {
      return null;
    }

    return ticket;
  }
}
