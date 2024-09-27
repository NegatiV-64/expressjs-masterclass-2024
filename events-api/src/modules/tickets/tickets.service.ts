import { faker } from "@faker-js/faker";
import { TicketsBodyDataDto } from "./dto/tickets-body-data";
import { TicketModel } from "./tickets.model";
import { TicketsRepository } from "./tickets.repository";

export class TicketsService {
    static async getEvents(): Promise<void> {
        // const events = await EventsRepository.getAll();

        // return events;
    }

    static async newTicket(ticket: TicketsBodyDataDto): Promise<TicketModel> {
        const newEvent: TicketModel = {
            ticketId: faker.string.uuid(),
            ticketQuantity: ticket.ticketQuantity,
            ticketPrice: ticket.ticketPrice,
            eventId: ticket.eventId
        }

        await TicketsRepository.insert(newEvent);

        return newEvent;
    }
}
