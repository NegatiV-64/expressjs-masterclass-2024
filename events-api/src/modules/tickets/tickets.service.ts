import { EventsRepository } from "../events/events.repository";
import { TicketModel } from "./tickets.model";
import { TicketsRepository } from "./tickets.repository";
import { TicketsCreateDto } from "./dto/requests";

export class TicketsService {
    static async createTicket(
        ticket: TicketsCreateDto
    ): Promise<TicketModel> {
        await EventsRepository.getEvent(ticket.eventId);

        return TicketsRepository.createTicket(ticket);
    }

    static async getTicket(ticketId: string): Promise<TicketModel> {
        return await TicketsRepository.getTicket(ticketId);
    }
}
