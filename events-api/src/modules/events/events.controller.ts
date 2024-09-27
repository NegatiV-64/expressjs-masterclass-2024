import {
  EventsSearchParamsDto,
  eventsSearchParamsDtoSchema,
} from "#/modules/events/dto/requests/events-search-params.dto";
import { eventsCreateRequestBodyDtoSchema } from "./dto/requests/events-create-request-body.dto";
import { eventsUpdateRequestBodyDtoSchema } from "./dto/requests/events-update-request-body.dto";
import { EventsService } from "#/modules/events/events.service";
import { validateRequestBody } from "#/shared/validators/request-body.validator";
import { validateSearchParams } from "#/shared/validators/search-params.validator";
import { Router } from "express";
import { validateIdRouteParameter } from "#/shared/validators/route-parameter.validator";

export const EventsController = Router();

EventsController.get(
  "/",
  validateSearchParams(eventsSearchParamsDtoSchema),
  async (req, res) => {
    const searchParams = req.query as unknown as EventsSearchParamsDto;

    const events = await EventsService.getEvents();

    return res.status(200).json({
      message: "Events retrieved successfully",
      data: events,
      searchParams,
    });
  },
);

EventsController.post(
  "/",
  validateRequestBody(eventsCreateRequestBodyDtoSchema),
  async (req, res) => {
    const newEvent = await EventsService.createEvent(req.body);

    return res.status(201).json({
      message: "Event created successfully",
      data: newEvent,
    });
  },
);

EventsController.get(
  "/:eventId",
  validateIdRouteParameter(),
  async (req, res) => {
    const event = await EventsService.getEvent(req.params["eventId"] as string);

    return res.status(200).json({
      message: "Event retrieved successfully",
      data: event,
    });
  },
);

EventsController.patch(
  "/:eventId",
  validateIdRouteParameter(),
  validateRequestBody(eventsUpdateRequestBodyDtoSchema),
  async (req, res) => {
    const updatedEvent = await EventsService.updateEvent(
      req.body,
      req.params["eventId"] as string,
    );

    return res.status(200).json({
      message: "Event updated successfully",
      data: updatedEvent,
    });
  },
);
