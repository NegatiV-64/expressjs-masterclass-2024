import { EventsSearchParamsDto, eventsSearchParamsDtoSchema, } from "#/modules/events/dto/requests/events-search-params.dto";
import { EventsBodyDataDto, eventsBodyDataDtoSchema, } from "#/modules/events/dto/requests/events-body-data.dto";
import { EventsService } from "#/modules/events/events.service";
import { validateSearchParams } from "#/shared/validators/search-params.validator";
import { validateRequestBody } from "#/shared/validators/request-body.validator";
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
  }
);

EventsController.post(
  "/",
  validateRequestBody(eventsBodyDataDtoSchema),
  async (req, res) => {
    const requestBody = req.body as unknown as EventsBodyDataDto;

    const event = await EventsService.newEvent(requestBody);

    return res.status(201).json({
      message: "Event created successfully",
      data: event,
      requestBody,
    });
  }
);