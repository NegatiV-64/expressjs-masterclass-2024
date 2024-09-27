import { Router } from "express";
import { TicketsService } from "./tickets.service";
import { validateCreateTicketRequestBody } from "#/shared/validators/ticket-validators/create-ticket.validator";
import { createTicketDtoSchema } from "./validator-schemas/ticket-create.schema";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { EventsService } from "../events/events.service";

export const TicketsController = Router();


TicketsController.get("/", async (req, res) => {
    const tickets = await TicketsService.getAll();
    return res.status(200).json({
        message: "Tickets retrieved successfully",
        data: tickets,
    });
});


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