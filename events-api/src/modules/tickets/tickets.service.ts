import { EventsService } from "../events/events.service";
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
}