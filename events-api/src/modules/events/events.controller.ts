import { eventUpdateDtoSchema, EventUpdateDto } from './dto/requests/events-update.dto';
import { EventCreateDto, eventCreateDtoSchema } from './dto/requests/events-create.dto';
import { EventsRouteParamsDto, eventsRouteParamsDtoSchema } from './dto/requests/events-route-params.dto';
import { EventsService } from "#/modules/events/events.service";
import { validateRouteParams } from "#/shared/validators/route-params.validator";
import { validateRequestBody } from "#/shared/validators/request-body.validator";
import { Router } from "express";
import { TicketsService } from '../tickets/tickets.service';

export const EventsController = Router();

EventsController.get(
  "/",
  async (req, res) => {
    const events = await EventsService.getEvents();

    return res.status(200).json({
      message: "Events retrieved successfully",
      data: events,
    });
  }
);

EventsController.get(
  "/:id",
  validateRouteParams(eventsRouteParamsDtoSchema),
  async (req, res) => {
    const routeParams = req.params as unknown as EventsRouteParamsDto;

    const event = await EventsService.getEventById(routeParams.id);

    return res.status(200).json({
      message: "Event retrieved successfully",
      data: event
    });
  }
);

EventsController.post(
  "/",
  validateRequestBody(eventCreateDtoSchema),
  async (req, res) => {
    const bodyParams = req.body as unknown as EventCreateDto;

    const events = await EventsService.createEvent(bodyParams);

    return res.status(201).json({
      message: "Event created successfully",
      data: events,
      bodyParams,
    });
  }
)

EventsController.patch(
  "/:id",
  validateRouteParams(eventsRouteParamsDtoSchema),
  validateRequestBody(eventUpdateDtoSchema),
  async (req, res) => {
    console.log(req.body);

    const bodyParams = req.body as unknown as EventUpdateDto;
    const routeParams = req.params as unknown as EventsRouteParamsDto;

    const event = await EventsService.updateEventById(routeParams.id, bodyParams);

    return res.status(200).json({
      message: "Event updated successfully",
      data: event,
      bodyParams,
    });
  }
)

EventsController.delete(
  "/:id",
  validateRouteParams(eventsRouteParamsDtoSchema),
  async (req, res) => {
    const routeParams = req.params as unknown as EventsRouteParamsDto;

    const event = await EventsService.deleteEventById(routeParams.id);

    console.log(event);

    return res.status(200).json({
      message: "Event deleted successfully",
      data: event,
    });
  }
);

EventsController.get(
  "/:id/tickets",
  validateRouteParams(eventsRouteParamsDtoSchema),
  async (req, res) => {
  const routeParams = req.params as unknown as EventsRouteParamsDto;

  const tickets = await TicketsService.getTicketsByEventId(routeParams.id);
  if (!tickets) {
    return res.status(404).json({
      message: "Tickets not found",
    });
  }

  return res.status(200).json({
    message: "Tickets retrieved successfully",
    data: tickets,
  });

})