import { EventEntity, TicketEntity } from "./models";
import { EventRepository } from "./db";
import { NotFoundError } from "./shared/validators/error";
import { EventCreateDto } from "./modules/events/dto/requests/create.dto";
import { TicketCreateDto } from "./modules/tickets/tickets.dto";
import { TicketRepository } from "./db";

export class EventsService {
  static async getEvents(): Promise<EventEntity[] > {
    const events = await EventRepository.getAllEvents();
    return events;
  }
  static async createEvent(newEvent: EventCreateDto): Promise<EventEntity[]> {
    return await EventRepository.createEvent(newEvent);
  }
  static async updateEvent(
    event: EventCreateDto,
    id: string
  ): Promise<EventEntity | []> {
    const res = await EventRepository.updateEvent(event, id);

    if (Array.isArray(res) && res.length === 0) {
      throw new NotFoundError(`Event with ID ${id} not found`);
    }

    return res;
  }

  static async deleteEvent(id: string): Promise<EventEntity | EventEntity[]> {
    const res = await EventRepository.deleteEvent(id);
    if (Array.isArray(res) && res.length === 0) {
      throw new NotFoundError(`Event with ID ${id} not found`);
    }
    return res;
  }

  static async getTicketsForEvent(id: string): Promise<TicketEntity[]> {
    return await EventRepository.getTicketsByEventId(id);
  }
}


export class TicketsService {
    static async createTicket(newTicket: TicketCreateDto): Promise<TicketEntity> {
      return await TicketRepository.createTicket(newTicket);
    }
  
    static async getTicket(id: string): Promise<TicketEntity | any> {
      const res = await TicketRepository.getTicketById(id);
  
      if (Array.isArray(res) && res.length === 0) {
        throw new NotFoundError(`Ticket with ID ${id} not found`);
      }
  
      return res;
    }
  
    static async getAllTickets(): Promise<TicketEntity[]> {
      const tickets = await TicketRepository.getAllTickets();
      if (!tickets || tickets.length === 0) {
        throw new NotFoundError("No tickets found");
      }
      return tickets;
    }
  }