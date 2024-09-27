import { TicketsModel } from "#/modules/tickets/tickets.model";
import { TicketsRepository } from "#/modules/tickets/tickets.repository";
import { TicketsCreateDto } from "./dto/requests/tickets-create.dto";

export class TicketsService {
  static async getTickets(): Promise<TicketsModel[]> {
    const tickets = await TicketsRepository.getAllTickets();

    return tickets;
  }

  static async getTicketById(id:string): Promise<TicketsModel | null> {
    const ticket = await TicketsRepository.getTicketById(id);

    return ticket;
  }

  static async createTicket(newTicket:TicketsCreateDto): Promise<TicketsModel[]> {
    const ticket = await TicketsRepository.createTicket(newTicket);

    return ticket;
  }
}
