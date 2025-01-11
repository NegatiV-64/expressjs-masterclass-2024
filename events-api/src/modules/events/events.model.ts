import { UUID } from "crypto";

export interface EventModel {
  eventId: string | UUID;
  eventName: string;
  eventDescription: string;
  eventLocation: string;
  eventDate: string;
  eventCreatedAt: string;
  eventUpdatedAt: string;
}
