export interface EventModel {
  eventId: string;
  eventName: string;
  eventDescription: string;
  eventLocation: string;
  eventDate: string;
  eventCreatedAt: string;
  eventUpdatedAt: string;
}
export interface CreateEvent {
  eventName: string;
  eventDescription: string;
  eventLocation: string;
  eventDate: string;
}

export interface UpdateEvent {
  eventName?: string;
  eventDescription?: string;
  eventLocation?: string;
  eventDate?: string;
}