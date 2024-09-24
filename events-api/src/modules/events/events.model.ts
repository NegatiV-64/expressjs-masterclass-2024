export interface EventModel {
  eventId: string;
  eventName: string;
  eventDescription: string;
  eventLocation: string;
  eventDate: string;
  eventCreatedAt: string;
  eventUpdatedAt: string;
}

export interface CreateEventModel
  extends Omit<EventModel, "eventCreatedAt" | "eventUpdatedAt"> {}
