import {TicketsRepository} from "#/modules/tickets/ticket.repository";
import {CreateTicketDto} from "#/modules/tickets/dto/create-ticket-params.dto";
import {TicketModel} from "#/modules/tickets/tickets.model";
import { notFoundError } from "#/shared/error";
import { th } from "@faker-js/faker";

export class TicketsService {
    static async createTicket(ticketData: CreateTicketDto): Promise<TicketModel> {
        return TicketsRepository.createTicket(ticketData);
    }

    // static async getTicketsByEventId(eventId: string): Promise<TicketModel[]> {
    //     return TicketsRepository.getTicketsByEventId(eventId);
    // }

    static async getTicket(ticketId: string): Promise<TicketModel | TicketModel[] | null> {
        const res = await TicketsRepository.getTicketById(ticketId);
        if(!res){
            throw new notFoundError(`Ticket with ID-${ticketId} not found`);
        }
        return res;
    }
    static async getAllTickets():Promise<TicketModel[]>{
        const tickets = await TicketsRepository.getAllTickets();
        if(!tickets ){
            throw new notFoundError(`No thickets!`);
        }
        return tickets;
    }
}
