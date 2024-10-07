import { UpdateEventDto } from "#/modules/events/dto/requests";
import { CreateEventDto } from "#/modules/events/dto/requests/create-event.dto";
import { EventModel } from "#/modules/events/events.model";
import { EventsRepository } from "#/modules/events/events.repository";
import { NotFoundException } from "#/shared/exceptions";
import { randomUUID } from "crypto";

export class EventsService {
  static async createEvent(dto: CreateEventDto): Promise<EventModel> {
    const eventId = randomUUID();

    const event = {
      eventId,
      eventName: dto.eventName,
      eventDescription: dto.eventDescription,
      eventLocation: dto.eventLocation,
      eventDate: dto.eventDate,
    };

    const createdEvent = await EventsRepository.create(event);

    return createdEvent;
  }

  static async getEvents(): Promise<EventModel[]> {
    const events = await EventsRepository.getAll();

    return events;
  }

  static async getEvent(eventId: string): Promise<EventModel> {
    const event = await EventsRepository.getById(eventId);

    if (!event) {
      throw new NotFoundException("Event not found");
    }

    return event;
  }

  static async updateEvent(
    eventId: string,
    dto: UpdateEventDto
  ): Promise<EventModel> {
    const event = await EventsRepository.getById(eventId);

    if (!event) {
      throw new NotFoundException("Event not found");
    }

    const updatedEvent = await EventsRepository.update(eventId, dto);

    return updatedEvent;
  }

  static async deleteEvent(eventId: string): Promise<EventModel> {
    const event = await EventsRepository.getById(eventId);

    if (!event) {
      throw new NotFoundException("Event not found");
    }

    await EventsRepository.delete(eventId);

    return event;
  }
}
