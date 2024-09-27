import { NotFoundError } from "#/shared/errors/notFoundError";
import { TicketsCreateDto } from "./dto/requests/tickets-create-dto";
import { TicketModel } from "./tickets.model";
import { TicketsRepository } from "./tickets.repository";

export class TicketsService {
  static async createTicket(newTicket: TicketsCreateDto): Promise<TicketModel> {
    return await TicketsRepository.create(newTicket);
  }

  static async getTicket(id: string): Promise<TicketModel | TicketModel[]> {
    const res = await TicketsRepository.getTicketById(id);

    if (Array.isArray(res) && res.length === 0) {
      throw new NotFoundError(`Ticket with ID ${id} not found`);
    }

    return res;
  }
}
