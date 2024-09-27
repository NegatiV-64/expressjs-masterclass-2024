export interface EventModel {
  eventId: string;
  eventName: string;
  eventDescription: string;
  eventLocation: string;
  eventDate: string;
  eventCreatedAt: string;
  eventUpdatedAt: string;
}

export interface EventCreateDto {
  eventName: string;
  eventDescription: string;
  eventLocation: string;
  eventDate: string;
}

export interface EventUpdateDto {
  eventName?: string;
  eventDescription?: string;
  eventLocation?: string;
  eventDate?: string;
}
