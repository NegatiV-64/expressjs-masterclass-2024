import {
  EventsSearchParamsDto,
  eventsSearchParamsDtoSchema,
} from "#/modules/events/dto/requests/events-search-params.dto";
import { EventsService } from "#/modules/events/events.service";
import { validateRequestBody } from "#/shared/validators/request-body.validator";
import { validateSearchParams } from "#/shared/validators/search-params.validator";
import { Router } from "express";
import { eventsCreateDtoSchema } from "./dto/requests/events-create.dto";
import { eventsUpdateDtoSchema } from "./dto/requests/events-update.dto";
import { validateRouteParams } from "#/shared/validators/route-params.validator";
import { eventsRouteParamsDtoSchema } from "./dto/requests/events-route-params.dto";
import { TicketsService } from "../tickets/tickets.service";

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
  validateRequestBody(eventsCreateDtoSchema),
  async (req, res) => {
    await EventsService.createEvent(req.body);

    return res.status(201).json({
      message: "Event created successfully",
    });
  }
);

EventsController.patch(
  "/:id",
  validateRouteParams(eventsRouteParamsDtoSchema),
  validateRequestBody(eventsUpdateDtoSchema),
  async (req, res) => {
    const event = await EventsService.updateEvent(
      req.body,
      req.params["id"] as string
    );
    if (event === null) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(201).json({
      message: "Event updated successfully",
    });
  }
);

EventsController.delete(
  "/:id",
  validateRouteParams(eventsRouteParamsDtoSchema),
  async (req, res) => {
    const event = await EventsService.deleteEvent(req.params["id"] as string);
    if (event === null) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(204).json({
      message: "Event deleted successfully",
    });
  }
);

EventsController.get(
  "/:id/tickets",
  validateRouteParams(eventsRouteParamsDtoSchema),
  async (req, res) => {
    const tickets = await TicketsService.getTicketsForEvent(
      req.params["id"] as string
    );

    return res.status(201).json({
      message: "Tickets retrieved successfully",
      data: tickets,
    });
  }
);
