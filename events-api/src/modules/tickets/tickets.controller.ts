import { Router } from "express";
import { TicketsService } from "./tickets.service";
import { validateCreateTicketRequestBody } from "#/shared/validators/ticket-validators/create-ticket.validator";
import { createTicketDtoSchema } from "./validator-schemas/ticket-create.schema";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { EventsService } from "../events/events.service";
import { validateGetTicketByIdParams } from "#/shared/validators/ticket-validators/get-ticketById.validator";
import { validateTicketIdDtoSchema } from "./validator-schemas/ticket-ticketId-validator.schema";


export const TicketsController = Router();


TicketsController.post("/", validateCreateTicketRequestBody(createTicketDtoSchema), async (req, res) => {
    const newTicket = req.body as unknown as CreateTicketDto;

    const event = await EventsService.getEventById(newTicket.eventId);
    if (!event) {
        return res.status(404).json({
            message: "Event not found",
        });
    }

    const result = await TicketsService.create(newTicket);

    return res.status(201).json({
        message: "Ticket created successfully",
        data: result,
    });

})

TicketsController.get("/:ticketId", validateGetTicketByIdParams(validateTicketIdDtoSchema), async (req, res) => {
    const ticketId = req.params["ticketId"]!;
    const ticketWithEvent = await TicketsService.getTicketById(ticketId);

    if (!ticketWithEvent) {
        return res.status(404).json({
            message: "Ticket not found",
        });
    }

    return res.status(200).json({
        message: "Ticket retrieved successfully",
        data: ticketWithEvent,
    });
})