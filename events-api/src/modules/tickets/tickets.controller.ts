import { Router } from "express";
import { TicketsService } from "./tickets.service";
import { ticketsCreateDtoSchema, TicketsCreateDto } from "./dto/requests";
import { eventsIdDtoSchema } from "../events/dto/requests";
import {
    validateRequestBody,
    validateQueryParameter
} from "#/shared/validators";

export const TicketsController = Router();

TicketsController.post(
    "/",
    validateRequestBody(ticketsCreateDtoSchema),
    async (req, res) => {
        try {
            const newTicket = await TicketsService.createTicket(
                req.body as unknown as TicketsCreateDto
            );

            res.status(201).json({
                message: "Ticket Created Successfully",
                data: newTicket
            });
        } catch (error) {
            res.status(400).json({
                message: "Failed To Create Ticket"
            });
        }
    }
);

TicketsController.get(
    "/:ticketId",
    validateQueryParameter("ticketId", eventsIdDtoSchema),
    async function (req, res) {
        try {
            const ticket = await TicketsService.getTicket(
                req.params["ticketId"] || ""
            );

            return res.status(200).json({
                message: "Ticket Fetched Successfully",
                data: ticket
            });
        } catch (error) {
            res.status(400).json({
                message: "Failed To Fetch Ticket"
            });
        }
    }
);
