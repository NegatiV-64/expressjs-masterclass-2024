import { Router } from "express";
import { EventsService } from "#/modules/events/events.service";
import {
    eventsCreateDtoSchema,
    eventsSearchParamsDtoSchema,
    eventsIdDtoSchema,
    eventsUpdateDtoSchema
} from "./dto/requests";
import {
    validateSearchParams,
    validateRequestBody,
    validateQueryParameter
} from "#/shared/validators";
import { NotFoundError } from "#/shared/errors";

export const EventsController = Router();

EventsController.get(
    "/",
    validateSearchParams(eventsSearchParamsDtoSchema),
    async (req, res) => {
        const searchParams = req.query;

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
            const newEvent = await EventsService.createEvent(req.body);

            return res.status(201).json({
                message: "Event created successfully",
                event: newEvent
            });
        } catch {
            return res
                .status(500)
                .json({ message: "Failed to create an event" });
        }
    }
);

EventsController.patch(
    "/:eventId",
    validateRequestBody(eventsUpdateDtoSchema),
    validateQueryParameter(eventsIdDtoSchema),
    async function (req, res) {
        try {
            const eventId = req.params["eventId"];
            if (!eventId) {
                throw new NotFoundError(
                    "Missing Query Parameter for Event ID"
                );
            }

            const updatedEvent = await EventsService.updateEvent(
                eventId,
                req.body
            );

            res.status(200).json({
                message: "Event updated successfully",
                event: updatedEvent
            });
        } catch (error) {
            if (error instanceof NotFoundError) {
                return res.status(400).json({
                    message: error.message
                });
            }

            return res
                .status(500)
                .json({ message: "Failed to update an event" });
        }
    }
);

EventsController.delete(
    "/:eventId",
    validateQueryParameter(eventsIdDtoSchema),
    async function (req, res) {
        try {
            const eventId = req.params["eventId"];
            if (!eventId) {
                throw new NotFoundError(
                    "Missing Query Parameter for Event ID"
                );
            }

            const deletedEvent = await EventsService.deleteEvent(eventId);

            res.status(200).json({
                message: "Event deleted successfully",
                event: deletedEvent
            });
        } catch (error) {
            if (error instanceof NotFoundError) {
                return res.status(400).json({
                    message: error.message
                });
            }

            return res
                .status(500)
                .json({ message: "Failed to delete an event" });
        }
    }
);

EventsController.get(
    "/:eventId/tickets",
    validateQueryParameter(eventsIdDtoSchema),
    async function (req, res) {
        try {
            const eventId = req.params["eventId"];
            if (!eventId) {
                throw new NotFoundError(
                    "Missing Query Parameter for Event ID"
                );
            }

            const tickets = await EventsService.getEventTickets(eventId);

            return res.status(200).json({
                message: "Tickets Fetched Successfully",
                data: tickets
            });
        } catch (error) {
            if (error instanceof NotFoundError) {
                return res.status(400).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: `Failed To Fetch Tickets for Event ${req.params["eventId"]}`
            });
        }
    }
);
