import { EventsService } from "#/modules/events/events.service";
import { validateCreateEventsDto } from "#/shared/validators/request-body.validator";
import { validateSearchParams } from "#/shared/validators/search-params.validator";
import { Router } from "express";
import {
  EventsSearchParamsDto,
  eventsSearchParamsDtoSchema,
} from "./dto/request-validator-schemas/events-search-params.schema";
import {
  createEventDtoSchema,
} from "./dto/request-validator-schemas/create-event.schema";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

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
  validateCreateEventsDto(createEventDtoSchema),
  async (req, res) => {
    const requestBody = req.body as unknown as CreateEventDto;

    const result = await EventsService.createEvent(requestBody);

    return res.status(201).json({
      message: "Events created successfully",
      data: result,
    });
  },
);

EventsController.put("/:eventId", async (req, res) => {
  const eventId = req.params.eventId;

  const requestBody = req.body as unknown as UpdateEventDto;

  console.log("Update event: ", requestBody);

  const result = await EventsService.updateEventById(eventId, requestBody);

  return res.status(200).json({
    message: "Events updated successfully",
    data: result,
  });
})
