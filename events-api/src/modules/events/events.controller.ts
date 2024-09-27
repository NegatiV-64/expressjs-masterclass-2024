import {
    eventsCreateDtoSchema,
    EventsCreateDto,
    EventsSearchParamsDto,
    eventsSearchParamsDtoSchema
} from "./dto/requests";
import {
    validateSearchParams,
    validateRequestBody
} from "#/shared/validators";
import { EventsService } from "#/modules/events/events.service";
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

            res.send(201).json({
                message: "Event created successfully",
                event: newEvent
            });
        } catch (error) {
            res.send(404).json({ message: "Failed to create an event" });
        }
    }
);
