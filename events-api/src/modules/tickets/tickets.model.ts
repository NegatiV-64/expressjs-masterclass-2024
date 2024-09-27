export interface TicketModel {
  id: string;
  ticketQuantity: number;
  ticketPrice: number;
  eventId: string;
}

export interface TicketCreateDto {
  ticketQuantity: number;
  ticketPrice: number;
  eventId: string;
}
