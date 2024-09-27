export interface EventModel {
  eventId: string;
  eventName: string;
  eventDescription: string;
  eventLocation: string;
  eventDate: string;
  eventCreatedAt: string;
  eventUpdatedAt: string;
}

export interface RequestEventModel
  extends Omit<EventModel, "eventId" | "eventCreatedAt" | "eventUpdatedAt"> {}
