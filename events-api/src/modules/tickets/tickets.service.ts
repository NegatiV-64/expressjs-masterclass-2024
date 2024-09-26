import { TicketsCreateDto } from "./dto/requests/tickets-create-dto";
import { TicketsModel } from "./tickets.model";
import { TicketsRepository } from "./tickets.repository";

export class TicketsService {
  static async createTicket(
    newTicket: TicketsCreateDto
  ): Promise<TicketsModel[]> {
    return await TicketsRepository.create(newTicket);
  }

  static async getTicket(id: string): Promise<TicketsModel[]> {
    return await TicketsRepository.getTicketById(id);
  }
}
