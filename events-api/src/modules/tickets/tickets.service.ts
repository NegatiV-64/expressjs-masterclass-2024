import { CreateTicketDto } from "./dto/create-ticket.dto";
import { TicketModel } from "./tickets.model";
import { TicketsRepository } from "./tickets.repository";


export class TicketsService {

    static async getTicketsByEventId(eventId: string): Promise<TicketModel[]> {
        const tickets = await TicketsRepository.getByEventId(eventId);

        return tickets;
    }

    static async create(ticket: CreateTicketDto) {
        try {
            const result = await TicketsRepository.create(ticket);
            return result;
        } catch (err) {
            console.error("TicketsServiceError: couldn't create ticket: ", err);
            throw new Error();
        }
    }

    static async getTicketById(ticketId: string) {
        try {
            const ticketWithEvent = await TicketsRepository.getById(ticketId);
            return ticketWithEvent;
        } catch (err) {
            console.error("TicketsServiceError: couldn't get ticket by id: ", err);
            throw new Error();
        }
    }
}