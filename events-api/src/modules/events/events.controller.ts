import {
  EventsSearchParamsDto,
  eventsSearchParamsDtoSchema,
} from "#/modules/events/dto/requests/events-search-params.dto";
import { eventsCreateRequestBodyDtoSchema } from "./dto/requests/events-create-request-body.dto";
import { EventsService } from "#/modules/events/events.service";
import { validateRequestBody } from "#/shared/validators/request-body.validator";
import { validateSearchParams } from "#/shared/validators/search-params.validator";
import { Router } from "express";

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

    return res.status(201).json(newEvent);
  },
);
