import { NewTicket, TicketModel } from "./tickets.model";
import { TicketsRepository } from "./tickets.repository";

export class TicketsService {
  static async createTicket(ticketData: NewTicket): Promise<TicketModel[]> {
    const newTicket = await TicketsRepository.create(ticketData);
    return newTicket;
  }

  static async getOneTicket(ticketId: string): Promise<TicketModel[]> {
    const ticket = await TicketsRepository.getOne(ticketId);
    return ticket;
  }
}
