import { EventsRepository } from "../events/events.repository";
import { TicketModel } from "./tickets.model";
import { TicketsRepository } from "./tickets.repository";
import { TicketsCreateDto } from "./dto/requests";

export class TicketsService {
    static async createTicket(
        ticket: TicketsCreateDto
    ): Promise<TicketModel[]> {
        const event = await EventsRepository.getEvent(ticket.eventId);

        if (!event.length) {
            throw new Error("Event Not Found");
        }

        return await TicketsRepository.createTicket(ticket);
    }

    static async getTicket(ticketId: string): Promise<TicketModel[]> {
        const ticket = await TicketsRepository.getTicket(ticketId);

        if (!ticket.length) {
            throw new Error("Ticket Not Found");
        }

        return ticket;
    }
}
