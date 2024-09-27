export interface EventEntity {
    eventId?: string;
    eventName?: string;
    eventDescription?: string;
    eventLocation?: string;
    eventDate?: string;
    eventCreatedAt?: string;
    eventUpdatedAt?: string;
}

export interface TicketEntity {
    ticketId?: string;
    ticketQuantity?: number;
    ticketPrice?: number;
    eventId?: string;
}