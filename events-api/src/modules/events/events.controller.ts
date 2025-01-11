import {
  createEventDtoSchema,
  CreateEventDto,
  eventIdParamDtoSchema,
  EventIdParamDto,
  updateEventSchema,
} from "#/modules/events/dto/requests";
import { EventsService } from "#/modules/events/events.service";
import { requestHandler } from "#/shared/utils";
import {
  validateRequestBody,
  getRequestBody,
  getUrlParams,
  validateUrlParams,
} from "#/shared/validators";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";

export const EventsController = Router();

EventsController.post(
  "/",
  validateRequestBody(createEventDtoSchema),
  requestHandler(async (req, res) => {
    const dto = getRequestBody<CreateEventDto>(req);

    const createdEvent = await EventsService.createEvent(dto);

    return res.status(StatusCodes.CREATED).json({
      message: "Event created successfully",
      data: createdEvent,
    });
  })
);

EventsController.get(
  "/",
  requestHandler(async (req, res) => {
    const events = await EventsService.getEvents();

    return res.status(StatusCodes.OK).json({
      message: "Events retrieved successfully",
      data: events,
    });
  })
);

EventsController.get(
  "/:eventId",
  validateUrlParams(eventIdParamDtoSchema),
  requestHandler(async (req, res) => {
    const { eventId } = getUrlParams<EventIdParamDto>(req);

    const event = await EventsService.getEvent(eventId);

    return res.status(StatusCodes.OK).json({
      message: "Event retrieved successfully",
      data: event,
    });
  })
);

EventsController.patch(
  "/:eventId",
  validateUrlParams(eventIdParamDtoSchema),
  validateRequestBody(updateEventSchema),
  requestHandler(async (req, res) => {
    const { eventId } = getUrlParams<EventIdParamDto>(req);
    const dto = getRequestBody<CreateEventDto>(req);

    const updatedEvent = await EventsService.updateEvent(eventId, dto);

    return res.status(StatusCodes.OK).json({
      message: "Event updated successfully",
      data: updatedEvent,
    });
  })
);

EventsController.delete(
  "/:eventId",
  validateUrlParams(eventIdParamDtoSchema),
  requestHandler(async (req, res) => {
    const { eventId } = getUrlParams<EventIdParamDto>(req);

    const event = await EventsService.deleteEvent(eventId);

    return res.status(StatusCodes.OK).json({
      message: "Event deleted successfully",
      data: event,
    });
  })
);
