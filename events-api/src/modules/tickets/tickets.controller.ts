import { Router } from "express";
import { TicketsService } from "./tickets.service";
import { ticketsCreateDtoSchema } from "./dto/requests";
import { ticketsIdDtoSchema } from "./dto/requests";
import {
    validateRequestBody,
    validateQueryParameter
} from "#/shared/validators";
import { NotFoundError } from "#/shared/errors";

export const TicketsController = Router();

TicketsController.post(
    "/",
    validateRequestBody(ticketsCreateDtoSchema),
    async (req, res) => {
        try {
            const newTicket = await TicketsService.createTicket(req.body);

            res.status(201).json({
                message: "Ticket Created Successfully",
                data: newTicket
            });
        } catch {
            res.status(500).json({
                message: "Failed To Create Ticket"
            });
        }
    }
);

TicketsController.get(
    "/:ticketId",
    validateQueryParameter(ticketsIdDtoSchema),
    async function (req, res) {
        try {
            const ticketId = req.params["ticketId"];
            if (!ticketId) {
                throw new NotFoundError(
                    "Missing Query Parameter for Ticket ID"
                );
            }

            const ticket = await TicketsService.getTicket(ticketId);

            return res.status(200).json({
                message: "Ticket Fetched Successfully",
                data: ticket
            });
        } catch (error) {
            if (error instanceof NotFoundError) {
                return res.status(400).json({
                    message: error.message
                });
            }

            res.status(500).json({
                message: "Failed To Fetch Ticket"
            });
        }
    }
);
