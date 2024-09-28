import { Router } from "express";
import { EventsService } from "#/modules/events/events.service";
import {
    eventsCreateDtoSchema,
    EventsCreateDto,
    EventsUpdateDto,
    EventsSearchParamsDto,
    eventsSearchParamsDtoSchema,
    eventsIdDtoSchema,
    eventsUpdateDtoSchema
} from "./dto/requests";
import {
    validateSearchParams,
    validateRequestBody,
    validateQueryParameter
} from "#/shared/validators";

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
            searchParams
        });
    }
);

EventsController.post(
    "/",
    validateRequestBody(eventsCreateDtoSchema),
    async function (req, res) {
        try {
            const requestBody = req.body as unknown as EventsCreateDto;

            const newEvent = await EventsService.createEvent(requestBody);

            return res.status(201).json({
                message: "Event created successfully",
                event: newEvent
            });
        } catch (error) {
            return res
                .status(404)
                .json({ message: "Failed to create an event" });
        }
    }
);

EventsController.patch(
    "/:eventId",
    validateRequestBody(eventsUpdateDtoSchema),
    validateQueryParameter("eventId", eventsIdDtoSchema),
    async function (req, res) {
        try {
            const updatedEvent = await EventsService.updateEvent(
                req.params["eventId"] || "",
                req.body as unknown as EventsUpdateDto
            );

            res.status(200).json({
                message: "Event updated successfully",
                event: updatedEvent
            });
        } catch (error) {
            res.status(400).json({ message: "Failed to update an event" });
        }
    }
);

EventsController.delete(
    "/:eventId",
    validateQueryParameter("eventId", eventsIdDtoSchema),
    async function (req, res) {
        try {
            const deletedEvent = await EventsService.deleteEvent(
                req.params["eventId"] || ""
            );

            // can't return the payload with 204 code..
            res.status(200).json({
                message: "Event deleted successfully",
                event: deletedEvent
            });
        } catch (error) {
            res.status(400).json({ message: "Failed to delete an event" });
        }
    }
);

EventsController.get(
    "/:eventId/tickets",
    validateQueryParameter("eventId", eventsIdDtoSchema),
    async function (req, res) {
        try {
            const tickets = await EventsService.getEventTickets(
                req.params["eventId"] || ""
            );

            return res.status(200).json({
                message: "Tickets Fetched Successfully",
                data: tickets
            });
        } catch (error) {
            res.status(400).json({
                message: "Failed To Fetch Event Tickets"
            });
        }
    }
);
