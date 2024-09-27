import { TicketCreateDto, TicketModel } from "./tickets.model";
import { TicketsRepostory } from "./tickets.repository";

export class TicketsService {
  static async getOne(id: string): Promise<TicketModel | null> {
    const ticket = await TicketsRepostory.getOne(id);
    if (!ticket) {
      return null;
    }
    return ticket;
  }

  static async createTicket(ticket: TicketCreateDto): Promise<TicketModel> {
    const createdTicket = await TicketsRepostory.createTicket(ticket);
    return createdTicket;
  }
}
