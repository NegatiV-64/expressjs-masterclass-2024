export interface TicketModel {
  ticketId: string;
  ticketQuantity: number;
  ticketPrice: number;
  eventId: string;
}

export interface NewTicket extends Omit<TicketModel, "ticketId"> {}
