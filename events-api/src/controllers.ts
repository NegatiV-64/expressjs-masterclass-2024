import { Router } from "express";
import { getIdParam } from "./utils";
import {
    EventsSearchParamsDto,
    eventsSearchParamsDtoSchema,
  } from "./modules/events/dto/requests/events-search-params.dto";
  import { eventsCreateDtoSchema } from "./modules/events/dto/requests/create.dto";
  import { eventsUpdateDtoSchema } from "./modules/events/dto/requests/update.dto";
  import { eventsRouteParamsDtoSchema } from "./modules/events/dto/requests/route.dto";
  import { ticketsCreateDtoSchema } from "./modules/tickets/tickets.dto";
  import { validateRequestBody } from "./shared/validators/validators";
  import { validateSearchParams } from "./shared/validators/validators";
  import { validateRouteParams } from "./shared/validators/validators";
  import { NotFoundError } from "./shared/validators/error";
import { EventsService, TicketsService } from "./services";
  
  export const EventsController = Router();
  
  EventsController.get(
    "/",
    validateSearchParams(eventsSearchParamsDtoSchema),
    async (req, res) => {
      const searchParams = req.query as unknown as EventsSearchParamsDto;
  
      const events = await EventsService.getEvents();
  
      return res.status(200).json({
        message: "Successfully",
        data: events,
        searchParams,
      });
    }
  );
  
  EventsController.post(
    "/",
    validateRequestBody(eventsCreateDtoSchema),
    async (req, res) => {
      const event = await EventsService.createEvent(req.body);
  
      return res.status(201).json({
        message: "Successfully",
        data: event,
      });
    }
  );
  
  EventsController.patch(
    "/:id",
    validateRouteParams(eventsRouteParamsDtoSchema),
    validateRequestBody(eventsUpdateDtoSchema),
    async (req, res) => {
      try {
        const event = await EventsService.updateEvent(
          req.body,
          getIdParam(req.params)
        );
  
        return res.status(200).json({
          message: "Successfully",
          data: event,
        });
      } catch (err) {
        if (err instanceof NotFoundError) {
          return res.status(404).json({ message: err.message });
        }
      }
    }
  );
  
  EventsController.delete(
    "/:id",
    validateRouteParams(eventsRouteParamsDtoSchema),
    async (req, res) => {
      const event = await EventsService.deleteEvent(getIdParam(req.params));
      if (event === null) {
        return res.status(404).json({ message: "Not found" });
      }
  
      return res.status(200).json({
        message: "Successfully",
        data: event,
      });
    }
  );
  
  EventsController.get(
    "/:id/tickets",
    validateRouteParams(eventsRouteParamsDtoSchema),
    async (req, res) => {
      const tickets = await EventsService.getTicketsForEvent(
        getIdParam(req.params)
      );
  
      return res.status(200).json({
        message: "Successfully",
        data: tickets,
      });
    }
  );


  export const TicketsController = Router();

TicketsController.post(
  "/",
  validateRequestBody(ticketsCreateDtoSchema),
  async (req, res) => {
    const ticket = await TicketsService.createTicket(req.body);
    return res.status(201).json({
      message: "Tickets created successfully",
      data: ticket,
    });
  }
);

TicketsController.get("/", async (req, res) => {
  try {
    const tickets = await TicketsService.getAllTickets();
    return res.status(200).json({
      message: "Tickets retrieved successfully",
      data: tickets,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

TicketsController.get(
  "/:id",
  validateRouteParams(eventsRouteParamsDtoSchema),
  async (req, res) => {
    try {
      const ticket = await TicketsService.getTicket(getIdParam(req.params));
      return res.status(200).json({
        message: "Ticket retrieved successfully",
        data: ticket,
      });
    } catch (err) {
      if (err instanceof NotFoundError) {
        return res.status(404).json({ message: err.message });
      }
    }
  }
);