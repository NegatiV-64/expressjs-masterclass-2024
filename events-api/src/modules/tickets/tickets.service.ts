import { CreateTicketDto } from "#/modules/tickets/dto/requests";
import { TicketsRepository } from "#/modules/tickets/tickets.repository";
import { BadRequestException, NotFoundException } from "#/shared/exceptions";
import { randomUUID } from "crypto";

export class TicketsService {
  static async createTicket(dto: CreateTicketDto) {
    const eventId = dto.eventId;

    const eventExists = await TicketsRepository.validateEventId(eventId);
    if (!eventExists) {
      throw new BadRequestException("Event does not exist");
    }

    const createdTicket = await TicketsRepository.create({
      ticketId: randomUUID(),
      ticketQuantity: dto.ticketQuantity,
      ticketPrice: dto.ticketPrice,
      eventId,
    });

    return createdTicket;
  }

  static async getTicket(ticketId: string) {
    const ticket = await TicketsRepository.getById(ticketId);

    if (!ticket) {
      throw new NotFoundException("Ticket does not exist");
    }

    return ticket;
  }
}
