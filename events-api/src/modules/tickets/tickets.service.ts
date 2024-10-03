import { CustomError } from "#/shared/errors/custom-error";
import { EventsRepository } from "../events/events.repository";
import { TicketsCreateRequestBodyDto } from "./dto/requests/tickets-create-request-body.dto";
import { TicketModel } from "./tickets.model";
import { TicketsRepository } from "./tickets.repository";

export class TicketsService {
  static async createTicket(
    data: TicketsCreateRequestBodyDto,
  ): Promise<TicketModel> {
    const [event] = await EventsRepository.getOne(data.eventId);

    if (!event) {
      throw new CustomError({
        message: "Event with that id does not exist",
        statusCode: 404,
      });
    }

    const [newTicket] = await TicketsRepository.createOne(data);

    if (!newTicket) {
      throw new CustomError({
        message: "Bad Request",
        statusCode: 400,
      });
    }

    return newTicket;
  }

  static async getTicket(ticketId: string): Promise<TicketModel> {
    const [ticket] = await TicketsRepository.getOne(ticketId);

    if (!ticket) {
      throw new CustomError({
        message: "Ticket with that id does not exist",
        statusCode: 404,
      });
    }

    return ticket;
  }
}
