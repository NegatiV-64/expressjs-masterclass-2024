import {eventsSearchParamsDtoSchema,EventSearchDto,eventsCreatingSchema,eventsRouteSchema,eventsUpdateSchema} from "#/modules/events/dto/requests/events-params.dto";
import { EventsService } from "#/modules/events/events.service";
import { validateSearchParams } from "#/shared/validators/search-params.validator";
import {Request, Response, Router} from "express";
import {z} from 'zod'
import {validateRequestBody} from "#/shared/validators/request-body.validator";
import {validateRouteParams} from "#/shared/validators/route-params.validator";
import {getId} from "#/shared/util";
import {notFoundError} from "#/shared/error";

export const EventsController = Router();
const uuidSchema = z.string().uuid("Invalid eventId, must be a valid UUID");

EventsController.get("/", validateSearchParams(eventsSearchParamsDtoSchema), async (req, res) => {
    const searchParams = req.query as unknown as EventSearchDto;

    const events = await EventsService.getEvents();

    return res.status(200).json({
      message: "Events retrieved successfully",
      data: events,
      searchParams,
    });
  });

EventsController.post("/",validateRequestBody(eventsCreatingSchema), async (req, res) => {
    const event = await EventsService.createEvent(req.body)

    return res.status(201).json({
        message: "Event created successfully",
        data:event,
    })
})

EventsController.patch("/:eventId",validateRouteParams(eventsRouteSchema),validateRequestBody(eventsUpdateSchema), async (req, res) => {
    try{
        const event = await EventsService.updateEvent(req.body, getId(req.params));

        return res.status(200).json({
            message: "Event updated successfully",
            data: event,
        })
    }catch(error){
        if(error instanceof notFoundError){
            return res.status(404).json({
                message: error.message,
            })
        }
    }
})

EventsController.delete("/:eventId", validateRequestBody(eventsRouteSchema), async (req, res) => {
    const event = await EventsService.deleteEvent(getId(req.params))
    if(event === null){
        return res.status(404).json({
            message: "Event not found",
        })
    }

    return res.status(200).json({
        message: "Event deleted successfully",
        data: event,
    })
})

EventsController.get("/:eventid/tickets",validateRouteParams(eventsRouteSchema), async (req, res) => {
    const tickets = await EventsService.getTickets(getId(req.params))
    return res.status(200).json({
        message: "Ticket retrieved successfully",
        data: tickets,
    })
})