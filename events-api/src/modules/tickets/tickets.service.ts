import { TicketModel } from "./tickets.model";
import { TicketsRepository } from "./tickets.repository";


export class TicketsService {

    static async getAll(): Promise<TicketModel[]> {
        const tickets = await TicketsRepository.getAll();

        return tickets;
    }
}