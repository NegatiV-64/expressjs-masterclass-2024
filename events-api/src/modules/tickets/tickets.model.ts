import { UUID } from "crypto";

export interface TicketModel {
  ticketId: string | UUID;
  ticketQuantity: number;
  ticketPrice: number;
  eventId: string;
}
