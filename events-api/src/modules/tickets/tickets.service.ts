import { TicketsCreateDto } from "./dto/requests/tickets-create-dto";
import { TicketModel } from "./tickets.model";
import { TicketsRepository } from "./tickets.repository";

export class TicketsService {
  static async createTicket(
    newTicket: TicketsCreateDto
  ): Promise<TicketModel[]> {
    return await TicketsRepository.create(newTicket);
  }

  static async getTicket(id: string): Promise<TicketModel> {
    return await TicketsRepository.getTicketById(id);
  }
}
