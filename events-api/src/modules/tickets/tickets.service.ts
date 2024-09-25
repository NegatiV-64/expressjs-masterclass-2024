// import { EventsRepository } from "#/modules/events/events.repository";
import { TicketsCreateDto } from "./dto/requests/tickets-create-dto";
import { TicketsModel } from "./tickets.model";
import { TicketsRepository } from "./tickets.repository";

export class TicketsService {
  static async createTicket(newTicket: TicketsCreateDto): Promise<void> {
    return await TicketsRepository.create(newTicket);
  }

  static async getTicketsForEvent(id: string): Promise<TicketsModel[]> {
    return await TicketsRepository.getAllByTicket(id);
  }

  static async getTicket(id: string): Promise<TicketsModel[]> {
    return await TicketsRepository.getTicketById(id);
  }
}
